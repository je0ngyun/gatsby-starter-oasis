import React from 'react'
import { Seo } from '../components/seo'
import { Layout } from '../components/layout'

const NotFound = () => (
  <Layout belongs="none">
    <Seo title="404 Not Found" />
    <h1>404 Not Found</h1>
    <div>This request URL is not found on this server</div>
  </Layout>
)

export default NotFound
