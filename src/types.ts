/*
Types:

Boolean
Number
String
Array
Tuple 
Enum
Unknown
Any
Void
Never
Object

/*------------------------------------------------------------------------- */

let isDone: boolean = false; // boolean
let num: number = 15; // number
let str: string = "TypeScript"; // string

/*------------------------------------------------------------------------- */

let nums: number[] = [1, 2, 3]; // array of numbers
let animals: string[] = ["Tiger", "Lion", "Cheetah"]; // array of string
// using generic type:
let oddNums: Array<number> = [1, 3, 5, 7];
let cities: Array<String> = ["Mumbai", "Bangalore", "Delhi"];

/*------------------------------------------------------------------------- */

/* Tuple: allow you to express an array with a fixed number of elements
whose types are known, but need not be the same. */

let x: [string, number, boolean];
x = ["hello", 10, true];

/* 
x = [10, "hello", false] 
error: number is not assignable to type string and vice versa
x = ["hello", 15]
error: source has 2 elements, but the target requires 3 
*/

/*------------------------------------------------------------------------- */

// Enum: enum is way of giving more friendly names to sets of numeric values.
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green; // 1
console.log(Color[1]); // Green

/* by default, enums begin numbering their members starting at 0.
You can change this by manually setting the value of one of its memebers.
or manually set all the values in the enum */

enum Color2 {
  Red = 1,
  Green = 2,
  Blue = 4,
}
let c2: Color = Color.Green;

/*------------------------------------------------------------------------- */

/* Unknown type:represents a value that could be anything, 
 but prevents you from performing any operations on it 
 until you explicitly prove what the type is.
 
 you can assign any value to an unknown variable
 
 You cannot access properties, call methods, 
 or treat an unknown value as a specific type without checking it first*/

let notSure: unknown = 4;
notSure = "maybe a string instead";
notSure = false;

let randomVariable: unknown = "hello";
// randomVariable.toUpperCase() // error: unknown type

if (typeof randomVariable == "string") randomVariable.toUpperCase(); // ✅ valid

/*------------------------------------------------------------------------- */

/* 
any type:
any type is a powerful way to work with existing JavaScript
allowing you to gradually opt-in or opt-out of type checking during compilation.   
*/

let dynamicValue: any = "hello";
dynamicValue = 49;
dynamicValue.toUpperCase(); // no compile error, but will throw an erro at runtime

// unlike unknow, variable of type any allow you to access properties,
// even ones that don't exist. These properties include functions and typescript will not check their existence or type.

/*------------------------------------------------------------------------- */

// void type: the opposite of any: the absense of having any type at all.
// can be used to define a function that does not return a value
function warnUser(): void {
  console.log("This is my warning message");
}
// declaring variables of type void is not useful because you can only assign null or undefined to them

/*------------------------------------------------------------------------- */

/* 
never type: represents the type of values that never occur, 
for example, never is the return type for a function 
that always throws an exception or one that never returns.
*/

// Function returning never must not have a reachable end point
function error(message: string): never {
  throw new Error(message);
}

// Inferred return type is never
function fail() {
  return error("Something failed");
}

// Function returning never must not have a reachable end point
function infiniteLoop(): never {
  while (true) {}
}

/*------------------------------------------------------------------------- */

/* 
Object: object type represents the non-primitive type, 
i.e. anything that is not number, string, boolean, null, or undefined.
It is useful when you want to ensure a variable holds something complex like an object literal, array or function.

commonly, you define an object's shape by listing its properties and their types. 
*/

// anonymous(inline) definition where variables are declared
const user: { name: string; age: number } = { name: "Alice", age: 24 };

// Type alias: A reusable name for a specific shape
type User = { name: string; age: number };
const user1: User = { name: "kartik", age: 24 };

// Interface: similar to type aliases but better for object-oriented designs and extending other shapes

interface User1 {
  name: String;
  age: number;
}
 
export {};
