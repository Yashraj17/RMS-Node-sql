var express = require("express")
var router = express.Router()
var bodyParser = require('body-parser')
var urlencoded = bodyParser.urlencoded({extended:false})
var mysql = require('mysql');

var sql = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'rms'
})

sql.connect()
router.post('/',urlencoded,function (req,res) {
    let name = req.body.name;
    let contact = req.body.contact;
    let email = req.body.email;
    let maths = req.body.maths;
    let science = req.body.science;
    let sst = req.body.sst;
    let english = req.body.english;
    let hindi = req.body.hindi;
    sql.query(`insert into results (name,contact,email,maths,science,sst,english,hindi) value ('${name}','${contact}','${email}','${maths}','${science}','${sst}','${english}','${hindi}')`,function (error) {
            if (error) {
                throw error;
            }
            else{
                console.log("inserted successfully");
                res.redirect("/")
            }        
    })
})

router.get("/",function (req,res) {
    sql.query(`select * from results`,function (error,results) {
        if (error) {
            throw error;
        }
        else{
            res.render("homepage",{"data":results})
            console.log("data calling successfully");
        }
    })
})
router.get("/delete/:roll",function (req,res) {
    sql.query(`delete from results where roll = ${req.params.roll}`,function (error) {
        if (error) {
            throw error;
        }
        else{
            console.log("deleted successfully");
            res.redirect('/');
        }
    })
})
router.get("/edit/:roll",function (req,res) {
    sql.query(`select * from results where roll = ${req.params.roll}`,function (error,results) {
        if (error) {
            throw error;
        }
        else{
            res.render('edit',{"data":results[0]})
        }
    })
})
router.post("/edit/:roll",urlencoded,function (req,res) {
    let{name,contact,email,maths,science,sst,english,hindi} = req.body;
    sql.query(`update results set name='${name}',contact='${contact}',email='${email}',maths='${maths}',science='${science}',sst ='${sst}',english='${english}',hindi = '${hindi}' where roll= '${req.params.roll}'`,function (error) {
        if (error) {
            throw error
        }
        else{
            console.log("updated successfully");
            res.redirect('/');
        }
    })
})
router.get("/result/:roll",function (req,res) {
    sql.query(`select * from results where roll = ${req.params.roll}`,function (error,results) {
        if (error) {
            throw error;
        }
        else{
            res.render('result',{"data":results[0]})
        }
    })
})

router.get("/search?",function (req,res) {
    sql.query(`select * from results where roll = ${req.query.search}`,function (error,results) {
        if (error) {
            throw error
        }
        else{
            res.render('homepage',{"data":results})
        }
    })
})

module.exports = router