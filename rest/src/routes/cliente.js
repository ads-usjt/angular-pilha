const express = require ('express');
const Cliente = require('../models/cliente');

const router = express.Router();

router.get('', async (req, res, next) => {
  res.json({
    clientes: await Cliente.find()
  });
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  res.json({
    cliente: await Cliente.findById(id)
  });
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  res.json({
    message: 'Cliente removido com sucesso',
    cliente: await Cliente.findByIdAndDelete(id)
  });
});

router.post('', async (req, res, next) => {
  const { nome, fone, email } = req.body;
  const cliente = new Cliente({ nome, fone, email });

  await cliente.save();

  res.status(201).json({
    message: 'cliente inserido com sucesso',
    cliente,
  });
});

router.put('/:id', async (req, res, next) => {
  const { id, nome, fone, email } = req.body;
  const cliente = new Cliente({
    _id: id, nome, fone, email,
  });
  res.json({
    message: 'cliente atualizado com sucesso',
    cliente: await Cliente.updateOne({ _id: id}, cliente)
  });
})

module.exports = router;