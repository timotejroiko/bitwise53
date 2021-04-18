# Bitwise53

Bitwise operations for integers up to 53 bits

## Description

Bitwise operations in javascript are limited to 32 bit integers. Any excess bits are simply cut off which makes bitwise operations impossible for any number bigger than 32 bits despite javascript supporting integers with precision up to 53 bits.

The typical solution to this problem is to use BigInt, which supports bitwise operations of any bit length. However, BigInts are notoriously slow, up to 50x slower than regular numbers.

This library provides functions to correctly perform bitwise opeations on numbers up to 53 bits without using BigInt, which keeps performance on pair with their 32 bit counterparts.

## Usage

`npm install bitwise53`

```js
const { and, or, xor, not, rshift, lshift } = require("bitwise53")
// or import { and, or, xor, not, rshift, lshift } from "bitwise53"

and(a, b) // a & b
or(a, b) // a | b
xor(a, b) // a ^ b
not(a) // ~a
rshift(a, 5) // a >> 5
lshift(a, 5) // a << 5
ushift(a, 5) // a >>> 5
```

## Performance

`npm install -D bitwise53`  
`npm run bench`  

```cs
Number x 738,481,279 ops/sec ±0.48% (90 runs sampled)
Bitwise53 x 730,536,122 ops/sec ±0.32% (96 runs sampled)
BigInt x 19,083,679 ops/sec ±1.58% (89 runs sampled)
```

## Notes

There are some minor differences in behaviour compared to regular bitwise operators when dealing with some negative numbers:

When shifting a negative number of bits, the right-hand operand overflows and loops around, for example `n >> -5` would result in `n >> 27` (32-5). BigInts on the other hand reverse the operation because they dont have a fixed size to overflow, so `n >> -5` would result in `n << 5`. This library follows the BigInt approach and reverses the operation:

```js
555 >> -2 // 0
555n >> -2n // 2220n
rshift(555, -2) // 2220
```

The unsigned right shift function `ushift` assumes a 53 bit size by default, therefore it will produce different results from the `>>>` operator when shifting negative numbers. This function accepts a third parameter to specify the desired bit size to correctly place the sign bit. Setting it to 32 for example will produce the same results as the `>>>` operator:

```js
ushift(-89375, 0)        // 11111111111111111111111111111111111101010001011100001
ushift(-89375, 0, 24)    // 111111101010001011100001
ushift(-89375, 0, 32)    // 11111111111111101010001011100001
-89375 >>> 0             // 11111111111111101010001011100001
```
