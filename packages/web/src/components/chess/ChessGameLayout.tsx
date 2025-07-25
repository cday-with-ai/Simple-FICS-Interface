import React, {useCallback, useMemo, useState, useEffect} from 'react';
import styled from 'styled-components';
import {observer} from 'mobx-react-lite';
import {useGameStore, usePreferencesStore, useAnalysisStore, useFICSStore, useSoundStore} from '@fics/shared';
import {useLayout} from '../../theme/hooks';
import {ChessBoardWithPieces} from './ChessBoardWithPieces';
import {PlayerCard, GameClock} from './PlayerCard';
import {MoveList} from './MoveList';
import {ObservableClock} from './ObservableClock';
import {GameControls, CompactControlButton} from './GameControls';
import {AnalysisDisplay, AnalysisInfoDisplay} from './AnalysisDisplay';
import {FENDialog} from './FENDialog';
import {CapturedPieces} from './CapturedPieces';
import {ConfirmDialog} from '../ui/ConfirmDialog';
import {PromotionPieceSelector} from './PromotionPieceSelector';
import {convertToUnicodeChessPieces, longAlgebraicToDisplaySAN} from '@fics/shared';

interface ChessGameLayoutProps {
    className?: string;
    hasChat?: boolean;
    chatWidth?: number;
}

const LayoutContainer = styled.div<{ $orientation: 'landscape' | 'portrait'; $hasChat: boolean }>`
    width: 100%;
    height: 100%;
    display: ${props => props.$orientation === 'landscape' ? 'grid' : 'flex'};
    ${props => props.$orientation === 'landscape' ? `
    grid-template-columns: ${props.$hasChat ? 'minmax(0, 1fr) auto' : '1fr auto'};
  ` : `
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
  `}
    gap: ${props => props.$orientation === 'landscape' ? props.theme.spacing[3] : props.theme.spacing[1]};
    padding: ${props => props.theme.spacing[1]};
`;

const ChessSection = styled.div<{ $orientation: 'landscape' | 'portrait' }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${props => props.theme.spacing[2]};
    flex: ${props => props.$orientation === 'portrait' ? '0 0 auto' : '1'};
    width: 100%;
    height: ${props => props.$orientation === 'portrait' ? 'auto' : '100%'};
    justify-content: ${props => props.$orientation === 'portrait' ? 'flex-start' : 'center'};
    ${props => props.$orientation === 'portrait' && `
    padding-top: 0;
  `}
    overflow: ${props => props.$orientation === 'portrait' ? 'visible' : 'hidden'};
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

const BoardArea = styled.div<{ $isWideAspect?: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 0;
    height: 100%;
    align-items: center;
    justify-content: flex-start;
    flex: 0 0 auto;
    min-width: 0;
    overflow: hidden;
`;


const BoardWithAnalysis = styled.div<{ $orientation?: 'landscape' | 'portrait' }>`
    display: flex;
    flex-direction: row;
    gap: ${props => props.theme.spacing[1]};
    align-items: stretch;
    position: relative;
    height: fit-content;
`;

const PortraitCapturedPiecesContainer = styled.div<{ $squareSize?: number }>`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
`;

const CapturedPiecesColumn = styled.div<{ $squareSize?: number }>`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: absolute;
    top: ${props => props.$squareSize ? props.$squareSize * 1.2 : 0}px;
    left: 0;
    right: 0;
`;


const TopBoardInfo = styled.div`
    display: flex;
    gap: ${props => props.theme.spacing[2]};
    align-items: center;
    justify-content: space-between;
    width: 100%;
    z-index: 1;
`;

const BottomBoardInfo = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    z-index: 1;
`;

// Landscape-specific info components
const LandscapeTopInfo = styled(TopBoardInfo)<{ $chatWidth?: number; $hasAnalysis?: boolean }>`
    margin-bottom: -6px;
    max-width: min(calc(100vh - 100px), calc(100vw - ${props => props.$chatWidth || 0}px - 200px - 30px - 20px));
    padding: 0 11px;
`;

const LandscapeBottomInfo = styled(BottomBoardInfo)<{ $chatWidth?: number; $hasAnalysis?: boolean }>`
    margin-top: -6px;
    max-width: min(calc(100vh - 100px), calc(100vw - ${props => props.$chatWidth || 0}px - 200px - 30px - 20px));
    padding: 0 11px;
`;

// Portrait-specific info components
const PortraitTopInfo = styled(TopBoardInfo)`
    margin-top: 10px;
    margin-bottom: ${props => props.theme.spacing[1]};
    padding: 0 30px;
    position: relative;
`;

const PortraitControlButtons = styled.div`
    display: flex;
    gap: ${props => props.theme.spacing[1]};
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -${props => props.theme.spacing[2]};
    z-index: 10;
`;

const PortraitBottomInfo = styled(BottomBoardInfo)`
    margin-top: ${props => props.theme.spacing[1]};
    padding: 0 30px;
`;

const GameNumber = styled.div`
    font-size: ${props => props.theme.typography.fontSize.xs};
    color: ${props => props.theme.colors.textTertiary};
    font-weight: ${props => props.theme.typography.fontWeight.normal};
`;

const TimeControl = styled.div`
    font-size: ${props => props.theme.typography.fontSize.xs};
    color: ${props => props.theme.colors.textTertiary};
    font-weight: ${props => props.theme.typography.fontWeight.normal};
`;

const LastMoveInfo = styled.div`
    font-size: ${props => props.theme.typography.fontSize.xs};
    color: ${props => props.theme.colors.textTertiary};
    font-weight: ${props => props.theme.typography.fontWeight.normal};
`;

const OpeningInfo = styled.div`
    font-size: ${props => props.theme.typography.fontSize.xs};
    color: ${props => props.theme.colors.textTertiary};
    font-weight: ${props => props.theme.typography.fontWeight.normal};
`;

const BoardWrapper = styled.div<{ $orientation?: 'landscape' | 'portrait'; $chatWidth?: number; $hasAnalysis?: boolean }>`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    ${props => props.$orientation === 'portrait' ? `
    width: min(100vw - 32px, calc(100vh - 260px));
    height: min(100vw - 32px, calc(100vh - 260px));
    max-width: 600px;
    max-height: 600px;
  ` : `
    /* Landscape calculations:
     * Width: viewport width - chat width - player controls (200px) - analysis column (30px always) - padding (20px)
     * Height: viewport height - header (~48px) - top/bottom info (~80px) - padding (20px)
     */
    width: min(calc(100vh - 100px), calc(100vw - ${props.$chatWidth || 0}px - 200px - 30px - 20px));
    height: min(calc(100vh - 100px), calc(100vw - ${props.$chatWidth || 0}px - 200px - 30px - 20px));
    max-width: calc(100vh - 100px);
    max-height: calc(100vh - 100px);
  `}
`;


const PortraitBoardSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    width: fit-content;
    margin: 0 auto;
    align-items: stretch;
    position: relative;
`;

const BoardAndExtrasContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 0;
    position: relative;
`;

const BoardColumn = styled.div`
    display: flex;
    flex-direction: column;
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

const ControlsSection = styled.div<{ $orientation: 'landscape' | 'portrait'; $boardSize?: number }>`
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.spacing[2]};
    flex: ${props => props.$orientation === 'landscape' ? '0 0 auto' : '0 0 auto'};
    min-width: ${props => props.$orientation === 'landscape' ? '200px' : 'auto'};
    max-width: ${props => props.$orientation === 'landscape' ? '320px' : 'none'};
    overflow: ${props => props.$orientation === 'portrait' ? 'visible' : 'hidden'};
    ${props => props.$orientation === 'portrait' && `
    width: ${props.$boardSize ? `${props.$boardSize}px` : 'auto'};
    margin: 0 auto;
    padding-bottom: ${props.theme.spacing[2]};
  `}
`;

const LandscapeLayout = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    gap: 0;
`;

const LandscapeBoardSection = styled.div<{ $hasAnalysis?: boolean }>`
    display: flex;
    flex-direction: row;
    gap: ${props => props.theme.spacing[3]};
    height: 100%;
    align-items: flex-start;
    justify-content: center;
    padding: ${props => props.theme.spacing[2]};
    padding-top: ${props => props.theme.spacing[1]};
    width: 100%;
    position: relative;
    overflow: hidden;
    min-width: 0;
    
    /* Keep board and players together */
    & > * {
        flex-shrink: 0;
    }
`;

const PlayersColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: ${props => props.theme.spacing[2]};
    width: 280px;
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

const LandscapePlayersColumn = styled.div<{ $isWideAspect?: boolean; $boardSize?: number }>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: ${props => props.theme.spacing[2]};
    width: 200px;
    padding: ${props => props.theme.spacing[3]} 0;
    flex: 0 0 auto;
    
    /* Dynamically calculate margin based on actual board size */
    margin-top: ${props => {
        if (!props.$boardSize) return '180px'; // Fallback
        // LandscapeTopInfo height is approximately 35px
        const topInfoHeight = 35;
        // Gap between top info and board
        const gap = 8;
        // Center of board is at topInfoHeight + gap + (boardSize / 2)
        const boardCenter = topInfoHeight + gap + (props.$boardSize / 2);
        // Controls total height is approximately 260px
        // So offset by 160px to move them up (centering slightly higher)
        const controlsOffset = 160;
        return `${boardCenter - controlsOffset}px`;
    }};
`;

const LandscapeControlsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0;
    background-color: ${props => props.theme.colors.surface};
    border-radius: ${props => props.theme.borderRadius.container};
    box-shadow: ${props => props.theme.shadows.container};
    padding: 0 ${props => props.theme.spacing[1]};
    width: 180px;
    
    /* Remove all borders, shadows and backgrounds from child components */
    & > * {
        box-shadow: none !important;
        background-color: transparent !important;
        border: none !important;
        border-radius: 0 !important;
    }
    
    /* Add specific margins only where needed */
    & > div:nth-child(2) {
        /* GameControls - override its padding */
        padding: ${props => props.theme.spacing[1]} !important;
        margin-bottom: ${props => props.theme.spacing[1]};
    }
    
    & > div:nth-child(3) {
        margin-bottom: ${props => props.theme.spacing[1]};
    }
    
    /* Specifically target nested components */
    div[class*="CardContainer"],
    div[class*="MoveListContainer"],
    div[class*="PlayerCard"] {
        box-shadow: none !important;
        background-color: transparent !important;
        margin-bottom: 0;
    }
    
    /* Remove top padding from MoveList header (nav buttons) */
    div[class*="MoveListHeader"] {
        padding-top: 0 !important;
    }
`;

const LandscapePlayerWithClock = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.spacing[1]};
    align-items: flex-start;
    width: 100%;
`;

const PortraitPlayerInfo = styled.div`
    display: flex;
    flex-direction: row;
    gap: ${props => props.theme.spacing[1]};
    align-items: center;
    justify-content: flex-start;
    width: min(100vw - 32px, calc(100vh - 280px), 600px);
    max-width: 600px;
    padding: 0 8px;
`;

const CompactMoveList = styled(MoveList)`
    height: 135px;
    min-height: 135px;
    margin: ${props => props.theme.spacing[2]} 0;
`;

const LandscapeCompactMoveList = styled(MoveList)`
    height: 100px;
    min-height: 100px;
    margin: 0;
    margin-bottom: ${props => props.theme.spacing[2]};
`;

const PortraitClock = styled(GameClock)`
    height: 100%;
    flex-shrink: 0;

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

const PortraitPlayerCardWrapper = styled.div`
    flex: 1;
    display: flex;
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

const LandscapeAnalysisInfo = styled.div<{ $chatWidth?: number; $hasAnalysis?: boolean }>`
    margin-top: ${props => props.theme.spacing[1]};
    max-width: min(calc(100vh - 100px), calc(100vw - ${props => props.$chatWidth || 0}px - 200px - 30px - 20px));
    width: 100%;
    padding: 0 11px;
`;

const LandscapeAnalysisColumn = styled.div`
    width: 30px;
    height: 100%;
    position: relative;
    flex-shrink: 0;
    padding: ${props => props.theme.spacing[2]};
    padding-top: ${props => props.theme.spacing[1]};
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LandscapeAnalysisWrapper = styled.div<{ $boardSize?: number }>`
    position: relative;
    margin-top: 18px;
    height: ${props => props.$boardSize ? `${props.$boardSize}px` : '100%'};
    display: flex;
    align-items: center;
`;

const LandscapeCapturedPiecesContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.spacing[2]};
    padding: ${props => props.theme.spacing[2]};
    align-items: center;
`;

const PortraitAnalysisInfo = styled.div`
    min-height: 28px;
`;

const PortraitAnalysisInfoWrapper = styled.div`
    margin-top: 0;
    width: 100%;
    padding: 0 30px;
`;

const PortraitAnalysisWrapper = styled.div<{ $boardSize?: number }>`
    display: flex;
    align-items: center;
    height: ${props => props.$boardSize ? `${props.$boardSize}px` : 'auto'};
    margin-top: 65px; /* Align with board top (top info + player info) */
`;


export const ChessGameLayout: React.FC<ChessGameLayoutProps> = observer(({className, hasChat = false, chatWidth = 0}) => {
    const gameStore = useGameStore();
    const preferencesStore = usePreferencesStore();
    const analysisStore = useAnalysisStore();
    const ficsStore = useFICSStore();
    const soundStore = useSoundStore();
    const layout = useLayout();
    const [isAnalysisActive, setIsAnalysisActive] = useState(false);
    const [isFENDialogOpen, setIsFENDialogOpen] = useState(false);
    const [boardSize, setBoardSize] = useState<number>(0);
    const [showResignConfirm, setShowResignConfirm] = useState(false);
    const [isDrawOffered, setIsDrawOffered] = useState(false);
    const [selectedCapturedPiece, setSelectedCapturedPiece] = useState<string | null>(null);

    // Use the user's preference for chess orientation instead of device orientation
    const isLandscape = preferencesStore.preferences.chessOrientation === 'landscape';

    // Get current position from GameStore - direct access to ensure MobX tracks it
    const position = gameStore.currentPosition || 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    
    // Calculate if we have a wide aspect ratio (more width than height)
    // For tall landscapes like iPad Pro (1024x1366 in landscape = 1.33 ratio), align to top
    // For wide landscapes, center vertically  
    const aspectRatio = window.innerWidth / window.innerHeight;
    const isWideAspect = aspectRatio > 1.6;

    // Test: Start with position after 1.e4
    // const position = 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1';

    // Determine perspective
    const perspective = useMemo(() => {
        if (!gameStore.currentGame) return 'freestyle';
        // Freestyle mode for custom positions (negative gameId)
        if (gameStore.currentGame.gameId < 0) return 'freestyle';
        
        // Use the game perspective from gameStore
        if (gameStore.isPlaying) return 'playing';
        if (gameStore.isObserving) return 'observing';
        if (gameStore.isExamining) return 'examining';
        
        // Default to observing if we have a game but unclear state
        return 'observing';
    }, [gameStore.currentGame, gameStore.gameRelation]);
    
    // Determine if captured pieces should be shown
    const showCapturedPieces = useMemo(() => {
        // Always show for Crazyhouse variant
        if (gameStore.currentGame?.variant === 'crazyhouse') return true;
        
        // Otherwise, use preference
        return preferencesStore.preferences.showCapturedPieces;
    }, [gameStore.currentGame?.variant, preferencesStore.preferences.showCapturedPieces]);

    // Handle moves
    const handleMove = useCallback((from: string, to: string, promotion?: string) => {
        try {
            const success = gameStore.makeMove(from, to, promotion);
            if (!success) {
                console.error('Invalid move:', from, to);
                soundStore.playIllegal();
            }
        } catch (error) {
            console.error('Error making move:', error);
            soundStore.playIllegal();
        }
    }, [gameStore, soundStore]);

    // Handle drops (Crazyhouse)
    const handleDrop = useCallback((piece: string, to: string) => {
        try {
            // Convert piece char to PieceType enum value  
            const pieceType = piece.toLowerCase() as any;
            // Try to make the drop using the chess API directly
            const success = gameStore.makeSANMove(`${piece.toUpperCase()}@${to}`);
            if (!success) {
                console.error('Invalid drop:', piece, to);
                soundStore.playIllegal();
            }
        } catch (error) {
            console.error('Error making drop:', error);
            soundStore.playIllegal();
        }
    }, [gameStore, soundStore]);

    // Handle captured piece selection
    const handleCapturedPieceClick = useCallback((piece: string) => {
        setSelectedCapturedPiece(selectedCapturedPiece === piece ? null : piece);
    }, [selectedCapturedPiece]);

    // Get game info
    const gameInfo = useMemo(() => {
        if (gameStore.currentGameInfo) {
            const {white, black, timeControl, variant} = gameStore.currentGameInfo;
            return `Game ${gameStore.currentGame?.gameId || '?'} • ${variant} ${timeControl}`;
        }
        return 'No active game';
    }, [gameStore.currentGameInfo, gameStore.currentGame]);

    // Get move info - computed value for MobX reactivity
    const moveNotation = (() => {
        const historyLength = gameStore.moveHistory.length;
        if (historyLength > 0) {
            const lastMove = gameStore.moveHistory[historyLength - 1];
            const moveNumber = Math.ceil(historyLength / 2);
            const isWhiteMove = historyLength % 2 === 1;
            const moveWithSymbols = convertToUnicodeChessPieces(lastMove.san);
            return `${moveNumber}.${isWhiteMove ? '' : '..'} ${moveWithSymbols}`;
        }
        return 'Starting position';
    })();

    const opening = gameStore.currentOpening;

    // Get player data without accessing time to avoid re-renders
    const currentGame = gameStore.currentGame;
    // Use last game state if available when in freestyle mode
    const gameStateForDisplay = currentGame || gameStore.lastGameState;
    const whitePlayer = gameStateForDisplay?.white || {name: 'White', rating: 1500, time: 900};
    const blackPlayer = gameStateForDisplay?.black || {name: 'Black', rating: 1500, time: 900};
    const isWhiteTurn = !currentGame || currentGame.turn === 'w';
    
    // Determine which player should be shown at top/bottom based on board flip
    const boardFlipped = gameStore.shouldShowFlippedBoard;
    const topPlayer = boardFlipped ? whitePlayer : blackPlayer;
    const bottomPlayer = boardFlipped ? blackPlayer : whitePlayer;
    const isTopPlayerWhite = boardFlipped;
    const isTopPlayerTurn = boardFlipped ? isWhiteTurn : !isWhiteTurn;

    const handleMoveClick = useCallback((index: number) => {
        gameStore.goToMove(index);
    }, [gameStore]);

    // Initialize analysis engine on mount
    useEffect(() => {
        analysisStore.initialize();
    }, [analysisStore]);
    
    // Auto-send draw command when a move is made while draw is offered
    useEffect(() => {
        if (isDrawOffered && gameStore.isPlaying && gameStore.currentGame) {
            // Send draw command when move count changes
            ficsStore.sendCommand('draw');
        }
    }, [gameStore.moveHistory.length, isDrawOffered, gameStore.isPlaying, ficsStore]);
    
    // Reset draw offer when game ends
    useEffect(() => {
        if (!gameStore.currentGame || !gameStore.isPlaying) {
            setIsDrawOffered(false);
        }
    }, [gameStore.currentGame, gameStore.isPlaying]);

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

    const handleFlipBoard = useCallback(() => {
        preferencesStore.updatePreference('boardFlipped', !preferencesStore.preferences.boardFlipped);
    }, [preferencesStore]);
    
    const handleUnobserve = useCallback(() => {
        if (gameStore.currentGame) {
            ficsStore.sendCommand(`unobs ${gameStore.currentGame.gameId}`);
        }
    }, [ficsStore, gameStore.currentGame]);
    
    const handleUnexamine = useCallback(() => {
        ficsStore.sendCommand('unexamine');
    }, [ficsStore]);
    
    const handleResign = useCallback(() => {
        setShowResignConfirm(true);
    }, []);
    
    const confirmResign = useCallback(() => {
        ficsStore.sendCommand('resign');
        setShowResignConfirm(false);
    }, [ficsStore]);
    
    const handleDraw = useCallback(() => {
        ficsStore.sendCommand('draw');
        setIsDrawOffered(!isDrawOffered);
    }, [ficsStore, isDrawOffered]);
    
    const handleAbort = useCallback(() => {
        ficsStore.sendCommand('abort');
    }, [ficsStore]);


    const renderPortraitLayout = () => (
        <>
            <ChessSection $orientation="portrait">
                <PortraitBoardSection>
                    <BoardAndExtrasContainer>
                        {isAnalysisActive && (
                            <PortraitAnalysisWrapper $boardSize={boardSize}>
                                <AnalysisDisplay orientation="vertical" boardSize={boardSize}/>
                            </PortraitAnalysisWrapper>
                        )}
                        <BoardColumn>
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} id="board-container">
                                <PortraitTopInfo>
                                    <GameNumber>Game #{gameStateForDisplay?.gameId || '?'}</GameNumber>
                                    <TimeControl>{gameStateForDisplay?.timeControl || '?'}</TimeControl>
                                    <PortraitControlButtons>
                                        {perspective === 'playing' && (
                                            <>
                                                {gameStore.moveHistory.length <= 1 && (
                                                    <CompactControlButton
                                                        onClick={handleAbort}
                                                        $variant="secondary"
                                                    >
                                                        Abort
                                                    </CompactControlButton>
                                                )}
                                                <CompactControlButton
                                                    onClick={handleDraw}
                                                    $variant="secondary"
                                                >
                                                    Draw
                                                </CompactControlButton>
                                                <CompactControlButton
                                                    onClick={handleResign}
                                                    $variant="secondary"
                                                >
                                                    Resign
                                                </CompactControlButton>
                                                <PromotionPieceSelector
                                                    color={gameStore.playingColor || 'white'}
                                                    size="small"
                                                />
                                            </>
                                        )}
                                        {perspective === 'observing' && (
                                            <>
                                                <CompactControlButton
                                                    onClick={handleUnobserve}
                                                    $variant="secondary"
                                                >
                                                    Unobserve
                                                </CompactControlButton>
                                                <CompactControlButton
                                                    onClick={handleAnalysis}
                                                    $variant="secondary"
                                                >
                                                    Analysis
                                                </CompactControlButton>
                                            </>
                                        )}
                                        {perspective === 'examining' && (
                                            <>
                                                <CompactControlButton
                                                    onClick={handleUnexamine}
                                                    $variant="secondary"
                                                >
                                                    Unexamine
                                                </CompactControlButton>
                                                <CompactControlButton
                                                    onClick={handleAnalysis}
                                                    $variant="secondary"
                                                >
                                                    Analysis
                                                </CompactControlButton>
                                            </>
                                        )}
                                        {perspective === 'freestyle' && (
                                            <>
                                                <CompactControlButton
                                                    onClick={handleAnalysis}
                                                    $variant="secondary"
                                                >
                                                    Analysis
                                                </CompactControlButton>
                                                <CompactControlButton
                                                    onClick={handleFlipBoard}
                                                    $variant="secondary"
                                                >
                                                    Flip
                                                </CompactControlButton>
                                                <CompactControlButton
                                                    onClick={handleSetupFEN}
                                                    $variant="secondary"
                                                >
                                                    FEN
                                                </CompactControlButton>
                                            </>
                                        )}
                                    </PortraitControlButtons>
                                </PortraitTopInfo>

                                {/* Top player info aligned with board */}
                                <PortraitPlayerInfo>
                                    <ObservableClock
                                        player={topPlayer}
                                        isActive={isTopPlayerTurn}
                                        size="small"
                                        compact={true}
                                    />
                                    <PortraitPlayerCardWrapper>
                                        <PlayerCard
                                            name={topPlayer.name}
                                            rating={topPlayer.rating}
                                            time={0}
                                            isActive={isTopPlayerTurn}
                                            isWhite={isTopPlayerWhite}
                                            orientation="horizontal"
                                            hideClockInCard={true}
                                            compact={true}
                                        />
                                    </PortraitPlayerCardWrapper>
                                </PortraitPlayerInfo>

                                <BoardWrapper $orientation="portrait">
                                    <ChessBoardWithPieces
                                        position={position}
                                        flipped={boardFlipped}
                                        showCoordinates={preferencesStore.preferences.showCoordinates}
                                        onMove={handleMove}
                                        onDrop={handleDrop}
                                        interactive={perspective === 'playing' || perspective === 'freestyle' || perspective === 'examining'}
                                        lastMove={gameStore.lastMove || undefined}
                                        onSizeCalculated={setBoardSize}
                                        selectedCapturedPiece={selectedCapturedPiece}
                                        onCapturedPieceSelect={setSelectedCapturedPiece}
                                    />
                                </BoardWrapper>

                                {/* Bottom player info aligned with board */}
                                <PortraitPlayerInfo>
                                    <ObservableClock
                                        player={bottomPlayer}
                                        isActive={!isTopPlayerTurn}
                                        size="small"
                                        compact={true}
                                    />
                                    <PortraitPlayerCardWrapper>
                                        <PlayerCard
                                            name={bottomPlayer.name}
                                            rating={bottomPlayer.rating}
                                            time={0}
                                            isActive={!isTopPlayerTurn}
                                            isWhite={!isTopPlayerWhite}
                                            orientation="horizontal"
                                            hideClockInCard={true}
                                            compact={true}
                                        />
                                    </PortraitPlayerCardWrapper>
                                </PortraitPlayerInfo>

                                <PortraitBottomInfo>
                                    <LastMoveInfo>
                                        {gameStore.premove ? 
                                            `Premove: ${longAlgebraicToDisplaySAN(`${gameStore.premove.from}${gameStore.premove.to}${gameStore.premove.promotion || ''}`, position)}` :
                                            (moveNotation !== 'Starting position' ? `Last move: ${moveNotation}` : 'Last move: none')
                                        }
                                    </LastMoveInfo>
                                    {opening && (
                                        <OpeningInfo>{opening}</OpeningInfo>
                                    )}
                                </PortraitBottomInfo>

                                {isAnalysisActive && (
                                    <PortraitAnalysisInfoWrapper>
                                        <AnalysisInfoDisplay/>
                                    </PortraitAnalysisInfoWrapper>
                                )}
                            </div>
                        </BoardColumn>

                        {showCapturedPieces && (
                            <PortraitCapturedPiecesContainer $squareSize={boardSize ? boardSize / 8 : 0}>
                                <CapturedPiecesColumn $squareSize={boardSize ? boardSize / 8 : 0}>
                                    <CapturedPieces
                                        orientation="vertical"
                                        isWhitePieces={boardFlipped}
                                        boardSize={boardSize}
                                        onPieceClick={handleCapturedPieceClick}
                                    />
                                    <CapturedPieces
                                        orientation="vertical"
                                        isWhitePieces={!boardFlipped}
                                        boardSize={boardSize}
                                        onPieceClick={handleCapturedPieceClick}
                                    />
                                </CapturedPiecesColumn>
                            </PortraitCapturedPiecesContainer>
                        )}
                    </BoardAndExtrasContainer>
                </PortraitBoardSection>
            </ChessSection>

            <ControlsSection $orientation="portrait" $boardSize={boardSize}>
                <MoveList
                    moves={gameStore.moveHistory}
                    currentMoveIndex={gameStore.currentMoveIndex}
                    onMoveClick={handleMoveClick}
                    disableAutoScroll={true}
                    onNavigate={(direction) => {
                        if (gameStore.isExamining) {
                            // In examine mode, send commands to FICS
                            switch (direction) {
                                case 'first':
                                    ficsStore.sendCommand('back 500');
                                    break;
                                case 'prev':
                                    ficsStore.sendCommand('back');
                                    break;
                                case 'next':
                                    ficsStore.sendCommand('forward');
                                    break;
                                case 'last':
                                    ficsStore.sendCommand('forward 500');
                                    break;
                            }
                        } else {
                            // Local navigation for other modes
                            switch (direction) {
                                case 'first':
                                    gameStore.goToStart();
                                    break;
                                case 'prev':
                                    gameStore.goToPreviousMove();
                                    break;
                                case 'next':
                                    gameStore.goToNextMove();
                                    break;
                                case 'last':
                                    gameStore.goToEnd();
                                    break;
                            }
                        }
                    }}
                />
            </ControlsSection>
        </>
    );

    return (
        <LayoutContainer className={className} $orientation={isLandscape ? 'landscape' : 'portrait'} $hasChat={hasChat}>
            {isLandscape ? (
                <>
                    <ChessSection $orientation="landscape">
                        <LandscapeLayout>
                            <LandscapeAnalysisColumn>
                                {isAnalysisActive && (
                                    <LandscapeAnalysisWrapper $boardSize={boardSize}>
                                        <AnalysisDisplay orientation="vertical" boardSize={boardSize}/>
                                    </LandscapeAnalysisWrapper>
                                )}
                            </LandscapeAnalysisColumn>
                            <LandscapeBoardSection $hasAnalysis={isAnalysisActive}>
                                <BoardArea $isWideAspect={isWideAspect}>
                                    <LandscapeTopInfo $chatWidth={chatWidth} $hasAnalysis={isAnalysisActive}>
                                        <GameNumber>Game #{gameStateForDisplay?.gameId || '?'}</GameNumber>
                                        <TimeControl>{gameStateForDisplay?.timeControl || '?'}</TimeControl>
                                    </LandscapeTopInfo>
                                    <BoardWithAnalysis $orientation="landscape">
                                        <BoardWrapper $orientation="landscape" $chatWidth={chatWidth} $hasAnalysis={isAnalysisActive}>
                                            <ChessBoardWithPieces
                                            position={position}
                                            flipped={boardFlipped}
                                            showCoordinates={preferencesStore.preferences.showCoordinates}
                                            onMove={handleMove}
                                            onDrop={handleDrop}
                                            interactive={perspective === 'playing' || perspective === 'freestyle' || perspective === 'examining'}
                                            lastMove={gameStore.lastMove || undefined}
                                            onSizeCalculated={setBoardSize}
                                            selectedCapturedPiece={selectedCapturedPiece}
                                            onCapturedPieceSelect={setSelectedCapturedPiece}
                                        />
                                    </BoardWrapper>
                                </BoardWithAnalysis>
                                <LandscapeBottomInfo $chatWidth={chatWidth} $hasAnalysis={isAnalysisActive}>
                                    <LastMoveInfo>
                                        {gameStore.premove ? 
                                            `Premove: ${longAlgebraicToDisplaySAN(`${gameStore.premove.from}${gameStore.premove.to}${gameStore.premove.promotion || ''}`, position)}` :
                                            (moveNotation !== 'Starting position' ? `Last move: ${moveNotation}` : 'Last move: none')
                                        }
                                    </LastMoveInfo>
                                    {opening && (
                                        <OpeningInfo>{opening}</OpeningInfo>
                                    )}
                                </LandscapeBottomInfo>
                                {isAnalysisActive && (
                                    <LandscapeAnalysisInfo $chatWidth={chatWidth} $hasAnalysis={isAnalysisActive}>
                                        <AnalysisInfoDisplay/>
                                    </LandscapeAnalysisInfo>
                                )}
                            </BoardArea>

                            <LandscapePlayersColumn $isWideAspect={isWideAspect} $boardSize={boardSize}>
                                {showCapturedPieces && (
                                    <CapturedPieces
                                        orientation="horizontal"
                                        isWhitePieces={isTopPlayerWhite}
                                        boardSize={boardSize}
                                        onPieceClick={handleCapturedPieceClick}
                                    />
                                )}
                                
                                <ObservableClock
                                    player={topPlayer}
                                    isActive={isTopPlayerTurn}
                                    size="small"
                                    compact={true}
                                    variant="landscape"
                                />
                                
                                <LandscapeControlsContainer>
                                    <PlayerCard
                                        name={topPlayer.name}
                                        rating={topPlayer.rating}
                                        time={0}
                                        isActive={isTopPlayerTurn}
                                        isWhite={isTopPlayerWhite}
                                        orientation="vertical"
                                        hideClockInCard={true}
                                        compact={true}
                                    />

                                <GameControls
                                    perspective={perspective}
                                    canAbort={gameStore.moveHistory.length <= 1}
                                    onAnalysis={handleAnalysis}
                                    onFlipBoard={handleFlipBoard}
                                    onSetupFEN={handleSetupFEN}
                                    onUnobserve={handleUnobserve}
                                    onUnexamine={handleUnexamine}
                                    onResign={handleResign}
                                    onDraw={handleDraw}
                                    onAbort={handleAbort}
                                    isAnalysisActive={isAnalysisActive}
                                    isDrawOffered={isDrawOffered}
                                />

                                <LandscapeCompactMoveList
                                    moves={gameStore.moveHistory}
                                    currentMoveIndex={gameStore.currentMoveIndex}
                                    onMoveClick={handleMoveClick}
                                    showHeader={false}
                                    onNavigate={(direction) => {
                                        if (gameStore.isExamining) {
                                            // In examine mode, send commands to FICS
                                            switch (direction) {
                                                case 'first':
                                                    ficsStore.sendCommand('backward 999');
                                                    break;
                                                case 'prev':
                                                    ficsStore.sendCommand('backward');
                                                    break;
                                                case 'next':
                                                    ficsStore.sendCommand('forward');
                                                    break;
                                                case 'last':
                                                    ficsStore.sendCommand('forward 999');
                                                    break;
                                            }
                                        } else {
                                            // Local navigation for other modes
                                            switch (direction) {
                                                case 'first':
                                                    gameStore.goToStart();
                                                    break;
                                                case 'prev':
                                                    gameStore.goToPreviousMove();
                                                    break;
                                                case 'next':
                                                    gameStore.goToNextMove();
                                                    break;
                                                case 'last':
                                                    gameStore.goToEnd();
                                                    break;
                                            }
                                        }
                                    }}
                                />

                                    <PlayerCard
                                        name={bottomPlayer.name}
                                        rating={bottomPlayer.rating}
                                        time={0}
                                        isActive={!isTopPlayerTurn}
                                        isWhite={!isTopPlayerWhite}
                                        orientation="vertical"
                                        hideClockInCard={true}
                                        compact={true}
                                    />
                                </LandscapeControlsContainer>
                                
                                <ObservableClock
                                    player={bottomPlayer}
                                    isActive={!isTopPlayerTurn}
                                    size="small"
                                    compact={true}
                                    variant="landscape"
                                />
                                
                                {showCapturedPieces && (
                                    <CapturedPieces
                                        orientation="horizontal"
                                        isWhitePieces={!isTopPlayerWhite}
                                        boardSize={boardSize}
                                        onPieceClick={handleCapturedPieceClick}
                                    />
                                )}
                            </LandscapePlayersColumn>
                        </LandscapeBoardSection>
                        </LandscapeLayout>
                    </ChessSection>
                </>
            ) : renderPortraitLayout()}

            <FENDialog
                isOpen={isFENDialogOpen}
                onClose={() => setIsFENDialogOpen(false)}
            />
            <ConfirmDialog
                isOpen={showResignConfirm}
                title="Resign Game"
                message="Are you sure you want to resign?"
                confirmText="Yes, Resign"
                cancelText="Cancel"
                onConfirm={confirmResign}
                onCancel={() => setShowResignConfirm(false)}
            />
        </LayoutContainer>
    );
});

ChessGameLayout.displayName = 'ChessGameLayout';