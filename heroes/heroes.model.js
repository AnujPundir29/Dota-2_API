const {
    json
} = require('express');
const {
    client
} = require('../services/mongo');

const heroesDatabase = client.db("dotadictionary").collection('heroes');

async function getAllHeroes() {
    const heroes = heroesDatabase.find({}).project({
        _id: 1
    });

    // const result = await heroes.toArray();
    // // console.log(result);
    // return result;
    var heroList = [];
    (await heroes.toArray()).forEach((hero) => {
        heroList.push(hero._id);
    });
    return heroList;
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

async function compareTwoHeroes(hero_1, hero_2, role) {
    var winner;
    const result = await getHeroesByParameter({
        _id: {
            $in: [hero_1, hero_2]
        }
    }, {
        ['roles.' + role]: 1
    })

    if (result[0]['_id'] == hero_1)
        if (result[0]['roles'][role] > result[1]['roles'][role])
            winner = hero_1
    else
        winner = hero_2
    else
    if (result[0]['roles'][role] > result[1]['roles'][role])
        winner = hero_2
    else
        winner = hero_1

    return {
        "winner": winner
    };
}

async function getHeroesByAttackType(attacktype) {
    return await getHeroesByParameter({
        'attributes.attacktype': attacktype
    })
}

async function filterHeroesOnParameters(parentType, parameter, minValue, maxValue) {
    var path = parentType + '.' + parameter;
    console.log(path);
    return await getHeroesByParameter({
        [path]: {
            $gte: minValue,
            $lte: maxValue
        }
    })
}

async function getAllAttributes() {
    const result = await heroesDatabase.findOne({});

    const attributes = Object.keys(result.attributes);
    return attributes;
}

async function getAllRoles() {
    const result = await heroesDatabase.findOne({});

    const attributes = Object.keys(result.roles);
    return attributes;
}


module.exports = {
    getAllHeroes,
    getHeroById,
    getHeroesByComplexity,
    compareTwoHeroes,
    getHeroesByAttackType,
    filterHeroesOnParameters,
    getAllAttributes,
    getAllRoles,
}