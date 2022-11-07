const fsAsync = require("fs/promises");
const fs = require("fs");
const path = require("path");

async function mergeStylesInArray() {
	const stylesPath = path.join(__dirname, "styles");
	const styles = await fsAsync.readdir(stylesPath, {
		withFileTypes: true
	});

	const bundle = [];

	for (let file of styles) {
		if (file.isFile() && file.name.includes(".css")) {
			const style = await fsAsync.readFile(path.join(stylesPath, file.name));
			bundle.push(style)
		}
	}

	return bundle;
}

async function build() {
	const distPath = path.join(__dirname, "project-dist");
	const output = fs.createWriteStream(path.join(distPath, "bundle.css"));
	const bundle = (await mergeStylesInArray()).join(" ");

	output.write(bundle);
}

build();