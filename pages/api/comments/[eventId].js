function handler(req, res) {
	const eventId = req.query.eventId;

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
			id: new Date().toISOString(),
			email,
			name,
			text
		};
		console.log(newComment);
		res.status(201).json({ message: 'Added comment', comment: newComment });
	}

	if (req.method === 'GET') {
		const dummyList = [
			{ id: 'i1', name: 'dummyName 1', text: 'comment 1' },
			{ id: 'i2', name: 'dummyName 2', text: 'comment 2' }
		];
		res.status(200).json({ comments: dummyList });
	}
}

export default handler;
