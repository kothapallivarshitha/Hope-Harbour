const User=require("../models/user-model")
const Contact=require("../models/contact-model")
const Food=require("../models/food-model")
const getAllUsers=async(req,res)=>{
try{
 const users=await User.find({},{password:0});
 console.log(users)
 if(!users || users.length==0)
 {
    return res.status(404).json({message:"no users found"})
 }
 return res.status(200).json(users);
}catch(error){
console.log(error)
}
}

const updateUserById=async(req,res)=>{
   try{
     const id=req.params.id;
     const updateUserData=req.body;
     const updatedData=await User.updateOne({_id:id},{
      $set:updateUserData,
     })
   return res.status(200).json(updatedData);
   }catch(error){
   next(error)
   }
}
const postServices=async(req,res)=>{
   try{
     const {photo,description,place,need,price}=req.body;
     const updatedData=await Food.create({photo,description,place,need,price});
     console.log(req.body);
   return res.status(200).json(updatedData);
   // const {username,email,password}=req.body;
   //      const userExist=await User.findOne({email});
   //      if(userExist){
   //          return res.status(400).json({msg:"email already exist"});
   //      }
   //      const usercreated=await User.create({username,email,password});
   //      console.log(req.body);
   }catch(error){
  console.log(error);
   }
}

const deleteUserById=async(req,res)=>{
  try{
   const id=req.params.id;
   await User.deleteOne({_id:id});
   return res.status(200).json({message:"user deleted successfully"})
  }catch(error){
  next(error)
  }
}

const getUserById=async(req,res)=>{
   try{
    const id=req.params.id;
    const data=await User.findOne({_id:id},{password:0})
    return res.status(200).json(data)
   }catch(error){
   next(error)
   }
 }

const getAllContacts=async(req,res)=>{
    try{
        const contacts=await Contact.find();
        console.log(contacts)
        if(!contacts || contacts.length==0)
        {
           return res.status(404).json({message:"no contacts found"})
        }
        return res.status(200).json(contacts);
       }catch(error){
       console.log(error)
       }
}

const deleteContactById=async(req,res)=>{
   try{
    const id=req.params.id;
    await Contact.deleteOne({_id:id});
    return res.status(200).json({message:"contact deleted successfully"})
   }catch(error){
   next(error)
   }
 }

module.exports={getAllUsers,getAllContacts,deleteUserById,getUserById,updateUserById,deleteContactById,postServices};