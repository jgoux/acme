export { hello } from "./hello/hello.js";

export class Fish {
  constructor(public name: string) { }

  speak() {
    console.log(`${this.name} is speaking`);
  }

  swim() {
    console.log(`${this.name} is swimming`);
  }
}
