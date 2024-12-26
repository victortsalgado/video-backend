const express = require("express");
const app = express();

app.use(express.json());

// Rota inicial (raiz)
app.get("/", (req, res) => {
    res.send("Backend está funcionando!");
});

// Inicializa o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

