// so now here we will learn the generic here 
type stringornumber = string | number;
function dosomething (inp : stringornumber[]){
    return inp[0];
}
// so nwo here let's call it with 
let valuuee = dosomething(["ashok" , "kumar"]);
// console.log(valuuee.uppperCase());    // this is not workingn beacuse of number as it can not be conveted into that so 


// for that generci are introduced here 
function dosomethinggg  <T> (args : T[]){
    return args[0];
}
const val3 = dosomethinggg<string>(["ashok","jay"]); // can get automatically get it self  if we pass 1 then it will gave error in the uppercase line here 
const val4 = dosomethinggg<number>([3 ,5]);
console.log(val3.toUpperCase); // so now it will works as it knwo it's type that it is string 
