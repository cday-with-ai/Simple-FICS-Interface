import React from 'react';
import styled from 'styled-components';
import { PlayerName } from './PlayerName';
import { useRootStore } from '@fics/shared';
import { ParsedMessage, InteractiveElement } from '@fics/shared/src/services/FicsProtocol.types';

interface InteractiveTextProps {
  parsedMessage: ParsedMessage;
  className?: string;
}

const Link = styled.a`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    text-decoration: underline;
  }
  
  &:visited {
    color: inherit;
  }
`;

const CommandLink = styled.span`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    text-decoration: underline;
  }
`;

const SeekLink = styled.span`
  color: inherit;
  cursor: pointer;
  display: inline-block;
  width: 100%;
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    background-color: ${props => props.theme.colors.backgroundTertiary};
    text-decoration: underline;
  }
`;

const HistoryLink = styled.span`
  color: inherit;
  cursor: pointer;
  display: inline-block;
  width: 100%;
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    background-color: ${props => props.theme.colors.backgroundTertiary};
    text-decoration: underline;
  }
`;

const GameLink = styled.span`
  color: inherit;
  cursor: pointer;
  display: inline-block;
  width: 100%;
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    background-color: ${props => props.theme.colors.backgroundTertiary};
    text-decoration: underline;
  }
`;

export const InteractiveText: React.FC<InteractiveTextProps> = ({ parsedMessage, className }) => {
  const { ficsStore } = useRootStore();
  const { content, elements = [] } = parsedMessage;
  
  if (elements.length === 0) {
    return <span className={className}>{content}</span>;
  }
  
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  
  // Sort elements by position
  const sortedElements = [...elements].sort((a, b) => a.start - b.start);
  
  sortedElements.forEach((element, i) => {
    // Add text before this element
    if (element.start > lastIndex) {
      parts.push(
        <span key={`text-${i}`}>
          {content.substring(lastIndex, element.start)}
        </span>
      );
    }
    
    // Add the interactive element
    switch (element.type) {
      case 'player':
        parts.push(
          <PlayerName 
            key={`player-${i}`}
            name={element.text}
          />
        );
        break;
        
      case 'url':
        parts.push(
          <Link
            key={`url-${i}`}
            href={element.action}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            {element.text}
          </Link>
        );
        break;
        
      case 'command':
        // Check if this is a special type of command
        const isHistoryLine = element.action.startsWith('examine ');
        const isSeekLine = element.action.startsWith('play ');
        const isGameLine = element.action.startsWith('observe ');
        
        if (isHistoryLine) {
          parts.push(
            <HistoryLink
              key={`cmd-${i}`}
              onClick={(e) => {
                e.stopPropagation();
                ficsStore.sendCommand(element.action);
              }}
              title={`Click to ${element.action}`}
            >
              {element.text}
            </HistoryLink>
          );
        } else if (isSeekLine) {
          parts.push(
            <SeekLink
              key={`cmd-${i}`}
              onClick={(e) => {
                e.stopPropagation();
                ficsStore.sendCommand(element.action);
              }}
              title={`Click to accept challenge: ${element.action}`}
            >
              {element.text}
            </SeekLink>
          );
        } else if (isGameLine) {
          parts.push(
            <GameLink
              key={`cmd-${i}`}
              onClick={(e) => {
                e.stopPropagation();
                ficsStore.sendCommand(element.action);
              }}
              title={`Click to ${element.action}`}
            >
              {element.text}
            </GameLink>
          );
        } else {
          parts.push(
            <CommandLink
              key={`cmd-${i}`}
              onClick={(e) => {
                e.stopPropagation();
                ficsStore.sendCommand(element.action);
              }}
              title={`Click to send: ${element.action}`}
            >
              {element.text}
            </CommandLink>
          );
        }
        break;
        
      case 'seekNumber':
        parts.push(
          <SeekLink
            key={`seek-${i}`}
            onClick={(e) => {
              e.stopPropagation();
              ficsStore.sendCommand(element.action);
            }}
            title={`Click to accept challenge: ${element.action}`}
          >
            {element.text}
          </SeekLink>
        );
        break;
        
      case 'gameNumber':
        parts.push(
          <GameLink
            key={`game-${i}`}
            onClick={(e) => {
              e.stopPropagation();
              ficsStore.sendCommand(element.action);
            }}
            title={`Click to observe game: ${element.action}`}
          >
            {element.text}
          </GameLink>
        );
        break;
        
      default:
        // Fallback for any unhandled types
        parts.push(
          <span key={`unknown-${i}`}>{element.text}</span>
        );
    }
    
    lastIndex = element.end;
  });
  
  // Add any remaining text
  if (lastIndex < content.length) {
    parts.push(
      <span key="text-final">{content.substring(lastIndex)}</span>
    );
  }
  
  return <span className={className}>{parts}</span>;
};

InteractiveText.displayName = 'InteractiveText';