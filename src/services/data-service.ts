import axios from 'axios'

const dataApi = axios.create({
  baseURL: `${import.meta.env.BASE_URL}/data`,
  timeout: 1000,
  headers: {
    'Content-Type': 'applicattion/json',
  },
})

export const dataService = {
  getUsedLibs () {
    return dataApi.get('/used-libs.json').then(response => response.data)
  },
}
