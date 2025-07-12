import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { ChessPiece } from './ChessPiece';
import { usePreferencesStore } from '@fics/shared';

interface PromotionPieceSelectorProps {
  color: 'white' | 'black';
  size?: 'small' | 'medium';
}

const Container = styled.div`
  position: relative;
  display: inline-block;
`;

const Button = styled.button<{ $size: 'small' | 'medium' }>`
  width: ${props => props.$size === 'small' ? '36px' : '44px'};
  height: ${props => props.$size === 'small' ? '36px' : '44px'};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  background-color: ${props => props.theme.colors.backgroundTertiary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ${props => props.theme.transitions.fast};
  padding: 4px;
  
  &:hover {
    background-color: ${props => props.theme.colors.backgroundTertiary};
    border-color: ${props => props.theme.colors.primary};
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const Dropdown = styled.div<{ $isOpen: boolean }>`
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: ${props => props.theme.spacing[1]};
  background-color: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing[1]};
  box-shadow: ${props => props.theme.shadows.lg};
  gap: ${props => props.theme.spacing[1]};
  z-index: 100;
`;

const PieceOption = styled.button<{ $size: 'small' | 'medium' }>`
  width: ${props => props.$size === 'small' ? '32px' : '40px'};
  height: ${props => props.$size === 'small' ? '32px' : '40px'};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.sm};
  background-color: ${props => props.theme.colors.backgroundSecondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    background-color: ${props => props.theme.colors.backgroundTertiary};
    border-color: ${props => props.theme.colors.primary};
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

export const PromotionPieceSelector: React.FC<PromotionPieceSelectorProps> = observer(({
  color,
  size = 'small'
}) => {
  const preferencesStore = usePreferencesStore();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const pieces = ['Q', 'R', 'B', 'N'] as const;
  const currentPiece = preferencesStore.preferences.autoPromotionPiece;
  
  // Convert to chess piece notation (uppercase for white, lowercase for black)
  const getPieceNotation = (piece: string) => {
    return color === 'white' ? piece : piece.toLowerCase();
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);
  
  const handleSelect = (piece: typeof pieces[number]) => {
    preferencesStore.updatePreference('autoPromotionPiece', piece);
    setIsOpen(false);
  };
  
  const pieceSize = size === 'small' ? 28 : 36;
  
  return (
    <Container ref={containerRef}>
      <Button
        $size={size}
        onClick={() => setIsOpen(!isOpen)}
        title="Select promotion piece"
      >
        <ChessPiece piece={getPieceNotation(currentPiece)} size={pieceSize} />
      </Button>
      
      <Dropdown $isOpen={isOpen}>
        {pieces.map(piece => (
          <PieceOption
            key={piece}
            $size={size}
            onClick={() => handleSelect(piece)}
            title={`Promote to ${piece === 'Q' ? 'Queen' : piece === 'R' ? 'Rook' : piece === 'B' ? 'Bishop' : 'Knight'}`}
          >
            <ChessPiece piece={getPieceNotation(piece)} size={pieceSize} />
          </PieceOption>
        ))}
      </Dropdown>
    </Container>
  );
});

PromotionPieceSelector.displayName = 'PromotionPieceSelector';