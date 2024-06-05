import { Request } from "express";
import { FileRequestParams } from "./../model/file-request-params";

export function validateFileRequest(req: Request): FileRequestParams {
    return {
        fileName: req.params.filename,
        limit: (typeof req.query.limit === 'string') ? parseInt(req.query.limit) : undefined,
        search: (typeof req.query.search === 'string') ? req.query.search : undefined
    }
}