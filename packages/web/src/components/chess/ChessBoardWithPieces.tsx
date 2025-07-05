import React, { useMemo, useRef, useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
// Removed observer - this component doesn't use MobX state directly
import { useLayout } from '../../theme/hooks';
import { ChessPiece } from './ChessPiece';

interface ChessBoardWithPiecesProps {
  position: string; // FEN position string
  size?: number;
  flipped?: boolean;
  showCoordinates?: boolean;
  onMove?: (from: string, to: string) => void;
  highlightedSquares?: Set<string>;
  lastMove?: { from: string; to: string };
  interactive?: boolean;
  onSizeCalculated?: (size: number) => void;
}

const BoardContainer = styled.div<{ $size: number }>`
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  position: relative;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2);
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

const Coordinate = styled.div<{ $type: 'file' | 'rank'; $isLight: boolean }>`
  position: absolute;
  font-size: 7px;
  font-weight: 600;
  color: ${props => props.$isLight 
    ? props.theme.colors.board.dark  // Use dark square color on light squares
    : props.theme.colors.board.light  // Use light square color on dark squares
  };
  opacity: 0.8;
  user-select: none;
  line-height: 1;
  
  ${props => props.$type === 'file' ? `
    bottom: 1px;
    right: 1px;
  ` : `
    top: 1px;
    left: 1px;
  `}
`;

const DraggingPiece = styled.div<{ $x: number; $y: number; $size: number }>`
  position: fixed;
  left: 0;
  top: 0;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  pointer-events: none;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(
    calc(${props => props.$x}px - 50%), 
    calc(${props => props.$y}px - 50%)
  );
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

export const ChessBoardWithPieces: React.FC<ChessBoardWithPiecesProps> = ({
  position,
  size: providedSize,
  flipped = false,
  showCoordinates = true,
  onMove,
  highlightedSquares = new Set(),
  lastMove,
  interactive = true,
  onSizeCalculated
}) => {
  const layout = useLayout();
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

  // Parse position
  const pieces = useMemo(() => parseFEN(position), [position]);

  // Calculate optimal board size
  useEffect(() => {
    if (providedSize) {
      setCalculatedSize(providedSize);
      return;
    }

    const calculateBoardSize = () => {
      if (!containerRef.current) {
        console.log('calculateBoardSize: No container ref');
        return;
      }

      const parent = containerRef.current.parentElement;
      if (!parent) {
        console.log('calculateBoardSize: No parent element');
        return;
      }

      const { width: parentWidth, height: parentHeight } = parent.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      console.log('calculateBoardSize debug:', {
        parentSize: { width: parentWidth, height: parentHeight },
        containerSize: { width: containerRect.width, height: containerRect.height },
        currentCalculatedSize: calculatedSize,
        parentElement: parent.className || parent.tagName,
      });

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

  // Handle square click
  const handleSquareClick = useCallback((square: string) => {
    if (!interactive) return;

    const piece = pieces.get(square);

    if (selectedSquare) {
      // If clicking on a possible move, make the move
      if (possibleMoves.has(square) || square !== selectedSquare) {
        onMove?.(selectedSquare, square);
        setSelectedSquare(null);
        setPossibleMoves(new Set());
      } else {
        // Clicking the same square deselects
        setSelectedSquare(null);
        setPossibleMoves(new Set());
      }
    } else if (piece) {
      // Select the piece
      setSelectedSquare(square);
      // TODO: Calculate legal moves based on piece type and position
      // For now, just highlight some squares as an example
      setPossibleMoves(new Set());
    }
  }, [selectedSquare, possibleMoves, pieces, onMove, interactive]);

  // Handle drag start
  const handleDragStart = useCallback((e: React.MouseEvent, square: string, piece: string) => {
    if (!interactive) return;

    e.preventDefault();
    setSelectedSquare(square);
    
    // Get the square's position and ACTUAL size
    const rect = e.currentTarget.getBoundingClientRect();
    const actualSquareSize = rect.width; // Use the real square size!
    const squareCenterX = rect.left + rect.width / 2;
    const squareCenterY = rect.top + rect.height / 2;
    
    // Calculate offset from click position to square center
    const offsetX = e.clientX - squareCenterX;
    const offsetY = e.clientY - squareCenterY;
    
    // Start with piece at square center with actual size
    setDraggedPiece({ piece, from: square, x: squareCenterX, y: squareCenterY, size: actualSquareSize });

    const handleMouseMove = (moveEvent: MouseEvent) => {
      setDraggedPiece(prev => prev ? { 
        ...prev, 
        x: moveEvent.clientX - offsetX, 
        y: moveEvent.clientY - offsetY 
      } : null);
    };

    const handleMouseUp = (upEvent: MouseEvent) => {
      // Find which square the mouse is over
      const elements = document.elementsFromPoint(upEvent.clientX, upEvent.clientY);
      const squareElement = elements.find(el => el.getAttribute('data-square'));
      const targetSquare = squareElement?.getAttribute('data-square');

      if (targetSquare && targetSquare !== square) {
        onMove?.(square, targetSquare);
      }

      setDraggedPiece(null);
      setSelectedSquare(null);
      setPossibleMoves(new Set());

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [onMove, interactive]);

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
            onClick={() => handleSquareClick(squareName)}
            onMouseDown={(e) => piece && handleDragStart(e, squareName, piece)}
          >
            {piece && !isDraggedFrom && (
              <ChessPiece piece={piece} size={squareSize} />
            )}
            {showFileCoordinate && (
              <Coordinate $type="file" $isLight={isLight}>
                {flipped ? FILES[7 - fileIndex] : FILES[fileIndex]}
              </Coordinate>
            )}
            {showRankCoordinate && (
              <Coordinate $type="rank" $isLight={isLight}>
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
    handleDragStart
  ]);

  return (
    <>
      <BoardContainer ref={containerRef} $size={calculatedSize}>
        <BoardGrid>
          {squares}
        </BoardGrid>
      </BoardContainer>
      {draggedPiece && (
        <>
          <DraggingPiece $x={draggedPiece.x} $y={draggedPiece.y} $size={draggedPiece.size}>
            <ChessPiece piece={draggedPiece.piece} size={draggedPiece.size} isDragging />
          </DraggingPiece>
        </>
      )}
    </>
  );
};

ChessBoardWithPieces.displayName = 'ChessBoardWithPieces';