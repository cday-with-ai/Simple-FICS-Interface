import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useFICSStore, usePreferencesStore } from '@fics/shared';

interface PlayerContextMenuProps {
  playerName: string;
  position: { x: number; y: number };
  onClose: () => void;
}

const MenuContainer = styled.div<{ $x: number; $y: number }>`
  position: fixed;
  left: ${props => props.$x}px;
  top: ${props => props.$y}px;
  background-color: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.lg};
  min-width: 160px;
  z-index: 1000;
  padding: ${props => props.theme.spacing[1]} 0;
`;

const MenuItem = styled.button`
  display: block;
  width: 100%;
  padding: ${props => props.theme.spacing[2]} ${props => props.theme.spacing[3]};
  text-align: left;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSize.sm};
  cursor: pointer;
  transition: background-color ${props => props.theme.transitions.fast};
  
  &:hover {
    background-color: ${props => props.theme.colors.backgroundSecondary};
  }
  
  &:active {
    background-color: ${props => props.theme.colors.backgroundTertiary};
  }
`;

const MenuDivider = styled.div`
  height: 1px;
  background-color: ${props => props.theme.colors.border};
  margin: ${props => props.theme.spacing[1]} 0;
`;

export const PlayerContextMenu: React.FC<PlayerContextMenuProps> = observer(({
  playerName,
  position,
  onClose
}) => {
  const ficsStore = useFICSStore();
  const preferencesStore = usePreferencesStore();
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Get commands from preferences or use defaults
  const commands = preferencesStore.preferences.playerContextCommands || [
    { label: 'Finger', command: 'finger {player}' },
    { label: 'History', command: 'hi {player}' },
    { label: 'Variables', command: 'vars {player}' },
    { divider: true },
    { label: 'Censor', command: '+censor {player}' },
    { label: 'No Play', command: '+noplay {player}' }
  ];
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    // Delay adding listeners to avoid immediate close on right-click
    setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }, 0);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);
  
  // Adjust position to keep menu on screen
  useEffect(() => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      let adjustedX = position.x;
      let adjustedY = position.y;
      
      // Adjust horizontal position
      if (rect.right > viewportWidth) {
        adjustedX = viewportWidth - rect.width - 10;
      }
      
      // Adjust vertical position
      if (rect.bottom > viewportHeight) {
        adjustedY = viewportHeight - rect.height - 10;
      }
      
      if (adjustedX !== position.x || adjustedY !== position.y) {
        menuRef.current.style.left = `${adjustedX}px`;
        menuRef.current.style.top = `${adjustedY}px`;
      }
    }
  }, [position]);
  
  const handleCommand = (command: string) => {
    // Strip titles from player name before using in commands
    const cleanPlayerName = playerName.replace(/\([^)]*\)/g, '').trim();
    // Replace {player} placeholder with actual player name
    const finalCommand = command.replace('{player}', cleanPlayerName);
    ficsStore.sendCommand(finalCommand);
    onClose();
  };
  
  return (
    <MenuContainer ref={menuRef} $x={position.x} $y={position.y}>
      {commands.map((item, index) => {
        if ('divider' in item && item.divider) {
          return <MenuDivider key={index} />;
        }
        
        if ('command' in item) {
          return (
            <MenuItem
              key={index}
              onClick={() => handleCommand(item.command)}
            >
              {item.label}
            </MenuItem>
          );
        }
        return null;
      })}
    </MenuContainer>
  );
});

PlayerContextMenu.displayName = 'PlayerContextMenu';