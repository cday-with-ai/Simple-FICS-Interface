/**
 * Type definitions for the Chess Engine
 */

import {PieceType, Color} from './ChessAPI';

// Move generation types
export interface MoveGenerationContext {
    board: (Piece | null)[][];
    activeColor: Color;
    castlingRights: CastlingRights;
    enPassantTarget: string | null;
    variant: Variant;
    capturedPieces?: { [key in Color]: PieceType[] };
}

// Piece movement patterns
export interface MovementVector {
    row: number;
    col: number;
}

// Game state for history
export interface GameState {
    fen: string;
    move: Move | null;
    capturedPiece: Piece | null;
}

// Validation result
export interface ValidationResult {
    valid: boolean;
    reason?: string;
}

// Square coordinates
export interface Coordinates {
    row: number;
    col: number;
}

// Drop move for Crazyhouse
export interface DropMove {
    piece: PieceType;
    square: string;
    color: Color;
}

// Import needed types from main file
import {Piece, CastlingRights, Variant, Move} from './ChessAPI';