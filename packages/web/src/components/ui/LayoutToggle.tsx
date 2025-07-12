import React from 'react';
import styled from 'styled-components';
import {useLayoutContext} from '../layout';

const ToggleButton = styled.button<{ $isActive: boolean }>`
    padding: ${({theme}) => theme.spacing.xs} ${({theme}) => theme.spacing.sm};
    border: 1px solid ${({theme}) => theme.colors.border};
    border-radius: 6px;
    background: ${({theme, $isActive}) =>
            $isActive ? theme.colors.secondary : theme.colors.surface};
    color: ${({theme, $isActive}) =>
            $isActive ? theme.colors.textInverse : theme.colors.text};
    font-size: ${({theme}) => theme.typography.fontSize.sm};
    cursor: pointer;
    transition: ${({theme}) => `all ${theme.transitions.fast}`};
    display: flex;
    align-items: center;
    gap: ${({theme}) => theme.spacing.xs};

    &:hover {
        background: ${({theme, $isActive}) =>
                $isActive ? theme.colors.secondaryHover : theme.colors.surfaceHover};
    }
`;

const ToggleContainer = styled.div`
    display: flex;
    gap: ${({theme}) => theme.spacing.xs};
    align-items: center;
`;

const Label = styled.span`
    font-size: ${({theme}) => theme.typography.fontSize.sm};
    color: ${({theme}) => theme.colors.textSecondary};
    margin-right: ${({theme}) => theme.spacing.xs};
`;

const StatusIndicator = styled.div`
    font-size: ${({theme}) => theme.typography.fontSize.xs};
    color: ${({theme}) => theme.colors.textTertiary};
    padding: ${({theme}) => theme.spacing.xs};
    background: ${({theme}) => theme.colors.backgroundTertiary};
    border-radius: 4px;
    border: 1px solid ${({theme}) => theme.colors.border};
`;

export const LayoutToggle: React.FC = () => {
    const {
        layoutPreference,
        setLayoutPreference,
        activeLayout,
        orientation,
        breakpoint,
        isCompactMode
    } = useLayoutContext();

    const getLayoutIcon = (layout: string) => {
        switch (layout) {
            case 'landscape':
                return '📱'; // Rotated phone
            case 'portrait':
                return '📱'; // Phone
            case 'auto':
                return '🔄';
            default:
                return '🔄';
        }
    };

    const getLayoutLabel = (layout: string) => {
        switch (layout) {
            case 'landscape':
                return 'Landscape';
            case 'portrait':
                return 'Portrait';
            case 'auto':
                return 'Auto';
            default:
                return 'Auto';
        }
    };

    return (
        <ToggleContainer>
            <Label>Layout:</Label>

            <ToggleButton
                $isActive={layoutPreference === 'auto'}
                onClick={() => setLayoutPreference('auto')}
                title="Automatic layout based on device orientation"
            >
                {getLayoutIcon('auto')} {getLayoutLabel('auto')}
            </ToggleButton>

            <ToggleButton
                $isActive={layoutPreference === 'landscape'}
                onClick={() => setLayoutPreference('landscape')}
                title="Force landscape layout"
            >
                {getLayoutIcon('landscape')} {getLayoutLabel('landscape')}
            </ToggleButton>

            <ToggleButton
                $isActive={layoutPreference === 'portrait'}
                onClick={() => setLayoutPreference('portrait')}
                title="Force portrait layout"
            >
                {getLayoutIcon('portrait')} {getLayoutLabel('portrait')}
            </ToggleButton>

            <StatusIndicator>
                Active: {activeLayout} | Device: {orientation} | {breakpoint}
                {isCompactMode && ' (compact)'}
            </StatusIndicator>
        </ToggleContainer>
    );
};