var cliente = require('../models/cliente');
var axios = require("axios")
var qs = require("querystring");


const clienteControlador = {};

var listaClientes = []

//CREATE
clienteControlador.inserirClienteBanco = function (req, res) {
   cliente.create({
       cliente: req.body.cliente,
       email: req.body.email,
       cpf: req.body.cpf,
       
       
   }). then(
       function(){
           res.status(200).redirect("/");
       }
   ).catch(
       function(error){
           res.status(500).send("erro ao criar cliente: " + " " + error)
       }
   )
};


//READ
clienteControlador.buscarClienteBanco = function (req, res) {
   cliente.findAll({
       raw: true
   }).then(
       function(dados){
           res.render("inicio", {clientes: dados})
           console.log(dados)
       }
   ).catch(
       function(erro){
           res.status(500).send(`erro ao buscar os clientees: ${erro}`)
       }
   )
};



//UPDATE
clienteControlador.atualizarClienteBanco = function (req, res) {
   cliente.update({
    cliente: req.body.cliente,
       email: req.body.email,
       cpf: req.body.cpf,
      
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
        res.status(500).send("Erro ao atualizar a cliente: " + error);
       }
   )
};


//DELETE
clienteControlador.apagarClienteBanco = function (req, res) {
    cliente.destroy({ where: {
        id: req.params.id
    }
        
       },{
          
       }).then(
           function(){
               res.sendStatus(200)
           }
       ).catch(
           function(error){
            res.status(500).send("Erro ao remover a cliente: " + error);
           }
       )
};


//métodos do handlebars

clienteControlador.cadastro = function (req, res) {
    try {
        res.render("cadastroCliente")
    } catch (error) {
        res.status(500).send("Erro ao acessar página de cadastro: " + error);
    }
};



//solicitarEditarFormulario
clienteControlador.editarFormularioCliente = function(req,res){
    cliente.findOne({
        raw: true,
        where: {
            id: req.params.id
        }
    }).then(
        function(pc){
            res.render("editarFormCliente",{
                idCliente: req.params.id,
                pcCliente: pc.cliente,
                pcEmail: pc.email,
                pcCpf: pc.cpf,
                
            })
        }
    ).catch(
        function(error){
            res.status(500).send("Erro ao acessar página de edição: " + error);
        }
    )
}


//montarRequisiçãoEditar
clienteControlador.montarReqEdicaoCliente = function (req, res) {
    axios.put("/atualizarCliente/" + req.params.id,
        qs.stringify({
            cliente: req.body.cliente,
            email: req.body.email,
            cpf: req.body.cpf,
            
        }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            proxy:{
                host: "44.201.251.72",
                port: 3000
            }
        }
    ).then(function () {
            res.status(200).redirect("/")
        })
    .catch(function (err) {
        res.status(500).send("Erro ao editar o cliente: " + err);
    })
}

//montarRequisiçãoRemover
clienteControlador.montarReqDelete = function (req, res) {
    axios.delete('/apagarCliente/' + req.params.id,
    
    {
        
        proxy:{
            host: "44.201.251.72",
            port: 3000
        }
    }).then(function () {
            res.status(200).redirect("/")
        })
        .catch(function (err) {
            res.status(500).send("Erro ao apagar um cliente: " + err);
        })
}

module.exports = clienteControlador;