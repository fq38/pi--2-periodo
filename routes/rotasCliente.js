var express = require("express");

var controlador = require("../controllers/controladorCliente");

var rotas = express.Router();

rotas.get("/", controlador.buscarClienteBanco);
rotas.post("/cadastroCliente/", controlador.inserirClienteBanco);
rotas.put("/atualizarCliente/:id", controlador.atualizarClienteBanco);
rotas.delete("/apagarCliente/:id", controlador.apagarClienteBanco);


rotas.get("/cadastrarCliente/", controlador.cadastro);

rotas.get("/editar/cliente/:id",controlador.editarFormularioCliente) //retorna a pagina de edição

rotas.post("/ediReqCliente/:id",controlador.montarReqEdicaoCliente) //monta requisição de edição
rotas.get("/removerCliente/:id",controlador.montarReqDelete)  //monta requisição de remoção

module.exports = rotas;