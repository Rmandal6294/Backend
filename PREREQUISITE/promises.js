//! ------------- promises ----------------- //

// create a new promise
const myPromise = new Promise((resolve, reject) => {
    const isSuccessful = true; // Change to false to test rejection

    if (isSuccessful) {
        resolve("Promise resolved successfully!");
    } else {
        reject("Promise rejected!");
    }       
});
// consuming the promise
myPromise
    .then((message)=>{
        console.log(message); // if Promise resolved successfully!
    })
    .catch((error)=>{
        console.log(error); // if Promise rejected!
    })
    .finally(()=>{
        console.log("Promise has been handled."); // always executed
    });

// Using setTimeout to simulate asynchronous operation
const loginAlert = () =>{
  console.log('Login');
};

setTimeout(loginAlert, 6000);


// chaining promises
const fetchData = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Data fetched");
    }, 1000);
});

fetchData
    .then((data) => {
        console.log(data); // Data fetched
        return "Processing data";
    })
    .then((processMessage) => {
        console.log(processMessage); // Processing data
    })
    .catch((error) => {
        console.log("Error:", error);
    });


// Promise.all example (All promises must resolve successfully)
const promise1 = Promise.resolve("First Promise");
const promise2 = new Promise((resolve) => setTimeout(() => resolve("Second Promise"), 500));
const promise3 = Promise.resolve("Third Promise");
Promise.all([promise1, promise2, promise3])
    .then((messages) => {
        console.log("All promises resolved:", messages);
    })
    .catch((error) => {
        console.log("One of the promises rejected:", error);
    });

// Promise.race example (Settles as soon as the first promise settles )
const fastPromise = new Promise((resolve) => setTimeout(() => resolve("Fast Promise"), 300));
const slowPromise = new Promise((resolve) => setTimeout(() => resolve("Slow Promise"), 1000));
Promise.race([fastPromise, slowPromise])
    .then((message) => {
        console.log("First resolved promise:", message);
    })
    .catch((error) => {
        console.log("One of the promises rejected:", error);
    });

//Promise.any example (Settles as soon as the first promise resolves)
const anyPromise1 = Promise.resolve("Any Promise 1");
const anyPromise2 = Promise.reject("Any Promise 2");
const anyPromise3 = Promise.resolve("Any Promise 3");
Promise.any([anyPromise1, anyPromise2, anyPromise3])
    .then((message) => {
        console.log("First resolved promise:", message);
    })
    .catch((error) => {
        console.log("All promises rejected:", error);
    });

// promise.allSettled example (Waits for all promises to settle)
const settlePromise1 = Promise.resolve("Settle Promise 1");
const settlePromise2 = Promise.reject("Settle Promise 2");
const settlePromise3 = Promise.resolve("Settle Promise 3");
Promise.allSettled([settlePromise1, settlePromise2, settlePromise3])
    .then((results) => {
        console.log("All promises settled:", results);
    })
    .catch((error) => {
        console.log("Error:", error);
    });