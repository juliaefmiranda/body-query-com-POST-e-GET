// Importar pacotes/bibliotecas
import express from "express";
import dotenv from "dotenv";
import dados from "./src/data/dados.js"
import res from "express/lib/response.js";
const { bruxos, varinhas, pocoes, animais } = dados;


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
// Rota de bruxos com filtro (Query Params)
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
        patrono: patrono || "Ainda não descoberto!",
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

//Rota de varinhas com filtro
app.get('/varinhas', (req, res) => {
    const { material, nucleo } = req.query;
    let resultado = varinhas;

    if (material) {
        resultado = resultado.filter(v => v.material.toLowerCase().includes(material.toLowerCase()));
    }

    if (nucleo) {
        resultado = resultado.filter(v => v.nucleo.toLowerCase().includes(nucleo.toLowerCase()));
    }

    res.status(200).json({
        total: resultado.length,
        data: resultado
    });
});

app.get("/pocoes", (req, res) => {
    const {nome, efeito } = req.query;
    let resultado = pocoes;

    if (nome) {
        resultado = resultado.filter(p => p.nome.toLowerCase().includes(nome.toLowerCase()));
    }

    if (efeito) {
        resultado = resultado.filter(p => p.efeito.toLowerCase().includes(efeito.toLowerCase()));
    }

    res.status(200).json({
        total: resultado.length,
        data: resultado
    });
});

app.get("/animais", (req, res) => {
    const {nome, tipo } = req.query;
    let resultado = animais;

    if (nome) {
        resultado = resultado.filter(a => a.nome.toLowerCase().includes(nome.toLowerCase()));
    }

    if (tipo) {
        resultado = resultado.filter(a => a.tipo.toLowerCase().includes(tipo.toLowerCase()));
    }

    res.status(200).json({
        total: resultado.length,
        data: resultado
    });
});

// Iniciar servidor escutando na porta definida
app.listen(serverPort, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${serverPort} 🚀`);
});