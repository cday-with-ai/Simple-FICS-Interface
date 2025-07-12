import {
    style12ToFen,
    toAlgebraicSquare,
    toRankFile,
    fileNumberToAlgebraic,
    parseVerboseMove,
    getPieceAtSquare,
    convertToUnicodeChessPieces,
    startEndToAlgebraic,
    ficsMoveToStartEndArray,
    regexIndexOf,
    longAlgebraicToDisplaySAN
} from '../utils';

describe('Utility Functions', () => {
    describe('style12ToFen', () => {
        it('should convert style12 to FEN correctly', () => {
            const style12 = '<12> rnbqkb-r pppppppp -----n-- -------- ----P--- -------- PPPPKPPP RNBQ-BNR B -1 0 0 1 1 0 7 Newton Einstein 1 2 12 39 39 119 122 2 K/e1-e2 (0:06) Ke2 0';
            // The style12ToFen function converts '-' to numbers in FEN
            const expectedFen = 'rnbqkb1r/pppppppp/5n2/8/4P3/8/PPPPKPPP/RNBQ1BNR b kq - 0 2';
            expect(style12ToFen(style12)).toBe(expectedFen);
        });

        it('should handle castling rights correctly', () => {
            const style12 = '<12> rnbqkbnr pppppppp -------- -------- -------- -------- PPPPPPPP RNBQKBNR W -1 1 1 1 1 0 1 White Black 0 5 5 39 39 300 300 1 none (0:00) none 0';
            const fen = style12ToFen(style12);
            expect(fen).toContain('KQkq'); // All castling rights available
        });

        it('should handle en passant correctly', () => {
            const style12 = '<12> rnbqkbnr pppp-ppp -------- ----p--- ----P--- -------- PPPP-PPP RNBQKBNR W 4 1 1 1 1 0 1 White Black 0 5 5 39 39 300 300 2 P/e2-e4 (0:00) e4 0';
            const fen = style12ToFen(style12);
            // When it's white's turn and the en passant file is 4 (e-file), the en passant square is e6
            expect(fen).toContain('e6'); // En passant square
        });

        it('should throw error for invalid style12', () => {
            expect(() => style12ToFen('invalid')).toThrow();
        });
    });

    describe('toAlgebraicSquare', () => {
        it('should convert rank and file to algebraic notation', () => {
            expect(toAlgebraicSquare(1, 1)).toBe('a1');
            expect(toAlgebraicSquare(8, 8)).toBe('h8');
            expect(toAlgebraicSquare(4, 5)).toBe('e4');
        });
    });

    describe('toRankFile', () => {
        it('should convert algebraic notation to rank and file', () => {
            expect(toRankFile('a1')).toEqual({ rank: 1, file: 1 });
            expect(toRankFile('h8')).toEqual({ rank: 8, file: 8 });
            expect(toRankFile('e4')).toEqual({ rank: 4, file: 5 });
        });
    });

    describe('fileNumberToAlgebraic', () => {
        it('should convert file number to letter', () => {
            expect(fileNumberToAlgebraic(1)).toBe('a');
            expect(fileNumberToAlgebraic(5)).toBe('e');
            expect(fileNumberToAlgebraic(8)).toBe('h');
        });
    });

    describe('parseVerboseMove', () => {
        it('should parse regular moves', () => {
            expect(parseVerboseMove('P/e2-e4', true)).toEqual(['e2', 'e4']);
            expect(parseVerboseMove('N/b1-c3', true)).toEqual(['b1', 'c3']);
            expect(parseVerboseMove('K/e1-e2', true)).toEqual(['e1', 'e2']);
        });

        it('should handle castling', () => {
            expect(parseVerboseMove('o-o', true)).toEqual(['e1', 'g1']);
            expect(parseVerboseMove('o-o', false)).toEqual(['e8', 'g8']);
            expect(parseVerboseMove('o-o-o', true)).toEqual(['e1', 'c1']);
            expect(parseVerboseMove('o-o-o', false)).toEqual(['e8', 'c8']);
        });

        it('should handle "none" move', () => {
            expect(parseVerboseMove('none', true)).toEqual([]);
        });

        it('should throw error for invalid move', () => {
            expect(() => parseVerboseMove('invalid', true)).toThrow();
        });
    });

    describe('getPieceAtSquare', () => {
        it('should get piece from FEN position', () => {
            const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
            expect(getPieceAtSquare(fen, 'e1')).toBe('K');
            expect(getPieceAtSquare(fen, 'e8')).toBe('k');
            expect(getPieceAtSquare(fen, 'a1')).toBe('R');
            expect(getPieceAtSquare(fen, 'e4')).toBe('');
        });

        it('should throw error for invalid input', () => {
            expect(() => getPieceAtSquare('', 'e4')).toThrow();
            expect(() => getPieceAtSquare('invalid', 'e4')).toThrow();
            expect(() => getPieceAtSquare('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', 'invalid')).toThrow();
        });
    });

    describe('convertToUnicodeChessPieces', () => {
        it('should convert piece notation to Unicode symbols', () => {
            expect(convertToUnicodeChessPieces('Nf3')).toBe('♘f3');
            expect(convertToUnicodeChessPieces('Qd1')).toBe('♕d1');
            expect(convertToUnicodeChessPieces('Rxe4')).toBe('♖xe4');
            expect(convertToUnicodeChessPieces('Bb5')).toBe('♗b5');
            expect(convertToUnicodeChessPieces('Kg1')).toBe('♔g1');
        });

        it('should handle pawn moves', () => {
            expect(convertToUnicodeChessPieces('e4')).toBe('e4');
            expect(convertToUnicodeChessPieces('exd5')).toBe('exd5');
        });

        it('should preserve castling notation', () => {
            expect(convertToUnicodeChessPieces('O-O')).toBe('O-O');
            expect(convertToUnicodeChessPieces('O-O-O')).toBe('O-O-O');
        });

        it('should handle captures', () => {
            expect(convertToUnicodeChessPieces('Nxf3')).toBe('♘xf3');
            expect(convertToUnicodeChessPieces('Rxe4+')).toBe('♖xe4+');
        });

        it('should handle check and checkmate', () => {
            expect(convertToUnicodeChessPieces('Qh5+')).toBe('♕h5+');
            expect(convertToUnicodeChessPieces('Qh5#')).toBe('♕h5#');
        });

        it('should handle disambiguation', () => {
            expect(convertToUnicodeChessPieces('Nbd2')).toBe('♘bd2');
            expect(convertToUnicodeChessPieces('R1e1')).toBe('♖1e1');
            expect(convertToUnicodeChessPieces('Ngf3')).toBe('♘gf3');
        });

        it('should handle empty or null input', () => {
            expect(convertToUnicodeChessPieces('')).toBe('');
            expect(convertToUnicodeChessPieces(null as any)).toBe(null);
        });
    });

    describe('startEndToAlgebraic', () => {
        it('should convert start/end squares to algebraic notation', () => {
            const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
            expect(startEndToAlgebraic('e2', 'e4', fen)).toBe('e4');
            expect(startEndToAlgebraic('g1', 'f3', fen)).toBe('Nf3');
        });

        it('should handle castling', () => {
            const fen = 'r3k2r/8/8/8/8/8/8/R3K2R w KQkq - 0 1';
            expect(startEndToAlgebraic('e1', 'g1', fen)).toBe('O-O');
            expect(startEndToAlgebraic('e1', 'c1', fen)).toBe('O-O-O');
        });

        it('should handle captures', () => {
            const fen = 'rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2';
            expect(startEndToAlgebraic('e4', 'd5', fen)).toBe('exd5');
        });

        it('should handle pawn promotion', () => {
            const fen = '8/P7/8/8/8/8/8/8 w - - 0 1';
            expect(startEndToAlgebraic('a7', 'a8', fen)).toBe('a8=Q');
        });

        it('should throw error for invalid input', () => {
            const fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
            expect(() => startEndToAlgebraic('e4', 'e5', fen)).toThrow(); // No piece at e4
            expect(() => startEndToAlgebraic('invalid', 'e4', fen)).toThrow();
        });
    });

    describe('ficsMoveToStartEndArray', () => {
        it('should parse FICS move syntax', () => {
            expect(ficsMoveToStartEndArray('e2e4')).toEqual(['e2', 'e4']);
            expect(ficsMoveToStartEndArray('g1f3')).toEqual(['g1', 'f3']);
            expect(ficsMoveToStartEndArray('e7e8q')).toEqual(['e7', 'e8']);
        });
    });

    describe('regexIndexOf', () => {
        it('should find regex match index', () => {
            expect(regexIndexOf('hello world', /world/)).toBe(6);
            expect(regexIndexOf('hello world', /test/)).toBe(-1);
            expect(regexIndexOf('hello world', /o/, 5)).toBe(7);
        });
    });

    describe('longAlgebraicToDisplaySAN', () => {
        it('should convert long algebraic to display SAN', () => {
            expect(longAlgebraicToDisplaySAN('e2e4')).toBe('e4');
            expect(longAlgebraicToDisplaySAN('g1f3')).toBe('f3');
            expect(longAlgebraicToDisplaySAN('e7e8q')).toBe('e8=Q');
            expect(longAlgebraicToDisplaySAN('a7a8n')).toBe('a8=N');
        });

        it('should handle invalid input', () => {
            expect(longAlgebraicToDisplaySAN('')).toBe('');
            expect(longAlgebraicToDisplaySAN('e2')).toBe('e2');
            expect(longAlgebraicToDisplaySAN(null as any)).toBe(null);
        });

        it('should uppercase promotion pieces', () => {
            expect(longAlgebraicToDisplaySAN('e7e8q')).toBe('e8=Q');
            expect(longAlgebraicToDisplaySAN('h7h8r')).toBe('h8=R');
            expect(longAlgebraicToDisplaySAN('b7b8b')).toBe('b8=B');
            expect(longAlgebraicToDisplaySAN('c7c8n')).toBe('c8=N');
        });
    });
});