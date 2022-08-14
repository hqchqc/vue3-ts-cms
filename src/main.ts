import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import './assets/css/index.less'

// import '../src/service/axios_demo'
// import hyRequest from './service'

import router from './router'
import store, { setupStore } from './store'

createApp(App).use(router).use(store).mount('#app')

setupStore()

// console.log('VUE_APP_BASE_URL', process.env.VUE_APP_BASE_URL)

// hyRequest.request({
//   url: '/home/multidata',
//   method: 'get',
//   incterceptors: {
//     requestInterceptor: (config) => {
//       console.log('单独请求的config')
//       return config
//     }
//   }
// })

// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// hyRequest
//   .request<DataType>({
//     url: '/home/multidata',
//     method: 'get'
//   })
//   .then((res) => {
//     console.log('res.data', res.data)
//     console.log('res.returnCode', res.returnCode)
//     console.log('res.success', res.success)
//   })
