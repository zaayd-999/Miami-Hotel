const express = require('express');
const mysql = require('mysql');


const { hashPassword , generateSalt } = require("../../functions");
const md5 = require('md5');
/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {object} element
 * @param {mysql.Connection} database
 * @returns {Promise<void>}
 */
exports.execute = async (req, res , element , database ) => {
    if(req.user) return res.status(409).json({ message: "User already logged in" });
    let { firstName, lastName, email, password , phone , address , country , postal_code } = req.body;
    let city = req.body['city'];
    if (!firstName || !lastName || !email || !password || !phone || !address || !city || !country || !postal_code) {
        return res.status(400).json({ error: "All fields are required." });
    }
    const salt = generateSalt(16);
    database.query('SELECT user_id,email FROM users WHERE email = ?' , [email] , (err , data) => {
        if(!err && data.length > 0) {
            return res.status(400).json({ error: "Email already exists." });
        }
        if(err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Internal server error." });
        }
        
        const hashedPassword = hashPassword(password, salt);
        const query = 'INSERT INTO users (first_name, last_name, email, password, phone, address, city, country, postal_code, salt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        database.query(query, [firstName, lastName, email, hashedPassword, phone, address, city, country, postal_code, salt], (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "Internal server error." });
            }
            res.status(201).json({ message: "User registered successfully." });
        });
    });
}
exports.help = {
    router : "account_system",
    host : "register",
    description : "Register a new account",
    method : "POST"
}