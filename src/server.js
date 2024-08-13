import app from "./app.js";

const PORT = process.envPORT || 3000;

app.listen(PORT, () => {
  console.log(`Server rodando no endereço http://localhost:${PORT}`);
});
