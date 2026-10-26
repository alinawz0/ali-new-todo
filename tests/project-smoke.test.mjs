import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('public seed endpoint is disabled', () => {
  const route = readFileSync(new URL('../app/seed/route.ts', import.meta.url), 'utf8');
  assert.match(route, /status:\s*404/);
  assert.doesNotMatch(route, /INSERT\s+INTO/i);
});

test('dashboard layout opts out of build-time prerendering', () => {
  const layout = readFileSync(new URL('../app/dashboard/layout.tsx', import.meta.url), 'utf8');
  assert.match(layout, /export const dynamic = ['"]force-dynamic['"]/);
});

test('architecture and security documentation are present', () => {
  for (const path of ['docs/architecture.md', 'docs/security-review.md', 'docs/database-migrations.md']) {
    const text = readFileSync(new URL('../' + path, import.meta.url), 'utf8');
    assert.ok(text.trim().length > 100, path + ' must not be empty');
  }
});
