const { enable } = require('colors');
const express = require('express');
const { Router } = express;
const jwt = require("jsonwebtoken");

const bookingSystemRouter = Router();

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 * @returns {Object}
 * @description See if the user can perform the action.
 */

const authMiddleware =  (req,res,next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if(token == null) return res.sendStatus(401);
    jwt.sign(token , process.env.ACCESS_TOKEN_SECRET , (err,data)=>{
        if(err) return res.sendStatus(403);
        req.user = data;
        next();
    });
}

module.exports = {
    Router : bookingSystemRouter,
    host : 'booking_system',
    enabled: true,
    description: 'Manages booking operations including reservations, cancellations, and booking history.',
    middleware : authMiddleware,
}