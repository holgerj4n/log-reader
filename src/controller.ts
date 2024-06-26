import { Request, Response } from "express";
import { FileOps } from "./file/file-ops.interface";
import { validateFileRequest } from "./util/request-validator";
import { handleError } from "./util/error-handler";

export class Controller {
    constructor(private readonly fileOps: FileOps) {}

    /**
     * GET /files
     *  
     * @returns The names of all files in the log directory 
     */
    async getFileNames(_: Request, res: Response) {
        try {
            const result = await this.fileOps.getFileNames();
            res.json({ files: result });
        } catch (err) {
            handleError(res, err);
        }
    }

    /**
     * GET /logs/:filename
     * 
     * @param filename The name of the log file
     * @param limit (optional) The maximum number of lines to retrieve
     * @param search (optional) A keyword to filter lines
     * @returns The most recent entries from the given log file
     */
    async getLogs(req: Request, res: Response) {
        try {
            const params = validateFileRequest(req);
            const result = await this.fileOps.getMostRecentEntries(params);
            res.json({ logs: result });
        } catch (err) {
            handleError(res, err);
        }
    }
}
