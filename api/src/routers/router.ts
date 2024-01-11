import express from 'express';

import userController from '../controllers/userController';
import loginController from '../controllers/loginController';
import projectsController from '../controllers/projectsController';
import tasksController from '../controllers/tasksController';

const router = express.Router();

router.get('/user', userController.getUser);
router.post('/login', loginController.login);

router.get('/projects', projectsController.getAllProjects);
router.post('/projects', projectsController.createProject);

router.get('/projects/:id/tasks', tasksController.getAllByProjectId);
router.post('/projects/:id/tasks', tasksController.createTask);
router.put('/projects/:id/tasks/:taskId', tasksController.updateTask);

module.exports = router;
