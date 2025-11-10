import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import dbConnection from "./config/db.js";
import resources from "./routes/roomresourcesRoute.js";
import bookings from "./routes/roombookingRoute.js";
import registers from "./routes/registrationsRoute.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/", registers)

app.use("/", resources);

app.use("/", bookings);



const startServer = async () => {
    try {

    // Connect to the database
    await dbConnection();
    const PORT = process.env.PORT || 1107;

    
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
     
    } 
    catch (error) {

    
    console.error('Failed to start server:', error);

    
    process.exit(1);
}

}
startServer();