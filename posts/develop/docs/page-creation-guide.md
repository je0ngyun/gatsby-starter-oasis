---
title: 'Page creation guide'
date: '2022-02-20 18:02:41'
tags: 'Docs,Page,Creation,Guide'
---

## How to create a page?

```bash
npm run page
```

![CLI](../../../assets/readme/CLI-tool.gif)

Add the following to user-meta-config

```js
const pageMetadata = {
  //menu - Please enter a menu link to add to the navbar.
  //If you do not want to add a link to the navbar, you can leave it blank.
  menu: [
    { path: '/', linkname: 'Home' },
    { path: '/projects', linkname: 'Projects' },
    { path: '/develop', linkname: 'Develop' },
    { path: '/life', linkname: 'Life' }, // add!!
  ],
  //directorys - Enter the directory to be mapped with the page.
  //That directory is automatically linked to the gatsby filesystem.
  directorys: ['develop', 'projects', 'life'], // add life!!
}
```
