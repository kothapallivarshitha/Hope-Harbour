const Food=require('../models/food-model');

const foods=async(req,res)=>{
    try{
      const response=await Food.find();
      if(!response){
        res.status(404).json({msg:"no service found"});
        return;
      }
      res.status(200).json({msg:response});
    }catch(error)
    {
        console.log(`error from food page ${error}`);
    }
};

module.exports=foods;