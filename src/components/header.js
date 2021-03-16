import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const Header = ({ siteTitle, description }) => (
  <header
    style={{
      background: `coral`,
      marginBottom: `1.45rem`
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
        paddingBottom: `0.5rem`,
        display: `flex`,
        justifyContent: `space-between`,
        alignItems: `flex-end`
      }}
    >
      <div style={{

      }}>
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
      </div>


      <div style={{ display: `flex`, fontSize: `14px` }}>
        <input  style={{ 
          border: `none`,
          padding: `0.2rem 0.8rem`
          }} type="text" />
        <button style={{
          border: `none`,
          alignSelf: `stretch`,
          background: `#ffbb72`,
          padding: `0.2rem 1rem`,
          color: `white`,
          fontWeight: `700`,
        }}>Search any place</button>
      </div>

    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
  description: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ``,
  description: ``
}

export default Header
