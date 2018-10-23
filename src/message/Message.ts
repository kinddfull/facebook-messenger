export class Message {
  text: string
  constructor(text) {
    this.text = text
  }
  setText(text) {
    this.text = text
  }

  getText() {
    return this.text
  }
}
