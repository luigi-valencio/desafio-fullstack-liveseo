# Validação real das consultas MySQL

Executada em 11/11/2026 com **MySQL Community Server 8.4.13** (Windows x64).

O arquivo `database/users.sql` foi executado integralmente, sem alterações, em um banco novo e isolado chamado `liveseo_validation`. A API não foi conectada ao banco e seu código não foi alterado.

## Resultado da ordenação

Saída obtida no cliente MySQL:

```text
id  name   email            created_at
3   Maria  maria@email.com  2024-02-15 00:00:00
2   Pedro  pedro@email.com  2024-02-01 00:00:00
1   Ana    ana@email.com    2024-01-01 00:00:00
```

Conferência: Maria, Pedro e Ana, da criação mais recente para a mais antiga.

## Resultado da contagem mensal

```text
month    total
2024-01  1
2024-02  2
```

Conferência: um usuário em janeiro e dois em fevereiro de 2024.

## Teste adicional: anos diferentes

Em uma transação de teste, foi inserido um usuário criado em `2025-01-01`, e a consulta mensal foi repetida:

```text
month    total
2024-01  1
2024-02  2
2025-01  1
```

O mês de janeiro não foi misturado entre anos. Depois foi executado `ROLLBACK`; a tabela voltou aos três registros originais.

## Checklist do resultado

- [x] Script executado em MySQL real, sem erro.
- [x] Ordenação Maria/Pedro/Ana confirmada.
- [x] Contagem janeiro/2024 = 1 e fevereiro/2024 = 2 confirmada.
- [x] Agrupamento por ano e mês confirmado com dados adicionais.
- [x] Rollback do teste adicional confirmado; três registros finais.
- [x] Servidor temporário encerrado após a verificação.

## Como reproduzir em outro computador

Com MySQL 8 instalado e iniciado, abra o cliente (a senha é a da sua instalação):

```sh
mysql -u root -p
```

No cliente, crie um banco novo para o teste e execute o arquivo:

```sql
CREATE DATABASE liveseo_validation CHARACTER SET utf8mb4;
USE liveseo_validation;
SOURCE C:/caminho/do/projeto/database/users.sql;
```

Substitua o caminho pelo local do seu clone. No Windows, use barras `/`. O banco precisa estar vazio: o script cria a tabela e não deve ser reaplicado sobre a mesma tabela existente. Não é necessário modificar o backend para reproduzir o exercício.

Para testar anos diferentes, no mesmo cliente:

```sql
START TRANSACTION;
INSERT INTO users (name, email, created_at)
VALUES ('Ano seguinte', 'ano@example.com', '2025-01-01');

SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, COUNT(*) AS total
FROM users
GROUP BY DATE_FORMAT(created_at, '%Y-%m')
ORDER BY month ASC;

ROLLBACK;
SELECT COUNT(*) AS total FROM users;
```

O último resultado deve ser `3`.

## Ambiente utilizado nesta validação

Foi usado o pacote ZIP oficial da Oracle/MySQL, com o checksum MD5 conferido contra o valor publicado na página de download. O MySQL foi inicializado em uma pasta temporária de trabalho, acessível somente por loopback, e encerrado ao terminar. Não foi instalado serviço permanente no Windows. O teste usou somente dados fictícios do desafio.

Fonte do pacote: [MySQL Community Server 8.4 para Windows](https://dev.mysql.com/downloads/mysql/8.4.html?os=3).
Procedimento oficial: [inicialização do diretório de dados no Windows](https://dev.mysql.com/doc/refman/8.4/en/windows-initialize-data-directory.html).
