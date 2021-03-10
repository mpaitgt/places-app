import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = () => {
  // const data = useStaticQuery(graphql`
  //   query {
  //     allMarkdownRemark {
  //       edges {
  //         node {
  //           id
  //           html
  //           excerpt
  //           frontmatter {
  //             title
  //           }
  //           fields {
  //             slug
  //           }
  //         }
  //       }
  //     }
  //   }
  // `)

  return (
    <Layout>
      <SEO title="About Page" />
      <h1>About</h1>
      <p>A simple weather app with no frills or distractions.</p>
      <div>
      <h3>Some of my favorite places</h3>
      {/* <ul>
        {data.allMarkdownRemark.edges.map(place => {
          return (
            <li style={{ 
              listStyle: `none`,
              margin: `1rem 0`,
              padding: `20px`,

            }} key={place.node.id}>
              <Link to={`/places/${place.node.fields.slug}`}>
                {place.node.frontmatter.title}
              </Link>
            </li>
          )
        })}
      </ul> */}
    </div>
      <div>
        <Link to="/contact">Contact me!</Link>
      </div>
      <div>
        <Link to="/">Go back to the homepage</Link>
      </div>
    </Layout>
  )

}

export default AboutPage
