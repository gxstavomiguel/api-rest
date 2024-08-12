import express from "express"; //const express = require('express') método otimizado para poder ser usado em outros arquivos
import conexao from "../infra/conexao.js";
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
  const sql = "SELECT * FROM selecoes;";
  conexao.query(sql, (error, result) => {
    if (error) {
      console.log(error);
      res.status(404).json({ error: error });
    } else {
      res.status(200).json(result);
    }
  });
});

// get de selecoes por id
app.get("/selecoes/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM selecoes WHERE id=?;";
  conexao.query(sql, id, (error, result) => {
    const linha = result[0];
    if (error) {
      console.log(error);
      res.status(404).json({ error: error });
    } else {
      res.status(200).json(linha);
    }
  });
});

app.post("/selecoes", (req, res) => {
  const selecao = req.body;
  const sql = "INSERT INTO selecoes SET ?;";
  conexao.query(sql, selecao, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: error });
    } else {
      res.status(201).json(result);
    }
  });
});

// Corrigindo a rota DELETE
app.delete("/selecoes/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE  FROM selecoes WHERE id=?;";
  conexao.query(sql, id, (error, result) => {
    if (error) {
      console.log(error);
      res.status(404).json({ error: error });
    } else {
      res.status(200).json(result);
    }
  });
});

// Corrigindo a rota PUT
app.put("/selecoes/:id", (req, res) => {
  const id = req.params.id;
  const selecao = req.body;
  const sql = "UPDATE selecoes SET ? WHERE id=?;";
  conexao.query(sql, [selecao, id], (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: error });
    } else {
      res.status(200).json(result);
    }
  });
});

export default app;
