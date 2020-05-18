const css = require("css");
const { match } = require("assert");

let rules = [];

function addCssRules(text) {
    const ast = css.parse(text);
    console.log(JSON.stringify(ast, null, "    "));
    rules.push(...ast.stylesheet.rules);
}

function match(element, selector) {
    
}

function computeCSS(element, stack) {
    // console.log(rules);
    // console.log("compute CSS for Element", element);
    const elements = stack.slice().reverse();

    if(!element.computedStyle)
        element.computedStyle = {};

    for (let rule of rules) {
        const selectorParts = rule.selectors[0].split(" ").reverse();

        if (!match(element, selectorParts[0]))
            continue;

        let matched = false;

        let j = 1;
        for (let i = 0; i < elements.length; i++) {
            if (match(elements[i], selectorParts[j])) {
                j++;
            }
        }
        if (j >= selectorParts.length)
            matched = true;

        if (matched) {
            console.log("Element", element, "matched rule", rule);
        }
    }
}

module.exports = {
    addCssRules,
    computeCSS,
};
