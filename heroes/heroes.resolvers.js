const heroesModel = require('./heroes.model');

module.exports = {
    Query: {
        heroes: async () => {
            return await heroesModel.getAllHeroes();
        },
        hero: async (_,args) => {
            return await heroesModel.getHeroById(args.name);
        },
        heroByComplexity: async (_,args) => {
            return await heroesModel.getHeroesByComplexity(args.complexity);
        },
        compareTwoHeroes: async (_,args) => {
            return await heroesModel.compareTwoHeroes(args.hero_1,args.hero_2,args.role);
        },        
        heroByAttackType: async (_,args) => {
            return await heroesModel.getHeroesByAttackType(args.attacktype);
        },
        filterHeroes: async (_,args) => {
            return await heroesModel.filterHeroesOnParameters(args.parentType,args.parameter,args.minValue,args.maxValue);
        },
    }
}