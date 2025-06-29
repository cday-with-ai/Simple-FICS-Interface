import React from 'react';
import styled from 'styled-components';

const ScoreContainer = styled.div<{ size?: 'small' | 'medium' | 'large' }>`
  font-family: ${({theme}) => theme.typography.fontFamilyDigital};
  font-weight: normal;
  letter-spacing: 0.05em;
  font-variant-numeric: tabular-nums;
  color: ${({theme}) => theme.colors.text};
  
  ${({size}) => {
    switch (size) {
        case 'small':
            return `font-size: 12px;`;
        case 'large':
            return `font-size: 20px;`;
        case 'medium':
        default:
            return `font-size: 16px;`;
    }
}}
`;

const ScoreDisplay = styled.span<{ isPositive?: boolean; isNegative?: boolean }>`
  padding: ${({theme}) => theme.spacing.xs} ${({theme}) => theme.spacing.sm};
  background: ${({theme}) => theme.colors.backgroundSecondary};
  border: 1px solid ${({theme}) => theme.colors.border};
  border-radius: 4px;
  min-width: 60px;
  text-align: center;
  display: inline-block;
  
  ${({isPositive, theme}) => isPositive && `
    color: ${theme.colors.success};
    border-color: ${theme.colors.success};
  `}
  
  ${({isNegative, theme}) => isNegative && `
    color: ${theme.colors.error};
    border-color: ${theme.colors.error};
  `}
`;

interface DigitalScoreProps {
    score: number; // Centipawn evaluation or numeric score
    size?: 'small' | 'medium' | 'large';
    format?: 'centipawns' | 'decimal' | 'raw';
    showSign?: boolean;
    className?: string;
}

export const DigitalScore: React.FC<DigitalScoreProps> = ({
                                                              score,
                                                              size = 'medium',
                                                              format = 'centipawns',
                                                              showSign = true,
                                                              className,
                                                          }) => {
    const formatScore = (value: number): string => {
        switch (format) {
            case 'centipawns':
                // Convert centipawns to pawn units
                const pawnValue = value / 100;
                if (Math.abs(pawnValue) >= 10) {
                    return pawnValue.toFixed(0);
                } else {
                    return pawnValue.toFixed(1);
                }

            case 'decimal':
                return value.toFixed(2);

            case 'raw':
            default:
                return value.toString();
        }
    };

    const getDisplayValue = (): string => {
        const formattedScore = formatScore(score);

        if (showSign && score > 0) {
            return `+${formattedScore}`;
        } else if (score === 0) {
            return '0.0';
        } else {
            return formattedScore;
        }
    };

    const isPositive = score > 0;
    const isNegative = score < 0;

    return (
        <ScoreContainer size={size} className={className}>
            <ScoreDisplay isPositive={isPositive} isNegative={isNegative}>
                {getDisplayValue()}
            </ScoreDisplay>
        </ScoreContainer>
    );
};

// Evaluation bar that shows score visually
const EvaluationBarContainer = styled.div`
  width: 100%;
  height: 20px;
  background: ${({theme}) => theme.colors.backgroundSecondary};
  border: 1px solid ${({theme}) => theme.colors.border};
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
`;

const EvaluationFill = styled.div<{ percentage: number }>`
  height: 100%;
  background: ${({theme, percentage}) =>
    percentage > 50 ? theme.colors.success : theme.colors.error};
  width: ${({percentage}) => percentage}%;
  transition: ${({theme}) => `width ${theme.transitions.normal}`};
`;

const EvaluationText = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-family: ${({theme}) => theme.typography.fontFamilyDigital};
  font-size: 12px;
  color: ${({theme}) => theme.colors.text};
  text-shadow: 0 0 2px ${({theme}) => theme.colors.background};
  font-weight: bold;
`;

interface EvaluationBarProps {
    score: number; // Centipawn evaluation
    className?: string;
}

export const EvaluationBar: React.FC<EvaluationBarProps> = ({
                                                                score,
                                                                className,
                                                            }) => {
    // Convert centipawn score to percentage (0-100)
    // Clamp extreme values to reasonable range
    const clampedScore = Math.max(-500, Math.min(500, score));
    const percentage = ((clampedScore + 500) / 1000) * 100;

    const formatScore = (value: number): string => {
        const pawnValue = value / 100;
        if (value > 0) {
            return `+${pawnValue.toFixed(1)}`;
        } else if (value === 0) {
            return '0.0';
        } else {
            return pawnValue.toFixed(1);
        }
    };

    return (
        <EvaluationBarContainer className={className}>
            <EvaluationFill percentage={percentage}/>
            <EvaluationText>
                {formatScore(score)}
            </EvaluationText>
        </EvaluationBarContainer>
    );
};