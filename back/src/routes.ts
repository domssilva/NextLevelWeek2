import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';
import TeacherController from './controllers/TeacherController';

const routes = express.Router();

// Controllers
const classesControllers = new ClassesController();
const connectionsController = new ConnectionsController();
const teacherController = new TeacherController();

// Routes
routes.get('/classes', classesControllers.index);
routes.post('/classes', classesControllers.create);

routes.get('/connections', connectionsController.index);
routes.post('/connections', connectionsController.create);

// ExtraMile3: teachers route
routes.get('/teachers', teacherController.index);

export default routes;
