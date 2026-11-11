import { computed, readonly, ref } from "vue";
import type { Task, TaskFilter } from "../types/task";

export function useTasks() {
  const tasks = ref<Task[]>([]);
  const filter = ref<TaskFilter>("all");
  const completedCount = computed(
    () => tasks.value.filter((task) => task.completed).length,
  );
  const pendingCount = computed(
    () => tasks.value.length - completedCount.value,
  );
  const progress = computed(() =>
    tasks.value.length
      ? Math.round((completedCount.value / tasks.value.length) * 100)
      : 0,
  );
  const filteredTasks = computed(() =>
    tasks.value.filter(
      (task) =>
        filter.value === "all" ||
        (filter.value === "completed" ? task.completed : !task.completed),
    ),
  );

  function addTask(title: string): boolean {
    const trimmed = title.trim();
    if (!trimmed || trimmed.length > 200) return false;
    tasks.value.push({
      id: crypto.randomUUID(),
      title: trimmed,
      completed: false,
    });
    return true;
  }
  function toggleTask(id: string): void {
    const task = tasks.value.find((item) => item.id === id);
    if (task) task.completed = !task.completed;
  }
  function removeTask(id: string): void {
    tasks.value = tasks.value.filter((item) => item.id !== id);
  }
  return {
    tasks: readonly(tasks),
    filter,
    filteredTasks,
    completedCount,
    pendingCount,
    progress,
    addTask,
    toggleTask,
    removeTask,
  };
}
