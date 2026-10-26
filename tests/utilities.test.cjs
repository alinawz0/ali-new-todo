const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

const source = fs.readFileSync(path.join(__dirname, '../app/lib/utils.ts'), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const exported = {};
new Function('exports', 'require', compiled)(exported, require);

test('formatCurrency converts cents into USD', () => {
  assert.equal(exported.formatCurrency(12345), '$123.45');
  assert.equal(exported.formatCurrency(0), '$0.00');
});

test('generatePagination handles small page counts', () => {
  assert.deepEqual(exported.generatePagination(2, 5), [1, 2, 3, 4, 5]);
});

test('generatePagination handles first, middle, and last pages', () => {
  assert.deepEqual(exported.generatePagination(1, 10), [1, 2, 3, '...', 9, 10]);
  assert.deepEqual(exported.generatePagination(5, 10), [1, '...', 4, 5, 6, '...', 10]);
  assert.deepEqual(exported.generatePagination(10, 10), [1, 2, '...', 8, 9, 10]);
});

test('generateYAxis rounds up to next thousand', () => {
  assert.deepEqual(exported.generateYAxis([{ month: 'Jan', revenue: 1500 }]), {
    yAxisLabels: ['$2K', '$1K', '$0K'],
    topLabel: 2000,
  });
});
