const userMetadata = {
  title: `Gatsby-Starter-Oasis`, // Blog title - nav-bar에 표시 및 SEO에 사용됩니다.
  description: `Gatsby blog template`, //Blog Description - footer 영역에 표시 및 SEO에 사용됩니다.
  author: `Je0ngyun`,
  copyright: `Copyright ⓒ 2021 je0ngyun/JeongYun`,
  siteUrl: `https://www.xxx.xx`, // 배포 예정 혹은 배포후의 Url을 입력해 주세요 - Sitemap 생성 및 Robots.txt 생성에 사용됩니다.
  commentRepo: `je0ngyun/blog-comments`, // 댓글이 저장될 Github 레포지토리를 입력해주세요.
  googleVerification: ``, // Google Search Console의 확인용 코드를 입력해주세요.
  naverVerification: ``, // Naver Serarch Console의 확인용 코드를 입력해주세요.
}

const pageMetadata = {
  //menu - nav-bar에 추가될 메뉴 링크를 입력해 주세요.
  //nav-bar에 링크 추가를 원치 않으시면 입력을 하지 않으셔도 좋습니다.
  menu: [
    { title: 'Home', path: '/', content: 'Home' },
    {
      title: 'Projects',
      path: '/projects',
      content: 'Projects',
    },
    { title: 'Develop', path: '/develop', content: 'Develop' },
  ],
  //directorys - page와 맵핑될 디렉토리를 입력해 주세요.
  //해당 디렉토리는 자동으로 gatsby filesystem 에 연결됩니다.
  directorys: ['develop', 'projects'],
}

exports.pageMetadata = (() => {
  pageMetadata.menu = JSON.stringify(pageMetadata.menu)
  return pageMetadata
})()

exports.userMetadata = userMetadata
