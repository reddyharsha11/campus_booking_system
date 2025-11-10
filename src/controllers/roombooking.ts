import roomsBookingDataModel from "../models/bookingsModel.js";
import roomUserModel from "../models/usersmodel.js";
import {Request, Response} from "express";

const cancelById = async(request:Request,response:Response)=>{
     const {id} = request.params;
    //  const {username, roomname, startAt, endAt, status}=request.body

    try{
        const cancelById = await roomsBookingDataModel.findByIdAndUpdate(id, {status:"Cancel"},{new:true});
        
        if(!cancelById){
            return response.status(404).json({message:"Room Not Found"});
        }
        else{
            return response.status(200).json({message:"Room Booking Canceled"});
        }

    }
    catch(err){
        return response.status(500).json({message:"Sever Error", err})
    }
}


const createBooking = async (request: Request, response: Response) => {
    
    // 1. Get ALL data from the body (as you requested)
    const { username, roomname, startAt, endAt, status } = request.body;

    // 2. Validation
    if (!username || !roomname || !startAt || !endAt) {
        return response.status(400).json({ message: "Missing username, roomname, startAt, or endAt" });
    }

    try {
       
        // We must check if a booking already exists at this time
        const existingBooking = await roomsBookingDataModel.findOne({
            roomname: roomname,
            status: 'Confirm', // Only check against confirmed bookings
            startAt: { $lt: endAt }, // Overlap check
            endAt: { $gt: startAt }  // Overlap check
        });

        // 4. If a booking was found, send an error
        if (existingBooking) {
            
            return response.status(409).json({ message: "This room is already booked for the requested time." });
        }

        // 5. If no conflict, create the new booking
        const newBooking = new roomsBookingDataModel({
            username: username,
            roomname: roomname,
            startAt: startAt,
            endAt: endAt,
            status: status || 'Confirm' // Default to 'Confirm' if not provided
        });

        await newBooking.save();
        
        // 201 Created
        return response.status(201).json(newBooking);

    } catch (err) {
        return response.status(500).json({ message: "Server Error", err });
    }
}

const userBookings = async (request: Request, response: Response) => {
    
    const { id } = request.params;

    try {
        // STEP 2: Find the user
        const user = await roomUserModel.findById(id);

        // STEP 3: Check if user exists
        if (!user) {
            return response.status(404).json({ message: "User Not Found" });
        }

        // STEP 4 & 5: Get the username and find all their bookings
        const bookings = await roomsBookingDataModel.find({ 
            username: user.username 
        });

        // STEP 6: Send the list of bookings
        return response.status(200).json(bookings);

    } catch (err) {
        return response.status(500).json({ message: "Server Error", err });
    }
}

const getAllBookings = async (request: Request, response: Response) => {
    try {
        // Find ALL documents in the bookings collection
        const allBookings = await roomsBookingDataModel.find();
        
        // This will return [booking1, booking2, ...]
        // or an empty array [] if there are none.
        return response.status(200).json(allBookings);

    } catch (err) {
        return response.status(500).json({ message: "Server Error", err });
    }
}

export { cancelById, createBooking, userBookings, getAllBookings};