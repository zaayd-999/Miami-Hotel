import { Request , Response } from "express";
import { Connection } from 'mysql';
import { HelpAPIStructure } from '../../../types/HelpStructure'

/**
 * @param {Request} req
 * @param {Response} res
 * @param {Connection} database
 * @returns {Promise<void>}
 * @description Login to your account
 */

export function execute ( req : Request , res : Response , database : Connection ) : void {
    
}

export const help : HelpAPIStructure = {
    router : "account_system",
    host : "login",
    description : "Login to your account",
    methode : "POST",
    version : "v1",
    active : true,
}