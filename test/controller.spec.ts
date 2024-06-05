import express from "express";
import request from "supertest";
import { Request, Response } from "express";
import { Controller } from "./../src/controller"
import { FileOps } from "./../src/file/file-ops.interface";

describe('Controller', () => {
    let testController: Controller;
    let testApp: any;

    const mockFileOps: FileOps = {
        getFileNames: () => Promise.resolve([]),
        getMostRecentEntries: () => Promise.resolve([])
    }

    beforeAll(() => {
        testController = new Controller(mockFileOps);
        testApp = express();
        testApp.get('/files', (req: Request, res: Response) => {
            testController.getFileNames(req, res);
        });
        testApp.get('/logs/:filename', (req: Request, res: Response) => {
            testController.getLogs(req, res);
        });
    });

    it('should return file names', async () => {
        const expected = ["file1.txt", "file2.json"];
        jest.spyOn(mockFileOps, 'getFileNames').mockResolvedValueOnce(expected);
        const response = await request(testApp).get('/files');

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({ files: expected });
    });

    it('should return an error if the directory does not exist', async () => {
        const error = { code: 'ENOTDIR', path: 'teapot' };
        jest.spyOn(mockFileOps, 'getFileNames').mockRejectedValueOnce(error);
        const response = await request(testApp).get('/files');

        expect(response.status).toEqual(400);
        expect(response.text).toMatch(error.path);
    });

    it('should return logs', async () => {
        const expected = ["line1", "line2"];
        jest.spyOn(mockFileOps, 'getMostRecentEntries').mockResolvedValueOnce(expected);
        const response = await request(testApp).get('/logs/messages.log');

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({ logs: expected });
    })

    it('should return an error if the file name is not valid', async () => {
        const error = { code: 'EISDIR' };
        jest.spyOn(mockFileOps, 'getMostRecentEntries').mockRejectedValueOnce(error);
        const response = await request(testApp).get('/logs/messages.log');

        expect(response.status).toEqual(400);
    });

    it('should return an error if the file does not exist', async () => {
        const error = { code: 'ENOENT', path: 'teapot' };
        jest.spyOn(mockFileOps, 'getMostRecentEntries').mockRejectedValueOnce(error);
        const response = await request(testApp).get('/logs/messages.log');

        expect(response.status).toEqual(404);
        expect(response.text).toMatch(error.path);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
});