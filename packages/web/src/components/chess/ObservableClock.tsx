import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { GameClock } from './PlayerCard';
import { Player, useGameStore } from '@fics/shared';

// Import the styled components from ChessGameLayout
const PortraitClock = styled(GameClock)`
    height: 100%;
    flex-shrink: 0;

    > div {
        height: 100%;
        display: flex;
        align-items: center;
    }

    span {
        display: flex;
        align-items: center;
        height: 100%;
        padding-top: 0;
        padding-bottom: 0;
    }
`;

const LandscapeClock = styled(GameClock)`
    margin-left: ${props => props.theme.spacing[3]};
    width: fit-content;
`;

interface ObservableClockProps {
    player: Player;
    isActive: boolean;
    size?: 'small' | 'medium' | 'large';
    compact?: boolean;
    variant?: 'portrait' | 'landscape';
}

// This component observes only the player.time property
// It will re-render when time changes, but won't cause parent re-renders
export const ObservableClock: React.FC<ObservableClockProps> = observer(({
    player,
    isActive,
    size = 'small',
    compact = true,
    variant = 'portrait'
}) => {
    const gameStore = useGameStore();
    const ClockComponent = variant === 'landscape' ? LandscapeClock : PortraitClock;
    
    return (
        <ClockComponent
            time={player.time}
            isActive={isActive}
            isFinished={gameStore.isGameOver}
            showTenths={player.time < 10}
            lowTimeThreshold={30}
            size={size}
            compact={compact}
            data-settings="clock"
            className="chess-clock"
        />
    );
});

ObservableClock.displayName = 'ObservableClock';