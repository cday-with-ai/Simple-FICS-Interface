import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useAnalysisStore, usePreferencesStore } from '@fics/shared';
import { EvaluationBar } from './EvaluationBar';

const AnalysisSection = styled.div<{ $orientation?: 'vertical' | 'horizontal'; $boardSize?: number }>`
  display: flex;
  align-items: center;
  height: ${props => props.$boardSize ? `${props.$boardSize + (props.$boardSize / 8) * 0.25}px` : '99.5%'};
  position: relative;
  padding: ${props => props.theme.spacing[2]} 0;
  padding-top: ${props => props.theme.spacing[3]};
  box-sizing: border-box;
`;

const AnalysisInfo = styled.div<{ $boardLabelColor?: string; $boardLabelFontSize?: number }>`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  font-size: ${props => props.$boardLabelFontSize ? `${props.$boardLabelFontSize}px` : props.theme.typography.fontSize.xs};
  width: 100%;
  
  .depth {
    color: ${props => props.$boardLabelColor || props.theme.colors.textTertiary};
    font-size: ${props => props.$boardLabelFontSize ? `${props.$boardLabelFontSize}px` : props.theme.typography.fontSize.xs};
    font-weight: ${props => props.theme.typography.fontWeight.normal};
    white-space: nowrap;
    flex-shrink: 0;
  }
  
  .line {
    font-family: ${props => props.theme.typography.fontFamilyMono};
    color: ${props => props.$boardLabelColor || props.theme.colors.textTertiary};
    font-size: ${props => props.$boardLabelFontSize ? `${props.$boardLabelFontSize}px` : props.theme.typography.fontSize.xs};
    font-weight: ${props => props.theme.typography.fontWeight.normal};
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

interface AnalysisDisplayProps {
  orientation?: 'vertical' | 'horizontal';
  boardSize?: number;
}

export const AnalysisDisplay: React.FC<AnalysisDisplayProps> = observer(({ orientation = 'vertical', boardSize }) => {
  const analysisStore = useAnalysisStore();
  
  return (
    <AnalysisSection $orientation={orientation} $boardSize={boardSize}>
      <EvaluationBar
        evaluation={analysisStore.evaluation}
        percent={analysisStore.evaluationPercent}
        orientation={orientation}
      />
    </AnalysisSection>
  );
});

interface AnalysisInfoDisplayProps {
  className?: string;
}

export const AnalysisInfoDisplay: React.FC<AnalysisInfoDisplayProps> = observer(({ className }) => {
  const analysisStore = useAnalysisStore();
  const preferencesStore = usePreferencesStore();
  
  const boardLabelColor = preferencesStore.preferences.boardLabelColor;
  const boardLabelFontSize = preferencesStore.preferences.boardLabelFontSize;
  
  // Temporarily always show something for debugging
  return (
    <AnalysisInfo className={className} $boardLabelColor={boardLabelColor} $boardLabelFontSize={boardLabelFontSize}>
      <div className="depth">Depth {analysisStore.depth || 0}</div>
      <div className="line">{analysisStore.principalVariation || (analysisStore.currentLine ? analysisStore.currentLine.pv.join(' ') : null) || 'Calculating...'}</div>
    </AnalysisInfo>
  );
});

AnalysisDisplay.displayName = 'AnalysisDisplay';
AnalysisInfoDisplay.displayName = 'AnalysisInfoDisplay';