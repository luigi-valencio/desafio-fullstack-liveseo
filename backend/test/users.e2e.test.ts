import 'reflect-metadata';
import { afterEach, beforeEach, test } from 'node:test';
import assert from 'node:assert/strict';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { configureApp } from '../src/setup';

let app: INestApplication;
beforeEach(async () => {
  const module = await Test.createTestingModule({ imports: [AppModule] }).compile();
  app = module.createNestApplication();
  configureApp(app);
  await app.init();
});
afterEach(async () => { await app?.close(); });

test('GET retorna os usuários iniciais no formato pedido', async () => {
  const response = await request(app.getHttpServer()).get('/users').expect(200);
  assert.deepEqual(response.body, [
    { id: 1, name: 'Ana', email: 'ana@email.com' },
    { id: 2, name: 'Pedro', email: 'pedro@email.com' },
  ]);
});

test('POST normaliza dados, gera IDs e inclui usuários no GET', async () => {
  const created = await request(app.getHttpServer()).post('/users')
    .send({ name: ' Maria ', email: ' MARIA@email.com ' }).expect(201);
  assert.deepEqual(created.body, { id: 3, name: 'Maria', email: 'maria@email.com' });
  const second = await request(app.getHttpServer()).post('/users')
    .send({ name: 'João', email: 'joao@email.com' }).expect(201);
  assert.equal(second.body.id, 4);
  const listed = await request(app.getHttpServer()).get('/users').expect(200);
  assert.equal(listed.body.length, 4);
  assert.deepEqual(listed.body[2], created.body);
});

test('POST rejeita dados inválidos sem alterar a lista', async () => {
  for (const body of [
    {}, { name: '', email: 'a@email.com' }, { name: '   ', email: 'a@email.com' },
    { name: 'Ana', email: 'invalido' }, { name: 123, email: 'a@email.com' },
    { name: 'Ana', email: null }, { name: 'A'.repeat(101), email: 'a@email.com' },
    { name: 'Ana', email: 'a@email.com', password: 'nao-aceitar' },
  ]) {
    await request(app.getHttpServer()).post('/users').send(body).expect(400);
  }
  const response = await request(app.getHttpServer()).get('/users');
  assert.equal(response.body.length, 2);
});

test('POST rejeita e-mail repetido mesmo com maiúsculas', async () => {
  await request(app.getHttpServer()).post('/users')
    .send({ name: 'Outra Ana', email: 'ANA@email.com' }).expect(409);
});

test('nova aplicação começa com os dados iniciais', async () => {
  await request(app.getHttpServer()).post('/users')
    .send({ name: 'Maria', email: 'maria@email.com' }).expect(201);
  await app.close();
  const module = await Test.createTestingModule({ imports: [AppModule] }).compile();
  app = module.createNestApplication();
  configureApp(app);
  await app.init();
  const response = await request(app.getHttpServer()).get('/users').expect(200);
  assert.equal(response.body.length, 2);
});
