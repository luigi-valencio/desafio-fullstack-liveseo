import { test } from 'node:test';
import assert from 'node:assert/strict';
import { filterByNumericField, namesOlderThan23, users } from './users';

test('nomes esperados e entrada preservada', () => {
  const before = structuredClone(users);
  assert.deepEqual(namesOlderThan23(users), ['Ana', 'Pedro']);
  assert.deepEqual(users, before);
});
test('limite exclusivo, lista vazia e todos abaixo do limite', () => {
  assert.deepEqual(namesOlderThan23([{ id: 4, name: 'Limite', age: 23 }]), []);
  assert.deepEqual(namesOlderThan23([]), []);
  assert.deepEqual(filterByNumericField(users, 'age', 30), []);
});
test('bônus funciona com campos e tipos diferentes', () => {
  assert.deepEqual(filterByNumericField(users, 'id', 1).map(user => user.name), ['Pedro', 'Maria']);
  assert.deepEqual(filterByNumericField([{ price: 10, title: 'A' }, { price: 20, title: 'B' }], 'price', 10), [{ price: 20, title: 'B' }]);
});

// Este trecho é somente uma verificação de compilação, não é executado.
function checkTypes(): void {
  // @ts-expect-error name não é uma propriedade numérica
  filterByNumericField(users, 'name', 23);
  // @ts-expect-error campo inexistente
  filterByNumericField(users, 'height', 23);
}
void checkTypes;
