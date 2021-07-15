import Errors from './Errors'

class LoginForm {

  constructor (form, $store) {
    this.$store = $store
    this.email = form.email
    this.password = form.password
    this.errors = new Errors()
  }

  post () {
    return this.$store.dispatch('auth/validate', {
      email : this.email,
      password : this.password
    })
  }

  record (error) {
    if (error.response.status === 401 && (typeof error.response.data.message === 'string')) {
      this.errors.record({message : error.response.data.message})
    }
    if (error.response.status === 422 && (typeof error.response.data.message === 'object')) {
      this.errors.record(error.response.data.message)
    }

  }

}

export default LoginForm
