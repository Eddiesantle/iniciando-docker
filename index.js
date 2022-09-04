const express = require('express')

const app = express();

const mysql = require('mysql')

// host: 'db' - se refere ao serviço criado no docker, rede compartilhada
const connection = mysql.createConnection({
    host: 'db', // nome do serviço
    user: 'root',
    password: 'root',
    database: 'mydb'
})

app.get('/', (req, res) => {
    res.send('opa, hello world, rodou essa bagaça, que trem doido')
})

app.listen(process.env.PORT || 3000, ()=> {
    console.log('Servidor rodando na porta 3000')
})