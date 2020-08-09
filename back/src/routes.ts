import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';
import TeacherController from './controllers/TeacherController';
import ApiDocumentation from './controllers/ApiDocumentation';

const routes = express.Router();

// Controllers
const classesControllers = new ClassesController();
const connectionsController = new ConnectionsController();
const teacherController = new TeacherController();
const apiDocumentation = new ApiDocumentation();

// Routes
routes.get('/', apiDocumentation.index);                    // ExtraMile4: use index to document API

routes.get('/classes', classesControllers.index);
routes.post('/classes', classesControllers.create);

routes.get('/connections', connectionsController.index);
routes.post('/connections', connectionsController.create);


routes.get('/teachers', teacherController.index);           // ExtraMile3: teachers route

export default routes;
