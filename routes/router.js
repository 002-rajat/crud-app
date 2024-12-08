const express = require("express");
const router = new express.Router();
const user= require("../controllers/user");  // Import the controller
const conn = require("../db/conn");
// Route to create a new user
router.post("/create", user.createUser); 

const { getUsers } = require('../controllers/user');
const { deleteUsers } = require('../controllers/user'); 
const { updateUsers } = require('../controllers/user'); 
const { indUsers } = require('../controllers/user'); 



// router.get("/test", user.getusers); 
// router.delete("/test", user.deleteUsers); 
// router.patch("/test", user.updateUsers); 
// router.post("/getusers", user.createUser); 
// router.delete("/deleteuser/:id", user.deleteusers);
// router.patch("/updateuser/:id", user.updateusers);  // Use the controller function here



// get userData

router.get("/test",(req,res,err)=>{
     if(err){
        res.send("err");
     } else {
        res.send(res);
     }
})
router.get("/getusers", getUsers);

// user delete api

router.delete("/deleteuser/:id", deleteUsers);



// get single user

router.get("/induser/:id", indUsers);


// update users api


router.patch("/updateuser/:id", updateUsers);


module.exports = router;
