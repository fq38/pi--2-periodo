var sequelize = require("sequelize")
var banco = require("../db/db")

//tabelaProduto
var produto = banco.define("Produtos",{
    id: {
        type: sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    produto: {
        type: sequelize.STRING(50),
        allowNull: false,

    },
    descricao: {
        type: sequelize.STRING(150),
        allowNull: false,

    },
    valor: {
        type: sequelize.INTEGER(8),
        allowNull: false,
    },

},{
    freezeTableName: true,
    timestamps: false
})

produto.sync() //cria tabela

module.exports = produto