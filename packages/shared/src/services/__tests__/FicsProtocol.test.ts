import {FicsProtocol} from '../FicsProtocol';

describe('FicsProtocol', () => {
    describe('parseMessage', () => {
        it('should parse login prompt', () => {
            const messages = FicsProtocol.parseMessage('login: ');
            expect(messages).toHaveLength(1);
            expect(messages[0].type).toBe('login');
        });

        it('should parse password prompt', () => {
            const messages = FicsProtocol.parseMessage('password: ');
            expect(messages).toHaveLength(1);
            expect(messages[0].type).toBe('password');
        });

        it('should parse session start', () => {
            const messages = FicsProtocol.parseMessage('**** Starting FICS session as TestUser');
            expect(messages).toHaveLength(1);
            expect(messages[0].type).toBe('sessionStart');
            expect(messages[0].data).toEqual({username: 'TestUser'});
        });

        it('should parse channel tell', () => {
            const messages = FicsProtocol.parseMessage('Player(1): Hello channel!');
            expect(messages).toHaveLength(1);
            expect(messages[0].type).toBe('channelTell');
            expect(messages[0].data).toEqual({
                username: 'Player',
                channelNumber: '1',
                message: 'Hello channel!'
            });
        });

        it('should parse direct tell', () => {
            const messages = FicsProtocol.parseMessage('Friend tells you: Hi there!');
            expect(messages).toHaveLength(1);
            expect(messages[0].type).toBe('directTell');
            expect(messages[0].data).toEqual({
                username: 'Friend',
                message: 'Hi there!'
            });
        });

        it('should parse game start (observing)', () => {
            const msg = 'Game 123: Player1 (1500) Player2 (1600) rated standard 15 10';
            const messages = FicsProtocol.parseMessage(msg);
            expect(messages).toHaveLength(1);
            expect(messages[0].type).toBe('gameStart');
            expect(messages[0].data).toEqual({
                gameNumber: 123,
                whiteName: 'Player1',
                whiteRating: '1500',
                blackName: 'Player2',
                blackRating: '1600',
                isRated: true,
                gameType: 'standard',
                minutes: 15,
                increment: 10
            });
        });

        it('should parse illegal move', () => {
            const messages = FicsProtocol.parseMessage('Illegal move (e2e5).');
            expect(messages).toHaveLength(1);
            expect(messages[0].type).toBe('illegalMove');
            expect(messages[0].data).toEqual({move: 'e2e5'});
        });

        it('should parse draw offer', () => {
            const messages = FicsProtocol.parseMessage('Opponent offers you a draw.');
            expect(messages).toHaveLength(1);
            expect(messages[0].type).toBe('drawOffer');
            expect(messages[0].data).toEqual({username: 'Opponent'});
        });

        it('should parse game end', () => {
            const msg = '{Game 42 (White vs. Black) White resigns} 0-1';
            const messages = FicsProtocol.parseMessage(msg);
            expect(messages).toHaveLength(1);
            expect(messages[0].type).toBe('gameEnd');
            expect(messages[0].data).toEqual({
                gameNumber: 42,
                whiteName: 'White',
                blackName: 'Black',
                reason: 'White resigns',
                result: '0-1'
            });
        });

        it('should parse examination end', () => {
            const messages = FicsProtocol.parseMessage('You are no longer examining game 29');
            expect(messages).toHaveLength(1);
            expect(messages[0].type).toBe('gameEnd');
            expect(messages[0].data).toEqual({
                gameNumber: 29,
                whiteName: 'examiner',
                blackName: 'examiner',
                reason: 'Examination terminated',
                result: '*'
            });
        });

        it('should parse unobserve', () => {
            const messages = FicsProtocol.parseMessage('Removing game 38 from observation list.');
            expect(messages).toHaveLength(1);
            expect(messages[0].type).toBe('unobserve');
            expect(messages[0].data).toEqual({gameNumber: 38});
        });

        it('should parse Style12', () => {
            const style12 = '<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR W -1 1 1 1 1 0 111 TestWhite TestBlack -1 2 12 39 39 119 122 1 none (0:00) none 0 0 0';
            const messages = FicsProtocol.parseMessage(style12);
            expect(messages).toHaveLength(1);
            expect(messages[0].type).toBe('style12');

            const data = messages[0].data as any;
            expect(data.board).toHaveLength(8);
            expect(data.board[0]).toEqual(['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r']);
            expect(data.colorToMove).toBe('W');
            expect(data.whiteName).toBe('TestWhite');
            expect(data.blackName).toBe('TestBlack');
        });
    });

    describe('command building', () => {
        it('should build tell command', () => {
            const cmd = FicsProtocol.buildTell('Friend', 'Hello!');
            expect(cmd).toBe('tell Friend Hello!');
        });

        it('should build channel tell command', () => {
            const cmd = FicsProtocol.buildChannelTell(1, 'Hello channel!');
            expect(cmd).toBe('tell 1 Hello channel!');
        });

        it('should build observe command', () => {
            const cmd = FicsProtocol.buildObserve('Player1');
            expect(cmd).toBe('observe Player1');
        });

        it('should build observe command with game number', () => {
            const cmd = FicsProtocol.buildObserve(123);
            expect(cmd).toBe('observe 123');
        });

        it('should build seek command', () => {
            const cmd = FicsProtocol.buildSeek(5, 0, true);
            expect(cmd).toBe('seek 5 0');
        });

        it('should build unrated seek command', () => {
            const cmd = FicsProtocol.buildSeek(3, 2, false);
            expect(cmd).toBe('seek 3 2 unrated');
        });
    });

    describe('message cleanup', () => {
        it('should cleanup incoming messages', () => {
            const cleaned = FicsProtocol.cleanupMessage("test\n\rmessage\n\\");
            expect(cleaned).toBe("test\nmessage\n");
        });

        it('should cleanup outgoing messages', () => {
            const cleaned = FicsProtocol.cleanupOutgoingMessage('\u201CHello\u201D world\u2019s \u2026 test');
            expect(cleaned).toBe('"Hello" world\'s ... test');
        });

        it('should filter invalid characters', () => {
            const {filtered, removed} = FicsProtocol.filterInvalidCharacters('Hello\x00World\x1F!');
            expect(filtered).toBe('HelloWorld!');
            expect(removed).toBe('\x00\x1F');
        });

        it('should detect and remove bell character', () => {
            const msg = 'Alert\u0007 message';
            expect(FicsProtocol.containsBell(msg)).toBe(true);
            expect(FicsProtocol.removeBell(msg)).toBe('Alert message');
        });
    });

    describe('timeseal', () => {
        it('should get timeseal config', () => {
            const config = FicsProtocol.getTimesealConfig();
            expect(config.connectString).toBe('TIMESEAL2|openseal|simpleficsinterface|');
            expect(config.key).toBe('Timestamp (FICS) v1.0 - programmed by Henrik Gram.');
        });

        it('should handle timeseal acknowledgement', () => {
            const msg = 'Hello[G]\0World';
            const {cleanedMessage, needsAck} = FicsProtocol.handleTimesealAcknowledgement(msg);
            expect(cleanedMessage).toBe('HelloWorld');
            expect(needsAck).toBe(true);
        });

        it('should encode timeseal message', () => {
            const encoded = FicsProtocol.encodeTimeseal('test');
            expect(encoded).toBeInstanceOf(Uint8Array);
            expect(encoded.length).toBeGreaterThan(4); // Original message + timestamp + padding
        });
    });
});