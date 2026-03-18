import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { contactMessagesTable } from "@workspace/db/schema";
import { SubmitContactBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/contact", async (req, res) => {
  try {
    const body = SubmitContactBody.parse(req.body);

    await db.insert(contactMessagesTable).values({
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message,
    });

    res.status(201).json({
      success: true,
      message: "Thank you for reaching out! We'll get back to you within 2 business days.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit message" });
  }
});

export default router;
