// Constants for piece types, colors, variants, and move types
const PieceType = {
    PAWN: 'pawn',
    KNIGHT: 'knight',
    BISHOP: 'bishop',
    ROOK: 'rook',
    QUEEN: 'queen',
    KING: 'king'
};

const Color = {
    WHITE: 'white',
    BLACK: 'black'
};

const Variant = {
    CLASSIC: 'classic',
    CRAZYHOUSE: 'crazyhouse',
    CHESS960: 'chess960',
    ATOMIC: 'atomic',
    LOSERS: 'losers',
    SUICIDE: 'suicide'
};

const MoveType = {
    NORMAL: 'normal',
    PROMOTION: 'promotion',
    CASTLING: 'castling',
    EN_PASSANT: 'enPassant',
    DROP: 'drop' // For Crazyhouse
};

/**
 * Represents a square on the chessboard.
 */
class Square {
    constructor(file, rank) {
        this.file = file;
        this.rank = rank;
        this.piece = null;
        this.color = (file + rank) % 2 === 0 ? 'dark' : 'light';
    }

    toAlgebraic() {
        return String.fromCharCode('a'.charCodeAt(0) + this.file) + (this.rank + 1);
    }
}

/**
 * Represents a chess piece.
 */
class Piece {
    constructor(type, color, square) {
        this.type = type;
        this.color = color;
        this.square = square;
        if (square) square.piece = this;
    }
}

/**
 * Represents a chess move.
 */
class Move {
    constructor({
                    shortAlg,
                    longAlg,
                    san,
                    startSquare,
                    endSquare,
                    movingPiece,
                    capturedPiece,
                    movingColor,
                    capturedColor,
                    moveType,
                    promotionType
                }) {
        this.shortAlg = shortAlg;
        this.longAlg = longAlg;
        this.san = san;
        this.startSquare = startSquare;
        this.endSquare = endSquare;
        this.movingPiece = movingPiece;
        this.capturedPiece = capturedPiece || null;
        this.movingColor = movingColor;
        this.capturedColor = capturedColor || null;
        this.moveType = moveType;
        this.promotionType = promotionType || null;
        this.previousCastlingRights = null;
        this.previousEnPassantSquare = null;
        this.previousHalfMoveClock = 0;
        this.rookStartSquare = null;
        this.rookEndSquare = null;
    }
}

/**
 * Represents the chessboard and game state with variant support.
 */
class Board {
    constructor(fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', variant = Variant.CLASSIC) {
        this.variant = variant;
        this.squares = Array(64).fill(null).map((_, i) => new Square(i % 8, Math.floor(i / 8)));
        this.pieces = [];
        this.turn = Color.WHITE;
        this.castlingRights = { whiteKingSide: false, whiteQueenSide: false, blackKingSide: false, blackQueenSide: false };
        this.enPassantSquare = null;
        this.halfMoveClock = 0;
        this.fullMoveNumber = 1;
        this.whiteHand = variant === Variant.CRAZYHOUSE ? { pawn: 0, knight: 0, bishop: 0, rook: 0, queen: 0 } : null;
        this.blackHand = variant === Variant.CRAZYHOUSE ? { pawn: 0, knight: 0, bishop: 0, rook: 0, queen: 0 } : null;
        this.history = [];
        this.loadFromFEN(fen);
    }

    /**
     * Loads the board state from a FEN string, including variant-specific data.
     */
    loadFromFEN(fen) {
        const parts = fen.split(' ');
        let position = parts[0];
        const turn = parts[1];
        const castling = parts[2];
        const enPassant = parts[3];
        const halfMove = parts[4];
        const fullMove = parts[5];

        let rank = 7, file = 0;
        for (const char of position) {
            if (char === '/') { rank--; file = 0; }
            else if (/\d/.test(char)) file += parseInt(char);
            else if (char === '[') break; // Start of Crazyhouse hand notation
            else {
                const color = char === char.toUpperCase() ? Color.WHITE : Color.BLACK;
                const type = { p: 'pawn', n: 'knight', b: 'bishop', r: 'rook', q: 'queen', k: 'king' }[char.toLowerCase()];
                const square = this.getSquare(file, rank);
                this.pieces.push(new Piece(type, color, square));
                file++;
            }
        }

        this.turn = turn === 'w' ? Color.WHITE : Color.BLACK;
        this.castlingRights = {
            whiteKingSide: castling.includes('K'),
            whiteQueenSide: castling.includes('Q'),
            blackKingSide: castling.includes('k'),
            blackQueenSide: castling.includes('q')
        };
        this.enPassantSquare = enPassant === '-' ? null : this.getSquareFromAlg(enPassant);
        this.halfMoveClock = parseInt(halfMove);
        this.fullMoveNumber = parseInt(fullMove);

        if (this.variant === Variant.CRAZYHOUSE) this.parseCrazyhouseFEN(fen);
    }

    /**
     * Parses Crazyhouse-specific FEN notation for pieces in hand.
     */
    parseCrazyhouseFEN(fen) {
        const handMatch = fen.match(/\[([pnbrqPNBRQ]*)\]/);
        if (handMatch) {
            for (const char of handMatch[1]) {
                const color = char === char.toUpperCase() ? Color.WHITE : Color.BLACK;
                const type = { p: 'pawn', n: 'knight', b: 'bishop', r: 'rook', q: 'queen' }[char.toLowerCase()];
                const hand = color === Color.WHITE ? this.whiteHand : this.blackHand;
                hand[type]++;
            }
        }
    }

    getSquare(file, rank) {
        if (file < 0 || file > 7 || rank < 0 || rank > 7) return null;
        return this.squares[rank * 8 + file];
    }

    getSquareFromAlg(alg) {
        const file = alg.charCodeAt(0) - 'a'.charCodeAt(0);
        const rank = parseInt(alg[1]) - 1;
        return this.getSquare(file, rank);
    }

    /**
     * Generates pseudo-legal moves for a given square, including variant-specific moves.
     */
    generatePseudoLegalMoves(square) {
        const piece = square.piece;
        if (!piece) {
            if (this.variant === Variant.CRAZYHOUSE) {
                return this.generateDropMoves(square);
            }
            return [];
        }
        const moves = [];

        switch (piece.type) {
            case PieceType.PAWN:
                const direction = piece.color === Color.WHITE ? 1 : -1;
                const startRank = piece.color === Color.WHITE ? 1 : 6;
                const promotionRank = piece.color === Color.WHITE ? 7 : 0;

                // Forward move
                const forwardSq = this.getSquare(square.file, square.rank + direction);
                if (forwardSq && !forwardSq.piece) {
                    if (square.rank + direction === promotionRank) {
                        for (const promoType of [PieceType.QUEEN, PieceType.ROOK, PieceType.BISHOP, PieceType.KNIGHT]) {
                            moves.push(this.createPromotionMove(square, forwardSq, piece, promoType));
                        }
                    } else {
                        moves.push(this.createMove(square, forwardSq, piece));
                        if (square.rank === startRank) {
                            const doubleForwardSq = this.getSquare(square.file, square.rank + 2 * direction);
                            if (doubleForwardSq && !doubleForwardSq.piece) {
                                moves.push(this.createMove(square, doubleForwardSq, piece));
                            }
                        }
                    }
                }

                // Captures and en passant
                for (const df of [-1, 1]) {
                    const captureFile = square.file + df;
                    const captureSq = this.getSquare(captureFile, square.rank + direction);
                    if (captureSq) {
                        if (captureSq.piece && captureSq.piece.color !== piece.color) {
                            if (square.rank + direction === promotionRank) {
                                for (const promoType of [PieceType.QUEEN, PieceType.ROOK, PieceType.BISHOP, PieceType.KNIGHT]) {
                                    moves.push(this.createPromotionMove(square, captureSq, piece, promoType, captureSq.piece));
                                }
                            } else {
                                moves.push(this.createMove(square, captureSq, piece, captureSq.piece));
                            }
                        }
                        if (captureSq === this.enPassantSquare) {
                            const capturedPawnSq = this.getSquare(captureFile, square.rank);
                            if (capturedPawnSq?.piece && capturedPawnSq.piece.color !== piece.color && capturedPawnSq.piece.type === PieceType.PAWN) {
                                moves.push(this.createEnPassantMove(square, captureSq, piece, capturedPawnSq.piece));
                            }
                        }
                    }
                }
                break;

            case PieceType.KNIGHT:
                const knightDeltas = [[1,2], [2,1], [-1,2], [-2,1], [1,-2], [2,-1], [-1,-2], [-2,-1]];
                for (const [df, dr] of knightDeltas) {
                    const targetSq = this.getSquare(square.file + df, square.rank + dr);
                    if (targetSq && (!targetSq.piece || targetSq.piece.color !== piece.color)) {
                        moves.push(this.createMove(square, targetSq, piece, targetSq.piece));
                    }
                }
                break;

            case PieceType.BISHOP:
            case PieceType.ROOK:
            case PieceType.QUEEN:
                const directions = piece.type === PieceType.BISHOP ? [[1,1], [1,-1], [-1,1], [-1,-1]] :
                    piece.type === PieceType.ROOK ? [[0,1], [0,-1], [1,0], [-1,0]] :
                        [[1,1], [1,-1], [-1,1], [-1,-1], [0,1], [0,-1], [1,0], [-1,0]];
                for (const [df, dr] of directions) {
                    let f = square.file + df;
                    let r = square.rank + dr;
                    while (f >= 0 && f <= 7 && r >= 0 && r <= 7) {
                        const targetSq = this.getSquare(f, r);
                        if (!targetSq.piece) {
                            moves.push(this.createMove(square, targetSq, piece));
                        } else {
                            if (targetSq.piece.color !== piece.color) {
                                moves.push(this.createMove(square, targetSq, piece, targetSq.piece));
                            }
                            break;
                        }
                        f += df;
                        r += dr;
                    }
                }
                break;

            case PieceType.KING:
                const kingDeltas = [[0,1], [0,-1], [1,0], [-1,0], [1,1], [1,-1], [-1,1], [-1,-1]];
                for (const [df, dr] of kingDeltas) {
                    const targetSq = this.getSquare(square.file + df, square.rank + dr);
                    if (targetSq && (!targetSq.piece || targetSq.piece.color !== piece.color)) {
                        moves.push(this.createMove(square, targetSq, piece, targetSq.piece));
                    }
                }
                // Castling (Classic and Chess960)
                if (this.variant === Variant.CLASSIC || this.variant === Variant.CHESS960) {
                    if (piece.color === Color.WHITE && square.rank === 0 && square.file === 4) {
                        if (this.castlingRights.whiteKingSide && !this.getSquare(5, 0).piece && !this.getSquare(6, 0).piece) {
                            const rookSq = this.getSquare(7, 0);
                            if (rookSq?.piece?.type === PieceType.ROOK && rookSq.piece.color === Color.WHITE) {
                                moves.push(this.createCastlingMove(piece.color, 'kingSide', square, rookSq));
                            }
                        }
                        if (this.castlingRights.whiteQueenSide && !this.getSquare(3, 0).piece && !this.getSquare(2, 0).piece && !this.getSquare(1, 0).piece) {
                            const rookSq = this.getSquare(0, 0);
                            if (rookSq?.piece?.type === PieceType.ROOK && rookSq.piece.color === Color.WHITE) {
                                moves.push(this.createCastlingMove(piece.color, 'queenSide', square, rookSq));
                            }
                        }
                    } else if (piece.color === Color.BLACK && square.rank === 7 && square.file === 4) {
                        if (this.castlingRights.blackKingSide && !this.getSquare(5, 7).piece && !this.getSquare(6, 7).piece) {
                            const rookSq = this.getSquare(7, 7);
                            if (rookSq?.piece?.type === PieceType.ROOK && rookSq.piece.color === Color.BLACK) {
                                moves.push(this.createCastlingMove(piece.color, 'kingSide', square, rookSq));
                            }
                        }
                        if (this.castlingRights.blackQueenSide && !this.getSquare(3, 7).piece && !this.getSquare(2, 7).piece && !this.getSquare(1, 7).piece) {
                            const rookSq = this.getSquare(0, 7);
                            if (rookSq?.piece?.type === PieceType.ROOK && rookSq.piece.color === Color.BLACK) {
                                moves.push(this.createCastlingMove(piece.color, 'queenSide', square, rookSq));
                            }
                        }
                    }
                }
                break;
        }

        if (this.variant === Variant.SUICIDE) {
            const captureMoves = moves.filter(m => m.capturedPiece);
            return captureMoves.length > 0 ? captureMoves : moves;
        }
        return moves;
    }

    /**
     * Generates drop moves for Crazyhouse.
     */
    generateDropMoves(square) {
        if (this.variant !== Variant.CRAZYHOUSE || square.piece) return [];
        const hand = this.turn === Color.WHITE ? this.whiteHand : this.blackHand;
        const moves = [];
        for (const type in hand) {
            if (hand[type] > 0 && square.rank !== 0 && square.rank !== 7) { // No drops on first/last rank
                moves.push(new Move({
                    shortAlg: `${type.charAt(0).toUpperCase()}@${square.toAlgebraic()}`,
                    longAlg: `${type.charAt(0).toUpperCase()}@${square.toAlgebraic()}`,
                    san: `${type.charAt(0).toUpperCase()}@${square.toAlgebraic()}`,
                    startSquare: null,
                    endSquare: square,
                    movingPiece: new Piece(type, this.turn, null),
                    movingColor: this.turn,
                    moveType: MoveType.DROP
                }));
            }
        }
        return moves;
    }

    createMove(startSquare, endSquare, movingPiece, capturedPiece = null) {
        return new Move({
            shortAlg: endSquare.toAlgebraic(),
            longAlg: `${startSquare.toAlgebraic()}${endSquare.toAlgebraic()}`,
            san: capturedPiece ? `${startSquare.toAlgebraic()}x${endSquare.toAlgebraic()}` : endSquare.toAlgebraic(),
            startSquare,
            endSquare,
            movingPiece,
            capturedPiece,
            movingColor: movingPiece.color,
            capturedColor: capturedPiece ? capturedPiece.color : null,
            moveType: MoveType.NORMAL
        });
    }

    createPromotionMove(startSquare, endSquare, movingPiece, promotionType, capturedPiece = null) {
        return new Move({
            shortAlg: `${endSquare.toAlgebraic()}=${promotionType[0].toUpperCase()}`,
            longAlg: `${startSquare.toAlgebraic()}${endSquare.toAlgebraic()}`,
            san: capturedPiece ? `${startSquare.toAlgebraic()}x${endSquare.toAlgebraic()}=${promotionType[0].toUpperCase()}` : `${endSquare.toAlgebraic()}=${promotionType[0].toUpperCase()}`,
            startSquare,
            endSquare,
            movingPiece,
            capturedPiece,
            movingColor: movingPiece.color,
            capturedColor: capturedPiece ? capturedPiece.color : null,
            moveType: MoveType.PROMOTION,
            promotionType
        });
    }

    createEnPassantMove(startSquare, endSquare, movingPiece, capturedPiece) {
        return new Move({
            shortAlg: `${startSquare.toAlgebraic()}x${endSquare.toAlgebraic()}e.p.`,
            longAlg: `${startSquare.toAlgebraic()}${endSquare.toAlgebraic()}`,
            san: `${startSquare.toAlgebraic()}x${endSquare.toAlgebraic()}e.p.`,
            startSquare,
            endSquare,
            movingPiece,
            capturedPiece,
            movingColor: movingPiece.color,
            capturedColor: capturedPiece.color,
            moveType: MoveType.EN_PASSANT
        });
    }

    createCastlingMove(color, side, kingSquare, rookSquare) {
        const rank = color === Color.WHITE ? 0 : 7;
        const kingEndFile = side === 'kingSide' ? 6 : 2;
        const rookEndFile = side === 'kingSide' ? 5 : 3;
        const kingEnd = this.getSquare(kingEndFile, rank);
        const rookEnd = this.getSquare(rookEndFile, rank);
        const move = new Move({
            shortAlg: side === 'kingSide' ? 'O-O' : 'O-O-O',
            longAlg: `${kingSquare.toAlgebraic()}${kingEnd.toAlgebraic()}`,
            san: side === 'kingSide' ? 'O-O' : 'O-O-O',
            startSquare: kingSquare,
            endSquare: kingEnd,
            movingPiece: kingSquare.piece,
            movingColor: color,
            moveType: MoveType.CASTLING
        });
        move.rookStartSquare = rookSquare;
        move.rookEndSquare = rookEnd;
        return move;
    }

    /**
     * Applies a move to the board, handling variant-specific logic.
     */
    makeMove(move) {
        move.previousCastlingRights = { ...this.castlingRights };
        move.previousEnPassantSquare = this.enPassantSquare;
        move.previousHalfMoveClock = this.halfMoveClock;

        if (move.moveType === MoveType.DROP) {
            move.endSquare.piece = move.movingPiece;
            move.movingPiece.square = move.endSquare;
            const hand = move.movingColor === Color.WHITE ? this.whiteHand : this.blackHand;
            hand[move.movingPiece.type]--;
        } else {
            move.startSquare.piece = null;
            move.endSquare.piece = move.movingPiece;
            move.movingPiece.square = move.endSquare;

            if (move.capturedPiece) {
                this.pieces = this.pieces.filter(p => p !== move.capturedPiece);
                if (this.variant === Variant.CRAZYHOUSE) {
                    const hand = move.movingColor === Color.WHITE ? this.blackHand : this.whiteHand;
                    hand[move.capturedPiece.type]++;
                }
                if (this.variant === Variant.ATOMIC) {
                    this.applyAtomicExplosion(move.endSquare);
                }
            }
        }

        // Update en passant square
        this.enPassantSquare = null;
        if (move.movingPiece.type === PieceType.PAWN && Math.abs(move.startSquare.rank - move.endSquare.rank) === 2) {
            const midRank = (move.startSquare.rank + move.endSquare.rank) / 2;
            this.enPassantSquare = this.getSquare(move.startSquare.file, midRank);
        }

        // Update castling rights
        if (move.movingPiece.type === PieceType.KING) {
            if (move.movingColor === Color.WHITE) {
                this.castlingRights.whiteKingSide = false;
                this.castlingRights.whiteQueenSide = false;
            } else {
                this.castlingRights.blackKingSide = false;
                this.castlingRights.blackQueenSide = false;
            }
        }
        if (move.movingPiece.type === PieceType.ROOK) {
            if (move.startSquare.file === 0) {
                if (move.movingColor === Color.WHITE) this.castlingRights.whiteQueenSide = false;
                else this.castlingRights.blackQueenSide = false;
            } else if (move.startSquare.file === 7) {
                if (move.movingColor === Color.WHITE) this.castlingRights.whiteKingSide = false;
                else this.castlingRights.blackKingSide = false;
            }
        }

        // Handle castling rook move
        if (move.moveType === MoveType.CASTLING) {
            move.rookStartSquare.piece = null;
            move.rookEndSquare.piece = new Piece(PieceType.ROOK, move.movingColor, move.rookEndSquare);
        }

        // Update move clocks
        this.halfMoveClock = (move.movingPiece.type === PieceType.PAWN || move.capturedPiece) ? 0 : this.halfMoveClock + 1;
        if (this.turn === Color.BLACK) this.fullMoveNumber++;

        this.turn = this.turn === Color.WHITE ? Color.BLACK : Color.WHITE;
        this.history.push(move);
    }

    /**
     * Applies Atomic chess explosion effect.
     */
    applyAtomicExplosion(square) {
        const explosionDeltas = [[0,0], [0,1], [0,-1], [1,0], [-1,0], [1,1], [1,-1], [-1,1], [-1,-1]];
        for (const [df, dr] of explosionDeltas) {
            const targetSq = this.getSquare(square.file + df, square.rank + dr);
            if (targetSq?.piece && targetSq.piece.type !== PieceType.PAWN) {
                this.pieces = this.pieces.filter(p => p !== targetSq.piece);
                targetSq.piece = null;
            }
        }
    }

    /**
     * Undoes the last move, restoring the previous state.
     */
    undoMove() {
        const move = this.history.pop();
        if (!move) return;

        if (move.moveType === MoveType.DROP) {
            move.endSquare.piece = null;
            const hand = move.movingColor === Color.WHITE ? this.whiteHand : this.blackHand;
            hand[move.movingPiece.type]++;
        } else {
            move.startSquare.piece = move.movingPiece;
            move.movingPiece.square = move.startSquare;
            move.endSquare.piece = move.capturedPiece;
            if (move.capturedPiece) {
                this.pieces.push(move.capturedPiece);
                if (this.variant === Variant.CRAZYHOUSE) {
                    const hand = move.movingColor === Color.WHITE ? this.blackHand : this.whiteHand;
                    hand[move.capturedPiece.type]--;
                }
            }
            if (move.moveType === MoveType.CASTLING) {
                move.rookEndSquare.piece = null;
                move.rookStartSquare.piece = new Piece(PieceType.ROOK, move.movingColor, move.rookStartSquare);
            }
        }

        this.turn = move.movingColor;
        this.castlingRights = move.previousCastlingRights;
        this.enPassantSquare = move.previousEnPassantSquare;
        this.halfMoveClock = move.previousHalfMoveClock;
        if (this.turn === Color.BLACK) this.fullMoveNumber--;
    }

    get moveList() {
        return this.history;
    }

    /**
     * Checks if the game is over based on variant-specific rules.
     */
    isGameOver() {
        const moves = this.getLegalMovesForTurn();
        switch (this.variant) {
            case Variant.CLASSIC:
            case Variant.CRAZYHOUSE:
            case Variant.CHESS960:
                return moves.length === 0 && (this.isKingInCheck(this.turn) || this.isStalemate());
            case Variant.ATOMIC:
                return !this.pieces.some(p => p.type === PieceType.KING && p.color === this.turn);
            case Variant.LOSERS:
                return this.isKingInCheck(this.turn) || this.pieces.filter(p => p.color === this.turn).length === 0;
            case Variant.SUICIDE:
                return moves.length === 0 || this.pieces.filter(p => p.color === this.turn).length === 0;
            default:
                return false;
        }
    }

    /**
     * Gets all legal moves for the current turn.
     */
    getLegalMovesForTurn() {
        const moves = this.pieces.filter(p => p.color === this.turn)
            .flatMap(p => this.generatePseudoLegalMoves(p.square));
        if (this.variant === Variant.CRAZYHOUSE) {
            moves.push(...this.squares.filter(sq => !sq.piece).flatMap(sq => this.generateDropMoves(sq)));
        }
        return moves.filter(move => {
            this.makeMove(move);
            const legal = !this.isKingInCheck(move.movingColor);
            this.undoMove();
            return legal;
        });
    }

    isKingInCheck(color) {
        const king = this.pieces.find(p => p.type === PieceType.KING && p.color === color);
        if (!king) return false;
        const opponentColor = color === Color.WHITE ? Color.BLACK : Color.WHITE;
        return this.pieces.filter(p => p.color === opponentColor)
            .some(p => this.generatePseudoLegalMoves(p.square)
                .some(m => m.endSquare === king.square));
    }

    isStalemate() {
        return !this.isKingInCheck(this.turn) && this.getLegalMovesForTurn().length === 0;
    }

    /**
     * Gets pieces in hand for Crazyhouse.
     */
    getPiecesInHand(color) {
        return color === Color.WHITE ? this.whiteHand : this.blackHand;
    }
}

// Export for use in other modules
export { Board, Variant, Color, PieceType, MoveType, Piece, Move, Square };