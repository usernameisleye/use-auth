// @desc Route Not Found
const noRoute = (req, res,next) => {
    const error = new Error(`Route Not Found: ${req.originalUrl}`);

    res.status(404);//Not found
    next(error);
};

// @desc General Error Middleware
const errorMiddleware = (err, req, res, next) => {
    let resStatus = res.statusCode === 200 ? 500 : res.statusCode;
    let response = err.message;

    if(err.name === "CastError" && err.kind === "ObjectId"){
        resStatus = 404;
        response = "Not Found" 
    };

    res.status(resStatus)
    .json({
        response,
        stack: process.env.NODE_SCRIPT === "production" ? null : err.stack 
    });
};

module.exports = {
    noRoute,
    errorMiddleware
};