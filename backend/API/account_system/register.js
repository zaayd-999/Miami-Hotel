const express = require('express');
const mysql = require('mysql');
const nodemailer = require("nodemailer");
require("colors");
const { hashPassword , generateSalt , getTime , sendMail } = require("../../functions");
const md5 = require('md5');
/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {object} element
 * @param {mysql.Connection} database
 * @param {nodemailer.Transporter} transport
 * @returns {Promise<void>}
 * @description Register a new account 
 */
exports.execute = async (req, res , element , database , transport ) => {
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
        const currentDateN = getTime();
        const hashedPassword = hashPassword(password, salt);
        const query = 'INSERT INTO users (first_name, last_name, email, password, phone, address, city, country, postal_code, salt,created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        database.query(query, [firstName, lastName, email, hashedPassword, phone, address, city, country, postal_code, salt, currentDateN], (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "Internal server error." });
            }
            let mailOptions = {
                from : ("MIAMI HOTEL - " + process.env.MAIL_USER).replaceAll("<","").replaceAll(">",""),
                to: email,
                subject: 'Account Activation :',
                html : `
                <div style="font-family: 'Arial', sans-serif;line-height: 1.6;color: #333333;margin: 0;padding: 0;background-color: #f5f5f5;">
                    <center>
                        <div style="max-width: 600px;margin: 0 auto;background: #ffffff;">
                            <header style="background-color: #a4eda1;padding: 30px;text-align: center;">
                                <div style="color: #ffffff;font-size: 24px;font-weight: bold;">Miami Hotel</div>
                            </header>
                            <main style="padding: 30px;">
                                <h1 style="color: #a4eda1;margin-top: 0;">Welcome to Miami Hotel!</h1>
                                <p>Dear {{Guest}},</p>
                                <p>Thank you for creating an account with Miami Hotel. We're delighted to have you as our valued guest.</p>
                                
                                <div style="border-top: 1px solid #eeeeee;margin: 20px 0;"></div>

                                <p>Your account details:</p>
                                <p><strong>Email:</strong> {{user_email}}</p>
                                <p><strong>Account Created:</strong> {{signup_date}}</p>
                                
                                <a href="{{login_link}}" style="display: inline-block;background-color: #a4eda1;color: #ffffff;text-decoration: none;padding: 12px 25px;border-radius: 4px;font-weight: bold;margin: 15px 0;">Activate youre account</a>

                                <div style="border-top: 1px solid #eeeeee;margin: 20px 0;"></div>
                                <p>If you didn't create this account, please contact our support team immediately.(dris o alla)</p>
                            </main>

                            <footer style="background-color: #f9f9f9;padding: 20px;text-align: center;font-size: 12px;color: #999999;">
                                <p>Sahrai Hotel &copy; 2025 | All Rights Reserved</p>
                                <p>Liberty City, Vice city, Jotia salondrias</p>
                                <p>
                                    <a href="">Our Website</a> | 
                                    <a href="">Contact Us</a> | 
                                    <a href="">Privacy Policy</a>
                                </p>
                            </footer>
                        </div>
                    </center>
                </div>
                `.replace("{{Guest}}",`Mr. ${firstName} ${lastName}`).replace("{{user_email}}",email).replace("{{signup_date}}",currentDateN).replace("{{login_link}}","#")
            };
            sendMail(transport,mailOptions,(err,info) => {
                if(err) {
                    console.error("Mailer Error".red , err.message.bold.red);
                    return res.status(500).json({ error: "Internal server error." });
                } else {
                    res.status(201).json({ message: "User registered successfully." });
                }
            });
        });
    });
}
exports.help = {
    router : "account_system",
    host : "register",
    description : "Register a new account",
    method : "POST"
}