'use strict';

//Definindo os principais módulos
import { Router } from 'express';
import GetController from '../controllers/GetController.mjs';


const router = Router();

router
      .get('/logout', GetController.logout)
export default router;