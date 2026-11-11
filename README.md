# Desafio Fullstack Júnior — LiveSEO

Desafio entregue em três etapas: API NestJS e exercícios TypeScript/SQL; formulário HTML/CSS; lista de tarefas Vue 3 e documentação final. A interface usa o logo original e uma identidade inspirada no [site da liveSEO](https://liveseo.com.br/), consultado em 11/11/2026. Veja a origem dos arquivos em [ASSETS.md](ASSETS.md).

**Entrega completa:** [código na branch do commit 3](https://github.com/luigi-valencio/desafio-fullstack-liveseo/tree/feat/commit-3-vue-documentacao). O histórico dessa branch contém as três etapas.

## Pré-requisitos

- Node.js 22.12 ou superior e npm (validado localmente com Node 24).
- MySQL 8 somente para executar o exercício SQL; a API não depende dele.

## Instalar e executar

Na raiz do projeto:

```sh
npm ci
npm --prefix backend ci
npm --prefix frontend ci
```

Para abrir a lista de tarefas:

```sh
npm run dev:frontend
```

Acesse `http://127.0.0.1:5173/`. O link **Cadastro** abre o formulário HTML/CSS em `/cadastro/`, servido pela mesma aplicação. Não é necessário iniciar a API para usar as telas.

Em outro terminal, para iniciar a API independente:

```sh
npm run dev
```

A API estará em `http://127.0.0.1:3000/users`. `Ctrl+C` encerra o processo.
Para compilar e executar sem modo de desenvolvimento:

```sh
npm run build
npm start
```

`npm run build` compila backend, exercício TypeScript e frontend. `npm start` inicia apenas a API. Para visualizar o frontend compilado, execute `npm --prefix frontend run preview` e abra `http://127.0.0.1:4173/`. O build inclui o formulário em `frontend/dist/cadastro/` a partir de sua fonte em `registration/`.

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

## Formulário HTML + CSS

Abra `registration/index.html` diretamente no navegador. Não requer instalação, API ou banco. Para servir por HTTP, também é possível executar `python -m http.server 5500 --bind 127.0.0.1 --directory registration` na raiz e acessar `http://127.0.0.1:5500` (requer Python).

Nome, E-mail e Senha são obrigatórios. O navegador valida o e-mail e a senha deve ter de 8 a 128 caracteres. Envio válido exibe uma confirmação de demonstração e limpa os campos. Nenhuma conta é criada; nenhum dado é transmitido ou persistido pelo código. Use uma senha fictícia. Um script pequeno intercepta o envio; sem JavaScript, os campos e o botão ficam desabilitados.

Para verificar: tente enviar vazio, informe um e-mail inválido, teste uma senha curta e depois dados válidos; percorra os campos usando Tab e confira o layout em uma tela estreita.

## Tarefas — Vue 3 e Composition API

- Adicionar tarefas com título de até 200 caracteres (títulos só com espaços são rejeitados).
- Marcar e desmarcar conclusão, remover e filtrar por todas/pendentes/concluídas.
- Contadores e progresso atualizados automaticamente.
- Títulos repetidos são permitidos, com IDs diferentes para remover cada tarefa individualmente.
- Estado inicial vazio e aviso quando um filtro não encontra resultados.

As tarefas vivem apenas na memória da página; recarregar zera a lista. Não há login, persistência ou integração da lista com a API. Ao adicionar a partir de um filtro, a interface volta para **Todas** para mostrar a nova tarefa.

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

Compila os projetos, testa a API via HTTP com Supertest, executa os testes TypeScript com o runner nativo do Node e testa as operações reativas de tarefas com Vitest. Não requer iniciar a API manualmente. O SQL deve ser executado separadamente em MySQL; o comando acima não testa o SQL.

Validação final automatizada: compilação concluída e 11 testes aprovados (cinco da API, três de TypeScript e três de tarefas). O script SQL foi revisado, mas ainda não executado em MySQL neste ambiente; Docker está instalado, porém seu serviço não está em execução.

O formulário foi verificado no navegador: campos obrigatórios, e-mail inválido, senha curta, nome apenas com espaços, confirmação com limpeza dos campos, senha oculta e sequência de teclado. O layout também foi inspecionado em desktop e larguras de 375 e 320 px, sem rolagem horizontal. Esses cenários do formulário são verificações manuais.

No commit 3, os testes automatizados passaram a incluir o estado de tarefas. A verificação no navegador cobriu entrada vazia, criação por botão e Enter, títulos iguais, conclusão/desmarcação, filtros e remoção individual. As telas atualizadas foram conferidas em desktop, 375 e 320 px sem rolagem horizontal; logo, navegação para Cadastro e criação de tarefa também foram conferidos no build servido por `preview`.

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
frontend/
  src/
    components/tasks/     # TaskForm, TaskList, TaskItem e TaskFilters
    composables/          # useTasks e seus testes
    types/task.ts
    assets/main.css
    App.vue
    main.ts
  public/liveseo-logo.webp
  index.html
  vite.config.ts
registration/
  index.html              # formulário demonstrativo
  styles.css              # estilos responsivos e estados de foco
EXPLICACOES.md
```

As pastas previstas no tópico 7 são mantidas. O formulário continua independente em `registration/`; o Vite o serve no desenvolvimento e copia seus arquivos ao compilar, sem duplicar sua implementação.

## Estratégia de commits

1. `feat: implementa API de usuarios e exercicios TypeScript e SQL`: itens 3, 4 e 5, com testes e instruções iniciais.
2. `feat: adiciona formulario acessivel em HTML e CSS`: item 1, validação nativa e layout responsivo.
3. `feat: implementa tarefas em Vue 3 e conclui documentacao`: item 2, filtros, verificações finais e aplicação da referência visual solicitada.

Cada commit representa uma etapa funcional. Branches: `feat/commit-1-api-typescript-sql`, `feat/commit-2-formulario-html-css` e `feat/commit-3-vue-documentacao`, cada uma partindo da anterior.

O repositório permanece privado. Avaliadores precisam de acesso para abrir o código e o histórico.

Veja [EXPLICACOES.md](EXPLICACOES.md) para decisões técnicas, tópicos 7 e 8 e transparência sobre IA.
