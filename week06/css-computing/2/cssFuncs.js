const css = require("css");

let rules = [];

function addCssRules(text) {
    const ast = css.parse(text);
    console.log(JSON.stringify(ast, null, "    "));
    rules.push(...ast.stylesheet.rules);
}

function computeCSS(element) {
    console.log(rules);
    console.log("compute CSS for Element", element);
}

module.exports = {
    addCssRules,
    computeCSS,
};
