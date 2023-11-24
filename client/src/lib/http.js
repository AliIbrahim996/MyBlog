import axios from 'axios'

const domain = process.env.NODE_ENV === 'production' ? '' : `http://blogAppServer:${process.env.REACT_APP_SERVER_PORT}`
const http = (url, { method = 'GET', data = undefined }) => {
  return axios({
    url: `${domain}${url}`,
    method,
    data,
  })
}

// Main functions to handle different types of endpoints
const get = (url, opts = {}) => http(url, { ...opts })
const post = (url, opts = {}) => http(url, { method: 'POST', ...opts })
const put = (url, opts = {}) => http(url, { method: 'PUT', ...opts })
const deleteData = (url, opts = {}) => http(url, { method: 'DELETE', ...opts })

const methods = {
  get,
  post,
  put,
  delete: deleteData,
}

export default methods