import React from 'react';
import { InteractiveElement } from '@fics/shared/src/services/FicsProtocol.types';
import { useRootStore } from '@fics/shared';
import { PlayerName } from '../../ui/PlayerName';
import { 
  Link, 
  CommandLink, 
  ChannelLink, 
  GameNumberLink, 
  SeekLink 
} from './MessageStyles';

interface InteractiveContentProps {
  content: string;
  elements?: InteractiveElement[];
  onCommandClick?: (command: string) => void;
}

export const InteractiveContent: React.FC<InteractiveContentProps> = ({ 
  content, 
  elements = [], 
  onCommandClick 
}) => {
  const { ficsStore } = useRootStore();
  
  
  // Universal element detection
  const detectElements = (text: string): InteractiveElement[] => {
    const detectedElements: InteractiveElement[] = [];
    
    // URLs (with protocol)
    const urlRegex = /(https?:\/\/[^\s]+)/gi;
    let match;
    while ((match = urlRegex.exec(text)) !== null) {
      detectedElements.push({
        type: 'url',
        text: match[1],
        action: match[1],
        start: match.index,
        end: match.index + match[1].length
      });
    }
    
    // Commands in single quotes (including smart quotes)
    const commandRegex = /['']([^'']+)['']|'([^']+)'/g;
    while ((match = commandRegex.exec(text)) !== null) {
      const command = match[1] || match[2];
      if (/^\w/.test(command)) {
        detectedElements.push({
          type: 'command',
          text: match[0],
          action: command,
          start: match.index,
          end: match.index + match[0].length
        });
      }
    }
    
    // Commands in double quotes (escaped as \")
    const doubleQuoteCommandRegex = /\\?"([^"]+)\\?"/g;
    while ((match = doubleQuoteCommandRegex.exec(text)) !== null) {
      const command = match[1];
      // Check if it looks like a command (starts with a word character)
      if (/^\w/.test(command)) {
        detectedElements.push({
          type: 'command',
          text: match[0],
          action: command,
          start: match.index,
          end: match.index + match[0].length
        });
      }
    }
    
    // Game numbers
    const gameRegex = /\bgame\s+(\d+)\b/gi;
    while ((match = gameRegex.exec(text)) !== null) {
      detectedElements.push({
        type: 'gameNumber',
        text: match[1],
        action: `observe ${match[1]}`,
        start: match.index,
        end: match.index + match[0].length
      });
    }
    
    // Seek numbers in "play X" format
    const seekRegex = /"play\s+(\d+)"/gi;
    while ((match = seekRegex.exec(text)) !== null) {
      detectedElements.push({
        type: 'seekNumber',
        text: match[0],
        action: `play ${match[1]}`,
        start: match.index,
        end: match.index + match[0].length
      });
    }
    
    // Channel numbers in various formats
    const channelRegex = /\((\d+)\):/g;
    while ((match = channelRegex.exec(text)) !== null) {
      detectedElements.push({
        type: 'channelNumber',
        text: match[1],
        action: `+channel ${match[1]}`,
        start: match.index + 1,
        end: match.index + 1 + match[1].length
      });
    }
    
    // Special commands like [next]
    const specialCommandRegex = /\[(next|more|back|prev)\]/gi;
    while ((match = specialCommandRegex.exec(text)) !== null) {
      detectedElements.push({
        type: 'command',
        text: match[0],
        action: match[1].toLowerCase(),
        start: match.index,
        end: match.index + match[0].length
      });
    }
    
    return detectedElements;
  };
  
  const handleAction = (action: string, type: InteractiveElement['type']) => {
    if (type === 'url') {
      window.open(action, '_blank', 'noopener,noreferrer');
    } else if (onCommandClick) {
      onCommandClick(action);
    } else {
      ficsStore.sendCommand(action);
    }
  };
  
  // Combine provided elements with detected ones
  const allElements = [...elements];
  
  
  // Only detect elements if none were provided
  if (elements.length === 0) {
    const detected = detectElements(content);
    allElements.push(...detected);
  }
  
  
  
  // If still no elements, return plain text
  if (allElements.length === 0) {
    return <>{content}</>;
  }
  
  // Sort elements by start position
  const sortedElements = [...allElements].sort((a, b) => a.start - b.start);
  
  
  // Build the rendered content with interactive elements
  const parts: React.ReactNode[] = [];
  let lastEnd = 0;
  
  
  sortedElements.forEach((element, index) => {
    
    // Add text before this element
    if (element.start > lastEnd) {
      const gapText = content.substring(lastEnd, element.start);
      
      
      parts.push(
        <span key={`text-${index}`} style={{ whiteSpace: 'pre' }}>
          {gapText}
        </span>
      );
    } else if (element.start < lastEnd) {
      // Skip overlapping elements
      console.warn(`[InteractiveContent] Skipping overlapping element:`, {
        element,
        lastEnd,
        overlap: lastEnd - element.start
      });
      return;
    }
    
    // Add the interactive element
    const key = `${element.type}-${index}`;
    // ALWAYS use element.text for display to avoid extraction issues
    const elementText = element.text;
    
    switch (element.type) {
      case 'player':
        parts.push(
          <span key={key}>
            {' '}
            <PlayerName 
              name={elementText} 
              onClick={() => handleAction(element.action, element.type)}
            />
          </span>
        );
        break;
        
      case 'url':
        parts.push(
          <Link 
            key={key}
            href={element.action}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              handleAction(element.action, element.type);
            }}
          >
            {elementText}
          </Link>
        );
        break;
        
      case 'channelNumber':
        parts.push(
          <ChannelLink
            key={key}
            onClick={() => handleAction(element.action, element.type)}
          >
            {elementText}
          </ChannelLink>
        );
        break;
        
      case 'gameNumber':
        parts.push(
          <GameNumberLink
            key={key}
            onClick={() => handleAction(element.action, element.type)}
          >
            {elementText}
          </GameNumberLink>
        );
        break;
        
      case 'seekNumber':
        parts.push(
          <SeekLink
            key={key}
            onClick={() => handleAction(element.action, element.type)}
          >
            {elementText}
          </SeekLink>
        );
        break;
        
      case 'command':
      default:
        parts.push(
          <CommandLink
            key={key}
            onClick={() => handleAction(element.action, element.type)}
          >
            {elementText}
          </CommandLink>
        );
        break;
    }
    
    lastEnd = element.end;
  });
  
  // Add any remaining text
  if (lastEnd < content.length) {
    parts.push(
      <span key="text-end" style={{ whiteSpace: 'pre' }}>
        {content.substring(lastEnd)}
      </span>
    );
  }
  
  
  return <>{parts}</>;
};