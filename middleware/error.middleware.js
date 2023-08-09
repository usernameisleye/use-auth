const response = require("../utils/response")

const errors_types = [
    "CastError",
    "JsonWebTokenError",
    "ValidationError",
    "SyntaxError",
    "MongooseError",
    "MongoError",
]

const errorMiddleware = (app) => {
    app.use("*", (req, res) => {
        res
        .status(400)
        .json(response.error("Invalid request"))
    })

    app.use((error, req, res, next) => {
        const { name, status, code, message } = error

        if (name === "CustomError") {
            res
            .status(status)
            .json(response.error(message))
            
        }
        else if (name === "MongoError" && code === 11000) {
            const attr = Object.entries(error.keyValue)[0][0]
            res
            .status(400)
            .json(response.error(`${attr} already exists`))
        }
        else if (errors_types.includes(name)) {
            res
            .status(400)
            .json(response.error(message))
        }
        else {
            res
            .status(500)
            .json(response.error(message))
        }

        next()
    })
    
    return app
}

module.exports = errorMiddleware