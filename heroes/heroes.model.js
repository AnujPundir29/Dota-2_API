const {
    client
} = require('../services/mongo');

const heroesDatabase = client.db("dotadictionary").collection('heroes');

async function getAllHeroes() {
    const result = heroesDatabase.find({}).project({
        roles: 0,
        attributes: 0
    });
    
   return await result.toArray();
}

module.exports = {
    getAllHeroes
}