import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { pathToFolderName } from '../utils/pathToFolderName'
import * as SmoothScroll from '../utils/smoothScroll'
import { graphql } from 'gatsby'
import { Layout } from '../components/layout'
import { Sidebar } from '../components/sidebar'
import { Comment } from '../components/comment'
import { Seo } from '../components/seo'
import { Title } from '../components/elements'
import { PostNavigator } from '../components/post-navigator'
import { Date } from '../components/elements'
import { PostContent } from '../components/post-content'
import { PostTags } from '../components/post-tags'
import { Divider } from '../components/elements'

import './index.scss'
import 'katex/dist/katex.min.css'

const PostTemplate = ({ data, pageContext }) => {
  const { html, id, excerpt } = data.markdown
  const { title, date, tags } = data.markdown.frontmatter
  const { curSrcInsName } = pageContext
  const directorys = data.directorys.nodes
  const firstPath = pathToFolderName(data.markdown.fields.slug)

  useEffect(() => {
    SmoothScroll.init()
    return () => SmoothScroll.destroy()
  }, [])

  return (
    <Layout folderName={curSrcInsName}>
      <Seo title={title} desc={excerpt} />
      <Sidebar
        directorys={directorys}
        currentPostId={id}
        currentCatName={firstPath}
      />
      <Title title={title} />
      <PostTags tags={tags} />
      <Date date={date} className="post-date" />
      <Divider style={{ marginBottom: '50px' }} />
      <PostContent html={html} />
      <Divider style={{ marginBottom: '50px' }} />
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
        relativeDirectory: { regex: "/^$|^..$/" }
      }
      sort: { order: ASC, fields: birthtime }
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
