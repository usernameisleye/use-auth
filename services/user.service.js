const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let SECRET = process.env.SECRET;
let CLIENT_URL = process.env.CLIENT_URL;
let BCRYPT_SALT = process.env.BCRYPT_SALT;

const generateJWT = require("../utils/generateJWT");
const sendMail = require("../utils/sendMail");

// Signup
const signup = async (body, res) => {
    const {email} = body;
    let user = await User.findOne({email});
    if(user){
        throw new Error("Email already exists");
    };

    user = await User.create({...body});
    generateJWT(res, user._id);

    return {
        email: user.email,
        username: user.username
    }
};

// Login 
const login = async (body, res) => {
    const { email, password } = body;

    let user = await User.findOne({email});
    if(user && (await user.comparePasswords(password))){
        generateJWT(res, user._id);

        res.status(200);
        return {
            email: user.email,
            username: user.username
        };
    }else{
        res.status(400);
        throw new Error("Invalid email or password");
    }
};

// Lougout 
const logout = (res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200);
    return {
        msg: "User logged out"
    };
};

// Forgot password
const forgotPassword = async (res, email) => {
    let user = await User.findOne({ email });
    if(!user) {
        throw new Error("Email does not exists");
    };
        
    const newSecret = SECRET + user.password;
    const { _id } = user._id;
    const resetToken = jwt.sign({ _id }, newSecret, {
        expiresIn: "10m"
    });

    const OTL =`${CLIENT_URL}/api/user/reset-password?id=${user._id}&token=${resetToken}`;
    sendMail(
        res,
        user.email,
        "Password Reset",
        {
            username: user.username,
            OTL
        },
        "./template/requestReset.handlebars"
    );

    res.status(201);
    return {
        msg: "Password Reset Link has been sent to your email",
        OTL
    };
};

// Reset password
const resetPassword = async (
    res,
    id,
    token,
    password,
    confirmPassword
) => {
    let user = await User.findOne({ _id: id });
    if(!user){
        throw new Error("Invalid or expired password reset link");
    }
    if(password !== confirmPassword){
        throw new Error("Passwords do not match");
    }

    const newSecret = SECRET + user.password;
    const tokenOK = jwt.verify(token, newSecret);

    if(!tokenOK){
        throw new Error("Invalid or expired password reset link");
    }
    const newPassword = await bcrypt.hash(password, Number(BCRYPT_SALT));

    await User.updateOne(
        { _id: id },
        { $set: { password: newPassword } },
        { new: true }
    );

    const { email, username } = user;
    sendMail(
        res,
        email,
        "Password Reset Successfully",
        {
            username
        },
        "./template/resetDone.handlebars"
    );

    res.status(200);
    return{
        msg: "Password reset successful"
    }
};

module.exports = {
    signup,
    login,
    logout,
    forgotPassword,
    resetPassword
}