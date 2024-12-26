const express = require("express");
const { google } = require("googleapis");
const ytdl = require("ytdl-core");

const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Middleware para logs de requisição
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Rota inicial (raiz)
app.get("/", (req, res) => {
    res.send("Backend está funcionando!");
});

// Rota para processar vídeos
app.post("/process-video", async (req, res) => {
    const { videoUrl } = req.body;
    const videoId = videoUrl.split("v=")[1] || videoUrl.split("youtu.be/")[1]; // Extrair o ID do vídeo

    if (!videoId) {
        return res.status(400).json({ error: "URL do vídeo inválida." });
    }

    const youtube = google.youtube({
        version: "v3",
        auth: "AIzaSyBJf6fzFqKbeWTHwxF6CBPl01WHyAgCV1Y", // Substitua por sua chave de API do YouTube
    });

    try {
        const response = await youtube.videos.list({
            part: "snippet,contentDetails",
            id: videoId,
        });

        if (!response.data.items.length) {
            return res.status(404).json({ error: "Vídeo não encontrado." });
        }

        const video = response.data.items[0];
        res.json({
            title: video.snippet.title,
            duration: video.contentDetails.duration,
            description: video.snippet.description,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao processar o vídeo.");
    }
});

// Rota para download de vídeos
app.post("/download-video", (req, res) => {
    const { videoUrl } = req.body;

    if (!ytdl.validateURL(videoUrl)) {
        return res.status(400).json({ error: "URL do vídeo inválida." });
    }

    res.header("Content-Disposition", 'attachment; filename="video.mp4"');
    ytdl(videoUrl, { format: "mp4" })
        .pipe(res)
        .on("error", (err) => {
            console.error(err);
            res.status(500).send("Erro ao baixar o vídeo.");
        });
});

// Middleware para tratar erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Algo deu errado!");
});

// Inicializa o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
