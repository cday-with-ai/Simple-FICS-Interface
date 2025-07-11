import React, { useState } from 'react';
import styled from 'styled-components';
import { PlayerContextMenu } from './PlayerContextMenu';

interface PlayerNameProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}

const NameSpan = styled.span`
  cursor: pointer;
  transition: color ${props => props.theme.transitions.fast};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    text-decoration: underline;
  }
`;

export const PlayerName: React.FC<PlayerNameProps> = ({ name, className, style }) => {
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };
  
  return (
    <>
      <NameSpan
        className={className}
        style={style}
        onClick={handleClick}
      >
        {name}
      </NameSpan>
      {contextMenu && (
        <PlayerContextMenu
          playerName={name}
          position={contextMenu}
          onClose={() => setContextMenu(null)}
        />
      )}
    </>
  );
};

PlayerName.displayName = 'PlayerName';