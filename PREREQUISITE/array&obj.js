//! ----------- Arrays & Objects ----------- //

// Arrays
let fruits = ['Apple', 'Banana', 'Cherry'];
console.log("Fruits:", fruits); 

fruits.push('Date'); // Adding an element
console.log("After push:", fruits); 

console.log("First fruit:", fruits[0]); 
console.log("Number of fruits:", fruits.length); 

// Iterating over an array
fruits.forEach((fruit, index) => {
    console.log(`Fruit ${index + 1}: ${fruit}`);
});

fruits.pop();//Deleting an element
console.log("After pop:", fruits); 

fruits.shift(); // Removing first element
console.log("After shift:", fruits); 

fruits.unshift('Mango'); // Adding element at the beginning
console.log("After unshift:", fruits); 

fruits.splice(1, 1); // Removing 'Banana'
console.log("After removal:", fruits); 


console.log("\n --------- --------- ---" + "\n");


// Objects
let person = {
    name: 'John Doe',
    age: 28,
    isEmployed: true
};

console.log("Person:", person); // Output: Person: { name: 'John Doe', age: 28, isEmployed: true }
console.log("Name:", person.name); 
console.log("Age:", person['age']); 

person.city = 'New York'; // Adding a new property
console.log("After adding city:", person); 

person.age = 29; // Modifying an existing property
console.log("After modifying age:", person); 

delete person.isEmployed; // Deleting a property
console.log("After deleting isEmployed:", person); 

// Iterating over object properties
for (let key in person) {
    console.log(`${key}: ${person[key]}`);
}

// Nested Objects and Arrays
let student = {
    name: 'Jane Smith',
    grades: [90, 85, 88],
    address: {
        street: '123 Main St',
        city: 'Los Angeles'}
};
console.log("Student:", student);

console.log("First grade:", student.grades[0]); 
console.log("City:", student.address.city); 

student.grades.push(92); // Adding a grade
console.log("After adding grade:", student.grades); 

student.address.zip = '90001'; // Adding zip code
console.log("After adding zip:", student.address); 