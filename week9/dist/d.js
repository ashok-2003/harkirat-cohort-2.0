"use strict";
// we can not do that thing using the interface any more or we have to create the class for it 
const t = {
    name: "ashok",
    statDate: 5,
    department: "hr"
};
class empandman {
    constructor(a, b, c) {
        this.name = b,
            this.department = c,
            this.statDate = a;
    }
}
const te = new empandman(3, "as", "hk");
console.log(t.name);
console.log(te.name);
