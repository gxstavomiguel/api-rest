import express from "express"; //const express = require('express') método otimizado para poder ser usado em outros arquivos
import conexao from "./app/database/conexao.js";
import SelecaoController from "./app/controllers/SelecaoController.js";

const app = express();

// para o express ler body.json
app.use(express.json());

app.get("/selecoes", SelecaoController.index);
app.get("/selecoes/:id", SelecaoController.show);
app.post("/selecoes", SelecaoController.store);
app.put("/selecoes/:id", SelecaoController.update);
app.delete("/selecoes/:id", SelecaoController.delete);

export default app;
