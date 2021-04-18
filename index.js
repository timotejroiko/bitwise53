"use strict";

const { floor } = Math;
const N = 2 ** 28;

function _mod(n1, n2) {
	return ((n1 % n2) + n2) % n2;
}

function and(n1, n2) {
	return ((floor(n1 / N) & floor(n2 / N)) * N) + (_mod(n1, N) & _mod(n2, N));
}

function or(n1, n2) {
	return ((floor(n1 / N) | floor(n2 / N)) * N) + (_mod(n1, N) | _mod(n2, N));
}

function xor(n1, n2) {
	return ((floor(n1 / N) ^ floor(n2 / N)) * N) + (_mod(n1, N) ^ _mod(n2, N));
}

function not(n) {
	return -n - 1;
}

function rshift(n1, b) {
	return floor(n1 / (2 ** b));
}

function lshift(n1, b) {
	return floor(n1 * (2 ** b));
}

function ushift(n1, b, size = 53) {
	if(n1 >= 0) { return rshift(n1, b); }
	const s = 2 ** size;
	return b === 0 ? n1 + s : Math.floor((n1 + s) / (2 ** b));
}

module.exports = {
	and,
	or,
	xor,
	not,
	rshift,
	lshift,
	ushift
};
