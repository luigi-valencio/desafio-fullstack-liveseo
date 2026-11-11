<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{ add: [title: string] }>();
const title = ref("");
const error = ref("");
function submit() {
  if (!title.value.trim()) {
    error.value = "Escreva uma tarefa antes de adicionar.";
    return;
  }
  emit("add", title.value.trim());
  title.value = "";
  error.value = "";
}
</script>

<template>
  <form class="task-form" @submit.prevent="submit">
    <label for="task-title">Qual é o próximo passo?</label>
    <div class="input-row">
      <input
        id="task-title"
        v-model="title"
        type="text"
        maxlength="200"
        placeholder="Ex.: revisar o conteúdo da página"
        :aria-invalid="Boolean(error)"
        aria-describedby="task-error"
        @input="error = ''"
      />
      <button class="primary-button" type="submit">
        <span aria-hidden="true">+</span> Adicionar tarefa
      </button>
    </div>
    <p id="task-error" class="field-error" role="alert">{{ error }}</p>
  </form>
</template>
