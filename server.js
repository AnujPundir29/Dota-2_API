require('dotenv').config();
const path= require('path');
const {
    connectDatabase
} = require('./services/mongo');
const {
    loadFilesSync
} = require('@graphql-tools/load-files');
const {
    makeExecutableSchema
} = require('@graphql-tools/schema');
const {
    ApolloServer
} = require('apollo-server-express');
const express = require('express');

const typesArray=loadFilesSync(path.join(__dirname, '**/*.graphql'));
const resolversArray=loadFilesSync(path.join(__dirname, '**/*.resolvers*'));

async function startServer() {
    const app = express();
    app.use(express.json());    
    await connectDatabase();

    const schema = makeExecutableSchema({
        typeDefs: typesArray,
        resolvers: resolversArray
    });

    const server = new ApolloServer({
        schema: schema
    });

    await server.start();

    server.applyMiddleware({
        app,
        path: '/dota2'
    })

    app.listen(3000,() => {
        console.log('Apollo Server listening on port 3000...')
    })
}

startServer();