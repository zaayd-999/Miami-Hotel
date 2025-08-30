import { Request , Response } from "express";
import { Connection } from 'mysql';
import { HelpAPIStructure } from '../../../types/HelpStructure';
import { User , AccessTokenUserStructure , refreshTokenUserStructure , databaseUserStructure , refreshTokenStructure} from '../../../types/usersStructure';
import { check , hash , getUserRole , generateAccessToken , generateRefreshToken , generateSalt } from '../../../functions';
import jwt from 'jsonwebtoken';
import { create } from "domain";
import { createTypeReferenceDirectiveResolutionCache } from "typescript";

/**
 * @param {Request} req
 * @param {Response} res
 * @param {Connection} database
 * @returns {Promise<void>}
 * @description Login to your account
 */

export async function execute ( req : Request , res : Response , database : Connection ) : Promise<void> {
    let { email , password } = req.body;
    if ( !email || !password ) {
        res.status(400).json({ success : false , message : "Missing parameters" });
        return;
    }
    let query = `SELECT * FROM users WHERE email = ?`;
    let values = [email];
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
        let passwordMatch = await check(user.password , password);
        if ( !passwordMatch ) {
            res.status(401).json({ success : false , message : "Invalid password" });
            return;
        }
        /*if ( user.activated === 0 ) {
            res.status(403).json({ success : false , message : "Account not activated" });
            return;
        }*/
       if(user.refresh_token !== null){
            /*jwt.verify(user.refresh_token , process.env.REFRESH_TOKEN_SECRET as string , ( err , decoded ) => {
                if(!err){
                    res.status(403).json({ success : false , message : "User already logged in" });
                    return;
                }
            });*/
            database.query('SELECT * FROM refresh_tokens WHERE user_id = ?' , [user.user_id] , async ( tokenErr , tokenResult ) => {
                if(tokenErr){
                    console.error("DB error:", tokenErr);
                    res.status(500).json({ success : false , message : "Database error" });
                    return;
                }
                if(tokenResult.length > 0){
                    let result = tokenResult[0];
                    let { iat , exp , UUID } = result;
                    let a : refreshTokenStructure = {
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
                        iat : iat,
                        exp : exp,
                        UUID : UUID || "Why babe why?",
                    }
                    let alphaToken = jwt.sign(a , process.env.REFRESH_TOKEN_SECRET as string);
                    let checker = await check(user.refresh_token as string, alphaToken);
                    if(checker){
                        res.status(403).json({ success : false , message : "User already logged in" });
                        return;
                    } else {
                        let accessTokenUser : AccessTokenUserStructure = {
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
                        let UUID2 = crypto.randomUUID();
                        let refreshTokenUser : refreshTokenUserStructure = {
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
                            UUID : UUID2,
                        };

                        const accessToken = generateAccessToken(accessTokenUser);
                        const refreshToken = generateRefreshToken(refreshTokenUser);
                        const salt = await generateSalt(10);
                        const hashedRefreshToken = await hash(refreshToken, salt);
                        const refreshTo = await jwt.decode(refreshToken as string) as refreshTokenStructure;
                        let { exp , iat , UUID } = refreshTo;
                        database.query('UPDATE users SET refresh_token = ? WHERE user_id = ?', [hashedRefreshToken, user.user_id], ( updateErr , updateResult ) => {
                            if ( updateErr ) {
                                res.status(500).json({ success : false , message : "Database error" });
                                return;
                            }
                            database.query('UPDATE refresh_tokens SET iat = ? , exp = ? , UUID = ? WHERE user_id = ?' , [ iat , exp , UUID2 , user.user_id ] , ( errr , resultt ) => {
                                if(errr){
                                    console.error("DB error:", errr);
                                    res.status(500).json({ success : false , message : "Database error" });
                                    return;
                                }
                                res.status(200).json({ success : true , accessToken : accessToken , refreshToken : refreshToken });
                            });
                        });
                        return;
                    }
                }
            });

        }
        
    });
}

export const help : HelpAPIStructure = {
    router : "account_system",
    host : "login",
    description : "Login to your account",
    methode : "POST",
    version : "v1",
    active : true,
}