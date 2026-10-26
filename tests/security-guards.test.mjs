import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const source = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('all six invoice and customer mutations require authentication', () => {
  const actions = source('app/lib/actions.ts');
  const names = ['createInvoice', 'updateInvoice', 'deleteInvoice', 'createCustomer', 'updateCustomer', 'deleteCustomer'];
  for (const name of names) {
    const start = actions.indexOf('export async function ' + name + '(');
    assert.ok(start >= 0, name + ' exists');
    const body = actions.slice(start, start + 240);
    assert.match(body, /await requireAuthenticatedUser\(\)/, name + ' must check authentication first');
  }
});

test('query endpoint authenticates requests', () => {
  const route = source('app/query/route.ts');
  assert.match(route, /auth\.getUser\(\)/);
  assert.match(route, /401/);
});

test('seed endpoint is disabled in production and checks authentication', () => {
  const route = source('app/seed/route.ts');
  assert.match(route, /NODE_ENV/);
  assert.match(route, /production/);
  assert.match(route, /404/);
  assert.match(route, /auth\.getUser\(\)/);
});
