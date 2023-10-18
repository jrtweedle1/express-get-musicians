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
        expect(musician.body.id).toBe(1)
    })

    test("Creating a new musician", async () => {
        const musician = await request(app).post("/musicians").send({
            name: "Tobi Lou",
            instrument: "Guitar"
        })
        expect(musician.body[musician.body.length -1].name).toBe("Tobi Lou")
    })

    test("Updating a new musician", async () => {
        const musician = await request(app).put("/musicians/1").send({
            name: "MC Hammer"
        })
        const musicianName = await Musician.findByPk(1)
        expect(musicianName.name).toBe("Mick Jagger")
    })

    test('deleting a musician', async() => {
        await request(app).delete("/musicians/3")
        const deleted = await Musician.findByPk(3);
        expect(deleted).toBe(null)
    })

    test('Getting all bands including musicians', async() => {
        const response = await request(app).get("/bands")
        const responseData = response.body
        expect(responseData[0].id).toBe(1)
    })

    test("Testing validations for musicians post", async () =>{
        const response1 = await request(app).post("/musicians").send({
            name: "",
            instrument: "Harp"
        })

        const response2 = await request(app).post("/musicians").send({
            name: "Mark",
            instrument: ""
        })

        const response3 = await request(app).post("/musicians").send({
            name: "a",
            instrument: "Triangle"
        })

        const response4 = await request(app).post("/musicians").send({
            name: "Phil",
            instrument: "askdhfasdhfasdhfashdfasdhfasdhfasdhf"
        })
        
        console.log(response4.body.error[0])
        
        expect(response1.body.error[0].path).toBe('name')
        expect(response2.body.error[0].path).toBe('instrument')
        expect(response3.body.error[0].path).toBe("name")
        expect(response4.body.error[0].path).toBe("instrument")
    })

    test("Testing validations for musicians put", async () => {
        const response1 = await request(app).put("/musicians/2").send({
            name: "",
            instrument: "Harp"
        })

        const response2 = await request(app).put("/musicians/2").send({
            name: "Mark",
            instrument: ""
        })

        const response3 = await request(app).put("/musicians/2").send({
            name: "a",
            instrument: "Triangle"
        })

        const response4 = await request(app).put("/musicians/2").send({
            name: "Phil",
            instrument: "askdhfasdhfasdhfashdfasdhfasdhfasdhf"
        })
        
        
        expect(response1.body.error[0].path).toBe('name')
        expect(response2.body.error[0].path).toBe('instrument')
        expect(response3.body.error[0].path).toBe("name")
        expect(response4.body.error[0].path).toBe("instrument")
    })



    test('Getting one band including musicians', async() => {
        const response = await request(app).get("/bands/1")
        const responseData = response.body
        expect(responseData.id).toBe(1)
    })
})