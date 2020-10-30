const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const clientes = [
  {
    id: '1',
    nome: 'Jose',
    fone: '12345678',
    email: 'jose@email.com'
  },
  {
    id: '2',
    nome: 'Maria',
    fone: '12343675',
    email: 'mariajose@email.com'
  },
]

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
  next();
});

app.get('/api/clientes',(req, res, next) => {
  res.json({
    message: 'ok',
    clientes,
  });
});

app.post('/api/clientes',(req, res, next) => {
  const { id, nome, fone, email } = req.body;
  const cliente = { id, nome, fone, email };
  clientes = [...clientes, cliente];
  res.status(201).json({
    message: 'cliente created successfully',
    cliente,
  });
});

module.exports = app;