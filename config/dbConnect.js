const mongoose = require("mongoose")
let string = process.env.DB_STRING

const connectToDb = async () => {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }

    try{
        await mongoose.connect(string, options)
        console.log(`DB connected`)
    }
    catch(error){
        console.error(`Error connecting to MongoDB: ${error.message}`)
        process.exit(1)
    }
}

module.exports = connectToDb