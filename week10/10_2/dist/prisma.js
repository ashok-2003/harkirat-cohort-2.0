"use strict";
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
// first of all import the prisma client to use the prisma 
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
//function to insert the user only 
function insertOnlyUser(username, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield prisma.user.create({
                data: {
                    email,
                    username,
                    password
                }
            });
            //so we have to send it in the data format here 
            console.log("user created succesfully", res);
        }
        catch (err) {
            console.error("cannot create the user", err);
        }
    });
}
function updateUser(props) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield prisma.user.update({
                // where should be defined as here we are doing the update info not the create operation 
                where: {
                    username: props.username
                },
                data: {
                    username: props.username,
                    password: props.password
                }
            });
            console.log("updated succesfully", res.username, res.password);
        }
        catch (err) {
            console.error("could not update the user", err);
        }
    });
}
// function to get the user details 
function getAllUser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield prisma.user.findMany({
                select: {
                    username: true,
                    email: true
                }
            });
            console.log(res);
        }
        catch (err) {
            console.error("could not fetch the user", err);
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // await insertOnlyUser("ashok" , "as@gmail.com" , "ashokkr");
        // await updateUser({
        //     username : "ashok",
        //     password : "newpassword"
        // })
        yield getAllUser();
    });
}
main();
