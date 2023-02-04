const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Configure o body-parser para processar os corpos de solicitação
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Defina uma rota para processar os dados coletados
app.post("/collect-data", (req, res) => {
    console.log("Recebido dados: " + req.body.data)
    // Envie uma resposta de sucesso ao cliente
    res.send("Dados processados com sucesso");
});

// Inicie o servidor na porta 8080
app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080");
});