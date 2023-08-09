const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

let secret = process.env.SECRET
let url = process.env.CLIENT_URL
let salt = process.env.BCRYPT_SALT

const sendMail = require("../utils/mail")
const generateJWT = require("../utils/generateJWT")

// Signup
const signup = async (body, res) => {
    const { email } = body
    let exists = await User.findOne({ email })
    if(exists){
        throw new Error("Email already exists")
    }

    const user = await User.create({ ...body })
    generateJWT(res, user._id)

    return {
        email: user.email,
        username: user.username
    }
}

// Login 
const login = async (body, res) => {
    const { email, password } = body

    let user = await User.findOne({ email })
    if(user && (await user.comparePasswords(password))){
        generateJWT(res, user._id)
        return {
            email: user.email,
            username: user.username
        }
    } else throw new Error("Invalid email or password")
}

// Lougout 
const logout = (res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    })
    return { msg: "User logged out" }
}

// Forgot password
const forgotPassword = async (res, email) => {
    let user = await User.findOne({ email })
    if(!user) throw new Error("Email does not exists")
        
    const newSecret = secret + user.password
    const { _id } = user._id
    const resetToken = jwt.sign({ _id }, newSecret, {
        expiresIn: "10m"
    })

    const OTL =`${url}/api/user/reset-password?id=${user._id}&token=${resetToken}`
    sendMail(
        res,
        user.email,
        "Password Reset",
        {
            username: user.username,
            OTL
        },
        "./template/requestReset.handlebars"
    )
    return { msg: "Password Reset Link has been sent to your email", OTL }
}

// Reset password
const resetPassword = async (res, id, token, password, confirmPassword) => {
    let user = await User.findOne({ _id: id })
    if(!user) throw new Error("Invalid or expired password reset link")
    if(password !== confirmPassword) throw new Error("Passwords do not match")

    const newSecret = secret + user.password
    const tokenOK = jwt.verify(token, newSecret)
    if(!tokenOK){
        throw new Error("Invalid or expired password reset link")
    }
    const newPassword = await bcrypt.hash(password, Number(salt))

    await User.updateOne(
        { _id: id },
        { $set: { password: newPassword } },
        { new: true }
    )

    const { email, username } = user
    sendMail(
        res,
        email,
        "Password Reset Successfully",
        {
            username
        },
        "./template/resetDone.handlebars"
    )
    return { msg: "Password reset successfully"}
}

module.exports = { signup, login, logout, forgotPassword, resetPassword }