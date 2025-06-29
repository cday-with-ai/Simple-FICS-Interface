/**
 * ChessEngine.ts - A comprehensive chess engine supporting multiple variants
 * Supports: Standard, Losers (FICS), Suicide (FICS), Atomic, Crazyhouse, Chess960
 *
 * @author cday-with-ai
 * @version 2.0.0 - TypeScript migration
 */

// Import required modules
import { SANParser } from './ChessEngine.parser';
import { MoveValidator } from './ChessEngine.validation';
import { MoveExecutor } from './ChessEngine.execution';
import { MoveGenerator } from './ChessEngine.moveGeneration';
import { Coordinates } from './ChessEngine.types';

// Enums for type safety
export enum PieceType {
  KING = 'k',
  QUEEN = 'q',
  ROOK = 'r',
  BISHOP = 'b',
  KNIGHT = 'n',
  PAWN = 'p'
}

export enum Color {
  WHITE = 'w',
  BLACK = 'b'
}

export enum Variant {
  CLASSIC = 'classic',
  LOSERS = 'losers',
  SUICIDE = 'suicide',
  ATOMIC = 'atomic',
  CRAZYHOUSE = 'crazyhouse',
  CHESS960 = 'chess960',
  FREESTYLE = 'freestyle'
}

export enum GameResult {
  IN_PROGRESS = 'in_progress',
  WHITE_WINS = 'white_wins',
  BLACK_WINS = 'black_wins',
  DRAW = 'draw',
  WHITE_WINS_ON_TIME = 'white_wins_on_time',
  BLACK_WINS_ON_TIME = 'black_wins_on_time',
  ABORTED = 'aborted'
}

// Type definitions
export interface Piece {
  type: PieceType;
  color: Color;
}

export interface CastlingRights {
  K: boolean; // White kingside
  Q: boolean; // White queenside
  k: boolean; // Black kingside
  q: boolean; // Black queenside
}

export interface MoveObject {
  from: string;
  to: string;
  promotion?: PieceType;
  isEnPassant?: boolean;
  castling?: 'kingside' | 'queenside';
}

export type Square = string; // Algebraic notation like 'e4'
export type Board = (Piece | null)[][];

/**
 * Represents a chess move with all relevant information
 */
export class Move {
  constructor(
    public readonly san: string,
    public readonly from: string,
    public readonly to: string,
    public readonly capturedPiece: Piece | null = null,
    public readonly promotion: PieceType | null = null,
    public readonly isEnPassant: boolean = false,
    public readonly isCastling: boolean = false,
    public readonly castlingSide: 'kingside' | 'queenside' | null = null
  ) {}

  /**
   * Returns whether this move is a capture
   */
  isCapture(): boolean {
    return this.capturedPiece !== null || this.isEnPassant;
  }

  /**
   * Returns whether this move is a promotion
   */
  isPromotion(): boolean {
    return this.promotion !== null;
  }

  /**
   * Returns a string representation of the move
   */
  toString(): string {
    return this.san;
  }

  /**
   * Returns a detailed string representation of the move
   */
  toDetailedString(): string {
    let details = `${this.san} (${this.from}-${this.to})`;

    if (this.isCapture()) {
      if (this.isEnPassant) {
        details += ' [en passant]';
      } else if (this.capturedPiece) {
        details += ` [captures ${this.capturedPiece.type}]`;
      }
    }

    if (this.isPromotion()) {
      details += ` [promotes to ${this.promotion}]`;
    }

    if (this.isCastling) {
      details += ` [${this.castlingSide} castling]`;
    }

    return details;
  }

  /**
   * Creates a Move object from a simple move object
   */
  static fromMoveObject(
    moveObj: MoveObject,
    san: string,
    capturedPiece: Piece | null = null
  ): Move {
    return new Move(
      san,
      moveObj.from,
      moveObj.to,
      capturedPiece,
      moveObj.promotion || null,
      moveObj.isEnPassant || false,
      moveObj.castling !== undefined,
      moveObj.castling || null
    );
  }
}

/**
 * Main chess board class supporting multiple variants
 */
export class ChessBoard {
  private board: Board;
  private activeColor: Color;
  private castlingRights: CastlingRights;
  private enPassantTarget: Square | null;
  private halfMoveClock: number;
  private fullMoveNumber: number;
  private moveHistory: Move[] = [];
  private positionHistory: string[] = [];
  private capturedPieces: { [key in Color]: PieceType[] } = {
    [Color.WHITE]: [],
    [Color.BLACK]: []
  };

  constructor(
    private variant: Variant = Variant.CLASSIC,
    fen?: string
  ) {
    this.board = this._createEmptyBoard();
    this.activeColor = Color.WHITE;
    this.castlingRights = { K: true, Q: true, k: true, q: true };
    this.enPassantTarget = null;
    this.halfMoveClock = 0;
    this.fullMoveNumber = 1;

    if (fen) {
      this.loadFen(fen);
    } else {
      this._setupStartingPosition();
    }

    this.positionHistory.push(this.getFen());
  }

  /**
   * Creates an empty 8x8 board
   */
  private _createEmptyBoard(): Board {
    return Array(8).fill(null).map(() => Array(8).fill(null));
  }

  /**
   * Sets up the starting position based on variant
   */
  private _setupStartingPosition(): void {
    if (this.variant === Variant.CHESS960) {
      this._setupChess960Position();
      return;
    }

    // Standard starting position
    const backRank = [
      PieceType.ROOK,
      PieceType.KNIGHT,
      PieceType.BISHOP,
      PieceType.QUEEN,
      PieceType.KING,
      PieceType.BISHOP,
      PieceType.KNIGHT,
      PieceType.ROOK
    ];

    // Place pieces
    for (let col = 0; col < 8; col++) {
      // White pieces
      this.board[0][col] = { type: backRank[col], color: Color.WHITE };
      this.board[1][col] = { type: PieceType.PAWN, color: Color.WHITE };
      
      // Black pieces
      this.board[7][col] = { type: backRank[col], color: Color.BLACK };
      this.board[6][col] = { type: PieceType.PAWN, color: Color.BLACK };
    }
  }

  /**
   * Sets up a Chess960 starting position
   */
  private _setupChess960Position(): void {
    // Chess960 implementation would go here
    // For now, use standard position
    this._setupStartingPosition();
  }

  /**
   * Loads a position from FEN notation
   */
  loadFen(fen: string): boolean {
    try {
      const parts = fen.split(' ');
      if (parts.length < 4) return false;

      const [position, active, castling, enPassant, halfMove = '0', fullMove = '1'] = parts;

      // Clear board
      this.board = this._createEmptyBoard();

      // Parse position
      const rows = position.split('/');
      if (rows.length !== 8) return false;

      for (let row = 0; row < 8; row++) {
        let col = 0;
        for (const char of rows[7 - row]) {
          if (/[1-8]/.test(char)) {
            col += parseInt(char);
          } else {
            const piece = this._charToPiece(char);
            if (!piece) return false;
            this.board[row][col] = piece;
            col++;
          }
        }
        if (col !== 8) return false;
      }

      // Parse active color
      this.activeColor = active === 'w' ? Color.WHITE : Color.BLACK;

      // Parse castling rights
      this.castlingRights = {
        K: castling.includes('K'),
        Q: castling.includes('Q'),
        k: castling.includes('k'),
        q: castling.includes('q')
      };

      // Parse en passant
      this.enPassantTarget = enPassant === '-' ? null : enPassant;

      // Parse move counters
      this.halfMoveClock = parseInt(halfMove);
      this.fullMoveNumber = parseInt(fullMove);

      this.positionHistory = [this.getFen()];
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Generates FEN notation for current position
   */
  getFen(): string {
    let fen = '';

    // Position
    for (let row = 7; row >= 0; row--) {
      let emptyCount = 0;
      for (let col = 0; col < 8; col++) {
        const piece = this.board[row][col];
        if (!piece) {
          emptyCount++;
        } else {
          if (emptyCount > 0) {
            fen += emptyCount;
            emptyCount = 0;
          }
          fen += this._pieceToChar(piece);
        }
      }
      if (emptyCount > 0) fen += emptyCount;
      if (row > 0) fen += '/';
    }

    // Active color
    fen += ` ${this.activeColor}`;

    // Castling rights
    let castling = '';
    if (this.castlingRights.K) castling += 'K';
    if (this.castlingRights.Q) castling += 'Q';
    if (this.castlingRights.k) castling += 'k';
    if (this.castlingRights.q) castling += 'q';
    fen += ` ${castling || '-'}`;

    // En passant
    fen += ` ${this.enPassantTarget || '-'}`;

    // Move counters
    fen += ` ${this.halfMoveClock} ${this.fullMoveNumber}`;

    return fen;
  }

  /**
   * Converts a character to a piece object
   */
  private _charToPiece(char: string): Piece | null {
    const type = char.toLowerCase() as PieceType;
    if (!Object.values(PieceType).includes(type)) return null;
    
    const color = char === char.toUpperCase() ? Color.WHITE : Color.BLACK;
    return { type, color };
  }

  /**
   * Converts a piece object to FEN character
   */
  private _pieceToChar(piece: Piece): string {
    return piece.color === Color.WHITE 
      ? piece.type.toUpperCase() 
      : piece.type.toLowerCase();
  }

  /**
   * Makes a move using Standard Algebraic Notation
   */
  makeMove(san: string): Move | null {
    const move = this._parseFlexibleSan(san);
    if (!move) return null;

    if (this._isLegalMove(move)) {
      return this._executeMove(move);
    }
    return null;
  }

  /**
   * Makes a move using long algebraic notation
   */
  makeLongAlgebraicMove(from: string, to: string, promotion?: PieceType): Move | null {
    const piece = this.getPiece(from);
    if (!piece || piece.color !== this.activeColor) return null;

    const moveObj: MoveObject = { from, to, promotion };
    const san = this._generateSan(moveObj);
    const capturedPiece = this.getPiece(to);

    const move = Move.fromMoveObject(moveObj, san, capturedPiece);
    
    if (this._isLegalMove(move)) {
      return this._executeMove(move);
    }
    return null;
  }

  /**
   * Gets the piece at a given square
   */
  getPiece(square: Square): Piece | null {
    const coords = this._algebraicToCoords(square);
    if (!coords) return null;
    return this.board[coords.row][coords.col];
  }

  /**
   * Gets whose turn it is
   */
  getActiveColor(): Color {
    return this.activeColor;
  }

  /**
   * Gets all legal moves from a position or for the current player
   */
  getLegalMoves(square?: Square): Move[] {
    const moves: Move[] = [];
    
    if (square) {
      // Get moves for a specific piece
      const coords = this._algebraicToCoords(square);
      if (!coords) return moves;
      
      const piece = this.board[coords.row][coords.col];
      if (!piece || piece.color !== this.activeColor) return moves;
      
      const context = {
        board: this.board,
        activeColor: this.activeColor,
        castlingRights: this.castlingRights,
        enPassantTarget: this.enPassantTarget,
        variant: this.variant
      };
      
      const possibleMoves = MoveGenerator.generatePieceMoves(context, coords, piece);
      
      // Convert to Move objects and validate
      for (const moveObj of possibleMoves) {
        const capturedPiece = this.getPiece(moveObj.to);
        const move = Move.fromMoveObject(moveObj, this._generateSan(moveObj), capturedPiece);
        
        if (this._isLegalMove(move)) {
          moves.push(move);
        }
      }
    } else {
      // Get all moves for the current player
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
          const piece = this.board[row][col];
          if (piece && piece.color === this.activeColor) {
            const squareMoves = this.getLegalMoves(this._coordsToAlgebraic({ row, col }));
            moves.push(...squareMoves);
          }
        }
      }
      
      // Add drop moves for Crazyhouse
      if (this.variant === Variant.CRAZYHOUSE) {
        const pieces = this.capturedPieces[this.activeColor];
        const uniquePieces = [...new Set(pieces)];
        
        for (const pieceType of uniquePieces) {
          for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
              if (!this.board[row][col]) {
                const dropSquare = this._coordsToAlgebraic({ row, col });
                const dropMove = new Move(
                  `${pieceType.toUpperCase()}@${dropSquare}`,
                  '@',
                  dropSquare,
                  null,
                  null,
                  false,
                  false,
                  null
                );
                moves.push(dropMove);
              }
            }
          }
        }
      }
    }
    
    return moves;
  }

  /**
   * Converts coordinates to algebraic notation
   */
  private _coordsToAlgebraic(coords: Coordinates): string {
    return String.fromCharCode('a'.charCodeAt(0) + coords.col) + (coords.row + 1);
  }

  /**
   * Checks if the game is over
   */
  isGameOver(): boolean {
    return this._isCheckmate() || this._isStalemate() || this._isDraw();
  }

  /**
   * Gets the game result
   */
  getGameResult(): GameResult {
    if (!this.isGameOver()) return GameResult.IN_PROGRESS;
    
    if (this._isCheckmate()) {
      return this.activeColor === Color.WHITE 
        ? GameResult.BLACK_WINS 
        : GameResult.WHITE_WINS;
    }
    
    return GameResult.DRAW;
  }

  /**
   * Parses flexible SAN notation
   */
  private _parseFlexibleSan(san: string): Move | null {
    return SANParser.parseSAN(san, this.board, this.activeColor);
  }

  /**
   * Validates if a move is legal
   */
  private _isLegalMove(move: Move): boolean {
    return MoveValidator.isLegalMove(this.board, move, this.activeColor, this.variant);
  }

  /**
   * Executes a validated move
   */
  private _executeMove(move: Move): Move {
    const result = MoveExecutor.executeMove(
      this.board,
      move,
      this.activeColor,
      this.variant,
      this.castlingRights
    );

    if (!result.success) {
      throw new Error('Move execution failed');
    }

    // Update board state
    this.board = result.updatedBoard;
    
    // Update castling rights
    if (result.castlingRightsUpdate) {
      Object.assign(this.castlingRights, result.castlingRightsUpdate);
    }

    // Update en passant target
    this.enPassantTarget = result.enPassantTarget || null;

    // Update move counters
    if (move.capturedPiece || move.from[1] === 'p') {
      this.halfMoveClock = 0;
    } else {
      this.halfMoveClock++;
    }

    if (this.activeColor === Color.BLACK) {
      this.fullMoveNumber++;
    }

    // Switch active color
    this.activeColor = this.activeColor === Color.WHITE ? Color.BLACK : Color.WHITE;

    // Update history
    this.moveHistory.push(move);
    this.positionHistory.push(this.getFen());

    // Handle captured pieces for Crazyhouse
    if (this.variant === Variant.CRAZYHOUSE && result.capturedPiece) {
      const capturedType = result.capturedPiece.type;
      const captureForColor = result.capturedPiece.color === Color.WHITE ? Color.BLACK : Color.WHITE;
      this.capturedPieces[captureForColor].push(capturedType);
    }

    return move;
  }

  /**
   * Generates SAN for a move object
   */
  private _generateSan(moveObj: MoveObject): string {
    // This would need full implementation
    return `${moveObj.from}${moveObj.to}${moveObj.promotion || ''}`;
  }

  /**
   * Converts algebraic notation to coordinates
   */
  private _algebraicToCoords(square: Square): Coordinates | null {
    if (square.length !== 2) return null;
    const col = square.charCodeAt(0) - 'a'.charCodeAt(0);
    const row = parseInt(square[1]) - 1;
    if (col < 0 || col > 7 || row < 0 || row > 7) return null;
    return { row, col };
  }

  /**
   * Checks if the current player's king is in check
   */
  private _isCheck(): boolean {
    return MoveValidator.isKingInCheck(this.board, this.activeColor, this.variant);
  }

  /**
   * Checks if the current position is checkmate
   */
  private _isCheckmate(): boolean {
    if (!this._isCheck()) return false;
    return this.getLegalMoves().length === 0;
  }

  /**
   * Checks if the current position is stalemate
   */
  private _isStalemate(): boolean {
    if (this._isCheck()) return false;
    return this.getLegalMoves().length === 0;
  }

  /**
   * Checks if the game is a draw
   */
  private _isDraw(): boolean {
    // 50-move rule
    if (this.halfMoveClock >= 100) return true;
    
    // Insufficient material
    if (MoveExecutor.hasInsufficientMaterial(this.board)) return true;
    
    // Threefold repetition
    if (MoveExecutor.isThreefoldRepetition(this.positionHistory)) return true;
    
    return false;
  }

  /**
   * Gets captured pieces for a color (Crazyhouse variant)
   */
  getCapturedPieces(color: Color): PieceType[] {
    return [...this.capturedPieces[color]];
  }

  /**
   * Makes a drop move (Crazyhouse variant)
   */
  makeDropMove(piece: PieceType, square: Square): Move | null {
    if (this.variant !== Variant.CRAZYHOUSE) return null;
    
    // Check if we have the piece
    const capturedIndex = this.capturedPieces[this.activeColor].indexOf(piece);
    if (capturedIndex === -1) return null;
    
    // Execute the drop
    const result = MoveExecutor.executeDrop(this.board, piece, square, this.activeColor);
    if (!result.success) return null;
    
    // Update state
    this.board = result.updatedBoard;
    this.capturedPieces[this.activeColor].splice(capturedIndex, 1);
    this.activeColor = this.activeColor === Color.WHITE ? Color.BLACK : Color.WHITE;
    this.halfMoveClock++;
    if (this.activeColor === Color.WHITE) {
      this.fullMoveNumber++;
    }
    
    const move = new Move(
      `${piece.toUpperCase()}@${square}`,
      '@',
      square,
      null,
      null,
      false,
      false,
      null
    );
    
    this.moveHistory.push(move);
    this.positionHistory.push(this.getFen());
    
    return move;
  }

  /**
   * Validates a premove
   */
  isValidPremove(from: Square, to: Square): boolean {
    const piece = this.getPiece(from);
    if (!piece) return false;
    
    // For now, just check if it's a valid square
    const fromCoords = this._algebraicToCoords(from);
    const toCoords = this._algebraicToCoords(to);
    
    return fromCoords !== null && toCoords !== null;
  }
}
}