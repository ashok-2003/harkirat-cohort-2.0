// so now here we will run the diffrence between axios and fetch  
// fetch is the inbuilt in node where axios is library which we have to import and axios is more
// smart than fetch 

const axios = require('axios');
async function main(){
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const todos = await response.json(); // awaiting it again for the data with the type in 
    // which data will come like .json here 
    console.log(todos);

}
// main();
// axios sentence is more simplier than the fetch 
async function main_axios() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
    console.log(response.data)
}
main_axios();

//  for posting in fetch 
async function main_post(){
    const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method : "POST"
    });


    // other logic like that not this logic only 
    const todos = await response.json(); // awaiting it again for the data with the type in 
    // which data will come like .json here 
    console.log(todos);
}

async function main_post_axios() {
    const response = await axios.post('https://jsonplaceholder.typicode.com/todos',{
        username : 'ashok',
        password: "ahsok444"
    },{
        headers : {
            Authorization : "Bearer 123",
        }
    });
}
// so if we want to sent the body and header then we can send this in the axios also the 
// second argument will be the body and third argument will contain the header 