import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { usePreferencesStore } from '@fics/shared';

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

export const ChessPiece: React.FC<ChessPieceProps> = observer(({ 
  piece, 
  size, 
  isDragging = false,
  style 
}) => {
  const preferencesStore = usePreferencesStore();
  const pieceName = pieceNameMap[piece];
  if (!pieceName) return null;

  // Use the piece set from preferences
  const pieceSet = preferencesStore.preferences.pieceSet;
  const pieceUrl = `/pieces/${pieceSet}/${pieceName}.svg`;

  return (
    <PieceImage
      className="chess-piece"
      src={pieceUrl}
      alt={pieceName}
      $isDragging={isDragging}
      draggable={false}
      style={style}
      data-settings="pieces"
    />
  );
});

ChessPiece.displayName = 'ChessPiece';