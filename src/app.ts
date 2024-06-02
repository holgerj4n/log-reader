import express from "express";

const app = express();

app.get('/files', (_, res) => {
    res.send("This endpoint will return all files in the log directory.");
});

app.get('/logs', (_, res) => {
    res.send("This endpoint will return the requested log entries.");
});

export default app;
