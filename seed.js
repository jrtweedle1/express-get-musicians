const { Musician, Band } = require("./models/index")
const { db } = require("./db/connection");
const { seedMusician, seedBand } = require("./seedData");

const syncSeed = async () => {
    await db.sync({force: true});
    seedMusician.map(musician => Musician.create(musician));
    seedBand.map(band => Band.create(band));
    const musician1 = await Musician.findByPk(1)
    const musician2 = await Musician.findByPk(2)
    const band1 = await Band.findByPk(1)
    band1.addMusicians([musician1, musician2])
}

syncSeed();