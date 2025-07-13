import React, { useMemo, useRef, useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useLayout } from '../../theme/hooks';
import { ChessPiece } from './ChessPiece';
import { usePreferencesStore, useGameStore } from '@fics/shared';
import { PromotionDialog } from './PromotionDialog';

interface ChessBoardWithPiecesProps {
  position: string; // FEN position string
  size?: number;
  flipped?: boolean;
  showCoordinates?: boolean;
  onMove?: (from: string, to: string, promotion?: string) => void;
  onDrop?: (piece: string, to: string) => void;
  highlightedSquares?: Set<string>;
  lastMove?: { from: string; to: string };
  interactive?: boolean;
  onSizeCalculated?: (size: number) => void;
  selectedCapturedPiece?: string | null;
  onCapturedPieceSelect?: (piece: string | null) => void;
}

interface AnimatingPiece {
  piece: string;
  from: string;
  to: string;
  startTime: number;
}

const BoardContainer = styled.div<{ $size: number }>`
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  position: relative;
  border-radius: ${props => props.theme.borderRadius.container};
  box-shadow: ${props => props.theme.shadows.container};
  overflow: hidden;
  user-select: none;
`;

const BoardGrid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  position: relative;
`;

const Square = styled.div<{
  $isLight: boolean;
  $isHighlighted: boolean;
  $isLastMoveSquare: boolean;
  $isSelected: boolean;
  $isPossibleMove: boolean;
}>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  background-color: ${props => {
    if (props.$isSelected) {
      return props.theme.colors.board.selected;
    }
    if (props.$isLastMoveSquare) {
      return props.$isLight 
        ? props.theme.colors.board.lastMoveLight
        : props.theme.colors.board.lastMoveDark;
    }
    return props.$isLight 
      ? props.theme.colors.board.light 
      : props.theme.colors.board.dark;
  }};
  
  &:hover {
    background-color: ${props => 
      props.$isLight 
        ? props.theme.colors.board.hoverLight 
        : props.theme.colors.board.hoverDark
    };
  }
  
  ${props => props.$isHighlighted && `
    &::after {
      content: '';
      position: absolute;
      width: 30%;
      height: 30%;
      background-color: ${props.theme.colors.board.highlight};
      border-radius: 50%;
      opacity: 0.8;
    }
  `}
  
  ${props => props.$isPossibleMove && `
    &::before {
      content: '';
      position: absolute;
      width: ${props.$isLight || props.$isLastMoveSquare ? '35%' : '30%'};
      height: ${props.$isLight || props.$isLastMoveSquare ? '35%' : '30%'};
      background-color: rgba(0, 0, 0, 0.15);
      border-radius: 50%;
    }
  `}
`;

const Coordinate = styled.div<{ $type: 'file' | 'rank'; $isLight: boolean; $size: number }>`
  position: absolute;
  font-size: ${props => Math.max(6, Math.min(14, props.$size * 0.15))}px;
  font-weight: 600;
  color: ${props => props.$isLight 
    ? props.theme.colors.board.dark  // Use dark square color on light squares
    : props.theme.colors.board.light  // Use light square color on dark squares
  };
  opacity: 0.8;
  user-select: none;
  line-height: 1;
  
  ${props => props.$type === 'file' ? `
    bottom: 3px;
    right: 3px;
  ` : `
    top: 3px;
    left: 3px;
  `}
`;

const DraggingPiece = styled.div.attrs<{ $x: number; $y: number; $size: number }>(props => ({
  style: {
    transform: `translate(calc(${props.$x}px - 50%), calc(${props.$y}px - 50%))`,
    width: `${props.$size}px`,
    height: `${props.$size}px`
  }
}))<{ $x: number; $y: number; $size: number }>`
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: none;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
`;

const AnimatingPieceWrapper = styled.div.attrs<{ 
  $fromX: number; 
  $fromY: number; 
  $toX: number; 
  $toY: number; 
  $progress: number;
  $size: number;
}>(props => ({
  style: {
    transform: `translate(
      ${props.$fromX + (props.$toX - props.$fromX) * props.$progress}px,
      ${props.$fromY + (props.$toY - props.$fromY) * props.$progress}px
    )`,
    width: `${props.$size}px`,
    height: `${props.$size}px`
  }
}))<{ 
  $fromX: number; 
  $fromY: number; 
  $toX: number; 
  $toY: number; 
  $progress: number;
  $size: number;
}>`
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform;
`;

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'];

function getSquareColor(file: number, rank: number): boolean {
  return (file + rank) % 2 === 0;
}

function getSquareName(fileIndex: number, rankIndex: number, flipped: boolean): string {
  const file = flipped ? FILES[7 - fileIndex] : FILES[fileIndex];
  const rank = flipped ? RANKS[7 - rankIndex] : RANKS[rankIndex];
  return `${file}${rank}`;
}

function parseFEN(fen: string): Map<string, string> {
  const pieces = new Map<string, string>();
  const [position] = fen.split(' ');
  const ranks = position.split('/');

  ranks.forEach((rank, rankIndex) => {
    let fileIndex = 0;
    for (const char of rank) {
      if (char >= '1' && char <= '8') {
        fileIndex += parseInt(char);
      } else {
        const square = `${FILES[fileIndex]}${RANKS[rankIndex]}`;
        pieces.set(square, char);
        fileIndex++;
      }
    }
  });

  return pieces;
}

export const ChessBoardWithPieces: React.FC<ChessBoardWithPiecesProps> = observer(({
  position,
  size: providedSize,
  flipped = false,
  showCoordinates = true,
  onMove,
  onDrop,
  highlightedSquares = new Set(),
  lastMove,
  interactive = true,
  onSizeCalculated,
  selectedCapturedPiece,
  onCapturedPieceSelect
}) => {
  const layout = useLayout();
  const preferencesStore = usePreferencesStore();
  const gameStore = useGameStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [calculatedSize, setCalculatedSize] = useState(providedSize || 200);
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<Set<string>>(new Set());
  const [draggedPiece, setDraggedPiece] = useState<{
    piece: string;
    from: string;
    x: number;
    y: number;
    size: number;
  } | null>(null);
  const [animatingPieces, setAnimatingPieces] = useState<AnimatingPiece[]>([]);
  const animationFrameRef = useRef<number>();
  const [promotionState, setPromotionState] = useState<{
    from: string;
    to: string;
    color: 'white' | 'black';
    position: { x: number; y: number };
  } | null>(null);
  const [userMoveInProgress, setUserMoveInProgress] = useState(false);

  // Parse position
  const pieces = useMemo(() => parseFEN(position), [position]);
  const previousPiecesRef = useRef<Map<string, string>>(new Map());
  
  // Function to get square position relative to board
  const getSquarePosition = useCallback((square: string, boardSize: number) => {
    const fileIndex = FILES.indexOf(square[0]);
    const rankIndex = RANKS.indexOf(square[1]);
    const squareSize = boardSize / 8;
    
    const x = flipped ? (7 - fileIndex) * squareSize : fileIndex * squareSize;
    const y = flipped ? (7 - rankIndex) * squareSize : rankIndex * squareSize;
    
    return { x, y };
  }, [flipped]);
  
  // Check if a pawn move is a promotion
  const isPromotion = useCallback((piece: string, from: string, to: string) => {
    const isPawn = piece.toLowerCase() === 'p';
    const toRank = to[1];
    const isPromotionRank = toRank === '8' || toRank === '1';
    return isPawn && isPromotionRank;
  }, []);

  // Handle right click to clear premove
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (gameStore.isPlaying) {
      gameStore.clearPremove();
    }
  }, [gameStore]);

  // Calculate optimal board size
  useEffect(() => {
    if (providedSize) {
      setCalculatedSize(providedSize);
      return;
    }

    const calculateBoardSize = () => {
      if (!containerRef.current) {
        // No container ref yet
        return;
      }

      const parent = containerRef.current.parentElement;
      if (!parent) {
        // No parent element yet
        return;
      }

      const { width: parentWidth, height: parentHeight } = parent.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      // Board size calculation in progress

      // Add some padding to prevent edge overlap
      const padding = 16;
      const maxWidth = parentWidth - padding;
      const maxHeight = parentHeight - padding;

      const optimalSize = Math.floor(Math.min(maxWidth, maxHeight));
      const size = Math.max(100, Math.floor(optimalSize / 8) * 8); // Minimum 100px

      // Only update if size actually changed
      if (size !== calculatedSize) {
        setCalculatedSize(size);
        onSizeCalculated?.(size);
      }
    };

    // Initial calculation with a small delay to ensure parent is rendered
    const initialTimeout = setTimeout(calculateBoardSize, 50);
    
    // Also calculate immediately in case parent is already sized
    calculateBoardSize();

    // Use debounced resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(calculateBoardSize, 100);
    };

    window.addEventListener('resize', handleResize);

    // Add ResizeObserver to watch parent element
    let resizeObserver: ResizeObserver | null = null;
    if (containerRef.current && containerRef.current.parentElement) {
      resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(containerRef.current.parentElement);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      clearTimeout(initialTimeout);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [providedSize, calculatedSize]);

  const squareSize = calculatedSize / 8;
  
  // Check if we should disable animations due to low time
  const shouldAnimateMoves = useMemo(() => {
    if (!preferencesStore.preferences.animateMoves) return false;
    
    // Check if we're playing and have low time
    if (gameStore.isPlaying && preferencesStore.preferences.disableAnimationLowTime) {
      const currentGame = gameStore.currentGame;
      const playingColor = gameStore.playingColor;
      if (currentGame && playingColor) {
        // Get the time for the player (not necessarily the active player)
        const playerTime = playingColor === 'white' ? currentGame.white.time : currentGame.black.time;
        // Disable animations if under 10 seconds
        if (playerTime < 10) return false;
      }
    }
    
    return true;
  }, [preferencesStore.preferences.animateMoves, preferencesStore.preferences.disableAnimationLowTime, 
      gameStore.isPlaying, gameStore.currentGame, gameStore.playingColor]);
  
  // Detect piece movements and start animations
  useEffect(() => {
    if (!shouldAnimateMoves || userMoveInProgress) {
      previousPiecesRef.current = new Map(pieces);
      return;
    }
    
    const previousPieces = previousPiecesRef.current;
    const newAnimations: AnimatingPiece[] = [];
    
    // Find pieces that moved
    previousPieces.forEach((piece, square) => {
      if (!pieces.has(square)) {
        // This piece moved from this square - find where it went
        // Look for the same piece type that appeared on a new square
        pieces.forEach((newPiece, newSquare) => {
          if (newPiece === piece && !previousPieces.has(newSquare)) {
            // Check if this could be the move based on lastMove
            if (lastMove && lastMove.from === square && lastMove.to === newSquare) {
              newAnimations.push({
                piece,
                from: square,
                to: newSquare,
                startTime: Date.now()
              });
            }
          }
        });
      }
    });
    
    if (newAnimations.length > 0) {
      setAnimatingPieces(prev => [...prev, ...newAnimations]);
    }
    
    previousPiecesRef.current = new Map(pieces);
  }, [pieces, lastMove, shouldAnimateMoves, userMoveInProgress]);
  
  // Clear user move flag after position changes
  useEffect(() => {
    if (userMoveInProgress) {
      // Clear the flag after a brief delay to ensure the position has updated
      const timeout = setTimeout(() => {
        setUserMoveInProgress(false);
      }, 50);
      
      return () => clearTimeout(timeout);
    }
  }, [position, userMoveInProgress]);
  
  // Animation loop
  useEffect(() => {
    if (animatingPieces.length === 0) return;
    
    const animate = () => {
      const now = Date.now();
      const duration = preferencesStore.preferences.animationDuration;
      
      setAnimatingPieces(prev => {
        const ongoing = prev.filter(anim => {
          const elapsed = now - anim.startTime;
          return elapsed < duration;
        });
        
        if (ongoing.length > 0) {
          animationFrameRef.current = requestAnimationFrame(animate);
        }
        
        return ongoing;
      });
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animatingPieces.length, preferencesStore.preferences.animationDuration]);

  // Calculate possible drop moves when a captured piece is selected
  useEffect(() => {
    if (selectedCapturedPiece) {
      try {
        // Ensure ChessAPI is synchronized with current position
        const currentPosition = gameStore.currentPosition;
        if (gameStore.chessBoard.getFen() !== currentPosition) {
          gameStore.chessBoard.loadFen(currentPosition);
        }
        
        const allMoves = gameStore.chessBoard.getLegalMoves();
        const dropMoves = allMoves.filter(move => 
          move.from === '@' && move.san.toLowerCase().startsWith(selectedCapturedPiece.toLowerCase())
        );
        const dropTargets = new Set(dropMoves.map(move => move.to));
        setPossibleMoves(dropTargets);
        // Clear regular piece selection when captured piece is selected
        setSelectedSquare(null);
      } catch (error) {
        console.error('Error getting drop moves:', error);
        setPossibleMoves(new Set());
      }
    }
  }, [selectedCapturedPiece, gameStore]);

  // Handle square click
  const handleSquareClick = useCallback((square: string, event?: React.MouseEvent) => {
    if (!interactive) {
      return;
    }

    const piece = pieces.get(square);

    // Handle captured piece drops
    if (selectedCapturedPiece) {
      if (possibleMoves.has(square)) {
        // Make the drop
        onDrop?.(selectedCapturedPiece, square);
        onCapturedPieceSelect?.(null);
        setPossibleMoves(new Set());
      } else {
        // Invalid drop target - clear selection
        onCapturedPieceSelect?.(null);
        setPossibleMoves(new Set());
      }
      return;
    }

    if (selectedSquare) {
      // If clicking on a possible move, make the move
      if (possibleMoves.has(square)) {
        const movingPiece = pieces.get(selectedSquare);
        if (movingPiece && isPromotion(movingPiece, selectedSquare, square)) {
          // Handle promotion
          const color = movingPiece === movingPiece.toUpperCase() ? 'white' : 'black';
          
          // In playing mode, use auto-promotion preference
          if (gameStore.isPlaying) {
            const promotionPiece = preferencesStore.preferences.autoPromotionPiece;
            // If it's not our turn, set as premove
            if (!gameStore.isMyTurn) {
              gameStore.setPremove(selectedSquare, square, promotionPiece);
            } else {
              setUserMoveInProgress(true);
              onMove?.(selectedSquare, square, promotionPiece);
            }
          } else {
            // Show promotion dialog
            const rect = event?.currentTarget.getBoundingClientRect();
            setPromotionState({
              from: selectedSquare,
              to: square,
              color,
              position: rect ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 } : { x: window.innerWidth / 2, y: window.innerHeight / 2 }
            });
          }
        } else {
          // If it's not our turn in playing mode, set as premove
          if (gameStore.isPlaying && !gameStore.isMyTurn) {
            gameStore.setPremove(selectedSquare, square);
          } else {
            setUserMoveInProgress(true);
            onMove?.(selectedSquare, square);
          }
        }
        setSelectedSquare(null);
        setPossibleMoves(new Set());
      } else if (square === selectedSquare) {
        // Clicking the same square deselects
        setSelectedSquare(null);
        setPossibleMoves(new Set());
      } else if (piece) {
        // Select a different piece
        setSelectedSquare(square);
        // Calculate legal moves for the selected piece if preference is enabled
        if (preferencesStore.preferences.showLegalMoves) {
          try {
            // Ensure ChessAPI is synchronized with current position
            const currentPosition = gameStore.currentPosition;
            if (gameStore.chessBoard.getFen() !== currentPosition) {
              gameStore.chessBoard.loadFen(currentPosition);
            }
            
            const legalMoves = gameStore.chessBoard.getLegalMoves(square);
            const moveTargets = new Set(legalMoves.map(move => move.to));
            setPossibleMoves(moveTargets);
          } catch (error) {
            console.error('Error getting legal moves:', error);
            setPossibleMoves(new Set());
          }
        } else {
          setPossibleMoves(new Set());
        }
      } else {
        // Clicked on empty square that's not a valid move - deselect
        setSelectedSquare(null);
        setPossibleMoves(new Set());
      }
    } else if (piece) {
      // Select the piece
      setSelectedSquare(square);
      // Calculate legal moves for the selected piece
      try {
        // Ensure ChessAPI is synchronized with current position
        const currentPosition = gameStore.currentPosition;
        if (gameStore.chessBoard.getFen() !== currentPosition) {
          gameStore.chessBoard.loadFen(currentPosition);
        }
        
        // Check if this piece belongs to the current player to move
        const isWhitePiece = piece === piece.toUpperCase();
        const currentTurn = gameStore.chessBoard.getActiveColor();
        const isPieceOwnedByCurrentPlayer = (isWhitePiece && currentTurn === 'w') || (!isWhitePiece && currentTurn === 'b');
        
        if (isPieceOwnedByCurrentPlayer) {
          // Only show legal moves if preference is enabled
          if (preferencesStore.preferences.showLegalMoves) {
            const legalMoves = gameStore.chessBoard.getLegalMoves(square);
            const moveTargets = new Set(legalMoves.map(move => move.to));
            setPossibleMoves(moveTargets);
          } else {
            setPossibleMoves(new Set());
          }
        } else {
          // Don't allow selecting opponent's pieces in normal play
          setPossibleMoves(new Set());
          setSelectedSquare(null);
        }
      } catch (error) {
        console.error('Error getting legal moves:', error);
        setPossibleMoves(new Set());
      }
    }
  }, [selectedSquare, possibleMoves, pieces, onMove, onDrop, interactive, isPromotion, gameStore, preferencesStore.preferences.autoPromotionPiece, selectedCapturedPiece, onCapturedPieceSelect]);

  // Unified mouse handler for both click and drag
  const handleMouseDown = useCallback((e: React.MouseEvent, square: string, piece: string | undefined) => {
    if (!interactive) return;

    const startX = e.clientX;
    const startY = e.clientY;
    let hasMoved = false;
    let dragStarted = false;
    
    // Capture rect information early while currentTarget is still available
    const rect = e.currentTarget.getBoundingClientRect();
    const actualSquareSize = rect.width;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = Math.abs(moveEvent.clientX - startX);
      const deltaY = Math.abs(moveEvent.clientY - startY);
      
      if ((deltaX > 3 || deltaY > 3) && piece && !dragStarted) {
        hasMoved = true;
        dragStarted = true;
        startDrag(square, piece, moveEvent, actualSquareSize);
      } else if (dragStarted) {
        // Continue dragging - use dragStarted flag instead of draggedPiece state
        setDraggedPiece(prev => prev ? { 
          ...prev, 
          x: moveEvent.clientX, 
          y: moveEvent.clientY 
        } : null);
      }
    };

    const handleMouseUp = (upEvent: MouseEvent) => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      
      if (dragStarted) {
        // Handle drag end
        handleDragEnd(upEvent, square, piece!);
      } else if (!hasMoved) {
        // Handle click
        handleSquareClick(square, e);
      } else {
        setDraggedPiece(null);
        setSelectedSquare(null);
        setPossibleMoves(new Set());
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [interactive, handleSquareClick]);

  // Start drag operation
  const startDrag = useCallback((square: string, piece: string, currentEvent: MouseEvent, squareSize: number) => {
    setSelectedSquare(square);
    
    // Calculate and show legal moves during drag if preference is enabled
    if (preferencesStore.preferences.showLegalMoves) {
      try {
        // Ensure ChessAPI is synchronized with current position
        const currentPosition = gameStore.currentPosition;
        if (gameStore.chessBoard.getFen() !== currentPosition) {
          gameStore.chessBoard.loadFen(currentPosition);
        }
        
        // Check if this piece belongs to the current player to move
        const isWhitePiece = piece === piece.toUpperCase();
        const currentTurn = gameStore.chessBoard.getActiveColor();
        const isPieceOwnedByCurrentPlayer = (isWhitePiece && currentTurn === 'w') || (!isWhitePiece && currentTurn === 'b');
        
        if (isPieceOwnedByCurrentPlayer) {
          const legalMoves = gameStore.chessBoard.getLegalMoves(square);
          const moveTargets = new Set(legalMoves.map(move => move.to));
          setPossibleMoves(moveTargets);
        } else {
          setPossibleMoves(new Set());
        }
      } catch (error) {
        console.error('Error getting legal moves for drag:', error);
        setPossibleMoves(new Set());
      }
    } else {
      setPossibleMoves(new Set());
    }
    
    const dragState = { 
      piece, 
      from: square, 
      x: currentEvent.clientX, 
      y: currentEvent.clientY, 
      size: squareSize 
    };
    setDraggedPiece(dragState);
  }, [preferencesStore.preferences.showLegalMoves, gameStore]);

  // Handle drag end
  const handleDragEnd = useCallback((upEvent: MouseEvent, fromSquare: string, piece: string) => {
    try {
      // Find which square the mouse is over
      const elements = document.elementsFromPoint(upEvent.clientX, upEvent.clientY);
      const squareElement = elements.find(el => el.getAttribute('data-square'));
      const targetSquare = squareElement?.getAttribute('data-square');

      if (targetSquare && targetSquare !== fromSquare) {
        if (isPromotion(piece, fromSquare, targetSquare)) {
          // Handle promotion
          const color = piece === piece.toUpperCase() ? 'white' : 'black';
          
          // In playing mode, use auto-promotion preference
          if (gameStore.isPlaying) {
            const promotionPiece = preferencesStore.preferences.autoPromotionPiece;
            // If it's not our turn, set as premove
            if (!gameStore.isMyTurn) {
              gameStore.setPremove(fromSquare, targetSquare, promotionPiece);
            } else {
              setUserMoveInProgress(true);
              onMove?.(fromSquare, targetSquare, promotionPiece);
            }
          } else {
            // Show promotion dialog
            setPromotionState({
              from: fromSquare,
              to: targetSquare,
              color,
              position: { x: upEvent.clientX, y: upEvent.clientY }
            });
          }
        } else {
          // If it's not our turn in playing mode, set as premove
          if (gameStore.isPlaying && !gameStore.isMyTurn) {
            gameStore.setPremove(fromSquare, targetSquare);
          } else {
            setUserMoveInProgress(true);
            onMove?.(fromSquare, targetSquare);
          }
        }
      }
    } catch (error) {
      console.error('Error in handleDragEnd:', error);
    }

    setDraggedPiece(null);
    setSelectedSquare(null);
    setPossibleMoves(new Set());
  }, [onMove, isPromotion, gameStore, preferencesStore.preferences.autoPromotionPiece]);

  const squares = useMemo(() => {
    const result = [];

    for (let rankIndex = 0; rankIndex < 8; rankIndex++) {
      for (let fileIndex = 0; fileIndex < 8; fileIndex++) {
        const isLight = getSquareColor(fileIndex, rankIndex);
        const squareName = getSquareName(fileIndex, rankIndex, flipped);
        const piece = pieces.get(squareName);
        const isHighlighted = highlightedSquares.has(squareName);
        const isLastMoveSquare = lastMove &&
          (lastMove.from === squareName || lastMove.to === squareName);
        const isSelected = selectedSquare === squareName;
        const isPossibleMove = possibleMoves.has(squareName);
        const isDraggedFrom = draggedPiece?.from === squareName;
        const isAnimating = animatingPieces.some(anim => anim.to === squareName);

        const showFileCoordinate = showCoordinates && rankIndex === 7;
        const showRankCoordinate = showCoordinates && fileIndex === 0;

        result.push(
          <Square
            key={squareName}
            data-square={squareName}
            $isLight={isLight}
            $isHighlighted={isHighlighted}
            $isLastMoveSquare={!!isLastMoveSquare}
            $isSelected={isSelected}
            $isPossibleMove={isPossibleMove}
            onMouseDown={(e) => handleMouseDown(e, squareName, piece)}
          >
            {piece && !isDraggedFrom && !isAnimating && (
              <ChessPiece piece={piece} size={squareSize} />
            )}
            {showFileCoordinate && (
              <Coordinate $type="file" $isLight={isLight} $size={squareSize}>
                {flipped ? FILES[7 - fileIndex] : FILES[fileIndex]}
              </Coordinate>
            )}
            {showRankCoordinate && (
              <Coordinate $type="rank" $isLight={isLight} $size={squareSize}>
                {flipped ? RANKS[7 - rankIndex] : RANKS[rankIndex]}
              </Coordinate>
            )}
          </Square>
        );
      }
    }

    return result;
  }, [
    flipped,
    showCoordinates,
    pieces,
    highlightedSquares,
    lastMove,
    selectedSquare,
    possibleMoves,
    draggedPiece,
    squareSize,
    handleSquareClick,
    handleMouseDown
  ]);

  return (
    <>
      <BoardContainer ref={containerRef} $size={calculatedSize} onContextMenu={handleContextMenu}>
        <BoardGrid>
          {squares}
        </BoardGrid>
        {/* Render animating pieces */}
        {animatingPieces.map((anim, index) => {
          const fromPos = getSquarePosition(anim.from, calculatedSize);
          const toPos = getSquarePosition(anim.to, calculatedSize);
          const elapsed = Date.now() - anim.startTime;
          const duration = preferencesStore.preferences.animationDuration;
          const progress = Math.min(elapsed / duration, 1);
          
          // Use easeInOutCubic for smooth animation
          const easeInOutCubic = (t: number) => {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
          };
          const easedProgress = easeInOutCubic(progress);
          
          return (
            <AnimatingPieceWrapper
              key={`${anim.from}-${anim.to}-${anim.startTime}`}
              $fromX={fromPos.x}
              $fromY={fromPos.y}
              $toX={toPos.x}
              $toY={toPos.y}
              $progress={easedProgress}
              $size={squareSize}
            >
              <ChessPiece piece={anim.piece} size={squareSize} />
            </AnimatingPieceWrapper>
          );
        })}
      </BoardContainer>
      {draggedPiece && (
        <>
          <DraggingPiece $x={draggedPiece.x} $y={draggedPiece.y} $size={draggedPiece.size}>
            <ChessPiece piece={draggedPiece.piece} size={draggedPiece.size} isDragging />
          </DraggingPiece>
        </>
      )}
      {promotionState && (
        <PromotionDialog
          isOpen={true}
          color={promotionState.color}
          position={promotionState.position}
          onSelect={(piece) => {
            setUserMoveInProgress(true);
            onMove?.(promotionState.from, promotionState.to, piece);
            setPromotionState(null);
          }}
          onCancel={() => setPromotionState(null)}
        />
      )}
    </>
  );
});

ChessBoardWithPieces.displayName = 'ChessBoardWithPieces';