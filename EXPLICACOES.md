# Explicações do desafio

## Etapas entregues

Nesta primeira etapa foram implementados os itens 3 (TypeScript), 4 (SQL) e 5 (NestJS). Os itens 1 e 2 estão reservados para os próximos commits.

### 3. TypeScript

`User` descreve `id`, `name` e `age`. A função `namesOlderThan23` recebe `readonly User[]` e retorna `string[]`: `filter` seleciona idade maior que 23 e `map` extrai os nomes. O parâmetro somente leitura evita alterações estruturais no array dentro da função.

O bônus `filterByNumericField<T>` preserva o tipo de cada objeto retornado. `NumericKeys<T>` usa um tipo mapeado e condicional para aceitar apenas propriedades cujo tipo é `number`. Assim, `age` e `id` são válidos; `name` é rejeitado pelo compilador. O limite é exclusivo (`>`), e a função retorna objetos; o exercício principal retorna nomes. Ambos usam `filter` sem alterar a entrada.

### 4. SQL

`users.sql` cria uma tabela com chave primária, e-mail único e data obrigatória, seguida dos dados do enunciado.

`ORDER BY created_at DESC, id DESC` ordena do usuário mais recente ao mais antigo e desempata datas iguais pelo ID.

`DATE_FORMAT(created_at, '%Y-%m')` forma grupos de ano e mês; `COUNT(*)` conta os usuários de cada grupo. Incluir o ano evita misturar meses de anos diferentes. A consulta retorna apenas meses com registros.

O script não é uma migração da API: o enunciado permite manter os usuários do backend em memória. A execução em MySQL é separada dos testes Node.

### 5. NestJS

- `main.ts`: inicializa o Nest e abre a porta local.
- `app.module.ts`: importa os módulos da aplicação.
- `users.module.ts`: reúne controller e service da funcionalidade.
- `users.controller.ts`: declara GET e POST `/users` e delega as operações.
- `users.service.ts`: mantém os usuários e os IDs em memória, lista e cria usuários, rejeitando e-mails repetidos.
- `user.interface.ts`: descreve o objeto devolvido pela API.
- `dto/create-user.dto.ts`: classe usada na validação em tempo de execução. Tipos TypeScript sozinhos não validam JSON recebido.
- `setup.ts`: compartilha a mesma configuração de validação entre aplicação e testes. Campos extras são rejeitados, incluindo senha.

O Nest injeta o service no controller. Não há camada de repositório porque a persistência não foi exigida. GET devolve cópias para não expor diretamente os objetos internos.

## 6. Git

Branch da primeira etapa: `feat/commit-1-api-typescript-sql`.
O primeiro commit fecha API, TypeScript e SQL com suas explicações. O segundo entregará HTML/CSS e o terceiro Vue 3 e revisão final. A separação permite avaliar cada incremento sem fabricar um histórico depois do código final.

## 7. Organização de projeto

Eu separaria frontend e backend no mesmo repositório para facilitar a execução e avaliação. No Vue, usaria `src/components/tasks/` para `TaskForm.vue`, `TaskList.vue`, `TaskItem.vue` e `TaskFilters.vue`, `composables/useTasks.ts` para operações de tarefas, `types/task.ts` para tipos e `assets/main.css` para estilos. `App.vue` comporia a tela e `main.ts` iniciaria a aplicação. Essa parte será implementada no terceiro commit.

No NestJS, agruparia cada funcionalidade em módulo próprio. A pasta `src/users/` reúne módulo, controller, service, interface e DTO, e `test/` contém os testes HTTP. Isso mantém rotas, regras e validação com responsabilidades claras, sem adicionar abstrações desnecessárias. SQL e exercícios independentes ficam em `database/` e `exercises/typescript/`.

## 8. Tela de login lenta

Primeiro reproduziria o problema e distinguiria a demora ao abrir a tela da demora ao enviar credenciais. No DevTools, verificaria Network e Performance para identificar arquivos grandes, requisições repetidas, respostas lentas ou excesso de JavaScript. Se a demora estivesse na API, consultaria logs e tempos das consultas ao banco.

Duas soluções, conforme o diagnóstico:

1. Reduzir o carregamento inicial, comprimindo imagens e carregando sob demanda módulos que não são necessários para mostrar o login.
2. Otimizar a operação lenta no servidor, eliminando consultas repetidas e adicionando um índice ao campo de busca quando o plano de execução justificar.

Repetiria a medição nas mesmas condições para confirmar a melhora, sem reduzir as proteções do login.

## Uso de Ferramentas de IA

**Ferramenta usada:** Codex, para analisar o enunciado, organizar as etapas e gerar a implementação, documentação e testes da primeira etapa. O histórico desta entrega deve ser atualizado se houver participação adicional de IA.

**Exemplo concreto:** a IA ajudou a distinguir o exercício SQL da API em memória, evitando uma integração com banco não exigida. Também gerou testes para conferir entradas inválidas e o limite exclusivo de idade (`> 23`).

**MCP e agentes/skills:** MCP é um padrão de conexão entre aplicações de IA, ferramentas e fontes de dados. Agentes podem executar etapas com ferramentas; skills reúnem instruções e recursos para tarefas específicas. Esta explicação não declara experiência prévia do candidato: o relato pessoal sobre familiaridade e uso prático deve ser confirmado por ele antes da entrega final.
