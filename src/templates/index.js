import React, { useEffect } from 'react'
import * as ScrollManager from '../utils/scroll'
import { graphql } from 'gatsby'
import { Layout } from '../components/layout'
import { Sidebar } from '../components/sidebar'
import { Comment } from '../components/comment'
import { Seo } from '../components/seo'
import { Title } from '../components/title'
import { PostNavigator } from '../components/post-navigator'
import { Date } from '../components/date'
import { PostContent } from '../components/post-content'
import { PostTags } from '../components/post-tags'
import { Divider } from '../components/elements'

import './index.scss'
import 'katex/dist/katex.min.css'

const PostTemplate = ({ data, pageContext }) => {
  const { html, id, excerpt } = data.markdown
  const { title, stack, date, tags } = data.markdown.frontmatter
  const { curSrcInsName, commentRepo } = pageContext
  const directorys = data.directorys.nodes

  useEffect(() => {
    ScrollManager.init()
    return () => ScrollManager.destroy()
  }, [])

  return (
    <Layout pageName={curSrcInsName}>
      <Seo title={title} desc={excerpt} />
      <Sidebar
        directorys={directorys}
        currentPostId={id}
        currentCatName={stack}
      />
      <Title title={title} />
      <PostTags tags={tags} />
      <Date date={date} className="post-date" />
      <Divider style={{ marginBottom: '50px' }} />
      <PostContent html={html} />
      <Divider style={{ marginBottom: '50px' }} />
      <PostNavigator pageContext={pageContext} />
      <Comment repo={commentRepo} />
    </Layout>
  )
}

export default PostTemplate

export const query = graphql`
  query Template($slug: String, $curSrcInsName: String) {
    markdown: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      id
      tableOfContents
      excerpt(pruneLength: 100)
      frontmatter {
        stack
        title
        date(formatString: "MMMM DD , YYYY")
        tags
        slug
      }
    }
    directorys: allDirectory(
      filter: { sourceInstanceName: { eq: $curSrcInsName } }
      sort: { order: ASC, fields: birthtime }
    ) {
      nodes {
        id
        name
      }
    }
  }
`
