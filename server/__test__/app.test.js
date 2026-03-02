import request from "supertest";
import app from '../src/app.js'


describe("Testing the Main Route", () => {
    test("It should respond with a GET Method", done => {
        request(app)
        .get("/")
        .then(response => {
            expect(response.statusCode).toBe(200);
            done();
        })
    })
})