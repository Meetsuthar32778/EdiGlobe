const express=require("express");
const mysql=require("mysql2");
const cors=require("cors");

// Getting Access or database from MySQL
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'4878$HellCat',
    database:'ediglobe'
});

db.connect(console.log("Database has been connected successfully."))


const app=express();
app.use(express.json());
app.use(cors());


app.post('/login',(re,res)=>{
    let sql="select * from user where email_id = ? and password = ? "
    
    db.query(sql,[re.body.email,re.body.password],(err,data)=>{
        if(err) return res.json(err);
        if(data.length > 0) return res.json('pass');
        else return res.json('No record');
    })
})

app.post('/checkid',(re,res)=>{
    sql='select * from user where email_id = ?';
    db.query(sql,[re.body.email],(err,data)=>{
        if(err) return res.json(err);
        else return res.json(data.length)
        
    })
})

app.post('/signin',(re,res)=>{
    let sq="select max(user_id) from user"
    let newID;
    db.query(sq,(err,data)=>{
        newID=data[0]['max(user_id)'];
        newID ++;
        console.log(newID);
        let sql="insert into user (email_id,password,user_id) values (?,?,?)";
        db.query(sql,[re.body.email,re.body.password,newID],(err,data)=>{
            if(err) return res.json(err);
            else return res.json("Your Account Has been created successfully. \nnow you can login");
        })
        let s="s"+String(newID);
        let fees=`create table f${newID} (semester varchar(4), fees int(6), paid int(6), remainning int(6), status varchar(255))`;
        db.query(fees,(err,data)=>{
            if(err) return res.json(err);
        })
        let courses=`create table c${newID} (school varchar(4), course_code varchar(6), course_name varchar(255), credits varchar(1))`;
        db.query(courses,(err,data)=>{
            if(err) return res.json(err);
        })
        let marks=`create table m${newID} (course_code varchar(6), course_name varchar(255), exam varchar(255), obtained_marks int(3), total_marks int(3),percentage int(3))`;
        db.query(marks,(err,data)=>{
            if(err) return res.json(err); 
        })
    })
})

app.post('/userdata',(re,res)=>{
    let sql="select user_id from user where email_id = ?";
    db.query(sql,[re.body.email],(err,rows,data)=>{
        return res.json(rows)
    })
})

app.post('/getmark',(re,res)=>{
    let sql=`select * from m${re.body.id}`;
    db.query(sql,(err,rows,data)=>{
        if (err) return res.json(err);
        else return res.json(rows);
    })
})

app.post('/getcourses',(re,res)=>{
    let sql=`select * from c${re.body.id}`;
    db.query(sql,(err,rows,data)=>{
        if(err) return res.json(err);
        else return res.json(rows);
    })
})

app.post('/getfees',(re,res)=>{
    let sql=`select * from f${re.body.id}`;
    db.query(sql,(err,rows,data)=>{
        if(err) return res.json(err);
        else return res.json(rows);
    })
})

app.get('/allCourses',(re,res)=>{
    let sql='select * from courses';
    db.query(sql,(err,rows,data)=>{
        if(err) return res.json(err);
        else return res.json(rows);
    })
})


app.listen(2024,()=>{
    console.log("Server is running on PORT 2024.");
})