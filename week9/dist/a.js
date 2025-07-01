"use strict";
function intro(n) {
    console.log("hello" + n);
}
intro("ashok");
// we can also definded any type by
let x = 2;
x = "ashok";
console.log(x);
// function to get the sum of two number 
function sum(a, b, c) {
    // it can automaticallly figure it out return type 
    return a + b;
}
let val = sum(3, 6, "as"); // dose not need to define here as it is already taken the val ka type from the above 
console.log(val);
function isLegal(age) {
    if (age > 18) {
        return true;
    }
    else {
        return false;
    }
}
let ans = isLegal(19);
