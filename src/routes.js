const express = require("express");
const routes = express.Router();
const DB = require("./times");

routes.post("/NovoTime", (req, res) => {
   const {
      nome,
      cidade,
      estado,
      serie,
      titles,
      pagamento,
  } = req.body;
  if( nome && cidade && estado && titles && pagamento != undefined){
   const id = DB.times.length + 1;
   DB.times.push({
       id,
       nome,
       cidade,
       estado,
       serie,
       titles,
       pagamento,
   }); 
   res.status(200).json({msg: "Time adicionado"});
  }else{
   res.status(400).json({msg: "Dados incompletos"});
  }
});

routes.get("/ListarTodos", (req, res) => {
    res.status(200).json(DB.times);
 });

routes.get("/Busca/:nome", (req, res) => {
   const nome = req.params.nome;
   if(nome != undefined){
      const time = DB.times.find((c)=> c.nome == nome);
      if(time == null ){
         res.status(404).json({msg : `${nome} não encontrado`});   
      }else{
         res.status(200).json(time);  
      }
   }else{
      res.status(400).json({msg : "Erro"});
   }
 });

routes.post("/AtualizarTime", (req, res) => {
    res.status(200).json({msg : "atualizar"});
 });

routes.get("/DeletarTime/:id", (req, res) => {
    res.status(200).json({msg : "excluir"});
 });
 

module.exports = routes;