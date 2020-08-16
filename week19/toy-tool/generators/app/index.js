var Generator = require("yeoman-generator");

module.exports = class extends Generator {
	// The name `constructor` is important here
	constructor(args, opts) {
		// Calling the super constructor is important so our generator is correctly set up
		super(args, opts);
	}

	collecting() {
		this.log("collecting");
	}

	creating() {
		this.fs.copyTpl(
			this.templatePath("package.json"),
			this.destinationPath("package.json"),
			{ title: "project" }
		);

		this.fs.copyTpl(
			this.templatePath("create.js"),
			this.destinationPath("lib/create.js")
		);
		this.fs.copyTpl(
			this.templatePath("gesture.js"),
			this.destinationPath("lib/gesture.js")
		);
		this.fs.copyTpl(
			this.templatePath("animation.js"),
			this.destinationPath("lib/animation.js")
		);

		this.fs.copyTpl(
			this.templatePath("main.js"),
			this.destinationPath("src/main.js")
		);

		this.fs.copyTpl(
			this.templatePath("index.html"),
			this.destinationPath("src/index.html"),
			{ title: "Templating with Yeoman" }
		);

		this.fs.copyTpl(
			this.templatePath("main.test.js"),
			this.destinationPath("test/main.test.js"),
			{ title: "Templating with Yeoman" }
		);

		this.fs.copyTpl(
			this.templatePath("webpack.config.js"),
			this.destinationPath("webpack.config.js")
		);

		this.fs.copyTpl(
			this.templatePath(".babelrc"),
			this.destinationPath(".babelrc")
		);

		this.fs.copyTpl(
			this.templatePath(".nycrc"),
			this.destinationPath(".nycrc")
		);

		this.npmInstall(
			[
				"@babel/core",
				"@babel/plugin-transform-react-jsx",
				"@babel/preset-env",
				"@babel/register",
				"@istanbuljs/nyc-config-babel",
				"babel-loader",
				"babel-plugin-istanbul",
				"webpack",
				"webpack-cli",
				"webpack-dev-server",
				"html-webpack-plugin",
				"mocha",
				"nyc",
			],
			{
				"save-dev": true,
			}
		);
	}
};
