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
}
/**
 * @param {express.Router} Router
 */
const loadAPIs = (Router) => {
    
}

loadRoutes();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`.green.bold);
});


module.exports = {
    loader : loadAPIs,
}