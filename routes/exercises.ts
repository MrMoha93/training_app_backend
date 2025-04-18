import express from "express";

const router = express.Router();

interface ExirciseSet {
  weight: number;
  reps: number;
}

interface Exercise {
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

export default router;
