const express = require('express');
const { Router } = express;

const accountSystemRouter = Router();

const authMiddleware =  (req,res,next) => {
    
    next();
}

module.exports = {
    Router : accountSystemRouter,
    host : 'account_system',
    enabled: true,
    description: 'Handles account-related operations such as user registration, login, and profile management.'
}