import React from 'react';
import styled from 'styled-components';
import {useTheme} from '../../theme';

const ToggleButton = styled.button<{ isActive: boolean }>`
    padding: ${({theme}) => theme.spacing.xs} ${({theme}) => theme.spacing.sm};
    border: 1px solid ${({theme}) => theme.colors.border};
    border-radius: 6px;
    background: ${({theme, isActive}) =>
            isActive ? theme.colors.primary : theme.colors.surface};
    color: ${({theme, isActive}) =>
            isActive ? theme.colors.textInverse : theme.colors.text};
    font-size: ${({theme}) => theme.typography.fontSize.sm};
    cursor: pointer;
    transition: ${({theme}) => `all ${theme.transitions.fast}`};
    display: flex;
    align-items: center;
    gap: ${({theme}) => theme.spacing.xs};

    &:hover {
        background: ${({theme, isActive}) =>
                isActive ? theme.colors.primaryHover : theme.colors.surfaceHover};
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

export const ThemeToggle: React.FC = () => {
    const {themeName, setTheme, isDarkMode} = useTheme();

    const getThemeIcon = (theme: string) => {
        switch (theme) {
            case 'light':
                return '☀️';
            case 'dark':
                return '🌙';
            case 'system':
                return '🖥️';
            default:
                return '🖥️';
        }
    };

    const getThemeLabel = (theme: string) => {
        switch (theme) {
            case 'light':
                return 'Light';
            case 'dark':
                return 'Dark';
            case 'system':
                return 'System';
            default:
                return 'System';
        }
    };

    return (
        <ToggleContainer>
            <Label>Theme:</Label>

            <ToggleButton
                isActive={themeName === 'light'}
                onClick={() => setTheme('light')}
                title="Light theme"
            >
                {getThemeIcon('light')} {getThemeLabel('light')}
            </ToggleButton>

            <ToggleButton
                isActive={themeName === 'dark'}
                onClick={() => setTheme('dark')}
                title="Dark theme"
            >
                {getThemeIcon('dark')} {getThemeLabel('dark')}
            </ToggleButton>

            <ToggleButton
                isActive={themeName === 'system'}
                onClick={() => setTheme('system')}
                title="Follow system theme"
            >
                {getThemeIcon('system')} {getThemeLabel('system')}
            </ToggleButton>
        </ToggleContainer>
    );
};