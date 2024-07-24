const User=require("../models/user-model");
const bcrypt=require("bcryptjs");

const home=async(req,res)=>{
  try{
    res.status(200).send("server is running using router");
  }catch(error)
  {
    console.log(error);
  }
}
const register=async(req,res)=>{
    try{
        const {username,email,password}=req.body;
        const userExist=await User.findOne({email});
        if(userExist){
            return res.status(400).json({msg:"email already exist"});
        }
        const usercreated=await User.create({username,email,password});
        console.log(req.body);
        res.status(201).json({msg:usercreated,token:await usercreated.generateToken(),userId:usercreated._id.toString(),});
    }
    catch(error){
        // res.send(500).json({msg:"page not found"});
        next(error);
    }
    
}

const login=async(req,res)=>{
  try{
      const {email, password}=req.body;
      const userExist=await User.findOne({email});
      if(!userExist){
        return res.status(400).json({message:"Invalid credentials"});
      }
    const user=await bcrypt.compare(password,userExist.password);
    if(user)
    {
      res.status(200).json({msg:"login successful",token:await userExist.generateToken(),userId:userExist._id.toString(),});
    }
    else
    {
      res.status(401).json({message:"invalid email or password"});
    }
  }
  catch(error){
    res.send(500).json({msg:"page not found"});
}
};

const user=async(req,res)=>{
  try{
      const userData=req.user;
      console.log(userData);
      return res.status(200).json({userData});
     
  }
  catch(error)
  {
    console.log(`error from the user route ${error}`);
  }
}
module.exports={home,register,login,user};
