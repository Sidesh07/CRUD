// read.js
const { MongoClient } = require('mongodb');
const readline = require('readline');

// Replace with your MongoDB connection string
const uri = "mongodb+srv://sidesh:sidesh123@trail.qpupf.mongodb.net/test?retryWrites=true&w=majority&tls=true";
const client = new MongoClient(uri);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function getInput(prompt) {
    return new Promise((resolve) => {
        rl.question(prompt, (input) => resolve(input));
    });
}

async function connectAndRead() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        const dbName = await getInput("Enter the database name: ");
        const collectionName = await getInput("Enter the collection name: ");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const query = await getInput("Enter the field name to search for: ");
        const value = await getInput("Enter the value to search for: ");

        const docs = await collection.find({ [query]: value }).toArray();
        if (docs.length > 0) {
            console.log("Documents found:");
            console.log(docs);
        } else {
            console.log("No documents found.");
        }

    } catch (err) {
        console.error("Error:", err);
    } finally {
        rl.close();
        await client.close();
    }
}

connectAndRead();
