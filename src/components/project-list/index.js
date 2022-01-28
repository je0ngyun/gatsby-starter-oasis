import React from 'react'
import { navigate } from 'gatsby'
import PropTypes from 'prop-types'
import './index.scss'

const ProjectList = ({ projects }) => {
  const redirecting = function (stack, slug) {
    navigate(`/${stack}/${slug}`)
  }

  const renderProjectList = projects.map((project) => {
    const { stack, slug, title, period, tech, tags, desc } =
      project.childMarkdownRemark.frontmatter
    return (
      <div
        className="item is-flex"
        key={project.childMarkdownRemark.id}
        role="button"
        tabIndex={0}
        onClick={() => redirecting(stack, slug)}
        onKeyDown={() => {}}
      >
        <div className="left-bullet">
          <div className="project-title">{title}</div>
          <div className="project-period">{period}</div>
          <div className="project-tech is-flex is-flex-wrap">
            {tech.split(',').map((tech, index) => {
              return <span key={index}>{tech}</span>
            })}
          </div>
        </div>
        <div className="right-bullet">
          <div className="project-tags">{`[ ${tags} ]`}</div>
          <div className="project-desc">
            <ul>
              {desc.split(';').map((desc, index) => {
                return <li key={index}>{desc}</li>
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  })
  return <div className="table-container">{renderProjectList}</div>
}

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object),
}

export { ProjectList }
