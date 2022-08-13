import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HYRequestInterceptors, HyRequestConfig } from './type'

import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

const DEFAULT_LOADING = true

class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  showLoading: boolean
  loading?: LoadingInstance

  constructor(config: HyRequestConfig) {
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.incterceptors

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有实例都有的拦截器：请求拦截成功')

        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...'
          })
        }

        return config
      },
      (err) => err
    )

    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有实例都有的拦截器：响应拦截成功')

        // 移除loading
        if (this.showLoading) {
          this.loading?.close()
        }

        const data = res.data
        if (data.returnCode === '1001') {
          console.log('请求失败')
        } else {
          return data
        }
      },
      (err) => {
        // 移除loading
        if (this.showLoading) {
          this.loading?.close()
        }

        if (err.response.status === 404) {
          console.log('404的错误')
        }
      }
    )
  }

  request<T>(config: HyRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.incterceptors?.requestInterceptor) {
        config = config.incterceptors.requestInterceptor(config)
      }

      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1. 单个请求对数据的处理
          if (config.incterceptors?.responseInterceptor) {
            res = config.incterceptors.responseInterceptor(res)
          }

          console.log('res', res)

          // 2. showLoading设置未true 这样不会影响下一次请求
          this.showLoading = DEFAULT_LOADING

          // 3. 将结果resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING

          reject(err)

          return err
        })
    })
  }

  get<T>(config: HyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: HyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: HyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: HyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default HYRequest
