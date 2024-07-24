const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const orphanageSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    userType: {
        type: String,
        enum: ['user', 'orphanage'], // Ensure userType is either 'user' or 'orphanage'
        required:true,
    },
});

orphanageSchema.pre('save', async function (next) {
    const orphanage = this;
    if (!orphanage.isModified('password')) next();
    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(orphanage.password, saltRound);
        orphanage.password = hash_password;
    } catch (error) {
        next(error);
    }
});

orphanageSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: "30d",
        });
    } catch (error) {
        console.error(error);
    }
}

const Orphanage = new mongoose.model("Orphanage", orphanageSchema);
module.exports = Orphanage;
