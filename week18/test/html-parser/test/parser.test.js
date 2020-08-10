import { parseHTML } from "../src/parser";
import assert from "assert";

describe("parseHTML", function () {
	it("parse a single element", function () {
		const document = parseHTML("<div></div>");
		const div = document.children[0];
		assert.strictEqual(div.tagName, "div");
		assert.strictEqual(div.type, "element");
		assert.strictEqual(div.children.length, 0);
		assert.strictEqual(div.attributes.length, 2);
	});

	it("parse a single element with text content", function () {
		const document = parseHTML("<div>hello</div>");
		const text = document.children[0].children[0];
		assert.strictEqual(text.type, "text");
		assert.strictEqual(text.content, "hello");
	});

	it("tag mismatch", function () {
		try {
			const document = parseHTML("<div></vid>");
		} catch (e) {
			assert.strictEqual(e.message, "Tag start end doesn't match!");
		}
	});

	it("text with <", function () {
		const document = parseHTML("<div>a < b</div>");
		const text = document.children[0].children[0];
		assert.strictEqual(text.type, "text");
		assert.strictEqual(text.content, "a < b");
	});

	it("with property", function () {
		const document = parseHTML("<div id=a class='cls' data=\"abc\" ></div>");
		const div = document.children[0];

		let count = 0;
		for (let attr of div.attributes) {
			if (attr.name === "id") {
				count++;
				assert.strictEqual(attr.value, "a");
			}
			if (attr.name === "class") {
				count++;
				assert.strictEqual(attr.value, "cls");
			}
			if (attr.name === "data") {
				count++;
				assert.strictEqual(attr.value, "abc");
			}
		}
		assert.ok(count === 3);
	});

	it("with property 2", function () {
		const document = parseHTML("<div id=a class='cls' data=\"abc\"></div>");
		const div = document.children[0];

		let count = 0;
		for (let attr of div.attributes) {
			if (attr.name === "id") {
				count++;
				assert.strictEqual(attr.value, "a");
			}
			if (attr.name === "class") {
				count++;
				assert.strictEqual(attr.value, "cls");
			}
			if (attr.name === "data") {
				count++;
				assert.strictEqual(attr.value, "abc");
			}
		}
		assert.ok(count === 3);
	});

	it("with property 3", function () {
		const document = parseHTML("<div id=a class='cls' data=\"abc\"/>");
		const div = document.children[0];

		let count = 0;
		for (let attr of div.attributes) {
			if (attr.name === "id") {
				count++;
				assert.strictEqual(attr.value, "a");
			}
			if (attr.name === "class") {
				count++;
				assert.strictEqual(attr.value, "cls");
			}
			if (attr.name === "data") {
				count++;
				assert.strictEqual(attr.value, "abc");
			}
		}
		assert.ok(count === 3);
	});

	it("attribute with no value", function () {
		const document = parseHTML("<div class ></div>");
		const div = document.children[0];
		for (let attr of div.attributes) {
			if (attr.name === "class") {
				assert.strictEqual(attr.value, "");
			}
		}
	});

	it("attribute with no value 2", function () {
		const document = parseHTML("<div class id/>");
		const div = document.children[0];
		for (let attr of div.attributes) {
			if (attr.name === "class") {
				assert.strictEqual(attr.value, "");
			}
			if (attr.name === "id") {
				assert.strictEqual(attr.value, "");
			}
		}
	});

	it("script", function () {
		const content = `
        <div>abcd</div>
        <span>x</span>
        /script>
        <script
        <
        </
        </s
        </sc
        </scr
        </scri
        </scrip
        </script  
        `;
		const document = parseHTML(`<script>${content}</script>`);
		const text = document.children[0].children[0];
		assert.strictEqual(text.type, "text");
		assert.strictEqual(text.content, content);
	});
});
