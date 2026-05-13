import readline from 'readline'
import { stdin as input, stdout as output } from 'process';

const rl = readline.createInterface({ input, output });

rl.write("Welcome to Node CLI!\n");

rl.question("Enter your Name? \n:->", (answer)=>{
    console.log(`Hello ${answer}`)
    rl.close();
})

rl.question("Enter your Name? \n:->", (answer)=>{
    console.log(`Hello ${answer}`)
    rl.close();
})

rl.on('SIGINT', () => {
    rl.question("Are you sure you want to exit? (y/n) ", (answer) => {
        if(answer.match(/^y(es)?$/i)) 
        rl.pause();
    });
});

rl.on('close', () => {
    console.log("Thank you. Goodbye!");
    process.exit(0);
});

