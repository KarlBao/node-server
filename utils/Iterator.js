class Iterator {
  constructor (arr) {
    this.array = arr
    this.index = 0
  }

  reset () {
    this.index = 0
    return this.get()
  }

  get () {
    return this.array[this.index]
  }

  next () {
    let nextIndex = this.index + 1
    this.index = nextIndex < this.array.length ? nextIndex : 0
    return this.array[this.index]
  }
}

module.exports = Iterator