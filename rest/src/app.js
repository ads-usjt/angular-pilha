const express = require('express');
const Cliente = require('./models/cliente');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(
    'mongodb+srv://root:root@cluster0.1erzi.mongodb.net/Cliente?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true}
  )
  .then(() => console.log('🎲 Conectado ao MongoDB'))
  .catch((err) => console.error(`🎲 Falha ao conectar ao MongoDB: ${err.message}`));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS')
  next();
});

app.get('/api/clientes', async (req, res, next) => {
  res.json({
    clientes: await Cliente.find()
  });
});

app.get('/api/clientes/:id', async (req, res, next) => {
  const { id } = req.params;
  res.json({
    cliente: await Cliente.findById(id)
  });
});

app.delete('/api/clientes/:id', async (req, res, next) => {
  const { id } = req.params;
  res.json({
    message: 'Cliente removido com sucesso',
    cliente: await Cliente.findByIdAndDelete(id)
  });
});

app.post('/api/clientes', async (req, res, next) => {
  const { nome, fone, email } = req.body;
  const cliente = new Cliente({ nome, fone, email });

  await cliente.save();

  res.status(201).json({
    message: 'cliente inserido com sucesso',
    cliente,
  });
});

module.exports = app;