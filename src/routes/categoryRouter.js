import { Router } from "express";
import { createCategory, getCategories } from "../controllers/categoriesController.js"
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import categorySchema from "../schemas/categorySchema.js";


const categoryRouter = Router();

categoryRouter.get('/categories', getCategories);
categoryRouter.post('/categories', validateSchemaMiddleware(categorySchema), createCategory);

export default categoryRouter;