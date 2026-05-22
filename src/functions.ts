/*
  1. Basic function typing
  2. Type inference (automatic return type inference)
  3. Optional Parameters
  4. Default Parameters
  5. Function type aliases
  6. Void functions (functions that don't return anything)
  7. Never type(function never finishes normally)
  8. Function overloading
  9. Union types 
  10. Rest parameters
  11. Function with Object parameters
  12. Destructured parameters
  13. Generic functions and constraints
  14. Higher Order Functions
  15. Function Interfaces

*/

//         type of param👇   👇type of return value
function addTwo(num: number): number {
  return num + 2;
}
// explicitly adding return type is optional as TS can automatically infer the return type
addTwo(5);

/*----------------------------------------------------------------------------------------------------------------- */
function getUpper(val: string): string {
  return val.toUpperCase();
}
getUpper("typescript");
// getUpper(5)  // error: number is not assignable to type string

/*----------------------------------------------------------------------------------------------------------------- */

// if your function doesn't return anything, you can have "void" as the type of return value
// mentioning void is optional, it automatically infers it if you don't have a return statement in your function.
function signUp(
  name: string,
  email: string,
  password: string,
  age: number,
  isPaid: boolean
): void {
  console.log("Welcome" + name);
}
signUp("kartik", "kartikbh56@mgmail.com", "1234", 15, false);

export {};

/*----------------------------------------------------------------------------------------------------------------- */

// Optional parameters
// ? means optional
function greet(name: string, title?: string) {
  console.log(title ? `${title} ${name}` : name);
}
greet("kartik"); // title is optional, you can either provide it or omit it
greet("kartik", "Hello");

/*----------------------------------------------------------------------------------------------------------------- */

// Default parameters
function createUser(name: string, role: string = "user") {
  return { name, role };
}
// role is optional, and has a default value "user"
createUser("kartik"); // {name:"kartik", role:"user"}
createUser("kartik", "admin"); // {name:"kartik", role:"admin"}

/*----------------------------------------------------------------------------------------------------------------- */

// function type aliases
type MathOperation = (a: number, b: number) => number;

// usage
const aRandomFunction: MathOperation = function (a, b) {
  return a + b;
};

const anotherRandomFunction: MathOperation = (a, b) => a * b;

/*----------------------------------------------------------------------------------------------------------------- */

// never type: used when a function never finishes normally
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {}
}

// function does not return and execution stops

/*----------------------------------------------------------------------------------------------------------------- */

// function overloading: You can define multiple ways a function can be called,
// while still having only one actual implementation

// Basic structure:
//  1. overload signature -> what users can call
//  2. implementation signature -> actual function body

function smartFormat(a: number, b: number): number; // multiply both the numbers
function smartFormat(a: string, b: number): string; // repeat string a, b times
function smartFormat(a: string[], b: string): string[]; // append suffix to every string
function smartFormat(a: Date, b: boolean): string; // if b is true -> ISO string else locale string

function smartFormat(
  a: number | string | string[] | Date,
  b: number | string | boolean
) {
  if (typeof a == "number" && typeof b == "number") {
    return a * b;
  } else if (typeof a == "string" && typeof b == "number") {
    return a.repeat(b);
  } else if (
    Array.isArray(a) &&
    a.every((ele) => typeof ele == "string") &&
    typeof b == "string"
  ) {
    return a.map((ele) => ele + b);
  } else if (a instanceof Date && typeof b == "boolean") {
    return b ? a.toISOString() : a.toLocaleString();
  }
}

console.log(smartFormat(10, 2)); // 20
console.log(smartFormat("TS", 5)); // "TSTSTSTSTS"
console.log(
  smartFormat(["Kartik", "Kunal", "Khushi", "Keerti", "Karan"], "😄")
);
// ["Kartik😄", "Kunal😄", "Khushi😄", "Keerti😄", "Karan😄"]

console.log(smartFormat(new Date(), true)); // "5/24/2026, 1:58:23 AM"
console.log(smartFormat(new Date(), false)); // "Sun May 24 2026 01:58:23 GMT+0530 (India Standard Time)"

/*----------------------------------------------------------------------------------------------------------------- */

// Union types in functions
function printId(id: string | number) {
  if (typeof id == "string") {
    return id.toLowerCase();
  }
  return id.toFixed(2);
}
// TS narrows the type based on conditions

/*----------------------------------------------------------------------------------------------------------------- */

// Rest parameters
function sum(...numbers: number[]) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

/*----------------------------------------------------------------------------------------------------------------- */

// functions with Object parameters
function createUser2(user: { name: string; age: number }) {
  return user.name;
}

// better approach
type User = {
  name: string;
  age: number;
};

function createUser3(user: User) {
  return JSON.stringify(user);
}

/*----------------------------------------------------------------------------------------------------------------- */

// Destructured parameters
// very common in react

type ButtonProps = {
  text: string;
  disabled?: boolean;
};

function Button({ text, disabled }: ButtonProps) {
  return disabled ? text : "";
}

/*----------------------------------------------------------------------------------------------------------------- */

// Generic functions

// without generics
function getFrist(arr: string[]): string {
  return arr[0];
} // only works for strings

function getFrist1<T>(arr: T[]): T {
  return arr[0];
}

getFrist1<string>(["a", "b"]);
getFrist1<number>([1, 2, 3]);

// generic constraints
function getLength<T extends { length: number }>(item: T) {
  // meaning: T can be any type, but it must have a length property
  return item.length;
}

getLength("hello");
getLength([1, 2, 3]);
getLength({ length: 10 });
// getLength(456); // invalid

function getId<T extends { id: string }>(obj: T) {
  // T can be anything but it must have a property id of type string
  return obj.id;
}

/*----------------------------------------------------------------------------------------------------------------- */

// Async functions
async function fetchUser(): Promise<string> {
  return Promise.resolve("kartik");
}

type User1 = {
  id: number;
  name: string;
};

// the return type of an async function must be a Promise
async function fetchuser(): Promise<User1> {
  const response = await fetch("https://api.github.com/users/kartikbh56");
  const data: User1 = await response.json();

  return data;
}

/*----------------------------------------------------------------------------------------------------------------- */

// callback function types
function processUser(name: string, callback: (message: string) => void) {
  callback(`Hello ${name}`);
}

processUser("kartik", (msg) => {
  console.log(msg);
});

/*----------------------------------------------------------------------------------------------------------------- */

// Higher order functions:
// functions that take or return functions or both

// 1
function processUser1(fn: (name: string) => void) {
  fn("kartik");
}

const greet1 = (name: string) => console.log(name);
processUser1(greet1);

// 2
function multiplier(factor: number) {
  return function (value: number) {
    return value * factor;
  };
}

multiplier(4)(2); // 8

/*----------------------------------------------------------------------------------------------------------------- */
// Function interfaces:
//  Function interfaces describe the shape of functions
// just like object interfaces describe objects

interface Greet {
  (name: string): string;
}

// structure:
// interface Something {
//   (args): returnType;
// }

const greet2: Greet = (name) => {
  return `Hello ${name}`;
};

// using function type
type Greet1 = (name: string) => string;
