import express from "express";
import exercises from "./routes/exercises";
import exercisesinfo from "./routes/exercisesinfo";
import reviews from "./routes/reviews";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/exercises", exercises);
app.use("/api/exercisesinfo", exercisesinfo);
app.use("/api/reviews", reviews);

const PORT = 6688;

app.listen(PORT, () => console.log("Listening on port" + PORT));
