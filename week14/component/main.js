import {create} from "./create";

// class Div {
//     constructor(config) {
//         // console.log("config", config);
//         this.children = [];
//         this.root = document.createElement("div");
//     }

//     // set class(v) { // property
//     //     // console.log("Parent::class", v);
//     // }

//     setAttribute(name, value) { // attribute
//         // console.log(name, value);
//         this.root.setAttribute(name, value);
//     }

//     appendChild(child) {
//         this.children.push(child);
//     }

//     mountTo(parent) {
//         parent.appendChild(this.root);

//         for (let child of this.children) {
//             child.mountTo(this.root);
//         }
//     }

// }

// class MyComponent {
//     constructor(config){
//         this.children = [];
//     }

//     setAttribute(name, value) { // attribute
//         this.root.setAttribute(name, value);
//     }

//     appendChild(child){
//         this.children.push(child);
//     }

//     render(){
//         return (
//             <article>
//                 <header>I'm a header</header>
//                 {this.slot}
//                 <footer>I'm a footer</footer>
//             </article>
//         );
//     }

//     mountTo(parent){
//         this.slot = <div></div>;

//         for (let child of this.children){
//             this.slot.appendChild(child);
//         }

//         this.render().mountTo(parent);
//     }

// }

class Carousel {
    constructor(config){
        this.children = [];
    }

    setAttribute(name, value) { // attribute
        this[name] = value;
    }

    appendChild(child){
        this.children.push(child);
    }

    render(){

        let children = this.data.map(url => {
            let element = <img src={url} />;
            element.addEventListener("dragstart", event => event.preventDefault());
            return element;
        });

        let root = (
            <div class="carousel">
                {children}
            </div>
        );

        let position = 0;

        let nextPic = () => {
            let nextPosition = (position + 1) % this.data.length;

            let current = children[position];
            let next = children[nextPosition];

            // 移动到起始位置时关闭动画
            current.style.transition = "ease 0s";
            next.style.transition = "ease 0s";
            // 动画的起始位置
            current.style.transform = `translateX(${-100 * position}%)`;
            next.style.transform = `translateX(${100 - 100 * nextPosition}%)`;

            // 使用setTimeout，使得动画的transition能生效
            setTimeout(function() {
                // 移动到终止位置时开启动画
                current.style.transition = ""; // 置为“”来使用css中的transition
                next.style.transition = "";
                // 动画的终止位置
                current.style.transform = `translateX(${-100 - 100 * position}%)`;
                next.style.transform = `translateX(${-100 * nextPosition}%)`;
                
                position = nextPosition;
                // console.log(position);
            }, 16);

            setTimeout(nextPic, 2000);
        }

        // setTimeout(nextPic, 2000);

        root.addEventListener("mousedown", event => {
            let startX = event.clientX;

            let nextPosition = (position + 1) % this.data.length;
            let lastPosition = (position - 1 + this.data.length) % this.data.length;

            let current = children[position];
            let next = children[nextPosition];
            let last = children[lastPosition];

            current.style.transition = "ease 0s";
            next.style.transition = "ease 0s";
            last.style.transition = "ease 0s";

            current.style.transform = `translateX(${-500 * position}px)`;
            next.style.transform = `translateX(${500 - 500 * nextPosition}px)`;
            last.style.transform = `translateX(${-500 - 500 * lastPosition}px)`;
            
            let move = event => {
                current.style.transform = `translateX(${event.clientX - startX - 500 * position}px)`;
                next.style.transform = `translateX(${event.clientX - startX + 500 - 500 * nextPosition}px)`;
                last.style.transform = `translateX(${event.clientX - startX - 500 - 500 * lastPosition}px)`;

                // console.log(event.clientX - startX, event.clientY - startY);
            };

            let up = event => {
                let offset = 0;

                if (event.clientX - startX > 250) {
                    offset = 1;
                } else if (event.clientX - startX < -250) {
                    offset = -1;
                }

                // console.log("offset", offset);

                current.style.transition = ""; // 置为“”来使用css中的transition
                next.style.transition = "";
                last.style.transition = "";

                
                current.style.transform = `translateX(${offset * 500 - 500 * position}px)`;
                next.style.transform = `translateX(${offset * 500 + 500 - 500 * nextPosition}px)`;
                last.style.transform = `translateX(${offset * 500 - 500 - 500 * lastPosition}px)`;
                
                position = (position - offset + this.data.length) % this.data.length;

                document.removeEventListener("mousemove", move);
                document.removeEventListener("mouseup", up);
            };

            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", up);
        });

        return root;
    }

    mountTo(parent){
        this.render().mountTo(parent);
    }

}

// let component = <div id="a" class="b" style="width: 100px; height: 100px; background-color: lightgreen;">
//         <div></div>
//         <p>abc</p>
//         <div></div>
//         <div></div>
//     </div>

let component = <Carousel data={[
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
]} />

// console.log(component);

component.mountTo(document.body);
// component.setAttribute("id", "a");