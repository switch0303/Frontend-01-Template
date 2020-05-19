const css = require("css");

let rules = [];

function addCssRules(text) {
    const ast = css.parse(text);
    console.log(JSON.stringify(ast, null, "    "));
    rules.push(...ast.stylesheet.rules);
}

function match(element, selector) {
    if (!selector || !element.attributes)
        return false;

    if (selector.charAt(0) === "#") {
        const attr = element.attributes.filter(attr => attr.name === "id")[0];
        if (attr && attr.value === selector.replace("#", ""))
            return true;
    } else if (selector.charAt(0) === ".") {
        const attr = element.attributes.filter(attr => attr.name === "class")[0];
        if (attr && attr.value === selector.replace(".", ""))
            return true;
    } else {
        if (element.tagName === selector) {
            return true;
        }
    }

    return false;
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
            // console.log("Element", element, "matched rule", rule);
            const computedStyle = element.computedStyle;
            for (let declaration of rule.declarations) {
                if (!computedStyle[declaration.property])
                    computedStyle[declaration.property] = {};
                
                computedStyle[declaration.property].value = declaration.value;
            }
            console.log(element.computedStyle);
        }
    }
}

module.exports = {
    addCssRules,
    computeCSS,
};
