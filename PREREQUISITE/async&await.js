//! --------- async & await --------- //
// Async function example
async function fetchData() {
    return "Data fetched SUCCESS";
}
// Using await to wait for the promise to resolve
async function displayData() {
    const data = await fetchData();
    console.log(data); 
}
displayData();

// asynchronous operation with a promise
function helloWorld() {
    return new Promise(resolve =>{
        setTimeout(()=>{
            resolve("Hello World");
        },2000);
    });
}
// Using async/await to handle the promise
const showMessage = async () =>{
    const message = await helloWorld();
    console.log("Message:", message);
}
showMessage();
