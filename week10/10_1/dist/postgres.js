"use strict";
// using neon db postgres database here 
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
// Connection string
const connectionString = 'postgresql://neondb_owner:npg_D9xg3uhaWwlO@ep-delicate-poetry-a5gtpj56-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require';
const client = new pg_1.Client({
    connectionString: connectionString
});
function connectToNeon() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log("Connected to the database");
        }
        catch (err) {
            console.error("Connection error", err);
        }
    });
}
// Creating a table in the database 
function createUserTable() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield client.query(`
            CREATE TABLE IF NOT EXISTS "User" (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(50) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);
            console.log("Table created successfully:");
        }
        catch (err) {
            console.error("Could not create the table:", err);
        }
    });
}
function createAddresTableWithUser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield client.query(`
            CREATE TABLE IF NOT EXISTS "Address" (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL,
                city VARCHAR(50) NOT NULL,
                state VARCHAR(50) NOT NULL,
                pincode VARCHAR(10) NOT NULL,
                FOREIGN KEY (user_id) REFERENCES "User"(id) ON DELETE CASCADE
            );
        `);
            console.log("addres table is create", result);
        }
        catch (err) {
            console.error("clould not create the address table", err);
        }
    });
}
function addUser(props) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield client.query(`
            INSERT INTO "User" (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [props.username, props.email, props.password]);
            console.log("user added succesfully", result.rows[0]);
        }
        catch (err) {
            console.error("something went wrong");
        }
    });
}
function addAddressuser(props) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield client.query(`
            INSERT INTO "Address" (user_id, city, state, pincode)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `, [props.user_id, props.city, props.state, props.pincode]);
            console.log("addres added succesfully", result);
        }
        catch (err) {
            console.error("clould not add the address", err);
        }
    });
}
// so command to view the all user here 
function viewAllUser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield client.query(`SELECT * FROM "User";`);
            console.log("All Users :", result.rows);
        }
        catch (err) {
            console.error("could not retrive the data", err);
        }
        // as see here the id is given like 1 then 5 this means i have done 
        // 2 3 4 as the failed or rolledback insert due to isssue or wrong inputs 
        // or voilates check but the counter have increase here 
    });
}
// view the user with the it's address also joins 
function viewUserWithAddress(yourid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield client.query(`
            SELECT u.id , u.username , u.email , a.city , a.pincode , a.state
            FROM "User" u
            JOIN "Address" a ON u.id = a.user_id
            WHERE u.id = $1
        `, [yourid]);
            console.log("user : ", result.rows);
        }
        catch (err) {
            console.error("could not fetch ", err);
        }
    });
}
// Main function to run all operations
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield connectToNeon();
        // await createUserTable();
        // await addUser({
        //     username : "ashok",
        //     email : "as@gmail.com",
        //     password : "ashokkr"
        // });
        // await createAddresTableWithUser();
        // await addAddressuser({
        //     user_id : 5,
        //     pincode : "821104",
        //     city: "chenari",
        //     state: "bihar"
        // })
        // await viewAllUser();
        yield viewUserWithAddress(5);
        yield client.end();
    });
}
main();
