(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.Calculator = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  function tokenize(input) {
    const tokens = [];
    let i = 0;
    while (i < input.length) {
      const ch = input[i];
      if (ch === ' ') {
        i++;
        continue;
      }
      if (/[0-9.]/.test(ch)) {
        let raw = '';
        while (i < input.length && /[0-9.]/.test(input[i])) {
          raw += input[i];
          i++;
        }
        if ((raw.match(/\./g) || []).length > 1) {
          throw new Error('Invalid number: ' + raw);
        }
        tokens.push({ type: 'number', value: parseFloat(raw) });
      } else if ('+-*/'.indexOf(ch) !== -1) {
        tokens.push({ type: 'operator', value: ch });
        i++;
      } else {
        throw new Error('Unexpected character: ' + ch);
      }
    }
    return tokens;
  }

  function evaluate(input) {
    const tokens = tokenize(String(input));
    if (tokens.length === 0) {
      throw new Error('Empty expression');
    }

    const flat = [];
    let expectNumber = true;
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (expectNumber) {
        if (token.type === 'operator' && token.value === '-') {
          if (!tokens[i + 1] || tokens[i + 1].type !== 'number') {
            throw new Error('Expected a number');
          }
          tokens[i + 1].value = -tokens[i + 1].value;
          continue;
        }
        if (token.type !== 'number') {
          throw new Error('Expected a number');
        }
        flat.push(token.value);
        expectNumber = false;
      } else {
        if (token.type !== 'operator') {
          throw new Error('Expected an operator');
        }
        flat.push(token.value);
        expectNumber = true;
      }
    }
    if (expectNumber) {
      throw new Error('Expression ends with an operator');
    }

    const firstPass = [flat[0]];
    for (let i = 1; i < flat.length; i += 2) {
      const op = flat[i];
      const operand = flat[i + 1];
      if (op === '*') {
        firstPass.push(firstPass.pop() * operand);
      } else if (op === '/') {
        firstPass.push(firstPass.pop() / operand);
      } else {
        firstPass.push(op, operand);
      }
    }

    let result = firstPass[0];
    for (let i = 1; i < firstPass.length; i += 2) {
      const op = firstPass[i];
      const operand = firstPass[i + 1];
      result = op === '+' ? result + operand : result - operand;
    }
    return result;
  }

  return { tokenize: tokenize, evaluate: evaluate };
});
