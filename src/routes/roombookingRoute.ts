import { Router } from "express";
import { cancelById, createBooking, userBookings, getAllBookings} from "../controllers/roombooking.js"

const bookings = Router();


bookings.get("/api/users/:id/bookings",userBookings);

bookings.post("/api/resources/book/:id",createBooking);

bookings.get("/api/bookings/allbookings",getAllBookings);

bookings.put("/api/resources/:id/cancel",cancelById);


export default bookings;
