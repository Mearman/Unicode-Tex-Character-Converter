import { codePointTex } from "../src/characters/unicode_to_tex";
import assert from "node:assert";
import { describe, test } from "node:test";
import { convertUnicodeEscapeSequenceToUnicode } from "../src/convertUnicodeEscapeSequenceToUnicode";
import { convertUnicodeToUnicodeToCodePoint } from "../src/convertUnicodeToUnicodeEscapeSequence";
import { isUnicodeSequence } from "../src/isUnicodeSequence";

test("main", () => {
	assert.strictEqual(1, 1);
});

test("isCodePoint", () => {
	assert.ok(isUnicodeSequence("U+0041"));
	assert.ok(isUnicodeSequence("U+1F600"));
	assert.ok(isUnicodeSequence("U+10FFFF"));
});

describe("Encode unicode as codepoint", () => {
	const cases = ["β", "γ", "α"];
	for (const input of cases) {
		test(`should convert ${input} to codepoint`, () => {
			const codePoint = convertUnicodeToUnicodeToCodePoint(input);
			console.debug(input, "->", codePoint);
			assert.notEqual(codePoint, input);
		});
	}
});

describe("Convert Hex Codepoint to Unicode", () => {
	const cases = ["U+03B1", "U+03B2", "U+03B3"];
	for (const input of cases) {
		test(`should convert ${input} to Unicode`, () => {
			const unicode = convertUnicodeEscapeSequenceToUnicode(input);
			console.debug(input, "->", unicode);
			assert.notEqual(input, unicode);
		});
	}
});

describe("Decode encode unicode round trip", async (t) => {
	for await (const key of Object.keys(codePointTex)) {
		test(`decode ${key} then encode`, async (t) => {
			const parsed = convertUnicodeEscapeSequenceToUnicode(key);
			const message = `${key} -> ${parsed}`;
			console.debug(message);
			assert.notEqual(key, parsed);
			const codepoint = convertUnicodeToUnicodeToCodePoint(parsed);
			console.debug(parsed, "->", codepoint);
			assert.notEqual(parsed, codepoint);
			assert.strictEqual(key, codepoint);
		});
	}
});

// describe("unicodeToTex", () => {
// 	// count up sequentially in hex
// 	// for (let i = 0; i < 0x10ffff; i++) {
// 	for (let i = 0x0020; i < 0xFFFD; i++) {
// 		const hex = i.toString(16);
// 		const codePoint = `U+${hex}`;
// 		// console.debug(`codePoint: ${codePoint}`);
// 		console.debug(hex, "->", codePoint, "=", String.fromCodePoint(i));
// 		const tex = convertCodepointToTex(codePoint);
// 		console.debug(`tex: ${tex}`);
// 		// test(`should convert ${hex} to ${tex}`, () => {
// 		// 	assert.notEqual(codePoint, tex);
// 		// });
// 	}
// })
// describe("texToUnicode", () => {
// 	test("should convert valid TeX characters to Unicode", () => {
// 		assert.strictEqual(texToUnicode("\\alpha"), "U+03B1");
// 		assert.strictEqual(texToUnicode("\\beta"), "β");
// 		assert.strictEqual(texToUnicode("\\gamma"), "γ");
// 	});

// 	test("should return the input if no conversion is found", () => {
// 		assert.strictEqual(texToUnicode(""), "");
// 		assert.strictEqual(texToUnicode("abc"), "abc");
// 		assert.strictEqual(texToUnicode("\\alpha\\beta\\gamma"), "αβγ");
// 	});
// });

// describe("Unicode to Tex", () => {
// 	test("should convert valid Unicode characters to TeX", () => {
// 		assert.strictEqual(texToUnicode("α"), "\\alpha");
// 		assert.strictEqual(texToUnicode("β"), "\\beta");
// 		assert.strictEqual(texToUnicode("γ"), "\\gamma");
// 	});

// 	test("should return the input if no conversion is found", () => {
// 		assert.strictEqual(texToUnicode(""), "");
// 		assert.strictEqual(texToUnicode("abc"), "abc");
// 		assert.strictEqual(texToUnicode("αβγ"), "αβγ");
// 	});
// });
