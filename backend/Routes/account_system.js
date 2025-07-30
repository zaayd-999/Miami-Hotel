const express = require('express');
const { Router } = express;

const accountSystemRouter = Router();
const middleware = (req, res, next) => {
    console.log(`Request received at ${req.originalUrl}`);
    next();
}


accountSystemRouter.use(middleware)
module.exports = {
    Router : accountSystemRouter,
    host : 'account_system',
    enabled: true,
    description: 'Handles account-related operations such as user registration, login, and profile management.'
}