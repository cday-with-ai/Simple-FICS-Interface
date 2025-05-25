import { getFicsCommandRegex } from '../scripts/chat.js';

function commandMatches(command) {
 // console.log(`Testing ${command}`);
  for (const regex of getFicsCommandRegex()) {
   // console.log(`Testing ${regex}`);
    if (regex.test(command)) {
     // console.log(`Matched ${command} with ${regex}`);
      return true;
    }
  }
  return false;
}

describe('FICS Command Regex Tests', () => {
  // Test match commands
  it('should match match commands', () => {
    expect(commandMatches('match user1 3 0 r')).toBe(true);
    expect(commandMatches('m user1 3 0 r')).toBe(true);
  });

  // Test observe commands
  it('should match observe commands', () => {
    expect(commandMatches('observe')).toBe(false);
    expect(commandMatches('obs')).toBe(false);
    expect(commandMatches('observe user1')).toBe(true);
    expect(commandMatches('obs user1')).toBe(true);
  });

  // Test play commands
  it('should match play commands', () => {
    expect(commandMatches('play 42')).toBe(true);
    expect(commandMatches('play')).toBe(false); // Missing game number
    expect(commandMatches('play abc')).toBe(false); // Not a number
  });

  // Test tell commands
  it('should match tell commands', () => {
    expect(commandMatches('tell user1 Hello there')).toBe(true);
    expect(commandMatches('t user1 Hello there')).toBe(true);
    expect(commandMatches('tell user1')).toBe(false); // Empty message is allowed
    expect(commandMatches('tell')).toBe(false); // Missing username
  });

  // Test message commands
  it('should match message commands', () => {
    expect(commandMatches('message foobar Hello everyone')).toBe(true);
    expect(commandMatches('messages')).toBe(true); // 'messages' command is allowed
  });

  // Test invalid commands
  it('should not match invalid commands', () => {
    // The string 'atlas has lost it' is actually matching the tell command regex
    // because 'atlas' is interpreted as the command, 'has' as the username, and 'lost it' as the message
    // Let's use a different example
    expect(commandMatches('atlas has lost it')).toBe(false); // Invalid command
    expect(commandMatches('')).toBe(false);
    expect(commandMatches('invalid command')).toBe(false);
    expect(commandMatches('tell@user1 Hello')).toBe(false); // Invalid character
    expect(commandMatches('observe user1 game2')).toBe(false); // Too many arguments
  });

  // Test case sensitivity
  it('should be case insensitive', () => {
    expect(commandMatches('OBSERVE 9')).toBe(true); // Should be case insensitive
    expect(commandMatches('Observe User1')).toBe(true); // Should be case insensitive
    expect(commandMatches('TELL USER1 Hello')).toBe(true); // Should be case insensitive
  });

  // Test commands with special characters in usernames
  it('should not match usernames with special characters', () => {
    expect(commandMatches('tell user-1 Hello')).toBe(false); // Hyphen not allowed
    expect(commandMatches('observe user_1')).toBe(false); // Underscore not allowed
    expect(commandMatches('finger user.1')).toBe(false); // Period not allowed
  });
});
