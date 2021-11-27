require('dotenv').config();
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

async function startServer() {
    const app = express();
    await connectDatabase();
}

startServer();