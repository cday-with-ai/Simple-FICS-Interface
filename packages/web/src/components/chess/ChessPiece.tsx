import React from 'react';
import styled from 'styled-components';

interface ChessPieceProps {
  piece: string; // e.g., 'K', 'k', 'Q', 'q', etc.
  size: number; // Size of the square
  isDragging?: boolean;
  style?: React.CSSProperties;
}

const PieceImage = styled.img<{ $isDragging: boolean }>`
  width: 93%;
  height: 93%;
  user-select: none;
  -webkit-user-drag: none;
  cursor: ${props => props.$isDragging ? 'grabbing' : 'grab'};
  filter: ${props => props.$isDragging ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' : 'none'};
  transition: filter 0.2s ease;
  
  &:hover {
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
  }
`;

const pieceNameMap: Record<string, string> = {
  'K': 'wK', 'Q': 'wQ', 'R': 'wR', 'B': 'wB', 'N': 'wN', 'P': 'wP',
  'k': 'bK', 'q': 'bQ', 'r': 'bR', 'b': 'bB', 'n': 'bN', 'p': 'bP'
};

export const ChessPiece: React.FC<ChessPieceProps> = ({ 
  piece, 
  size, 
  isDragging = false,
  style 
}) => {
  const pieceName = pieceNameMap[piece];
  if (!pieceName) return null;

  // Use the SVG pieces from the /pieces/cburnett directory
  const pieceUrl = `/pieces/cburnett/${pieceName}.svg`;

  return (
    <PieceImage
      className="chess-piece"
      src={pieceUrl}
      alt={pieceName}
      $isDragging={isDragging}
      draggable={false}
      style={style}
    />
  );
};

ChessPiece.displayName = 'ChessPiece';