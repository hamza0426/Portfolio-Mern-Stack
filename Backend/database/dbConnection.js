import mongoose from "mongoose";

const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "PORTFOLIO"
    }).then(() => {
        console.log("Database connected Successfully!!!")
    }).catch((error) => {
        console.log(`Some internal Server error while connection DB: ${error}`)
    });
};

export default dbConnection;