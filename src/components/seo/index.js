import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useMetadata } from '../../hooks/queryHooks/useMetadata'
import { capitalize } from '../../utils/capitalize'

const Seo = ({ title, lang, meta }) => {
  const defaultData = useMetadata()
  const { googleVerification, naverVerification } = defaultData

  const metaDescription = defaultData.description
  const defaultTitle = defaultData.title
  const currentTitle = title ? capitalize(title) : defaultTitle
  const ogTitle = title
    ? `${capitalize(title)} | ${defaultTitle}`
    : defaultTitle

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={currentTitle}
      titleTemplate={title ? `%s | ${defaultTitle}` : null}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: ogTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: defaultData?.author || ``,
        },
        {
          name: `twitter:title`,
          content: ogTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `google-site-verification`,
          content: googleVerification,
        },
        {
          name: `naver-site-verification`,
          content: naverVerification,
        },
      ].concat(meta)}
    />
  )
}

Seo.defaultProps = {
  lang: `ko`,
  meta: [],
  description: ``,
}

Seo.propTypes = {
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
}

export { Seo }
