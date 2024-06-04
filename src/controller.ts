import { Request, Response } from "express";
import { FileOps } from "./file/file-ops.interface";

export class Controller {
    constructor(private readonly fileOps: FileOps) {}

    getFileNames(_: Request, res: Response) {
        const result = this.fileOps.getFileNames();
        res.json({ files: result });
    }

    getLogs(req: Request, res: Response) {
        const result = this.fileOps.getMostRecentEntries({ fileName: req.params.filename });
        res.json({ logs: result });
    }
}
