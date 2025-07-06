import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@fics/shared';
import { ChessBoardWithPieces } from './ChessBoardWithPieces';

interface GameViewProps {
  className?: string;
}

const GameViewContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: ${props => props.theme.spacing[4]};
`;

const GameInfo = styled.div`
  text-align: center;
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
`;

const BoardWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
`;

const MoveInfo = styled.div`
  text-align: center;
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
  display: flex;
  gap: ${props => props.theme.spacing[4]};
  align-items: center;
`;

export const GameView: React.FC<GameViewProps> = observer(({ className }) => {
  const { gameStore, preferencesStore } = useRootStore();
  
  // Get current position from GameStore
  const position = gameStore.currentPosition || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  
  // Handle moves
  const handleMove = useCallback((from: string, to: string) => {
    try {
      // Convert to UCI format (e.g., e2e4)
      const moveString = `${from}${to}`;
      const success = gameStore.makeMove(from, to);
      
      if (!success) {
        console.error('Invalid move:', moveString);
        // TODO: Show error feedback to user
      }
    } catch (error) {
      console.error('Error making move:', error);
    }
  }, [gameStore]);
  
  // Get game info
  const gameInfo = useMemo(() => {
    if (gameStore.currentGameInfo) {
      const { white, black, timeControl, variant } = gameStore.currentGameInfo;
      return `${white.name} (${white.rating}) vs ${black.name} (${black.rating}) • ${timeControl} • ${variant}`;
    }
    return 'No active game';
  }, [gameStore.currentGameInfo]);
  
  // Get last move
  const lastMove = gameStore.lastMove;
  
  // Get move info (last move notation and opening)
  const moveNotation = useMemo(() => {
    const history = gameStore.moveHistory;
    if (history.length > 0) {
      const lastMove = history[history.length - 1];
      const moveNumber = Math.ceil(history.length / 2);
      const isWhiteMove = history.length % 2 === 1;
      return `${moveNumber}.${isWhiteMove ? '' : '..'} ${lastMove.san}`;
    }
    return 'Starting position';
  }, [gameStore.moveHistory]);
  
  const opening = gameStore.currentOpening;

  return (
    <GameViewContainer className={className}>
      <GameInfo>{gameInfo}</GameInfo>
      
      <BoardWrapper>
        <ChessBoardWithPieces
          position={position}
          flipped={gameStore.shouldShowFlippedBoard}
          showCoordinates={true}
          onMove={handleMove}
          lastMove={lastMove || undefined}
          interactive={gameStore.isMyTurn || gameStore.isExamining || !gameStore.currentGame}
        />
      </BoardWrapper>
      
      <MoveInfo>
        <span>{moveNotation}</span>
        {opening && <span>• {opening}</span>}
      </MoveInfo>
    </GameViewContainer>
  );
});

GameView.displayName = 'GameView';