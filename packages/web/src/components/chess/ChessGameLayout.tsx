import React, { useCallback, useMemo, useState, useEffect } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useRootStore, useAnalysisStore } from '@fics/shared';
import { useLayout } from '../../theme/hooks';
import { ChessBoardWithPieces } from './ChessBoardWithPieces';
import { PlayerCard, GameClock } from './PlayerCard';
import { MoveList } from './MoveList';
import { GameControls, CompactControlButton } from './GameControls';
import { AnalysisDisplay, AnalysisInfoDisplay } from './AnalysisDisplay';
import { FENDialog } from './FENDialog';

interface ChessGameLayoutProps {
  className?: string;
  hasChat?: boolean;
}

const LayoutContainer = styled.div<{ $orientation: 'landscape' | 'portrait'; $hasChat: boolean }>`
  width: 100%;
  height: 100%;
  display: ${props => props.$orientation === 'landscape' ? 'grid' : 'flex'};
  ${props => props.$orientation === 'landscape' ? `
    grid-template-columns: ${props.$hasChat ? 'minmax(0, 1fr) auto' : '1fr auto'};
  ` : `
    flex-direction: column;
  `}
  gap: ${props => props.$orientation === 'landscape' ? props.theme.spacing[3] : props.theme.spacing[1]};
  padding: ${props => props.theme.spacing[1]};
`;

const ChessSection = styled.div<{ $orientation: 'landscape' | 'portrait' }>`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.$orientation === 'landscape' ? 'flex-start' : 'center'};
  gap: ${props => props.theme.spacing[2]};
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: ${props => props.$orientation === 'portrait' ? 'flex-start' : 'center'};
  ${props => props.$orientation === 'landscape' && `
    padding-left: ${props.theme.spacing[4]};
  `}
  ${props => props.$orientation === 'portrait' && `
    padding-top: ${props.theme.spacing[2]};
  `}
  overflow: ${props => props.$orientation === 'portrait' ? 'auto' : 'hidden'};
  min-width: 0;
  /* Reserve minimum height for analysis info to prevent jumps */
  & > *:last-child {
    min-height: 28px;
  }
`;

const GameInfo = styled.div`
  text-align: center;
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
  white-space: nowrap;
`;

const BoardArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  height: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const TopBoardInfo = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[2]};
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: min(calc(100vh - 120px), calc(100vw - 400px));
  margin-bottom: -10px;
  z-index: 1;
`;

const BottomBoardInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: min(calc(100vh - 120px), calc(100vw - 400px));
  align-items: center;
  margin-top: -10px;
  z-index: 1;
`;

const GameNumber = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.text};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  margin-left: 11px;
`;

const TimeControl = styled.div`
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => props.theme.colors.textSecondary};
  margin-right: 11px;
`;

const LastMoveInfo = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
  margin-left: 11px;
`;

const OpeningInfo = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.text};
  margin-right: 11px;
`;

const BoardWrapper = styled.div<{ $orientation?: 'landscape' | 'portrait' }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  ${props => props.$orientation === 'portrait' ? `
    width: min(100vw - 32px, calc(100vh - 400px));
    height: min(100vw - 32px, calc(100vh - 400px));
  ` : `
    width: min(calc(100vh - 120px), calc(100vw - 400px));
    height: min(calc(100vh - 120px), calc(100vw - 400px));
    max-width: 100%;
    max-height: 100%;
  `}
`;


const PortraitBoardSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[2]};
  width: fit-content;
  margin: 0 auto;
  align-items: stretch;
  position: relative;
`;

const PortraitAnalysisBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 20px;
  z-index: 1;
  box-shadow: ${props => props.theme.shadows.sm};
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
  flex: ${props => props.$orientation === 'landscape' ? '0 0 auto' : '0 0 auto'};
  min-width: ${props => props.$orientation === 'landscape' ? '280px' : 'auto'};
  max-width: ${props => props.$orientation === 'landscape' ? '320px' : 'none'};
  overflow: hidden;
  ${props => props.$orientation === 'portrait' && `
    width: 100%;
    max-width: min(100vw - 32px, 600px);
    margin: 0 auto;
  `}
`;

const LandscapeLayout = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  gap: ${props => props.theme.spacing[3]};
`;

const LandscapeBoardSection = styled.div<{ $hasAnalysis?: boolean }>`
  display: flex;
  flex-direction: row;
  gap: ${props => props.theme.spacing[2]};
  height: 100%;
  align-items: center;
  padding: ${props => props.theme.spacing[2]};
  width: 100%;
  position: relative;
  /* Reserve space for analysis bar to prevent layout shift */
  ${props => !props.$hasAnalysis && `
    &::before {
      content: '';
      width: 18px;
      height: 100%;
      flex-shrink: 0;
      visibility: hidden;
    }
  `}
`;

const PlayersColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0;
  width: 200px;
  padding: ${props => props.theme.spacing[3]} 0;
  flex-shrink: 0;
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

export const ChessGameLayout: React.FC<ChessGameLayoutProps> = observer(({ className, hasChat = false }) => {
  const { gameStore, preferencesStore } = useRootStore();
  const analysisStore = useAnalysisStore();
  const layout = useLayout();
  const [isAnalysisActive, setIsAnalysisActive] = useState(false);
  const [isFENDialogOpen, setIsFENDialogOpen] = useState(false);
  
  // Use the user's preference for chess orientation instead of device orientation
  const isLandscape = preferencesStore.preferences.chessOrientation === 'landscape';
  
  // Get current position from GameStore
  const position = gameStore.currentPosition || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  
  // Test: Start with position after 1.e4
  // const position = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1';
  
  // Determine perspective
  const perspective = useMemo(() => {
    if (!gameStore.currentGame) return 'freestyle';
    // Freestyle mode for custom positions (negative gameId)
    if (gameStore.currentGame.gameId < 0) return 'freestyle';
    // TODO: Determine based on actual game state (playing, observing, examining)
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
  
  const opening = 'Sicilian Defense: Najdorf Variation'; // TODO: Get from ECO database
  
  // Mock player data for now
  const whitePlayer = gameStore.currentGame?.white || { name: 'White', rating: 1500, time: 900 };
  const blackPlayer = gameStore.currentGame?.black || { name: 'Black', rating: 1500, time: 900 };
  const isWhiteTurn = !gameStore.currentGame || gameStore.currentGame.turn === 'w';
  
  const handleMoveClick = useCallback((index: number) => {
    // TODO: Implement move navigation
    console.log('Navigate to move:', index);
  }, []);
  
  // Initialize analysis engine on mount
  useEffect(() => {
    analysisStore.initialize();
  }, [analysisStore]);
  
  // Handle analysis toggle
  useEffect(() => {
    if (isAnalysisActive && analysisStore.isEngineReady) {
      analysisStore.startAnalysis(position);
    } else {
      analysisStore.stopAnalysis();
    }
  }, [isAnalysisActive, position, analysisStore]);
  
  const handleAnalysis = useCallback(() => {
    setIsAnalysisActive(prev => !prev);
  }, []);
  
  const handleSetupFEN = useCallback(() => {
    setIsFENDialogOpen(true);
  }, []);
  
  
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
          
          <div style={{ position: 'relative' }}>
            {isAnalysisActive && (
              <PortraitAnalysisBar>
                <AnalysisDisplay orientation="horizontal" />
              </PortraitAnalysisBar>
            )}
            <BoardWrapper $orientation="portrait">
              <ChessBoardWithPieces
                position={position}
                flipped={preferencesStore.preferences.boardFlipped}
                showCoordinates={true}
                onMove={handleMove}
                interactive={perspective === 'playing' || perspective === 'freestyle'}
                lastMove={gameStore.lastMove || undefined}
              />
            </BoardWrapper>
          </div>
          
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
        
        <div style={{ minHeight: '28px' }}>
          {isAnalysisActive && (
            <AnalysisInfoDisplay />
          )}
        </div>
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
    <LayoutContainer className={className} $orientation={isLandscape ? 'landscape' : 'portrait'} $hasChat={hasChat}>
      {isLandscape ? (
        <>
          <ChessSection $orientation="landscape">
            <LandscapeBoardSection $hasAnalysis={isAnalysisActive}>
              {isAnalysisActive && (
                <AnalysisDisplay orientation="vertical" />
              )}
              <BoardArea>
                <TopBoardInfo>
                  <GameNumber>Game #{gameStore.currentGame?.gameId || '12345'}</GameNumber>
                  <TimeControl>{gameStore.currentGameInfo?.timeControl || '5 0'}</TimeControl>
                </TopBoardInfo>
                <BoardWrapper $orientation="landscape">
                  <ChessBoardWithPieces
                      position={position}
                      flipped={preferencesStore.preferences.boardFlipped}
                      showCoordinates={true}
                      onMove={handleMove}
                      interactive={perspective === 'playing' || perspective === 'freestyle'}
                      lastMove={gameStore.lastMove || undefined}
                  />
                </BoardWrapper>
                <BottomBoardInfo>
                  <LastMoveInfo>
                    {moveNotation !== 'Starting position' ? moveNotation : 'Last move: none'}
                  </LastMoveInfo>
                  {opening && (
                    <OpeningInfo>{opening}</OpeningInfo>
                  )}
                </BottomBoardInfo>
              </BoardArea>
              
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
                    $isActive={isAnalysisActive}
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
        
        <div style={{ minHeight: '28px' }}>
          {isAnalysisActive && (
            <AnalysisInfoDisplay />
          )}
        </div>
      </ChessSection>
      
      {perspective !== 'freestyle' && (
            <ControlsSection $orientation="landscape">
              <GameControls
                perspective={perspective}
                canAbort={gameStore.moveHistory.length <= 1}
              />
            </ControlsSection>
          )}
        </>
      ) : renderPortraitLayout()}
      
      <FENDialog 
        isOpen={isFENDialogOpen}
        onClose={() => setIsFENDialogOpen(false)}
      />
    </LayoutContainer>
  );
});

ChessGameLayout.displayName = 'ChessGameLayout';