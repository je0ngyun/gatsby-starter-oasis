import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import './index.scss'

const SidebarCatLinks = ({ posts, currentPostId }) => {
  const renderLinks = posts.map((post) => {
    const { id } = post
    const { stack, slug, title } = post.frontmatter
    const isHighlight = currentPostId === id ? ' is-primary' : ''
    return (
      <Link className={isHighlight} to={`/${stack}/${slug}`} key={id}>
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
