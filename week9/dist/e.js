"use strict";
// with using the inteface it will give us the error here 
function maxval(arr) {
    let temp = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > temp) {
            temp = i;
        }
    }
    return temp;
}
const ans1 = maxval([2, 5, 8]);
console.log(ans1);
// enum in js 
var direction;
(function (direction) {
    direction[direction["up"] = 1] = "up";
    direction[direction["down"] = 2] = "down";
    direction[direction["left"] = 3] = "left";
    direction[direction["right"] = 4] = "right";
})(direction || (direction = {}));
function dosome(keypress) {
    if (keypress == direction.up) {
        console.log("up direction ");
        // like that we can define here 
    }
}
dosome(direction.down);
