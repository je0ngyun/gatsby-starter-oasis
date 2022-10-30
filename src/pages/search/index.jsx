import React from 'react'
import { Layout } from '../../components/Layout'
import { Seo } from '../../components/Seo'
import { PostItems } from '../../components/PostItems'
import { PageTitle } from '../../components/PageTitle'
import { useTopLevelPathName } from '../../hooks'
import { capitalize } from '../../utils/capitalize'
import { useAllPosts } from '../../hooks'
import { SearchBar } from '../../components/SearchBar'
import { useState } from 'react'
import { useEffect } from 'react'
import { chosungIncludes } from '@toss/hangul'

const SearchPage = () => {
  const data = useAllPosts()
  const [searchKey, setSearchKey] = useState('')
  const [filteredData, setFilteredDate] = useState([])

  const topLevelPathName = useTopLevelPathName()
  const pageName = capitalize(topLevelPathName)

  useEffect(() => {
    const posts = data || []
    if (!searchKey.length) {
      setFilteredDate([])
      return
    }
    const filteredData = posts.filter((post) => {
      const { desc, title, tags, tech } = post.childMarkdownRemark.frontmatter
      return (
        (desc && desc.toLowerCase().includes(searchKey.toLowerCase())) ||
        (desc && chosungIncludes(desc, searchKey)) ||
        (title && title.toLowerCase().includes(searchKey.toLowerCase())) ||
        (title && chosungIncludes(title, searchKey)) ||
        (tags && tags.toLowerCase().includes(searchKey)) ||
        (tags && chosungIncludes(tags, searchKey)) ||
        (tech && tech.toLowerCase().includes(searchKey)) ||
        (tech && chosungIncludes(tech, searchKey))
      )
    })
    setFilteredDate(filteredData)
  }, [searchKey])

  return (
    <Layout belongs={topLevelPathName}>
      <Seo title={pageName} />
      <PageTitle title="Search Post" />
      <SearchBar value={searchKey} onChange={setSearchKey} />
      <PostItems key={filteredData.length} posts={filteredData} />
    </Layout>
  )
}
SearchPage.defaultProps = {}
SearchPage.propTypes = {}

export default SearchPage
