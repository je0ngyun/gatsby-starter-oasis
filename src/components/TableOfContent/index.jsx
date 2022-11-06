import React from 'react'
import PropTypes from 'prop-types'
import { useEffect, useCallback } from 'react'
import * as Dom from '../../utils/dom'
import './index.scss'

const TableOfContent = ({ toc }) => {
  const onIntersect = useCallback(
    (() => {
      let prev
      return async ([entry]) => {
        const {
          target: { id },
        } = entry
        if (entry.isIntersecting) {
          const headingTarget = Dom.getElement(`a[href*="${encodeURI(id)}"]`)
          prev?.classList.remove('toc-highlight')
          headingTarget?.classList.add('toc-highlight')
          prev = headingTarget
        }
      }
    })(),
    []
  )

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, {
      threshold: 1,
      rootMargin: '0px 0px -70% 0px',
    })
    const headings = Dom.getElement('#markdown').querySelectorAll('h1,h2,h3')
    headings.forEach((elem) => {
      observer.observe(elem)
    })
    return () => {
      observer && observer.disconnect
    }
  }, [])
  if (!toc) return <></>

  return (
    <div className="toc-containter">
      <div className="toc-highlight-bar"></div>
      <div className="toc">
        <h3>Table of content</h3>
        <div dangerouslySetInnerHTML={{ __html: toc }}></div>
      </div>
    </div>
  )
}

TableOfContent.defaultProps = {}
TableOfContent.propTypes = {
  toc: PropTypes.string.isRequired,
}

export { TableOfContent }
