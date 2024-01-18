import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import addTokenToResponse from './middlewares/addTokenToResponse';
import { authenticateToken } from './middlewares/authenticateToken';
import { userIsActive } from './middlewares/userIsActive';

require('dotenv').config();
require('./config/dayjs');

const app = express();
const port = process.env.PORT || 3001;

const router = require('./routers/router');

app.use(
  cors({
    origin: process.env.APP_BASE_URL,
    credentials: true,
  })
);

app.use(cookieParser());

// To parse the incoming requests with JSON payloads
app.use(express.json());

// To use POST method in HTML requests
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(authenticateToken);
app.use(userIsActive);
app.use(addTokenToResponse);
app.use('/api/', router);

app.listen(port, () => console.log(`Server is running on port ${port}`));
