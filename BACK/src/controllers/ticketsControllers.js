const ticketsModel = require('../models/ticketsModel');

const getAllTickets = async (req, res) => {
    try {
        const tickets = await ticketsModel.getTickets();
        res.json(tickets);
    } catch (error) {
        res.status(404).json({ message: "Não foi possível buscar os ingressos." });
    };
};

const getTickets = async (req, res) => {
    try {
        const tickets = await ticketsModel.getTicketsById(req.params.id);
        if (!tickets) {
            res.status(404).json({ message: "Ingresso não encontrado." });
        }
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar o ingresso." });
    };
};

const createTicket = async (req, res) => {
    try {
        const { evento, local, data_evento, categoria, preco, quantidade_disponivel } = req.body;
        const newTicket = await ticketsModel.createTicket(evento, local, data_evento, categoria, preco, quantidade_disponivel);
        res.status(201).json(newTicket);
    } catch (error) {
        console.log(error);
        if (error.code === '23505') { // Código de erro do PostgreSQL para chave única violada
            return res.status(400).json({ message: "Já existe um ingresso com este evento, local e data de evento." });
        };
        res.status(500).json({ message: "Erro ao criar o ingresso." });
    };
};

const updateTicket = async (req, res) => {
    try {
        const { evento, local, data_evento, categoria, preco, quantidade_disponivel } = req.body;
        const updatedTicket = await ticketsModel.updateTicket(req.params.id, evento, local, data_evento, categoria, preco, quantidade_disponivel);
        if (!updatedTicket) {
            res.status(404).json({ message: "Ingresso não encontrado." });
        }
        res.json(updatedTicket);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar o ingresso." });
    };
};

const deleteTicket = async (req, res) => {
    try {
        const message = await ticketsModel.deleteTicket(req.params.id);
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar o ingresso." });
    };
};

module.exports = { getAllTickets, getTickets, createTicket, updateTicket, deleteTicket };