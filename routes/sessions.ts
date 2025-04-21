import express from "express";

const router = express.Router();

export interface SessionFormData {
  id?: string;
  name: string;
  exerciseIds: string[];
}

export interface Session {
  id: string;
  name: string;
}

const sessions: Session[] = [
  { id: "1", name: "Monday" },
  { id: "2", name: "Tuesday" },
  { id: "3", name: "Thursday" },
  { id: "4", name: "Saturday" },
  { id: "5", name: "Sunday" },
];
export function getSessions() {
  return sessions;
}

router.get("/", (req, res) => {
  return res.send(sessions);
});

export default router;
