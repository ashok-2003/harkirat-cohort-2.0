// define the number arra 
type numberArray = number[];
interface numArary {
    array : number[]
}
// with using the inteface it will give us the error here 
function maxval(arr : numberArray){
    let temp =  0;
    for(let i = 0; i < arr.length; i++){
        if(arr[i] > temp){
            temp = i;
        }
    }
    return temp;
}
const ans1 = maxval([2 , 5 , 8]);
console.log(ans1); 

// enum in js 
enum direction {
    up = 1, // value stored is 0  after chaiging to 1 it will sotred as 1 and so on for the next values 
    down, // stored as 1
    left, // stoed as 2  like that in the array here 
    right
}
function dosome(keypress : direction){
    if(keypress == direction.up){
        console.log("up direction ")
        // like that we can define here 
    }  
}
dosome(direction.down);