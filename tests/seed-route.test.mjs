import test from 'node:test';
import assert from 'node:assert/strict';
import { GET } from '../app/seed/route.ts';

test('public seed endpoint is disabled', async () => {
  const response = await GET();
  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { error: 'Not found' });
});
