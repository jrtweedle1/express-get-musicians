const express = require("express");
const app = express();
const { Musician, Band } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded());

// Create a GET /musicians route to return all musicians 
app.get("/musicians", async (request, response) => {
    const data = await Musician.findAll();
    response.json(data)
})

// app.get("/musicians/1", async (request, response) => {
//     const data = await Musician.findByPk(1);
//     // console.log(data)
//     response.json(data)
// })

// app.get("/musicians/2", async (request, response) => {
//     const data = await Musician.findByPk(2);
//     // console.log(data)
//     response.json(data)
// })

// app.get("/musicians/3", async (request, response) => {
//     const data = await Musician.findByPk(3);
//     // console.log(data)
//     response.json(data)
// })


// Getting a specific musician
app.get("/musicians/:id", async (req, res) => {
    const id = req.params.id
    const musician = await Musician.findByPk(id)

    res.json(musician)
})

// Adding a musician
app.post("/musicians", async (req, res) => {
    const musician = await Musician.create(req.body)
    res.json(musician)
})

// Updating a musician
app.put("/musicians/:id", async (req, res) => {
    const musician = await Musician.update(req.body, {
        where: { id: req.params.id }
    })
    res.json(musician)
})

// Getting all bands
app.get("/bands", async (request, response) => {
    const data = await Band.findAll();
    console.log(data)
    response.json(data)
})

module.exports = app;