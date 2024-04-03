import mongoose from "mongoose";

const connectMongoDB = async() => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) {
            throw new Error("MONGODB_URI is not defined");
        }
       await  mongoose.connect(mongoURI);
        console.log("Connected to MongoDB")
    } catch(error) {
        console.error(error);
    }
}

export default connectMongoDB;