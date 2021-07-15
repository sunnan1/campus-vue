import axios from 'axios'

export default  {

  get (url) {
    return axios.get(url, {
      headers : {
        'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`
      }
    })
  },
  post (url, obj) {
    return axios.post(url, obj, {
      headers : {
        'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`
      }
    })
  },
  put (url, obj) {
    return axios.put(url, obj, {
      headers : {
        'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`
      }
    })
  },
  delete (url) {
    return axios.delete(url, {
      headers : {
        'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`
      }
    })
  }
}
