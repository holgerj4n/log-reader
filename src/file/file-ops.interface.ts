import { FileRequestParams } from "./../model/file-request-params";

export interface FileOps {

    getFileNames: () => Promise<string[]>,

    getMostRecentEntries: (params: FileRequestParams) => Promise<string[]>
}