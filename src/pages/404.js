import React from 'react'
import { Layout } from '../components/layout'

const NotFound = () => (
  <Layout folderName="none">
    <h1>
      <strong>404</strong>Not Found
    </h1>
    <h3>This request URL is not found on this server</h3>
  </Layout>
)

export default NotFound
