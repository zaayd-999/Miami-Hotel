const md5 = require('md5');
const nodemailer = require('nodemailer');
const { createTransport } = require('nodemailer');

const transport = createTransport({
    host:'gmail'
});


module.exports = {
    hashPassword: (password , salt) => {
        return md5(password+salt);
    },
    generateSalt: (length) => {
        let salt = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            salt += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return salt;
    },
    checkPassword: (password, hashedPassword, salt) => {
        return md5(password + salt) === hashedPassword;
    },
    /**
     * 
     * @param {nodemailer.Transport} transport 
     * @param {String} html 
     * @param {String} subject 
     * @param {String} to 
     */
    sendMail : async (transport , html , subject, to) => {
        let x=1;

    }
}