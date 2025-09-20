import {expect , describe , it} from "vitest";
import { app } from "../index"
import request from "supertest" 

describe("POST /sum" , () => {
    it("should return the sum of two number" , async() => {
        const res = (await request(app).post("/sum").send({
            a : 1,
            b : 2
        }));

        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(3)
    });

})

describe("GET /sum" , () =>{
    it("should return the sum of two number " , async() => {
        const res = await request(app)
            .get("/sum")
            .set("a", "1")
            .set("b", "2");

        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(3);
    })
})

