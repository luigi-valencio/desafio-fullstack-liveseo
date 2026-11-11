<script setup lang="ts">
import type { Task } from "../../types/task";
import TaskItem from "./TaskItem.vue";
defineProps<{ tasks: readonly Task[]; hasTasks: boolean }>();
const emit = defineEmits<{ toggle: [id: string]; remove: [id: string] }>();
</script>

<template>
  <ul v-if="tasks.length" class="task-list" aria-label="Lista de tarefas">
    <TaskItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @toggle="emit('toggle', $event)"
      @remove="emit('remove', $event)"
    />
  </ul>
  <div v-else class="empty-state">
    <span class="empty-icon" aria-hidden="true">✓</span>
    <h3>
      {{
        hasTasks ? "Tudo certo por aqui." : "Seu próximo resultado começa aqui."
      }}
    </h3>
    <p>
      {{
        hasTasks
          ? "Nenhuma tarefa neste filtro. Experimente outra visualização."
          : "Adicione sua primeira tarefa e transforme planos em progresso."
      }}
    </p>
  </div>
</template>
