/**
 * Move generation logic for the Chess Engine
 */

import {
    ChessAPI,
    Move,
    Piece,
    PieceType,
    Color,
    Variant,
    MoveObject
} from './ChessAPI';
import {
    Coordinates,
    MovementVector,
    MoveGenerationContext
} from './ChessAPI.types';

export class MoveGenerator {
    // Knight movement offsets
    private static readonly KNIGHT_MOVES: MovementVector[] = [
        {row: 2, col: 1}, {row: 2, col: -1},
        {row: -2, col: 1}, {row: -2, col: -1},
        {row: 1, col: 2}, {row: 1, col: -2},
        {row: -1, col: 2}, {row: -1, col: -2}
    ];

    // King movement offsets
    private static readonly KING_MOVES: MovementVector[] = [
        {row: 1, col: 0}, {row: -1, col: 0},
        {row: 0, col: 1}, {row: 0, col: -1},
        {row: 1, col: 1}, {row: 1, col: -1},
        {row: -1, col: 1}, {row: -1, col: -1}
    ];

    /**
     * Generates all pseudo-legal moves for a piece
     */
    static generatePieceMoves(
        context: MoveGenerationContext,
        from: Coordinates,
        piece: Piece
    ): MoveObject[] {
        switch (piece.type) {
            case PieceType.PAWN:
                return this.generatePawnMoves(context, from, piece);
            case PieceType.KNIGHT:
                return this.generateKnightMoves(context, from, piece);
            case PieceType.BISHOP:
                return this.generateBishopMoves(context, from, piece);
            case PieceType.ROOK:
                return this.generateRookMoves(context, from, piece);
            case PieceType.QUEEN:
                return this.generateQueenMoves(context, from, piece);
            case PieceType.KING:
                return this.generateKingMoves(context, from, piece);
            default:
                return [];
        }
    }

    /**
     * Generates pawn moves
     */
    private static generatePawnMoves(
        context: MoveGenerationContext,
        from: Coordinates,
        piece: Piece
    ): MoveObject[] {
        const moves: MoveObject[] = [];
        const direction = piece.color === Color.WHITE ? 1 : -1;
        const startRank = piece.color === Color.WHITE ? 1 : 6;
        const promotionRank = piece.color === Color.WHITE ? 7 : 0;
        const currentRank = from.row;

        // Forward moves
        const oneSquareForward = {row: from.row + direction, col: from.col};
        if (this.isValidSquare(oneSquareForward) && !context.board[oneSquareForward.row][oneSquareForward.col]) {
            if (oneSquareForward.row === promotionRank) {
                // Promotion moves
                [PieceType.QUEEN, PieceType.ROOK, PieceType.BISHOP, PieceType.KNIGHT].forEach(promo => {
                    moves.push({
                        from: this.coordsToAlgebraic(from),
                        to: this.coordsToAlgebraic(oneSquareForward),
                        promotion: promo
                    });
                });
            } else {
                moves.push({
                    from: this.coordsToAlgebraic(from),
                    to: this.coordsToAlgebraic(oneSquareForward)
                });

                // Two square forward from starting position
                if (from.row === startRank) {
                    const twoSquaresForward = {row: from.row + (2 * direction), col: from.col};
                    if (!context.board[twoSquaresForward.row][twoSquaresForward.col]) {
                        moves.push({
                            from: this.coordsToAlgebraic(from),
                            to: this.coordsToAlgebraic(twoSquaresForward)
                        });
                    }
                }
            }
        }

        // Captures
        [-1, 1].forEach(colOffset => {
            const captureSquare = {row: from.row + direction, col: from.col + colOffset};
            if (this.isValidSquare(captureSquare)) {
                const targetPiece = context.board[captureSquare.row][captureSquare.col];
                if (targetPiece && targetPiece.color !== piece.color) {
                    if (captureSquare.row === promotionRank) {
                        // Promotion captures
                        [PieceType.QUEEN, PieceType.ROOK, PieceType.BISHOP, PieceType.KNIGHT].forEach(promo => {
                            moves.push({
                                from: this.coordsToAlgebraic(from),
                                to: this.coordsToAlgebraic(captureSquare),
                                promotion: promo
                            });
                        });
                    } else {
                        moves.push({
                            from: this.coordsToAlgebraic(from),
                            to: this.coordsToAlgebraic(captureSquare)
                        });
                    }
                }

                // En passant - check if the capture square matches the en passant target
                if (context.enPassantTarget) {
                    const enPassantSquare = this.coordsToAlgebraic(captureSquare);
                    if (context.enPassantTarget === enPassantSquare) {
                        moves.push({
                            from: this.coordsToAlgebraic(from),
                            to: enPassantSquare,
                            isEnPassant: true
                        });
                    }
                }
            }
        });

        return moves;
    }

    /**
     * Generates knight moves
     */
    private static generateKnightMoves(
        context: MoveGenerationContext,
        from: Coordinates,
        piece: Piece
    ): MoveObject[] {
        return this.generateMovesFromVectors(context, from, piece, this.KNIGHT_MOVES, false);
    }

    /**
     * Generates bishop moves
     */
    private static generateBishopMoves(
        context: MoveGenerationContext,
        from: Coordinates,
        piece: Piece
    ): MoveObject[] {
        const diagonalVectors: MovementVector[] = [
            {row: 1, col: 1}, {row: 1, col: -1},
            {row: -1, col: 1}, {row: -1, col: -1}
        ];
        return this.generateMovesFromVectors(context, from, piece, diagonalVectors, true);
    }

    /**
     * Generates rook moves
     */
    private static generateRookMoves(
        context: MoveGenerationContext,
        from: Coordinates,
        piece: Piece
    ): MoveObject[] {
        const straightVectors: MovementVector[] = [
            {row: 1, col: 0}, {row: -1, col: 0},
            {row: 0, col: 1}, {row: 0, col: -1}
        ];
        return this.generateMovesFromVectors(context, from, piece, straightVectors, true);
    }

    /**
     * Generates queen moves
     */
    private static generateQueenMoves(
        context: MoveGenerationContext,
        from: Coordinates,
        piece: Piece
    ): MoveObject[] {
        // Queen moves like both bishop and rook
        return [
            ...this.generateBishopMoves(context, from, piece),
            ...this.generateRookMoves(context, from, piece)
        ];
    }

    /**
     * Generates king moves including castling
     */
    private static generateKingMoves(
        context: MoveGenerationContext,
        from: Coordinates,
        piece: Piece
    ): MoveObject[] {
        const moves = this.generateMovesFromVectors(context, from, piece, this.KING_MOVES, false);

        // Add castling moves
        if (context.variant !== Variant.ATOMIC) {
            moves.push(...this.generateCastlingMoves(context, from, piece));
        }

        return moves;
    }

    /**
     * Generates castling moves
     */
    private static generateCastlingMoves(
        context: MoveGenerationContext,
        from: Coordinates,
        piece: Piece
    ): MoveObject[] {
        const moves: MoveObject[] = [];

        // Check if king hasn't moved (simplified - full implementation would check move history)
        if (piece.color === Color.WHITE && from.row === 0 && from.col === 4) {
            // White castling
            if (context.castlingRights.K && this.canCastleKingside(context, Color.WHITE)) {
                moves.push({
                    from: 'e1',
                    to: 'g1',
                    castling: 'kingside'
                });
            }
            if (context.castlingRights.Q && this.canCastleQueenside(context, Color.WHITE)) {
                moves.push({
                    from: 'e1',
                    to: 'c1',
                    castling: 'queenside'
                });
            }
        } else if (piece.color === Color.BLACK && from.row === 7 && from.col === 4) {
            // Black castling
            if (context.castlingRights.k && this.canCastleKingside(context, Color.BLACK)) {
                moves.push({
                    from: 'e8',
                    to: 'g8',
                    castling: 'kingside'
                });
            }
            if (context.castlingRights.q && this.canCastleQueenside(context, Color.BLACK)) {
                moves.push({
                    from: 'e8',
                    to: 'c8',
                    castling: 'queenside'
                });
            }
        }

        return moves;
    }

    /**
     * Checks if kingside castling is possible
     */
    private static canCastleKingside(context: MoveGenerationContext, color: Color): boolean {
        const row = color === Color.WHITE ? 0 : 7;

        // Check if squares between king and rook are empty
        return !context.board[row][5] && !context.board[row][6] &&
            // Check if rook is in position
            context.board[row][7]?.type === PieceType.ROOK &&
            context.board[row][7]?.color === color;
    }

    /**
     * Checks if queenside castling is possible
     */
    private static canCastleQueenside(context: MoveGenerationContext, color: Color): boolean {
        const row = color === Color.WHITE ? 0 : 7;

        // Check if squares between king and rook are empty
        return !context.board[row][1] && !context.board[row][2] && !context.board[row][3] &&
            // Check if rook is in position
            context.board[row][0]?.type === PieceType.ROOK &&
            context.board[row][0]?.color === color;
    }

    /**
     * Generates moves from movement vectors
     */
    private static generateMovesFromVectors(
        context: MoveGenerationContext,
        from: Coordinates,
        piece: Piece,
        vectors: MovementVector[],
        sliding: boolean
    ): MoveObject[] {
        const moves: MoveObject[] = [];

        for (const vector of vectors) {
            let current = {row: from.row + vector.row, col: from.col + vector.col};

            while (this.isValidSquare(current)) {
                const targetPiece = context.board[current.row][current.col];

                if (!targetPiece) {
                    // Empty square
                    moves.push({
                        from: this.coordsToAlgebraic(from),
                        to: this.coordsToAlgebraic(current)
                    });
                } else if (targetPiece.color !== piece.color) {
                    // Enemy piece - can capture
                    moves.push({
                        from: this.coordsToAlgebraic(from),
                        to: this.coordsToAlgebraic(current)
                    });
                    break; // Can't move past enemy piece
                } else {
                    // Friendly piece - can't move here
                    break;
                }

                if (!sliding) break; // Non-sliding pieces only move once

                current = {row: current.row + vector.row, col: current.col + vector.col};
            }
        }

        return moves;
    }

    /**
     * Checks if coordinates are valid
     */
    private static isValidSquare(coords: Coordinates): boolean {
        return coords.row >= 0 && coords.row < 8 && coords.col >= 0 && coords.col < 8;
    }

    /**
     * Converts coordinates to algebraic notation
     */
    private static coordsToAlgebraic(coords: Coordinates): string {
        return String.fromCharCode('a'.charCodeAt(0) + coords.col) + (coords.row + 1);
    }
}