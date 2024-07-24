const app = require("./app");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");

 
// Handling Uncaught Exception - console.log(deep)
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});


// config 
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({path:"backend/config/config.env"})
}

// conneting to databased
connectDatabase(); 

cloudinary.config({
    cloud_name: process.env.CLODINARY_NAME,
    api_key: process.env.CLODINARY_API_KEY,
    api_secret: process.env.CLODINARY_API_SECRET
});

const server = app.listen(process.env.PORT, ()=>{
    console.log(`port is work on ${process.env.PORT}`);
});

// unhandaled promise rejection error - mongo conn url incorrect 
process.on("unhandledRejection",err=>{
    console.log(`error: ${err.message}`);
    console.log("shutting down the server due to unhandle promise rejection");

    server.close(()=>{
        process.exit(1);
    });
})