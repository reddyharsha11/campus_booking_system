import mongoose, { Document, Schema } from "mongoose";

export interface  Ibook extends Document{
    username:string,
    roomname:string,
    startAt:string,
    endAt:string,
    status:'Confirm' | 'Cancel' | 'Pending'
}

const roomsBookedSchema = new Schema<Ibook>({
    username:{type:String, required: true},
    roomname:{type:String, required: true},
    startAt:{type:String, required: true},
    endAt:{type:String, required: true},
    status:{type: String, enum:['Confirm' , 'Cancel' , 'Pending'], default:'Confirm', required: true}
})

const roomsBookingDataModel= mongoose.model<Ibook>("BookedRoomsData", roomsBookedSchema);

export default roomsBookingDataModel;