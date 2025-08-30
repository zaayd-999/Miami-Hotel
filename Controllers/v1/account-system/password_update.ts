import { Request , Response } from "express";
import { Connection } from 'mysql';
import { HelpAPIStructure } from '../../../types/HelpStructure';
import { User , AccessTokenUserStructure , refreshTokenUserStructure , databaseUserStructure , accessTokenStructure } from '../../../types/usersStructure';
import { check , hash , getUserRole, checkIfBlocked , generateAccessToken , generateRefreshToken , generateSalt as genSalt } from '../../../functions';
import jwt from 'jsonwebtoken';

/**
 * @param {Request} req
 * @param {Response} res
 * @param {Connection} database
 * @returns {Promise<void>}
 * @description update your account password
 */

export async function execute ( req : Request , res : Response , database : Connection ) : Promise<void> {
    let { password , oldPassword } : { password : string , oldPassword : string } = req.body;
    if ( !password || !oldPassword ) {
        res.status(400).json({ success : false , message : "Missing parameters" });
        return;
    }
    let authHeader = req.headers['authorization'];
    let token = authHeader && authHeader.split(' ')[1];
    if(token == null){
        res.status(401).json({ success : false , message : "No token provided" });
        return;
    }
    jwt.verify(token , process.env.ACCESS_TOKEN_SECRET as string , async ( err , user ) => {
        if(err){
            res.status(403).json({ success : false , message : "Invalid token" });
            return;
        }
        
        /*const isBlocked = await checkIfBlocked(token as string , database);
        
        if(isBlocked){
            res.status(403).json({ success : false , message : "Token is blocked" });
            return;
        }*/

        let userData = user as accessTokenStructure;
        let query = `SELECT * FROM users WHERE user_id = ?`;
        let values = [userData.user_id];
        database.query(query , values , async ( err , result ) => {
            if ( err ) {
                res.status(500).json({ success : false , message : "Database error" });
                return;
            }
            if ( result.length === 0 ) {
                res.status(404).json({ success : false , message : "User not found" });
                return;
            }
            let user : databaseUserStructure = result[0];
            let passwordMatch = await check((user.password as string) , oldPassword);
            if ( !passwordMatch ) {
                res.status(401).json({ success : false , message : "Invalid old password" });
                return;
            }
            const salt = await genSalt(10);
            const hashedPassword = await hash(password,salt);
            database.query('UPDATE users SET password = ? WHERE user_id = ?', [hashedPassword, user.user_id], ( updateErr , updateResult ) => {
                if ( updateErr ) {
                    res.status(500).json({ success : false , message : "Database error" });
                    return;
                }
                let userDataa : AccessTokenUserStructure = {
                    user_id : user.user_id,
                    first_name : user.first_name,
                    last_name : user.last_name,
                    email : user.email,
                    phone : user.phone,
                    address : user.address,
                    city : user.city,
                    postal_code : user.postal_code,
                    activated : user.activated,
                    account_type : getUserRole(user.account_type),
                };
                const accessToken = generateAccessToken(userDataa);
                database.query('INSERT INTO blocked_tokens (token,reason,created_at,expires_at) VALUES (?,?,?,?)', [token, 'Password change',userData.iat ,userData.exp ], ( insertErr , insertResult ) => {
                    if( insertErr ) {
                        res.status(500).json({ success : false , message : "Database error" });
                        return;
                    }
                    res.status(200).json({ success : true , message : "Password updated successfully", accessToken : accessToken });
                });
            });
        });
        return;
    });
}

export const help : HelpAPIStructure = {
    router : "account_system",
    host : "password_update",
    description : "update your account password",
    methode : "POST",
    version : "v1",
    active : true,
}