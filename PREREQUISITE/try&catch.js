//! ------ try / catch ------

const func =() => {
    try {
        console.log('Start of try runs');
        Textarea; // This a ReferenceError
        console.log('End of try (never reached)');
    } catch (err) {
        console.log('Catch is executed!');
        console.log(err.name); // ReferenceError
        console.log(err.message); 
    } finally {
        console.log('Finally always runs');
    }
}

func();

//Fake http Request with Promise
const fakeHttpRequest = (success, timeout = 1000) => {
    return new Promise((resolve, reject) =>{
        setTimeout(()=>{
            if(success){
                resolve({status: 200, data : {Name : "ranit", age: "21"}});
            } else {
                reject({message: "Error!!!"});
            }
        }, timeout);
    })
}

const requestsHttp = async() => {
    try{
        const response = await fakeHttpRequest(true, 2000);
        console.log("Response:", response);
    } catch (error){
        console.log("Caught an error:", error);
    }
}
requestsHttp();

// custom Error Example
class CustomError extends Error {
    constructor(message){
        super(message);
        this.name = "CustomError";
    }
}

const throwCustomError = () => {
    try{
        throw new CustomError("This is a custom error message");
    } catch (error){
        console.log(error.name); // CustomError
        console.log(error.message); 
    }
}
throwCustomError();