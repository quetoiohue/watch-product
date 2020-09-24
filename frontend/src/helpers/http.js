import originAxios from 'axios'

import { BASE_URL } from '../constants/config'

const axios = originAxios.create({
  baseURL: BASE_URL,
})

const handleGeneralError = (error) => {
  console.log(error)
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
