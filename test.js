"use strict";

const funcs = require("./index");

for(const f of Object.keys(funcs)) {
	console.log(`Testing ${f}`);
	for(let i = 0; i < 999999; i++) {
		let n1 = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
		let n2 = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
		let n3 = Math.floor(Math.random() * 53);
		if(Math.random() > 0.5) { n1 = -n1; }
		if(Math.random() > 0.5) { n2 = -n2; }
		if(Math.random() > 0.5) { n3 = -n3; }
		const b1 = BigInt(n1);
		const b2 = BigInt(n2);
		const b3 = BigInt(n3);
		switch(f) {
			case "and": {
				const t1 = b1 & b2;
				const t2 = funcs[f](n1, n2);
				if(Number(t1) !== t2) { throw new Error(`Test Failed: ${n1} ${n2} ${t1} ${t2}`); }
				break;
			}
			case "or": {
				const t1 = b1 | b2;
				const t2 = funcs[f](n1, n2);
				if(Number(t1) !== t2) { throw new Error(`Test Failed: ${n1} ${n2} ${t1} ${t2}`); }
				break;
			}
			case "xor": {
				const t1 = b1 ^ b2;
				const t2 = funcs[f](n1, n2);
				if(Number(t1) !== t2) { throw new Error(`Test Failed: ${n1} ${n2} ${t1} ${t2}`); }
				break;
			}
			case "not": {
				const t1 = ~b1;
				const t2 = funcs[f](n1);
				if(Number(t1) !== t2) { throw new Error(`Test Failed: ${n1} ${t1} ${t2}`); }
				break;
			}
			case "rshift": {
				const t1 = b1 >> b3;
				const t2 = funcs[f](n1, n3);
				if(Number(t1) !== t2) { throw new Error(`Test Failed: ${n1} ${n3} ${t1} ${t2}`); }
				break;
			}
			case "lshift": {
				const t1 = b1 << b3;
				const t2 = funcs[f](n1, n3);
				if(Number(t1) !== t2) { throw new Error(`Test Failed: ${n1} ${n3} ${t1} ${t2}`); }
				break;
			}
			case "ushift": {
				let n4 = Math.floor(Math.random() * (2 ** 31));
				let n5 = Math.floor(Math.random() * 31);
				if(Math.random() > 0.5) { n4 = -n4; }
				if(Math.random() > 0.5) { n5 = -n5; }
				/**
				 * will error if n5 is negative
				 * not because of a flaw but because it does the bigint approach of reversing the shift direction instead of overflowing
				 * we cant use bigint to run this test as it doesnt support unsigned right shift
				 * shifting by negative numbers is dumb anyway, so fek off
				 */
				if(n5 < 0) { n5 = 32 + (n5 % 32); } // manually produce overflow behavior
				const t1 = n4 >>> n5;
				const t2 = funcs[f](n4, n5, 32);
				if(Number(t1) !== t2) { throw new Error(`Test Failed: ${n4} ${n5} ${t1} ${t2}`); }
				break;
			}
		}
	}
}

console.log("All tests passed!");
