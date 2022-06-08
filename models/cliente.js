var sequelize = require("sequelize")
var banco = require("../db/db")

//tabelaCliente
var cliente = banco.define("cliente",{
    id: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    cliente: {
        type: sequelize.STRING(150),
        allowNull: false,
    },
    email: {
        type: sequelize.STRING(50),
        allowNull: false,
    },
    cpf: {
        type: sequelize.BIGINT,
        allowNull: false,
    }
},{
    freezeTableName: true,
    timestamps: false
})

cliente.sync() //cria tabela

module.exports = cliente