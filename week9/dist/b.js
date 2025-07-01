"use strict";
//creating a function which run after the 1 sec 
function runafter1(fn) {
    setTimeout(fn, 5000);
}
runafter1(function sayhel() {
    console.log("hellow world");
    return 1;
}); //this is know as call back we have passed function as aruguments 
