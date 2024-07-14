const express=require("express");
const mysql=require("mysql2");
const cors=require("cors");

{// Getting Access or database from MySQL
    const db=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'4878$Meet',
        database:'ediglobe'
    });
    console.log("MySQL has been activated.");

    db.connect(console.log("Database has been connected successfully."))
}


