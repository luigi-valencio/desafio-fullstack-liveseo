import { describe, expect, it } from "vitest";
import { useTasks } from "./useTasks";

describe("tarefas", () => {
  it("começa vazia e rejeita títulos vazios ou longos", () => {
    const list = useTasks();
    expect(list.progress.value).toBe(0);
    expect(list.addTask("   ")).toBe(false);
    expect(list.addTask("a".repeat(201))).toBe(false);
    expect(list.tasks.value).toHaveLength(0);
  });
  it("usa IDs diferentes para títulos iguais e remove só o item selecionado", () => {
    const list = useTasks();
    list.addTask("  Revisar  ");
    list.addTask("Revisar");
    const [first, second] = list.tasks.value;
    expect(first!.title).toBe("Revisar");
    expect(first!.id).not.toBe(second!.id);
    list.removeTask(first!.id);
    expect(list.tasks.value.map((task) => task.id)).toEqual([second!.id]);
  });
  it("recalcula filtros, contadores e progresso ao concluir, desmarcar e remover", () => {
    const list = useTasks();
    list.addTask("A");
    list.addTask("B");
    const id = list.tasks.value[0]!.id;
    list.toggleTask(id);
    expect(list.progress.value).toBe(50);
    expect(list.pendingCount.value).toBe(1);
    list.filter.value = "completed";
    expect(list.filteredTasks.value.map((task) => task.title)).toEqual(["A"]);
    list.filter.value = "pending";
    expect(list.filteredTasks.value.map((task) => task.title)).toEqual(["B"]);
    list.toggleTask(id);
    expect(list.completedCount.value).toBe(0);
    expect(list.filteredTasks.value).toHaveLength(2);
    list.filter.value = "all";
    list.removeTask(id);
    expect(list.filteredTasks.value).toHaveLength(1);
    list.removeTask(list.tasks.value[0]!.id);
    expect(list.progress.value).toBe(0);
    expect(list.filteredTasks.value).toHaveLength(0);
  });
});
