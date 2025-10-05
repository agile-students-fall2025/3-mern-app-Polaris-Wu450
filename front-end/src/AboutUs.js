import { useEffect, useState } from 'react'
import axios from 'axios'
import loadingIcon from './loading.gif'
import './AboutUs.css'

/**
 * This component represents the About Us page.
 * Fetches personal information from the backend API.
 * @param {*} props - props passed to this component
 * @returns The contents of this component, in JSX form.
 */
const AboutUs = props => {
  const [aboutData, setAboutData] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/about`
        )
        setAboutData(response.data)
        setLoaded(true)
      } catch (err) {
        setError('Failed to load about information')
        setLoaded(true)
      }
    }

    fetchAboutData()
  }, [])

  return (
    <>
      <h1>About Us</h1>
      {error && <p className="AboutUs-error">{error}</p>}
      {!loaded && <img src={loadingIcon} alt="loading" />}
      {loaded && aboutData && (
        <div className="AboutUs-content">
          <img
            src={aboutData.imageUrl}
            alt={aboutData.name}
            className="AboutUs-image"
          />
          <h2>{aboutData.name}</h2>
          <div className="AboutUs-bio">
            {aboutData.bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default AboutUs