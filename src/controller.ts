import { Request, Response } from "express";
import { FileOps } from "./file/file-ops.interface";

export class Controller {
    constructor(private readonly fileOps: FileOps) {}

    async getFileNames(_: Request, res: Response) {
        const result = await this.fileOps.getFileNames();
        res.json({ files: result });
    }

    async getLogs(req: Request, res: Response) {
        const result = await this.fileOps.getMostRecentEntries({
            fileName: req.params.filename,
        });
        res.json({ logs: result });
    }
}
