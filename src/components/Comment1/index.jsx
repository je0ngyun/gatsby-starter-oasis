import React, { createRef, useEffect } from 'react'
import { useMetadata } from '../../hooks'
import * as Dom from '../../utils/dom'
import './index.scss'

const Comment = () => {
  const DARK_THEME = 'preferred-color-scheme'
  const LIGHT_THEME = 'github-light'
  const { commentRepo } = useMetadata()
  const containerRef = createRef()

  useEffect(() => {
    const isLightTheme = Dom.hasClassOfBody('light')
    const utterances = document.createElement('script')
    const attributes = {
      src: 'https://utteranc.es/client.js',
      repo: commentRepo,
      'issue-term': 'pathname',
      label: 'comment',
      theme: isLightTheme ? LIGHT_THEME : DARK_THEME,
      crossorigin: 'anonymous',
      async: 'true',
    }
    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value)
    })
    containerRef.current.appendChild(utterances)
  }, [commentRepo, containerRef])

  return <div id="comment" ref={containerRef} />
}

export { Comment }
