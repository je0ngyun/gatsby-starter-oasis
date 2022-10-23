import React, { useState, useEffect } from 'react'
import { useTopLevelPathName } from '../../hooks'
import { capitalize } from '../../utils/capitalize'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Date } from '../Elements'

import './index.scss'

const PostItems = ({ posts }) => {
  const baseOfSlice = 5
  const [targetElem, setTargetElem] = useState(null)
  const [targetIndex, setTargetIndex] = useState(0)
  const [renderList, setRenderList] = useState([])

  const slugToCategory = (slug) => {
    return slug.split('/').slice(1, -2).join('/')
  }

  useEffect(() => {
    const slicedItem = (base) => {
      return posts.slice(targetIndex, targetIndex + base).map((post, i) => {
        const { sourceInstanceName } = post
        const { id, excerpt } = post.childMarkdownRemark
        const { slug } = post.childMarkdownRemark.fields
        const { title, date } = post.childMarkdownRemark.frontmatter
        const categoryName = slugToCategory(slug) || useTopLevelPathName()
        return (
          <Link
            key={id}
            to={`/${sourceInstanceName}${slug}`}
            style={{ color: 'inherit' }}
          >
            <div
              ref={i === baseOfSlice - 1 ? setTargetElem : null}
              className="post-item-container"
            >
              <div className="post-item-title">{title}</div>
              <div className="post-item-info">
                <div className="is-primary">{capitalize(categoryName)}</div>
                <div className="is-primary">|</div>
                <Date className="post-item-date" date={date} />
              </div>
              <div
                className="post-item-excerpt"
                dangerouslySetInnerHTML={{
                  __html: excerpt,
                }}
              />
            </div>
          </Link>
        )
      })
    }
    setRenderList((list) => {
      return [...list, ...slicedItem(baseOfSlice)]
    })
  }, [targetIndex])

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting) {
      setTargetIndex((idx) => idx + baseOfSlice)
      observer.unobserve(entry.target)
    }
  }

  useEffect(() => {
    let observer
    if (targetElem) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.3,
      })
      observer.observe(targetElem)
    }
    return () => observer && observer.disconnect()
  }, [targetElem])

  return <>{renderList}</>
}

PostItems.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
}

export { PostItems }
