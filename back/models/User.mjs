"use strict";

import { Conn } from "../db/Conn.mjs";
import { DataTypes } from "sequelize";

const User = Conn.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING(120),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(120),
    allowNull: true,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  telefone: {
    type: DataTypes.STRING(14),
    allowNull: true,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: 6,
    },
  },
  dataNascimento: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  morro: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM("comum", "admin"),
    defaultValue: "comum",
    allowNull: false,
  },
});

User.sync({ force: false });

export default User;
