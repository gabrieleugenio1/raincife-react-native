'use strict';
import routes from '../routes/index.mjs';
import session from "express-session";
import MongoStore from 'connect-mongo'
import options from '../db/Mongodb.mjs';
import cors from 'cors';

function configExpress(express, app) {

  //Configurando express
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  //Session
  app.use(session({
    secret:process.env.SECRET_SESSION,
    resave:false,
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000, // 2 dias
    },
    saveUninitialized:true,  
    store: process.env.MONGO_DB_URL?.length > 3 ? MongoStore.create(options) : new session.MemoryStore(),
  }));

  //Rotas
  routes(app);

  //Página não encontrada: 404
  app.get('*', (req, res) => {
    res.status(404).json({error:'404'});
  });
};

export default configExpress;
