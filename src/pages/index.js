import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {

  const [term, setTerm] = React.useState('');

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

  const renderMarkup = (placeData) => {
    return placeData.map(edge => { 
      const place = edge.node;
      return (
        <div key={place.contentful_id} style={{  }}>
          <h2>{place.title}</h2>
          <span><Link to={`/places/${place.slug}`}>Read more</Link></span>
          <p style={{ fontSize: `14px` }}>
            Created on {place.createdAt}<br/>
            Last updated {place.updatedAt}
          </p>
        </div>
      )
    })
  }

  const filterPlaces = (placeData) => {
    if (!term) {
      return renderMarkup(placeData);
    } else {
      return renderMarkup(placeData.filter(({node: {title}}) => {
        return title.toLowerCase().includes(term);
      }))
    }
  }

  return (
    <Layout>
      <SEO title="Home" />
      <div style={{ marginBottom: `40px`, display: `flex` }}>
        <input 
          onChange={e => setTerm(e.target.value)}
          style={{ 
            border: `none`, 
            borderBottom: `2px solid coral`, 
            padding: `0.25rem 1rem` 
          }} 
          name="filterTerm"
          type="text"
        />
        <div style={{ border: `none`, borderBottom: `2px solid coral`, padding: `0.25rem 1rem`, color: `coral`, background: `transparent` }}>Search saved places</div>
      </div>
      <div style={{ display: `grid`, gridTemplateColumns: `33.33% 33.33% 33.33%`, gridGap: `20px` }}>
      {/* {
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
      } */}
      {filterPlaces(data.allContentfulPlaces.edges)}
      </div>

    </Layout>
  )
}

export default IndexPage