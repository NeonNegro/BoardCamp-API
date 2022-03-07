import { Router } from "express";
import { getCustomers, getCustomer, createCustomer, updateCustomer } from "../controllers/customersController.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import customerSchema from "../schemas/customerSchema.js";


const customerRouter = Router();

customerRouter.get('/customers', getCustomers);
customerRouter.get('/customers/:id', getCustomer);
customerRouter.post('/customers', validateSchemaMiddleware(customerSchema), createCustomer);
customerRouter.put('/customers/:id', validateSchemaMiddleware(customerSchema), updateCustomer);

export default customerRouter;