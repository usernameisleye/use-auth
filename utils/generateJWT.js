const jwt = require("jsonwebtoken");

// Generate JWT and store in HOC
const generateJWT = ( res, _id ) => {
    const token = jwt.sign({ _id }, process.env.SECRET, {
        expiresIn: "7d"
    });

    const duration = new Date();
    duration.setDate(duration.getDate() + 7);

    res.cookie("jwt", token, {
        path: "/",
        secure: false,
        httpOnly: true, 
        expires: duration,
        sameSite: "Strict",
    });
};

module.exports = generateJWT;