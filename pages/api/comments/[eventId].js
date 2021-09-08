import {
	connectDB,
	insertDocument,
	getAllDocuments
} from '../../../helpers/db-util';

async function handler(req, res) {
	const eventId = req.query.eventId;

	let client;
	try {
		client = await connectDB();
	} catch {
		res.status(500).json({ message: 'Connecting to DB failed' });
		return;
	}

	if (req.method === 'POST') {
		const { email, name, text } = req.body;
		if (
			!email.includes('@') ||
			!name ||
			name.trim() === '' ||
			!text ||
			text.trim() === ''
		) {
			res.status(422).json({ message: 'Invalid input' });
			return;
		}

		const newComment = {
			email,
			name,
			text,
			eventId
		};

		let result;

		try {
			result = await insertDocument(client, 'comments', newComment);
			newComment._id = result.insertedId;
			res.status(201).json({ message: 'Added comment', comment: newComment });
		} catch {
			res.status(500).json({ message: 'Inserting comment failed' });
		} finally {
			client.close();
		}
	}

	if (req.method === 'GET') {
		let docs;
		try {
			docs = await getAllDocuments(
				client,
				'comments',
				{ _id: -1 },
				{ eventId: eventId }
			);
			res.status(200).json({ comments: docs });
		} catch {
			res.status(500).json({ message: 'Getting comments failed' });
		} finally {
			client.close();
		}
	}
}

export default handler;
