import {
  getAllContacts,
  getContactsForDMList,
  searchContacts,
} from "../controllers/ContactController.js";
import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const contactRoutes = Router();

contactRoutes.post("/search", verifyToken, searchContacts);
contactRoutes.get("/get-contacts-for-dm", verifyToken, getContactsForDMList);
contactRoutes.get("/get-all-contacts", verifyToken, getAllContacts);

export default contactRoutes;
