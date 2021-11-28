const {
    client
} = require('../services/mongo');

const heroesDatabase = client.db("dotadictionary").collection('heroes');

async function getAllHeroes() {
    const hero = heroesDatabase.find({}).project({
        _id: 1
    });

    const result = await hero.toArray();
    // console.log(result);
    return result;
}

module.exports = {
    getAllHeroes
}