import { Router } from "express";
import { getRentals } from "../controllers/RentalsController.js";




const rentalRouter = Router();

rentalRouter.get('/rentals', getRentals);
//rentalRouter.get('/rentals/:id', getRental);



export default rentalRouter;