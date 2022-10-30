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

const SearchPage = () => {
  const data = useAllPosts()
  const [searchKey, setSearchKey] = useState('')
  const [filteredData, setFilteredDate] = useState([])

  const topLevelPathName = useTopLevelPathName()
  const pageName = capitalize(topLevelPathName)

  useEffect(() => {
    const posts = data || []
    const filteredData = posts.filter((post) => {
      const { desc, title, tags, tech } = post.childMarkdownRemark.frontmatter
      return (
        (desc && desc.toLowerCase().includes(searchKey.toLowerCase())) ||
        (title && title.toLowerCase().includes(searchKey.toLowerCase())) ||
        (tags && tags.toLowerCase().includes(searchKey)) ||
        (tech && tech.toLowerCase().includes(searchKey))
      )
    })
    setFilteredDate(() => (searchKey ? filteredData : []))
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
