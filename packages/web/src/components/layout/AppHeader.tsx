import React, { useState } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@fics/shared';
import type { ViewMode, ChessOrientation } from '@fics/shared';
import { useTheme } from '../../theme';
import { useAvailableViewModes, useAvailableOrientations } from '../../theme/hooks';
import { SettingsDialog } from '../settings';

const HeaderContainer = styled.header`
  height: 44px;
  background-color: ${props => props.theme.colors.surface};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${props => props.theme.spacing[2]};
  position: relative;
  z-index: 100;
  
  @media (min-width: 640px) {
    height: 48px;
    padding: 0 ${props => props.theme.spacing[3]};
  }
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[3]};
  flex: 1;
`;

const MenuButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: ${props => props.theme.borderRadius.md};
  color: ${props => props.theme.colors.text};
  transition: background-color ${props => props.theme.transitions.fast};
  font-size: ${props => props.theme.typography.fontSize.lg};
  
  &:hover {
    background-color: ${props => props.theme.colors.backgroundTertiary};
  }
  
  @media (min-width: 640px) {
    width: 36px;
    height: 36px;
  }
`;

const DropdownMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: ${props => props.theme.spacing[2]};
  margin-top: ${props => props.theme.spacing[1]};
  background-color: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.lg};
  min-width: 200px;
  z-index: 1000;
  transform: ${props => props.$isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: all ${props => props.theme.transitions.fast};
  
  @media (min-width: 640px) {
    left: ${props => props.theme.spacing[4]};
  }
`;

const MenuItem = styled.button<{ $hasSubmenu?: boolean }>`
  width: 100%;
  padding: ${props => props.theme.spacing[3]} ${props => props.theme.spacing[4]};
  border: none;
  background: none;
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.sm};
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing[3]};
  transition: background-color ${props => props.theme.transitions.fast};
  position: relative;
  
  &:hover {
    background-color: ${props => props.theme.colors.backgroundSecondary};
  }
  
  &:first-child {
    border-radius: ${props => props.theme.borderRadius.md} ${props => props.theme.borderRadius.md} 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 ${props => props.theme.borderRadius.md} ${props => props.theme.borderRadius.md};
  }
`;

const MenuItemContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[3]};
`;

const SubmenuIndicator = styled.span`
  color: ${props => props.theme.colors.textTertiary};
  font-size: ${props => props.theme.typography.fontSize.xs};
`;

const Submenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  left: 100%;
  top: 0;
  margin-left: ${props => props.theme.spacing[1]};
  background-color: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.lg};
  min-width: 150px;
  z-index: 1001;
  transform: ${props => props.$isOpen ? 'translateX(0)' : 'translateX(-10px)'};
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: all ${props => props.theme.transitions.fast};
`;

const SubmenuItem = styled.button<{ $isActive?: boolean }>`
  width: 100%;
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[3]};
  border: none;
  background: ${props => props.$isActive ? props.theme.colors.primary : 'none'};
  color: ${props => props.$isActive ? 'white' : props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.sm};
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  transition: background-color ${props => props.theme.transitions.fast};
  
  &:hover {
    background-color: ${props => props.$isActive ? props.theme.colors.primary : props.theme.colors.backgroundSecondary};
  }
  
  &:first-child {
    border-radius: ${props => props.theme.borderRadius.md} ${props => props.theme.borderRadius.md} 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 ${props => props.theme.borderRadius.md} ${props => props.theme.borderRadius.md};
  }
`;

const MenuDivider = styled.hr`
  margin: ${props => props.theme.spacing[1]} 0;
  border: none;
  border-top: 1px solid ${props => props.theme.colors.border};
`;


const AppTitle = styled.h1`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin: 0;
  display: none;
  
  @media (min-width: 768px) {
    display: block;
  }
`;


const ControlsSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing[2]};
  
  @media (min-width: 640px) {
    gap: ${props => props.theme.spacing[4]};
  }
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
  display: none;
  
  @media (min-width: 480px) {
    display: inline;
  }
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
  font-size: ${props => props.theme.typography.fontSize.xs};
  font-weight: ${props => props.$isActive ? props.theme.typography.fontWeight.medium : 'normal'};
  white-space: nowrap;
  height: 28px;
  
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
  const { themePreference, setTheme } = useTheme();
  const availableViewModes = useAvailableViewModes();
  const availableOrientations = useAvailableOrientations();
  const [showSettings, setShowSettings] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  
  const handleViewModeChange = (mode: ViewMode) => {
    preferencesStore.updatePreference('viewMode', mode);
    setShowMenu(false);
    setActiveSubmenu(null);
  };
  
  const handleOrientationChange = (orientation: ChessOrientation) => {
    preferencesStore.updatePreference('chessOrientation', orientation);
    setShowMenu(false);
    setActiveSubmenu(null);
  };
  
  const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
    setTheme(theme);
    setShowMenu(false);
    setActiveSubmenu(null);
  };
  
  const handleMenuClick = () => {
    setShowMenu(!showMenu);
    setActiveSubmenu(null);
  };
  
  const handleSettingsClick = () => {
    setShowSettings(true);
    setShowMenu(false);
    setActiveSubmenu(null);
  };
  
  const handleSubmenuHover = (submenu: string) => {
    setActiveSubmenu(submenu);
  };
  
  // Orientation toggle is disabled in chat-only mode
  const isOrientationDisabled = viewMode === 'chat-only';
  

  // Click outside to close menu
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (showMenu && !target.closest('.hamburger-menu-container')) {
        setShowMenu(false);
      }
    };
    
    if (showMenu) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showMenu]);

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+, or Cmd+, for settings
      if ((e.ctrlKey || e.metaKey) && e.key === ',') {
        e.preventDefault();
        setShowSettings(true);
      }
    };

    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  return (
    <HeaderContainer>
      <LogoSection>
        <div className="hamburger-menu-container" style={{ position: 'relative' }}>
          <MenuButton onClick={handleMenuClick} aria-label="Menu">
            ☰
          </MenuButton>
          <DropdownMenu $isOpen={showMenu}>
            <MenuItem 
              $hasSubmenu
              onMouseEnter={() => handleSubmenuHover('theme')}
              onMouseLeave={() => setActiveSubmenu(null)}
            >
              <MenuItemContent>
                🎨 Theme
              </MenuItemContent>
              <SubmenuIndicator>▶</SubmenuIndicator>
              <Submenu $isOpen={activeSubmenu === 'theme'}>
                <SubmenuItem 
                  $isActive={themePreference === 'light'}
                  onClick={() => handleThemeChange('light')}
                >
                  ☀ Light
                </SubmenuItem>
                <SubmenuItem 
                  $isActive={themePreference === 'dark'}
                  onClick={() => handleThemeChange('dark')}
                >
                  ☾ Dark
                </SubmenuItem>
                <SubmenuItem 
                  $isActive={themePreference === 'system'}
                  onClick={() => handleThemeChange('system')}
                >
                  ◐ System
                </SubmenuItem>
              </Submenu>
            </MenuItem>
            
            <MenuItem 
              $hasSubmenu
              onMouseEnter={() => handleSubmenuHover('orientation')}
              onMouseLeave={() => setActiveSubmenu(null)}
            >
              <MenuItemContent>
                📐 Orientation
              </MenuItemContent>
              <SubmenuIndicator>▶</SubmenuIndicator>
              <Submenu $isOpen={activeSubmenu === 'orientation'}>
                {availableOrientations.includes('landscape') && (
                  <SubmenuItem 
                    $isActive={chessOrientation === 'landscape'}
                    onClick={() => !isOrientationDisabled && handleOrientationChange('landscape')}
                    disabled={isOrientationDisabled}
                    style={{ opacity: isOrientationDisabled ? 0.5 : 1 }}
                  >
                    ▭ Landscape
                  </SubmenuItem>
                )}
                {availableOrientations.includes('portrait') && (
                  <SubmenuItem 
                    $isActive={chessOrientation === 'portrait'}
                    onClick={() => !isOrientationDisabled && handleOrientationChange('portrait')}
                    disabled={isOrientationDisabled}
                    style={{ opacity: isOrientationDisabled ? 0.5 : 1 }}
                  >
                    ▯ Portrait
                  </SubmenuItem>
                )}
              </Submenu>
            </MenuItem>
            
            <MenuItem 
              $hasSubmenu
              onMouseEnter={() => handleSubmenuHover('mode')}
              onMouseLeave={() => setActiveSubmenu(null)}
            >
              <MenuItemContent>
                🎮 View Mode
              </MenuItemContent>
              <SubmenuIndicator>▶</SubmenuIndicator>
              <Submenu $isOpen={activeSubmenu === 'mode'}>
                {availableViewModes.includes('chess-only') && (
                  <SubmenuItem 
                    $isActive={viewMode === 'chess-only'}
                    onClick={() => handleViewModeChange('chess-only')}
                  >
                    ♔ Chess Only
                  </SubmenuItem>
                )}
                {availableViewModes.includes('chess-and-chat') && (
                  <SubmenuItem 
                    $isActive={viewMode === 'chess-and-chat'}
                    onClick={() => handleViewModeChange('chess-and-chat')}
                  >
                    ♔│ Chess & Chat
                  </SubmenuItem>
                )}
                {availableViewModes.includes('chat-only') && (
                  <SubmenuItem 
                    $isActive={viewMode === 'chat-only'}
                    onClick={() => handleViewModeChange('chat-only')}
                  >
                    ▤ Chat Only
                  </SubmenuItem>
                )}
              </Submenu>
            </MenuItem>
            
            <MenuDivider />
            
            <MenuItem onClick={handleSettingsClick}>
              <MenuItemContent>
                ⚙️ Settings
              </MenuItemContent>
            </MenuItem>
            
            <MenuDivider />
            
            <MenuItem onClick={() => {
              window.open('https://github.com/cday-with-ai/Simple-FICS-Interface', '_blank');
              setShowMenu(false);
            }}>
              <MenuItemContent>
                📖 Documentation
              </MenuItemContent>
            </MenuItem>
            <MenuItem onClick={() => {
              window.open('https://github.com/cday-with-ai/Simple-FICS-Interface/issues', '_blank');
              setShowMenu(false);
            }}>
              <MenuItemContent>
                🐛 Report Issue
              </MenuItemContent>
            </MenuItem>
          </DropdownMenu>
        </div>
      </LogoSection>
      
      <ControlsSection>
        <ToggleGroup>
          <ToggleLabel>Mode:</ToggleLabel>
          <ToggleContainer>
            {availableViewModes.includes('chess-only') && (
              <ToggleButton
                $isActive={viewMode === 'chess-only'}
                onClick={() => handleViewModeChange('chess-only')}
                title="Chess Only"
              >
                ♔
              </ToggleButton>
            )}
            {availableViewModes.includes('chess-and-chat') && (
              <ToggleButton
                $isActive={viewMode === 'chess-and-chat'}
                onClick={() => handleViewModeChange('chess-and-chat')}
                title="Chess & Chat"
              >
                ♔│
              </ToggleButton>
            )}
            {availableViewModes.includes('chat-only') && (
              <ToggleButton
                $isActive={viewMode === 'chat-only'}
                onClick={() => handleViewModeChange('chat-only')}
                title="Chat Only"
              >
                ▤
              </ToggleButton>
            )}
          </ToggleContainer>
        </ToggleGroup>
      </ControlsSection>
      
      <SettingsDialog 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </HeaderContainer>
  );
});

AppHeader.displayName = 'AppHeader';