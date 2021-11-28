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

async function getHeroesByParameter(param) {
    const heroes = await heroesDatabase.find(param).toArray();

    return heroes;
}

async function getHeroesByComplexity(complexity) {
    complexity = Math.max(0, Math.min(complexity, 3));
    return await getHeroesByParameter({
        'roles.complexity': complexity
    })
}

async function compareTwoHeroes(hero_1, hero_2) {

}

async function getHeroesByAttackType(attacktype) {
    return await getHeroesByParameter({
        'attributes.attacktype': attacktype
    })
}

async function filterHeroesOnParameters(parentType,parameter,minValue,maxValue)
{
    var path = parentType+'.'+parameter;
    console.log(path);
    return await getHeroesByParameter({
        [path]:{$gte: minValue, $lte: maxValue}
    })
}

module.exports = {
    getAllHeroes,
    getHeroById,
    getHeroesByComplexity,
    compareTwoHeroes,
    getHeroesByAttackType,
    filterHeroesOnParameters
}