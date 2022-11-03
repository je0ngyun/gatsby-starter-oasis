import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { extractTopLevelPathName } from '../utils/extractTopLevelPathName'
import { Layout } from '../components/Layout'
import { Sidebar } from '../components/Sidebar'
import { Comment } from '../components/Comment'
import { Seo } from '../components/Seo'
import { Title } from '../components/Elements'
import { PostNavigator } from '../components/PostNavigator'
import { Date } from '../components/Elements'
import { MarkdownContent } from '../components/MarkdownContent'
import { TableOfContent } from '../components/TableOfContent'
import { PostTags } from '../components/PostTags'
import * as SmoothScroll from '../utils/smoothScroll'

import './index.scss'
import 'katex/dist/katex.min.css'

const PostTemplate = ({ data, pageContext }) => {
  const { html, id, tableOfContents } = data.markdown
  const { title, date, tags } = data.markdown.frontmatter
  const { curSrcInsName } = pageContext
  const directorys = data.directorys.nodes
  const topLevelPathName = extractTopLevelPathName(data.markdown.fields.slug)

  useEffect(() => {
    SmoothScroll.init()
    return () => SmoothScroll.destroy()
  }, [])

  return (
    <Layout belongs={curSrcInsName}>
      <Seo title={title} />
      <Sidebar
        directorys={directorys}
        currentPostId={id}
        currentCategoryName={topLevelPathName}
      />
      <TableOfContent toc={tableOfContents} />
      <Title title={title} />
      <PostTags tags={tags} />
      <Date date={date} className="post-date" />
      <MarkdownContent html={html} />
      <PostNavigator pageContext={pageContext} />
      <Comment />
    </Layout>
  )
}

PostTemplate.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.object,
}

export default PostTemplate

export const query = graphql`
  query Template($slug: String, $curSrcInsName: String) {
    directorys: allDirectory(
      filter: {
        sourceInstanceName: { eq: $curSrcInsName }
        relativeDirectory: { regex: "/^$|^\\.\\.$/" }
      }
      sort: { order: DESC, fields: relativeDirectory }
    ) {
      nodes {
        id
        name
      }
    }
    markdown: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      id
      excerpt(pruneLength: 100)
      tableOfContents
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD , YYYY")
        tags
      }
    }
  }
`
