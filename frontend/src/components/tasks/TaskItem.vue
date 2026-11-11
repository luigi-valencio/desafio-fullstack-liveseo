<script setup lang="ts">
import type { Task } from "../../types/task";
defineProps<{ task: Task }>();
const emit = defineEmits<{ toggle: [id: string]; remove: [id: string] }>();
</script>

<template>
  <li class="task-item" :class="{ 'is-completed': task.completed }">
    <label class="task-label">
      <input
        type="checkbox"
        :checked="task.completed"
        @change="emit('toggle', task.id)"
      />
      <span class="task-title">{{ task.title }}</span>
    </label>
    <button
      type="button"
      class="remove-button"
      :aria-label="`Remover tarefa: ${task.title}`"
      @click="emit('remove', task.id)"
    >
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        aria-hidden="true"
      >
        <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 10v7M14 10v7" />
      </svg>
    </button>
  </li>
</template>
