const express = require('express');
const router = express.Router();
const ticketsController = require('../controllers/ticketsControllers')


router.get('/ingressos', ticketsController.getAllTickets);
router.get('/ingressos/:id', ticketsController.getTickets);
router.post('/ingressos', ticketsController.createTicket);
router.put('/ingressos/:id', ticketsController.updateTicket);
router.delete('/ingressos/:id', ticketsController.deleteTicket);

module.exports = router;