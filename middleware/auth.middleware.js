const User = require("../models/user.model")
const jwt = require("jsonwebtoken")

const authMiddleware = async (req, res, next) => {
    const secret = process.env.SECRET

    const token = req.cookies.jwt
    if(!token) throw new Error("Unauthorized access: Token not found")

    try {
        const decoded = jwt.verify(token, secret)

        let user = await User.findById(decoded._id)
        if(!user) throw new Error("Unauthorized access: User does not exists")
        req.user = user
    }
    catch(error) {
        console.log(error.message)
        throw new Error("Unauthorized access: Invalid token")
    }

    next()
}

module.exports = authMiddleware