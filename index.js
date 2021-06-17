const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");

const port = 4000;
 const db = mysql.createPool({

  host:"localhost" ,
  user: 'root',
  password: 'root123',
  database: "educationbug"

 })
 db.query("show tables",(err,results) => {
   if(err) {
     return console.log(err);
   }
   return console.log(results);
 })






app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hello boy");
});


app.post("/order",(req,res) => {

  const email =req.body.user;
  const name =req.body.product.name;
  const img = req.body.product.img;
  const des = req.body.product.des;
  
  const sqlInsert = `insert into orderdetails(user,product,img,des) values('${email}','${name}','${img}','${des}')`;
  console.log(sqlInsert)
  db.query(sqlInsert,(err, result)=>{
    console.log(result)
  })
})
app.get("/d",(req,res)=>{
  const sqlInsert = `select * from orderdetails`;
  console.log(sqlInsert)
  db.query(sqlInsert,(err, result)=>{
    res.send(result)
   
  })

})
app.post("/getOrder",(req,res) => {

  const email =req.body.user;
 
  
  const sqlInsert = `select * from orderdetails where user='${email}'`;
  console.log(sqlInsert)
  db.query(sqlInsert,(err, results) => {
    res.send(results)
    console.log(results)
  })
})

 
app.listen(port);
