// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

// Used to access response to 
const request = require("supertest")
const { db } = require('./db/connection');
const { Musician, Band } = require('./models/index')
const app = require('./src/app');
const seedMusician = require("./seedData");


describe('./musicians endpoint', () => {
    // Write your tests here
    test("Testing musicians endpoint GET request successful", async () => {
        const response = await request(app).get("/musicians")
        expect(response.statusCode).toBe(200);
    })

    test("Testing to get all musicians", async () => {
        const response = await request(app).get("/musicians")
        const responseData = JSON.parse(response.text)
        expect(responseData[0].id).toBe(1)
    } )

    test("get 1 musician endpoint", async () =>{
        const musician = await request(app).get("/musicians/1")
        console.log(musician)
        expect(musician.body.id).toBe(1)
    })

    test("Creating a new musician", async () => {
        const musician = await request(app).post("/musicians").send({
            name: "Tobi Lou",
            instrument: "Guitar"
        })
        // console.log(musician)
        expect(musician.body.name).toBe("Tobi Lou")
    })

    test("Updating a new musician", async () => {
        const musician = await request(app).put("/musicians/1").send({
            name: "MC Hammer"
        })
        // console.log(musician.body)
        const musicianName = await Musician.findByPk(1)
        expect(musicianName.name).toBe("MC Hammer")
    })

    test('deleting a musician', async() => {
        await request(app).delete("/musicians/3")
        const deleted = await Musician.findByPk(3);
        expect(deleted).toBe(null)
    })

    test('Getting all bands including musicians', async() => {
        const response = await request(app).get("/bands")
        const responseData = response.body
        console.log(responseData)
        expect(responseData[0].id).toBe(1)
    })

    test('Getting one band including musicians', async() => {
        const response = await request(app).get("/bands/1")
        const responseData = response.body
        expect(responseData.id).toBe(1)
    })
})