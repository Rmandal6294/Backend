//! ---------- All about Loops in JavaScript ---------- //

// For Loop
console.log("For Loop:");
for (let i = 0; i < 5; i++) {
    console.log("Iteration:", i);
}

// While Loop
console.log("\nWhile Loop:");
let j = 0;
while (j < 5) {
    console.log("Iteration:", j);
    j++;
}

// Do-While Loop
console.log("\nDo-While Loop:");
let k = 0;
do {
    console.log("Iteration:", k);
    k++;
} while (k < 5);

// For...in Loop (for objects)
console.log("\nFor...in Loop:");
const person = {name: "Alice", age: 25, city: "New York"};
for (let key in person) {
    console.log(`${key}: ${person[key]}`);
}

// For...of Loop (for arrays)
console.log("\nFor...of Loop:");
const colors = ["Red", "Green", "Blue"];    
for (let color of colors) {
    console.log(color);
}

// Nested Loops
console.log("\nNested Loops:");
for (let x = 1; x <= 3; x++) {
    for (let y = 1; y <= 2; y++) {
        console.log(`x: ${x}, y: ${y}`);
    }
}

// Break and Continue
console.log("\nBreak and Continue:");
for (let n = 0; n < 10; n++) {
    if (n === 5) {
        console.log("Breaking at n =", n);
        break; // Exit loop when n is 5
    }   
    if (n % 2 === 0) {
        console.log("Continuing at n =", n);
        continue; // Skip even numbers
    }
    console.log("n:", n);
}

