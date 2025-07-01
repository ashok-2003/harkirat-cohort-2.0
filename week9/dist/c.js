"use strict";
// fucntion get use as input and calculte the value based on that 
function isLegalage(user) {
    if (user.age > 18) {
        return true;
    }
    else {
        return false;
    }
}
;
const userval = isLegalage({
    firstname: "ashok",
    lastname: "kumar",
    age: 34
});
;
