import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';

const root = '.vercel/output';
assert.ok(
	existsSync(`${root}/config.json`),
	'Vercel Build Output missing: run VERCEL=1 npm run build'
);
const config = JSON.parse(readFileSync(`${root}/config.json`, 'utf8'));
assert.equal(config.version, 3);
assert.ok(existsSync(`${root}/static/_app`), 'Compiled browser assets missing');
const functions = readdirSync(`${root}/functions`).filter((name) => name.endsWith('.func'));
assert.ok(functions.length > 0, 'SvelteKit server function missing');
for (const name of functions) {
	const functionConfig = JSON.parse(
		readFileSync(`${root}/functions/${name}/.vc-config.json`, 'utf8')
	);
	assert.equal(functionConfig.runtime, 'nodejs24.x');
	assert.ok(
		existsSync(`${root}/functions/${name}/${functionConfig.handler}`),
		'Server handler missing'
	);
}
assert.ok(config.routes?.length > 0, 'SvelteKit routing missing');
console.log('Vercel deployment output validated: static assets, Node 24 functions and routing.');
