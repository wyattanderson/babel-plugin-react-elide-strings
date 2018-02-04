[![npm version](https://badge.fury.io/js/babel-plugin-react-elide-strings.svg)](https://badge.fury.io/js/babel-plugin-react-elide-strings)

babel-plugin-react-elide-strings
===

Combines adjacent string literals in `React.createElement` calls to improve
rehydration behavior with server-side rendered pages.

What this solves
---

Given JSX with whitespace literals, perhaps inserted by Prettier:

```javascript
ReactDOM.render((
  <div>
    Hello{' '}
    <span>world</span>
  </div>
))
```

you might send this HTML from the server:

```
<div>Hello <span>world</span></div>
```

Your JSX, however, will have this:

```javascript
React.createElement('div', null, 'Hello', ' ', React.createElement(
  'span', null, 'world'))
```

which might cause problems when rehydrating.

What it does
---

This plugin combines all adjacent string literal children in calls to
`React.createElement`.


Should you use it?
---

Almost certainly not. It's absolutely untested. Solved my problem, though!
