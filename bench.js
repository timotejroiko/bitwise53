"use strict";

const Benchmark = require("benchmark");
const suite = new Benchmark.Suite();
global.and = require("./index").and;

/* eslint-disable */
suite.add("Number", () => { input & 8 }, { "setup": function() { const input = Math.floor(Math.random() * (2 ** 31)); }})
.add("Bitwise53", () => { and(input, 8) }, { "setup": function() { const input = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER); }})
.add("BigInt", () => { input & 8n }, { "setup": function() { const input = BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)); }})
.on("cycle", (event) => { console.log(String(event.target)); })
.on("complete", () => { console.log("Done"); })
.run();
