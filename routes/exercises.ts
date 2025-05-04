import express from "express";
import { validate } from "../schemas/Exercise";
import { PrismaClient } from "@prisma/client";
import auth from "../middleware/auth";

const router = express.Router();
const prisma = new PrismaClient();

interface SetFormData {
  weight: number;
  reps: number;
}

router.get("/", auth, async (req, res) => {
  const exercises = await prisma.exercise.findMany({
    include: { sets: true },
  });
  return res.send(exercises);
});

router.post("/:id/sets", auth, async (req, res) => {
  const exercise = await prisma.exercise.findFirst({
    where: { id: req.params.id },
  });

  if (!exercise)
    return res.status(404).send("The exercise with the given id was not found");

  const { weight, reps } = req.body;

  const set = await prisma.set.create({
    data: {
      weight,
      reps,
      exerciseId: req.params.id,
    },
  });

  return res.status(201).send(set);
});

router.get("/:id", auth, async (req, res) => {
  const exercise = await prisma.exercise.findFirst({
    where: { id: req.params.id },
    include: { sets: true },
  });

  if (!exercise)
    return res.status(404).send("The exercise with the given id was not found");

  return res.send(exercise);
});

router.post("/", auth, async (req, res) => {
  const validation = validate(req.body);

  if (!validation.success) return res.status(400).send(validation.error.issues);

  const exercise = await prisma.exercise.create({
    data: {
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      ...(req.body.date && { date: new Date(req.body.date) }),
      sets: req.body.sets
        ? {
            create: req.body.sets.map((set: SetFormData) => ({
              weight: set.weight,
              reps: set.reps,
            })),
          }
        : undefined,
    },
    include: {
      sets: true,
    },
  });

  return res.status(201).send(exercise);
});

router.put("/:id", auth, async (req, res) => {
  const exercise = await prisma.exercise.findFirst({
    where: { id: req.params.id },
  });

  if (!exercise)
    return res.status(404).send("The exercise with the given id was not found");

  const validation = validate(req.body);

  if (!validation.success) return res.status(400).send(validation.error.issues);

  await prisma.set.deleteMany({
    where: { exerciseId: req.params.id },
  });

  const updatedExercise = await prisma.exercise.update({
    where: { id: req.params.id },
    data: {
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      date: new Date(req.body.date),
      sets: {
        create: req.body.sets.map((set: SetFormData) => ({
          weight: set.weight,
          reps: set.reps,
        })),
      },
    },
    include: {
      sets: true,
    },
  });

  return res.send(updatedExercise);
});

router.delete("/:id", auth, async (req, res) => {
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
