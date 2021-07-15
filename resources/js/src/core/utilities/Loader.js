class Loader {
  static show ($vs) {
    $vs.loading()
  }

  static hide ($vs) {
    $vs.loading.close()
  }
}

export default Loader
