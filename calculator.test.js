const test = require('node:test');
const assert = require('node:assert/strict');
const { evaluate, tokenize } = require('./calculator.js');

test('adds and subtracts left to right', () => {
  assert.equal(evaluate('2+3-1'), 4);
});

test('respects multiplication and division precedence', () => {
  assert.equal(evaluate('2+3*4'), 14);
  assert.equal(evaluate('10-6/2'), 7);
});

test('handles decimals', () => {
  assert.equal(evaluate('1.5*2'), 3);
  assert.equal(evaluate('0.1+0.2'), 0.30000000000000004);
});

test('handles a leading negative number', () => {
  assert.equal(evaluate('-5+8'), 3);
  assert.equal(evaluate('-4*-2'), 8);
});

test('ignores spaces', () => {
  assert.equal(evaluate('  2 + 3 '), 5);
});

test('division by zero yields Infinity rather than throwing', () => {
  assert.equal(evaluate('5/0'), Infinity);
});

test('rejects empty input', () => {
  assert.throws(() => evaluate(''), /Empty expression/);
});

test('rejects trailing operator', () => {
  assert.throws(() => evaluate('2+'), /ends with an operator/);
});

test('rejects invalid characters', () => {
  assert.throws(() => evaluate('2^3'), /Unexpected character/);
});

test('tokenize splits numbers and operators', () => {
  assert.deepEqual(tokenize('12+3'), [
    { type: 'number', value: 12 },
    { type: 'operator', value: '+' },
    { type: 'number', value: 3 },
  ]);
});
