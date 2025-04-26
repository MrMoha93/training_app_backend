import express from "express";
import exercises from "./routes/exercises";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/exercises", exercises);

const PORT = 6688;

app.listen(PORT, () => console.log("Listening on port" + PORT));
