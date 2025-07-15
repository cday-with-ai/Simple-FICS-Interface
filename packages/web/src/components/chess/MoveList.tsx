import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { Move } from '@fics/shared';
import { convertToUnicodeChessPieces } from '@fics/shared';

interface MoveListProps {
  moves: Move[];
  currentMoveIndex?: number;
  onMoveClick?: (index: number) => void;
  onNavigate?: (direction: 'prev' | 'next' | 'first' | 'last') => void;
  showHeader?: boolean;
  extraControls?: React.ReactNode;
  className?: string;
  disableAutoScroll?: boolean;
}

const MoveListContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.container};
  box-shadow: ${props => props.theme.shadows.container};
  overflow: hidden;
`;

const MoveListHeader = styled.div`
  padding: ${props => props.theme.spacing[1]};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing[2]};
`;

const NavigationControls = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing[1]};
  justify-content: center;
`;

const NavButton = styled.button`
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.textInverse};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  font-size: 10px;
  
  &:hover {
    background-color: ${props => props.theme.colors.primaryHover};
  }
  
  &:active {
    transform: scale(0.9);
  }
`;

const MoveListContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${props => props.theme.spacing[1]};
`;

const MoveRow = styled.div`
  display: flex;
  align-items: center;
  padding: 2px ${props => props.theme.spacing[1]};
  font-family: ${props => props.theme.typography.fontFamilyMono};
  font-size: ${props => props.theme.typography.fontSize.xs};
`;

const MoveNumber = styled.span`
  color: ${props => props.theme.colors.textSecondary};
  min-width: 30px;
  margin-right: ${props => props.theme.spacing[1]};
`;

const MoveText = styled.span<{ $isCurrentMove: boolean }>`
  flex: 1;
  padding: 2px ${props => props.theme.spacing[1]};
  border-radius: ${props => props.theme.borderRadius.sm};
  cursor: pointer;
  transition: background-color ${props => props.theme.transitions.fast};
  background-color: ${props => props.$isCurrentMove 
    ? props.theme.colors.primary 
    : 'transparent'
  };
  color: ${props => props.$isCurrentMove 
    ? props.theme.colors.textInverse 
    : props.theme.colors.text
  };
  
  &:hover {
    background-color: ${props => props.$isCurrentMove 
      ? props.theme.colors.primaryHover 
      : props.theme.colors.backgroundTertiary
    };
  }
`;

export const MoveList: React.FC<MoveListProps> = observer(({
  moves,
  currentMoveIndex,
  onMoveClick,
  onNavigate,
  showHeader = true,
  extraControls,
  className,
  disableAutoScroll = false
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to current move
  useEffect(() => {
    if (!disableAutoScroll && contentRef.current && currentMoveIndex !== undefined) {
      const currentElement = contentRef.current.querySelector(`[data-move-index="${currentMoveIndex}"]`);
      if (currentElement) {
        currentElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [currentMoveIndex, disableAutoScroll]);
  
  const renderMoves = () => {
    const rows = [];
    for (let i = 0; i < moves.length; i += 2) {
      const moveNumber = Math.floor(i / 2) + 1;
      const whiteMove = moves[i];
      const blackMove = moves[i + 1];
      
      rows.push(
        <MoveRow key={i}>
          <MoveNumber>{moveNumber}.</MoveNumber>
          <MoveText
            $isCurrentMove={currentMoveIndex === i}
            onClick={() => onMoveClick?.(i)}
            data-move-index={i}
          >
            {convertToUnicodeChessPieces(whiteMove.san)}
          </MoveText>
          {blackMove && (
            <MoveText
              $isCurrentMove={currentMoveIndex === i + 1}
              onClick={() => onMoveClick?.(i + 1)}
              data-move-index={i + 1}
            >
              {convertToUnicodeChessPieces(blackMove.san)}
            </MoveText>
          )}
        </MoveRow>
      );
    }
    return rows;
  };
  
  return (
    <MoveListContainer className={className}>
      {showHeader ? (
        <MoveListHeader>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Moves</span>
              <NavigationControls>
                <NavButton onClick={() => onNavigate?.('first')} title="First move">⏮</NavButton>
                <NavButton onClick={() => onNavigate?.('prev')} title="Previous move">◀</NavButton>
                <NavButton onClick={() => onNavigate?.('next')} title="Next move">▶</NavButton>
                <NavButton onClick={() => onNavigate?.('last')} title="Last move">⏭</NavButton>
              </NavigationControls>
            </div>
          </div>
        </MoveListHeader>
      ) : extraControls ? (
        <MoveListHeader>
          {extraControls}
          <NavigationControls>
            <NavButton onClick={() => onNavigate?.('first')} title="First move">⏮</NavButton>
            <NavButton onClick={() => onNavigate?.('prev')} title="Previous move">◀</NavButton>
            <NavButton onClick={() => onNavigate?.('next')} title="Next move">▶</NavButton>
            <NavButton onClick={() => onNavigate?.('last')} title="Last move">⏭</NavButton>
          </NavigationControls>
        </MoveListHeader>
      ) : (
        <MoveListHeader>
          <NavigationControls>
            <NavButton onClick={() => onNavigate?.('first')} title="First move">⏮</NavButton>
            <NavButton onClick={() => onNavigate?.('prev')} title="Previous move">◀</NavButton>
            <NavButton onClick={() => onNavigate?.('next')} title="Next move">▶</NavButton>
            <NavButton onClick={() => onNavigate?.('last')} title="Last move">⏭</NavButton>
          </NavigationControls>
        </MoveListHeader>
      )}
      <MoveListContent ref={contentRef}>
        {moves.length === 0 ? (
          <MoveRow>
            <span style={{ color: 'var(--color-textSecondary)' }}>
              No moves yet
            </span>
          </MoveRow>
        ) : (
          renderMoves()
        )}
      </MoveListContent>
    </MoveListContainer>
  );
});

MoveList.displayName = 'MoveList';