const { enable } = require('colors');
const express = require('express');
const { Router } = express;

const bookingSystemRouter = Router();



module.exports = {
    Router : bookingSystemRouter,
    host : 'booking_system',
    enabled: true,
    description: 'Manages booking operations including reservations, cancellations, and booking history.'
}