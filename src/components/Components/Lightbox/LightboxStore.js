class LightboxStore {

  constructor() {
    this.state = {
      images: [],
      descriptions: [],
      index: false,
    }
  }

  addImage(url) {
    return this.state.images.push(url)
  }

  addDescription(description) {
    this.state.descriptions.push(description)
  }

  open(index) { this.state.index = index - 1; }

  close() { this.state.index = false; }

  next() {
    this.state.index++;
    if (this.state.index >= this.state.images.length) {
      this.state.index = 0;
    }
  }

  prev() {
    this.state.index--;
    if (this.state.index < 0) {
      this.state.index = this.state.images.length -1;
    }
  }

  remove(url) {
    this.state.images = this.state.images.filter(image => image !== url)
  }
}

export default new LightboxStore()



