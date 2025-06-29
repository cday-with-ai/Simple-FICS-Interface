import React from 'react';
import styled from 'styled-components';

const ClockContainer = styled.div<{ size?: 'small' | 'medium' | 'large' }>`
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

const TimeDisplay = styled.span<{ $isLowTime?: boolean; $isActive?: boolean }>`
    padding: ${({theme}) => theme.spacing.xs} ${({theme}) => theme.spacing.sm};
    background: ${({theme, $isActive}) =>
            $isActive ? theme.colors.backgroundTertiary : theme.colors.backgroundSecondary};
    border: 1px solid ${({theme}) => theme.colors.border};
    border-radius: 4px;

    ${({$isLowTime, theme}) => $isLowTime && `
    color: ${theme.colors.error};
    animation: blink 1s infinite;
  `} @keyframes blink {
    0%, 50% {
        opacity: 1;
    }

    51%, 100% {
        opacity: 0.3;
    }
}
`;

interface DigitalClockProps {
    time: number; // Time in seconds
    size?: 'small' | 'medium' | 'large';
    isActive?: boolean;
    lowTimeThreshold?: number; // Seconds below which to show warning
    showTenths?: boolean; // Show tenths of seconds when time is low
    className?: string;
}

export const DigitalClock: React.FC<DigitalClockProps> = ({
                                                              time,
                                                              size = 'medium',
                                                              isActive = false,
                                                              lowTimeThreshold = 30,
                                                              showTenths = false,
                                                              className,
                                                          }) => {
    const formatTime = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        const tenths = Math.floor((seconds % 1) * 10);

        if (hours > 0) {
            // Show hours:minutes:seconds
            return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        } else if (seconds < lowTimeThreshold && showTenths) {
            // Show minutes:seconds.tenths for low time
            return `${minutes}:${secs.toString().padStart(2, '0')}.${tenths}`;
        } else {
            // Show minutes:seconds
            return `${minutes}:${secs.toString().padStart(2, '0')}`;
        }
    };

    const isLowTime = time <= lowTimeThreshold && time > 0;

    return (
        <ClockContainer size={size} className={className}>
            <TimeDisplay $isLowTime={isLowTime} $isActive={isActive}>
                {formatTime(time)}
            </TimeDisplay>
        </ClockContainer>
    );
};

// Preset styled clocks for common use cases
export const GameClock = styled(DigitalClock).attrs({size: 'large'})`
    font-size: 20px;
`;

export const CompactClock = styled(DigitalClock).attrs({size: 'small'})`
    font-size: 12px;
`;

export const HeaderClock = styled(DigitalClock).attrs({size: 'medium'})`
    font-size: 16px;
`;