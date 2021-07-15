import axios from '../../axios'

export default {

  authenticate (state, formObj) {

    return axios.post(`${state.url}auth/login`, {
      email : formObj.email,
      password : formObj.password,
      role : state.role
    })
  }
}
