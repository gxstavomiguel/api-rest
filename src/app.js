const express = require('express')
const app = express()
const port = 3000

// rota padrão
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// escutando a porta 3000
app.listen(port, () => {
    console.log(`Server rodando no endereço http://localhost:${port}`)
})
