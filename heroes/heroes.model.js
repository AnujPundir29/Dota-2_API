const {
    client
} = require('../services/mongo');

const heroesDatabase = client.db("dotadictionary").collection('heroes');

async function getAllHeroes() {
    const heroes = heroesDatabase.find({});

    const result = await heroes.toArray();
    // console.log(result);
    return result;
}

async function getHeroById(name) {
    const hero = heroesDatabase.findOne({
        _id: name
    });
    return hero;
}

async function getHeroesByComplexity(complexity) {
    complexity = Math.max(0, Math.min(complexity, 3));
    const heroes = await heroesDatabase.find({
        "roles.complexity":complexity
    }).toArray();

    return heroes;
}



module.exports = {
    getAllHeroes,
    getHeroById,
    getHeroesByComplexity
}