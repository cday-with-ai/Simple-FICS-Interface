const message = "\nCreating: GuestXRLV (++++) GuestFNNB (++++) unrated standard 15 0\n{Game 3 (GuestXRLV vs. GuestFNNB) Creating unrated standard match.}\n";

// Test the current regex
const createMatch = message.match(/Creating: ([a-zA-Z0-9_\[\]*-]+(?:\([^)]*\))*) \(([0-9\+\-CEP]+)\) ([a-zA-Z0-9_\[\]*-]+(?:\([^)]*\))*) \(([0-9\+\-CEP]+)\) (rated|unrated) ([a-zA-Z0-9-]+) (\d+) (\d+)/);
const gameMatch = message.match(/\{Game (\d+) \(([a-zA-Z0-9_\[\]*-]+(?:\([^)]*\))*) vs\. ([a-zA-Z0-9_\[\]*-]+(?:\([^)]*\))*)\)/);

console.log('createMatch:', createMatch);
console.log('gameMatch:', gameMatch);

// Test a simpler pattern to see what's wrong
const simpleCreateMatch = message.match(/Creating: (\S+) \(([^)]+)\) (\S+) \(([^)]+)\)/);
console.log('simpleCreateMatch:', simpleCreateMatch);
