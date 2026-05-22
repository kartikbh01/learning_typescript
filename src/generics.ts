// Generics let you write reusable, type-safe code without hardcoding types.
// Instead of writing separate functions for string, number,
// generics allow one function to work with multiple types while still preserving type safety.

// Problem without generics
function identityString(value: string): string {
  return value;
}
// this only works for string

// if you want numbers too
function identityNumber(value: number): number {
  return value;
}
// this becomes repetitive

// Basic generic function
function genericIdentity<T>(value: T): T {
  return value;
}
// t is a type parameter which acts like a placeholder for a type
const a = genericIdentity<string>("hello");
const b = genericIdentity<number>(123);

// usually, you don't even need to specify type manually
const a1 = genericIdentity("hello");
const b1 = genericIdentity(123);
// typescript infers the types of value passed

// you can use multiple type parameters
function pair<K, V>(key: K, value: V) {
  return { key, value };
}
pair("name", "kartik");
pair("age", 24);

// generic types
type Box<T> = {
  value: T;
};
const numberBox: Box<number> = {
  value: 10,
};
const stringBox: Box<string> = {
  value: "hello",
};

const scores: Array<number> = [];
const names: Array<string> = [];

function identityOne(val: boolean | number): boolean | number {
  return val;
}

function identityTwo(val: any) {
  return val;
}

function identityThree<Type>(val: Type): Type {
  return val;
}

identityThree(3);
identityThree("3");
identityThree("kartik");

function identityFour<T>(val: T): T {
  return val;
}

// you can define your own type and use them as generic

interface Bottle {
  brand: string;
  quantity: number;
}

identityFour<Bottle>({ brand: "milton", quantity: 2 });

// Generic constraints

function process<T>(value: T) {
  //return value.toUpperCase();
  // error: toUpperCase does not exist on type T
  // because T could be number, boolean, object, or anything
  // TS refuses unsafe operations
}

// solution: constraints
// if you know the generic must be a string
function process2<T extends string>(value: T) {
  return value.toUpperCase();
}

// but what if different types need different logic?
// string -> uppercase(), number -> square(), array -> length()
// this is not solved by plain generics
// you can use unions, narrowing, overloads

function transform<T extends string | number>(value: T) {
  if (typeof value === "string") {
    return value.toUpperCase();
  }

  if (typeof value === "number") {
    return value * value;
  }
}
