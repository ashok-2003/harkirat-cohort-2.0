// so implementing the types and interfaces here 
type emp = {
    name : string,
    statDate : number
}
interface  man{
    name : string|number, // we can also define this or type in interface also 
    department : string
} 

// so now if we want to implement the proper of both then 
type Techlead = emp & man; // but we can not do like that in the interface 
// we can not do that thing using the interface any more or we have to create the class for it 
const t : Techlead = {
    name : "ashok",
    statDate : 5,
    department  : "hr"
}
class empandman implements emp , man {
    name : string;
    statDate: number;
    department: string;
    constructor(a : number , b : string , c: string){
        this.name = b,
        this.department = c,
        this.statDate = a
    }
}
const te = new empandman(3 , "as" , "hk");
console.log(t.name);
console.log(te.name);
type stringorNumber = string | number; // like it can be of the both type string or number either can be expected here 