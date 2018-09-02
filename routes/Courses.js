const express = require('express');
const Joi=require('joi');
const Router = express.Router();
const mongoose = require('mongoose');




 const Course =  mongoose.model('Course',new mongoose.Schema({
    name:{ type:String, 
   required:true},
   

   
    isPublised: {type:String},
    author: {type:String},
    tags: { type:String,
    required: function(v) 
{
    return v && v.length > 0
}}
}));

Router.get('/', async(req,res)=>
{
     const course =  await Course.find();
     res.send(course);
});



// api with apratmeters
 Router.get('/:id',(req,res)=>
{
    const course = courses.find(c=> c.id ==  parseInt(req.params.id));
    if (!course) res.status(404).send('this course have is not listed to the respected id');
    res.send(course);
})

// adding data to course
Router.post('/', async(req,res)=>
{  
    const {error} = ValidateCourse(req.body);
      if (error) {
        res.status(400).send(error.details[0].message); 
         return;
     };

   const course = new Course ({ 
    name: req.body.name,
    isPublised: req.body.isPublised,
    author: req.body.author,
     tags: req.body.tags
});
    const result = await course.save(course);
    res.send(result);
});

// Delete code is below 

Router.delete("/api/courses/:id",(req,res)=>
{
const course = courses.find(c => c.id=== parseInt(req.params.id));

 if(!course)  res.status(404).send('no such course exists ');
 const index = courses.indexOf(course);
      courses.splice(index,1);
      res.send(courses);
});


// input valdiation fucntiio is created here
 function ValidateCourse (courses)
 {

 const schema =
 {
 name: Joi.string().required()
 };
        return Joi.validate(courses,schema);
 };

 module.exports = Router;