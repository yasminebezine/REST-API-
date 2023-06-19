const express = require ("express");
const connectDB = require ("./config/connectDB");
const user = require ("./models/userModel");
require ("dotenv").config();


const app = express ();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
const PORT =8080;

connectDB ();
app.post("/api/adduser",async (req,res)=>{
try {
const {name,lastName,age}= req.body;
const newUser = await user.create ({name,lastName,age});
console.log(newUser);
res.status(200).json ({ message : "user added success", user:newUser});
} catch (error) {
    res.status(400).json({error});

}
});

app.get("/api/getAllUsers", async (req, res) => {
    try {
      const userslist = await user.find();
      res.status(200).json(userslist);
    } catch (err) {
      res.status(400).json({ error: err });
    }
  });

app.put ("/api/updateuser/:id", async (req,res)=> {
try {
const update = await user.findByIdAndUpdate (
req.params.id,
{
$set: { ...req.body },
},
{ new: true }
);
res.status(200).json({message : "user updated" ,data:update});
 } catch (err){
    res.status(400).json({err});
 }
});
app.delete("/api/delete/:id", async (req, res) => {
    try {
      await user.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "user is deleted" });
    } catch (err) {
      res.status(400).json({ err });
    }
  });


  app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`app listening on port ${PORT}`)
);


