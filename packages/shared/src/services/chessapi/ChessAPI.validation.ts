/**
 * Move validation logic for the Chess Engine
 */

import {
    ChessAPI,
    Move,
    Piece,
    PieceType,
    Color,
    Variant,
    Board,
    CastlingRights
} from './ChessAPI';
import {Coordinates} from './ChessAPI.types';

export class MoveValidator {
    /**
     * Validates if a move is legal by checking if it leaves the king in check
     */
    static isLegalMove(
        board: Board,
        move: Move,
        activeColor: Color,
        variant: Variant,
        castlingRights?: CastlingRights
    ): boolean {
        // In freestyle variant, all moves are legal
        if (variant === Variant.FREESTYLE) {
            return true;
        }

        // For castling moves, use special validation
        if (move.isCastling && castlingRights) {
            return this.canCastle(
                board,
                activeColor,
                move.castlingSide!,
                castlingRights,
                variant
            );
        }

        // Create a copy of the board to test the move
        const testBoard = this.copyBoard(board);

        // Execute the move on the test board
        this.executeTestMove(testBoard, move);

        // In atomic variant, check special rules before standard validation
        if (variant === Variant.ATOMIC) {
            const from = this.algebraicToCoords(move.from);
            const to = this.algebraicToCoords(move.to);

            // Special king rules in atomic - check these first
            if (from && to) {
                const movingPiece = board[from.row][from.col];
                if (movingPiece && movingPiece.type === PieceType.KING) {
                    // Kings cannot capture pieces (would explode themselves)
                    if (move.isCapture()) {
                        return false;
                    }

                    // Check if kings would be adjacent after this move
                    // In FICS atomic, adjacent kings are allowed (they protect each other)
                    // So we don't need to check for adjacency
                }
            }

            // If this is a capture by a non-king piece, check if it would destroy the opponent's king
            if (move.isCapture() && from && to) {
                // Check if opponent king is in explosion radius (check on original board)
                const opponentKingPos = this.findKing(board, activeColor === Color.WHITE ? Color.BLACK : Color.WHITE);
                if (opponentKingPos) {
                    const distance = Math.max(
                        Math.abs(opponentKingPos.row - to.row),
                        Math.abs(opponentKingPos.col - to.col)
                    );
                    // If opponent king would be destroyed, this is a winning move
                    if (distance <= 1) {
                        return true;
                    }
                }
            }
        }

        // Check if the king is in check after the move
        const kingInCheck = this.isKingInCheck(testBoard, activeColor, variant);
        return !kingInCheck;
    }

    /**
     * Checks if the king of the specified color is in check
     */
    static isKingInCheck(board: Board, color: Color, variant: Variant): boolean {
        // Find the king
        const kingPosition = this.findKing(board, color);
        if (!kingPosition) {
            // No king found (atomic variant or error)
            return false;
        }

        // Check if any opponent piece can attack the king
        const opponentColor = color === Color.WHITE ? Color.BLACK : Color.WHITE;

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board[row][col];
                if (piece && piece.color === opponentColor) {
                    if (this.canPieceAttackSquare(
                        board,
                        {row, col},
                        kingPosition,
                        piece,
                        variant
                    )) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    /**
     * Checks if a piece can attack a specific square
     */
    static canPieceAttackSquare(
        board: Board,
        from: Coordinates,
        to: Coordinates,
        piece: Piece,
        variant: Variant
    ): boolean {
        switch (piece.type) {
            case PieceType.PAWN:
                return this.canPawnAttack(from, to, piece.color);

            case PieceType.KNIGHT:
                return this.canKnightMove(from, to);

            case PieceType.BISHOP:
                return this.canBishopMove(board, from, to);

            case PieceType.ROOK:
                return this.canRookMove(board, from, to);

            case PieceType.QUEEN:
                return this.canQueenMove(board, from, to);

            case PieceType.KING:
                // Kings attack adjacent squares (distance = 1)
                const distance = Math.max(
                    Math.abs(from.row - to.row),
                    Math.abs(from.col - to.col)
                );
                // In atomic, kings don't threaten other kings
                if (variant === Variant.ATOMIC) {
                    const targetPiece = board[to.row][to.col];
                    if (targetPiece && targetPiece.type === PieceType.KING) {
                        return false;
                    }
                }
                return distance === 1;

            default:
                return false;
        }
    }

    /**
     * Pawn attack pattern (diagonal only)
     */
    private static canPawnAttack(from: Coordinates, to: Coordinates, color: Color): boolean {
        const direction = color === Color.WHITE ? 1 : -1;
        const rowDiff = to.row - from.row;
        const colDiff = Math.abs(to.col - from.col);

        return rowDiff === direction && colDiff === 1;
    }

    /**
     * Knight movement pattern
     */
    private static canKnightMove(from: Coordinates, to: Coordinates): boolean {
        const rowDiff = Math.abs(to.row - from.row);
        const colDiff = Math.abs(to.col - from.col);

        return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
    }

    /**
     * Bishop movement pattern (diagonal with clear path)
     */
    private static canBishopMove(board: Board, from: Coordinates, to: Coordinates): boolean {
        const rowDiff = Math.abs(to.row - from.row);
        const colDiff = Math.abs(to.col - from.col);

        // Must move diagonally
        if (rowDiff !== colDiff || rowDiff === 0) {
            return false;
        }

        // Check if path is clear
        return this.isPathClear(board, from, to);
    }

    /**
     * Rook movement pattern (straight lines with clear path)
     */
    private static canRookMove(board: Board, from: Coordinates, to: Coordinates): boolean {
        // Must move in straight line
        if (from.row !== to.row && from.col !== to.col) {
            return false;
        }

        // Can't stay in place
        if (from.row === to.row && from.col === to.col) {
            return false;
        }

        // Check if path is clear
        return this.isPathClear(board, from, to);
    }

    /**
     * Queen movement pattern (rook + bishop)
     */
    private static canQueenMove(board: Board, from: Coordinates, to: Coordinates): boolean {
        return this.canRookMove(board, from, to) || this.canBishopMove(board, from, to);
    }

    /**
     * King movement pattern (one square in any direction)
     */
    private static canKingMove(from: Coordinates, to: Coordinates): boolean {
        const rowDiff = Math.abs(to.row - from.row);
        const colDiff = Math.abs(to.col - from.col);

        return rowDiff <= 1 && colDiff <= 1 && (rowDiff > 0 || colDiff > 0);
    }

    /**
     * Checks if the path between two squares is clear
     */
    private static isPathClear(board: Board, from: Coordinates, to: Coordinates): boolean {
        const rowStep = to.row > from.row ? 1 : to.row < from.row ? -1 : 0;
        const colStep = to.col > from.col ? 1 : to.col < from.col ? -1 : 0;

        let currentRow = from.row + rowStep;
        let currentCol = from.col + colStep;

        while (currentRow !== to.row || currentCol !== to.col) {
            if (board[currentRow][currentCol] !== null) {
                return false;
            }
            currentRow += rowStep;
            currentCol += colStep;
        }

        return true;
    }

    /**
     * Finds the king of the specified color
     */
    private static findKing(board: Board, color: Color): Coordinates | null {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board[row][col];
                if (piece && piece.type === PieceType.KING && piece.color === color) {
                    return {row, col};
                }
            }
        }
        return null;
    }

    /**
     * Creates a deep copy of the board
     */
    private static copyBoard(board: Board): Board {
        return board.map(row => row.map(piece => piece ? {...piece} : null));
    }

    /**
     * Executes a move on a test board (simplified version)
     */
    private static executeTestMove(board: Board, move: Move): void {
        // Handle castling moves specially
        if (move.isCastling) {
            const from = this.algebraicToCoords(move.from);
            const to = this.algebraicToCoords(move.to);
            if (!from || !to) return;

            // Move the king
            board[to.row][to.col] = board[from.row][from.col];
            board[from.row][from.col] = null;

            // Move the rook
            if (move.castlingSide === 'kingside') {
                board[to.row][to.col - 1] = board[to.row][7]; // Rook from h-file
                board[to.row][7] = null;
            } else {
                board[to.row][to.col + 1] = board[to.row][0]; // Rook from a-file
                board[to.row][0] = null;
            }
            return;
        }

        const from = this.algebraicToCoords(move.from);
        const to = this.algebraicToCoords(move.to);

        if (!from || !to) return;

        // Move the piece
        board[to.row][to.col] = board[from.row][from.col];
        board[from.row][from.col] = null;

        // Handle promotion
        if (move.promotion && board[to.row][to.col]) {
            board[to.row][to.col]!.type = move.promotion;
        }

        // Handle en passant capture
        if (move.isEnPassant) {
            const captureRow = from.row;
            board[captureRow][to.col] = null;
        }
    }

    /**
     * Checks if a king was captured (for atomic variant)
     */
    private static wasKingCaptured(board: Board, move: Move, variant: Variant): boolean {
        if (variant !== Variant.ATOMIC || !move.capturedPiece) {
            return false;
        }

        return move.capturedPiece.type === PieceType.KING;
    }

    /**
     * Converts algebraic notation to coordinates
     */
    private static algebraicToCoords(square: string): Coordinates | null {
        if (square.length !== 2) return null;

        const col = square.charCodeAt(0) - 'a'.charCodeAt(0);
        const row = parseInt(square[1]) - 1;

        if (col < 0 || col > 7 || row < 0 || row > 7) {
            return null;
        }

        return {row, col};
    }

    /**
     * Validates castling move
     */
    static canCastle(
        board: Board,
        color: Color,
        side: 'kingside' | 'queenside',
        castlingRights: CastlingRights,
        variant: Variant
    ): boolean {
        // Check castling rights
        if (color === Color.WHITE) {
            if (side === 'kingside' && !castlingRights.K) return false;
            if (side === 'queenside' && !castlingRights.Q) return false;
        } else {
            if (side === 'kingside' && !castlingRights.k) return false;
            if (side === 'queenside' && !castlingRights.q) return false;
        }

        const row = color === Color.WHITE ? 0 : 7;
        const kingCol = 4; // Standard position, would need adjustment for Chess960

        // Check if king is in check
        if (this.isKingInCheck(board, color, variant)) {
            return false;
        }

        // Check path and destination
        if (side === 'kingside') {
            // Check if squares are empty
            if (board[row][5] || board[row][6]) return false;

            // Check if squares are not under attack
            // King must not pass through check (e1, f1, g1 for white)
            for (let col = 4; col <= 6; col++) {
                if (this.isSquareAttacked(board, {
                    row,
                    col
                }, color === Color.WHITE ? Color.BLACK : Color.WHITE, variant)) {
                    return false;
                }
            }
        } else {
            // Queenside
            if (board[row][1] || board[row][2] || board[row][3]) return false;

            // Check if squares are not under attack
            // King must not pass through check (e1, d1, c1 for white)
            for (let col = 2; col <= 4; col++) {
                if (this.isSquareAttacked(board, {
                    row,
                    col
                }, color === Color.WHITE ? Color.BLACK : Color.WHITE, variant)) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Checks if kings are adjacent (for atomic variant)
     */
    private static areKingsAdjacent(board: Board): boolean {
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
     * Checks if a square is under attack by the specified color
     */
    private static isSquareAttacked(
        board: Board,
        square: Coordinates,
        byColor: Color,
        variant: Variant
    ): boolean {
        // Check all pieces of the attacking color
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = board[row][col];
                if (piece && piece.color === byColor) {
                    if (this.canPieceAttackSquare(board, {row, col}, square, piece, variant)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}