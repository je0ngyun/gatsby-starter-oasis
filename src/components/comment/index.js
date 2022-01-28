import React, { createRef, useEffect } from 'react'
import { useMetadata } from '../../hooks'
import './index.scss'

const Comment = () => {
  const { commentRepo } = useMetadata()
  const containerRef = createRef()

  useEffect(() => {
    const utterances = document.createElement('script')
    const attributes = {
      src: 'https://utteranc.es/client.js',
      repo: commentRepo,
      'issue-term': 'pathname',
      label: 'comment',
      theme: 'github-light',
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
