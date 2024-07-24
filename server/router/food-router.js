const express=require("express");
const router=express.Router();
const foods=require("../controllers/food-controller");
router.route('/donate/food').get(foods)

module.exports=router;