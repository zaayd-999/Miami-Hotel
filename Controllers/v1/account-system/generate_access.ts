import { Request , Response } from "express";
import { Connection } from 'mysql';
import { HelpAPIStructure } from '../../../types/HelpStructure';
import { User , AccessTokenUserStructure , refreshTokenUserStructure , databaseUserStructure , accessTokenStructure , refreshTokenStructure } from '../../../types/usersStructure';
import { check , hash , getUserRole , generateAccessToken , generateRefreshToken } from '../../../functions';
import jwt from 'jsonwebtoken';

/**
 * @param {Request} req
 * @param {Response} res
 * @param {Connection} database
 * @returns {Promise<void>}
 * @description logout from your account
 */

export async function execute ( req : Request , res : Response , database : Connection ) : Promise<void> {
    let { refreshToken } = req.body as { refreshToken : string };
    if(!refreshToken){
        res.status(400).json({ success : false , message : "Refresh token is required" });
        return;
    }
    let token = (req.headers['authorization'] as string).split(' ')[1];
    let data_a = jwt.decode(token) as accessTokenStructure;
    let data_r = jwt.decode(refreshToken) as refreshTokenStructure;
    jwt.verify(refreshToken , process.env.REFRESH_TOKEN_SECRET as string , (err , user) => {
        if(err){
            res.status(403).json({ success : false , message : "Invalid refresh token" });
            return;
        };
        if(data_a.user_id !== data_r.user_id){
            database.query('UPDATE users SET refresh_token = NULL WHERE user_id = ?' , [data_r.user_id] , ( err , result ) => {
                if(err){
                    console.error("DB error:", err);
                    res.status(500).json({ success : false , message : "Database error" });
                    return;
                }
                res.status(403).json({ success : false , message : "Token user mismatch. Session ended , please try login again." });
                return;
            });
            return;
        } else {
            // Check if the access token is blocked
            database.query('SELECT * FROM blocked_tokens WHERE token = ?' , [token] , ( err , result ) => {
                if(err){
                    console.error("DB error:", err);
                    res.status(500).json({ success : false , message : "Database error" });
                    return;
                }
                if(result.length > 0){
                    database.query('UPDATE users SET refresh_token = NULL WHERE user_id = ?' , [data_r.user_id] , ( err , result ) => {
                        if(err){
                            console.error("DB error:", err);
                            res.status(500).json({ success : false , message : "Database error" });
                            return;
                        }
                        res.status(403).json({ success : false , message : "Token is blocked. Session ended , please try login again." });
                        return;
                    });
                    return;
                } else {
                    // Check if the refresh token matches the one in the database
                    database.query('SELECT refresh_token FROM users WHERE user_id = ?' , [data_r.user_id] , async ( err , result ) => {
                        if(err){
                            console.error("DB error:", err);
                            res.status(500).json({ success : false , message : "Database error" });
                            return;
                        }
                        if(result.length === 0){
                            res.status(404).json({ success : false , message : "Refresh token is not valid" });
                            return;
                        }
                        let dbToken = result[0].refresh_token;
                        let checker = await check(dbToken , refreshToken);
                        if(!checker){
                            res.status(403).json({ success : false , message : "Refresh token is not valid" });
                            return;
                        }
                        // Generate new access token
                        let userPayload : AccessTokenUserStructure = {
                            user_id : data_r.user_id,
                            first_name : data_r.first_name,
                            last_name : data_r.last_name,
                            email : data_r.email,
                            phone : data_r.phone,
                            address : data_r.address,
                            city : data_r.city,
                            postal_code : data_r.postal_code,
                            activated : data_r.activated,
                            account_type : data_r.account_type,
                        };
                        let current_Date = new Date();
                        let next_Date = current_Date.setMinutes(current_Date.getMinutes() + 15);
                        let accessToken = generateAccessToken(userPayload);
                        database.query('INSERT INTO blocked_tokens ( token , reason , created_at , expires_at ) VALUES ( ? , ? , ? , ? )' , [token , "generating new access token" , current_Date , next_Date] , ( err , result ) => {
                            if(err){
                                console.error("DB error:", err);
                                res.status(500).json({ success : false , message : "Database error" });
                                return;
                            }
                            res.status(200).json({ success : true , accessToken : accessToken });
                            return;
                        });
                    });
                }
            });
        }
    });
}

export const help : HelpAPIStructure = {
    router : "account_system",
    host : "generate_access",
    description : "Generate new access token using refresh token",
    methode : "POST",
    version : "v1",
    active : true,
}