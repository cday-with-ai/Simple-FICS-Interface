import { makeAutoObservable } from 'mobx';
import { Chess } from 'chess.js';

export interface Player {
  name: string;
  rating: number;
  time: number; // in seconds
}

export interface GameState {
  gameId: number;
  white: Player;
  black: Player;
  turn: 'w' | 'b';
  moveNumber: number;
  lastMove?: string;
  result?: string;
  variant: 'standard' | 'chess960' | 'losers' | 'suicide' | 'atomic' | 'crazyhouse' | 'wild';
}

export class GameStore {
  currentGame: GameState | null = null;
  chess: Chess;
  moveHistory: string[] = [];
  isAnalyzing = false;
  evaluation: { score: number; depth: number; pv: string } | null = null;

  constructor() {
    makeAutoObservable(this);
    this.chess = new Chess();
  }

  startNewGame(gameState: GameState, fen?: string) {
    this.currentGame = gameState;
    this.moveHistory = [];
    this.evaluation = null;
    
    if (fen) {
      this.chess.load(fen);
    } else {
      this.chess.reset();
    }
  }

  makeMove(from: string, to: string, promotion?: string) {
    try {
      const move = this.chess.move({ from, to, promotion });
      if (move) {
        this.moveHistory.push(move.san);
        return true;
      }
    } catch (error) {
      console.error('Invalid move:', error);
    }
    return false;
  }

  updateFromStyle12(style12Data: any) {
    // Convert Style12 to game state
    // Implementation will be migrated from existing code
  }

  setEvaluation(evaluation: { score: number; depth: number; pv: string }) {
    this.evaluation = evaluation;
  }

  toggleAnalysis() {
    this.isAnalyzing = !this.isAnalyzing;
  }

  get fen() {
    return this.chess.fen();
  }

  get pgn() {
    return this.chess.pgn();
  }
}