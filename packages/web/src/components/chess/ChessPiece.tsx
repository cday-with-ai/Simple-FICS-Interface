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

// Unicode chess pieces as fallback
const unicodePieces: Record<string, string> = {
  'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
  'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'
};

const PieceFallback = styled.div<{ $isDragging: boolean; $size: number }>`
  width: 93%;
  height: 93%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.$size * 0.8}px;
  user-select: none;
  cursor: ${props => props.$isDragging ? 'grabbing' : 'grab'};
  filter: ${props => props.$isDragging ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' : 'none'};
`;

export const ChessPiece: React.FC<ChessPieceProps> = observer(({ 
  piece, 
  size, 
  isDragging = false,
  style 
}) => {
  const preferencesStore = usePreferencesStore();
  const [imageError, setImageError] = React.useState(false);
  const pieceName = pieceNameMap[piece];
  if (!pieceName) return null;

  // Use the piece set from preferences
  const pieceSet = preferencesStore.preferences.pieceSet;
  const pieceUrl = `/pieces/${pieceSet}/${pieceName}.svg`;

  // Reset error state when piece or pieceSet changes
  React.useEffect(() => {
    setImageError(false);
  }, [piece, pieceSet]);

  if (imageError) {
    return (
      <PieceFallback
        className="chess-piece-fallback"
        $isDragging={isDragging}
        $size={size}
        style={style}
        data-settings="pieces"
      >
        {unicodePieces[piece] || piece}
      </PieceFallback>
    );
  }

  return (
    <PieceImage
      className="chess-piece"
      src={pieceUrl}
      alt={pieceName}
      $isDragging={isDragging}
      draggable={false}
      style={style}
      data-settings="pieces"
      onError={() => setImageError(true)}
    />
  );
});

ChessPiece.displayName = 'ChessPiece';