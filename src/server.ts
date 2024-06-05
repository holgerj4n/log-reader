import express from "express";
import { Controller } from "./controller";
import { LogReader } from "./file/log-reader";

// Set required variables
const port = process.env.PORT || 3000;
const logDir = process.argv[2] || process.env.LOG_DIR || "/var/log/";

// Create dependencies
const logReader = new LogReader(logDir);
const controller = new Controller(logReader);

const app = express();

// Map server routes to controller methods
app.get('/files', (req, res) => {
    controller.getFileNames(req, res);
});
app.get('/logs/:filename', (req, res) => {
    controller.getLogs(req, res);
});

// Start server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    console.log(`Log directory: ${logDir}`);
});
