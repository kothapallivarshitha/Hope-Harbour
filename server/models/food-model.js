const {Schema,model,Mongoose}=require('mongoose');
const foodSchema=new Schema({
    photo:{type:String,required:true},
    description:{type:String,required:true},
    place:{type:String,required:true},
    need:{type:String,required:true},
    price:{type:String,required:true},
})

const Food=new model("Foods",foodSchema);

module.exports=Food;