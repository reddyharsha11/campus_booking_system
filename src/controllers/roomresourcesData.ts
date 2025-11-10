import { Request, Response } from "express";

import roomsresourceDataModel from "../models/resourcesmodel.js";

const getAllResources = async(request:Request, response:Response)=>{
    try{
         const getResources = await roomsresourceDataModel.find();
         return response.status(200).json((getResources));
    }
    catch(err){
        return response.status(500).json({message:"Server Error", err})
    }
}

const getOneResource = async(request:Request, response:Response)=>{
    const {id} = request.params;

    try{
        const getById = await roomsresourceDataModel.findById(id);
        
        if(!getById){
            return response.status(201).json({message:"Room Not Found"});
        }
        else{
            return response.status(200).json((getById));
        }

    }
    catch(err){
        return response.status(500).json({message:"Sever Error", err})
    }
}

const deleteResource = async (request:Request, response:Response)=>{
        const {id} = request.params;

        try{
        const deleteBook = await roomsresourceDataModel.findByIdAndDelete(id)

        if(!deleteBook){
            return response.status(404).json({message:"Room Not Found"})
        }
        return response.status(200).json({message: "Room Booking Deleted Successfully"})

    }
    catch(err){
        return response.status(500).json({message:"Server Error"})
    }

}

const postResource = async (request:Request, response:Response)=>{
    const{roomname,type,location,capacity}=request.body

    try{
        const checkroom = await roomsresourceDataModel.findOne({roomname});

        if(checkroom){
            return response.status(400).json({message:"Room Already Exists"})
        }
        else{
            const newRoom = new roomsresourceDataModel({
                roomname,
                type,
                location,
                capacity
            });
            await newRoom.save();
            return response.status(200).json({message:"Room Added Successfully"});
        }
    }
    catch(err){
        return response.status(500).json({message:`Server Error`, err});
    }
}

const updateResource = async (request:Request, response:Response)=>{
    const {id} = request.params;
    const {roomname, type, location, capacity} = request.body;

    try{
        const checkroom= await roomsresourceDataModel.findByIdAndUpdate(id, {roomname, type, location, capacity}, {new:true});

        if(!checkroom){
            return response.status(404).json({message:"Room Not Found"});
        }
        else{
            return response.status(200).json({message:"Room Updated Successfully"});
        }
    }
    catch(err){
            return response.status(500).json({message:"Server Error", err});
        }

}

const searchResources = async (request: Request, response: Response) => {
  try {
    const { search } = request.query;

    console.log('Search query:', search);



    const resources = await roomsresourceDataModel.find({
      
      $or: [
        { roomname: { $regex: search, $options: 'i' } },
        { type: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { capacity: { $regex: search, $options: 'i' } }
      ]
    });

    return response.status(200).json(resources);
  } catch (error) {
    console.error('Error searching resources:', error);
    return response.status(500).json({ message: 'Server error' });
  }
};

export {getAllResources, getOneResource, deleteResource, postResource, updateResource,searchResources};