"use strict";
function dosomething(inp) {
    return inp[0];
}
// so nwo here let's call it with 
let valuuee = dosomething(["ashok", "kumar"]);
// console.log(valuuee.uppperCase());    // this is not workingn beacuse of number as it can not be conveted into that so 
// for that generci are introduced here 
function dosomethinggg(args) {
    return args[0];
}
const val3 = dosomethinggg(["ashok", "jay"]);
const val4 = dosomethinggg([3, 5]);
console.log(val3.toUpperCase); // so now it will works as it knwo it's type that it is string 
