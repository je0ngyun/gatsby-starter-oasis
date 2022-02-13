import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link } from 'gatsby'
import './index.scss'

const SidebarCatLinks = ({ posts, currentPostId }) => {
  const renderLinks = posts.map((post) => {
    const { relativeDirectory } = post
    const { id } = post.childMarkdownRemark
    const { slug, title } = post.childMarkdownRemark.frontmatter
    const isHighlight = currentPostId === id

    return (
      <Link
        className={classNames({ 'is-primary': isHighlight })}
        to={`/${relativeDirectory}/${slug}`}
        key={id}
      >
        {title}
      </Link>
    )
  })

  return <div className="side-bar-cat-links">{renderLinks}</div>
}

SidebarCatLinks.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  currentPostId: PropTypes.string,
}

export { SidebarCatLinks }
