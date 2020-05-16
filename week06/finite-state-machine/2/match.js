// 在一个字符串中，找到字符"ab"
function match(string) {
    let foundA = false;
    for (let c of string) {
        if (c === "a")
            foundA = true;
        else if(foundA && c === "b")
            return true;
        else
            foundA = false;
    }
    return false;
}

console.log(match("I am groot"));
console.log(match("I abm groot"));
console.log(match("I acbm groot"));
