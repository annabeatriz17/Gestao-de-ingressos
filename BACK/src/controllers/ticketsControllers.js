const ticketsModel = require('../models/ticketsModel');

const getAllTickets = async (req, res) => {
    try {
        const tickets = await ticketsModel.getTickets();
    if (!tickets || tickets.length === 0) {
        return res.status(404). json({ message: "Nenhum ingresso encontrado." });
    }
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
        const miniPrecos = {
            "Pista": 100,
            "Pista VIP": 200,
            "Camarote": 300,
            "Arquibancada": 80,
        };
        if (preco < miniPrecos[categoria]) {
            return res.status(400).json({
                message: `Preço mínimo para ${categoria} é R44{minPrecos[categoria]}`
            });
        }
        if (quantidade_disponivel <=0) {
            return res.status(400).json({ message: "Ingressos Esgotados"});
        }
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

const vendaTickets = async (req, res) => {
    try {
        const { id, quantidade, preco } = req.body;
  
        if (preco === undefined || preco === null) {
            return res.status(400).json({ erro: "Preço é obrigatório." });
        }
  
        if (quantidade <= 0) {
            return res.status(400).json({ erro: "A quantidade deve ser maior que zero." });
        }
  
        const ticket = await ticketsModel.getTicketsById(id);
        if (!ticket) {
            return res.status(404).json({ erro: "Ingresso não encontrado." });
        }
  
        if (ticket.quantidade_disponivel === 0) {
            return res.status(400).json({ erro: "Ingressos esgotados." });
        }
  
        if (ticket.quantidade_disponivel < quantidade) {
            return res.status(400).json({ erro: "Ingressos insuficientes para a venda." });
        }
  
        const minPrecos = {
            "Pista": 100,
            "Pista VIP": 200,
            "Camarote": 300,
            "Arquibancada": 80,
        };
  
        if (preco < minPrecos [ticket.categoria]) {
            return res.status(400).json({
                erro: `Preço mínimo para a categoria ${ingresso.categoria} é R$${minPrecos[ingresso.categoria]},00.`,
            });
        }
  
        const novaQuantidade = ticket.quantidade_disponivel - quantidade
        await ticketModel.updateQuantidade(id, novaQuantidade);
  
        const precoTotal = (preco * quantidade).toFixed(2);
        const precoUnitario = preco.toFixed(2);
  
        res.json({
            mensagem: "Compra realizada com sucesso!",
            evento: ticket.evento,
            categoria: ticket.categoria,
            preco_unitario: precoUnitario,
            quantidade_vendida: quantidade,
            preco_total: precoTotal,
            quantidade_restante: novaQuantidade
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao processar a venda." });
    }
  };

module.exports = { getAllTickets, getTickets, createTicket, updateTicket, deleteTicket, vendaTickets };