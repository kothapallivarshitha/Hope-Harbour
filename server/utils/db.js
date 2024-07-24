const mongoose=require('mongoose');
const URI="mongodb+srv://21501a05a1:sowjanya@cluster0.eqobpmu.mongodb.net/msd?retryWrites=true&w=majority"
const connectDb=async()=>{
    try{
        await mongoose.connect(URI);
        console.log("connection successful");
    }
    catch(error)
    {
        console.error("connection failed");
        process.exit(0);
    }
};
module.exports=connectDb;