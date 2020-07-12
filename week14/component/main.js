function create(Cls, attributes, ...children) {
    // console.log(arguments);
    let o;

    if (typeof Cls === "string") {
        o = new Wrapper(Cls);
    } else {
        o = new Cls();
    }

    for (let name in attributes) {
        o.setAttribute(name, attributes[name]);
    }

    // console.log(children);
    for (let child of children) {
        if (typeof child === "string")
            child = new Text(child);
        
        o.children.push(child);
    }

    return o;
}

class Text {
    constructor(text) {
        this.root = document.createTextNode(text);
    }

    mountTo(parent) {
        parent.appendChild(this.root);
    }
}

class Wrapper {
    constructor(type) {
        // console.log("config", config);
        this.children = [];
        this.root = document.createElement(type);
    }

    // set class(v) { // property
    //     // console.log("Parent::class", v);
    // }

    setAttribute(name, value) { // attribute
        // console.log(name, value);
        this.root.setAttribute(name, value);
    }

    appendChild(child) {
        this.children.push(child);
    }

    mountTo(parent) {
        parent.appendChild(this.root);

        for (let child of this.children) {
            child.mountTo(this.root);
        }
    }
}

class Div {
    constructor(config) {
        // console.log("config", config);
        this.children = [];
        this.root = document.createElement("div");
    }

    // set class(v) { // property
    //     // console.log("Parent::class", v);
    // }

    setAttribute(name, value) { // attribute
        // console.log(name, value);
        this.root.setAttribute(name, value);
    }

    appendChild(child) {
        this.children.push(child);
    }

    mountTo(parent) {
        parent.appendChild(this.root);

        for (let child of this.children) {
            child.mountTo(this.root);
        }
    }

}

class MyComponent {
    constructor(config){
        this.children = [];
    }

    setAttribute(name, value) { // attribute
        this.root.setAttribute(name, value);
    }

    appendChild(child){
        this.children.push(child);
    }

    render(){
        return (
            <article>
                <header>I'm a header</header>
                {this.slot}
                <footer>I'm a footer</footer>
            </article>
        );
    }

    mountTo(parent){
        this.slot = <div></div>;

        for (let child of this.children){
            this.slot.appendChild(child);
        }

        this.render().mountTo(parent);
    }

}

// let component = <div id="a" class="b" style="width: 100px; height: 100px; background-color: lightgreen;">
//         <div></div>
//         <p>abc</p>
//         <div></div>
//         <div></div>
//     </div>

let component = <MyComponent>
    <div>text text text</div>
</MyComponent>

console.log(component);

component.mountTo(document.body);
// component.setAttribute("id", "a");