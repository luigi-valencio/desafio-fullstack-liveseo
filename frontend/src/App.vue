<script setup lang="ts">
import { ref } from "vue";
import TaskForm from "./components/tasks/TaskForm.vue";
import TaskFilters from "./components/tasks/TaskFilters.vue";
import TaskList from "./components/tasks/TaskList.vue";
import { useTasks } from "./composables/useTasks";

const {
  tasks,
  filter,
  filteredTasks,
  completedCount,
  pendingCount,
  progress,
  addTask,
  toggleTask,
  removeTask,
} = useTasks();
const announcement = ref("");
const logoUrl = `${import.meta.env.BASE_URL}liveseo-logo.webp`;
function add(title: string) {
  if (addTask(title)) {
    filter.value = "all";
    announcement.value = `Tarefa adicionada. ${tasks.value.length} na lista.`;
  }
}
function toggle(id: string) {
  toggleTask(id);
  announcement.value = `Progresso atualizado: ${completedCount.value} de ${tasks.value.length} concluídas.`;
}
function remove(id: string) {
  removeTask(id);
  announcement.value = `Tarefa removida. ${tasks.value.length} na lista.`;
}
</script>

<template>
  <a class="skip-link" href="#main">Pular para o conteúdo</a>
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="./" aria-label="Desafio liveSEO, início"
        ><img :src="logoUrl" alt="liveSEO" width="136" height="85" /><span
          >Desafio Fullstack</span
        ></a
      >
      <nav aria-label="Navegação principal">
        <a href="./" aria-current="page">Minhas tarefas</a
        ><a href="./cadastro/">Cadastro <span aria-hidden="true">↗</span></a>
      </nav>
    </div>
  </header>
  <main id="main" class="workspace" tabindex="-1">
    <section class="hero" aria-labelledby="page-title">
      <p class="eyebrow">
        <span aria-hidden="true"></span> ORGANIZE. PRIORIZE. AVANCE.
      </p>
      <h1 id="page-title">
        Grandes resultados.<br /><span>Um passo de cada vez.</span>
      </h1>
      <p>Menos planos soltos. Mais foco no que vem agora.</p>
    </section>
    <div class="workspace-grid">
      <section class="task-panel" aria-labelledby="tasks-title">
        <div class="panel-heading">
          <div>
            <p class="eyebrow">SEU ESPAÇO DE FOCO</p>
            <h2 id="tasks-title">
              Minhas tarefas<span class="orange-dot">.</span>
            </h2>
          </div>
          <span class="total-badge">{{ tasks.length }} no total</span>
        </div>
        <TaskForm @add="add" />
        <TaskFilters
          v-model="filter"
          :total="tasks.length"
          :pending="pendingCount"
          :completed="completedCount"
        />
        <TaskList
          :tasks="filteredTasks"
          :has-tasks="tasks.length > 0"
          @toggle="toggle"
          @remove="remove"
        />
        <p class="list-footnote">Uma tarefa por vez também é progresso.</p>
      </section>
      <aside class="progress-panel" aria-labelledby="progress-title">
        <p class="eyebrow">CADA PASSO CONTA</p>
        <h2 id="progress-title">Seu ritmo.</h2>
        <p class="progress-value">{{ progress }}<span>%</span></p>
        <progress
          :value="completedCount"
          :max="Math.max(tasks.length, 1)"
          aria-label="Progresso das tarefas"
        ></progress>
        <p class="progress-caption">
          {{ completedCount }} de {{ tasks.length }} tarefas concluídas
        </p>
        <dl class="stats">
          <div>
            <dt>Pendentes</dt>
            <dd>{{ pendingCount }}</dd>
          </div>
          <div>
            <dt>Concluídas</dt>
            <dd>{{ completedCount }}</dd>
          </div>
        </dl>
        <div class="tip">
          <span aria-hidden="true">↗</span>
          <p>Pequenas entregas.<br /><strong>Progresso de verdade.</strong></p>
        </div>
      </aside>
    </div>
    <p class="session-note">
      Lista temporária: suas tarefas ficam apenas nesta página e são apagadas ao
      recarregar.
    </p>
    <p
      class="visually-hidden"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {{ announcement }}
    </p>
  </main>
  <footer class="site-footer">
    <span>Desafio Fullstack Júnior</span
    ><span>Projeto demonstrativo · Identidade inspirada na liveSEO</span>
  </footer>
</template>
