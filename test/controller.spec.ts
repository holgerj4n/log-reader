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

    it('should return logs', async () => {
        const expected = ["line1", "line2"];
        jest.spyOn(mockFileOps, 'getMostRecentEntries').mockResolvedValueOnce(expected);
        const response = await request(testApp).get('/logs/messages.log');

        expect(response.status).toEqual(200);
        expect(response.body).toEqual({ logs: expected });
    })

    afterEach(() => {
        jest.restoreAllMocks();
    });
});