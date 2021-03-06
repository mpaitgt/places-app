/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from './footer'
import "./layout.css"

const Layout = ({ children, zip, setZip }) => {

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  return (
    <div style={{ display: `flex`, flexDirection: `column`, minHeight: `100vh` }}>
      <div style={{ flexGrow: `1` }}>
        <Header 
          siteTitle={data.site.siteMetadata?.title || `Title`}
          description={data.site.siteMetadata?.description || `Description`}
          zip={zip}
          setZip={setZip}
        />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0 1.0875rem 1.45rem`,
          }}
        >
          <main>{children}</main>
        </div>
      </div>
      <Footer />
    </div>
  )
}

// Layout.propTypes = {
//   children: PropTypes.node.isRequired,
//   zip: PropTypes.string,
//   setZip: PropTypes.func
// }

// Layout.defaultProps = {
//   zip: '',
//   setZip: function() {
//     return "setZip - that didn't work."
//   }
// }

export default Layout
