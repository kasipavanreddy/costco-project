/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const axios = require("axios")
const crypto = require("crypto")

exports.sourceNodes = async ({ boundActionCreators }) => {
  const { createNode } = boundActionCreators

  // fetch raw data from the order api
  const fetchOrders = () => axios.get(`http://demo8268518.mockable.io/orders`)
  // await for results
  const res = await fetchOrders()

  // map into these results and create nodes
  res.data.map(order => {
    // Create your node object
    const orderNode = {
      // Required fields
      id: `${order.orderId}`,
      parent: `__SOURCE__`,
      internal: {
        type: `Orders`, // name of the graphQL query --> allOrders {}
        // contentDigest will be added just after
        // but it is required
      },
      ...order,
    }

    // Get content digest of node. (Required field)
    const contentDigest = crypto
      .createHash(`md5`)
      .update(JSON.stringify(orderNode))
      .digest(`hex`)
    // add it to orderNode
    orderNode.internal.contentDigest = contentDigest

    // Create node with the gatsby createNode() API
    createNode(orderNode)
  })

  return
}
