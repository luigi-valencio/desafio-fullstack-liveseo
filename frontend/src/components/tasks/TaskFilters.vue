<script setup lang="ts">
import type { TaskFilter } from "../../types/task";
defineProps<{
  modelValue: TaskFilter;
  total: number;
  pending: number;
  completed: number;
}>();
const emit = defineEmits<{ "update:modelValue": [value: TaskFilter] }>();
const options: { value: TaskFilter; label: string }[] = [
  { value: "all", label: "Todas" },
  { value: "pending", label: "Pendentes" },
  { value: "completed", label: "Concluídas" },
];
</script>

<template>
  <div class="task-filters" role="group" aria-label="Filtrar tarefas">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      :aria-pressed="modelValue === option.value"
      @click="emit('update:modelValue', option.value)"
    >
      {{ option.label }}
      <span>{{
        option.value === "all"
          ? total
          : option.value === "pending"
            ? pending
            : completed
      }}</span>
    </button>
  </div>
</template>
