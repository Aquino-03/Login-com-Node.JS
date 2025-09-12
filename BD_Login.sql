CREATE DATABASE IF NOT EXISTS sistema_login;
USE sistema_login;


CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/*
INSERT INTO usuarios (username, senha_hash, email) VALUES 
('admin', '$2y$10$123456789012345678901uLjf8ZcLhO0WcuGyOBHJeQ7G9/.EJSD2', 'admin@email.com');

SELECT * FROM usuarios WHERE username = 'usuario' LIMIT 1;
*/
