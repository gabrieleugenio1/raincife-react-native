'use strict';
import routes from '../routes/index.mjs';
import flash from "connect-flash";
import session from "express-session";
import MongoStore from 'connect-mongo'
import options from '../db/Mongodb.mjs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';

const currentDir = dirname(fileURLToPath(import.meta.url));

function configExpress(express, app) {

  //Configurando express
  app.set("view engine", "ejs");
  app.set('views', `${currentDir}/../views`);
  app.use(express.static("public"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(flash());

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
    res.status(404).json({message:'404'});
  });
};

export default configExpress;
