import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {

  const data = useStaticQuery(graphql`
    query {
      allContentfulPlaces (
        sort:{
          fields: createdAt,
          order: ASC
        }
      ) {
        edges {
          node {
            contentful_id
            title
            coordinates {
              lon
              lat
            }
            slug
            createdAt(formatString: "MMMM Do, YYYY")
            updatedAt(fromNow: true)
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Home" />
      <div style={{ marginBottom: `40px`, display: `flex` }}>
        <input style={{ border: `none`, borderBottom: `2px solid coral`, padding: `0.25rem 1rem` }} type="text"></input>
        <button style={{ border: `none`, borderBottom: `2px solid coral`, padding: `0.25rem 1rem`, color: `coral`, background: `transparent` }}>Search saved places</button>
      </div>
      <div style={{ display: `grid`, gridTemplateColumns: `33.33% 33.33% 33.33%`, gridGap: `20px` }}>
      {
        data.allContentfulPlaces.edges.map(edge => {
          const place = edge.node;
          return (
            <div key={place.contentful} style={{  }}>
              <h2>{place.title} </h2>
              <span><Link to={`/places/${place.slug}`}>Read more</Link></span>
              <p style={{ fontSize: `14px` }}>
                Created on {place.createdAt}<br/>
                Last updated {place.updatedAt}
              </p>
              
            </div>
          )
        })
      }
      </div>

    </Layout>
  )
}

export default IndexPage
