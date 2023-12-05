'use strict';
import routes from '../routes/index.mjs';
import cors from 'cors';

function configExpress(express, app) {


  //Configurando express
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  //Rotas
  routes(app);

};

export default configExpress;
