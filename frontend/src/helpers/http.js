import originAxios from 'axios'

import { BASE_URL } from '../constants/config'

const axios = originAxios.create({
  baseURL: BASE_URL,
})

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const authToken = localStorage.getItem('authToken') || ''

    if (authToken) {
      config.headers.common['Authorization'] = 'Bearer ' + authToken
    }

    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

const handleGeneralError = (error) => {
  console.log('error >>>>', error)
}

const handleGeneralSuccess = (response) => {
  return response.data
}

export const httpGet = (url) => {
  return axios.get(url).then(handleGeneralSuccess).catch(handleGeneralError)
}

export const httpPost = (url, data, opts) => {
  return axios
    .post(url, data, opts)
    .then(handleGeneralSuccess)
    .catch(handleGeneralError)
}

export const httpPut = (url, data) => {
  return axios
    .put(url, data)
    .then(handleGeneralSuccess)
    .catch(handleGeneralError)
}

export const httpDelete = (url, data) => {
  return axios
    .delete(url, data)
    .then(handleGeneralSuccess)
    .catch(handleGeneralError)
}
