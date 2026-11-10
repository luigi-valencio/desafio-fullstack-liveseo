export interface User {
  id: number;
  name: string;
  age: number;
}

export const users: readonly User[] = [
  { id: 1, name: 'Ana', age: 25 },
  { id: 2, name: 'Pedro', age: 30 },
  { id: 3, name: 'Maria', age: 22 },
];

export function namesOlderThan23(items: readonly User[]): string[] {
  return items.filter(user => user.age > 23).map(user => user.name);
}

export type NumericKeys<T> = {
  [K in keyof T]-?: T[K] extends number ? K : never
}[keyof T];

// Filtra objetos por qualquer propriedade estritamente numérica.
export function filterByNumericField<T>(
  items: readonly T[], field: NumericKeys<T>, minimumExclusive: number,
): T[] {
  return items.filter(item => {
    const value = item[field];
    return typeof value === 'number' && value > minimumExclusive;
  });
}
