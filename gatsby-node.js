const path = require('path')
const fetch = require('node-fetch')
const uuid = require('uuid')

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  // get path to template
  const placeTemplate = path.resolve('./src/templates/place.js')
  // get data from contentful
  const res = await graphql(`
    query {
      allContentfulPlaces {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
  // create new pages
  res.data.allContentfulPlaces.edges.forEach((edge) => {
    createPage({
      component: placeTemplate,
      path: `/places/${edge.node.slug}`,
      context: {
        slug: edge.node.slug
      }
    })
  })
}

// module.exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
//   const { createNode } = actions

//   var APIKey = "166a433c57516f51dfab1f7edaed8413"
//   var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + "zip=08530,us&units=imperial&appid=" + APIKey

//   const myData = await fetch(queryURL)
//     .then(res => res.json())
//     .then(data => {
//       return data
//     })

//   const nodeContent = JSON.stringify(myData);

//   const nodeMeta = {
//     id: createNodeId(uuid()),
//     parent: null,
//     children: [],
//     internal: {
//       type: `Place`,
//       mediaType: `text/html`,
//       content: nodeContent,
//       contentDigest: createContentDigest(myData)
//     }
//   }

//   console.log(`@@@@@@@@@@@@@@@@@@`, myData)
  
//   const node = Object.assign({}, myData, nodeMeta)
//   console.log(`===========================`);
//   console.log(node);
//   console.log(`===========================`);
//   createNode(node);

// }

// module.exports.onCreateNode = ({ node, actions }) => {
//   const { createNodeField } = actions
//   if (node.internal.type === 'MarkdownRemark') {
//     const slug = path.basename(node.fileAbsolutePath, '.md')
//     console.log(slug)
//     createNodeField({
//       node,
//       name: 'slug',
//       value: slug
//     })
//   }
// }