// so now here we have to take first and last name from user and his gender then greet them 100 times
let firstname = prompt("please enter your first name")
let lastname = prompt("please enter your last name")
let gender = prompt("male or female")

let finaloutput = firstname + " " + lastname
if(gender.equal(male)){
    finaloutput = "hi gentalman " + finaloutput
}else{
    "hello bithch " + finaloutput
}
for(let i = 0; i < 100; i++){
    console.log(finaloutput)
}
