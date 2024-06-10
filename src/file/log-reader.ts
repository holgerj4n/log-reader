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
        const filePath = path.join(this.logDir, params.fileName);
        const stat = await fsPromise.stat(filePath);
        const lines: string[] = [];
        const numLines = params.limit ?? 10;
        let position = stat.size;
        let remaining = '';

        const filterFn = (line: string) => params.search ? line.match(params.search) : line;

        const handle = await fsPromise.open(filePath);
        do {
            const blockSize = Math.min(position, 1024);
            position -= blockSize;
            const { buffer } = await handle.read(Buffer.alloc(blockSize), 0, blockSize, position);
            remaining = buffer + remaining;
            const parts = remaining.split('\n');
            remaining = parts.shift() ?? '';
            lines.push(...parts.filter(filterFn).reverse());
        } while (lines.length < numLines && position > 0);

        handle.close();
        if (remaining) lines.push(remaining);
        return lines.slice(0, numLines);
    }
}