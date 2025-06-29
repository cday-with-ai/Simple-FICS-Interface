/**
 * SAN (Standard Algebraic Notation) parser for the Chess Engine
 */

import {
  Move,
  Piece,
  PieceType,
  Color,
  Board,
  Square
} from './ChessEngine';
import { Coordinates } from './ChessEngine.types';
import { MoveGenerator } from './ChessEngine.moveGeneration';

export interface ParsedMove {
  pieceType: PieceType;
  from?: { file?: number; rank?: number };
  to: Square;
  capture?: boolean;
  promotion?: PieceType;
  castling?: 'kingside' | 'queenside';
  drop?: boolean;
  checkSymbol?: '+' | '#';
}

export class SANParser {
  // Regex patterns for different move formats
  private static readonly CASTLING_PATTERN = /^(O-O-O|O-O|0-0-0|0-0)([+#])?$/;
  private static readonly DROP_PATTERN = /^([PNBRQK])@([a-h][1-8])([+#])?$/;
  private static readonly STANDARD_MOVE_PATTERN = /^([NBRQK])([a-h])?([1-8])?x?([a-h][1-8])(?:=([NBRQK]))?([+#])?$/;
  private static readonly PAWN_MOVE_PATTERN = /^([a-h])?x?([a-h][1-8])(?:=([NBRQK]))?([+#])?$/;

  /**
   * Parses a SAN string into a Move object
   */
  static parseSAN(
    san: string,
    board: Board,
    activeColor: Color,
    enPassantTarget?: string | null
  ): Move | null {
    // Clean the input
    san = san.trim().replace(/[!?]+/g, '');

    // Try castling
    const castlingMatch = san.match(this.CASTLING_PATTERN);
    if (castlingMatch) {
      return this.parseCastling(castlingMatch[1], activeColor);
    }

    // Try drop move (Crazyhouse)
    const dropMatch = san.match(this.DROP_PATTERN);
    if (dropMatch) {
      return this.parseDrop(dropMatch, activeColor);
    }

    // Try standard move
    const parsed = this.parseStandardNotation(san);
    if (!parsed) {
      return null;
    }

    // Find the actual move
    return this.resolveMove(parsed, board, activeColor, enPassantTarget);
  }

  /**
   * Parses castling notation
   */
  private static parseCastling(
    notation: string,
    color: Color
  ): Move {
    const isKingside = notation === 'O-O' || notation === '0-0';
    const row = color === Color.WHITE ? '1' : '8';
    
    return new Move(
      notation,
      `e${row}`,
      isKingside ? `g${row}` : `c${row}`,
      null,
      null,
      false,
      true,
      isKingside ? 'kingside' : 'queenside'
    );
  }

  /**
   * Parses drop notation (Crazyhouse)
   */
  private static parseDrop(
    match: RegExpMatchArray,
    color: Color
  ): Move {
    const pieceChar = match[1];
    const square = match[2];
    const pieceType = pieceChar.toLowerCase() as PieceType;

    return new Move(
      match[0],
      '@',
      square,
      null,
      null,
      false,
      false,
      null
    );
  }

  /**
   * Parses standard move notation
   */
  private static parseStandardNotation(san: string): ParsedMove | null {
    // Remove check/checkmate symbols for parsing
    const checkSymbol = san.match(/([+#])$/)?.[1] as '+' | '#' | undefined;
    san = san.replace(/[+#]$/, '');

    // Try piece move first
    const pieceMatch = san.match(this.STANDARD_MOVE_PATTERN);
    if (pieceMatch) {
      return {
        pieceType: pieceMatch[1].toLowerCase() as PieceType,
        from: this.parseDisambiguation(pieceMatch[2], pieceMatch[3]),
        to: pieceMatch[4] as Square,
        capture: san.includes('x'),
        promotion: pieceMatch[5]?.toLowerCase() as PieceType | undefined,
        checkSymbol
      };
    }

    // Try pawn move
    const pawnMatch = san.match(this.PAWN_MOVE_PATTERN);
    if (pawnMatch) {
      return {
        pieceType: PieceType.PAWN,
        from: pawnMatch[1] ? { file: pawnMatch[1].charCodeAt(0) - 'a'.charCodeAt(0) } : undefined,
        to: pawnMatch[2] as Square,
        capture: san.includes('x'),
        promotion: pawnMatch[3]?.toLowerCase() as PieceType | undefined,
        checkSymbol
      };
    }

    return null;
  }

  /**
   * Parses disambiguation (file/rank hints)
   */
  private static parseDisambiguation(
    file?: string,
    rank?: string
  ): { file?: number; rank?: number } | undefined {
    if (!file && !rank) return undefined;

    const result: { file?: number; rank?: number } = {};
    
    if (file) {
      result.file = file.charCodeAt(0) - 'a'.charCodeAt(0);
    }
    
    if (rank) {
      result.rank = parseInt(rank) - 1;
    }
    
    return result;
  }

  /**
   * Resolves the actual move from parsed notation
   */
  private static resolveMove(
    parsed: ParsedMove,
    board: Board,
    activeColor: Color,
    enPassantTarget?: string | null
  ): Move | null {
    const possibleMoves = this.findPossibleMoves(
      parsed,
      board,
      activeColor,
      enPassantTarget
    );

    if (possibleMoves.length === 0) {
      return null;
    }

    if (possibleMoves.length === 1) {
      return possibleMoves[0];
    }

    // Multiple moves possible - use disambiguation
    if (parsed.from) {
      const filtered = possibleMoves.filter(move => {
        const from = this.algebraicToCoords(move.from);
        if (!from) return false;

        if (parsed.from!.file !== undefined && from.col !== parsed.from!.file) {
          return false;
        }
        
        if (parsed.from!.rank !== undefined && from.row !== parsed.from!.rank) {
          return false;
        }
        
        return true;
      });

      if (filtered.length === 1) {
        return filtered[0];
      }
    }

    // Still ambiguous
    return null;
  }

  /**
   * Finds all possible moves matching the parsed notation
   */
  private static findPossibleMoves(
    parsed: ParsedMove,
    board: Board,
    activeColor: Color,
    enPassantTarget?: string | null
  ): Move[] {
    const moves: Move[] = [];
    const toCoords = this.algebraicToCoords(parsed.to);
    if (!toCoords) return moves;

    // Search all squares for pieces that could make this move
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = board[row][col];
        if (!piece || piece.color !== activeColor || piece.type !== parsed.pieceType) {
          continue;
        }

        const from = this.coordsToAlgebraic({ row, col });
        
        // Check if this piece can move to the target square
        if (this.canPieceMoveToSquare(
          board,
          { row, col },
          toCoords,
          piece,
          parsed.capture || false,
          enPassantTarget
        )) {
          const capturedPiece = board[toCoords.row][toCoords.col];
          
          // Handle special pawn moves
          let isEnPassant = false;
          if (piece.type === PieceType.PAWN && parsed.capture && !capturedPiece) {
            // Check if this is en passant by verifying the en passant target
            // For en passant, the pawn moves diagonally to an empty square that is the en passant target
            if (enPassantTarget && parsed.to === enPassantTarget) {
              isEnPassant = true;
            }
          }

          const move = new Move(
            parsed.pieceType === PieceType.PAWN 
              ? this.generatePawnSAN(from, parsed.to, parsed.capture, parsed.promotion)
              : this.generatePieceSAN(parsed.pieceType, from, parsed.to, parsed.capture),
            from,
            parsed.to,
            capturedPiece,
            parsed.promotion,
            isEnPassant
          );
          
          moves.push(move);
        }
      }
    }

    return moves;
  }

  /**
   * Checks if a piece can move to a square
   */
  private static canPieceMoveToSquare(
    board: Board,
    from: Coordinates,
    to: Coordinates,
    piece: Piece,
    isCapture: boolean,
    enPassantTarget?: string | null
  ): boolean {
    // Generate all possible moves for the piece
    const context = {
      board,
      activeColor: piece.color,
      castlingRights: { K: false, Q: false, k: false, q: false },
      enPassantTarget: enPassantTarget || null,
      variant: 'classic' as any
    };

    const possibleMoves = MoveGenerator.generatePieceMoves(context, from, piece);
    const toSquare = this.coordsToAlgebraic(to);

    return possibleMoves.some(move => {
      if (move.to !== toSquare) return false;
      
      const targetPiece = board[to.row][to.col];
      const moveIsCapture = targetPiece !== null;
      
      // For capture moves, we need to check if the target square has an enemy piece
      if (isCapture) {
        return moveIsCapture && targetPiece?.color !== piece.color;
      }
      
      return moveIsCapture === isCapture;
    });
  }

  /**
   * Generates SAN for a pawn move
   */
  private static generatePawnSAN(
    from: string,
    to: string,
    capture?: boolean,
    promotion?: PieceType
  ): string {
    let san = '';
    
    if (capture) {
      san += from[0] + 'x';
    }
    
    san += to;
    
    if (promotion) {
      san += '=' + promotion.toUpperCase();
    }
    
    return san;
  }

  /**
   * Generates SAN for a piece move
   */
  private static generatePieceSAN(
    pieceType: PieceType,
    from: string,
    to: string,
    capture?: boolean
  ): string {
    let san = pieceType.toUpperCase();
    
    // TODO: Add disambiguation if needed
    
    if (capture) {
      san += 'x';
    }
    
    san += to;
    
    return san;
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
}