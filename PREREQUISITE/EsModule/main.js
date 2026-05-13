import {pi, add, subtract} from './math.js';
import logger from './log.js';

console.log(`Value of Pi: ${pi}`);
console.log(`Addition: 5 + 3 = ${add(5, 3)}`);
console.log(`Subtraction: 5 - 3 = ${subtract(5, 3)}`);

logger("Math operations performed.");