CREATE DATABASE cadastro18;

\c cadastro18;

CREATE TABLE ingressos (
    id SERIAL PRIMARY KEY,
    evento VARCHAR(255) NOT NULL,
    local VARCHAR(255) NOT NULL,
    data_evento DATE NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    quantidade_disponivel INTEGER NOT NULL
);


INSERT INTO ingressos (evento, local, data_evento, categoria, preco, quantidade_disponivel) VALUES
('Tour Morada 25', 'Campinas', '2025-03-22', 'VIP', 200, 10),
('Tour Morada 25', 'Florianópolis', '2025-04-26', 'Pista', 100, 50),
('Tour Morada 25', 'Florianópolis', '2025-04-26', 'Camarote', 300, 100),
('Tour Morada 25', 'Florianópolis', '2025-05-02', 'VIP', 200, 10),
('Tour Morada 25', 'São Paulo', '2025-05-02', 'Arquibancada', 80, 100),
('Tour Morada 25', 'São Paulo', '2025-05-02', 'Seguidores do Morada no YouTube', 65, 250),
('Tour Morada 25', 'São Paulo', '2025-05-02', 'Inscritos no canal do Morada no YouTube', 180, 10),
('Tour Morada 25', 'São Paulo', '2025-05-02', 'VIP', 200, 25),
('Tour Morada 25', 'São Paulo', '2025-05-02', 'Pista', 100, 50),
('Tour Morada 25', 'São Paulo', '2025-05-02', 'Camarote', 300, 100),
('Tour Morada 25', 'Rio de Janeiro', '2025-05-02', 'VIP', 200, 0);