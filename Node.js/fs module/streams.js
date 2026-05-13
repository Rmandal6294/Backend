// -------------- streams --------------
import fs from "fs";

// Create a readable stream
const readableStream = fs.createReadStream("example.txt", "utf-8");
// Listen for data events
readableStream.on("data", (chunk) => {
    console.log("Received chunk:", chunk);
});
// Listen for end event
readableStream.on("end", () => {
    console.log("Finished reading file.");
});

readableStream.on('error', err => {
  console.error("Error------>",err);
});

// Create a writable stream
const writableStream = fs.createWriteStream("output.txt", "utf-8");
// Write some data to the stream
writableStream.write("This is some content written to the file.\n");
writableStream.write("This is another line of content.\n");
// End the stream
writableStream.end(() => {
    console.log("Finished writing to file.");
}
);

// transform stream example
import { Transform } from "stream";
const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toUpperCase());
  }
});

const readableStream2 = fs.createReadStream("example.txt", {
  encoding: "utf-8"
});



// Listen to transformed output
upperCaseTransform.on("data", (chunk) => {
  console.log("Transformed chunk:", chunk);
});

// Pipe data INTO the transform
readableStream2.pipe(upperCaseTransform);

// Errors
readableStream.on("error", console.error);
upperCaseTransform.on("error", console.error);

 