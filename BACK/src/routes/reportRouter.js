const express = require("express");
const router = express.Router();

const reportController = require("../controllers/reportController");

//Rota para exportar CSV
router.get("/tickets/csv", reportController.exportTicketsCSV);

//Rota para exportar PDF
router.get("/tickets/pdf", reportController.exportTicketsPDF);

module.exports = router;