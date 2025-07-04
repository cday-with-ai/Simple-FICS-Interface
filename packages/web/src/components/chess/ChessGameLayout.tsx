import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@fics/shared';
import { useLayout } from '../../theme/hooks';
import { ChessBoardWithPieces } from './ChessBoardWithPieces';
import { PlayerCard, GameClock } from './PlayerCard';
import { MoveList } from './MoveList';
import { GameControls, CompactControlButton } from './GameControls';

interface ChessGameLayoutProps {
  className?: string;
}

const LayoutContainer = styled.div<{ $orientation: 'landscape' | 'portrait' }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: ${props => props.$orientation === 'landscape' ? 'row' : 'column'};
  gap: ${props => props.$orientation === 'landscape' ? props.theme.spacing[3] : props.theme.spacing[1]};
  padding: ${props => props.theme.spacing[4]};
`;

const ChessSection = styled.div<{ $orientation: 'landscape' | 'portrait' }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  flex: ${props => props.$orientation === 'landscape' ? '0 0 auto' : '1'};
  width: ${props => props.$orientation === 'portrait' ? '100%' : 'auto'};
`;

const GameInfo = styled.div`
  text-align: center;
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
  white-space: nowrap;
`;

const BoardWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: auto;
`;

const PortraitBoardSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[3]};
  align-items: stretch;
  width: fit-content;
  margin: 0 auto;
`;

const MoveInfo = styled.div`
  text-align: center;
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
  display: flex;
  gap: ${props => props.theme.spacing[4]};
  align-items: center;
  white-space: nowrap;
`;

const ControlsSection = styled.div<{ $orientation: 'landscape' | 'portrait' }>`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[2]};
  flex: 1;
  min-width: ${props => props.$orientation === 'landscape' ? '280px' : 'auto'};
  max-width: ${props => props.$orientation === 'landscape' ? '320px' : 'none'};
  overflow: hidden;
`;

const LandscapeLayout = styled.div`
  display: flex;
  height: 100%;
  gap: ${props => props.theme.spacing[3]};
`;

const LandscapeBoardSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${props => props.theme.spacing[3]};
`;

const PlayersColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0;
  width: 200px;
  padding: ${props => props.theme.spacing[3]} 0;
`;

const PlayerWithClock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[3]};
  align-items: flex-start;
`;

const HorizontalPlayerWithClock = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${props => props.theme.spacing[2]};
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const CompactMoveList = styled(MoveList)`
  height: 135px;
  min-height: 135px;
  margin: ${props => props.theme.spacing[2]} 0;
`;

const PortraitClock = styled(GameClock)`
  height: 100%;
  
  > div {
    height: 100%;
    display: flex;
    align-items: center;
  }
  
  span {
    display: flex;
    align-items: center;
    height: 100%;
    padding-top: 0;
    padding-bottom: 0;
  }
`;

const LandscapeClock = styled(GameClock)`
  margin-left: ${props => props.theme.spacing[3]};
  
  span {
    padding: 0 ${props => props.theme.spacing[2]};
    font-size: 14px;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const ExtraControlsContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[1]};
  justify-content: center;
  width: 100%;
`;

export const ChessGameLayout: React.FC<ChessGameLayoutProps> = observer(({ className }) => {
  const { gameStore, preferencesStore } = useRootStore();
  const layout = useLayout();
  
  // Use the user's preference for chess orientation instead of device orientation
  const isLandscape = preferencesStore.preferences.chessOrientation === 'landscape';
  
  // Get current position from GameStore
  const position = gameStore.currentPosition || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  
  // Determine perspective
  const perspective = useMemo(() => {
    if (!gameStore.currentGame) return 'freestyle';
    // TODO: Determine based on game state
    return 'playing';
  }, [gameStore.currentGame]);
  
  // Handle moves
  const handleMove = useCallback((from: string, to: string) => {
    try {
      const success = gameStore.makeMove(from, to);
      if (!success) {
        console.error('Invalid move:', from, to);
      }
    } catch (error) {
      console.error('Error making move:', error);
    }
  }, [gameStore]);
  
  // Get game info
  const gameInfo = useMemo(() => {
    if (gameStore.currentGameInfo) {
      const { white, black, timeControl, variant } = gameStore.currentGameInfo;
      return `Game ${gameStore.currentGame?.gameId || '?'} • ${variant} ${timeControl}`;
    }
    return 'No active game';
  }, [gameStore.currentGameInfo, gameStore.currentGame]);
  
  // Get move info
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
  
  const opening = ''; // TODO: Get from ECO database
  
  // Mock player data for now
  const whitePlayer = gameStore.currentGame?.white || { name: 'White', rating: 1500, time: 900 };
  const blackPlayer = gameStore.currentGame?.black || { name: 'Black', rating: 1500, time: 900 };
  const isWhiteTurn = !gameStore.currentGame || gameStore.currentGame.turn === 'w';
  
  const handleMoveClick = useCallback((index: number) => {
    // TODO: Implement move navigation
    console.log('Navigate to move:', index);
  }, []);
  
  const handleAnalysis = useCallback(() => {
    // TODO: Implement analysis
    console.log('Toggle analysis');
  }, []);
  
  const handleSetupFEN = useCallback(() => {
    // TODO: Implement FEN setup
    console.log('Setup FEN');
  }, []);
  
  const renderLandscapeLayout = () => (
    <LandscapeLayout>
      <ChessSection $orientation="landscape">
        <GameInfo>{gameInfo}</GameInfo>
        
        <LandscapeBoardSection>
          <BoardWrapper>
            <ChessBoardWithPieces
              position={position}
              flipped={preferencesStore.preferences.boardFlipped}
              showCoordinates={true}
              onMove={handleMove}
              interactive={perspective === 'playing' || perspective === 'freestyle'}
            />
          </BoardWrapper>
          
          <PlayersColumn>
            <PlayerWithClock>
              <LandscapeClock 
                time={blackPlayer.time} 
                isActive={!isWhiteTurn}
                showTenths={blackPlayer.time < 10}
                lowTimeThreshold={30}
                size="small"
                compact={true}
              />
              <PlayerCard
                name={blackPlayer.name}
                rating={blackPlayer.rating}
                time={blackPlayer.time}
                isActive={!isWhiteTurn}
                isWhite={false}
                orientation="vertical"
                hideClockInCard={true}
                compact={true}
                style={{ width: '100%' }}
              />
            </PlayerWithClock>
            
            <CompactMoveList
              moves={gameStore.moveHistory}
              currentMoveIndex={gameStore.moveHistory.length - 1}
              onMoveClick={handleMoveClick}
              showHeader={false}
              extraControls={perspective === 'freestyle' ? (
                <ExtraControlsContainer>
                  <CompactControlButton 
                    onClick={handleAnalysis} 
                    $variant="primary"
                    $isActive={false}
                  >
                    Analysis
                  </CompactControlButton>
                  <CompactControlButton 
                    onClick={handleSetupFEN} 
                    $variant="secondary"
                  >
                    FEN
                  </CompactControlButton>
                </ExtraControlsContainer>
              ) : undefined}
              onNavigate={(direction) => {
                // TODO: Implement navigation
                console.log('Navigate:', direction);
              }}
            />
            
            <PlayerWithClock>
              <PlayerCard
                name={whitePlayer.name}
                rating={whitePlayer.rating}
                time={whitePlayer.time}
                isActive={isWhiteTurn}
                isWhite={true}
                orientation="vertical"
                hideClockInCard={true}
                compact={true}
                style={{ width: '100%' }}
              />
              <LandscapeClock 
                time={whitePlayer.time} 
                isActive={isWhiteTurn}
                showTenths={whitePlayer.time < 10}
                lowTimeThreshold={30}
                size="small"
                compact={true}
              />
            </PlayerWithClock>
          </PlayersColumn>
        </LandscapeBoardSection>
        
        <MoveInfo>
          <span>{moveNotation}</span>
          {opening && <span>• {opening}</span>}
        </MoveInfo>
      </ChessSection>
      
      {perspective !== 'freestyle' && (
        <ControlsSection $orientation="landscape">
          <GameControls
            perspective={perspective}
            canAbort={gameStore.moveHistory.length <= 1}
          />
        </ControlsSection>
      )}
    </LandscapeLayout>
  );
  
  const renderPortraitLayout = () => (
    <>
      <ChessSection $orientation="portrait">
        <GameInfo>{gameInfo}</GameInfo>
        
        <PortraitBoardSection>
          <HorizontalPlayerWithClock>
            <PortraitClock 
              time={blackPlayer.time} 
              isActive={!isWhiteTurn}
              showTenths={blackPlayer.time < 10}
              lowTimeThreshold={30}
              size="small"
              compact={true}
            />
            <PlayerCard
              name={blackPlayer.name}
              rating={blackPlayer.rating}
              time={blackPlayer.time}
              isActive={!isWhiteTurn}
              isWhite={false}
              orientation="horizontal"
              hideClockInCard={true}
              compact={true}
            />
          </HorizontalPlayerWithClock>
          
          <BoardWrapper>
            <ChessBoardWithPieces
              position={position}
              flipped={preferencesStore.preferences.boardFlipped}
              showCoordinates={true}
              onMove={handleMove}
              interactive={perspective === 'playing' || perspective === 'freestyle'}
            />
          </BoardWrapper>
          
          <HorizontalPlayerWithClock>
            <PortraitClock 
              time={whitePlayer.time} 
              isActive={isWhiteTurn}
              showTenths={whitePlayer.time < 10}
              lowTimeThreshold={30}
              size="small"
              compact={true}
            />
            <PlayerCard
              name={whitePlayer.name}
              rating={whitePlayer.rating}
              time={whitePlayer.time}
              isActive={isWhiteTurn}
              isWhite={true}
              orientation="horizontal"
              hideClockInCard={true}
              compact={true}
            />
          </HorizontalPlayerWithClock>
        </PortraitBoardSection>
        
        <MoveInfo>
          <span>{moveNotation}</span>
          {opening && <span>• {opening}</span>}
        </MoveInfo>
      </ChessSection>
      
      <ControlsSection $orientation="portrait">
        {perspective !== 'freestyle' && (
          <GameControls
            perspective={perspective}
            canAbort={gameStore.moveHistory.length <= 1}
          />
        )}
        
        <MoveList
          moves={gameStore.moveHistory}
          currentMoveIndex={gameStore.moveHistory.length - 1}
          onMoveClick={handleMoveClick}
          onNavigate={(direction) => {
            // TODO: Implement navigation
            console.log('Navigate:', direction);
          }}
          extraControls={perspective === 'freestyle' ? (
            <ExtraControlsContainer>
              <CompactControlButton 
                onClick={handleAnalysis} 
                $variant="primary"
                $isActive={false}
              >
                Analysis
              </CompactControlButton>
              <CompactControlButton 
                onClick={handleSetupFEN} 
                $variant="secondary"
              >
                FEN
              </CompactControlButton>
            </ExtraControlsContainer>
          ) : undefined}
        />
      </ControlsSection>
    </>
  );
  
  return (
    <LayoutContainer className={className} $orientation={isLandscape ? 'landscape' : 'portrait'}>
      {isLandscape ? renderLandscapeLayout() : renderPortraitLayout()}
    </LayoutContainer>
  );
});

ChessGameLayout.displayName = 'ChessGameLayout';