// Mock implementation of the Chess.js library
window.Chess = class Chess {
  constructor(fen) {
    this._fen = fen || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    this.history = [];
  }

  turn() {
    return this._fen.includes(' w ') ? 'w' : 'b';
  }

  moves(options) {
    return ['e4', 'e5', 'Nf3', 'Nc6'];
  }

  move(move) {
    this.history.push(move);
    return { color: this.turn(), from: 'e2', to: 'e4', piece: 'p' };
  }

  undo() {
    this.history.pop();
    return true;
  }

  load(newFen) {
    this._fen = newFen;
    return true;
  }

  get(square) {
    return { type: 'p', color: 'w' };
  }

  put(piece, square) {
    return true;
  }

  remove(square) {
    return true;
  }

  reset() {
    this._fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    this.history = [];
    return true;
  }

  header() {
    return {};
  }

  ascii() {
    return '';
  }

  game_over() {
    return false;
  }

  in_check() {
    return false;
  }

  in_checkmate() {
    return false;
  }

  in_stalemate() {
    return false;
  }

  in_draw() {
    return false;
  }

  insufficient_material() {
    return false;
  }

  in_threefold_repetition() {
    return false;
  }

  validate_fen(fen) {
    return { valid: true, error_number: 0, error: '' };
  }

  fen() {
    return this._fen;
  }

  pgn() {
    return '';
  }

  load_pgn(pgn) {
    return true;
  }

  history() {
    return this.history;
  }
};
