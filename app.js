(function () {
  const display = document.getElementById('display');
  const keys = document.querySelector('.keys');

  let expression = '';
  let justEvaluated = false;

  function render() {
    display.textContent = expression === '' ? '0' : expression;
  }

  function isOperator(ch) {
    return '+*/'.indexOf(ch) !== -1 || ch === '-';
  }

  function append(value) {
    const last = expression.slice(-1);

    if (isOperator(value)) {
      if (expression === '') {
        if (value !== '-') return;
      } else if (isOperator(last)) {
        expression = expression.slice(0, -1) + value;
        render();
        return;
      }
    }

    if (value === '.') {
      const currentNumber = expression.split(/[+\-*/]/).pop();
      if (currentNumber.indexOf('.') !== -1) return;
      if (currentNumber === '') value = '0.';
    }

    expression += value;
    justEvaluated = false;
    render();
  }

  function clear() {
    expression = '';
    justEvaluated = false;
    render();
  }

  function back() {
    expression = expression.slice(0, -1);
    justEvaluated = false;
    render();
  }

  function equals() {
    if (expression === '') return;
    try {
      const result = Calculator.evaluate(expression);
      expression = Number.isFinite(result) ? String(result) : 'Error';
    } catch (err) {
      expression = 'Error';
    }
    justEvaluated = true;
    render();
  }

  keys.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;

    const action = button.dataset.action;
    if (action === 'clear') return clear();
    if (action === 'back') return back();
    if (action === 'equals') return equals();

    const value = button.dataset.value;
    if (value === undefined) return;

    if (justEvaluated && !isOperator(value) && value !== '.') {
      expression = '';
    }
    justEvaluated = false;
    append(value);
  });

  render();
})();
