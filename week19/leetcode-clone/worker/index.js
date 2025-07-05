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
const redis_1 = require("redis");
const client = (0, redis_1.createClient)();
var i = 0;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        console.log("connect to client");
        while (true) {
            const submission = yield client.brPop("problems", 0);
            yield processsubmmion(submission.element);
            console.log(`finished processing the item ${i++}`);
        }
    });
}
function processsubmmion(submission) {
    return __awaiter(this, void 0, void 0, function* () {
        const { problemId, code, language } = JSON.parse(submission);
        console.log(problemId);
        console.log(code);
        console.log(language);
        // fake the submmit delay 
        yield new Promise(resolve => setTimeout(resolve, 2000)); // 1 sec delay
    });
}
startServer();
