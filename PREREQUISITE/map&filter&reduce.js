//!  ------ map, filter, reduce Methods ------ //

const numbers = [1, 2, 3, 4, 5];
console.log("Numbers:", numbers);

// Map: Create a new array by multiplying each element by 2
const doubled = numbers.map(num => num * 2);
console.log("Doubled:", doubled); 

// Filter: Create a new array with elements greater than 2
const filtered = numbers.filter(num => num > 2);
console.log("Filtered (greater than 2):", filtered); 

// Reduce: Sum all elements in the array
const sum = numbers.reduce((accumulator, current) => accumulator + current, 0);
console.log("Sum:", sum); 