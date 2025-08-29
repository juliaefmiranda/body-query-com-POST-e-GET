// Importar pacotes/bibliotecas
import express from "express";
import dotenv from "dotenv";
import dados from "./src/data/dados.js"
const { bruxos } = dados;

// Cria aplicação com Express e configura para aceitar JSON
const app = express();
app.use(express.json());

// Carregar variáveis e definir para porta do servidor
dotenv.config();
const serverPort = process.env.PORT || 3001;

// Rota principal
app.get("/", (req, res) => {
    res.send("🚀 Servidor funcionando...");
});

// Aqui vão todas suas Rotas
// Query Parameters no Node.js - API de Hogwarts
app.get('/bruxos', (req, res) => {
    const { casa, ano, especialidade, nome } = req.query;
    let resultado = bruxos;

    if (casa) {
        resultado = resultado.filter(b => b.casa.toLowerCase().includes(casa.toLowerCase()));
    }

    if (ano) {
        resultado = resultado.filter(b => b.ano == ano);
    }

    if (especialidade) {
        resultado = resultado.filter(b => b.especialidade.toLowerCase().includes(especialidade.toLowerCase()));
    }

    if (nome) {
        resultado = resultado.filter(b => b.nome.toLowerCase().includes(nome.toLowerCase()));
    }

    res.status(200).json({
        total: resultado.length,
        data: resultado
    });
});

//Body - Adicionar ou editar o bruxo, corpo da requisição
app.post("/bruxos", (req, res) => {
    const { nome, casa, ano, varinha, mascote, patrono, especialidade, vivo } = req.body;

    //Obrigatórios:
    if (!nome || !casa || !ano || !vivo) {
        sucess: false;
        message: "Nome, casa, ano e estar vivo são obrigatórios para um bruxo!"
    }

    const novoBruxo = {
        id: bruxos.length + 1,
        nome: nome,
        casa: casa,
        ano: parseInt(ano),
        varinha: varinha || "Ainda não definida!",
        mascote: mascote || "Ainda não definido!",
        patrono: patrono || "AInda não descoberto!",
        especialidade: especialidade || "Em desenvolvimento...",
        vivo: vivo
    }

    //Adicionar a lista de bruxos
    bruxos.push(novoBruxo);

    res.status(201).json({
        sucess: true,
        message: "Novo bruxo adicionado a Hogwarts!",
        data: novoBruxo
    });
});

// Iniciar servidor escutando na porta definida
app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});