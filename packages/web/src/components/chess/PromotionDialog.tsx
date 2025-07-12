import React from 'react';
import styled from 'styled-components';
import { ChessPiece } from './ChessPiece';

interface PromotionDialogProps {
  isOpen: boolean;
  color: 'white' | 'black';
  onSelect: (piece: string) => void;
  onCancel: () => void;
  position: { x: number; y: number } | null;
}

const Overlay = styled.div<{ $isOpen: boolean }>`
  display: ${props => props.$isOpen ? 'block' : 'none'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
`;

const Dialog = styled.div<{ $x: number; $y: number }>`
  position: absolute;
  left: ${props => props.$x}px;
  top: ${props => props.$y}px;
  transform: translate(-50%, -50%);
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing[3]};
  box-shadow: ${props => props.theme.shadows.xl};
  display: flex;
  gap: ${props => props.theme.spacing[2]};
`;

const PieceOption = styled.button`
  width: 60px;
  height: 60px;
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.theme.colors.backgroundSecondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    background-color: ${props => props.theme.colors.backgroundTertiary};
    border-color: ${props => props.theme.colors.primary};
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

export const PromotionDialog: React.FC<PromotionDialogProps> = ({
  isOpen,
  color,
  onSelect,
  onCancel,
  position
}) => {
  if (!position) return null;
  
  const pieces = ['Q', 'R', 'B', 'N'];
  // Convert to chess piece notation (uppercase for white, lowercase for black)
  const getPieceNotation = (piece: string) => {
    return color === 'white' ? piece : piece.toLowerCase();
  };
  
  return (
    <Overlay $isOpen={isOpen} onClick={onCancel}>
      <Dialog 
        $x={position.x} 
        $y={position.y}
        onClick={(e) => e.stopPropagation()}
      >
        {pieces.map(piece => (
          <PieceOption
            key={piece}
            onClick={() => onSelect(piece.toLowerCase())}
          >
            <ChessPiece piece={getPieceNotation(piece)} size={50} />
          </PieceOption>
        ))}
      </Dialog>
    </Overlay>
  );
};

PromotionDialog.displayName = 'PromotionDialog';