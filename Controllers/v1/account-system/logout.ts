import { Request , Response } from "express";
import { Connection } from 'mysql';
import { HelpAPIStructure } from '../../../types/HelpStructure';
import { User , AccessTokenUserStructure , refreshTokenUserStructure , databaseUserStructure, accessTokenStructure } from '../../../types/usersStructure';
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
    let token = (req.headers['authorization'] as string).split(' ')[1];
    let data = jwt.decode(token) as accessTokenStructure;
    database.query('SELECT * FROM refresh_tokens WHERE user_id = ?' , [data.user_id] , ( err , result ) => {
        if(err){
            console.error("DB error:", err);
            res.status(500).json({ success : false , message : "Database error" });
            return;
        }
        if(result.length === 0){
            let current_Date = new Date();
            database.query('INSERT INTO blocked_tokens (token,reason,created_at) VALUES (?,?,?)' , [token,"No session found" , current_Date] , ( err ) => {
                if(err){
                    console.error("DB error:", err);
                    res.status(500).json({ success : false , message : "Database error" });
                    return;
                }
                res.status(400).json({ success : false , message : "User is not logged in." });
            });
            
        } else {
            let current_Date = new Date();
            database.query('INSERT INTO blocked_tokens (token,reason,created_at) VALUES (?,?,?)' , [token,"User logged out" , current_Date] , ( err ) => {
                if(err){
                    console.error("DB error:", err);
                    res.status(500).json({ success : false , message : "Database error" });
                    return;
                }
                database.query('UPDATE refresh_tokens SET UUID = NULL WHERE user_id = ?' , [data.user_id] , ( err , result ) => {
                    if(err){
                        console.error("DB error:", err);
                        res.status(500).json({ success : false , message : "Database error" });
                        return;
                    }
                    database.query('UPDATE users SET refresh_token = NULL WHERE user_id = ?' , [data.user_id] , ( err , result ) => {
                        if(err){
                            console.error("DB error:", err);
                            res.status(500).json({ success : false , message : "Database error" });
                            return;
                        }
                        res.status(200).json({ success : true , message : "Logged out successfully" });
                        return;
                    });
                });
            });
        }
    });
}

export const help : HelpAPIStructure = {
    router : "account_system",
    host : "logout",
    description : "logout from your account",
    methode : "POST",
    version : "v1",
    active : true,
}