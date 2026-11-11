# Tarefas — Vue 3

Na raiz do projeto, siga a instalação do README principal e execute `npm run dev:frontend`. A aplicação abre em `http://127.0.0.1:5173/`.

Nesta pasta, os comandos são `npm ci`, `npm run dev`, `npm test` e `npm run build`. `npm run preview` serve o build em `http://127.0.0.1:4173/`. Requer Node 22.12 ou superior.

Estrutura:

```text
src/
  components/tasks/{TaskForm,TaskList,TaskItem,TaskFilters}.vue
  composables/useTasks.ts
  types/task.ts
  assets/main.css
  App.vue
  main.ts
index.html
package.json
```

O formulário `/cadastro/` usa os arquivos da pasta irmã `registration/`, que deve permanecer no checkout. A lista começa vazia e vive apenas em memória, sem API ou banco. Fontes do sistema e logo local; origem em `../ASSETS.md`.
