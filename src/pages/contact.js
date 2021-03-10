import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ContactPage = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          email
          portfolio
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Contact Page" />
      <h1>Contact</h1>
      <p>
        <a href={data.site.siteMetadata.portfolio} target="_blank" rel="noreferrer">On the web</a>   
      </p> 
      <p>
        <a href={`mailto:${data.site.siteMetadata.email}`} rel="noreferrer">Via email</a>
      </p>
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default ContactPage
