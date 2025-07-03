// first of all import the prisma client to use the prisma 
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//function to insert the user only 
async function insertOnlyUser(username : string , email : string , password : string){
    try{
        const res = await prisma.user.create({
            data :{
                email,
                username,
                password
            }
        });
        //so we have to send it in the data format here 
        console.log("user created succesfully" , res);
    }
    catch(err){
        console.error("cannot create the user" , err);
    }
}
// for updating the user here 
interface updateUserPara{
    username : string,
    password : string
}
async function updateUser(props : updateUserPara){
    try{
        const res = await prisma.user.update({
            // where should be defined as here we are doing the update info not the create operation 
            where:{
                username : props.username
            },
            data : {
                username : props.username,
                password : props.password
            }
        })
        console.log("updated succesfully" , res.username , res.password)
    }
    catch(err){
        console.error("could not update the user" , err);
    }
}

// function to get the user details 
async function getAllUser(){
    try{
        const res = await prisma.user.findMany({
            select : {
                username : true,
                email : true
            }
        });
        console.log(res);
    }
    catch(err){
        console.error("could not fetch the user" , err)
    }
}
async function main(){
    // await insertOnlyUser("ashok" , "as@gmail.com" , "ashokkr");
    // await updateUser({
    //     username : "ashok",
    //     password : "newpassword"
    // })
    await getAllUser()

}

main();
