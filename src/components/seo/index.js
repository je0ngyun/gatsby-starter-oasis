import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useMetadata } from '../../hooks/queryHooks/useMetadata'
import { capitalize } from '../../utils/capitalize'

const Seo = ({ title, description, lang, meta }) => {
  const defaultData = useMetadata()
  const { googleVerification, naverVerification } = defaultData
  const metaDescription = description || defaultData.description
  const defaultTitle = defaultData.title
  const currentTitle = capitalize(title)

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={currentTitle}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: currentTitle,
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
          content: currentTitle,
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
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export { Seo }
