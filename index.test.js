// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

// Used to access response to 
const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const seedMusician = require("./seedData");


describe('./musicians endpoint', () => {
    // Write your tests here
    test("Testing musicians endpoint GET request successful", async () => {
        const response = await request(app).get("/musicians")
        expect(response.statusCode).toBe(200);
    })
    // test("Testing ")
})