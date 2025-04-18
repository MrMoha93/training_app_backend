import express from "express";

const router = express.Router();

interface ExirciseSet {
  weight: number;
  reps: number;
}

export interface Exercise {
  id: string;
  name: string;
  sets: ExirciseSet[];
}

const exercises: Exercise[] = [
  { id: "1", name: "BenchPress", sets: [] },
  { id: "2", name: "Deadlifts", sets: [] },
  { id: "3", name: "Squats", sets: [] },
  { id: "4", name: "Situps", sets: [] },
  { id: "5", name: "Spinning", sets: [] },
];

router.get("/", (req, res) => {
  return res.send(exercises);
});

router.get("/:id", (req, res) => {
  const exercise = exercises.find((exercise) => exercise.id === req.params.id);

  if (!exercise)
    return res.status(404).send("The exercise with the given id was not found");

  return res.send(exercise);
});

export default router;
