import React from 'react'
import { Link, useStaticQuery, graphql } from "gatsby"

const style = { 
  footer: {
    margin: `0 auto`,
    justifySelf: `flex-start`,
    maxWidth: 960,
    padding: `2rem 0`,
    fontSize: `14px`,
    textAlign: `left`,
    width: `100%`
  },
  ul: {
    listStyle: `none`,
    display: `flex`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    margin: `0`
  },
  li: {
    textTransform: `uppercase`,
    
  },
  link: {
    textDecoration: `none`,
    color: `coral`,
    marginRight: `2rem`
  },
  credits: {
    width: `100%`,
    margin: `0 auto`,
    textAlign: ``
  }
};

const Footer = () => {
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
    <footer style={style.footer}>
      <ul style={style.ul}>
        <li>
          <Link style={style.link} to="/">Home</Link>
        </li>
        <li>
          <Link style={style.link} to="/about">About</Link>
        </li>
        <li>
          <Link style={style.link} to="/contact">Contact</Link>
        </li>
      </ul>
      <br/>
      <div style={style.credits}>
        © {new Date().getFullYear()}, Built with
        {` `} <a href="https://www.gatsbyjs.com">Gatsby</a>
        <div>
          Built by <a href={data.site.siteMetadata.portfolio} target="_blank" rel="noreferrer">Matt Pignatore</a>
        </div>
      </div>

    </footer>
  )
}

export default Footer


