import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useAnalysisStore } from '@fics/shared';
import { EvaluationBar } from './EvaluationBar';

const AnalysisSection = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
`;

const AnalysisInfo = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[2]};
  font-size: ${props => props.theme.typography.fontSize.sm};
  box-shadow: ${props => props.theme.shadows.sm};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  margin-left: ${props => props.theme.spacing[2]};
  min-width: 200px;
  
  .depth {
    color: ${props => props.theme.colors.textSecondary};
    font-size: ${props => props.theme.typography.fontSize.xs};
    white-space: nowrap;
    flex-shrink: 0;
  }
  
  .line {
    font-family: ${props => props.theme.typography.fontFamilyMono};
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.typography.fontSize.xs};
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

interface AnalysisDisplayProps {
  orientation?: 'vertical' | 'horizontal';
}

export const AnalysisDisplay: React.FC<AnalysisDisplayProps> = observer(({ orientation = 'vertical' }) => {
  const analysisStore = useAnalysisStore();
  
  return (
    <AnalysisSection>
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
  
  if (!analysisStore.currentLine) return null;
  
  return (
    <AnalysisInfo className={className}>
      <div className="depth">Depth {analysisStore.depth}</div>
      <div className="line">{analysisStore.principalVariation || 'Calculating...'}</div>
    </AnalysisInfo>
  );
});

AnalysisDisplay.displayName = 'AnalysisDisplay';
AnalysisInfoDisplay.displayName = 'AnalysisInfoDisplay';