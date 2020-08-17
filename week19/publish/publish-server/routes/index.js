var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");

router.post("/", function (req, res, next) {
	fs.writeFileSync(
		path.resolve(__dirname, "../../server/public/" + req.query.filename),
		req.body.content
	);
	res.send("");
	res.end();
	// res.render("index", { title: "Express" });
});

module.exports = router;
