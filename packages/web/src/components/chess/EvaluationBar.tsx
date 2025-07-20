import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useAnalysisStore } from '@fics/shared';

interface EvaluationBarProps {
  evaluation: string;
  percent: number;
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

const BarContainer = styled.div<{ $orientation: 'vertical' | 'horizontal' }>`
  position: relative;
  background-color: #f5f5f5;
  border: 1px solid #444;
  border-radius: ${props => props.theme.borderRadius.container};
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.container};
  ${props => props.$orientation === 'vertical' ? `
    width: 18px;
    height: 100%;
  ` : `
    width: 100%;
    height: 18px;
  `}
`;

const EvaluationLabel = styled.div<{ $orientation: 'vertical' | 'horizontal' }>`
  position: absolute;
  font-weight: ${props => props.theme.typography.fontWeight.normal};
  font-size: ${props => props.theme.typography.fontSize.xs};
  color: ${props => props.theme.colors.textTertiary};
  z-index: 2;
  ${props => props.$orientation === 'vertical' ? `
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
  ` : `
    left: -45px;
    top: 50%;
    transform: translateY(-50%);
  `}
`;

const VerticalEvalText = styled.div<{ $needsDarkText: boolean }>`
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.$needsDarkText ? '#2C3E50' : '#E8E8E8'};
  z-index: 3;
  text-shadow: ${props => props.$needsDarkText 
    ? '0 1px 3px rgba(255,255,255,0.9), 0 0 1px rgba(255,255,255,0.7)' 
    : '0 1px 3px rgba(0,0,0,0.9), 0 0 1px rgba(0,0,0,0.7)'};
`;

// Container for the three sections of the bar
const BarSections = styled.div<{ $orientation: 'vertical' | 'horizontal' }>`
  display: flex;
  flex-direction: ${props => props.$orientation === 'vertical' ? 'column' : 'row'};
  height: 100%;
  width: 100%;
`;

const TransparentSection = styled.div`
  background: transparent;
  transition: all 0.3s ease;
`;

const ColoredSection = styled.div<{ $color: string }>`
  background: ${props => props.$color};
  transition: all 0.3s ease;
`;

export const EvaluationBar: React.FC<EvaluationBarProps> = observer(({
  evaluation,
  percent,
  orientation = 'vertical',
  className
}) => {
  const analysisStore = useAnalysisStore();
  const isWinning = analysisStore.isBottomPlayerWinning;
  
  // Calculate bar sections based on evaluation
  // percent is 0-100 where 50 is equal position
  let topSection, middleSection, bottomSection;
  
  if (percent === 50) {
    // Equal position - small yellow bar in middle
    topSection = 47;
    middleSection = 6;
    bottomSection = 47;
  } else if (percent > 50) {
    // Bottom player is winning (green bar grows from middle upward)
    const advantage = percent - 50; // 0-50
    topSection = 50 - advantage;
    middleSection = advantage;
    bottomSection = 50;
  } else {
    // Bottom player is losing (red bar grows from middle downward)
    const disadvantage = 50 - percent; // 0-50
    topSection = 50;
    middleSection = disadvantage;
    bottomSection = 50 - disadvantage;
  }
  
  const barColor = percent === 50 ? '#FFC107' : (isWinning ? '#2E7D32' : '#C62828');
  
  if (orientation === 'vertical') {
    // Determine if we need dark text based on bar position
    // When the bar is low (bottom player losing), we need dark text on light background
    // When the bar is high (bottom player winning), we need light text on colored background
    const needsDarkText = percent < 20;
    
    return (
      <BarContainer $orientation={orientation} className={className}>
        <EvaluationLabel $orientation={orientation}>{evaluation}</EvaluationLabel>
        <VerticalEvalText $needsDarkText={needsDarkText}>{evaluation}</VerticalEvalText>
        <BarSections $orientation={orientation}>
          <TransparentSection style={{ height: `${topSection}%` }} />
          <ColoredSection $color={barColor} style={{ height: `${middleSection}%` }} />
          <TransparentSection style={{ height: `${bottomSection}%` }} />
        </BarSections>
      </BarContainer>
    );
  } else {
    // Horizontal orientation
    return (
      <BarContainer $orientation={orientation} className={className}>
        <EvaluationLabel $orientation={orientation}>{evaluation}</EvaluationLabel>
        <BarSections $orientation={orientation}>
          <TransparentSection style={{ width: `${bottomSection}%` }} />
          <ColoredSection $color={barColor} style={{ width: `${middleSection}%` }} />
          <TransparentSection style={{ width: `${topSection}%` }} />
        </BarSections>
      </BarContainer>
    );
  }
});

EvaluationBar.displayName = 'EvaluationBar';