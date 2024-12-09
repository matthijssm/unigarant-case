import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { getCoverageAdvice } from "./routes/getCoverageAdvice";
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.get("/", (req, res) => {
    res.send("OK!");
});

app.post("/api/coverage-advice", getCoverageAdvice);

app.listen(port, () => {
    console.log(`Unigarant Advice Server listening on port ${port}`);
});
