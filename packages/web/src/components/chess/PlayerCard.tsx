import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { GameClock } from '../ui/DigitalClock';

interface PlayerCardProps {
  name: string;
  rating: number;
  time: number; // in seconds
  isActive: boolean;
  isWhite: boolean;
  orientation?: 'horizontal' | 'vertical';
  hideClockInCard?: boolean;
  onlyInfo?: boolean;
  compact?: boolean;
}

const CardContainer = styled.div<{ $isActive: boolean; $orientation: 'horizontal' | 'vertical'; $compact?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${props => props.$compact ? '2px' : props.theme.spacing[1]};
  padding: ${props => props.$compact ? '4px 8px' : props.theme.spacing[2]};
  background-color: ${props => props.$isActive 
    ? props.theme.colors.surface 
    : props.theme.colors.backgroundTertiary
  };
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.$isActive 
    ? props.theme.shadows.md 
    : props.theme.shadows.sm
  };
  border: 2px solid ${props => props.$isActive 
    ? props.theme.colors.primary 
    : 'transparent'
  };
  transition: all ${props => props.theme.transitions.fast};
  width: 100%;
  position: relative;
  
  ${props => props.$isActive && `
    &::before {
      content: '▶';
      position: absolute;
      left: -20px;
      top: 50%;
      transform: translateY(-50%);
      color: ${props.theme.colors.primary};
      font-size: 12px;
    }
  `}
`;

const PlayerInfo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const NameWithRating = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

const PlayerName = styled.div`
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
`;

const PlayerRating = styled.div`
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => props.theme.colors.textSecondary};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  margin-left: 4px;
`;

const PieceIndicator = styled.div<{ $isWhite: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${props => props.$isWhite ? '#ffffff' : '#000000'};
  border: 1px solid ${props => props.$isWhite ? '#000000' : '#ffffff'};
  box-shadow: ${props => props.theme.shadows.sm};
`;

export const PlayerCard: React.FC<PlayerCardProps> = observer(({
  name,
  rating,
  time,
  isActive,
  isWhite,
  orientation = 'horizontal',
  hideClockInCard = false,
  onlyInfo = false,
  compact = false
}) => {
  const content = (
    <>
      <PlayerInfo>
        <NameWithRating>
          <PlayerName>{name}</PlayerName>
          <PlayerRating>{rating}</PlayerRating>
        </NameWithRating>
      </PlayerInfo>
      
      {!hideClockInCard && !onlyInfo && (
        <GameClock 
          time={time} 
          isActive={isActive}
          showTenths={time < 10}
          lowTimeThreshold={30}
          size={orientation === 'horizontal' ? 'medium' : 'small'}
        />
      )}
    </>
  );
  
  if (onlyInfo) {
    return content;
  }
  
  return (
    <CardContainer $isActive={isActive} $orientation={orientation} $compact={compact}>
      {content}
    </CardContainer>
  );
});

PlayerCard.displayName = 'PlayerCard';

// Export the GameClock component for external use
export { GameClock };