import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface HYRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (config: T) => T
  responseInterceptorCatch?: (err: any) => any
}

export interface HyRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  incterceptors?: HYRequestInterceptors<T>
  showLoading?: boolean
}
