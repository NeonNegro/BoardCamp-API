import { Router } from "express";
import { closeRental, createRental, deleteRental } from "../controllers/rentalsController.js";
import { getRentals } from "../controllers/rentalsController.js";
import gamePriceMiddleware from "../middlewares/rentalMiddlewares/gamepriceMiddleware.js";
import hasCustomerMiddleware from "../middlewares/rentalMiddlewares/hasCustomerMiddleware.js";
import isGameAvailableMiddleware from "../middlewares/rentalMiddlewares/isGameAvailableMiddleware.js";
import isRentalNotClosedMiddleware from "../middlewares/rentalMiddlewares/isRentalNotClosedMiddleware.js";
import limitReturnDateMiddleware from "../middlewares/rentalMiddlewares/limitReturnDateMiddleware.js";
import validateSchemaMiddleware from "../middlewares/validateSchemaMiddleware.js";
import rentalSchema from "../schemas/rentalSchema.js";




const rentalRouter = Router();

rentalRouter.get('/rentals', getRentals);
//rentalRouter.get('/rentals/:id', getRental);
rentalRouter.post('/rentals', validateSchemaMiddleware(rentalSchema),hasCustomerMiddleware, gamePriceMiddleware, isGameAvailableMiddleware, createRental);
rentalRouter.post('/rentals/:id/return', limitReturnDateMiddleware, closeRental);
rentalRouter.delete('/rentals/:id', isRentalNotClosedMiddleware, deleteRental);



export default rentalRouter;