import { FileRequestParams } from "./../model/file-request-params";

export interface FileOps {

    /**
     * @returns The names of all available files
     */
    getFileNames: () => Promise<string[]>,

    /**
     * @param params Instance of {FileRequestParams}
     * @returns The most recent entries of a given file
     */
    getMostRecentEntries: (params: FileRequestParams) => Promise<string[]>
}