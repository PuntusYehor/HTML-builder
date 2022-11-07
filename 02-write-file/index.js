const { stdin, stdout } = process;
const path = require("path");
const fs = require("fs");

const output = fs.createWriteStream(path.join(__dirname, "text.txt"))

stdout.write("Hello, enter your message: ")

stdin.on("data", (data) => {
	if (data.indexOf("exit") !== -1) endMessage();
	output.write(data);
})

const endMessage = () => {
	stdout.write("Goodbye!");
	process.exit();
};

process.on("SIGINT", endMessage);