import { filterByNumericField, namesOlderThan23, users } from './users';

console.log('Nomes com mais de 23 anos:', namesOlderThan23(users));
console.log('Bônus — idade > 23:', filterByNumericField(users, 'age', 23));
console.log('Bônus — id > 1:', filterByNumericField(users, 'id', 1));
