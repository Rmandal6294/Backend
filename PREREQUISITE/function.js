//! -------- Function / Arrow Function / Anonymous Functions -------- //

// Normal Function
function add(a, b) {
    return a + b;
}
console.log(add(2, 3)); // Output: 5
console.log(add(10, 15)); // Output: 25
// Function with Default Parameters
function greet(name = "Guest") {
    return `Hello, ${name}!`;
}
console.log(greet());
console.log(greet("Alice")); // Output: Hello, Alice!


// Arrow Function
const multiply = (x, y) => x * y;
console.log(multiply(4, 5)); // Output: 20
console.log(multiply(7, 3)); // Output: 21
// Arrow Function with Single Parameter
const square = n => n * n;
console.log(square(6));
console.log(square(9)); // Output: 81


// Anonymous Function
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(function(num) {
    return num * 2;
});
console.log(doubled); // Output: [2, 4, 6, 8, 10]

// Modern ES6 Arrow Function (also anonymous)
(() => {
  console.log("I'm a shorter anonymous function!");
})(); 
// Output happens immediately

setTimeout(function() {
  console.log("This appears after 2 seconds.");
}, 2000);
