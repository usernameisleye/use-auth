const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require("bcrypt");
let BCRYPT_SALT = process.env.BCRYPT_SALT;

const userSchema = new Schema ({
    email:{
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    username:{
        type: String,
        trim: true,
        required: true
    },
    password:{
        type: String,
        trim: true,
        required: true
    },
}, {
    timestamps: true
});

userSchema.pre("save", async function(next){
    if (!this.isModified("password")) {
        return next();
    }
    // Hash before save
    // const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, Number(BCRYPT_SALT));
    next();
});

userSchema.methods.comparePasswords = async function(userPassword){
    // Compare
    return await bcrypt.compare(userPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);