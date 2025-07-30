require("dotenv").config();
require("colors");

const express = require("express");
const { Router } = express;
const app = express();
app.use(express.json());

const fs = require("fs");
const { readdirSync , readFileSync } = fs;

const ascii = require("ascii-table");

const RouteTable = new ascii("Route Table");
RouteTable.setHeading("Route", "Status","Enabled");

const APITable = new ascii("API Table");
APITable.setHeading("API", "Status", "Router" , "Method");

const mysql = require("mysql");
const { createConnection } = mysql;
const connection = createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.error("Error: Failed to establish connection to the MySQL database server".red.bold);
        return;
    }
    console.log("Success: Connected to the MySQL database server".green.bold);
});


/**
 * @param {express.Router} Router
 */

const element = {};

const loadAPIs = (Router,route_name) => {
    readdirSync("./API").forEach((dir) => {
        readdirSync(`./API/${dir}`).filter(file => file.endsWith(".js")).forEach((file) => {
            const api = require(`./API/${dir}/${file}`);
            try {
                if(api.execute && api.help){
                    if(api.help.router == route_name) {
                        Router.route(`/${api.help.host}`)[api.help.method.toLowerCase()]((req,res) => {
                            /**
                             * @param {express.Request} req
                             * @param {express.Response} res
                             * @param {object} element
                             * @param {mysql.Connection} database
                             * @returns {Promise<void>}
                             */
                            api.execute(req, res,element,database);
                            
                        });
                        APITable.addRow(`${file}`, "✅", api.help.router, api.help.method);
                    }
                } else {                
                    APITable.addRow(`${file}`, "❌", api.help.router, api.help.method);
                }
            } catch (error) {
                APITable.addRow(`${file}`, "❌", api.help.router, api.help.method);
            }
        });
    });
}

const loadRoutes = () => {
    readdirSync("./Routes").forEach((file) => {
        if (file.endsWith(".js")) {
            const route = require(`./Routes/${file}`);
            try {
                if(route.enabled === false) {
                    app.get(`/${route.host}`, (req, res) => {
                        res.status(404).send("This route is disabled.");    
                    });
                } else {
                    app.use(`/${route.host}`, route.Router);
                    loadAPIs(route.Router, route.host);
                }   
                RouteTable.addRow(`${route.host}`, "✅", route.enabled ? "Enabled" : "Disabled");
            } catch (error) {
                console.error(`Error loading route ${file}:`, error.message.red.bold);
                RouteTable.addRow(`${route.host}`, "❌");
                return;
                
            }
        }
    });
    console.log(RouteTable.toString().green.bold);
    console.log(APITable.toString().green.bold);
    console.log("All routes loaded successfully.".green.bold);
}


loadRoutes();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`.green.bold);
});


module.exports = {
    loader : loadAPIs,
}