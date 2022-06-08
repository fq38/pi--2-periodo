var express = require("express")
var path = require("path")
var handlebars = require("express-handlebars")
var rotasProduto = require("./routes/rotasProduto")
var rotasCliente = require("./routes/rotasCliente")




var servidor = express()
const PORTA = 3000

servidor.engine("handlebars", handlebars.engine({defaultLayout:"main"}));
servidor.set("view engine","handlebars");



servidor.use(express.urlencoded({ extended: true }));
servidor.use(rotasProduto)
servidor.use(rotasCliente)


//Serves static files (we need it to import a css file)
servidor.use(express.static("public"))



servidor.listen(PORTA,function(){
    console.log("Servidor estar rodando na porta " + PORTA + "...");
})



