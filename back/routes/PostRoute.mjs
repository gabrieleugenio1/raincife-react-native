'use strict';

//Definindo os principais módulos
import { Router } from 'express';
import PostController from '../controllers/PostController.mjs';
const router = Router();

router
      .post('/criar-conta', PostController.cadastro)  
      .post('/envio-link', PostController.envioLink) 
      .post('/criar-nova-senha', PostController.criarNovaSenha) 
      .post('/login', PostController.login)
      .post('/admin/alterar-user/:id',PostController.alterarUser)
      .post('/admin/delete-user/:id',PostController.deleteUser)
export default router;