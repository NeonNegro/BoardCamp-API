import { Router } from "express";
//import authRouter from "./authRouter.js";
import categoryRouter from "./categoryRouter.js";
import rentalRouter from "./rentalRouter.js";


const router = Router();
//router.use(authRouter);
router.use(rentalRouter);
router.use(categoryRouter);
// router.use(pupupuRouter);


export default router;