import { Request , Response } from "express";
import { Connection } from 'mysql';
import { HelpAPIStructure } from '../../../types/HelpStructure'
import type { Transporter } from 'nodemailer'
import { hash , generateSalt , getTime } from '../../../functions'

/**
 * @param {Request} req
 * @param {Response} res
 * @param {Connection} database
 * @param {Transporter} transport
 * @returns {Promise<void>}
 * @description Create a new account
 */

export async function execute ( req : Request , res : Response , database : Connection , transport : Transporter ) : Promise<void> {
    try {
        let { firstName, lastName, email, password , phone , address , country , postal_code } = req.body;
        let city = req.body['city'];
        console.log(req.body);
        if (!firstName || !lastName || !email || !password || !phone || !address || !city || !country || !postal_code) {
            res.status(400).json({ error: "All fields are required." });
            return;
        }
        const salt = await generateSalt(10);
        const hashedPassword = await hash(password, salt);
        const currentDateN = getTime();
        database.query('SELECT user_id,email FROM users WHERE email = ?', [email], (err, results) => {
            if (err) {
                res.status(500).json({ error: "Database query error." });
                return;
            }
            if (results.length > 0) {
                res.status(409).json({ error: "Email is already registered." });
                return;
            }
            const insertQuery = 'INSERT INTO users (first_name, last_name, email, password, phone, address, city, country, postal_code, salt,created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const values = [firstName, lastName, email, hashedPassword, phone, address, city, country, postal_code, salt, currentDateN];
            database.query(insertQuery, values, (insertErr, insertResults) => {
                if (insertErr) {
                    res.status(500).json({ error: "Failed to create account." });
                    return;
                }
                res.status(201).json({ message: "Account created successfully." });
                const mailOptions = {
                    from: process.env.MAIL_USER,
                    to: email,
                    subject: 'Welcome to Miami Hotel',
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
                transport.sendMail(mailOptions, (mailErr, info) => {
                    if (mailErr) {
                        console.error("Failed to send welcome email:", mailErr);
                    } else {
                        res.status(201).json({ message: "User registered successfully." });
                        console.log("Welcome email sent:", info.response);
                    }
                });
            });
        });
    } catch (error) {
        res.status(500).json({
            message : "Internal server error",
            error,
        });
    }
}

export const help : HelpAPIStructure = {
    router : "account_system",
    host : "register",
    description : "Create a new account",
    methode : "POST",
    version : "v1",
    active : true,
}