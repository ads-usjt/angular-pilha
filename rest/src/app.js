const express = require('express');
const app = express();

const clientes = [
  {
    id: 1,
    nome: 'Jose',
    fone: '12345678',
    email: 'jose@email.com'
  },
  {
    id: 2,
    nome: 'Maria',
    fone: '12343675',
    email: 'mariajose@email.com'
  },
]

app.use(express.json());

app.use('/api/clientes',(req, res, next) => {
  res.json({
    message: 'ok',
    clientes,
  });
});

module.exports = app;