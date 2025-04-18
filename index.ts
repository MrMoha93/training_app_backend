import express from "express";
import exercises from "./routes/exercises";
import sessions from "./routes/sessions";

const app = express();

app.use("/api/exercises", exercises);
app.use("/api/sessions", sessions);

const PORT = 6688;

app.listen(PORT, () => console.log("Listening on port" + PORT));
