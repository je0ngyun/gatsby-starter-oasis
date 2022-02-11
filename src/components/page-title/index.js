import React from 'react'
import PropTypes from 'prop-types'
import { GatsbyImage } from 'gatsby-plugin-image'
import { useProfileImg, useMetadata } from '../../hooks'
import { Title } from '../title'
import './index.scss'

const PageTitle = ({ title }) => {
  const profileImg = useProfileImg()
  const { author } = useMetadata()
  return (
    <div className="page-title">
      <GatsbyImage
        image={profileImg}
        style={{ borderRadius: '50px' }}
        alt={author}
      />
      <Title title={title} />
    </div>
  )
}

PageTitle.propTypes = {
  title: PropTypes.string,
}

export { PageTitle }
