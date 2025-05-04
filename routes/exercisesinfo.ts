import express from "express";
import { PrismaClient } from "@prisma/client";
import auth from "../middleware/auth";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", auth, async (req, res) => {
  const exercises = await prisma.exerciseInfo.findMany();
  res.send(exercises);
});

router.get("/:id", auth, async (req, res) => {
  const exercise = await prisma.exerciseInfo.findFirst({
    where: { id: req.params.id },
  });

  if (!exercise)
    return res.status(404).send("The exercise with the given id was not found");

  res.send(exercise);
});

export default router;
