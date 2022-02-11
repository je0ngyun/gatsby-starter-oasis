const { pageMetadata, userMetadata } = require('./user-meta-config')

const config = {
  siteMetadata: {
    menu: pageMetadata.menu,
    ...userMetadata,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: userMetadata.siteUrl,
        sitemap: `${userMetadata.siteUrl}/sitemap/sitemap-index.xml`,
        policy: [
          {
            userAgent: '*',
            allow: '/',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: `anchor-header`,
              elements: [`h1`, `h2`, `h3`],
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {},
          },
          {
            resolve: `gatsby-remark-katex`,
            options: {
              strict: `ignore`,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 950,
              linkImagesToOriginal: false,
              wrapperStyle: 'margin-left: 0; margin-right: 0;',
            },
          },
          {
            resolve: `gatsby-remark-images-medium-zoom`,
            options: {
              margin: 30,
              scrollOffset: 0,
              includedSelector: '#markdown img',
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        display: `minimal-ui`,
        icon: `${__dirname}/assets/favicon.png`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/assets`,
      },
    },
  ],
}

pageMetadata.directorys.forEach((dir) => {
  const gsf = {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: dir,
      path: `${__dirname}/posts/${dir}/`,
    },
  }
  config.plugins.push(gsf)
})

module.exports = config
