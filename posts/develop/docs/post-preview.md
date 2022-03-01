---
title: 'Post preview'
date: '2021-02-19 16:00:30'
tags: 'Quick Start,Start,Tip'
---

## Image

### Markdown Syntax

```bash
# Relative path based on Markdown currently being written
![img](../../../assets/favicon.png)
```

![img](../../../assets/favicon.png)

```bash
# You can specify width
# However, it is fixed to 100% width on mobile screen
![img](../../../assets/favicon.png '#width=30%;')
```

![img](../../../assets/favicon.png '#width=30%;')

## Table

```markdown
| Welcome | Oasis    |
| ------- | -------- |
| Starter | JeongYun |
| Blog    | Post     |
| Gatsby  | React    |
```

| Welcome | Oasis    |
| ------- | -------- |
| Starter | JeongYun |
| Blog    | Post     |
| Gatsby  | React    |

## Code

### Code Highlight with [Roboto mono font](https://fonts.google.com/specimen/Roboto+Mono)

You can write the line number to highlight like this

<pre class="language-text">
```js{2,3} 
// your code
```
</pre>

```js{2,3}
function Me(_name) {
  this.name = _name // highlight line
  this.email = `Jeongyunniim@gmail.com` // highlight line
}

const jy = new Me(`JeongYun`)
console.log(jy)
// Me { name: 'JeongYun', email: 'Jeongyunniim@gmail.com' }
```

## Inline Code

This is `Inline Code`

## Block Quote

> This is Block Quote

## Math Equations

Surround your equation with `$` to generate a math equation in inline mode.

```
$a^2 + b^2 = c^2$
```

Formula : $a^2 + b^2 = c^2$

Surround your equation with `$$` and new-lines to generate a math equation in display mode.

```
$$Gatsby \subseteq Oasis$$
```

$$Gatsby \subseteq Oasis$$

[Latex symbols](https://www.caam.rice.edu/~heinken/latex/symbols.pdf)
