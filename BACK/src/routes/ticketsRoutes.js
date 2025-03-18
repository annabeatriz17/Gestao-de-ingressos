const express = require('express');
const router = express.Router();
const ticketsController = require('../controllers/ticketsController');

router.get('/ingressos', ticketsController.listTickets);
router.get('/ingressos/:id', ticketsController.getTicket);
router.post('/ingressos', ticketsController.createTicket);
router.post('/venda', ticketsController.sellTicket);
router.put('/ingressos/:id', ticketsController.updateTicket);
router.delete('/ingressos/:id', ticketsController.deleteTicket);

module.exports = router;