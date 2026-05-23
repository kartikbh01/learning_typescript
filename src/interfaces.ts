/* Interfaces: An interface describes the shape of an object
  interfaces only describe structure, they cannot have implementation
    1. Basic Interface
    2. Optional Properties


*/

/*----------------------------------------------------------------- */

// Basic Interface
interface User {
  name: string;
  age: number;
}

// Now any object of type User must follow this structure
const user: User = {
  name: "Kartik",
  age: 24,
};

/*----------------------------------------------------------------- */

// Optional Properties
// use ?
interface User1 {
  name: string;
  age?: number;
}

// age is optional
const u1: User1 = {
  name: "Kartik",
  age: 24,
};
const u2: User1 = {
  name: "Kartik",
};

/*----------------------------------------------------------------- */

// Readonly Properties

interface User2 {
  readonly id: number;
  name: string;
}

const user2: User2 = {
  id: 1,
  name: "Kartik",
};

user.name = "Kunal"; // ✅
// user.id = 2 ❌(readonly)

/*----------------------------------------------------------------- */

// Functions inside Interfaces

interface User3 {
  name: string;
  greet(): void;
}

const user3: User3 = {
  name: "Kartik",
  greet() {
    console.log("Hello" + this.name);
  },
};

user3.greet();

/*----------------------------------------------------------------- */

// function interfaces
// interfaces can describe standalone functions.

interface AddFn {
  (a: number, b: number): number;
  // any function assigned to AddFn must accept 2 numbers and return a number
}

const add: AddFn = (a, b) => {
  return a + b;
};

/*----------------------------------------------------------------- */

// Interfaces vs Type Aliases
// both can describe object shapes.

interface User4 {
  name: string;
}

type User5 = {
  name: string;
};

// when to use what?

// Interfaces can merge automatically

interface User6 {
  name: string;
  age: number;
}
interface User6 {
  isPaid: boolean;
}

// now
const user6: User6 = {
  name: "kartik",
  age: 23,
  isPaid: true,
};

// types cannot do this

type User7 = {
  name: string;
};

// error: duplicate identifier
// type User7 = {
//   age: number;
// }

/*----------------------------------------------------------------- */

// Extending Interfaces
// Interfaces support inheritance

interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

const dog: Dog = {
  name: "Tommy",
  breed: "German shephard",
};

/*----------------------------------------------------------------- */

// Multiple Interface Extension

interface Person {
  name: string;
}

interface Employee {
  company: string;
}

interface Developer extends Person, Employee {
  skills: string[];
}

const dev: Developer = {
  name: "Kartik",
  company: "OmniReach",
  skills: ["TypeScript", "React"],
};

/*----------------------------------------------------------------- */

// Interface with Arrays

interface User8 {
  name: string;
  age: number;
}

const users: User8[] = [
  { name: "Kartik", age: 24 },
  { name: "Kunal", age: 22 },
  { name: "Karan", age: 21 },
];

/*----------------------------------------------------------------- */

// Index Signatures
// Used when keys are unknown beforehand

interface Errors {
  [key: string]: string;
  // when not sure about what keys to add,
  // you can just define types for key and values.
}

const formErrors: Errors = {
  email: "Invalid email",
  password: "Too short",
};

/*----------------------------------------------------------------- */

// Interfaces with dynamic objects
interface Result {
  [key: string]: number | string;
}

const res1: Result = {
  math: 90,
  science: 98,
  english: 95,
  result: "pass",
};

/*----------------------------------------------------------------- */

// Nested interfaces

interface Address {
  city: string;
  pincode: number;
}

interface User9 {
  name: string;
  address: Address;
}

const user9: User9 = {
  name: "Kartik",
  address: {
    city: "Bangalore",
    pincode: 586587,
  },
};

/*----------------------------------------------------------------- */

// Interfaces with classes

interface Animal2 {
  name: string;
  makeSound(): void;
}

class Dog2 implements Animal2 {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  makeSound(): void {
    console.log("Bark");
  }
}

// this class promises to follow the interface contract
// this class implements all the methods and fields mentioned in the interface

/*----------------------------------------------------------------- */

// Extending types vs Interfaces

interface A {
  name: string;
}

interface B extends A {
  age: number;
}

// type

type A1 = {
  name: string;
};

type B1 = A & {
  age: number;
};

// interfaces mainly describe object shapes while types can compose any type

type Status = "loading" | "success" | "error";
type ID = number | string;

interface RandomInterface {
  ID: string;
}

// interface require compatible intheritance
interface RandomInterface1 extends RandomInterface {
  // ID: number //error
  // error: incorrectly extends ID types are incompatible
}

type A2 = {
  value: string;
};

type B2 = A2 & {
  value: number;
};

// but the value in B2 becomes never
// because string & number has no possible value

// const obj: B2 = {
//   value: 
// }

/*----------------------------------------------------------------- */

// difference between extends and implements
// Interface inherits another interface
// Class follows interface contract using Implements keyword


