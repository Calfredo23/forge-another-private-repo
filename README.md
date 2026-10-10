# plain-calculator

A tiny calculator built with plain HTML, CSS and JavaScript. It supports
`+ - * /`, decimals, and correct operator precedence (so `2+3*4` is `14`).
There are no dependencies and no build step.

## Run it

```sh
npm start
```

Then open the printed `http://localhost:8000` URL. You can also just open
`index.html` directly in a browser.

Run the tests with:

```sh
npm test
```

## Layout

- `index.html` — the button keypad and display
- `style.css` — styling
- `app.js` — UI wiring (button clicks -> expression string)
- `calculator.js` — pure `evaluate()` logic, shared by the page and the tests
- `calculator.test.js` — behaviour tests for `evaluate()`
- `serve.js` — dependency-free static server for `npm start`

## Next steps

1. Add keyboard support: listen for `keydown` on `document` and map the number
   and operator keys to the same `append`/`equals` handlers in `app.js`.
2. Add a calculation history panel that stores previous expression/result pairs
   and renders them as a list.
3. Add parentheses support to `evaluate()` in `calculator.js` (recursive
   descent), with new tests covering nesting and precedence.
