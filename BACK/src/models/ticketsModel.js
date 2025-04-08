const pool = require('../config/database');

const getAllTickets = async (local) => {
    if(!local){
        const result = await pool.query("SELECT * FROM ingressos");
        return result.rows;
    }else{
        const result = await pool.query("SELECT * FROM ingressos WHERE local ILIKE $1", [`%${local}%`]);
        return result.rows;
    }
};

const getTicketsById = async (id) => {
    const result = await pool.query('SELECT * FROM ingressos WHERE id = $1', [id]);
    return result.rows[0];
};

const createTicket = async (evento, local, data_evento, categoria, preco, quantidade_disponivel) => {
    const result = await pool.query('INSERT INTO ingressos (evento, local, data_evento, categoria, preco, quantidade_disponivel) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [evento, local, data_evento, categoria, preco, quantidade_disponivel]);
    if(categoria == "Pista")
    return result.rows[0];
};

const updateTicket = async (id, evento, local, data_evento, categoria, preco, quantidade_disponivel) => {
    const result = await pool.query(
        "UPDATE ingressos SET evento = $1, local = $2, data_evento = $3, categoria = $4, preco = $5, quantidade_disponivel = $6 WHERE id = $7 RETURNING *",
        [evento, local, data_evento, categoria, preco, quantidade_disponivel, id]
    );

    if (result.rowCount === 0) {
        return { error: "Ingresso não encontrado." };
    }

    return result.rows[0];
};

const updateQuantidade = async (id, novaQuantidade) => {
    const result = await pool.query(
        "UPDATE ingressos SET quantidade_disponivel = $1 WHERE id = $2 RETURNING *",
        [novaQuantidade, id]
    );
    return result.rows[0];
};

const deleteTicket = async (id) => {
    const result = await pool.query('DELETE FROM ingressos WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
        return { error: "Não foi possível deletar o ingresso." };
    }
    return { message: "Ingresso deletado com sucesso." };
};



module.exports = { getAllTickets, getTicketsById, createTicket, updateTicket, updateQuantidade, deleteTicket };