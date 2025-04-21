import express from "express";
import { validate } from "../schemas/Exercise";
import { getSessions } from "./sessions";

const router = express.Router();

interface ExirciseSet {
  weight: number;
  reps: number;
}

interface ExerciseFormData {
  id?: string;
  name: string;
  sessionId: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets: ExirciseSet[];
  sessionId: string;
}

interface SetFormData {
  weight: number;
  reps: number;
}

const exercises: Exercise[] = [
  { id: "1", name: "BenchPress", sessionId: "1", sets: [] },
  { id: "2", name: "Deadlifts", sessionId: "2", sets: [] },
  { id: "3", name: "Squats", sessionId: "3", sets: [] },
  { id: "4", name: "Situps", sessionId: "4", sets: [] },
  { id: "5", name: "Spinning", sessionId: "5", sets: [] },
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

router.post("/", (req, res) => {
  const validation = validate(req.body);

  if (!validation.success) return res.status(400).send(validation.error.issues);

  const session = getSessions().find(
    (session) => session.id === req.body.sessionId
  );

  if (!session)
    return res.status(404).send("The session with the given id was not found");

  const exercise: Exercise = {
    id: Date.now().toString(),
    name: req.body.name,
    sets: req.body.sets,
    sessionId: req.body.sessionId,
  };
  exercises.push(exercise);
  return res.status(201).send(exercise);
});

export default router;
