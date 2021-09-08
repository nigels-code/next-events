import { MongoClient } from 'mongodb';

export async function connectDB() {
	const client = await MongoClient.connect(
		'mongodb+srv://nigel:wkZBZOLiZpfPtoji@cluster0.qr2zl.mongodb.net/events?retryWrites=true&w=majority'
	);
	return client;
}

export async function insertDocument(client, collection, document) {
	const db = client.db();
	const result = await db.collection(collection).insertOne(document);
	return result;
}

export async function getAllDocuments(client, collection, sort, filter = {}) {
	const db = client.db();
	const docs = await db
		.collection(collection)
		.find(filter)
		.sort(sort)
		.toArray();
	return docs;
}
