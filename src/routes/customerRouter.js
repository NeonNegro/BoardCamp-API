import { Router } from "express";
import { getCustomers } from "../controllers/customersController.js";


const customerRouter = Router();

customerRouter.get('/customers', getCustomers);

export default customerRouter;