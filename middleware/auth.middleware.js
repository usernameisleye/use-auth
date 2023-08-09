const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
const error = require("../utils/error")

const authMiddleware = async (req, res, next) => {
    const secret = process.env.SECRET

    const token = req.cookies.tokkenn
    if(!token) throw new error("Unauthorized access: Token not found", 401)

    try {
        const decoded = jwt.verify(token, secret)

        let user = await User.findById(decoded.id)
        if(!user) throw new error("Unauthorized access: User does not exists", 401)
        req.user = user
    }
    catch(error) {
        throw new error("Unauthorized access: Invalid token", 401)
    }

    next()
}

module.exports = authMiddleware