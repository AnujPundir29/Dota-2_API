const MONGO_URL = process.env.MONGO_URL
const {
    MongoClient
} = require('mongodb');

let client = new MongoClient(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function connectDatabase() {
    // Use connect method to connect to the Server
    try {
        await client.connect();
        console.log('Connection ready');
    } catch (error) {
        console.error(error);
    }
    // finally {
    //     client.close();
    // }
}

module.exports = {
    connectDatabase,
    client
}