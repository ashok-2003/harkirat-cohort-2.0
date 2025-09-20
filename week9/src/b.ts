//creating a function which run after the 1 sec 
function runafter1(fn : () => number) { // so now function defined whith the type it return 
    setTimeout(fn ,  5000);
}
runafter1(function sayhel() : number{
    console.log("hellow world")
    return 1;
}); //this is know as call back we have passed function as aruguments 
