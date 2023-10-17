const express = require("express")
const router = express.Router()
const { Band, Musician } = require("../models/index")

// Getting all bands including their musicians
router.get("/", async (request, response) => {
    const data = await Band.findAll({ include: Musician });
    console.log(data)
    response.json(data)
})

// Getting a specific band and including their musicians
router.get("/:id", async (request, response) => {
    const id = request.params.id
    const band = await Band.findByPk(id, { include: Musician });
    response.json(band)
})

module.exports = router