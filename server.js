/**
 *  Title : Veggis
 *  Description : Vegetable Delevery
 *  Author : Dipu(me)
 *  Date : 17.08.2021
 */

// Import external Dependencies
const env = require("dotenv");
const path = require("path");

// env Configuration 
env.config({path : path.resolve(__dirname ,"./.env")});

// import Internal modules
const { app } = require("./app");


const PORT = process.env.PORT || 3000 ;

// PORT listening
app.listen(PORT, (error) =>{
    if(error){
        console.log(error);
    }
    console.log(`Server running on PORT ${ PORT }`);
});