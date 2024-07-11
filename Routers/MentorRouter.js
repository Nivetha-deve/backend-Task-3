const express = require('express');
const  mongoose  = require('mongoose');
const Mentor = require('../Models/MentorModel');

const mentorRouter = express.Router();
/* get all mentor details */
mentorRouter.get('/', async (req,res) => {
    try{
        const mentors = await Mentor.find();
        res.send(mentors);
    }catch(err){
        res.status(400).send(err);
    }
    
})
/* create mentor */
mentorRouter.post('/',async (req,res) => {
    const {name,email,course} = req.body;
    console.log(req.body)
    const addMentor = new Mentor({
        "name" : name,
        "email" : email,
        "course" : course
    })
    try{
        const newMentor = await addMentor.save();
        //  console.log(newMentor);
        res.send(newMentor)
    }catch(err){
        console.log(err);   
        res.status(500);
        res.send(err);
    }
})
/* get mentor based on ID */
mentorRouter.get('/getmentor/:id',async (req,res) => {
    const {id} = req.params;
    try{
        const mentor = await Mentor.findById({_id : id})
        res.status(200).send(mentor);
    }catch(err){
        res.status(500);
        res.send(err);
    }
})
mentorRouter.patch('/assignmentor-students/',async (req,res) => {
    // const {id} = req.params;
    const {mentor,studentList} = req.body;
    console.log(mentor)
    try{
        const mentor1= await Mentor.findOneAndUpdate({_id : new mongoose.Types.ObjectId(mentor)},{$set : {students : studentList}})
        res.send(mentor1);
    }catch(err){
        console.log(err);
        res.status(500);
        res.send(err);
    }
})


module.exports = mentorRouter;