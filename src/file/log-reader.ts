import fsPromise from "fs/promises";
import { FileRequestParams } from "./../model/file-request-params";
import { FileOps } from "./file-ops.interface";

export class LogReader implements FileOps {
    constructor(private readonly logDir: string) {}

    async getFileNames(): Promise<string[]> {
        const entries = await fsPromise.readdir(this.logDir, {
            withFileTypes: true,
            encoding: "utf-8"
        });
        return entries
            .filter(entry => entry.isFile())
            .map(file => file.name);
    }

    getMostRecentEntries(params: FileRequestParams): string[] {
        console.log(`Get entries from ${this.logDir + params.fileName}`);
        return [];
    }
}