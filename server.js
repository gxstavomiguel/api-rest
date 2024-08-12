import app from './src/app.js'
const PORT = 3000

// escutando a porta 3000
app.listen(PORT, () => {
    console.log(`Server rodando no endereço http://localhost:${PORT}`)
})