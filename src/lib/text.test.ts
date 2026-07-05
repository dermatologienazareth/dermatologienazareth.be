import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isEmail, paragraphs, telHref } from './text.ts';

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

test('telHref strips spaces, slashes and dots', () => {
  assert.equal(telHref('09 385 67 82'), 'tel:093856782');
  assert.equal(telHref('09/385.67.82'), 'tel:093856782');
});

test('telHref keeps a leading + for international numbers', () => {
  assert.equal(telHref('+32 9 385 67 82'), 'tel:+3293856782');
});

test('isEmail accepts a real address', () => {
  assert.equal(isEmail('info@dermatologienazareth.be'), true);
});

test('isEmail rejects TODO placeholders and blanks', () => {
  assert.equal(isEmail('TODO: info@dermatologienazareth.be'), false);
  assert.equal(isEmail(''), false);
  assert.equal(isEmail('info at praktijk'), false);
});
