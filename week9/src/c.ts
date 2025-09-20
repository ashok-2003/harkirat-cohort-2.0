// fucntion get use as input and calculte the value based on that 
function isLegalage (user : User){ // so it know the data types of it via users 
    if(user.age > 18){
        return true;
    } else{
        return false;
    }
};
const userval = isLegalage({
    firstname : "ashok",
    lastname : "kumar",
    age : 34
});
interface User{
    firstname : string,
    lastname : string,
    age : number,
    email ?: string; // so this is how you can make it optional that user if want provide otherwise do not provide no issue 
};