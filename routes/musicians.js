const express = require("express")
const router = express.Router()
const Musician = require("../models/Musician")
const { check, validationResult } = require("express-validator")


// Getting all musicians
router.get("/", async (request, response) => {
    const data = await Musician.findAll();
    response.json(data)
})

// Getting a specific musician
router.get("/:id", async (req, res) => {
    const id = req.params.id
    const musician = await Musician.findByPk(id)
    res.json(musician)
})

// Adding a musician
router.post("/", [
    check("name").not().isEmpty().trim(),
    check("instrument").not().isEmpty().trim()
    ], async (req, res) => {
    
        const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.json({ error: errors.array() })
    } 
    else {
        // create one musician and add that musician to the database
        const musician = await Musician.create(req.body)
        // get ALL of the musician data
        const musicianData = await Musician.findAll();
        // create an http response; send ALL musicians back to the requester
        res.json(musicianData)
    }
})

// Updating a specific musician
router.put("/:id", async (req, res) => {
    const musician = await Musician.update(req.body, {
        where: { id: req.params.id }
    })
    res.json(musician)
})

// Delete a musician
router.delete('/:id', async(req, res) => {
    const musician = await Musician.destroy({where: {id: req.params.id}});
    res.json(musician)
})

module.exports = router