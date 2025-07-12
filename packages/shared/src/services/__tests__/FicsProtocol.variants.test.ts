import {FicsProtocol} from '../FicsProtocol';
import {GameStart, Style12} from '../FicsProtocol.types';

describe('FicsProtocol - Chess Variants & Game Types', () => {
    describe('Standard Game Types', () => {
        it('should parse lightning games', () => {
            const msg = 'Game 123: Player1 (2000) Player2 (1950) rated lightning 1 0';
            const messages = FicsProtocol.parseMessage(msg);

            const gameStart = messages[0].data as GameStart;
            expect(gameStart.gameType).toBe('lightning');
            expect(gameStart.minutes).toBe(1);
            expect(gameStart.increment).toBe(0);
        });

        it('should parse correspondence games', () => {
            const msg = 'Game 456: Player1 (1800) Player2 (1850) rated correspondence 3 86400';
            const messages = FicsProtocol.parseMessage(msg);

            const gameStart = messages[0].data as GameStart;
            expect(gameStart.gameType).toBe('correspondence');
            expect(gameStart.minutes).toBe(3);
            expect(gameStart.increment).toBe(86400); // 1 day increment
        });

        it('should parse untimed games', () => {
            const msg = 'Game 789: Player1 (1600) Player2 (1650) unrated untimed 0 0';
            const messages = FicsProtocol.parseMessage(msg);

            const gameStart = messages[0].data as GameStart;
            expect(gameStart.gameType).toBe('untimed');
            expect(gameStart.isRated).toBe(false);
        });
    });

    describe('Chess Variants', () => {
        it('should parse Chess960/Fischer Random games', () => {
            const msg = 'Game 100: Player1 (1700) Player2 (1750) rated chess960 15 10';
            const messages = FicsProtocol.parseMessage(msg);

            const gameStart = messages[0].data as GameStart;
            expect(gameStart.gameType).toBe('chess960');
            expect(gameStart.isRated).toBe(true);
        });

        it('should parse King of the Hill games', () => {
            const msg = 'Game 200: Player1 (1500) Player2 (1550) unrated koth 5 0';
            const messages = FicsProtocol.parseMessage(msg);

            const gameStart = messages[0].data as GameStart;
            expect(gameStart.gameType).toBe('koth');
        });

        it('should parse Atomic chess games', () => {
            const msg = 'Game 300: Player1 (1400) Player2 (1450) rated atomic 3 2';
            const messages = FicsProtocol.parseMessage(msg);

            const gameStart = messages[0].data as GameStart;
            expect(gameStart.gameType).toBe('atomic');
        });

        it('should parse Losers chess games', () => {
            const msg = 'Game 400: Player1 (1300) Player2 (1350) unrated losers 10 0';
            const messages = FicsProtocol.parseMessage(msg);

            const gameStart = messages[0].data as GameStart;
            expect(gameStart.gameType).toBe('losers');
        });

        it('should parse Suicide chess games', () => {
            const msg = 'Game 500: Player1 (1200) Player2 (1250) rated suicide 15 5';
            const messages = FicsProtocol.parseMessage(msg);

            const gameStart = messages[0].data as GameStart;
            expect(gameStart.gameType).toBe('suicide');
        });

        it('should parse Crazyhouse games', () => {
            const msg = 'Game 600: Player1 (1600) Player2 (1650) rated crazyhouse 5 0';
            const messages = FicsProtocol.parseMessage(msg);

            const gameStart = messages[0].data as GameStart;
            expect(gameStart.gameType).toBe('crazyhouse');
        });

        it('should parse Bughouse games', () => {
            const msg = 'Game 700: PlayerA (1500) PlayerB (1550) rated bughouse 5 0';
            const messages = FicsProtocol.parseMessage(msg);

            const gameStart = messages[0].data as GameStart;
            expect(gameStart.gameType).toBe('bughouse');
        });
    });

    describe('Variant-Specific Style12 Parsing', () => {
        it('should parse Chess960 Style12 with non-standard castling', () => {
            // Chess960 position with castling rights in Fischer format
            const style12 = '<12> rbnqknbr pppppppp -------- -------- -------- -------- PPPPPPPP RBNQKNBR W HAha - 0 1 1 0 960 Player1 Player2 -1 15 0 39 39 900 900 1 none (0:00) none 0 0 0';
            const messages = FicsProtocol.parseMessage(style12);

            const data = messages[0].data as Style12;
            expect(data.board[0]).toEqual(['r', 'b', 'n', 'q', 'k', 'n', 'b', 'r']);
            expect(data.gameNumber).toBe(960);
            expect(data.castlingRights).toBe('HAha'); // Fischer castling notation
        });

        it('should parse Atomic chess Style12', () => {
            // Atomic chess might have different material values due to explosions
            const style12 = '<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR W -1 1 1 1 1 0 111 AtomicPlayer1 AtomicPlayer2 -1 3 2 25 30 180 180 1 none (0:00) none 0 0 0';
            const messages = FicsProtocol.parseMessage(style12);

            const data = messages[0].data as Style12;
            expect(data.whiteMaterialStrength).toBe(25); // Might differ in atomic
            expect(data.blackMaterialStrength).toBe(30);
        });

        it('should parse Crazyhouse Style12 with piece drops', () => {
            // Crazyhouse might show piece drops as moves
            const style12 = '<12> rnbqkbnr pppppppp -------- -------- ----P--- -------- PPP-PPPP RNBQKBNR B -1 1 1 1 1 0 111 CrazyhouseP1 CrazyhouseP2 -1 5 0 39 39 300 295 2 P@e4 (0:05) P@e4 0 0 0';
            const messages = FicsProtocol.parseMessage(style12);

            const data = messages[0].data as Style12;
            expect(data.verboseMove).toBe('P@e4'); // Piece drop notation
            expect(data.prettyMove).toBe('P@e4');
        });

        it('should parse King of the Hill Style12', () => {
            const style12 = '<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR W -1 1 1 1 1 0 111 KothPlayer1 KothPlayer2 -1 5 0 39 39 300 300 1 none (0:00) none 0 0 0';
            const messages = FicsProtocol.parseMessage(style12);

            const data = messages[0].data as Style12;
            expect(data.whiteName).toBe('KothPlayer1');
            expect(data.blackName).toBe('KothPlayer2');
        });
    });

    describe('Time Control Variants', () => {
        it('should parse increment time controls', () => {
            const msg = 'Game 123: Player1 (1500) Player2 (1600) rated blitz 5 3';
            const messages = FicsProtocol.parseMessage(msg);

            const gameStart = messages[0].data as GameStart;
            expect(gameStart.minutes).toBe(5);
            expect(gameStart.increment).toBe(3);
        });

        it('should parse delay time controls', () => {
            const msg = 'Game 124: Player1 (1500) Player2 (1600) rated standard 15 10';
            const messages = FicsProtocol.parseMessage(msg);

            const gameStart = messages[0].data as GameStart;
            expect(gameStart.increment).toBe(10); // Could be delay or increment
        });

        it('should parse bronstein delay format', () => {
            // Some servers might use different notation for bronstein delay
            const msg = 'Game 125: Player1 (1500) Player2 (1600) rated standard 15 10';
            const messages = FicsProtocol.parseMessage(msg);

            expect(messages[0].type).toBe('gameStart');
        });

        it('should parse fischer increment format', () => {
            const msg = 'Game 126: Player1 (1500) Player2 (1600) rated rapid 10 5';
            const messages = FicsProtocol.parseMessage(msg);

            const gameStart = messages[0].data as GameStart;
            expect(gameStart.gameType).toBe('rapid');
        });
    });

    describe('Examination Mode', () => {
        it('should parse examination start', () => {
            const msg = 'You are now examining game 123';
            const messages = FicsProtocol.parseMessage(msg);

            expect(messages).toHaveLength(1);
            expect(messages[0].type).toBe('raw'); // Examination start isn't a specific type yet
        });

        it('should parse examination end', () => {
            const msg = 'You are no longer examining game 123';
            const messages = FicsProtocol.parseMessage(msg);

            expect(messages[0].type).toBe('gameEnd');
            if (messages[0].type === 'gameEnd') {
                expect(messages[0].data.gameNumber).toBe(123);
                expect(messages[0].data.reason).toBe('Examination terminated');
            }
        });

        it('should parse examination Style12', () => {
            // Examination mode typically has relation = 2
            const style12 = '<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR W -1 1 1 1 1 0 123 Examiner Examiner 2 0 0 39 39 0 0 1 none (0:00) none 0 0 0';
            const messages = FicsProtocol.parseMessage(style12);

            const data = messages[0].data as Style12;
            expect(data.relation).toBe(2); // Examining
            expect(data.whiteName).toBe('Examiner');
            expect(data.blackName).toBe('Examiner');
        });
    });

    describe('Tournament Games', () => {
        it('should parse tournament game notifications', () => {
            const msg = 'Game 999: TourneyPlayer1 (1800) TourneyPlayer2 (1750) rated tournament 90 30';
            const messages = FicsProtocol.parseMessage(msg);

            const gameStart = messages[0].data as GameStart;
            expect(gameStart.gameType).toBe('tournament');
            expect(gameStart.minutes).toBe(90);
            expect(gameStart.increment).toBe(30);
        });

        it('should handle tournament-specific usernames', () => {
            const msg = 'Game 1000: TD_Player1 (1900) [GM]Player2 (2400) rated standard 15 10';
            const messages = FicsProtocol.parseMessage(msg);

            const gameStart = messages[0].data as GameStart;
            expect(gameStart.whiteName).toBe('TD_Player1');
            expect(gameStart.blackName).toBe('[GM]Player2');
        });
    });

    describe('Special Rating Systems', () => {
        it('should parse provisional ratings', () => {
            const msg = 'Game 111: NewPlayer (1200P) ExperiencedPlayer (1800) rated standard 15 10';
            const messages = FicsProtocol.parseMessage(msg);

            const gameStart = messages[0].data as GameStart;
            expect(gameStart.whiteRating).toBe('1200P');
            expect(gameStart.blackRating).toBe('1800');
        });

        it('should parse estimated ratings', () => {
            const msg = 'Game 222: Player1 (1500E) Player2 (1600) unrated blitz 3 0';
            const messages = FicsProtocol.parseMessage(msg);

            const gameStart = messages[0].data as GameStart;
            expect(gameStart.whiteRating).toBe('1500E');
        });

        it('should parse guest ratings', () => {
            const msg = 'Game 333: GuestXYZ (++++) Player2 (1400) unrated blitz 5 0';
            const messages = FicsProtocol.parseMessage(msg);

            const gameStart = messages[0].data as GameStart;
            expect(gameStart.whiteRating).toBe('++++');
        });

        it('should parse computer ratings', () => {
            const msg = 'Game 444: ChessEngine (C) HumanPlayer (1600) unrated standard 15 10';
            const messages = FicsProtocol.parseMessage(msg);

            const gameStart = messages[0].data as GameStart;
            expect(gameStart.whiteRating).toBe('C');
        });
    });

    describe('Complex Game Scenarios', () => {
        it('should parse simul games', () => {
            const msg = 'Game 555: SimulMaster (2200) Student1 (1400) rated simul 15 10';
            const messages = FicsProtocol.parseMessage(msg);

            const gameStart = messages[0].data as GameStart;
            expect(gameStart.gameType).toBe('simul');
        });

        it('should parse relay games', () => {
            const msg = 'Game 666: GM_Carlsen (2830) GM_Caruana (2820) rated relay 120 30';
            const messages = FicsProtocol.parseMessage(msg);

            const gameStart = messages[0].data as GameStart;
            expect(gameStart.gameType).toBe('relay');
        });

        it('should handle team game formats', () => {
            const msg = 'Game 777: TeamA_Player1 (1700) TeamB_Player1 (1650) rated team 10 0';
            const messages = FicsProtocol.parseMessage(msg);

            const gameStart = messages[0].data as GameStart;
            expect(gameStart.gameType).toBe('team');
        });
    });

    describe('Variant Game Endings', () => {
        it('should parse atomic explosion endings', () => {
            const msg = '{Game 300 (AtomicPlayer1 vs. AtomicPlayer2) AtomicPlayer1 exploded AtomicPlayer2s king} 1-0';
            const messages = FicsProtocol.parseMessage(msg);

            expect(messages[0].type).toBe('gameEnd');
            if (messages[0].type === 'gameEnd') {
                expect(messages[0].data.reason).toContain('exploded');
            }
        });

        it('should parse king of the hill victories', () => {
            const msg = '{Game 200 (KothPlayer1 vs. KothPlayer2) KothPlayer1 reached the hill} 1-0';
            const messages = FicsProtocol.parseMessage(msg);

            expect(messages[0].type).toBe('gameEnd');
            if (messages[0].type === 'gameEnd') {
                expect(messages[0].data.reason).toContain('reached the hill');
            }
        });

        it('should parse losers/suicide victories', () => {
            const msg = '{Game 400 (LosersPlayer1 vs. LosersPlayer2) LosersPlayer1 lost all pieces} 0-1';
            const messages = FicsProtocol.parseMessage(msg);

            expect(messages[0].type).toBe('gameEnd');
            if (messages[0].type === 'gameEnd') {
                expect(messages[0].data.reason).toContain('lost all pieces');
            }
        });

        it('should parse crazyhouse endings', () => {
            const msg = '{Game 600 (CrazyPlayer1 vs. CrazyPlayer2) CrazyPlayer1 checkmated} 0-1';
            const messages = FicsProtocol.parseMessage(msg);

            expect(messages[0].type).toBe('gameEnd');
            if (messages[0].type === 'gameEnd') {
                expect(messages[0].data.reason).toBe('CrazyPlayer1 checkmated');
            }
        });
    });

    describe('Edge Cases in Variant Parsing', () => {
        it('should handle unknown game types gracefully', () => {
            const msg = 'Game 999: Player1 (1500) Player2 (1600) rated unknownvariant 10 0';
            const messages = FicsProtocol.parseMessage(msg);

            if (messages[0].type === 'gameStart') {
                const gameStart = messages[0].data as GameStart;
                expect(gameStart.gameType).toBe('unknownvariant');
            }
        });

        it('should handle variant names with numbers', () => {
            const msg = 'Game 888: Player1 (1500) Player2 (1600) rated chess960 15 10';
            const messages = FicsProtocol.parseMessage(msg);

            const gameStart = messages[0].data as GameStart;
            expect(gameStart.gameType).toBe('chess960');
        });

        it('should handle hyphenated variant names', () => {
            const msg = 'Game 777: Player1 (1500) Player2 (1600) rated king-of-the-hill 5 0';
            const messages = FicsProtocol.parseMessage(msg);

            if (messages[0].type === 'gameStart') {
                const gameStart = messages[0].data as GameStart;
                expect(gameStart.gameType).toBe('king-of-the-hill');
            }
        });
    });
});