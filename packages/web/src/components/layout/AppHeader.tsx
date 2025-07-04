import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@fics/shared';
import type { ViewMode, ChessOrientation } from '@fics/shared';

const HeaderContainer = styled.header`
  height: 56px;
  background-color: ${props => props.theme.colors.surface};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${props => props.theme.spacing[4]};
  position: relative;
  z-index: 100;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[3]};
  flex: 1;
`;

const MenuButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.text};
  transition: background-color ${props => props.theme.transitions.fast};
  
  &:hover {
    background-color: ${props => props.theme.colors.backgroundTertiary};
  }
`;

const AppTitle = styled.h1`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
  margin: 0;
  white-space: nowrap;
`;

const ControlsSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[4]};
`;

const ToggleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
`;

const ToggleLabel = styled.span`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
  margin-right: ${props => props.theme.spacing[1]};
`;

const ToggleContainer = styled.div`
  display: flex;
  background-color: ${props => props.theme.colors.backgroundSecondary};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 2px;
  gap: 2px;
`;

const ToggleButton = styled.button<{ $isActive: boolean; $isDisabled?: boolean }>`
  padding: ${props => props.theme.spacing[1]} ${props => props.theme.spacing[2]};
  border: none;
  background-color: ${props => props.$isActive ? props.theme.colors.surface : 'transparent'};
  color: ${props => props.$isActive ? props.theme.colors.text : props.theme.colors.textSecondary};
  border-radius: ${props => props.theme.borderRadius.sm};
  cursor: ${props => props.$isDisabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$isDisabled ? 0.5 : 1};
  transition: all ${props => props.theme.transitions.fast};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.$isActive ? props.theme.typography.fontWeight.medium : 'normal'};
  white-space: nowrap;
  
  &:hover:not(:disabled) {
    background-color: ${props => props.$isActive ? props.theme.colors.surface : props.theme.colors.backgroundTertiary};
    color: ${props => props.theme.colors.text};
  }
  
  &:disabled {
    cursor: not-allowed;
  }
`;

interface AppHeaderProps {
  onMenuClick?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = observer(({ onMenuClick }) => {
  const { preferencesStore } = useRootStore();
  const { viewMode, chessOrientation } = preferencesStore.preferences;
  
  const handleViewModeChange = (mode: ViewMode) => {
    preferencesStore.updatePreference('viewMode', mode);
  };
  
  const handleOrientationChange = (orientation: ChessOrientation) => {
    preferencesStore.updatePreference('chessOrientation', orientation);
  };
  
  // Orientation toggle is disabled in chat-only mode
  const isOrientationDisabled = viewMode === 'chat-only';
  
  return (
    <HeaderContainer>
      <LogoSection>
        <MenuButton onClick={onMenuClick} aria-label="Menu">
          ☰
        </MenuButton>
        <AppTitle>Simple FICS Interface</AppTitle>
      </LogoSection>
      
      <ControlsSection>
        <ToggleGroup>
          <ToggleLabel>Orient:</ToggleLabel>
          <ToggleContainer>
            <ToggleButton
              $isActive={chessOrientation === 'landscape'}
              $isDisabled={isOrientationDisabled}
              onClick={() => !isOrientationDisabled && handleOrientationChange('landscape')}
              disabled={isOrientationDisabled}
              title="Landscape"
            >
              ▭
            </ToggleButton>
            <ToggleButton
              $isActive={chessOrientation === 'portrait'}
              $isDisabled={isOrientationDisabled}
              onClick={() => !isOrientationDisabled && handleOrientationChange('portrait')}
              disabled={isOrientationDisabled}
              title="Portrait"
            >
              ▯
            </ToggleButton>
          </ToggleContainer>
        </ToggleGroup>
        
        <ToggleGroup>
          <ToggleLabel>Mode:</ToggleLabel>
          <ToggleContainer>
            <ToggleButton
              $isActive={viewMode === 'chess-only'}
              onClick={() => handleViewModeChange('chess-only')}
              title="Chess Only"
            >
              ♔
            </ToggleButton>
            <ToggleButton
              $isActive={viewMode === 'chess-and-chat'}
              onClick={() => handleViewModeChange('chess-and-chat')}
              title="Chess & Chat"
            >
              ♔│
            </ToggleButton>
            <ToggleButton
              $isActive={viewMode === 'chat-only'}
              onClick={() => handleViewModeChange('chat-only')}
              title="Chat Only"
            >
              ▤
            </ToggleButton>
          </ToggleContainer>
        </ToggleGroup>
      </ControlsSection>
    </HeaderContainer>
  );
});

AppHeader.displayName = 'AppHeader';