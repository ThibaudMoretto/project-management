import express from 'express';

import { validate } from '../validations/validate';
import { ZCreateProject, ZCreateTaskData } from 'project-management-types';

import userController from '../controllers/userController';
import localesController from '../controllers/localesController';
import loginController from '../controllers/loginController';
import projectsController from '../controllers/projectsController';
import tasksController from '../controllers/tasksController';

const router = express.Router();

router.get('/user', userController.getUser);
router.post('/login', loginController.login);

router.get('/projects', projectsController.getAllProjects);
router.post('/projects', validate('body', ZCreateProject), projectsController.createProject);

router.get('/projects/:id/tasks', tasksController.getAllByProjectId);
router.post('/projects/:id/tasks', validate('body', ZCreateTaskData), tasksController.createTask);
router.put('/projects/:id/tasks/:taskId', tasksController.updateTask);

router.get('/locales', localesController.getLocales);

module.exports = router;
