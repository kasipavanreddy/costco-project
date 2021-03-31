import React, { Suspense } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
const List = React.lazy(() => import("./list"))

const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Order List page" />
      <Suspense fallback={<div>Loading...</div>}>
        <List />
      </Suspense>
    </Layout>
  )
}

export default IndexPage
