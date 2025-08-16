const md5 = require('md5');
const nodemailer = require('nodemailer');
const { createTransport } = require('nodemailer');
const moment = require("moment");

const transport = createTransport({
    host:'gmail'
});


module.exports = {
    /**
     * @param {string} password
     * @param {string} salt
     * @returns {string}
     * @description Hash the password with the salt using md5.
    */
    hashPassword: (password , salt) => {
        return md5(password+salt);
    },
    /**
     * @param {Number} length
     * @description Generate a random salt of the given length.
    */
    generateSalt: (length=16) => {
        let salt = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            salt += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return salt;
    },
    /**
     * @param {string} password
     * @param {string} hashedPassword
     * @param {string} salt
     * @returns {boolean}
     * @description Check if the password matches the hashed password.
     */
    checkPassword: (hashedPassword,password, salt) => {
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

    },
    /**
     * @param {Object} element 
     * @param {String} data 
     * @param {String} value 
     * @returns {String}
     * @description Set a value in the element object.
     */
    setElementData : (element , data , value) => {
        element[data] = value;
        return element;
    },
    /**
     * @param {Object} element 
     * @param {String} data 
     * @returns {String}
     * @description Get a value from the element object.
     */
    getElementData : (element, data) => {
        return element[data];
    },
    /**
     * 
     * @param {Number} roleID 
     * @returns {string}
     * @description get the user role from ID.
     */
    getUserRole : (roleID)=>{
        if(roleID == 0) return "Memeber";
        if(roleID == 1) return "Hotel Owner";
        if(roleID == 2) return "Admin";
    },
    /**
     * 
     * @param {nodemailer.Transport} transport 
     * @param {nodemailer.TransportOptions} mailOptions 
     * @param {CallableFunction} callback 
     * @description send a mail
     */
    sendMail : (transport , mailOptions , callback) => {
        transport.sendMail(mailOptions , (err , info) => {
            callback(err,info);
        });
    },
    /**
     * 
     * @returns get current time
     */
    getTime : () => {
        return moment(Date.now()).format("YYYY-DD-MM [at] hh:mm A")
    },
}