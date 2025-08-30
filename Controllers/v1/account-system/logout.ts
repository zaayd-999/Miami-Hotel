import { Request , Response } from "express";
import { Connection } from 'mysql';
import { HelpAPIStructure } from '../../../types/HelpStructure';
import { User , AccessTokenUserStructure , refreshTokenUserStructure , databaseUserStructure } from '../../../types/usersStructure';
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
    let authHeader = req.headers['authorization'];
    let token = authHeader && authHeader.split(' ')[1];
    jwt.verify(token as string , process.env.ACCESS_TOKEN_SECRET as string , ( err , user ) => {
        
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