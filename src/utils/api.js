import axios from 'axios'

const BASE_URL = 'https://restcountries.eu/rest/v2'

export const get_countries = async () => {
  try {
    // const path = `${BASE_URL}/lang/${locale}`
    const path = `${BASE_URL}/all`
    const resp = await axios.get(path)
    return resp.data
  } catch (error) {
    console.log(error)
  }
}

export const get_country = async (code) => {
  try {
    const path = `${BASE_URL}/alpha/${code}`
    const resp = await axios.get(path)
    return resp.data
  } catch (error) {
    console.log(error)
  }
}
