import { ficsCommandRegex } from './fics-regex.js';

describe('FICS Command Regex Tests', () => {

  // Helper function to test if a command matches any of the regex patterns
  function commandMatches(command) {
    for (const regex of ficsCommandRegex) {
      if (regex.test(command)) {
        return true;
      }
    }
    return false;
  }

  // Test examine commands
  test('examine commands', () => {
    expect(commandMatches('examine')).toBe(true);
    expect(commandMatches('examine user1')).toBe(true);
    expect(commandMatches('ex user1')).toBe(true);
    expect(commandMatches('examine user1 game2')).toBe(false); // Too many arguments
  });

  // Test unexamine commands
  test('unexamine commands', () => {
    expect(commandMatches('unexamine')).toBe(true);
    expect(commandMatches('unexamine user1')).toBe(true);
    expect(commandMatches('unex')).toBe(true);
    expect(commandMatches('unex user1')).toBe(true);
  });

  // Test history commands
  test('history commands', () => {
    expect(commandMatches('history')).toBe(true);
    expect(commandMatches('hi')).toBe(true);
    expect(commandMatches('history user1')).toBe(true);
    expect(commandMatches('hi user1')).toBe(true);
  });

  // Test finger commands
  test('finger commands', () => {
    expect(commandMatches('finger')).toBe(true);
    expect(commandMatches('fi')).toBe(true);
    expect(commandMatches('finger user1')).toBe(true);
    expect(commandMatches('fi user1')).toBe(true);
  });

  // Test match commands
  test('match commands', () => {
    expect(commandMatches('match user1')).toBe(true);
    expect(commandMatches('m user1')).toBe(true);
    expect(commandMatches('match')).toBe(false); // Missing username
    expect(commandMatches('match user1 rated')).toBe(false); // Too many arguments
  });

  // Test observe commands
  test('observe commands', () => {
    expect(commandMatches('observe')).toBe(true);
    expect(commandMatches('obs')).toBe(true);
    expect(commandMatches('observe user1')).toBe(true);
    expect(commandMatches('obs user1')).toBe(true);
  });

  // Test unobserve commands
  test('unobserve commands', () => {
    expect(commandMatches('unobserve')).toBe(true);
    expect(commandMatches('unobs')).toBe(true);
    expect(commandMatches('unobserve user1')).toBe(true);
    expect(commandMatches('unobs user1')).toBe(true);
  });

  // Test censor commands
  test('censor commands', () => {
    expect(commandMatches('+censor user1')).toBe(true);
    expect(commandMatches('-censor user1')).toBe(true);
    expect(commandMatches('censor user1')).toBe(false); // Missing + or -
  });

  // Test seek commands
  test('seek commands', () => {
    expect(commandMatches('seek 5 0 unrated')).toBe(true);
    expect(commandMatches('seek 10 5 rated')).toBe(true);
    expect(commandMatches('seek')).toBe(false); // Missing arguments
  });

  // Test play commands
  test('play commands', () => {
    expect(commandMatches('play 42')).toBe(true);
    expect(commandMatches('play')).toBe(false); // Missing game number
    expect(commandMatches('play abc')).toBe(false); // Not a number
  });

  // Test tell commands
  test('tell commands', () => {
    expect(commandMatches('tell user1 Hello there')).toBe(true);
    expect(commandMatches('t user1 Hello there')).toBe(true);
    expect(commandMatches('tell user1')).toBe(true); // Empty message is allowed
    expect(commandMatches('tell')).toBe(false); // Missing username
  });

  // Test kibitz commands
  test('kibitz commands', () => {
    expect(commandMatches('kibitz user1 Nice move!')).toBe(true);
    expect(commandMatches('kib user1 Nice move!')).toBe(true);
    expect(commandMatches('kibitz user1')).toBe(true); // Empty message is allowed
    expect(commandMatches('kibitz')).toBe(false); // Missing username
  });

  // Test whisper commands
  test('whisper commands', () => {
    expect(commandMatches('whisper user1 Good game')).toBe(true);
    expect(commandMatches('whisper user1')).toBe(true); // Empty message is allowed
    expect(commandMatches('whisper')).toBe(false); // Missing username
  });

  // Test message commands
  test('message commands', () => {
    expect(commandMatches('message Hello everyone')).toBe(true);
    expect(commandMatches('message')).toBe(true); // Empty message is allowed
  });

  // Test invalid commands
  test('invalid commands', () => {
    expect(commandMatches('')).toBe(false);
    expect(commandMatches('invalid command')).toBe(false);
    expect(commandMatches('tell@user1 Hello')).toBe(false); // Invalid character
    expect(commandMatches('observe user1 game2')).toBe(false); // Too many arguments
  });

  // Test case sensitivity
  test('case sensitivity', () => {
    expect(commandMatches('OBSERVE')).toBe(true); // Should be case insensitive
    expect(commandMatches('Observe User1')).toBe(true); // Should be case insensitive
    expect(commandMatches('TELL USER1 Hello')).toBe(true); // Should be case insensitive
  });

  // Test commands with special characters in usernames
  test('special characters in usernames', () => {
    expect(commandMatches('tell user-1 Hello')).toBe(false); // Hyphen not allowed
    expect(commandMatches('observe user_1')).toBe(false); // Underscore not allowed
    expect(commandMatches('finger user.1')).toBe(false); // Period not allowed
  });
});
