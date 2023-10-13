const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

// Create a GET /musicians route to return all musicians 
app.get("/musicians", async (request, response) => {
    const data = await Musician.findAll();
    response.json(data)
})






module.exports = app;