import mongoose from "mongoose";

const dbConnection = async() :Promise<void> =>{
    try{
        const dburl = process.env.DB_CONNECTION_URL || "";
        await mongoose.connect(dburl);
        console.log("Data Base Conecction Suceeded");
    }
    catch(err){
        console.log("Error While Connecting To DB", err);
        process.exit(1);
    }
}

export default dbConnection;