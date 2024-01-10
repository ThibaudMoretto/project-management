import express from 'express';

import userController from '../controllers/userController';
import loginController from '../controllers/loginController';

const router = express.Router();

router.get('/user', userController.getUser);
router.post('/login', loginController.login);

module.exports = router;
