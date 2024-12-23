import mongoose from "mongoose"

const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI as string)
    .then((db) => console.log("DB connected : ", db.connection.host))
    .catch((err) => console.log("DB connection failed : ", err))
}

export default connectDB;