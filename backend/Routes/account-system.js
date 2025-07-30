const express = require('express');
const { Router } = express;

const accountSystemRouter = Router();



module.exports = {
    Router : accountSystemRouter,
    host : 'account-system',
    enabled: true,
    description: 'Handles account-related operations such as user registration, login, and profile management.'
}