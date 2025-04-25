import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const sessions = await prisma.session.findMany();
  return res.send(sessions);
});

export default router;
