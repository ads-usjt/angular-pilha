const express = require('express');
const mongoose = require('mongoose');

const clientesRoutes = require('./routes/cliente');

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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS')
  next();
});

app.use('/api/clientes', clientesRoutes);

module.exports = app;