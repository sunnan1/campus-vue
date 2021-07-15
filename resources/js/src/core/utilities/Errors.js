class Errors {
  constructor () {
    this.errors = {}
  }

  record (error) {
    this.errors = error
  }

  all () {
      return this.errors
  }

  has (field) {
    return this.errors.hasOwnProperty(field)
  }

  get (field) {
    if (!Array.isArray(this.errors[field])) {
      return this.errors[field]
    }
    if (this.errors[field]) {
      return this.errors[field][0]
    }
  }

  clear (field) {
    if (field) {
      delete this.errors[field]
      return
    }
    this.errors = {}
  }

  any () {
    return Object.keys(this.all()).length > 0
  }
}

export default Errors
