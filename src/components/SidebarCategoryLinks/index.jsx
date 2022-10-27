import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link } from 'gatsby'
import './index.scss'

const SidebarCategoryLinks = ({ posts, currentPostId }) => {
  const renderLinks = posts.map((post) => {
    const { sourceInstanceName } = post
    const { id } = post.childMarkdownRemark
    const { slug } = post.childMarkdownRemark.fields
    const { title } = post.childMarkdownRemark.frontmatter
    const isHighlight = currentPostId === id

    return (
      <Link
        className={classNames({ 'is-primary': isHighlight })}
        to={`/${sourceInstanceName}${slug}`}
        key={id}
      >
        {title}
      </Link>
    )
  })

  return <div className="side-bar-cat-links">{renderLinks}</div>
}

SidebarCategoryLinks.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  currentPostId: PropTypes.string,
}

export { SidebarCategoryLinks }
