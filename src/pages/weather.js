import React, { useEffect, useState } from 'react'

import Layout from "../components/layout"
import SEO from "../components/seo"

const Weather = ({ zip }) => {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const APIKey = "166a433c57516f51dfab1f7edaed8413"
  const queryURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&units=imperial&appid=${APIKey}`

  useEffect(() => {
    // setWeather(fetchData())
    fetchData()
  }, [])

  const fetchData = async () => {
    if (queryURL !== undefined) {
      const response = await fetch(queryURL)
      const json = await response.json()
      console.log(json)
      setWeather(json)
      setLoading(false)
    }
  }

  return (
    <Layout>
      <SEO title="Location weather" />
      {
        !loading
        ?
        <div>
          <h1>{weather.name}</h1>
          <h2>
            Temperature right now is {weather.main.temp}.
            Feels like {weather.main.feels_like}.
            {weather.weather.map(item => {
              return ` You can expect ${item.description}.`
            })}
          </h2>
        </div>
        :
        ''
      }
    </Layout>
  )
}

Weather.defaultProps = {
  zip: `05401`
}

export default Weather