import { Router } from "express";
import categoryRouter from "./categoryRouter.js";
import customerRouter from "./customerRouter.js";
import gameRouter from "./gameRouter.js";
import rentalRouter from "./rentalRouter.js";


const router = Router();

router.use(categoryRouter);
router.use(gameRouter);
router.use(customerRouter);
router.use(rentalRouter);


export default router;