const execa = require('execa');

const binary = 'rclone';

const parseList = list => list.split('\n');

async function listRemotes() {
	const {stdout} = await execa('rclone', [ 'listremotes' ]);

	return parseList(stdout);
}

async function listDirectory(path) {
	console.log('$ rclone lsf', path);
	const {stdout} = await execa('rclone', [ 'lsf', path ]);

	return parseList(stdout);
}

module.exports = {
	async ls(segs) {
		if(segs.length === 0) {
			return await listRemotes();
		} else {
			return await listDirectory(segs.join(''));
		}
	}
}
