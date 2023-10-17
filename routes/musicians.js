const express = require("express")
const router = express.Router()
const Musician = require("../models/Musician")


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
router.post("/", async (req, res) => {
    const musician = await Musician.create(req.body)
    res.json(musician)
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