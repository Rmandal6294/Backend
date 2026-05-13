//! --------- let / const / var --------- //

//* ------ let ----- //
let age = 25;
age = 30; // Reassigning is allowed
console.log("Age:", age); // Output: Age: 30

let score; // Declaration without initialization
score = 100; // Initialization
console.log("Score:", score); // Output: Score: 100

//* ----- const ----- //
const birthYear = 1995;
// birthYear = 2000; // Error: Assignment to constant variable
console.log("Birth Year:", birthYear); // Output: Birth Year: 1995

// const pi ; // Must be initialized at declaration
const pi = 3.14; // Initialization
console.log("Pi:", pi); // Output: Pi: 3.14

//* ----- var ----- //
var city = "New York";
city = "Los Angeles"; // Reassigning is allowed
console.log("City:", city); // Output: City: Los Angeles

var country; // Declaration without initialization
country = "USA"; // Initialization
console.log("Country:", country); // Output: Country: USA