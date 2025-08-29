import { Router , Response , Request , NextFunction } from 'express';
import { HelpRouteStructure } from '../../types/HelpStructure'


const accountSystemRouter : Router = Router();

const accountSystemMiddleware = function ( req : Request , res : Response , next : NextFunction ) {
    next();
}

export const help : HelpRouteStructure = {
    router : accountSystemRouter,
    host : 'account_system',
    enabled : true,
    description : 'Handles account-related operations such as user registration, login, and profile management.',
    middleware : accountSystemMiddleware,
}