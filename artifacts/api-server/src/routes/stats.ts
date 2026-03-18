import { Router, type IRouter } from "express";
import { GetStatsResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/stats", (_req, res) => {
  const stats = GetStatsResponse.parse({
    studentsServed: 4820,
    volunteersActive: 138,
    programsRunning: 12,
    communitiesReached: 27,
    hoursOfInstruction: 18650,
    yearsOfImpact: 8,
  });
  res.json(stats);
});

export default router;
