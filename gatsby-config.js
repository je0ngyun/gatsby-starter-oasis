const { pageMetadata, userMetadata } = require('./user-meta-config')

const config = {
  siteMetadata: {
    menu: pageMetadata.menu,
    ...userMetadata,
  },
  plugins: [
    `gatsby-plugin-netlify`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        trackingId: userMetadata.googleAnalyticsTrackingId,
        head: true,
        anonymize: true,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            serialize: ({ query: { allFile } }) => {
              return allFile.nodes.map((node) => {
                const { sourceInstanceName } = node
                const { excerpt, html, frontmatter } = node.childMarkdownRemark
                const { slug } = node.childMarkdownRemark.fields
                return {
                  ...frontmatter,
                  description: excerpt,
                  url: `${userMetadata.siteUrl}/${sourceInstanceName}${slug}`,
                  guid: `${userMetadata.siteUrl}/${sourceInstanceName}${slug}`,
                  custom_elements: [{ 'content:encoded': html }],
                }
              })
            },
            query: `
            {
              allFile(
                filter: { absolutePath: { regex: "/.md$/" } }
                sort: {
                  fields: childrenMarkdownRemark___frontmatter___period
                  order: DESC
                }
              ) {
                nodes {
                  sourceInstanceName
                  childMarkdownRemark {
                    excerpt
                    html
                    frontmatter {
                      title
                      date
                    }
                    fields {
                      slug
                    }
                  }
                }
              }
            }
          `,
            title: userMetadata.title,
            description: userMetadata.description,
            output: '/rss.xml',
          },
        ],
      },
    },
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
          `gatsby-remark-copy-linked-files`,
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
            resolve: `gatsby-remark-image-attributes`,
            options: {
              dataAttributes: true,
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

const metaDirectorys = pageMetadata.directorys.map((dir) => {
  return {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: dir,
      path: `${__dirname}/posts/${dir}/`,
    },
  }
})

config.plugins.push(...metaDirectorys, {
  resolve: `gatsby-source-filesystem`,
  options: {
    name: `index`,
    path: `${__dirname}/posts/`,
  },
})

module.exports = config
