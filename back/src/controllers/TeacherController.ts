import { Request, Response } from 'express';

import generateUsers from '../utils/createFakeUser';

export default class ClassesController {
  async index(request: Request, response: Response) {
        let fakeUsers = [];
        for (let i = 0; i < 5; i++) {
            fakeUsers.push(generateUsers());
        }

        response.send(fakeUsers);
    }
}