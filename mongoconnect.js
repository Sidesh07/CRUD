const { MongoClient } = require('mongodb');

// Replace with your MongoDB connection string
const uri = "mongodb+srv://sidesh:sidesh123@trail.qpupf.mongodb.net/test?retryWrites=true&w=majority&tls=true"
const client = new MongoClient(uri);

async function connect() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        // Optional: Verify connection by listing databases
        const databases = await client.db().admin().listDatabases();
        console.log("Databases:");
        databases.databases.forEach(db => console.log(` - ${db.name}`));
    } catch (err) {
        console.error("Connection failed:", err);
    } finally {
        await client.close();
    }
}

connect();
