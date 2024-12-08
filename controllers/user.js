const conn = require("../db/conn");
// const express = require("express");
// const router = new express.Router();
// const router=require("./routes/router");

const createUser = (req, res) => {
    const { name, email, age, mobile, work, add, desc } = req.body;

    // Validate input data
    if (!name || !email || !age || !mobile || !work || !add || !desc) {
        return res.status(422).json("Please fill in all data.");
    }

    try {
        // Check if the user already exists by email
        conn.query("SELECT * FROM users WHERE email=?", email, (err, result) => {
            if (err) {
                console.log("Database error:", err);
                return res.status(500).json("Database error");
            }

            if (result && result.length) {
                // User already exists
                return res.status(422).json("This email is already registered.");
            } else {
                // Insert new user into the database
                conn.query("INSERT INTO users SET ?", { name, email, age, mobile, work, add, desc }, (err, result) => {
                    if (err) {
                        console.log("Error inserting user:", err);
                        return res.status(500).json("Error inserting user.");
                    } else {
                        // Success response
                        return res.status(201).json(req.body,);
                    }
                });
            }
        });
    } catch (error) {
        console.log("Error:", error);
        return res.status(500).json("Internal server error");
    }
};

const getUsers = (req, res)=>{

    conn.query("SELECT * FROM users", (err,result)=>{
        if(err){
            res.status(422).json("no data available");
        }else{
            res.status(201).json(result);
        }
    })
}

const deleteUsers = (req, res)=>{

    const {id}=req.params;

    conn.query("DELETE FROM users WHERE id = ?",id,(err,result)=>{
        if(err){
            res.status(422).json("error");
        }else{
            res.status(201).json(result);
        }
    })
}

const updateUsers = (req, res)=>{

    const {id}=req.params;

    const data =req.body;

    conn.query("UPDATE users SET ? WHERE id = ? ",[data,id],(err,result)=>{
        if(err){
            res.status(422).json({message:"error"});
        }else{
            res.status(201).json(result);
        }
    })
}

const indUsers = (req, res)=>{

    const {id}=req.params;

    conn.query("SELECT * FROM users WHERE id = ?",id,(err,result)=>{
        if(err){
            res.status(422).json("error");
        }else{
            res.status(201).json(result);
        }
    })
}


// const insertQuery = 'CALL SPCreateUser(?, ?, ?, ?, ?, ?, ?)';
// const values = [name, email, age, mobile, work, add, desc];
// const result = await executeProcedure(insertQuery, values);
// const newId = result[0][0]?.org_id;
// res.status(201).json({
//   success: true,
//   message: `Organization added successfully`,
//   data: {
//     org_id: newId
//   }
// });

// } catch (error) {
// logger.error("Unexpected error:", error);
// const err = await errorService(error);
// return res.status(err.errorCode).json(err);
// }
// };



module.exports = {
    createUser,updateUsers,deleteUsers,getUsers,indUsers
};
