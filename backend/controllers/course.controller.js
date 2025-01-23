//import { Course } from "../models/course.model";

import { Course } from "../models/course.model.js";

export const createCourse= async(req,res)=>{
    const {title,description,price,image}=req.body;


    try{
if( !title || !description || !price || !image){
    return res.status(400).json({errors:"Please provide all required fields"});
}
const courseData={
    title,
    description,
    price,
    image
};
  const Courses=await course.create(courseData)
  res.json({ 
    message: 'Create Course Successful',
    Courses
  })
    }
    catch(error){
 res.status(500).json({error:"error creating course"  });
    }
}