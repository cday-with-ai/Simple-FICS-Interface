import {FicsProtocol} from '../FicsProtocol';
import {FicsMessage, GameStart, Style12, ChannelTell, GameEnd} from '../FicsProtocol.types';

describe('FicsProtocol - Comprehensive Tests', () => {
    describe('parseMessage - Edge Cases', () => {
        it('should handle empty messages', () => {
            const messages = FicsProtocol.parseMessage('');
            expect(messages).toHaveLength(1);
            expect(messages[0].type).toBe('raw');
            expect(messages[0].data).toBe('');
        });

        it('should handle whitespace-only messages', () => {
            const messages = FicsProtocol.parseMessage('   \n\t   ');
            expect(messages).toHaveLength(1);
            expect(messages[0].type).toBe('raw');
        });

        it('should handle multiple message types in single input', () => {
            const msg = `Player(1): Hello!
{Game 42 (White vs. Black) White resigns} 0-1
Illegal move (e2e5).`;
            const messages = FicsProtocol.parseMessage(msg);
            expect(messages.length).toBeGreaterThan(1);

            const channelTell = messages.find(m => m.type === 'channelTell');
            const gameEnd = messages.find(m => m.type === 'gameEnd');
            const illegalMove = messages.find(m => m.type === 'illegalMove');

            expect(channelTell).toBeDefined();
            expect(gameEnd).toBeDefined();
            expect(illegalMove).toBeDefined();
        });

        it('should handle malformed messages gracefully', () => {
            const messages = FicsProtocol.parseMessage('Game : incomplete');
            expect(messages).toHaveLength(1);
            expect(messages[0].type).toBe('raw');
        });
    });

    describe('Style12 parsing - Detailed Tests', () => {
        it('should parse complete Style12 message with all fields', () => {
            const style12 = '<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR W -1 1 1 1 1 0 111 TestWhite TestBlack -1 2 12 39 39 119 122 1 none (0:00) none 0 0 0';
            const messages = FicsProtocol.parseMessage(style12);

            expect(messages).toHaveLength(1);
            expect(messages[0].type).toBe('style12');

            const data = messages[0].data as Style12;
            expect(data.board).toHaveLength(8);
            expect(data.board[0]).toEqual(['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']);
            expect(data.board[7]).toEqual(['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']);
            expect(data.colorToMove).toBe('W');
            expect(data.gameNumber).toBe(111);
            expect(data.whiteName).toBe('TestWhite');
            expect(data.blackName).toBe('TestBlack');
            expect(data.whiteTimeRemaining).toBe(119);
            expect(data.blackTimeRemaining).toBe(122);
            expect(data.moveNumber).toBe(1);
            expect(data.flipBoard).toBe(false);
        });

        it('should parse Style12 with castling rights', () => {
            // Copy working format and modify only the tested fields
            const style12 = '<12> r---k--r pp-pp-pp -n------ -------- -------- ----N--- PP-PP-PP R---K--R W KQkq e3 0 1 1 0 111 TestWhite TestBlack -1 2 12 39 39 119 122 1 e2e4 (0:05) e4 0 0 0';
            const messages = FicsProtocol.parseMessage(style12);

            expect(messages[0].type).toBe('style12');
            const data = messages[0].data as Style12;
            expect(data.castlingRights).toBe('KQkq');
            expect(data.enPassantSquare).toBe('e3');
            expect(data.verboseMove).toBe('e2e4');
            expect(data.prettyMove).toBe('e4');
            expect(data.flipBoard).toBe(false);
        });

        it('should parse multiple Style12 messages', () => {
            const msg = `<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR W -1 1 1 1 1 0 111 White Black -1 2 12 39 39 119 122 1 none (0:00) none 0 0 0
<12> rnbqkbnr pppp-ppp -------- ----p--- -------- -------- PPPPPPPP RNBQKBNR B -1 1 1 1 1 0 111 White Black -1 2 12 39 39 119 120 1 e7e5 (0:02) e5 0 0 0`;

            const messages = FicsProtocol.parseMessage(msg);
            const style12Messages = messages.filter(m => m.type === 'style12');
            expect(style12Messages).toHaveLength(2);

            const first = style12Messages[0].data as Style12;
            const second = style12Messages[1].data as Style12;

            expect(first.colorToMove).toBe('W');
            expect(second.colorToMove).toBe('B');
            expect(second.verboseMove).toBe('e7e5');
        });

        it('should handle Style12 with insufficient parts', () => {
            const style12 = '<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR W -1';
            const messages = FicsProtocol.parseMessage(style12);
            expect(messages).toHaveLength(1);
            expect(messages[0].type).toBe('raw');
        });
    });

    describe('Game Start parsing - Variants', () => {
        it('should parse standard game start', () => {
            const msg = 'Game 123: Player1 (1500) Player2 (1600) rated standard 15 10';
            const messages = FicsProtocol.parseMessage(msg);

            const gameStart = messages[0].data as GameStart;
            expect(gameStart.gameType).toBe('standard');
            expect(gameStart.isRated).toBe(true);
            expect(gameStart.minutes).toBe(15);
            expect(gameStart.increment).toBe(10);
        });

        it('should parse blitz game', () => {
            const msg = 'Game 456: FastPlayer (2000) QuickPlayer (1950) unrated blitz 3 0';
            const messages = FicsProtocol.parseMessage(msg);

            const gameStart = messages[0].data as GameStart;
            expect(gameStart.gameType).toBe('blitz');
            expect(gameStart.isRated).toBe(false);
            expect(gameStart.minutes).toBe(3);
            expect(gameStart.increment).toBe(0);
        });

        it('should parse bullet game', () => {
            const msg = 'Game 789: Bullet1 (2200) Bullet2 (2150) rated bullet 1 0';
            const messages = FicsProtocol.parseMessage(msg);

            const gameStart = messages[0].data as GameStart;
            expect(gameStart.gameType).toBe('bullet');
            expect(gameStart.minutes).toBe(1);
        });

        it('should parse creating game format', () => {
            const msg = `Creating: Player1 (1500) Player2 (1600) rated standard 15 10
{Game 123 (Player1 vs. Player2) Creating rated standard match.}`;

            const messages = FicsProtocol.parseMessage(msg);
            const gameStart = messages[0].data as GameStart;

            expect(gameStart.gameNumber).toBe(123);
            expect(gameStart.whiteName).toBe('Player1');
            expect(gameStart.blackName).toBe('Player2');
        });

        it('should handle guest players', () => {
            const msg = 'Game 999: GuestABCD (++++) RegularPlayer (1500) unrated blitz 5 0';
            const messages = FicsProtocol.parseMessage(msg);

            const gameStart = messages[0].data as GameStart;
            expect(gameStart.whiteName).toBe('GuestABCD');
            expect(gameStart.whiteRating).toBe('++++');
        });
    });

    describe('Channel and Direct Tells', () => {
        it('should parse channel tells with special characters', () => {
            const msg = 'Player*(1): Hello! How are you? :)';
            const messages = FicsProtocol.parseMessage(msg);

            const channelTell = messages[0].data as ChannelTell;
            expect(channelTell.username).toBe('Player*');
            expect(channelTell.channelNumber).toBe('1');
            expect(channelTell.message).toBe('Hello! How are you? :)');
        });

        it('should parse tells with numeric usernames', () => {
            const msg = 'Player123(50): Testing numeric channel';
            const messages = FicsProtocol.parseMessage(msg);

            const channelTell = messages[0].data as ChannelTell;
            expect(channelTell.username).toBe('Player123');
            expect(channelTell.channelNumber).toBe('50');
        });

        it('should parse direct tells with colons in message', () => {
            const msg = 'Friend tells you: Time is 3:30 PM';
            const messages = FicsProtocol.parseMessage(msg);

            expect(messages[0].type).toBe('directTell');
            expect(messages[0].data).toEqual({
                username: 'Friend',
                message: 'Time is 3:30 PM'
            });
        });

        it('should parse tells with empty messages', () => {
            const msg = 'Player(1): ';
            const messages = FicsProtocol.parseMessage(msg);

            const channelTell = messages[0].data as ChannelTell;
            expect(channelTell.message).toBe('');
        });
    });

    describe('Game End scenarios', () => {
        it('should parse resignation', () => {
            const msg = '{Game 42 (WhitePlayer vs. BlackPlayer) WhitePlayer resigns} 0-1';
            const messages = FicsProtocol.parseMessage(msg);

            const gameEnd = messages[0].data as GameEnd;
            expect(gameEnd.reason).toBe('WhitePlayer resigns');
            expect(gameEnd.result).toBe('0-1');
        });

        it('should parse checkmate', () => {
            const msg = '{Game 100 (Master vs. Student) Master checkmated} 1-0';
            const messages = FicsProtocol.parseMessage(msg);

            const gameEnd = messages[0].data as GameEnd;
            expect(gameEnd.reason).toBe('Master checkmated');
            expect(gameEnd.result).toBe('1-0');
        });

        it('should parse draw by agreement', () => {
            const msg = '{Game 200 (Player1 vs. Player2) Game drawn by mutual agreement} 1/2-1/2';
            const messages = FicsProtocol.parseMessage(msg);

            const gameEnd = messages[0].data as GameEnd;
            expect(gameEnd.reason).toBe('Game drawn by mutual agreement');
            expect(gameEnd.result).toBe('1/2-1/2');
        });

        it('should parse time forfeit', () => {
            const msg = '{Game 300 (SlowPlayer vs. FastPlayer) SlowPlayer forfeits on time} 0-1';
            const messages = FicsProtocol.parseMessage(msg);

            const gameEnd = messages[0].data as GameEnd;
            expect(gameEnd.reason).toBe('SlowPlayer forfeits on time');
        });

        it('should parse disconnection', () => {
            const msg = '{Game 400 (OnlinePlayer vs. OfflinePlayer) OfflinePlayer lost connection; game adjourned} *';
            const messages = FicsProtocol.parseMessage(msg);

            const gameEnd = messages[0].data as GameEnd;
            expect(gameEnd.result).toBe('*');
        });
    });

    describe('Moves List parsing', () => {
        it('should parse complete PGN movesList', () => {
            const msg = `Movelist for game 123:

[Event "FICS rated standard game"]
[Site "freechess.org"]
[Date "2024.01.15"]
[Round "-"]
[White "Player1"]
[Black "Player2"]
[WhiteElo "1500"]
[BlackElo "1600"]
[TimeControl "900+10"]
[Result "1-0"]

1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 1-0`;

            const messages = FicsProtocol.parseMessage(msg);
            expect(messages[0].type).toBe('movesList');

            const movesList = messages[0].data as any;
            expect(movesList.gameNumber).toBe(123);
            expect(movesList.event).toBe('FICS rated standard game');
            expect(movesList.white).toBe('Player1');
            expect(movesList.black).toBe('Player2');
            expect(movesList.result).toBe('1-0');
        });

        it('should handle movesList without PGN headers', () => {
            const msg = 'Movelist for game 456:\n1. d4 d5 2. c4 e6 *';
            const messages = FicsProtocol.parseMessage(msg);

            const movesList = messages[0].data as any;
            expect(movesList.gameNumber).toBe(456);
            expect(movesList.moves).toBeDefined();
        });
    });

    describe('Command Building', () => {
        it('should build complex tell commands', () => {
            const cmd = FicsProtocol.buildTell('Friend', 'Hello! How are you today?');
            expect(cmd).toBe('tell Friend Hello! How are you today?');
        });

        it('should build seek with formula', () => {
            const cmd = FicsProtocol.buildSeek(15, 10, true, 'rating > 1500');
            expect(cmd).toBe('seek 15 10 formula rating > 1500');
        });

        it('should build observe with player name', () => {
            const cmd = FicsProtocol.buildObserve('Kasparov');
            expect(cmd).toBe('observe Kasparov');
        });

        it('should build generic commands', () => {
            const cmd = FicsProtocol.buildCommand('finger', 'username');
            expect(cmd).toBe('finger username');
        });

        it('should handle empty arguments', () => {
            const cmd = FicsProtocol.buildCommand('who');
            expect(cmd).toBe('who');
        });

        it('should build move commands', () => {
            const cmd = FicsProtocol.buildMove('e2e4');
            expect(cmd).toBe('e2e4');
        });
    });

    describe('Message Cleanup - Advanced', () => {
        it('should handle mixed special characters', () => {
            const input = '"Hello" world\'s … test "quoted" text';
            const cleaned = FicsProtocol.cleanupOutgoingMessage(input);
            expect(cleaned).toBe('"Hello" world\'s ... test "quoted" text');
        });

        it('should preserve normal punctuation', () => {
            const input = 'Normal text with punctuation: Hello, world! How are you?';
            const cleaned = FicsProtocol.cleanupOutgoingMessage(input);
            expect(cleaned).toBe(input);
        });

        it('should handle line endings properly', () => {
            const input = 'Line 1\n\rLine 2\n\\Line 3';
            const cleaned = FicsProtocol.cleanupMessage(input);
            expect(cleaned).toBe('Line 1\nLine 2\nLine 3\n');
        });

        it('should filter control characters but keep printable ones', () => {
            const input = 'Hello\x00World\x1F!'; // null, US (unit separator)
            const {filtered, removed} = FicsProtocol.filterInvalidCharacters(input);
            expect(filtered).toBe('HelloWorld!');
            expect(removed).toBe('\x00\x1F');
        });

        it('should handle unicode characters outside ASCII range', () => {
            const input = 'Hello 世界 émoji 🎯 test';
            const {filtered} = FicsProtocol.filterInvalidCharacters(input);
            expect(filtered).toBe('Hello  moji  test'); // Non-ASCII chars removed
        });
    });

    describe('Timeseal Protocol', () => {
        it('should encode and handle timeseal correctly', () => {
            const message = 'tell friend hello';
            const encoded = FicsProtocol.encodeTimeseal(message);

            expect(encoded).toBeInstanceOf(Uint8Array);
            expect(encoded.length).toBeGreaterThan(message.length);
            expect(encoded[encoded.length - 1]).toBe(10); // Should end with LF
            expect(encoded[encoded.length - 2]).toBe(128); // Should have 128 before LF
        });

        it('should handle multiple timeseal acknowledgements', () => {
            const msg = 'Hello[G]\0World[G]\0Test';
            const {cleanedMessage, needsAck} = FicsProtocol.handleTimesealAcknowledgement(msg);

            expect(cleanedMessage).toBe('HelloWorldTest');
            expect(needsAck).toBe(true);
        });

        it('should create proper acknowledgement response', () => {
            const ack = FicsProtocol.createTimesealAck();
            expect(ack).toBeInstanceOf(Uint8Array);
            expect(ack.length).toBeGreaterThan(2);
        });

        it('should handle messages without timeseal markers', () => {
            const msg = 'Normal message without markers';
            const {cleanedMessage, needsAck} = FicsProtocol.handleTimesealAcknowledgement(msg);

            expect(cleanedMessage).toBe(msg);
            expect(needsAck).toBe(false);
        });
    });

    describe('Bell Character Handling', () => {
        it('should detect bell in various positions', () => {
            expect(FicsProtocol.containsBell('\u0007Start')).toBe(true);
            expect(FicsProtocol.containsBell('Middle\u0007Text')).toBe(true);
            expect(FicsProtocol.containsBell('End\u0007')).toBe(true);
            expect(FicsProtocol.containsBell('No bell here')).toBe(false);
        });

        it('should remove multiple bells', () => {
            const msg = 'Alert\u0007\u0007 multiple\u0007 bells\u0007';
            const cleaned = FicsProtocol.removeBell(msg);
            expect(cleaned).toBe('Alert multiple bells');
        });
    });

    describe('Integration Tests', () => {
        it('should handle realistic FICS session flow', () => {
            const sessionMessages = [
                'login: ',
                'password: ',
                '**** Starting FICS session as TestUser ****',
                'Game 100: Player1 (1500) Player2 (1600) rated standard 15 10',
                '<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR W -1 1 1 1 1 0 100 Player1 Player2 -1 15 10 39 39 900 900 1 none (0:00) none 0 0 0',
                'Player1(1): Good luck!',
                'Player2 tells you: Thanks for the game',
                '{Game 100 (Player1 vs. Player2) Player2 checkmated} 1-0'
            ];

            sessionMessages.forEach(msg => {
                const messages = FicsProtocol.parseMessage(msg);
                expect(messages).toHaveLength(1);
                expect(messages[0].type).not.toBe('raw');
            });
        });

        it('should handle complex multi-line messages', () => {
            const complexMsg = `Player(1): Hello everyone!
{Game 200 (White vs. Black) White resigns} 0-1
<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR W -1 1 1 1 1 0 200 White Black -1 15 10 39 39 900 900 1 none (0:00) none 0 0 0
Illegal move (a1a8).
Friend tells you: Good game!`;

            const messages = FicsProtocol.parseMessage(complexMsg);
            expect(messages.length).toBeGreaterThanOrEqual(2);

            const types = messages.map(m => m.type);
            expect(types).toContain('channelTell');
            expect(types).toContain('gameEnd');
        });
    });

    describe('Error Handling', () => {
        it('should handle null and undefined inputs', () => {
            const nullResult = FicsProtocol.parseMessage(null as any);
            const undefinedResult = FicsProtocol.parseMessage(undefined as any);

            expect(nullResult).toHaveLength(1);
            expect(nullResult[0].type).toBe('raw');
            expect(undefinedResult).toHaveLength(1);
            expect(undefinedResult[0].type).toBe('raw');
        });

        it('should handle very long messages', () => {
            const longMsg = 'A'.repeat(10000);
            const messages = FicsProtocol.parseMessage(longMsg);
            expect(messages).toHaveLength(1);
            expect(messages[0].type).toBe('raw');
        });

        it('should handle messages with only special characters', () => {
            const specialMsg = '\u0007\u001F\u0000';
            const messages = FicsProtocol.parseMessage(specialMsg);
            expect(messages).toHaveLength(1);
        });
    });
});