import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { BaseUrl } from '../config/index'
export function request(config) {
  const instance = axios.create({
    baseURL: BaseUrl.dev.url,
    timeout: 5000
  })
  instance.interceptors.request.use(
    config => {
      NProgress.start()
      if (config.push === '/login') {
      } else {
        if (window.sessionStorage.getItem('token')) {
          config.headers.Authorization = window.sessionStorage.getItem('token')
        }
      }
      return config
    },
    err => {
      console.log(err)
    }
  )
  instance.interceptors.response.use(
    res => {
      NProgress.done()
      return res.data
    },
    err => {
      console.log(err)
    }
  )

  return instance(config)
}
