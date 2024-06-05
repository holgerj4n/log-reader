import fs from "fs";
import fsPromise from "fs/promises";
import path from "path";
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

    async getMostRecentEntries(params: FileRequestParams): Promise<string[]> {
        return new Promise((resolve, reject) => {
            const filePath = path.join(this.logDir, params.fileName);
            const stream = fs.createReadStream(filePath, "utf-8");
            const lines: string[] = [];
            let buffer: string = '';

            stream.on('data', chunk => {
                buffer += String(chunk);
                const parts = buffer.split('\n');
                lines.push(...parts.slice(0, -1));
                buffer = parts.pop() ?? '';
            });
            stream.on('end', () => {
                if (buffer) lines.push(buffer);
                resolve(lines.reverse());
            });
            stream.on('error', (err) => {
                reject(err);
            });
        });
    }
}