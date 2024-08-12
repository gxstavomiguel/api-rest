import express from "express"; //const express = require('express') método otimizado para poder ser usado em outros arquivos
const app = express();

//para o express ler body.json
app.use(express.json());

// mock
const selecoes = [
  { id: 1, selecao: "Brasil", grupo: "G" },
  { id: 2, selecao: "Suíça", grupo: "G" },
  { id: 3, selecao: "Camarões", grupo: "G" },
  { id: 4, selecao: "Sérvia", grupo: "G" },
];

//retornar o objeto por id
function buscarSelecaoPorId(id) {
  return selecoes.filter((selecao) => selecao.id == id);
}

//pegar a posição do elemento dentro do array via id
function buscarIndexSelecao(id){
    return selecoes.findIndex( selecao => selecao.id == id )
}

// rota padrão
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/selecoes", (req, res) => {
  res.status(200).send(selecoes);
});

// get de selecoes por id
app.get("/selecoes/:id", (req, res) => {
  res.json(buscarSelecaoPorId(req.params.id));
});

app.post("/selecoes", (req, res) => {
  selecoes.push(req.body);
  res.status(201).send("Seleção cadastrada com sucesso!");
});

app.delete('selecoes/:id', (req, res) => {
    let index = buscarIndexSelecao(req.params.id)
    selecoes.splice(index, 1)
    res.send(`Seleção com id ${req.params.id} excluída com sucesso!`)
})

export default app;
