var express = require("express");
var controladorProduto = require("../controllers/controladorProduto");


var rotas = express.Router();

rotas.get("/", controladorProduto.buscarProdutoBanco);
rotas.post("/", controladorProduto.inserirProdutoBanco);
rotas.put("/:id", controladorProduto.atualizarProdutoBanco);
rotas.delete("/:id", controladorProduto.apagarProdutoBanco);

rotas.get("/cadastrar/produto", controladorProduto.cadastro);
rotas.get("/editar/produto/:id",controladorProduto.editarFormulario) //retorna a pagina de edição
rotas.post("/ediReqProduto/:id",controladorProduto.montarReqEdicao) //monta requisição de edição
rotas.get("/remover/:id",controladorProduto.montarReqDelete)  //monta requisição de remoção

module.exports = rotas;