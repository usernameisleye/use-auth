const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    let jwtToken;

    jwtToken = req.cookies.jwt;

    if(jwtToken){
        try{
            const { _id } = jwt.verify(jwtToken, process.env.SECRET);

            req.user = await User.findById({ _id }).select("_id");
            next();
        }
        catch(error){
            res.status(401)
            .json({
                error: "Unauthorized request, Invalid token"
            });
        }
    }
    else{
        res.status(401)
        .json({
            error: "Unauthorized request, No token found"
        });
    }
};

module.exports = authMiddleware;