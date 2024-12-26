const express = require("express");
const app = express();

app.use(express.json());

// Rota inicial (verificar se o backend está funcionando)
app.get("/", (req, res) => {
    res.send("Backend está funcionando!");
});

// Rota para processar vídeo
app.post("/process-video", (req, res) => {
    const { videoUrl } = req.body; // Recebe o link do vídeo
    res.send(`Processando o vídeo: ${videoUrl}`);
});

// Inicializa o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
