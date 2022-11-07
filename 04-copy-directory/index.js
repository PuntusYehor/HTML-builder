const path = require("path");
const fsAsync = require("fs/promises");
const { stdout } = require("process");

const filesCopyPath = path.join(__dirname, "files-copy");

async function createCopy() {
	await fsAsync.mkdir(
		filesCopyPath, {
		recursive: true,
	})
}

async function copyFiles() {
	try {
		const filesPath = path.join(__dirname, "files");
		const files = await fsAsync.readdir(filesPath);

		await clearCopies();

		for (let file of files) {
			await fsAsync.copyFile(path.join(filesPath, file), path.join(filesCopyPath, file));
		}

	} catch (err) {
		stdout.write(err.message);
	}
}

async function clearCopies() {
	const copyFiles = await fsAsync.readdir(filesCopyPath);
	if (copyFiles.length) {
		for (let file of copyFiles) {
			await fsAsync.rm(path.join(filesCopyPath, file));
		}
	}
}

createCopy();
copyFiles();