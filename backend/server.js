const express=require("express");
const mysql=require("mysql2");
const cors=require("cors");

// Getting Access or database from MySQL
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'4878$Meet',
    database:'ediglobe'
});

db.connect(console.log("Database has been connected successfully."))


const app=express();
app.use(express.json());
app.use(cors());



app.listen(2024,()=>{
    console.log("Server is running on PORT 2024.");
})