'use strict';

//Definindo os principais módulos
import { Router } from 'express';
import GetController from '../controllers/GetController.mjs';
import Middleware from '../middlewares/Middlewares.mjs';

const router = Router();

router
      .get('/', GetController.index)
      .get('/cadastro', Middleware.jaEstaAutenticado, GetController.cadastro)
      .get('/login', Middleware.jaEstaAutenticado, GetController.login)
      .get('/esqueci-senha', Middleware.jaEstaAutenticado, GetController.esqueceuSenha)
      .get('/home', Middleware.autorizacao, GetController.home)
      .get('/logout', Middleware.autorizacao, GetController.logout)
      .get('/admin', Middleware.autorizacao, Middleware.admin, GetController.admin)
      .get('/admin/user/:id', Middleware.admin, GetController.alterarUser)
export default router;