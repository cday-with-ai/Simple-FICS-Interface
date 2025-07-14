import React from 'react';
import styled from 'styled-components';

const ClockContainer = styled.div<{ size?: 'small' | 'medium' | 'large' }>`
    display: inline-block;
    font-family: ${({theme}) => theme.typography.fontFamilyDigital};
    font-weight: normal;
    letter-spacing: 0.1em;
    font-variant-numeric: tabular-nums;
    color: ${({theme}) => theme.colors.text};

    ${({size}) => {
        switch (size) {
            case 'small':
                return `font-size: 14px;`;
            case 'large':
                return `font-size: 24px;`;
            case 'medium':
            default:
                return `font-size: 18px;`;
        }
    }}
`;

const TimeDisplay = styled.span<{ $isLowTime?: boolean; $isActive?: boolean; $compact?: boolean; $isFinished?: boolean }>`
    display: inline-block;
    padding: ${({theme, $compact}) => 
            $compact ? `4px ${theme.spacing[2]}` : `${theme.spacing[1]} ${theme.spacing[2]}`};
    background: ${({theme}) => theme.colors.backgroundSecondary};
    color: ${({theme, $isLowTime}) =>
            $isLowTime ? theme.colors.error : theme.colors.text};
    border-radius: ${({theme}) => theme.borderRadius.md};
    box-shadow: ${({theme}) => theme.shadows.sm};
    border: 2px solid transparent;
    transition: all ${({theme}) => theme.transitions.fast};

    ${({$isLowTime, theme}) => $isLowTime && `
    color: ${theme.colors.error};
    font-weight: bold;
  `}
`;

interface DigitalClockProps {
    time: number; // Time in seconds
    size?: 'small' | 'medium' | 'large';
    isActive?: boolean;
    isFinished?: boolean;
    lowTimeThreshold?: number; // Seconds below which to show warning
    showTenths?: boolean; // Show tenths of seconds when time is low
    className?: string;
    compact?: boolean;
}

export const DigitalClock: React.FC<DigitalClockProps> = ({
                                                              time,
                                                              size = 'medium',
                                                              isActive = false,
                                                              isFinished = false,
                                                              lowTimeThreshold = 30,
                                                              showTenths = false,
                                                              className,
                                                              compact = false,
                                                          }) => {
    const formatTime = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        const tenths = Math.floor((seconds % 1) * 10);
        
        // When active, blink the colon every second
        const colon = isActive && Math.floor(seconds) % 2 === 0 ? ' ' : ':';

        if (hours > 0) {
            // Show hours:minutes:seconds
            return `${hours}${colon}${minutes.toString().padStart(2, '0')}${colon}${secs.toString().padStart(2, '0')}`;
        } else if (seconds < lowTimeThreshold && showTenths) {
            // Show minutes:seconds.tenths for low time
            return `${minutes}${colon}${secs.toString().padStart(2, '0')}.${tenths}`;
        } else {
            // Show minutes:seconds
            return `${minutes}${colon}${secs.toString().padStart(2, '0')}`;
        }
    };

    const isLowTime = time <= lowTimeThreshold && time > 0;

    return (
        <ClockContainer size={size} className={className}>
            <TimeDisplay $isLowTime={isLowTime} $isActive={isActive} $compact={compact} $isFinished={isFinished}>
                {formatTime(time)}
            </TimeDisplay>
        </ClockContainer>
    );
};

// Alpha-style clock display
const AlphaTimeDisplay = styled.span<{ $isLowTime?: boolean; $isActive?: boolean; $isFinished?: boolean; $size?: string }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    box-shadow: ${({theme}) => theme.shadows.container};
    border-radius: 10px;
    font-size: ${props => props.$size || '20px'};
    font-family: ${props => props.theme.typography.fontFamilyDigital};
    min-width: 70px;
    border: 3px solid;
    transition: all 0.3s ease;
    line-height: 0.9;
    padding: 0.05em 0;
    
    /* Active state - light blue background, dark teal text */
    ${props => props.$isActive && `
        background-color: ${props.theme.colors.background === '#ffffff' ? '#e0f7fa' : '#1a4d5c'};
        color: ${props.theme.colors.background === '#ffffff' ? '#006064' : '#a3e9ec'};
        border-color: ${props.theme.colors.background === '#ffffff' ? '#006064' : '#2d7a84'};
    `}
    
    /* Inactive state - gray background and text */
    ${props => !props.$isActive && !props.$isFinished && `
        background-color: ${props.theme.colors.backgroundTertiary};
        color: ${props.theme.colors.textSecondary};
        border-color: ${props.theme.colors.border};
    `}
    
    /* Finished state - similar to inactive but with reduced opacity */
    ${props => props.$isFinished && `
        background-color: ${props.theme.colors.backgroundTertiary};
        color: ${props.theme.colors.textSecondary};
        border-color: ${props.theme.colors.border};
        opacity: 0.8;
    `}
    
    /* Low time warning - override colors and animate */
    ${props => props.$isLowTime && `
        color: ${props.theme.colors.error} !important;
        border-color: ${props.theme.colors.error} !important;
        font-weight: bold;
        animation: pulse 1s infinite;
    `}
    
    @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.7; }
        100% { opacity: 1; }
    }
`;

// Alpha Clock Component
export const AlphaClock: React.FC<DigitalClockProps> = ({
    time,
    size = 'large',
    isActive = false,
    isFinished = false,
    lowTimeThreshold = 30,
    showTenths = false,
    className,
}) => {
    const formatTime = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        const tenths = Math.floor((seconds % 1) * 10);
        
        // When active, blink the colon every second
        const colon = isActive && Math.floor(seconds) % 2 === 0 ? ' ' : ':';

        if (hours > 0) {
            // Show hours:minutes:seconds
            return `${hours}${colon}${minutes.toString().padStart(2, '0')}${colon}${secs.toString().padStart(2, '0')}`;
        } else if (seconds < lowTimeThreshold && showTenths) {
            // Show minutes:seconds.tenths for low time
            return `${minutes}${colon}${secs.toString().padStart(2, '0')}.${tenths}`;
        } else {
            // Show minutes:seconds
            return `${minutes}${colon}${secs.toString().padStart(2, '0')}`;
        }
    };

    const isLowTime = time <= lowTimeThreshold && time > 0;
    
    // Map size prop to font size
    const fontSize = size === 'large' ? '48px' : size === 'medium' ? '36px' : '24px';

    return (
        <AlphaTimeDisplay className={className} $isLowTime={isLowTime} $isActive={isActive} $isFinished={isFinished} $size={fontSize}>
            {formatTime(time)}
        </AlphaTimeDisplay>
    );
};

// Game Clock using the Alpha style
export const GameClock = styled(AlphaClock)`
    /* Additional GameClock-specific styles if needed */
`;

export const CompactClock = styled(DigitalClock).attrs({size: 'small'})`
    font-size: 12px;
`;

export const HeaderClock = styled(DigitalClock).attrs({size: 'medium'})`
    font-size: 16px;
`;