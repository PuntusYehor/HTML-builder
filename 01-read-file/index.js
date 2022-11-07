const path = require('path');
const fs = require('fs');
const { stdout } = process;

let data = '';

const readableStream = fs.createReadStream(path.join(__dirname, 'text.txt'), "utf-8");

readableStream.on('data', (chunk) => data += chunk);
readableStream.on("end", () => stdout.write(data));
readableStream.on("error", (err) => stdout.write(err.message));


