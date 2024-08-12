import express from "express"; //const express = require('express') método otimizado para poder ser usado em outros arquivos
import conexao from "../infra/conexao.js"
const app = express();

// para o express ler body.json
app.use(express.json());

// retornar o objeto por id
function buscarSelecaoPorId(id) {
  return selecoes.filter((selecao) => selecao.id == id);
}

// pegar a posição do elemento dentro do array via id
function buscarIndexSelecao(id) {
  return selecoes.findIndex((selecao) => selecao.id == id);
}

//Rotas
app.get("/selecoes", (req, res) => {
  //res.status(200).send(selecoes);
  const sql = "SELECT * FROM selecoes;";
  conexao.query(sql, (error, result) => {
    if (error) {
      console.log(error);
      res.status(404).json({ 'error': error })
    } else {
      res.status(200).json(result);
    }
  });
});

// get de selecoes por id
app.get("/selecoes/:id", (req, res) => {
  res.json(buscarSelecaoPorId(req.params.id));
});

app.post("/selecoes", (req, res) => {
  selecoes.push(req.body);
  res.status(201).send("Seleção cadastrada com sucesso!");
});

// Corrigindo a rota DELETE
app.delete("/selecoes/:id", (req, res) => {
  let index = buscarIndexSelecao(req.params.id);
  if (index !== -1) {
    selecoes.splice(index, 1);
    res.send(`Seleção com id ${req.params.id} excluída com sucesso!`);
  } else {
    res.status(404).send("Seleção não encontrada");
  }
});

// Corrigindo a rota PUT
app.put("/selecoes/:id", (req, res) => {
  let index = buscarIndexSelecao(req.params.id);
  if (index !== -1) {
    selecoes[index].selecao = req.body.selecao;
    selecoes[index].grupo = req.body.grupo;
    res.json(selecoes);
  } else {
    res.status(404).send("Seleção não encontrada");
  }
});

export default app;
