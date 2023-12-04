'use strict';
import { Sequelize } from "sequelize";

const Conn = new Sequelize(process.env.DATABASE, process.env.DB_NOME, process.env.DB_SENHA, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  timezone: process.env.DB_TIMEZONE,
  pool: {
    max: 100,
    min: 0,
    idle: 10000
  }
});

export { Sequelize, Conn };
