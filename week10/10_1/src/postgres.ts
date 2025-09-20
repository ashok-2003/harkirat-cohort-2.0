// using neon db postgres database here 

import { Client } from "pg";

// Connection string
const connectionString = 'postgresql://neondb_owner:npg_D9xg3uhaWwlO@ep-delicate-poetry-a5gtpj56-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require';

const client = new Client({
    connectionString: connectionString
});

async function connectToNeon() {
    try {
        await client.connect();
        console.log("Connected to the database");
    } catch (err) {
        console.error("Connection error", err);
    }
}

// Creating a table in the database 
async function createUserTable() {
    try {
        const result = await client.query(`
            CREATE TABLE IF NOT EXISTS "User" (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(50) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("Table created successfully:");
    } catch (err) {
        console.error("Could not create the table:", err);
    }
}
async function createAddresTableWithUser(){
    try{
        const result = await client.query(`
            CREATE TABLE IF NOT EXISTS "Address" (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL,
                city VARCHAR(50) NOT NULL,
                state VARCHAR(50) NOT NULL,
                pincode VARCHAR(10) NOT NULL,
                FOREIGN KEY (user_id) REFERENCES "User"(id) ON DELETE CASCADE
            );
        `);
        console.log("addres table is create" , result);
    }
    catch(err){
        console.error("clould not create the address table" , err);
    }
}

// so now here function to insert the values in the table 
interface userData {
    username : string,
    email : string,
    password : string
}

async function addUser(props : userData){
    try{
        const result = await client.query(`
            INSERT INTO "User" (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [props.username, props.email, props.password]);

        console.log("user added succesfully" , result.rows[0]);
    }
    catch(err){
        console.error("something went wrong")
    }
}
interface userAddres{
    city: string,
    state:string,
    pincode: string,
    user_id :number
}
async function addAddressuser(props : userAddres){
    try{
        const result = await client.query(`
            INSERT INTO "Address" (user_id, city, state, pincode)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `,[props.user_id , props.city , props.state , props.pincode]);

        console.log("addres added succesfully" , result);
    }
    catch(err){
        console.error("clould not add the address" , err);
    }
}
// so command to view the all user here 
async function viewAllUser(){
    try{
        const result = await client.query(`SELECT * FROM "User";`);
        console.log("All Users :" , result.rows);
    }
    catch(err){
        console.error("could not retrive the data" , err);
    }
    // as see here the id is given like 1 then 5 this means i have done 
    // 2 3 4 as the failed or rolledback insert due to isssue or wrong inputs 
    // or voilates check but the counter have increase here 
}
// view the user with the it's address also joins 
async function viewUserWithAddress(yourid : number){
    try{
        const result = await client.query(`
            SELECT u.id , u.username , u.email , a.city , a.pincode , a.state
            FROM "User" u
            JOIN "Address" a ON u.id = a.user_id
            WHERE u.id = $1
        ` ,[yourid])
        console.log("user : " , result.rows)
        // so we are geeting the value through marked user as u and address as a so it will giving the values
        // if we remove the where we will get all of the values then 
    }
    catch(err){
        console.error("could not fetch " , err);
    }
}

// Main function to run all operations
async function main() {
    await connectToNeon();
    await createUserTable();
    await addUser({
        username : "ashok",
        email : "as@gmail.com",
        password : "ashokkr"
    });
    await createAddresTableWithUser();
    await addAddressuser({
        user_id : 5,
        pincode : "821104",
        city: "chenari",
        state: "bihar"
    })
    await viewAllUser();
    await viewUserWithAddress(5);
    await client.end();
}

main();