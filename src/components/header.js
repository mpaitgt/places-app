import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const Header = ({ siteTitle, description }) => {
  const [queryString, setQueryString] = React.useState('')
  const [results, setResults] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [dropdownActive, setDropdownActive] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener('mouseup', (e) => {
      if (!e.target.classList.contains('dropdown')) {
        setDropdownActive(false);
      }
    })
  }, [])

  const retrieveData = async (queryString) => {
    setLoading(true)
    if (queryString) {
      let url = `http://geodb-free-service.wirefreethought.com/`;
      url += `v1/geo/cities?limit=10&offset=0&namePrefix=${queryString}`;

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }).then(response => response.json())
        .then(data => {
          let filtered = data.data.filter(item => item.type == 'CITY')
          setResults(filtered)
          setLoading(false)
          if (filtered.length > 0) {
            setDropdownActive(true);
          }
        })
        .catch(err => console.log(err))
    }
  }

  return (
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
        <form onSubmit={(e) => {
          e.preventDefault();
          retrieveData(queryString)
        }} style={{ display: `flex`, fontSize: `14px` }}>
          <div style={{ position: `relative` }}>
          <input
            style={{ 
              border: `none`,
              padding: `0.2rem 0.8rem`
            }} 
            type="text" 
            onChange={(e) => setQueryString(e.target.value)}
            value={queryString}
          />
          <ul className="dropdown" style={{ 
            display: `${dropdownActive ? 'block' : 'none'}`,
            position: `absolute`, 
            top: `100%`, 
            left: `0`, 
            margin: `0`, 
            padding: `1rem 0.8rem`, 
            listStyle: `none`,
            background: `#fff`,
            width: `100%`,
            boxShadow: `0px 7px 20px -14px`
          }}>
            {
              dropdownActive && !loading && results.map((city, index, arr) => {
                return (
                  <li>{`${city.city}, ${city.regionCode}, ${city.countryCode}`}</li>
                )
              })
            }
          </ul>
          </div>
          <button 
            style={{
              border: `none`,
              alignSelf: `stretch`,
              background: `#ffbb72`,
              padding: `0.2rem 1rem`,
              color: `white`,
              fontWeight: `700`,
            }}
            type="submit"
          >
            Search any place
          </button>
        </form>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
  description: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ``,
  description: ``
}

export default Header
