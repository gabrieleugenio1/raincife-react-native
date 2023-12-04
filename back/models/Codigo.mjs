'use strict';

import { Conn } from '../db/Conn.mjs';
import { DataTypes } from 'sequelize';
import User from './User.mjs';

const Codigo = Conn.define("codigo", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    codigo:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    dataGerada:{
        type:DataTypes.DATE,
        allowNull:false
    },
    ativo:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: true
    },
}, { timestamps: false });

User.hasMany(Codigo, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Codigo.belongsTo(User);

Codigo.sync({ force: false });

export default Codigo;