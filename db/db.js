const sequelize = require("sequelize");

const conexao = new  sequelize ("progweb", "root", "12345678",{
    host: 'progweb.celoe2bos7lb.us-east-1.rds.amazonaws.com',
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