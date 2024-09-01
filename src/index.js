const mongoose = require('mongoose')
const config = require("./config/config");
const app = require('./app');

let server;

mongoose.connect(config.mongoose.url)
    .then(() =>{
        console.log("Connected to mongoDB");

        server = app.listen(config.port, ()=>{ 
            console.log(`listening to port = ${config.port} `);
        })
        
    })
    .catch((err) => {
        console.log("mongoose error == ", err);
        
    })