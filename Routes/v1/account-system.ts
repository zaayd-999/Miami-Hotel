import { Router , Response , Request , NextFunction } from 'express';
import { HelpRouteStructure } from '../../types/HelpStructure'
import jwt from 'jsonwebtoken';
import { Connection } from 'mysql';

const accountSystemRouter : Router = Router();

const accountSystemMiddleware = function ( req : Request , res : Response , next : NextFunction ) : void{ 
    //Check for authentication here if needed in the future
    let authHeader = req.headers['authorization'];
    let token = authHeader && authHeader.split(' ')[1];
    if(req.originalUrl === "/api/v1/account_system/login" || req.originalUrl === "/api/v1/account_system/register" || req.originalUrl === "/api/v1/account_system/generate_access"){
        next();
        return;
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
            
            next();
            return;
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