const heroesModel = require('./heroes.model');

module.exports = {
    Query: {
        heroes: async () => {
            return await heroesModel.getAllHeroes();
        }
    }
}