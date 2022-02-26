---
title: 'Getting Started'
date: '2022-02-20 18:02:43'
tags: 'Docs,Start,Install'
---

## 1. Install this starter

```bash
# Create a gatsby site using this starter
npx gatsby new my-blog https://github.com/je0ngyun/gatsby-starter-oasis

# or
npm install -g gatsby-cli
gatsby new my-blog https://github.com/je0ngyun/gatsby-starter-oasis
```

## 2. Enter your blog's information

You can fix meta data of blog in `user-meta-config.js` file.  
You can change the favicon and profile image of blog in `assets` directory.

## 3. Running in Development

```bash
cd my-blog/
npm run develop
```

## 4. Add your content

You can write

- `posts/index.md file` - markdown post on the main screen.
- `posts/projects/ directory` - posts on the projects page.
- `posts/develop/ directory` - posts on the develop page.

If you want to know how the addresses of each post are generated, please read [Guide](https://github.com/je0ngyun/gatsby-starter-oasis#-Guide).

## 5. Deploy to Netlify

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/je0ngyun/gatsby-starter-oasis" target="_blank"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>

After clicking that button, you’ll authenticate with GitHub and choose a repository name. Netlify will then automatically create a repository in your GitHub account with a copy of the files from the template.

It's okay to use gh-page instead of netlify

<br/>

> See the [README](https://github.com/je0ngyun/gatsby-starter-oasis) for more information
