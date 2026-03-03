const mongoose = require('mongoose');
const connectDb = async ()=>{
    try {
     await mongoose.connect(process.env.MONGO_URI);
     console.log("Succesfully connected");
    } catch (error) {
        console.log("Data base connection failed : ",error);
        process.exit(1);
    }
}

module.exports = {connectDb};