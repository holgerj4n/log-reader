import { FileRequestParams } from "./../model/file-request-params";
import { FileOps } from "./file-ops.interface";

export class LogReader implements FileOps {
    constructor(private readonly logDir: string) {}

    getFileNames(): string[] {
        console.log("Get all file names");
        return [];
    }

    getMostRecentEntries(params: FileRequestParams): string[] {
        console.log(`Get entries from ${this.logDir + params.fileName}`);
        return [];
    }
}