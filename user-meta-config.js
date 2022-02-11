const userMetadata = {
  title: `Gatsby-Starter-Oasis`, // Blog title - Used for display in the navbar and used for SEO.
  description: `Gatsby blog template`, //Blog Description - Used for SEO.
  author: `Je0ngyun`,
  copyright: `Copyright ⓒ 2021 je0ngyun/JeongYun`,
  siteUrl: `https://www.xxx.xx`, // Enter the URL to deploy or deploy. Used to create a Sitemap and create Robots.txt.
  commentRepo: `je0ngyun/blog-comments`, // Please enter the Github repository where comments will be saved.
  googleVerification: ``, // Please enter the verification code from Google Search Console.
  naverVerification: ``, // Please enter the verification code from Naver Serarch Console.
}

const pageMetadata = {
  //menu - Please enter a menu link to add to the navbar.
  //If you do not want to add a link to the navbar, you can leave it blank.
  menu: [
    { title: 'Home', path: '/', content: 'Home' },
    {
      title: 'Projects',
      path: '/projects',
      content: 'Projects',
    },
    { title: 'Develop', path: '/develop', content: 'Develop' },
  ],
  //directorys - Enter the directory to be mapped with the page.
  //That directory is automatically linked to the gatsby filesystem.
  directorys: ['develop', 'projects'],
}

exports.pageMetadata = (() => {
  pageMetadata.menu = JSON.stringify(pageMetadata.menu)
  return pageMetadata
})()

exports.userMetadata = userMetadata
