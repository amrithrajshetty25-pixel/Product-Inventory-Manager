"use strict";
// Debugging examples used for the assignment.
// Error 1 (intentional version):
// let productPrice: number = "5000";
// Error: Type 'string' is not assignable to type 'number'.
//
// Corrected version:
let productPrice = 5000;
// Error 2 (intentional version):
// function calculateTotal(price: number, quantity: number): number {
//     return price * quantity;
// }
// let total = calculateTotal(1000);
// Error: Expected 2 arguments, but got 1.
//
// Corrected version:
function calculateTotal(price, quantity) {
    return price * quantity;
}
let total = calculateTotal(1000, 2);
console.log("Product Price:", productPrice);
console.log("Total:", total);
