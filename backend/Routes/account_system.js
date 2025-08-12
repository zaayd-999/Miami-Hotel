const express = require('express');
const { Router } = express;
const jwt = require("jsonwebtoken");
const accountSystemRouter = Router();

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
*/

const authMiddleware = (req,res,next) => {
    let originalURL = req.originalUrl;
    console.log(originalURL)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if(token == null){
        // Check if the originalURL because you can't just register by token or also login the second time.
        if(originalURL == "/account_system/register" || originalURL == "/account_system/login") {
            next();
            return;
        }
        return res.sendStatus(401);
    } else {
        jwt.verify(token , process.env.ACCESS_TOKEN_SECRET , (err, user)=>{
            if(err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    }
    next();
}

module.exports = {
    Router : accountSystemRouter,
    host : 'account_system',
    enabled: true,
    description: 'Handles account-related operations such as user registration, login, and profile management.',
    middleware : authMiddleware,
}