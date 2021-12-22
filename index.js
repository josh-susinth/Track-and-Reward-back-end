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




app.listen(5000,()=>{
    console.log("listening to 5000");
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