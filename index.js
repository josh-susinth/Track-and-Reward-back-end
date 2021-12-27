const express= require("express");
const app=express();
const pool=require("./db")
 
app.use(express.json());

//select initiativ
app.get("/emp", async(req,res)=>{
    const{id}=req.params;
    try {
        const ini= await pool.query("SELECT * FROM initiative ");
        
        res.json(ini.rows);
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

app.get("/emp/:eid", async(req,res)=>{
    const{eid}=req.params;
    try {
        const ini= await pool.query("SELECT * FROM initiative left outer join subscription on initiative.pid=subscription.pid ");
        
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

//create/add a employee


app.post("/emp", async(req,res)=>{
   try {
       const {empid}=req.body;
       const {empname}=req.body;
       const {designation}=req.body;
       const {password}=req.body;
       const newemp=await pool.query("INSERT INTO employee (empid,empname,designation,password) values ($1,$2,$3,$4) RETURNING *",
       [empid,empname,designation,password]);

       res.json(newemp);
   } catch (err) {
       console.error(err.message);
   } 
});


const PORT = process.env.PORT || 5000;

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
