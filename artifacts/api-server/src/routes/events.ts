import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { eventsTable } from "@workspace/db/schema";
import { CreateEventBody } from "@workspace/api-zod";
import { desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/events", async (_req, res) => {
  try {
    const events = await db
      .select()
      .from(eventsTable)
      .orderBy(desc(eventsTable.date));

    const result = events.map((e) => ({
      id: e.id,
      title: e.title,
      description: e.description,
      date: e.date.toISOString(),
      location: e.location,
      category: e.category,
      isUpcoming: e.isUpcoming,
      imageUrl: e.imageUrl ?? null,
    }));

    res.json(result);
  } catch (err) {
    console.error("Events fetch error:", String(err));
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

router.post("/events", async (req, res) => {
  try {
    const body = CreateEventBody.parse({
      ...req.body,
      date: new Date(req.body.date),
    });
    const [event] = await db
      .insert(eventsTable)
      .values({
        title: body.title,
        description: body.description,
        date: body.date,
        location: body.location,
        category: body.category,
        isUpcoming: body.date >= new Date(),
        imageUrl: body.imageUrl ?? null,
      })
      .returning();

    res.status(201).json({
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date.toISOString(),
      location: event.location,
      category: event.category,
      isUpcoming: event.isUpcoming,
      imageUrl: event.imageUrl ?? null,
    });
  } catch (err) {
    console.error("Event create error:", String(err));
    res.status(500).json({ error: "Failed to create event" });
  }
});

export default router;
