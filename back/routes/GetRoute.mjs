'use strict';

//Definindo os principais módulos
import { Router } from 'express';
import GetController from '../controllers/GetController.mjs';
import Middleware from '../middlewares/Middlewares.mjs';

const router = Router();

router
      .get('/logout', Middleware.autorizacao, GetController.logout)
export default router;