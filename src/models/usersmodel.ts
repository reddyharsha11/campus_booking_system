import mongoose, { Document, Schema } from "mongoose";


export interface  Iuser extends Document{
    username:string,
    email:string,
    password:string,
    author_id:string,
    role:'Student' | 'Faculty' | 'Admin'
}

const userSchema = new Schema<Iuser>({
    username:{type:String, required: true},
    email:{type:String, required: true},
    password:{type:String, required: true},
    role:{type:String , enum:['Student' , 'Faculty',  'Admin'], default:'Student',  required: true}
})

const roomUserModel= mongoose.model<Iuser>("BookingUser", userSchema);

export default roomUserModel;