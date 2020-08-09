import { Request, Response } from 'express';

export default class ApiDocumentation {
    
    async index(request: Request, response: Response) {

        const serverAddress = `http://localhost:${request.socket.localPort}`;

        const routes = {
            "classes": {
                'base': `${serverAddress}/classes`,
                'methods': [ 'GET', 'POST' ],
                'queries': [ 'week_day', 'subject', 'from' ],
                'example': `${serverAddress}/classes?week_day=0&subject=geometry&from=10:00`,
            },

            "teachers": {
                'base': `${serverAddress}/teachers`,
                'methods': [ 'GET' ],
                'queries': [ ],
                'example': '',
            },

            "connections": {
                'base': `${serverAddress}/connections`,
                'methods': [ 'GET' ],
                'queries': [ ],
                'example': '',
            },
        }

        response.send(routes);
    }

}