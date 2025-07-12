/**
 * Variant-specific rules for the Chess Engine
 */

import {
    Board,
    Color,
    Piece,
    PieceType,
    Variant,
    Move,
    GameResult
} from './ChessAPI';
import {Coordinates} from './ChessAPI.types';
import {MoveValidator} from './ChessAPI.validation';

export class VariantRules {
    /**
     * Checks if captures are forced in the current position (Losers/Suicide)
     */
    static hasForcedCaptures(
        board: Board,
        activeColor: Color,
        variant: Variant
    ): boolean {
        if (variant !== Variant.LOSERS && variant !== Variant.SUICIDE) {
            return false;
        }

        // Check if any piece can capture
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board[row][col];
                if (piece && piece.color === activeColor) {
                    if (this.pieceHasCaptures(board, {row, col}, piece, variant)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    /**
     * Checks if a specific piece has any captures available
     */
    private static pieceHasCaptures(
        board: Board,
        from: Coordinates,
        piece: Piece,
        variant: Variant
    ): boolean {
        // Check all possible destination squares
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const target = board[row][col];
                if (target && target.color !== piece.color) {
                    // Check if this piece can capture at this square
                    if (MoveValidator.canPieceAttackSquare(
                        board,
                        from,
                        {row, col},
                        piece,
                        variant
                    )) {
                        return true;
                    }
                }
            }
        }

        // Special case for en passant
        if (piece.type === PieceType.PAWN) {
            // Would need en passant target to properly check
            // This is simplified for now
        }

        return false;
    }

    /**
     * Filters moves based on variant rules (e.g., forced captures)
     */
    static filterMovesByVariant(
        moves: Move[],
        board: Board,
        activeColor: Color,
        variant: Variant
    ): Move[] {
        if (variant === Variant.LOSERS || variant === Variant.SUICIDE) {
            // Check if there are any captures available
            const captures = moves.filter(move => move.isCapture());

            if (captures.length > 0) {
                // Only captures are allowed
                return captures;
            }
        }

        return moves;
    }

    /**
     * Handles atomic explosion after a capture
     */
    static handleAtomicExplosion(
        board: Board,
        captureSquare: Coordinates,
        variant: Variant
    ): void {
        if (variant !== Variant.ATOMIC) return;

        // Explosion affects all squares in a 3x3 area
        for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
            for (let colOffset = -1; colOffset <= 1; colOffset++) {
                const row = captureSquare.row + rowOffset;
                const col = captureSquare.col + colOffset;

                if (row >= 0 && row < 8 && col >= 0 && col < 8) {
                    const piece = board[row][col];

                    // The capture square is always cleared
                    if (row === captureSquare.row && col === captureSquare.col) {
                        board[row][col] = null;
                    }
                    // Other squares: pawns are immune to explosions
                    else if (piece && piece.type !== PieceType.PAWN) {
                        board[row][col] = null;
                    }
                }
            }
        }
    }

    /**
     * Checks if kings are adjacent (illegal in Atomic)
     */
    static areKingsAdjacent(board: Board): boolean {
        let whiteKingPos: Coordinates | null = null;
        let blackKingPos: Coordinates | null = null;

        // Find both kings
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board[row][col];
                if (piece && piece.type === PieceType.KING) {
                    if (piece.color === Color.WHITE) {
                        whiteKingPos = {row, col};
                    } else {
                        blackKingPos = {row, col};
                    }
                }
            }
        }

        if (!whiteKingPos || !blackKingPos) {
            return false;
        }

        // Check if kings are adjacent
        const rowDiff = Math.abs(whiteKingPos.row - blackKingPos.row);
        const colDiff = Math.abs(whiteKingPos.col - blackKingPos.col);

        return rowDiff <= 1 && colDiff <= 1;
    }

    /**
     * Validates a piece drop for Crazyhouse
     */
    static isValidDrop(
        board: Board,
        pieceType: PieceType,
        square: Coordinates,
        color: Color
    ): boolean {
        // Square must be empty
        if (board[square.row][square.col]) {
            return false;
        }

        // Pawns cannot be dropped on first or last rank
        if (pieceType === PieceType.PAWN) {
            if (square.row === 0 || square.row === 7) {
                return false;
            }
        }

        // Would need to check if dropping causes immediate checkmate
        // This is simplified for now

        return true;
    }

    /**
     * Converts a promoted piece back to pawn when captured (Crazyhouse)
     */
    static demoteOnCapture(piece: Piece): PieceType {
        // In Crazyhouse, promoted pieces become pawns when captured
        if (piece.type === PieceType.QUEEN ||
            piece.type === PieceType.ROOK ||
            piece.type === PieceType.BISHOP ||
            piece.type === PieceType.KNIGHT) {
            // Check if this was a promoted pawn
            // Since we don't track promotion status, we'd need to add that
            // For now, return the piece type as-is
            return piece.type;
        }
        return piece.type;
    }

    /**
     * Generates a Chess960 starting position
     */
    static generateChess960Position(): string {
        // Generate a random Chess960 position following these rules:
        // 1. King must be between rooks
        // 2. Bishops must be on opposite colors
        // 3. All 960 positions should be equally likely

        const backRank = ['', '', '', '', '', '', '', ''];
        
        // Place bishops on opposite colored squares
        const lightSquares = [1, 3, 5, 7]; // b, d, f, h files
        const darkSquares = [0, 2, 4, 6];  // a, c, e, g files
        
        const lightBishopSquare = lightSquares[Math.floor(Math.random() * lightSquares.length)];
        const darkBishopSquare = darkSquares[Math.floor(Math.random() * darkSquares.length)];
        
        backRank[lightBishopSquare] = 'B';
        backRank[darkBishopSquare] = 'B';
        
        // Find empty squares for remaining pieces
        const emptySquares = [];
        for (let i = 0; i < 8; i++) {
            if (backRank[i] === '') {
                emptySquares.push(i);
            }
        }
        
        // Place queen randomly on one of the remaining squares
        const queenSquare = emptySquares.splice(Math.floor(Math.random() * emptySquares.length), 1)[0];
        backRank[queenSquare] = 'Q';
        
        // Place knights randomly on two of the remaining squares
        const knight1Square = emptySquares.splice(Math.floor(Math.random() * emptySquares.length), 1)[0];
        const knight2Square = emptySquares.splice(Math.floor(Math.random() * emptySquares.length), 1)[0];
        backRank[knight1Square] = 'N';
        backRank[knight2Square] = 'N';
        
        // The remaining three squares are for rook-king-rook
        // King must be between rooks
        emptySquares.sort((a, b) => a - b); // Sort remaining squares
        backRank[emptySquares[0]] = 'R';   // First rook
        backRank[emptySquares[1]] = 'K';   // King (middle)
        backRank[emptySquares[2]] = 'R';   // Second rook
        
        // Create FEN string
        const whiteBackRank = backRank.join('');
        const blackBackRank = backRank.map(piece => piece.toLowerCase()).join('');
        
        return `${blackBackRank}/pppppppp/8/8/8/8/PPPPPPPP/${whiteBackRank} w KQkq - 0 1`;
    }

    /**
     * Gets Chess960 castling squares based on king and rook positions
     */
    static getChess960CastlingSquares(
        board: Board,
        color: Color,
        side: 'kingside' | 'queenside'
    ): { kingFrom: string; kingTo: string; rookFrom: string; rookTo: string } | null {
        const row = color === Color.WHITE ? 0 : 7;
        let kingCol = -1;
        let rookCol = -1;

        // Find king
        for (let col = 0; col < 8; col++) {
            const piece = board[row][col];
            if (piece && piece.type === PieceType.KING && piece.color === color) {
                kingCol = col;
                break;
            }
        }

        if (kingCol === -1) return null;

        // Find appropriate rook
        if (side === 'kingside') {
            // Find rook to the right of king
            for (let col = kingCol + 1; col < 8; col++) {
                const piece = board[row][col];
                if (piece && piece.type === PieceType.ROOK && piece.color === color) {
                    rookCol = col;
                    break;
                }
            }
        } else {
            // Find rook to the left of king
            for (let col = kingCol - 1; col >= 0; col--) {
                const piece = board[row][col];
                if (piece && piece.type === PieceType.ROOK && piece.color === color) {
                    rookCol = col;
                    break;
                }
            }
        }

        if (rookCol === -1) return null;

        // Chess960 castling: King always ends up on c1/g1 (c8/g8 for black)
        // Rook always ends up on d1/f1 (d8/f8 for black)
        const kingToCol = side === 'kingside' ? 6 : 2; // g or c file
        const rookToCol = side === 'kingside' ? 5 : 3; // f or d file

        return {
            kingFrom: this.coordsToSquare({row, col: kingCol}),
            kingTo: this.coordsToSquare({row, col: kingToCol}),
            rookFrom: this.coordsToSquare({row, col: rookCol}),
            rookTo: this.coordsToSquare({row, col: rookToCol})
        };
    }

    /**
     * Checks variant-specific game termination
     */
    static checkVariantGameOver(
        board: Board,
        activeColor: Color,
        variant: Variant,
        hasNoLegalMoves: boolean
    ): { isOver: boolean; result?: GameResult } {
        switch (variant) {
            case Variant.LOSERS:
            case Variant.SUICIDE:
                return this.checkLosersGameOver(board, activeColor, hasNoLegalMoves);

            case Variant.ATOMIC:
                return this.checkAtomicGameOver(board, activeColor);

            case Variant.CRAZYHOUSE:
                // Crazyhouse rarely ends in stalemate due to drops
                if (hasNoLegalMoves) {
                    return {
                        isOver: true,
                        result: activeColor === Color.WHITE ? GameResult.BLACK_WINS : GameResult.WHITE_WINS
                    };
                }
                break;
        }

        return {isOver: false};
    }

    /**
     * Checks if Losers/Suicide game is over
     */
    private static checkLosersGameOver(
        board: Board,
        activeColor: Color,
        hasNoLegalMoves: boolean
    ): { isOver: boolean; result?: GameResult } {
        // Count pieces for each side
        const pieceCounts = {white: 0, black: 0};

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board[row][col];
                if (piece) {
                    if (piece.color === Color.WHITE) {
                        pieceCounts.white++;
                    } else {
                        pieceCounts.black++;
                    }
                }
            }
        }

        // Win by losing all pieces
        if (pieceCounts.white === 0) {
            return {isOver: true, result: GameResult.WHITE_WINS};
        }
        if (pieceCounts.black === 0) {
            return {isOver: true, result: GameResult.BLACK_WINS};
        }

        // Win by stalemate (no legal moves)
        if (hasNoLegalMoves) {
            return {
                isOver: true,
                result: activeColor === Color.WHITE ? GameResult.WHITE_WINS : GameResult.BLACK_WINS
            };
        }

        return {isOver: false};
    }

    /**
     * Checks if Atomic game is over
     */
    private static checkAtomicGameOver(
        board: Board,
        activeColor: Color
    ): { isOver: boolean; result?: GameResult } {
        // Check if either king has been exploded
        let whiteKingExists = false;
        let blackKingExists = false;

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board[row][col];
                if (piece && piece.type === PieceType.KING) {
                    if (piece.color === Color.WHITE) {
                        whiteKingExists = true;
                    } else {
                        blackKingExists = true;
                    }
                }
            }
        }

        if (!whiteKingExists) {
            return {isOver: true, result: GameResult.BLACK_WINS};
        }
        if (!blackKingExists) {
            return {isOver: true, result: GameResult.WHITE_WINS};
        }

        return {isOver: false};
    }

    /**
     * Helper to convert coordinates to square notation
     */
    private static coordsToSquare(coords: Coordinates): string {
        return String.fromCharCode('a'.charCodeAt(0) + coords.col) + (coords.row + 1);
    }
}