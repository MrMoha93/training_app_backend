import express from "express";
import { Exercise } from "./exercises";

const router = express.Router();

export interface Session {
  id: string;
  name: string;
  exercises: Exercise[];
}

const sessions: Session[] = [
  { id: "1", name: "Monday", exercises: [] },
  { id: "2", name: "Tuesday", exercises: [] },
  { id: "3", name: "Thursday", exercises: [] },
  { id: "4", name: "Saturday", exercises: [] },
  { id: "5", name: "Sunday", exercises: [] },
];

router.get("/", (req, res) => {
  return res.send(sessions);
});

export default router;
