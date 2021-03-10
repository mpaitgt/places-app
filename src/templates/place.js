import React, { useEffect, useState } from 'react';
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Link, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import moment from 'moment'

const Place = ({ zip, data }) => {
  const [forecast, setForecast] = useState(null)
  // const [currently, setForecast] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const place = data.contentfulPlaces
  const APIKey = "166a433c57516f51dfab1f7edaed8413"

  useEffect(() => {
    fetchForecast()
    // fetchCurrently()
  }, [])

  const fetchForecast = async () => {
    const queryURL = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${place.coordinates.lat}&lon=${place.coordinates.lon}&units=imperial&appid=${APIKey}`

    if (queryURL !== undefined) {
      const response = await fetch(queryURL)
      const json = await response.json()
      setForecast(json)
      setLoaded(true)
    }
  }

  // const fetchCurrently = async () => {
  //   const queryURL = `https://api.openweathermap.org/data/2.5/weather?lat=${place.coordinates.lat}&lon=${place.coordinates.lon}&units=imperial&appid=${APIKey}`

  //   if (queryURL !== undefined) {
  //     const response = await fetch(queryURL)
  //     const json = await response.json()
  //     setWeather(json)
  //     console.log(json)
  //     setLoaded(true)
  //   }
  // }
  
  return (
    <Layout>
      <SEO name="Place template" />
      <Link to="/">Go home</Link>
      <div>
        <h1>{place.title}</h1>
        <p>Created on {place.createdAt}</p>
        <div style={{ display: `grid`, gridTemplateColumns: `repeat(7, 1fr)` }}>
          {/* <div>
            {
              place.body 
              ?
              documentToReactComponents(JSON.parse(place.body.raw))
              :
              ''
            }
          </div> */}
            {
              loaded
              ?
              forecast.list.map(item => {
                return (
                  <div key={item.dt}>
                    {moment.unix(item.dt).format('dddd')}<br/>
                    {moment.unix(item.dt).format('MMMM DD')}
                    <br />
                    <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}></img>
                    {Math.floor(item.temp.day)}&#176;
                  </div>
                )
              })
              :
              ''
            }
        </div>

      </div>
    </Layout>
  )

}

export default Place

Place.defaultProps = {
  zip: `08530`
}

export const placeQuery = graphql`
  query ($slug: String!) {
    contentfulPlaces ( slug: { eq: $slug } ) {
      title
      coordinates {
        lon
        lat
      }
      createdAt(formatString: "MMMM Do YYYY")
      updatedAt(fromNow: true)
      body {
        raw
      }
    }
  }
`