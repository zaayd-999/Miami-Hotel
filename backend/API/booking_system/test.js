const express = require('express');
const mysql = require('mysql');
/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {object} element
 * @param {mysql.Connection} database
 * @returns {Promise<void>}
 */
exports.execute = async (req, res , element , database) => {
    
}

exports.help = {
    router : "booking_system",
    host : "test",
    description : "Test endpoint for booking system",
    method : "GET"
}