import mongoose, { Document, Schema } from "mongoose";

export interface  Iresource extends Document{
    roomname:string,
    type:string,
    location:string,
    capacity:string,
    status:string,

}

const resourceSchema = new Schema<Iresource>({
    roomname:{type:String, required: true},
    type:{type:String, required: true},
    location:{type:String, required: true},
    capacity:{type:String, required: true},
    status:{type:String, default:"available"}
    })

const roomsresourceDataModel= mongoose.model<Iresource>("RoomsResourceData", resourceSchema);

export default roomsresourceDataModel;