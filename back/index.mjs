'use strict';
//Ativar .env
import dotenv from "dotenv";
dotenv.config();
import "dotenv/config.js";
import { Conn } from "./db/Conn.mjs";

//Importar express
import express from "express";

 //Ativar configurações
import configExpress from "./configs/express.mjs";

//Configuração inicial
const app = express();
const port = process.env.PORT || 3000;
configExpress(express, app);

//Porta em execução
Conn.sync().then(()=>
    app.listen(port, console.log(`Servidor executando na porta ${port}`))
);