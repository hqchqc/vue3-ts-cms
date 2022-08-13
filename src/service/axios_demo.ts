import axios from 'axios'

// axios的实例对象
axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
  console.log('res', res)
})

axios
  .get('http://httpbin.org/get', {
    params: {
      foo: 'bar'
    }
  })
  .then((res) => {
    console.log('res', res)
  })

axios
  .post('http://httpbin.org/post', {
    params: {
      foo: 'post'
    }
  })
  .then((res) => {
    console.log('res', res)
  })

// Promise本身是可以用类型的
// new Promise<string>((resolve) => {
//   resolve('21')
// }).then((res) => {
//   console.log('res', res)
// })

// 4. axios配置选项
// axios.defaults.baseURL = 'http://httpbin.org'
// axios.defaults.timeout = 5000
// axios.defaults.headers = {}

axios.interceptors.request.use(
  (config) => {
    console.log('config', config)
    return config
  },
  (err) => {
    console.log('请求错误')
    console.log('err', err)
  }
)

axios.interceptors.response.use(
  (res) => {
    console.log('res1', res)
    return res
  },
  (err) => {
    console.log('err', err)
  }
)
