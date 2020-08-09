import { Request, Response } from 'express';
import db from '../database/connection';

export default class ClassesController {
    async index(request: Request, response: Response) {
        // returns ALL registered teachers

        try {
            const teachers = await db('users').select('*');
            response.send(teachers);
        } catch(error) {
            response.send({
                message: 'Cannot get teachers.'
            });
        }
    }
}