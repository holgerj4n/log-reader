import express from "express";
import { Controller } from "./controller";
import { LogReader } from "./file/log-reader";

const port = 3000;
const logDir = process.env.LOG_DIR || "/var/log/";

const logReader = new LogReader(logDir);
const controller = new Controller(logReader);

const app = express();

app.get('/files', (req, res) => {
    controller.getFileNames(req, res);
});
app.get('/logs/:filename', (req, res) => {
    controller.getLogs(req, res);
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    console.log(`Log directory: ${logDir}`);
});
