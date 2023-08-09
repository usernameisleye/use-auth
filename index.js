require("dotenv").config()
require("express-async-errors")

const cors = require("cors")
const express = require("express")
const db = require("./config/dbConnect")
const cookieParser = require("cookie-parser")
const errorMiddleware = require("./middleware/error.middleware")

const app = express()
let port = process.env.PORT

// Middlewares
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use("/api/v1/user", require("./routes/user.routes"))

app.listen(port, async () => {
    await db()

    console.log(`Server is connected and running on port ${port}`)
})

// Handle errors
errorMiddleware(app)
app.on("error", (error) => {
    console.error(`Server incurred an error: \n ${error}`)
})