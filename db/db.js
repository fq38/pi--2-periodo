const sequelize = require("sequelize");

const conexao = new  sequelize ("produtos", "root", "123456",{
host: 'localhost',
dialect: 'mysql'
})

conexao.authenticate().then(
    function(){
        console.log("CONECTADO AO BANCO DE DADOS COM SUCESSO")
    }
).catch(
    function(erro){
        console.log("ERROR AO CONECTAR AO BANCO DE DADOS" + " " + erro)
    }
)
module.exports =  conexao