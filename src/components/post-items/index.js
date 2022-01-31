import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import './index.scss'

const PostItems = ({ posts }) => {
  const baseOfSlice = 7
  const [targetElem, setTargetElem] = useState(null)
  const [targetIndex, setTargetIndex] = useState(0)
  const [renderList, setRenderList] = useState([])

  useEffect(() => {
    const slicedItem = (base) => {
      return posts.slice(targetIndex, targetIndex + base).map((file, i) => {
        const { id, excerpt } = file.childMarkdownRemark
        const { stack, title, date, slug } =
          file.childMarkdownRemark.frontmatter
        return (
          <Link key={id} to={`/${stack}/${slug}`}>
            <div
              ref={i === baseOfSlice - 1 ? setTargetElem : null}
              className="post-item-container"
            >
              <div>
                <span className="post-item-title">{title}</span>
                <span className="post-item-date">{date}</span>
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
  }, [posts, targetIndex])

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
