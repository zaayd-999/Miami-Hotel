const express = require('express');
const mysql = require('mysql');
const jwt = require("jsonwebtoken");
const { checkPassword , getUserRole } = require("../../functions")
/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {object} element
 * @param {mysql.Connection} database
 * @returns {Promise<void>}
 * @description Login to your account
 */
exports.execute = async (req, res , element , database) => {
    
    const { email , password } = req.body;
    let sqlStatement = "SELECT * FROM users WHERE email=?"
    database.query(sqlStatement , email , (err , data)=>{
        if(!err && data.length == 0) {
            return res.status(400).json({ error: "Email not found." });
        }
        if(err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Internal server error." });
        }
        const { salt } = data[0];
        const hashedPassword = data[0].password;
        if(checkPassword(hashedPassword,password,salt)) {
            let userData = {
                user_id : data[0].id,
                first_name: data[0].first_name,
                last_name : data[0].last_name,
                email: data[0].email,
                phone: data[0].phone,
                address: data[0].address,
                city: data[0].city,
                country: data[0].country,
                postal_code: data[0].postal_code,
                created_at: data[0].created_at,
                updated_at: data[0].updated_at,
                activated: data[0].activated,
                activate_code: data[0].activate_code,
                account_type: getUserRole(data[0].account_type)
            }
            const accessToken = jwt.sign(userData,process.env.ACCESS_TOKEN_SECRET);
            res.status(200).json({ accessToken : accessToken })
        } else {
            return res.status(401).json({ message: "Invalid password or email." });
        }
    });
}

exports.help = {
    router : "account_system",
    host : "login",
    description : "Login to your account",
    method : "POST",
}