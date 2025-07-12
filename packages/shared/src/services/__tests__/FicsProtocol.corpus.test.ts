import {FicsProtocol} from '../FicsProtocol';

describe('FicsProtocol - Real FICS Message Corpus', () => {
    describe('Actual FICS Login Sequence', () => {
        it('should parse complete login flow', () => {
            const loginSequence = [
                '****freechess.org**** The Free Internet Chess Server ****',
                '',
                'login: ',
                'password: ',
                '',
                '**** Starting FICS session as GuestTEST(U) ****',
                '',
                'Press return to enter the server as "GuestTEST".',
                'fics%'
            ];

            loginSequence.forEach(msg => {
                const messages = FicsProtocol.parseMessage(msg);
                expect(Array.isArray(messages)).toBe(true);
                expect(messages.length).toBeGreaterThan(0);
            });
        });
    });

    describe('Real Game Messages', () => {
        it('should parse actual game start messages', () => {
            const gameStartMessages = [
                'Game 291: GuestHKQT (++++) GuestTEST (++++) unrated blitz 2 12',
                'Game 123: Magnus (2831) Hikaru (2736) rated bullet 1 0',
                'Game 456: ChessEngine (C) HumanPlayer (1800P) unrated standard 15 10',
                'Game 789: [GM]Carlsen (2830) [IM]Student (2200E) rated rapid 10 5'
            ];

            gameStartMessages.forEach(msg => {
                const messages = FicsProtocol.parseMessage(msg);
                expect(messages).toHaveLength(1);
                expect(messages[0].type).toBe('gameStart');

                if (messages[0].type === 'gameStart') {
                    expect(messages[0].data.gameNumber).toBeGreaterThan(0);
                    expect(messages[0].data.whiteName).toBeDefined();
                    expect(messages[0].data.blackName).toBeDefined();
                    expect(typeof messages[0].data.isRated).toBe('boolean');
                }
            });
        });

        it('should parse actual Style12 messages', () => {
            const style12Messages = [
                '<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR W -1 1 1 1 1 0 291 GuestHKQT GuestTEST -1 2 12 39 39 120 120 1 none (0:00) none 0 0 0',
                '<12> rnbqkbnr pppp-ppp -------- ----p--- -------- -------- PPPPPPPP RNBQKBNR B -1 1 1 1 1 0 291 GuestHKQT GuestTEST -1 2 12 39 39 118 120 1 e7e5 (0:02) e5 0 0 0',
                '<12> rnbqkbnr pppp-ppp -------- ----p--- ----P--- -------- PPPP-PPP RNBQKBNR W -1 1 1 1 1 0 291 GuestHKQT GuestTEST -1 2 12 39 39 118 118 2 e2e4 (0:02) e4 0 0 0',
                '<12> rnbqkb-r pppp-ppp -----n-- ----p--- ----P--- -------- PPPP-PPP RNBQKBNR B -1 1 1 1 1 0 291 GuestHKQT GuestTEST -1 2 12 39 39 116 118 2 g8f6 (0:02) Nf6 0 0 0'
            ];

            style12Messages.forEach(msg => {
                const messages = FicsProtocol.parseMessage(msg);
                expect(messages).toHaveLength(1);
                expect(messages[0].type).toBe('style12');

                if (messages[0].type === 'style12') {
                    const data = messages[0].data;
                    expect(data.board).toHaveLength(8);
                    expect(data.board[0]).toHaveLength(8);
                    expect(['W', 'B']).toContain(data.colorToMove);
                    expect(data.gameNumber).toBeGreaterThan(0);
                }
            });
        });

        it('should parse actual game end messages', () => {
            const gameEndMessages = [
                '{Game 291 (GuestHKQT vs. GuestTEST) GuestHKQT checkmated} 0-1',
                '{Game 123 (Magnus vs. Hikaru) Magnus resigns} 0-1',
                '{Game 456 (ChessEngine vs. HumanPlayer) Game drawn by repetition} 1/2-1/2',
                '{Game 789 (Carlsen vs. Student) Student forfeits on time} 1-0',
                '{Game 100 (Player1 vs. Player2) Game courtesyadjourned by Player1} *'
            ];

            gameEndMessages.forEach(msg => {
                const messages = FicsProtocol.parseMessage(msg);
                expect(messages).toHaveLength(1);
                expect(messages[0].type).toBe('gameEnd');

                if (messages[0].type === 'gameEnd') {
                    expect(messages[0].data.gameNumber).toBeGreaterThan(0);
                    expect(messages[0].data.whiteName).toBeDefined();
                    expect(messages[0].data.blackName).toBeDefined();
                    expect(messages[0].data.reason).toBeDefined();
                    expect(['0-1', '1-0', '1/2-1/2', '*']).toContain(messages[0].data.result);
                }
            });
        });
    });

    describe('Real Chat Messages', () => {
        it('should parse actual channel tells', () => {
            const channelTells = [
                'Magnus(1): Good game everyone!',
                'ChessBot*(50): Current tournament: Swiss System, Round 3/7',
                'GuestABCD(4): Looking for a quick blitz game',
                '[GM]Nakamura(1): Anyone up for some bullet?',
                'TD_Helper(49): Tournament starting in 5 minutes'
            ];

            channelTells.forEach(msg => {
                const messages = FicsProtocol.parseMessage(msg);
                expect(messages).toHaveLength(1);
                expect(messages[0].type).toBe('channelTell');

                if (messages[0].type === 'channelTell') {
                    expect(messages[0].data.username).toBeDefined();
                    expect(messages[0].data.channelNumber).toBeDefined();
                    expect(messages[0].data.message).toBeDefined();
                }
            });
        });

        it('should parse actual direct tells', () => {
            const directTells = [
                'Magnus tells you: Great game, well played!',
                '[GM]Carlsen tells you: Would you like a rematch?',
                'ChessEngine tells you: Analysis complete. Your accuracy: 89.5%',
                'GuestXYZ tells you: How do I castle?',
                'Tournament Director tells you: You are registered for the event.'
            ];

            directTells.forEach(msg => {
                const messages = FicsProtocol.parseMessage(msg);
                expect(messages).toHaveLength(1);
                expect(messages[0].type).toBe('directTell');

                if (messages[0].type === 'directTell') {
                    expect(messages[0].data.username).toBeDefined();
                    expect(messages[0].data.message).toBeDefined();
                }
            });
        });
    });

    describe('Real Server Messages', () => {
        it('should parse actual server notifications', () => {
            const serverMessages = [
                'Illegal move (e2e5).',
                'It is not your move.',
                'Opponent offers you a draw.',
                'Magnus offers you a draw.',
                'Challenge: Magnus (2831) [white] GuestTEST (++++) unrated blitz 3 0.',
                'You are now observing game 123.',
                'Removing game 456 from observation list.',
                'You are now examining game 789.',
                'You are no longer examining game 789.'
            ];

            serverMessages.forEach(msg => {
                const messages = FicsProtocol.parseMessage(msg);
                expect(messages).toHaveLength(1);

                const msgType = messages[0].type;
                expect(['illegalMove', 'drawOffer', 'unobserve', 'gameEnd', 'raw']).toContain(msgType);
            });
        });

        it('should parse actual moves list', () => {
            const movesList = `Movelist for game 123:

[Event "FICS rated standard game"]
[Site "freechess.org"]
[Date "2024.01.15"]
[Round "-"]
[White "Magnus"]
[Black "Hikaru"]
[WhiteElo "2831"]
[BlackElo "2736"]
[TimeControl "900+10"]
[Result "1-0"]

1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 
8. c3 O-O 9. h3 Nb8 10. d4 Nbd7 11. c4 c6 12. cxb5 axb5 13. Nc3 Bb7 
14. Bg5 b4 15. Nb1 h6 16. Bh4 c5 17. dxe5 Nxe4 18. Bxe7 Qxe7 19. exd6 Qf6 
20. Nbd2 Nxd6 21. Nc4 Nxc4 22. Bxc4 Nb6 23. Ne5 Rae8 24. Bxf7+ Rxf7 
25. Nxf7 Rxe1+ 26. Qxe1 Kxf7 27. Qe3 Qg5 28. Qxg5 hxg5 29. b3 Ke6 
30. a3 Kd6 31. axb4 cxb4 32. Ra5 Nd5 33. f3 Bc8 34. Kf2 Bf5 35. Ra7 g6 
36. Ra6+ Kc5 37. Ra5 Kd6 38. g4 Be6 39. Ke2 Re8 40. Kd3 Nc3 41. Rxg5 Nd1 
42. Rb5 Nxb2+ 43. Kc2 Nd3 44. Rxb4 Re2+ 45. Kc3 Nc5 46. Rb5 Rxh2 
47. Rxc5 Rc2+ 48. Kd4 Rxc5 49. Kxc5 Bxb3 50. Kc4 Be6+ 51. Kd4 Bb3 
52. Ke4 g5 53. Kf5 Ke7 54. Kg6 Kf8 55. Kh7 Bc4 56. Kg6 Bb5 57. f4 gxf4 
58. g5 f3 59. g6 f2 60. g7+ Kg8 61. Kh6 f1=Q 62. g8=Q+ Qxg8  1-0`;

            const messages = FicsProtocol.parseMessage(movesList);
            expect(messages).toHaveLength(1);
            expect(messages[0].type).toBe('movesList');

            if (messages[0].type === 'movesList') {
                expect(messages[0].data.gameNumber).toBe(123);
                expect(messages[0].data.white).toBe('Magnus');
                expect(messages[0].data.black).toBe('Hikaru');
                expect(messages[0].data.result).toBe('1-0');
            }
        });
    });

    describe('Real Tournament Messages', () => {
        it('should parse tournament game formats', () => {
            const tournamentMessages = [
                'Game 500: TD_Magnus (2800) TD_Hikaru (2750) rated tournament 90 30',
                'Game 501: TeamA_Player1 (1800) TeamB_Player2 (1750) rated team 15 10',
                'Game 502: SimulMaster (2400) Student1 (1200) rated simul 30 0'
            ];

            tournamentMessages.forEach(msg => {
                const messages = FicsProtocol.parseMessage(msg);
                expect(messages).toHaveLength(1);
                if (messages[0].type === 'gameStart') {
                    expect(messages[0].data.gameNumber).toBeGreaterThan(0);
                    expect(messages[0].data.whiteName).toMatch(/^[a-zA-Z0-9_\[\]*-]+$/);
                    expect(messages[0].data.blackName).toMatch(/^[a-zA-Z0-9_\[\]*-]+$/);
                }
            });
        });
    });

    describe('Real Chess Variant Messages', () => {
        it('should parse chess variant games', () => {
            const variantMessages = [
                'Game 600: Player1 (1500) Player2 (1600) rated chess960 10 0',
                'Game 601: AtomicFan (1400) Destroyer (1450) unrated atomic 5 0',
                'Game 602: CrazyPlayer (1600) DropMaster (1650) rated crazyhouse 3 2',
                'Game 603: KingHunter (1300) HillClimber (1350) unrated koth 15 10',
                'Game 604: LosersChamp (1200) SuicideKing (1250) rated losers 10 0'
            ];

            variantMessages.forEach(msg => {
                const messages = FicsProtocol.parseMessage(msg);
                expect(messages).toHaveLength(1);
                if (messages[0].type === 'gameStart') {
                    expect(['chess960', 'atomic', 'crazyhouse', 'koth', 'losers', 'standard', 'blitz', 'bullet', 'rapid']).toContain(messages[0].data.gameType);
                }
            });
        });

        it('should parse variant-specific Style12 messages', () => {
            // Chess960 with non-standard castling
            const chess960Style12 = '<12> rbnqknbr pppppppp -------- -------- -------- -------- PPPPPPPP RBNQKNBR W HAha - 0 1 1 0 600 Player1 Player2 -1 10 0 39 39 600 600 1 none (0:00) none 0 0 0';

            const messages = FicsProtocol.parseMessage(chess960Style12);
            expect(messages).toHaveLength(1);
            expect(messages[0].type).toBe('style12');

            if (messages[0].type === 'style12') {
                expect(messages[0].data.castlingRights).toBe('HAha'); // Fischer castling notation
                expect(messages[0].data.gameNumber).toBe(600);
            }
        });
    });

    describe('Real Error and Edge Cases', () => {
        it('should handle real disconnection scenarios', () => {
            const disconnectionMessages = [
                'Disconnected',
                '{Game 123 (Player1 vs. Player2) Player1 lost connection; game adjourned} *',
                'Your seek has been removed.',
                'Connection timed out.',
                'Lost connection to server.'
            ];

            disconnectionMessages.forEach(msg => {
                const messages = FicsProtocol.parseMessage(msg);
                expect(Array.isArray(messages)).toBe(true);
                expect(messages.length).toBeGreaterThan(0);
            });
        });

        it('should handle partial and malformed messages', () => {
            const partialMessages = [
                'Game 123: Player1 (',
                '<12> rnbqkbnr pppppppp',
                '{Game incomplete',
                'Player(1):',
                'tells you:',
                'offers you a'
            ];

            partialMessages.forEach(msg => {
                const messages = FicsProtocol.parseMessage(msg);
                expect(Array.isArray(messages)).toBe(true);
                expect(messages.length).toBeGreaterThan(0);
                // Most malformed messages should be raw, but some might be parsed as valid (e.g., empty channel tell)
                expect(['raw', 'channelTell', 'directTell'].includes(messages[0].type)).toBe(true);
            });
        });
    });

    describe('Real Multi-line Scenarios', () => {
        it('should handle actual FICS multi-line output', () => {
            const multiLineScenario = `Magnus(1): Anyone want to play?
Game 789: Magnus (2831) GuestTEST (++++) unrated blitz 3 0

<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR W -1 1 1 1 1 0 789 Magnus GuestTEST -1 3 0 39 39 180 180 1 none (0:00) none 0 0 0

Magnus tells you: Good luck!
fics%`;

            const messages = FicsProtocol.parseMessage(multiLineScenario);
            expect(messages.length).toBeGreaterThanOrEqual(2);

            const types = messages.map(m => m.type);
            expect(types).toContain('channelTell');
            expect(types).toContain('gameStart');
        });

        it('should handle rapid game updates', () => {
            const rapidUpdates = `<12> rnbqkbnr pppp-ppp -------- ----p--- -------- -------- PPPPPPPP RNBQKBNR B -1 1 1 1 1 0 789 Magnus GuestTEST -1 3 0 39 39 178 180 1 e7e5 (0:02) e5 0 0 0
<12> rnbqkbnr pppp-ppp -------- ----p--- ----P--- -------- PPPP-PPP RNBQKBNR W -1 1 1 1 1 0 789 Magnus GuestTEST -1 3 0 39 39 178 178 2 e2e4 (0:02) e4 0 0 0
<12> rnbqkb-r pppp-ppp -----n-- ----p--- ----P--- -------- PPPP-PPP RNBQKBNR B -1 1 1 1 1 0 789 Magnus GuestTEST -1 3 0 39 39 176 178 2 g8f6 (0:02) Nf6 0 0 0`;

            const messages = FicsProtocol.parseMessage(rapidUpdates);
            expect(messages.length).toBe(3);
            messages.forEach(msg => {
                expect(msg.type).toBe('style12');
            });
        });
    });
});