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

async function connectAndInsert() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        // Get database and collection names from user
        const dbName = await getInput("Enter the database name: ");
        const collectionName = await getInput("Enter the collection name: ");
        
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const n = await getInput("Enter the number of inputs: ");
        const numInputs = parseInt(n); // Parse as integer
        if (isNaN(numInputs) || numInputs <= 0) {
            console.error("Please enter a valid positive number.");
            return;
        }

        // Loop for getting multiple inputs and inserting into MongoDB
        for (let i = 0; i < numInputs; i++) {
            const key = await getInput("Enter the field name: ");
            const value = await getInput("Enter the value: ");

            // Insert data
            const doc = { [key]: value }; // Dynamically create the document
            const result = await collection.insertOne(doc);
            console.log("Document inserted with _id:", result.insertedId);
        }

        // Verify by listing collections in the database
        const collections = await db.listCollections().toArray();
        console.log("Collections in the database:");
        collections.forEach(col => console.log(` - ${col.name}`));

    } catch (err) {
        console.error("Error:", err);
    } finally {
        rl.close();
        await client.close();
    }
}

connectAndInsert();
