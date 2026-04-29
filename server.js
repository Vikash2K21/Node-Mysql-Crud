require("dotenv").config();
const dotenv = require('dotenv');
const express = require('express');
const mySqlPool = require('./config/db');

const app = express();

//configuration 


// middleware
app.use(express.json());

// routes
app.use("/api/v1/student", require("./routes/studentRoutes"));

app.get("/test",(req,res)=>{
    res.status(200).send("<h1>Hello jii</h1>");
});
//port
const PORT = process.env.PORT || 8000;

// conditionally listen

mySqlPool.query("SELECT 1").then(() =>{
    //My SQL
    console.log("MySql DB is Connected Successfully");

    //listen
app.listen(PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});
})
.catch((err) => {
    console.error("DB Connection Failed:", err);
  });


