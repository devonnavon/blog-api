let users = {
	1: {
		id: '1',
		username: 'lord',
		password: 'john',
	},
	2: {
		id: '2',
		username: 'dduuudddeee',
		password: 'dude',
	},
};

let posts = {
	1: {
		title: 'First post, kind of nervous',
		body: 'Hi everyone! Hope you enjoy this post. Thank you!',
		// user: { type: Schema.Types.ObjectId, ref: 'User' },
		// comment: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
	},
};

let comments = {
	1: {
		text: 'please stop',
	},
};

export default {
	users,
	posts,
	comments,
};
