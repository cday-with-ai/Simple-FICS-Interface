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

const TimeDisplay = styled.span<{ $isLowTime?: boolean; $isActive?: boolean; $compact?: boolean }>`
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
    lowTimeThreshold?: number; // Seconds below which to show warning
    showTenths?: boolean; // Show tenths of seconds when time is low
    className?: string;
    compact?: boolean;
}

export const DigitalClock: React.FC<DigitalClockProps> = ({
                                                              time,
                                                              size = 'medium',
                                                              isActive = false,
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
            <TimeDisplay $isLowTime={isLowTime} $isActive={isActive} $compact={compact}>
                {formatTime(time)}
            </TimeDisplay>
        </ClockContainer>
    );
};

// Preset styled clocks for common use cases
export const GameClock = styled(DigitalClock).attrs({size: 'large'})`
    ${TimeDisplay} {
        text-align: center;
        box-shadow: ${({theme}) => theme.shadows.container};
        border-radius: ${({theme}) => theme.borderRadius.container};
        background: ${({theme}) => theme.colors.surface};
        font-size: 20px;
        
        &:hover {
            box-shadow: ${({theme}) => theme.shadows.container};
        }
    }
`;

export const CompactClock = styled(DigitalClock).attrs({size: 'small'})`
    font-size: 12px;
`;

export const HeaderClock = styled(DigitalClock).attrs({size: 'medium'})`
    font-size: 16px;
`;