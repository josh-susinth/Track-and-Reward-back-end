const express= require("express");
const app=express();
const pool=require("./db")
const PORT = process.env.PORT || 5000;

app.use(express.json());


//login api

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/login", async(req,res)=>{
    var uname=req.query.uname;
    var pwd=req.query.pwd ;
    console.log(uname);
    console.log(pwd);
    try {
        const ini= await pool.query("SELECT empid ,username FROM employee WHERE  username=$1 and password=$2", [uname,pwd]);
    
        if(ini.rows.length > 0) {
            console.log("login success");
            res.json(ini.rows);
        }
        else{
            console.log("login not success");
            res.send("INVALID USERNAME OR PASSWORD");
        }
        
    } catch (err) {
        console.error(err.message);
    } 
})

 //subscribe
app.post("/subscribe/:emid/:eid", async(req,res)=>{
    const{emid}=req.params;
    const{eid}=req.params;
    try {
        const sub=await pool.query("INSERT INTO subscription (empid,pid) values ($1,$2) RETURNING *",
       [emid,eid]);

       res.json(sub);
    } catch (err) {
        console.error(err.message);
    } 
 })

//unsubscribe
app.post("/unsubscribe/:emid/:eid", async(req,res)=>{
    const{emid}=req.params;
    const{eid}=req.params;
    try {
        const unsub=await pool.query("DELETE FROM subscription WHERE empid=$1 AND pid=$2 RETURNING *",
       [emid,eid]);

       res.json(unsub);
    } catch (err) {
        console.error(err.message);
    } 
 }) 

//subcription + initiative 

app.get("/list/:eid", async(req,res)=>{
    const{eid}=req.params;
    try {
        const ini= await pool.query("select * from (select * from initiative) a left outer join (select * from subscription where subscription.empid=$1)b on b.pid=a.pid",[eid]);
        
        res.json(ini.rows);
    } catch (err) {
        console.error(err.message);
    } 
 })

//get all employees
app.get("/emp", async(req,res)=>{
    try {
        const allemp= await pool.query("SELECT * FROM employee");
        
        res.json(allemp.rows);
    } catch (err) {
        console.error(err.message);
    } 
 })

 //select initiative
app.get("/initiative", async(req,res)=>{
    const{id}=req.params;
    try {
        const ini= await pool.query("SELECT * FROM initiative ");
        
        res.json(ini.rows);
    } catch (err) {
        console.error(err.message);
    } 
})




app.listen(PORT,()=>{
    console.log("listening to "+PORT);
});

app.get('/health', async (req, res) => {

	const healthcheck = {
		uptime: process.uptime(),
		message: 'OK',
		timestamp: Date.now()
	};
	try {
		res.send(healthcheck);
	} catch (e) {
		healthcheck.message = e;
		res.status(503).send();
	}
});
