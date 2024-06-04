import { FileRequestParams } from "./../model/file-request-params";

export interface FileOps {

    getFileNames: () => string[],

    getMostRecentEntries: (params: FileRequestParams) => string[]
}