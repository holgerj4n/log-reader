import { Response } from "express";

export function handleError(res: Response, err: any) {
    switch (err.code) {
        case 'ENOTDIR':
            res.status(400).send(`${err.path} is not a directory.`);
            break;
        case 'EISDIR':
            res.status(400).send("You must specify a valid file.");
            break;
        case 'ENOENT':
            res.status(404).send(`${err.path} does not exist.`);
            break;
        default:
            console.error(err);
            res.status(500).send(err.message);
    }
}