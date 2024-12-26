const ytdl = require("ytdl-core");

// Função de download de vídeo
exports.downloadVideo = async (req, res) => {
    const { videoUrl } = req.body;

    try {
        if (!videoUrl) {
            return res.status(400).json({ error: "A URL do vídeo é obrigatória." });
        }

        // Verifica se a URL é válida e extrai o ID do vídeo
        const videoIdMatch = videoUrl.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
        if (!videoIdMatch || !videoIdMatch[1]) {
            return res.status(400).json({ error: "URL do vídeo inválida." });
        }
        const videoId = videoIdMatch[1];

        // Configura o cabeçalho para download
        res.header("Content-Disposition", `attachment; filename="${videoId}.mp4"`);

        // Faz o download do vídeo
        ytdl(`https://www.youtube.com/watch?v=${videoId}`, { format: "mp4" }).pipe(res);
    } catch (error) {
        console.error("Erro ao fazer o download:", error.message);
        res.status(500).json({ error: "Erro ao fazer o download do vídeo." });
    }
};
