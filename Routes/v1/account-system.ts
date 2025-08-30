import { Router , Response , Request , NextFunction } from 'express';
import { HelpRouteStructure } from '../../types/HelpStructure'
import jwt from 'jsonwebtoken';
import { Connection } from 'mysql';

import { database } from '../../main';
import { accessTokenStructure } from '../../types/usersStructure';

const accountSystemRouter : Router = Router();

const accountSystemMiddleware = function ( req : Request , res : Response , next : NextFunction ) : void{ 
    //Check for authentication here if needed in the future
    let authHeader = req.headers['authorization'];
    let token = authHeader && authHeader.split(' ')[1];
    if(req.originalUrl === "/api/v1/account_system/login" || req.originalUrl === "/api/v1/account_system/register"){
        next();
        return;
    } 
    else if (req.originalUrl === "/api/v1/account_system/generate_access"){
        if(token == null){
            res.status(401).json({ success : false , message : "No token provided" });
            return;
        };
        let data = jwt.decode(token) as accessTokenStructure;
        if(!data || !data.user_id){
            res.status(403).json({ success : false , message : "Invalid token" });
            return;
        }
        next();
    } else {
        if(token == null){
            res.status(401).json({ success : false , message : "No token provided" });
            return;
        }
        jwt.verify(token , process.env.ACCESS_TOKEN_SECRET as string , ( err , user ) => {
            if(err){
                res.status(403).json({ success : false , message : "Invalid token" });
                return;
            }
            database.query('SELECT * FROM blocked_tokens WHERE token = ?' , [token] , ( err , result ) => {
                if(err){
                    console.error("DB error:", err);
                    res.status(500).json({ success : false , message : "Database error" });
                    return;
                }
                if(result.length > 0){
                    res.status(403).json({ success : false , message : "Token is blocked" });
                    return;
                }
                next();
                return;
            });
            
        });
    }
}

export const help : HelpRouteStructure = {
    router : accountSystemRouter,
    host : 'account_system',
    enabled : true,
    description : 'Handles account-related operations such as user registration, login, and profile management.',
    middleware : accountSystemMiddleware,
}