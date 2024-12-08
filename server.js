const express=require("express")
const app=express();
const mysql=require("mysql2")
const cors=require("cors")

const bodyParser = require('body-parser');

app.use(bodyParser.json()); // Parse JSON payloads

require("./db/conn");

const router=require("./routes/router");
const port=8001;






// app.get("/", (req, res)=>{
//     res.send("server start")
// });

// middleware
app.use(express.json())
app.use(cors());

app.use(router);


app.listen(port,()=>{
    console.log("server starts at port no :" + port)
})