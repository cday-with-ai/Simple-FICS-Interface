import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';

interface GameControlsProps {
  perspective: 'playing' | 'observing' | 'examining' | 'freestyle';
  onDraw?: () => void;
  onResign?: () => void;
  onAbort?: () => void;
  onAnalysis?: () => void;
  onUnobserve?: () => void;
  onUnexamine?: () => void;
  onSetupFEN?: () => void;
  onFlipBoard?: () => void;
  isAnalysisActive?: boolean;
  isDrawOffered?: boolean;
  canAbort?: boolean;
  className?: string;
}

const ControlsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing[2]};
  padding: ${props => props.theme.spacing[3]};
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.sm};
`;

const ControlButton = styled.button<{ $variant?: 'primary' | 'danger' | 'secondary' }>`
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[3]};
  border: none;
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  
  ${props => {
    switch (props.$variant) {
      case 'danger':
        return `
          background-color: ${props.theme.colors.error};
          color: ${props.theme.colors.textInverse};
          &:hover {
            background-color: ${props.theme.colors.error}dd;
          }
        `;
      case 'primary':
        return `
          background-color: ${props.theme.colors.secondary};
          color: ${props.theme.colors.textInverse};
          &:hover {
            background-color: ${props.theme.colors.secondaryHover};
          }
        `;
      default:
        return `
          background-color: ${props.theme.colors.backgroundTertiary};
          color: ${props.theme.colors.text};
          &:hover {
            background-color: ${props.theme.colors.border};
          }
        `;
    }
  }}
  
  &:active {
    transform: scale(0.95);
  }
`;


export const GameControls: React.FC<GameControlsProps> = observer(({
  perspective,
  onDraw,
  onResign,
  onAbort,
  onAnalysis,
  onUnobserve,
  onUnexamine,
  onSetupFEN,
  onFlipBoard,
  isAnalysisActive,
  isDrawOffered,
  canAbort,
  className
}) => {
  const renderPlayingControls = () => (
    <>
      {canAbort && (
        <ControlButton onClick={onAbort} $variant="secondary">
          Abort
        </ControlButton>
      )}
      <ControlButton onClick={onDraw} $variant="secondary">
        Draw
      </ControlButton>
      <ControlButton onClick={onResign} $variant="secondary">
        Resign
      </ControlButton>
      <ControlButton onClick={onFlipBoard} $variant="secondary">
        Flip
      </ControlButton>
    </>
  );
  
  const renderObservingControls = () => (
    <>
      <ControlButton onClick={onUnobserve} $variant="secondary">
        Unobserve
      </ControlButton>
      <ControlButton 
        onClick={onAnalysis} 
        $variant="secondary"
      >
        Analysis
      </ControlButton>
      <ControlButton onClick={onFlipBoard} $variant="secondary">
        Flip
      </ControlButton>
    </>
  );
  
  const renderExaminingControls = () => (
    <>
      <ControlButton onClick={onUnexamine} $variant="secondary">
        Unexamine
      </ControlButton>
      <ControlButton 
        onClick={onAnalysis} 
        $variant="secondary"
      >
        Analysis
      </ControlButton>
      <ControlButton onClick={onFlipBoard} $variant="secondary">
        Flip
      </ControlButton>
    </>
  );
  
  const renderFreestyleControls = () => (
    <>
      <ControlButton 
        onClick={onAnalysis} 
        $variant="secondary"
      >
        Analysis
      </ControlButton>
      <ControlButton onClick={onFlipBoard} $variant="secondary">
        Flip
      </ControlButton>
      <ControlButton onClick={onSetupFEN} $variant="secondary">
        FEN
      </ControlButton>
    </>
  );
  
  return (
    <ControlsContainer className={className}>
      {perspective === 'playing' && renderPlayingControls()}
      {perspective === 'observing' && renderObservingControls()}
      {perspective === 'examining' && renderExaminingControls()}
      {perspective === 'freestyle' && renderFreestyleControls()}
    </ControlsContainer>
  );
});

// Export a compact button style for use in other components
export const CompactControlButton = styled(ControlButton)`
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[2]};
  font-size: 11px;
`;

GameControls.displayName = 'GameControls';