class Animal {
  constructor(color) {
    this.color = color;
  }

  details() {
    console.log(`This ${this.color} ${this.type()} says ${this.sound()}`);
  }

  type() {
    return 'animal';
  }

  sound() {
    return 'animal noises';
  }
}

class Dog extends Animal {
  type() {
    return 'dog';
  }

  sound() {
    return 'ham ham';
  }
}

let animal = new Animal('blue');
animal.details();

let dog = new Dog('brown');
dog.details();