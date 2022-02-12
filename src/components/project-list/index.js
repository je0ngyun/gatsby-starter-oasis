import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { Date } from '../elements'
import './index.scss'

const ProjectList = ({ projects }) => {
  const renderProjectList = projects.map((project) => {
    const { stack, slug, title, period, tech, tags, desc } =
      project.childMarkdownRemark.frontmatter
    return (
      <Link
        className="project-link"
        key={project.childMarkdownRemark.id}
        to={`/${stack}/${slug}`}
      >
        <div>
          <div className="project-link-title">{title}</div>
          <Date date={period} className="project-link-period" />
          <div className="project-link-tech">
            {tech.split(',').map((tech, index) => {
              return <div key={index}>{tech}</div>
            })}
          </div>
        </div>
        <div>
          <div className="project-link-tags">{tags}</div>
          <div className="project-link-desc">
            <ul>
              {desc.split(';').map((desc, index) => {
                return <li key={index}>{desc}</li>
              })}
            </ul>
          </div>
        </div>
      </Link>
    )
  })
  return <>{renderProjectList}</>
}

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object),
}

export { ProjectList }
