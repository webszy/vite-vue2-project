import axios from 'axios'
import axiosRetry from 'axios-retry'
import { notUndefined } from './index'
import to from 'await-to-js'
import { Toast } from 'vant'
const noErrorToast = [ 'follow/newapi','item/batch','ip-api.com','mxnzp.com','event','sessions/user']
const Service = axios.create({
  timeout: 12 * 1000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
export const ServiceWithoutRetry = axios.create({
  timeout: 12 * 1000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})
// 请求拦截器
Service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.log('error', error.response)
    const message = error.config.method + ': ' + error.config.url +'  '+ error.message
    console.warn('Network Error: message: ', message);
    let show = true
    for(let i = 0;i<noErrorToast.length;i++){
      if(error.config.url&&error.config.url.indexOf(noErrorToast[i])>=0){
        show = false
        break
      }
    }
    show&&Toast({message:'Network Error',position:'bottom'})
    // Notify({ type: 'danger', message,duration:8*1000 });
    return Promise.reject(error)
  }
)
ServiceWithoutRetry.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.log('error', error)
    const message = error.config.method + ': ' + error.config.url +'  '+ error.message
    console.warn('Network Error: message: ', message);
    let show = true
    const url = error.config.url ?error.config.url:''
    for(let i = 0;i<noErrorToast.length;i++){
      if(url.indexOf(noErrorToast[i])>=0){
        show = false
        break
      }
    }
    if(error.config.method.toLowerCase()==='put'){
      show = false
    }
    show&&Toast({message:'Network Error',position:'bottom'})
    // Notify({ type: 'danger', message,duration:8*1000 });
    return Promise.reject(error)
  }
)
axiosRetry(Service, {
  retries: 2,
  retryDelay: delayCount => delayCount * 100
})

export async function _get(url, qs,headers,cb,type) {
  const params = {
    url,
    method: 'get',
    params: notUndefined(qs) ? qs : ''
  }
  if(type&&type==='blob'){
    params.responseType = 'blob'
  }
  if(notUndefined(headers)){params.headers = headers}
  const [err, res] = await to(Service(params))
  if (!err && res) {
    return res
  } else {
    cb&&cb()
    console.log(err)
    return false
  }
}
export async function _getNoRetry(url, qs,headers,cb) {
  const params = {
    url,
    method: 'get',
    params: notUndefined(qs) ? qs : ''
  }
  if(notUndefined(headers)){params.headers = headers}
  const [err, res] = await to(Service(params))
  if (!err && res) {
    return res
  } else {
    cb&&cb()
    console.log(err)
    return false
  }
}
export async function _post(url, qs, body) {
  const params = {
    url,
    method: 'post',
    params: notUndefined(qs) ? qs : {},
    data: notUndefined(body) ? body : {}
  }
  const [err, res] = await to(Service(params))
  if (!err && res) {
    return res
  } else {
    console.log(err)
    return false
  }
}
export async function _postWithoutRetry(url, qs, body) {
  const params = {
    url,
    method: 'post',
    params: notUndefined(qs) ? qs : {},
    data: notUndefined(body) ? body : {}
  }
  const [err, res] = await to(ServiceWithoutRetry(params))
  if (!err && res) {
    return res
  } else {
    console.log(err)
    return false
  }
}
export async function _put(url, qs, body) {
  const params = {
    url,
    method: 'put',
    params: notUndefined(qs) ? qs : {},
    data: notUndefined(body) ? body : {}
  }
  const [err, res] = await to(Service(params))
  if (!err && res) {
    return res
  } else {
    console.log(err)
    return false
  }
}
export async function _putNoRetry(url, qs, body) {
  const params = {
    url,
    method: 'put',
    params: notUndefined(qs) ? qs : {},
    data: notUndefined(body) ? body : {}
  }
  const [err, res] = await to(ServiceWithoutRetry(params))
  if (!err && res) {
    return res
  } else {
    console.log(err)
    return false
  }
}
export async function _delete(url, qs) {
  const params = {
    url,
    method: 'delete',
    params: notUndefined(qs) ? qs : ''
  }
  const [err, res] = await to(Service(params))
  if (!err && res) {
    return res
  } else {
    console.log(err)
    return false
  }
}

export default Service
