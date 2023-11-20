import { ulid } from 'ulid';

// separate ulid generation from unique-ness checking so that
// cost of uniqueness checking doesn't change timings and prevent
// the collisions we're looking for.

const ulids = [];
for (let i = 0; i < 100_000; i++) {
	ulids.push(ulid());

	if (i % 10_000 === 0) {
		console.log(`ULID's generated: ${i} ...`);
	}
}

// just for logging at the end.
let foundCount = 0;

// our mechanism for checking uniqueness.
const uniqueUlids = new Set();

for (const id of ulids) {
	if (uniqueUlids.has(id)) {
		foundCount++;
		console.log(`Collision found: ${id}`);
	}
}

if (foundCount === 0) {
	console.log("No collisions found.");
}

// just sampling of ID's for visual comparison across platforms
console.log(ulids.splice(0, 50));
