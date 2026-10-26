import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

// Compile the existing TypeScript utility module without needing a test framework.
const source = readFileSync(new URL('../app/lib/utils.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const exports = {};
vm.runInNewContext(compiled, { exports, Intl, Date, Math, Array });

test('formatCurrency converts cents into USD', () => {
  assert.equal(exports.formatCurrency(12345), '$123.45');
  assert.equal(exports.formatCurrency(0), '$0.00');
});

test('generateYAxis rounds the maximum revenue to thousands', () => {
  const result = exports.generateYAxis([{ month: 'Jan', revenue: 2500 }]);
  assert.equal(result.topLabel, 3000);
  assert.deepEqual(Array.from(result.yAxisLabels), ['$3K', '$2K', '$1K', '$0K']);
});

test('generatePagination handles short page ranges', () => {
  assert.deepEqual(Array.from(exports.generatePagination(2, 4)), [1, 2, 3, 4]);
});

test('generatePagination handles first, middle and last pages', () => {
  assert.deepEqual(Array.from(exports.generatePagination(2, 10)), [1, 2, 3, '...', 9, 10]);
  assert.deepEqual(Array.from(exports.generatePagination(5, 10)), [1, '...', 4, 5, 6, '...', 10]);
  assert.deepEqual(Array.from(exports.generatePagination(9, 10)), [1, 2, '...', 8, 9, 10]);
});
