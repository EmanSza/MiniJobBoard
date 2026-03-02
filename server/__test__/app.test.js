import request from "supertest";
import app from '../src/App.js'


describe("Testing the Main Route", () => {
    test("It should respond with a GET Method", done => {
        request(app)
        .get("/")
        .then(response => {
            expect(response.statusCode).toBe(200);
            done();
        })
    })
    test("It should respond with a json", done => {
        request(app)
        .get("/jobs")
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({"text":"Test"});
            done();
        })
    })
})