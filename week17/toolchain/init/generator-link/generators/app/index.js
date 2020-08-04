var Generator = require("yeoman-generator");

module.exports = class extends Generator {
	// The name `constructor` is important here
	constructor(args, opts) {
		// Calling the super constructor is important so our generator is correctly set up
		super(args, opts);

		// Next, add your custom code
		this.option("babel"); // This method adds support for a `--babel` flag
	}

	writing() {
		const pkgJson = {
			devDependencies: {
				eslint: "^3.15.0",
			},
			dependencies: {
				react: "^16.2.0",
			},
		};

		// Extend or create package.json file in destination path
		this.fs.extendJSON(this.destinationPath("package.json"), pkgJson);
	}

	install() {
		this.npmInstall();
	}
};
