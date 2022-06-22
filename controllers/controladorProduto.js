var produto = require('../models/produto');
var cliente = require('../models/cliente');
var axios = require("axios")
var qs = require("querystring");


const controladorProduto = {};

var listaProdutores = []

//CREATE
controladorProduto.inserirProdutoBanco = function (req, res) {
   produto.create({
       produto: req.body.produto,
       descricao: req.body.descricao,
       valor: req.body.valor,
       
       
   }). then(
       function(){
           res.status(200).redirect("/");
       }
   ).catch(
       function(error){
           res.status(500).send("erro ao criar produto: " + " " + error)
       }
   )
};



//READ
controladorProduto.buscarProdutoBanco = function (req, res) {
    console.log("oi")
   produto.findAll ({
       raw: true
   }).then(
       function(produtos){
        cliente.findAll({
            raw: true
        }).then(
            function(clientes){
                res.render("inicio", { produtores: produtos ,  clientes: clientes})
                console.log()
            }
        ).catch(
            function(erro){
                res.status(500).send(`erro ao buscar os clientees: ${erro}`)
            }
        )


           
       }
   ).catch(
       function(erro){
           res.status(500).send(`erro ao buscar os produtoes: ${erro}`)
       }
   )

  
};



//UPDATE
controladorProduto.atualizarProdutoBanco = function (req, res) {
   produto.update({
    produto: req.body.produto,
    descricao: req.body.descricao,
    valor: req.body.valor,
      
   },{
       where: {
           id: req.params.id
       }
   }).then(
       function(){
           res.sendStatus(200)
       }
   ).catch(
       function(error){
        res.status(500).send("Erro ao atualizar a produto: " + error);
       }
   )
};


//DELETE
controladorProduto.apagarProdutoBanco = function (req, res) {
    produto.destroy({ where: {
        id: req.params.id
    }
        
       },{
          
       }).then(
           function(){
               res.sendStatus(200)
           }
       ).catch(
           function(error){
            res.status(500).send("Erro ao remover a produto: " + error);
           }
       )
};


//métodos do handlebars

controladorProduto.cadastro = function (req, res) {
    try {
        res.render("cadastro")
    } catch (error) {
        res.status(500).send("Erro ao acessar página de cadastro: " + error);
    }
};


//solicitarEditarFormulario
controladorProduto.editarFormulario = function(req,res){
    produto.findOne({
        raw: true,
        where: {
            id: req.params.id
        }
    }).then(
        function(pc){
            res.render("editarForm",{
                idProduto: req.params.id,
                pcProduto: pc.produto,
                pcDescricao: pc.descricao,
                pcValor: pc.valor,
               
            })
        }
    ).catch(
        function(error){
            res.status(500).send("Erro ao acessar página de edição: " + error);
        }
    )
}

//montarRequisiçãoEditar
controladorProduto.montarReqEdicao = function (req, res) {
    axios.put("/" + req.params.id,
        qs.stringify({
            produto: req.body.produto,
            descricao: req.body.descricao,
            valor: req.body.valor,
            
        }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            proxy:{
                host: "localhost",
                port: 3000
            }
        }
    ).then(function () {
            res.status(200).redirect("/")
        })
    .catch(function (err) {
        res.status(500).send("Erro ao editar o produto: " + err);
    })
}


//montarRequisiçãoRemover
controladorProduto.montarReqDelete = function (req, res) {
    axios.delete('/' + req.params.id,
    
    {
        
        proxy:{
            host: "44.201.251.72",
            port: 3000
        }
    }).then(function () {
            res.status(200).redirect("/")
        })
        .catch(function (err) {
            res.status(500).send("Erro ao apagar um produto: " + err);
        })
}

module.exports = controladorProduto;