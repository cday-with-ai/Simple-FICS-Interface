import React, { useMemo } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useRootStore, PieceType } from '@fics/shared';
import { ChessPiece } from './ChessPiece';

interface CapturedPiecesProps {
  orientation?: 'horizontal' | 'vertical';
  isWhitePieces?: boolean;
  className?: string;
  boardSize?: number;
}

const CapturedContainer = styled.div<{ $orientation: 'horizontal' | 'vertical'; $size?: number }>`
  display: flex;
  flex-direction: ${props => props.$orientation === 'horizontal' ? 'row' : 'column'};
  gap: ${props => props.$orientation === 'horizontal' ? props.theme.spacing[1] : 0};
  align-items: center;
  ${props => props.$orientation === 'vertical' && props.$size && `
    width: ${props.$size + 4}px;
  `}
`;

const PieceGroup = styled.div<{ $orientation: 'horizontal' | 'vertical' }>`
  display: ${props => props.$orientation === 'horizontal' ? 'grid' : 'flex'};
  ${props => props.$orientation === 'horizontal' ? `
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 4px;
  ` : `
    flex-direction: column;
    gap: 0;
  `}
  align-items: center;
`;

const InvisibleSquare = styled.div<{ $size: number }>`
  position: relative;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.theme.colors.board.hoverLight}20;
    border-radius: 4px;
  }
`;

const PieceCount = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  background: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 50%;
  width: 14px;
  height: 14px;
  font-size: 9px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const StyledChessPiece = styled(ChessPiece)`
  width: 100%;
  height: 100%;
`;

// Remove local PieceType since we import it from shared

export const CapturedPieces: React.FC<CapturedPiecesProps> = observer(({ 
  orientation = 'horizontal',
  isWhitePieces = true,
  className,
  boardSize 
}) => {
  const { gameStore } = useRootStore();
  
  // Get captured pieces from game store
  const capturedPieces = gameStore.capturedPieces;
  const pieces = isWhitePieces ? capturedPieces.white : capturedPieces.black;
  console.log(`CapturedPieces component - isWhitePieces: ${isWhitePieces}, pieces:`, pieces);
  
  // Group pieces by type and count them
  const groupedPieces = useMemo(() => {
    const groups: Record<string, number> = {};
    pieces.forEach(piece => {
      groups[piece] = (groups[piece] || 0) + 1;
    });
    return groups;
  }, [pieces]);
  
  // Use the string values that match what ChessAPI returns
  const pieceOrder = ['p', 'n', 'b', 'r', 'q'];
  
  // Calculate piece size - use exact same calculation as board squares
  const squareSize = boardSize ? boardSize / 8 : 32;
  
  // Always render all squares to prevent layout shifts
  return (
    <CapturedContainer $orientation={orientation} $size={squareSize} className={className}>
      <PieceGroup $orientation={orientation}>
        {pieceOrder.map(pieceType => {
          const count = groupedPieces[pieceType] || 0;
          
          // PieceType enum already contains the FEN notation
          const pieceChar = isWhitePieces
            ? pieceType.toUpperCase()
            : pieceType;
          
          return (
            <InvisibleSquare key={pieceType} $size={squareSize}>
              {count > 0 && (
                <>
                  <StyledChessPiece piece={pieceChar} size={squareSize} />
                  {count > 1 && <PieceCount>{count}</PieceCount>}
                </>
              )}
            </InvisibleSquare>
          );
        })}
      </PieceGroup>
    </CapturedContainer>
  );
});

CapturedPieces.displayName = 'CapturedPieces';