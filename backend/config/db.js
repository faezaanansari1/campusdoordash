import mongoose from "mongoose";


// Connects the app to MongoDB
const connectDB = async ()=>{
    try {
        // Connect using the URI from .env and the "RetrieverEats" database
        mongoose.connection.on('connected', ()=>console.log("Database Connected"));
        await mongoose.connect(`${process.env.MONGODB_URI}/RetrieverEats`)
    } catch (error){
        console.error(error.message);
    }

}

export default connectDB;