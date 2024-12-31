// update.js
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

async function connectAndUpdate() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        const dbName = await getInput("Enter the database name: ");
        const collectionName = await getInput("Enter the collection name: ");
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const queryField = await getInput("Enter the field name to search for: ");
        const queryValue = await getInput("Enter the value to search for: ");
        const updateField = await getInput("Enter the field name to update: ");
        const updateValue = await getInput("Enter the new value: ");

        const query = { [queryField]: queryValue };
        const updateDoc = { $set: { [updateField]: updateValue } };

        const result = await collection.updateOne(query, updateDoc);
        if (result.modifiedCount > 0) {
            console.log("Document updated successfully.");
        } else {
            console.log("No document found to update.");
        }

    } catch (err) {
        console.error("Error:", err);
    } finally {
        rl.close();
        await client.close();
    }
}

connectAndUpdate();
