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
  if (nome && cidade && estado && titles && pagamento != undefined) {
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
  } else {
    res.status(400).json({msg: "Dados incompletos"});
  }
});

routes.get("/ListarTodos", (req, res) => {
  res.status(200).json(DB.times);
});

routes.get("/Busca/:nome", (req, res) => {
  const nome = req.params.nome;
  if (nome != undefined) {
    const time = DB.times.find((c) => c.nome == nome);
    if (time == null) {
      res.status(404).json({msg: `${nome} não encontrado`});
    } else {
      res.status(200).json(time);
    }
  } else {
    res.status(400).json({msg: "Erro"});
  }
});

routes.put("/AtualizarTime/:id", (req, res) => {
  if (isNaN(req.params.id)) return res.sendStatus(400);
  else {
    const id = parseInt(req.params.id);
    const time = DB.times.find((c) => c.id === id);
    if (time !== undefined) {

      const {
        nome,
        cidade,
        estado,
        serie,
        titles,
        pagamento,
      } = req.body;

      if (!nome && !cidade && !estado && !titles && !pagamento) {
        return res.status(400).json({error: 'Você precisa informar pelo menos 1 campo'})
      }

      if (nome) time.nome = nome
      if (cidade) time.cidade = cidade
      if (estado) time.estado = estado
      if (serie) time.serie = serie
      if (titles) time.titles = titles
      if (pagamento) time.pagamento = pagamento
      return res.json({ msg: "Time alterado com sucesso.", time})
    }else{
      return res.status(404).json({msg: "Time não enconstrado"})
    }
  }

});

routes.get("/DeletarTime/:id", (req, res) => {
  res.status(200).json({msg: "excluir"});
});


module.exports = routes;
