import express from "express";
import exercises from "./routes/exercises";

const app = express();

app.use("/api/exercises", exercises);

const PORT = 6688;

app.listen(PORT, () => console.log("Listening on port" + PORT));
