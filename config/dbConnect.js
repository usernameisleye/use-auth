const mongoose = require("mongoose");

let PORT = process.env.PORT;
let DB_STRING = process.env.DB_STRING;

const connectToDb = async (app) => {
    try{
        await mongoose.connect(
            DB_STRING, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        
        app.listen(PORT, () => {
            console.log(`Server is connected and running on port ${PORT}`);
        });
    }
    catch(error){
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectToDb;