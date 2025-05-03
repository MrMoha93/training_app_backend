import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const exercises = await prisma.exerciseInfo.findMany();
  res.send(exercises);
});

router.get("/:id", async (req, res) => {
  const exercise = await prisma.exerciseInfo.findFirst({
    where: { id: req.params.id },
  });

  if (!exercise)
    return res.status(404).send("The exercise with the given id was not found");

  res.send(exercise);
});

export default router;
