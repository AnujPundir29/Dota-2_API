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
        }
    }
}