-- Executar em um banco de exercícios vazio (MySQL 8).
-- Sem DROP/TRUNCATE: não apaga tabelas ou dados existentes.
CREATE TABLE users (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(254) NOT NULL UNIQUE,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (id, name, email, created_at) VALUES
  (1, 'Ana', 'ana@email.com', '2024-01-01 00:00:00'),
  (2, 'Pedro', 'pedro@email.com', '2024-02-01 00:00:00'),
  (3, 'Maria', 'maria@email.com', '2024-02-15 00:00:00');

-- Mais recente primeiro; ID desempata datas iguais.
SELECT id, name, email, created_at
FROM users
ORDER BY created_at DESC, id DESC;

-- Ano e mês juntos evitam misturar janeiro de anos diferentes.
SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, COUNT(*) AS total
FROM users
GROUP BY DATE_FORMAT(created_at, '%Y-%m')
ORDER BY month ASC;
