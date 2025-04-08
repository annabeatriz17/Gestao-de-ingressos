const { format } = require("@fast-csv/format");
const PDFDocument = require("pdfkit")

const ticketsModel = require("../models/ticketsModel");

const exportTicketsCSV = async (req, res) => {
    try {
        const tickets = await ticketsModel.getTickets();

        res.setHeader("Content-disposition", "attachment; filename=tickets.csv");
        res.setHeader("Content-type", "text/csv");

        const csvStream = format({ headers: true });
        csvStream.pipe(res);

        tickets.forEach((ticket) => {
            csvStream.write({
                Id: ticket.id,
                Evento: ticket.evento,
                Local: ticket.local,
                Data: ticket.data_evento,
                Categoria: ticket.categoria,
                Preco: ticket.preco,
                Quantidade: ticket.quantidade_disponivel,
            });
        });

        csvStream.end();
    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar o CSV." });
    }
};

const exportTicketsPDF = async (req, res) => {
    try {
        const tickets = await ticketsModel.getTickets();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition",  "inline; filename=wizards.pdf");

        const doc = new PDFDocument();
        doc.pipe(res);

        //Titulo
        doc.fontSize(20).text("Tickets", {align: "center"});
        doc.moveDown(0.5);

        //Cabeçalho
        doc.fontSize(10).text("Id | Evento | Local | Data | Categoria | Preço | Quantidade", {align: "center"});
        doc.moveDown(0.5);

        //Add dados do ticket
        tickets.forEach((ticket) => {
            doc.text (
                `${ticket.id} | ${ticket.evento} | ${ticket.local} | ${ticket.data_evento} | ${ticket.categoria} | ${ticket.preco} | ${ticket.quantidade_disponivel}`,
            );
        });

        doc.end();
    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar o PDF." });
    }
};

module.exports = { exportTicketsCSV, exportTicketsPDF };
