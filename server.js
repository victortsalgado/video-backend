const express = require("express");
const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Rota inicial (raiz)
app.get("/", (req, res) => {
    res.send("Backend está funcionando!");
});

// Rota para processar vídeos
app.post("/process-video", (req, res) => {
    const { videoUrl } = req.body; // Recebe o link do vídeo
    res.send(`Processando o vídeo: ${videoUrl}`);
});

// Inicializa o servidor na porta definida pelo Vercel
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

// Alteração para forçar novo deploy
