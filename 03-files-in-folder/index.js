const { stdout } = require("process");
const path = require("path");
const fsAsync = require("fs/promises");

const secretFolderPath = path.join(__dirname, "secret-folder");

async function printFilesInfo() {
	try {
		const files = await fsAsync.readdir(secretFolderPath, {
			withFileTypes: true
		});

		for (let file of files) {
			const filePath = path.join(__dirname, "secret-folder", file.name);
			const fileStats = await fsAsync.stat(filePath);
			if (file.isFile())
				stdout.write(`${file.name.split(".")[0]} - ${path.extname(filePath)} - ${fileStats.size / 1000}kb\n`)
		}

	} catch (error) {
		stdout.write(error.message);
	}
}

printFilesInfo();




