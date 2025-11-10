import { Router } from "express";
import {admin,authorization} from "../middlewares/auth.js";
import { getAllResources, getOneResource, deleteResource , postResource , updateResource, searchResources} from "../controllers/roomresourcesData.js";

const  resources = Router();

resources.get("/api/resources/sea", searchResources);

resources.get("/api/resources", getAllResources);

resources.get("/api/resources/:id", getOneResource);

resources.delete("/api/resources/:id",authorization, admin ,deleteResource);

resources.post("/api/resources/post",  authorization, admin, postResource);

resources.put("/api/resources/:id/update",updateResource);

// ALL ROUTES ARE WORKING , INCLUDING OUTPUT

export default resources;