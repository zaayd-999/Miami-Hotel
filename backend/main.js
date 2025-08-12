require("dotenv").config();
require("colors");

const express = require("express");
const { Router } = express;
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const jwt = require("jsonwebtoken");
const cors = require("cors");
app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(express.json());

const fs = require("fs");
const { readdirSync , readFileSync } = fs;

const ascii = require("ascii-table");

const RouteTable = new ascii("Route Table");
RouteTable.setHeading("Route", "Status","Enabled");

const APITable = new ascii("API Table");
APITable.setHeading("API", "Status", "Router" , "Method");

const element = {};

const mysql = require("mysql");
const { createConnection } = mysql;

const database = createConnection({
    host: process.env.DB_HOST,  
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

database.connect((err) => {
    if (err) {
        console.error("Failed to establish connection to the MySQL database server:".red, err.message.red.bold);
        return;
    }
    console.log("Connected to the MySQL database server".green.bold);
});

let transporter = null;

/**
 * @param {express.Router} Router
 * @param {string} route_name
 * @returns {void}
 * @description Loads all APIs for a specific route
 */

const loadAPIs = (Router,route_name) => {
    for (const dir of readdirSync("./API")) {
        for(const file of readdirSync(`./API/${dir}`).filter(file => file.endsWith(".js"))) {
            const api = require(`./API/${dir}/${file}`);
            try {
                if(api.execute && api.help){
                    if(api.help.router == route_name) {
                        Router.route(`/${api.help.host}`)[api.help.method.toLowerCase()]((req,res) => {
                            /**
                             * @param {express.Request} req
                             * @param {express.Response} res
                             * @param {object} element
                             * @returns {Promise<void>}
                             */
                            
                            api.execute(req, res,element,database, transporter);
                        });
                        APITable.addRow(`${file}`, "✅", api.help.router, api.help.method);
                    }
                } else {                
                    APITable.addRow(`${file}`, "❌", api.help.router, api.help.method);
                }
            } catch (error) {
                APITable.addRow(`${file}`, "❌", api.help.router, api.help.method);
            }
        };
    };
}

/**
 * @returns {void}
 * @description Loads all routes from the Routes directory
 */

const loadRoutes = () => {
    for(const file of readdirSync("./Routes")) {
        if (file.endsWith(".js")) {
            const route = require(`./Routes/${file}`);
            try {
                if(route.enabled === false) {
                    app.get(`/${route.host}`,(req, res) => {
                        res.status(404).send("This route is disabled.");    
                    });
                } else {
                    app.use(`/${route.host}`,route.middleware, route.Router);
                    loadAPIs(route.Router, route.host);
                }   
                RouteTable.addRow(`${route.host}`, "✅", route.enabled ? "Enabled" : "Disabled");
            } catch (error) {
                console.error(`Error loading route ${file}:`, error.message.red.bold);
                RouteTable.addRow(`${route.host}`, "❌");
                return;
                
            }
        }
    };
    console.log(RouteTable.toString().green.bold);
    console.log(APITable.toString().green.bold);
    console.log("All routes loaded successfully.".green.bold);
}


loadRoutes();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`.green.bold);
});