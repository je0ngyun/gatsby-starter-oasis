import React from 'react'
import { useMetadata } from '../../hooks'
import { useProfileImg } from '../../hooks'
import { GatsbyImage } from 'gatsby-plugin-image'
import './index.scss'

const Author = () => {
  const { author, description, otherSite } = useMetadata()
  const profileImg = useProfileImg()

  return (
    <div className="author-container">
      <div className="author-profile-img">
        <GatsbyImage image={profileImg} alt={author} />
      </div>
      <div className="author-description">
        <div>
          Blog by{' '}
          <a className="author-other-link" href={otherSite}>
            {author}
          </a>
        </div>
        <div>{description}</div>
        <div></div>
      </div>
    </div>
  )
}

export { Author }
