export interface TestGame {
  id: string;
  variant: 'CLASSIC' | 'LOSERS' | 'SUICIDE' | 'ATOMIC' | 'CRAZYHOUSE' | 'CHESS960';
  pgn: string;
  description?: string;
  expectedMoveCount: number;
  expectedResult: '1-0' | '0-1' | '1/2-1/2' | '*';
  tags?: Record<string, string>;
}

export interface TestGameCollection {
  variant: string;
  games: TestGame[];
}

import classicGames from './classic.json';
import losersGames from './losers.json';
import suicideGames from './suicide.json';
import atomicGames from './atomic.json';
import crazyhouseGames from './crazyhouse.json';
import chess960Games from './chess960.json';

export const testGameCollections: TestGameCollection[] = [
  { variant: 'CLASSIC', games: classicGames },
  { variant: 'LOSERS', games: losersGames },
  { variant: 'SUICIDE', games: suicideGames },
  { variant: 'ATOMIC', games: atomicGames },
  { variant: 'CRAZYHOUSE', games: crazyhouseGames },
  { variant: 'CHESS960', games: chess960Games },
];

export const getAllTestGames = (): TestGame[] => {
  return testGameCollections.flatMap(collection => collection.games);
};

export const getTestGamesByVariant = (variant: string): TestGame[] => {
  const collection = testGameCollections.find(c => c.variant === variant);
  return collection ? collection.games : [];
};