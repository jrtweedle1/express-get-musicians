const express = require("express");
const app = express();
const { Musician, Band } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

// Create a GET /musicians route to return all musicians 
app.get("/musicians", async (request, response) => {
    const data = await Musician.findAll();
    response.json(data)
})

app.get("/musicians/1", async (request, response) => {
    const data = await Musician.findByPk(1);
    // console.log(data)
    response.json(data)
})

app.get("/musicians/2", async (request, response) => {
    const data = await Musician.findByPk(2);
    // console.log(data)
    response.json(data)
})

app.get("/musicians/3", async (request, response) => {
    const data = await Musician.findByPk(3);
    // console.log(data)
    response.json(data)
})

app.get("/bands", async (request, response) => {
    const data = await Band.findAll();
    console.log(data)
    response.json(data)
})

module.exports = app;