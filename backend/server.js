const express = require('express');
const bodyparser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(express.json());
app.use(bodyparser.json());


app.use(function (req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers','content-type, x-access-token');
    res.setHeader('Access-Control-Allow-Credentials',true);
    next();
});
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'database_mysql',
    port: '3306'
});
app.post("/createdb",async(req,res)=>{
    const name = req.body.name
    const surname = req.body.surname

    try{
        connection.query(
            "INSERT INTO users(name,surname) VALUES(?,?)",
            [name,surname],
            (err,result,fields)=>{
                if(err){
                    console.log('Error insert into database',err);
                    return res.status(400).send();
                }
                return res.status(201).json('User is :'+ '' + name + ' ' + surname + ' ');
            }
        )
    }catch(err){
        console.log(err);
        return res.status(500).send()
    }
})
app.get("/read",async(req,res)=>{
    try{
        connection.query(
            "SELECT * FROM users",
            (err,result,fields)=>{
                if(err){
                    console.log(err);
                    return res.status(400).send();
                }
                return res.status(200).json(result);
            }
        )
    }catch(err){
        console.log(err);
        return res.status(500).send()
    }
})
app.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id;
    try{
        connection.query(
            "DELETE FROM users WHERE id = ?",[id],
            (err,result,fields)=>{
                if(err){
                    console.log(err);
                    return res.status(400).send();
                }
                if(result.affectedRows === 0){
                    return res.status(404).json({message:"No user with that id"})
                }
                return res.status(200).json({message: "User deleted Successfully"});
            }
        )
    }catch(err){
        console.log(err);
        return res.status(500).send()
    }
})





app.post('/echo',(req,res)=>{
    const name = req.body.name
    const surname = req.body.surname
    res.json('User is :' + '' + name + ' ' + surname+ ' ');
});

app.listen(9000, ()=>{console.log('server isrunning on port 9000');})