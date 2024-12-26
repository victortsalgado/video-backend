// Importa o framework Express
const express = require("express");
const app = express();

// Mensagem de depuração ao iniciar o servidor
console.log("Iniciando o servidor...");

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Rota inicial (raiz)
app.get("/", (req, res) => {
    res.send("Backend está funcionando!");
});

// Rota para processar vídeos
app.post("/process-video", (req, res) => {
    const { videoUrl } = req.body; // Recebe o link do vídeo
    console.log(`Recebido para processamento: ${videoUrl}`);
    res.send(`Processando o vídeo: ${videoUrl}`);
});

// Inicializa o servidor na porta definida pelo Vercel
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
