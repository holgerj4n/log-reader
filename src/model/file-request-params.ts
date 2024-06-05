export interface FileRequestParams {

    // The name of the requested file
    fileName: string,

    // The maximum number of lines to retrieve
    limit?: number,

    // A keyword to filter lines
    search?: string
}