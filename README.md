# Desafio Fullstack Júnior — LiveSEO

Implementação incremental do desafio em três commits. **Etapa atual: commit 1 (NestJS, TypeScript e SQL).** HTML/CSS e Vue 3 serão implementados nas próximas etapas.

## Pré-requisitos

- Node.js 22 ou superior e npm (validado localmente com Node 24).
- MySQL 8 somente para executar o exercício SQL; a API não depende dele.

## Instalar e executar

Na raiz do projeto:

```sh
npm ci
npm --prefix backend ci
npm run dev
```

A API estará em `http://127.0.0.1:3000/users`. `Ctrl+C` encerra o processo.
Para compilar e executar sem modo de desenvolvimento:

```sh
npm run build
npm start
```

A porta pode ser alterada pela variável de ambiente `PORT`. No PowerShell: `$env:PORT = '3001'`. A aplicação não carrega arquivos `.env` automaticamente.

### Usar a API (PowerShell)

```powershell
Invoke-RestMethod http://127.0.0.1:3000/users

$body = @{ name = 'Maria'; email = 'maria@email.com' } | ConvertTo-Json
Invoke-RestMethod http://127.0.0.1:3000/users -Method Post -ContentType 'application/json' -Body $body
```

| Rota | Resultado |
| --- | --- |
| `GET /users` | 200; array de usuários, inicialmente Ana e Pedro |
| `POST /users` | 201; usuário criado com `id`, `name`, `email` |
| POST com entrada inválida ou campos extras | 400 |
| POST com e-mail já cadastrado | 409 |

O nome tem até 100 caracteres e não pode ser vazio; o e-mail deve ser válido e ter até 254 caracteres. Espaços externos são removidos e o e-mail é convertido para minúsculas.

**Limitações:** usuários em memória, perdidos ao reiniciar o processo; sem autenticação, sem armazenamento de senha e sem persistência. A API é uma demonstração local do enunciado, não um serviço pronto para produção.

## Exercício TypeScript

```sh
npm run exercise
```

Imprime os nomes `Ana` e `Pedro` (idade estritamente maior que 23) e exemplos do bônus com campos `age` e `id`.

## Exercício SQL

Em um MySQL 8, crie um banco vazio exclusivo para o exercício, por exemplo `liveseo_exercise`. No cliente MySQL:

```sql
CREATE DATABASE liveseo_exercise CHARACTER SET utf8mb4;
USE liveseo_exercise;
SOURCE database/users.sql;
```

Execute o cliente a partir da raiz do projeto para o caminho relativo funcionar; alternativamente, use o caminho absoluto do script com barras `/`.
O script cria a tabela e insere dados de exemplo; execute uma vez em banco vazio. Ele não apaga nem substitui tabelas existentes.

Resultados esperados: Maria, Pedro e Ana na consulta por criação; `2024-01: 1` e `2024-02: 2` na contagem mensal. Este exercício é independente da lista em memória da API.

## Verificações

```sh
npm test
```

Compila os projetos, testa a API via HTTP com Supertest e executa os testes TypeScript com o runner nativo do Node. Não requer iniciar a API manualmente. O SQL deve ser executado separadamente em MySQL; o comando acima não testa o SQL.

Validação desta etapa: compilação concluída e oito testes automatizados aprovados (cinco da API e três de TypeScript). O script SQL foi revisado, mas ainda não executado em MySQL neste ambiente.

## Organização

```text
backend/src/
  users/
    dto/create-user.dto.ts
    user.interface.ts
    users.controller.ts
    users.service.ts
    users.module.ts
  app.module.ts
  setup.ts
  main.ts
backend/test/users.e2e.test.ts
database/users.sql
exercises/typescript/
frontend/                 # reservado para Vue 3 no commit 3
registration/             # reservado para HTML/CSS no commit 2
EXPLICACOES.md
```

As pastas previstas no tópico 7 são mantidas. As partes futuras têm apenas documentação de reserva, sem código fictício.

## Estratégia de commits

1. `feat: implementa API de usuarios e exercicios TypeScript e SQL`: itens 3, 4 e 5, com testes e instruções iniciais.
2. `feat: adiciona formulario acessivel em HTML e CSS`: item 1, validação nativa e layout responsivo.
3. `feat: implementa tarefas em Vue 3 e conclui documentacao`: item 2, filtros e documentação final.

Cada commit representa uma etapa funcional. Os commits 2 e 3 estão planejados, ainda não entregues.

Veja [EXPLICACOES.md](EXPLICACOES.md) para decisões técnicas, tópicos 7 e 8 e transparência sobre IA.
