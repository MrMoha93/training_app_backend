import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/:exerciseInfoId", async (req, res) => {
  const reviews = await prisma.review.findMany({
    where: { exerciseInfoId: req.params.exerciseInfoId },
    orderBy: { createdAt: "desc" },
  });

  res.send(reviews);
});

router.post("/:exerciseInfoId", async (req, res) => {
  const exercise = await prisma.exerciseInfo.findFirst({
    where: { id: req.params.exerciseInfoId },
  });

  if (!exercise)
    return res.status(404).send("The exercise with the given id was not found");

  const { rating, comment } = req.body;

  if (!rating || rating < 1 || rating > 5)
    return res.status(400).send("Rating must be between 1 and 5");

  const review = await prisma.review.create({
    data: {
      rating,
      comment,
      exerciseInfoId: req.params.exerciseInfoId,
    },
  });

  res.status(201).send(review);
});

router.delete("/:id", async (req, res) => {
  const review = await prisma.review.findFirst({
    where: { id: req.params.id },
  });

  if (!review)
    return res.status(404).send("The review with the given id was not found");

  const deletedReview = await prisma.review.delete({
    where: { id: req.params.id },
  });

  return res.send(deletedReview);
});

export default router;
