import React, { useMemo, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useLayout } from '../../theme/hooks';

interface ChessBoardProps {
  size?: number;
  flipped?: boolean;
  showCoordinates?: boolean;
  onSquareClick?: (square: string) => void;
  highlightedSquares?: Set<string>;
  lastMove?: { from: string; to: string };
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
}>`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  background-color: ${props => {
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
`;

const Coordinate = styled.div<{ $type: 'file' | 'rank'; $isLight: boolean }>`
  position: absolute;
  font-size: 5px;
  font-weight: 600;
  color: ${props => props.$isLight 
    ? props.theme.colors.board.dark  // Use dark square color on light squares
    : props.theme.colors.board.light  // Use light square color on dark squares
  };
  opacity: 0.8;
  user-select: none;
  
  ${props => props.$type === 'file' ? `
    bottom: 1px;
    right: 1px;
  ` : `
    top: 1px;
    left: 1px;
  `}
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

export const ChessBoard: React.FC<ChessBoardProps> = observer(({
  size: providedSize,
  flipped = false,
  showCoordinates = true,
  onSquareClick,
  highlightedSquares = new Set(),
  lastMove
}) => {
  const layout = useLayout();
  const containerRef = useRef<HTMLDivElement>(null);
  const [calculatedSize, setCalculatedSize] = useState(providedSize || 400);

  // Calculate optimal board size based on available space
  useEffect(() => {
    if (providedSize) {
      setCalculatedSize(providedSize);
      return;
    }

    const calculateBoardSize = () => {
      if (!containerRef.current) return;

      const parent = containerRef.current.parentElement;
      if (!parent) return;

      const { width: parentWidth, height: parentHeight } = parent.getBoundingClientRect();
      
      // Account for padding and margins
      const padding = 40;
      const maxWidth = parentWidth - padding;
      const maxHeight = parentHeight - padding;
      
      // Board must be square, so use the smaller dimension
      const optimalSize = Math.floor(Math.min(maxWidth, maxHeight));
      
      // Ensure size is divisible by 8 for pixel-perfect squares
      const size = Math.floor(optimalSize / 8) * 8;
      
      // Only update if size actually changed
      setCalculatedSize(prevSize => {
        if (Math.abs(prevSize - size) > 8) {
          return size;
        }
        return prevSize;
      });
    };

    // Initial calculation
    calculateBoardSize();
    
    // Use debounced resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(calculateBoardSize, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [providedSize]);

  const squares = useMemo(() => {
    const result = [];
    
    for (let rankIndex = 0; rankIndex < 8; rankIndex++) {
      for (let fileIndex = 0; fileIndex < 8; fileIndex++) {
        const isLight = getSquareColor(fileIndex, rankIndex);
        const squareName = getSquareName(fileIndex, rankIndex, flipped);
        const isHighlighted = highlightedSquares.has(squareName);
        const isLastMoveSquare = lastMove && 
          (lastMove.from === squareName || lastMove.to === squareName);
        
        const showFileCoordinate = showCoordinates && rankIndex === 7;
        const showRankCoordinate = showCoordinates && fileIndex === 0;
        
        result.push(
          <Square
            key={squareName}
            $isLight={isLight}
            $isHighlighted={isHighlighted}
            $isLastMoveSquare={!!isLastMoveSquare}
            onClick={() => onSquareClick?.(squareName)}
          >
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
  }, [flipped, showCoordinates, highlightedSquares, lastMove, onSquareClick]);

  return (
    <BoardContainer ref={containerRef} $size={calculatedSize}>
      <BoardGrid>
        {squares}
      </BoardGrid>
    </BoardContainer>
  );
});

ChessBoard.displayName = 'ChessBoard';