import { test } from 'node:test';
import assert from 'node:assert/strict';
import { paragraphs } from './text.ts';

test('splits on a blank line', () => {
  assert.deepEqual(paragraphs('een\n\ntwee'), ['een', 'twee']);
});

test('treats repeated and whitespace-only blank lines as one break', () => {
  assert.deepEqual(paragraphs('een\n\n\n\ntwee\n   \ndrie'), ['een', 'twee', 'drie']);
});

test('handles CRLF line endings', () => {
  assert.deepEqual(paragraphs('een\r\n\r\ntwee'), ['een', 'twee']);
});

test('keeps single newlines inside a paragraph', () => {
  assert.deepEqual(paragraphs('regel een\nregel twee'), ['regel een\nregel twee']);
});

test('trims surrounding whitespace', () => {
  assert.deepEqual(paragraphs('  alleen  '), ['alleen']);
});

test('empty or blank input gives no paragraphs', () => {
  assert.deepEqual(paragraphs(''), []);
  assert.deepEqual(paragraphs('\n\n  \n'), []);
});
