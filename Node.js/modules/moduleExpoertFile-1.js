// Exporting a function using module.exports

const add = (a, b) => {
    return a + b;
}

// module.exports = add;


// multiple export using module.exports
const subtract = (a, b) => {
    return a - b;
}
const multiply = (a, b) => {
    return a * b;
}
//------- normal ---
// module.exports = {
//     subtract,
//     multiply,
//     add
// };

//es6 ---
export{
    add,
    subtract,
    multiply
};
