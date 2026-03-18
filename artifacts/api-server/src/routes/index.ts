import { Router, type IRouter } from "express";
import healthRouter from "./health";
import statsRouter from "./stats";
import eventsRouter from "./events";
import contactRouter from "./contact";

const router: IRouter = Router();

router.use(healthRouter);
router.use(statsRouter);
router.use(eventsRouter);
router.use(contactRouter);

export default router;
