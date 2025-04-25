import express from "express";
import { validate } from "../schemas/Exercise";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

interface SetFormData {
  weight: number;
  reps: number;
}

router.get("/", async (req, res) => {
  const exercises = await prisma.exercise.findMany({
    include: { session: true, sets: true },
  });
  return res.send(exercises);
});

router.get("/:id", async (req, res) => {
  const exercise = await prisma.exercise.findFirst({
    where: { id: req.params.id },
    include: { session: true, sets: true },
  });

  if (!exercise)
    return res.status(404).send("The exercise with the given id was not found");

  return res.send(exercise);
});

router.post("/", async (req, res) => {
  const validation = validate(req.body);

  if (!validation.success) return res.status(400).send(validation.error.issues);

  const session = await prisma.session.findFirst({
    where: { id: req.body.sessionId },
  });

  if (!session)
    return res.status(404).send("The session with the given id was not found");

  const exercise = await prisma.exercise.create({
    data: {
      name: req.body.name,
      sessionId: req.body.sessionId,
      sets: {
        create: req.body.sets.map((set: SetFormData) => ({
          weight: set.weight,
          reps: set.reps,
        })),
      },
    },
    include: {
      session: true,
      sets: true,
    },
  });

  return res.status(201).send(exercise);
});

router.put("/:id", async (req, res) => {
  const exercise = await prisma.exercise.findFirst({
    where: { id: req.params.id },
  });

  if (!exercise)
    return res.status(404).send("The exercise with the given id was not found");

  const validation = validate(req.body);

  if (!validation.success) return res.status(400).send(validation.error.issues);

  const session = await prisma.session.findFirst({
    where: { id: req.body.sessionId },
  });

  if (!session)
    return res.status(404).send("The session with the given id was not found");

  const updatedFood = await prisma.exercise.update({
    where: { id: req.params.id },
    data: {
      name: req.body.name,
      sessionId: req.body.sessionId,
      sets: {
        create: req.body.sets.map((set: SetFormData) => ({
          weight: set.weight,
          reps: set.reps,
        })),
      },
    },
  });

  return res.send(updatedFood);
});

router.delete("/:id", async (req, res) => {
  const exercise = await prisma.exercise.findFirst({
    where: { id: req.params.id },
  });

  if (!exercise)
    return res.status(404).send("The exercise with the given id was not found");

  await prisma.set.deleteMany({
    where: { exerciseId: req.params.id },
  });

  const deletedExercise = await prisma.exercise.delete({
    where: { id: req.params.id },
  });

  return res.send(deletedExercise);
});

export default router;
