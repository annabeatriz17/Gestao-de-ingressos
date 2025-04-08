require('dotenv').config();
const express = require('express');
const cors = require('cors');
const ticketsRoutes = require('./src/routes/ticketsRoutes');
const reportRoutes = require('./src/routes/reportRouter');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', ticketsRoutes);
app.use('/api', reportRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
