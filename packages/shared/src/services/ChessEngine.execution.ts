/**
 * Move execution logic for the Chess Engine
 */

import {
  ChessBoard,
  Move,
  Piece,
  PieceType,
  Color,
  Variant,
  Board,
  CastlingRights,
  Square
} from './ChessEngine';
import { Coordinates } from './ChessEngine.types';
import { VariantRules } from './ChessEngine.variants';

export interface ExecutionResult {
  success: boolean;
  updatedBoard: Board;
  capturedPiece?: Piece;
  castlingRightsUpdate?: Partial<CastlingRights>;
  enPassantTarget?: Square | null;
  promotedPiece?: boolean;
}

export class MoveExecutor {
  /**
   * Executes a move on the board and returns the result
   */
  static executeMove(
    board: Board,
    move: Move,
    activeColor: Color,
    variant: Variant,
    castlingRights: CastlingRights
  ): ExecutionResult {
    const result: ExecutionResult = {
      success: false,
      updatedBoard: this.copyBoard(board)
    };

    const from = this.algebraicToCoords(move.from);
    const to = this.algebraicToCoords(move.to);

    if (!from || !to) {
      return result;
    }

    const piece = result.updatedBoard[from.row][from.col];
    if (!piece || piece.color !== activeColor) {
      return result;
    }

    // Handle different move types
    if (move.isCastling) {
      return this.executeCastling(result.updatedBoard, move, activeColor);
    }

    // Capture the piece at destination if any
    const capturedPiece = result.updatedBoard[to.row][to.col];
    if (capturedPiece) {
      result.capturedPiece = capturedPiece;
    }

    // Move the piece
    result.updatedBoard[to.row][to.col] = piece;
    result.updatedBoard[from.row][from.col] = null;

    // Handle special moves
    if (move.isEnPassant) {
      const captureRow = from.row;
      const capturedPawn = result.updatedBoard[captureRow][to.col];
      if (capturedPawn) {
        result.capturedPiece = capturedPawn;
        result.updatedBoard[captureRow][to.col] = null;
      }
    }

    // Handle promotion
    if (move.promotion) {
      result.updatedBoard[to.row][to.col]!.type = move.promotion;
      result.promotedPiece = true;
    }

    // Handle variant-specific effects
    if (variant === Variant.ATOMIC && result.capturedPiece) {
      // Import VariantRules at the top of file
      VariantRules.handleAtomicExplosion(result.updatedBoard, to, variant);
    }

    // Update castling rights
    result.castlingRightsUpdate = this.updateCastlingRights(
      piece,
      from,
      to,
      castlingRights,
      activeColor
    );

    // Set en passant target for two-square pawn moves
    if (piece.type === PieceType.PAWN && Math.abs(to.row - from.row) === 2) {
      const enPassantRow = from.row + (to.row - from.row) / 2;
      result.enPassantTarget = this.coordsToAlgebraic({ row: enPassantRow, col: to.col });
    } else {
      result.enPassantTarget = null;
    }

    result.success = true;
    return result;
  }

  /**
   * Executes a castling move
   */
  private static executeCastling(
    board: Board,
    move: Move,
    color: Color
  ): ExecutionResult {
    const result: ExecutionResult = {
      success: true,
      updatedBoard: board
    };

    const row = color === Color.WHITE ? 0 : 7;
    const isKingside = move.castlingSide === 'kingside';

    if (isKingside) {
      // Move king from e to g
      board[row][6] = board[row][4];
      board[row][4] = null;
      // Move rook from h to f
      board[row][5] = board[row][7];
      board[row][7] = null;
    } else {
      // Move king from e to c
      board[row][2] = board[row][4];
      board[row][4] = null;
      // Move rook from a to d
      board[row][3] = board[row][0];
      board[row][0] = null;
    }

    // Update castling rights - king has moved
    result.castlingRightsUpdate = color === Color.WHITE
      ? { K: false, Q: false }
      : { k: false, q: false };

    return result;
  }


  /**
   * Updates castling rights based on piece movement
   */
  private static updateCastlingRights(
    piece: Piece,
    from: Coordinates,
    to: Coordinates,
    currentRights: CastlingRights,
    activeColor: Color
  ): Partial<CastlingRights> | undefined {
    const updates: Partial<CastlingRights> = {};
    let hasChanges = false;

    // King movement removes all castling rights for that color
    if (piece.type === PieceType.KING) {
      if (activeColor === Color.WHITE) {
        if (currentRights.K || currentRights.Q) {
          updates.K = false;
          updates.Q = false;
          hasChanges = true;
        }
      } else {
        if (currentRights.k || currentRights.q) {
          updates.k = false;
          updates.q = false;
          hasChanges = true;
        }
      }
    }

    // Rook movement removes castling rights for that side
    if (piece.type === PieceType.ROOK) {
      if (activeColor === Color.WHITE) {
        if (from.row === 0) {
          if (from.col === 0 && currentRights.Q) {
            updates.Q = false;
            hasChanges = true;
          } else if (from.col === 7 && currentRights.K) {
            updates.K = false;
            hasChanges = true;
          }
        }
      } else {
        if (from.row === 7) {
          if (from.col === 0 && currentRights.q) {
            updates.q = false;
            hasChanges = true;
          } else if (from.col === 7 && currentRights.k) {
            updates.k = false;
            hasChanges = true;
          }
        }
      }
    }

    // Capture of rook removes opponent's castling rights
    const capturedPiece = piece; // Would need to be passed in
    if (capturedPiece && capturedPiece.type === PieceType.ROOK) {
      const opponentColor = activeColor === Color.WHITE ? Color.BLACK : Color.WHITE;
      if (opponentColor === Color.WHITE) {
        if (to.row === 0) {
          if (to.col === 0 && currentRights.Q) {
            updates.Q = false;
            hasChanges = true;
          } else if (to.col === 7 && currentRights.K) {
            updates.K = false;
            hasChanges = true;
          }
        }
      } else {
        if (to.row === 7) {
          if (to.col === 0 && currentRights.q) {
            updates.q = false;
            hasChanges = true;
          } else if (to.col === 7 && currentRights.k) {
            updates.k = false;
            hasChanges = true;
          }
        }
      }
    }

    return hasChanges ? updates : undefined;
  }

  /**
   * Executes a piece drop (Crazyhouse variant)
   */
  static executeDrop(
    board: Board,
    pieceType: PieceType,
    square: Square,
    color: Color
  ): ExecutionResult {
    const result: ExecutionResult = {
      success: false,
      updatedBoard: this.copyBoard(board)
    };

    const coords = this.algebraicToCoords(square);
    if (!coords) {
      return result;
    }

    // Check if square is empty
    if (result.updatedBoard[coords.row][coords.col]) {
      return result;
    }

    // Place the piece
    result.updatedBoard[coords.row][coords.col] = {
      type: pieceType,
      color: color
    };

    result.success = true;
    return result;
  }

  /**
   * Creates a deep copy of the board
   */
  private static copyBoard(board: Board): Board {
    return board.map(row => row.map(piece => piece ? { ...piece } : null));
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
    
    return { row, col };
  }

  /**
   * Converts coordinates to algebraic notation
   */
  private static coordsToAlgebraic(coords: Coordinates): string {
    return String.fromCharCode('a'.charCodeAt(0) + coords.col) + (coords.row + 1);
  }

  /**
   * Checks if a move would result in insufficient material
   */
  static hasInsufficientMaterial(board: Board): boolean {
    const pieces: { [key: string]: Piece[] } = {
      white: [],
      black: []
    };

    // Count all pieces
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (piece) {
          const colorKey = piece.color === Color.WHITE ? 'white' : 'black';
          pieces[colorKey].push(piece);
        }
      }
    }

    // Check each side
    for (const color of ['white', 'black']) {
      const colorPieces = pieces[color];
      
      // King only
      if (colorPieces.length === 1) continue;
      
      // King + bishop or king + knight
      if (colorPieces.length === 2) {
        const nonKing = colorPieces.find(p => p.type !== PieceType.KING);
        if (nonKing && (nonKing.type === PieceType.BISHOP || nonKing.type === PieceType.KNIGHT)) {
          continue;
        }
      }
      
      // If we get here, this side has sufficient material
      return false;
    }
    
    // Both sides have insufficient material
    return true;
  }

  /**
   * Checks for threefold repetition
   */
  static isThreefoldRepetition(positionHistory: string[]): boolean {
    const positionCounts = new Map<string, number>();
    
    for (const position of positionHistory) {
      // Extract just the position part of FEN (ignore move counters)
      const relevantPart = position.split(' ').slice(0, 4).join(' ');
      const count = positionCounts.get(relevantPart) || 0;
      positionCounts.set(relevantPart, count + 1);
      
      if (count + 1 >= 3) {
        return true;
      }
    }
    
    return false;
  }
}