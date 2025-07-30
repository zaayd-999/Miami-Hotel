const { enable } = require('colors');
const express = require('express');
const { Router } = express;

const bookingSystemRouter = Router();



module.exports = {
    Router : bookingSystemRouter,
    host : 'booking-system',
    enabled: false,
    description: 'Manages booking operations including reservations, cancellations, and booking history.'
}