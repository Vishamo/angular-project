const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
const app=express();
const mysql=require('mysql');

app.use(cors());
app.use(bodyparser.json());

//Database Connection
const db=mysql.createConnection({
    host:'database-1.cyscravmnjlp.us-east-1.rds.amazonaws.com',user:'admin',password:'admin123',database:'rms',port:3306
});

//check Database Connection

db.connect(err=>{ 
    if(err)
    console.log(err,'dberr');
    else
    console.log("Database Connected...!")
})

//get all Data

app.get('/result',(req,res)=>{
    let qr=`select * from result`;
    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,"Error");
        }
        if(result.length>=0)
        {
            res.send({
                message:"All Results Data",
            data:result
            });
        }
    });
});


//Get Single Data

app.get('/result/:id',(req,res)=>{
    let id=req.params.id;
    let qr=`select * from result where idResult=${id}`;
    db.query(qr,(err,result)=>{
if(err)
console.log(err,"Error While retreiving single data");
if(result.length>0)
{
    res.send({Message:"Data Found",data:result});
}
else
{
    res.send({Message:"Data Not Found"})
}
    })
})


//Create Data 

app.post('/result',(req,res)=>{
let rn=req.body.Roll_No;
let name=req.body.Name;
let dob=req.body.DOB;
let score=req.body.Score;
var qr=`INSERT INTO result (Roll_No,Name,DOB,Score) VALUES('${rn}','${name}','${dob}','${score}')`;
db.query(qr,(err,result)=>{
    if(err)
    console.log(err);
    res.send({message:'Data Inserted SuccessFully!'})
})
})


app.put('/result/:id',(req,res)=>{
    let id=req.params.id;
    let rn=req.body.Roll_No
    let name=req.body.Name;
    let dob=req.body.DOB;
    let score=req.body.Score;

    let qr=`update result set Roll_No='${rn}',Name='${name}',DOB='${dob}',Score='${score}' where idResult=${id}`;
    db.query(qr,(err,result)=>{
        if(err)
        console.log(err);
        res.send({message:"Data Updated Successfully!"})
    })

})



app.delete('/result/:id',(req,res)=>{
    let id=req.params.id;
    let qr=`delete from result where idResult=${id}`;
    db.query(qr,(err,result)=>{
        if(err)
console.log(err,"Error While retreiving single data");

    res.send({Message:"Data Deleted Successfully"});

    })
})


//Get all account

app.get('/login',(req,res)=>{
    let qr=`select * from account`;
    db.query(qr,(err,result)=>{
        if(err){
            console.log(err,"Error");
        }
        if(result.length>=0)
        {
            res.send({
                message:"All Results Data",
            data:result
            });
        }
    });
});

app.listen(4000,()=>{
    console.log('Server Running...');
})
