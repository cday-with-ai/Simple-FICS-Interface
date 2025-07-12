import React from 'react';
import styled from 'styled-components';
import { PlayerName } from './PlayerName';

interface FICSOutputProps {
  text: string;
  className?: string;
  onCommandClick?: (command: string) => void;
}

const Link = styled.a`
  color: ${props => props.theme.colors.primary};
  text-decoration: underline;
  cursor: pointer;
  transition: color ${props => props.theme.transitions.fast};
  
  &:hover {
    color: ${props => props.theme.colors.primaryHover};
    text-decoration: none;
  }
  
  &:visited {
    color: ${props => props.theme.colors.primary}aa;
  }
`;

const CommandLink = styled.span`
  color: ${props => props.theme.colors.primary};
  text-decoration: underline;
  cursor: pointer;
  transition: color ${props => props.theme.transitions.fast};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  
  &:hover {
    color: ${props => props.theme.colors.primaryHover};
    text-decoration: none;
  }
`;

// Regex patterns for different FICS output types
const PATTERNS = {
  // URL pattern
  URL: /(?:(?:https?|ftp):\/\/)?(?:www\.)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?/gi,
  
  // Command pattern (quoted strings)
  COMMAND: /["']([^"']+)["']/g,
  
  // Seek pattern: PlayerName (rating) seeking ...
  SEEK_PLAYER: /^(\w+(?:\([A-Z]\))?) \((?:\+{4}|-{4}|\+*\d+)\) seeking/,
  
  // Who list player pattern - matches player names with prefixes
  WHO_PLAYER: /([.^:#&]?)([A-Za-z]\w*)(?:\([A-Z*]+\))?(?:\([A-Z]{2}\))?/g,
};

export const FICSOutput: React.FC<FICSOutputProps> = ({ text, className, onCommandClick }) => {
  // Detect output type
  const isWhoOutput = text.includes('players displayed') || 
    /^\s*(?:\d{3,4}|----|\+{4})/.test(text);
  
  const isSeekOutput = PATTERNS.SEEK_PLAYER.test(text);
  
  // For who output, parse it line by line but preserve formatting
  if (isWhoOutput) {
    const lines = text.split('\n');
    
    return (
      <span className={className}>
        {lines.map((line, lineIndex) => {
          // Skip empty lines
          if (!line.trim()) return lineIndex > 0 ? '\n' : null;
          
          // Check if this is the summary line
          if (line.includes('players displayed')) {
            return (
              <React.Fragment key={lineIndex}>
                {lineIndex > 0 && '\n'}
                {line}
              </React.Fragment>
            );
          }
          
          // Parse player names while preserving column spacing
          const parts: React.ReactNode[] = [];
          let lastIndex = 0;
          
          // Find all player names in the line
          // Match pattern: optional symbols followed by player name
          const playerRegex = /([.^:#&]?)([A-Za-z]\w*)(?:\([A-Z*]+\))?(?:\([A-Z]{2}\))?/g;
          let match;
          
          while ((match = playerRegex.exec(line)) !== null) {
            const [fullMatch, symbol, playerName] = match;
            const matchStart = match.index;
            
            // Check if this is preceded by a rating to confirm it's a player
            const beforeMatch = line.substring(Math.max(0, matchStart - 6), matchStart);
            if (beforeMatch.match(/(?:\d{3,4}|----|\+{4})\s*$/)) {
              // Add text before the player name (including rating and symbol)
              if (matchStart > lastIndex) {
                parts.push(line.substring(lastIndex, matchStart));
              }
              
              // Add the symbol if present
              if (symbol) {
                parts.push(symbol);
              }
              
              // Add the clickable player name
              parts.push(
                <PlayerName key={`${lineIndex}-${match.index}`} name={playerName} />
              );
              
              // Update lastIndex to after the player name (not the full match)
              lastIndex = matchStart + symbol.length + playerName.length;
            }
          }
          
          // Add any remaining text
          if (lastIndex < line.length) {
            parts.push(line.substring(lastIndex));
          }
          
          // If no players found, return the line as-is
          if (parts.length === 0) {
            return (
              <React.Fragment key={lineIndex}>
                {lineIndex > 0 && '\n'}
                {line}
              </React.Fragment>
            );
          }
          
          return (
            <React.Fragment key={lineIndex}>
              {lineIndex > 0 && '\n'}
              {parts}
            </React.Fragment>
          );
        })}
      </span>
    );
  }
  
  // For seek output
  if (isSeekOutput && onCommandClick) {
    const seekMatch = PATTERNS.SEEK_PLAYER.exec(text);
    if (seekMatch) {
      const playerName = seekMatch[1].replace(/\([A-Z]\)$/, '');
      const parts: React.ReactNode[] = [];
      
      // Add player name as clickable
      parts.push(<PlayerName key="player" name={playerName} />);
      parts.push(seekMatch[1].match(/\([A-Z]\)$/) || ''); // Add back any (C) suffix
      
      // Add the rest of the text, looking for commands
      const remainingText = text.substring(seekMatch[0].length - ' seeking'.length);
      const commandParts: React.ReactNode[] = [];
      let lastIdx = 0;
      
      PATTERNS.COMMAND.lastIndex = 0;
      let cmdMatch: RegExpExecArray | null;
      while ((cmdMatch = PATTERNS.COMMAND.exec(remainingText)) !== null) {
        if (cmdMatch.index > lastIdx) {
          commandParts.push(remainingText.substring(lastIdx, cmdMatch.index));
        }
        
        commandParts.push(
          <CommandLink
            key={`cmd-${cmdMatch.index}`}
            onClick={(e) => {
              e.stopPropagation();
              if (cmdMatch) onCommandClick(cmdMatch[1]);
            }}
            title={`Click to send: ${cmdMatch?.[1]}`}
          >
            {cmdMatch?.[0]}
          </CommandLink>
        );
        
        lastIdx = cmdMatch.index + (cmdMatch[0]?.length || 0);
      }
      
      if (lastIdx < remainingText.length) {
        commandParts.push(remainingText.substring(lastIdx));
      }
      
      return <span className={className}>{parts}{commandParts}</span>;
    }
  }
  
  // For general text, look for URLs and commands
  const matches: Array<{
    type: 'url' | 'command';
    match: string;
    content: string;
    index: number;
    length: number;
  }> = [];
  
  // Find URLs
  PATTERNS.URL.lastIndex = 0;
  let urlMatch;
  while ((urlMatch = PATTERNS.URL.exec(text)) !== null) {
    // Skip if it looks like a player name with dots
    if (!/^[a-zA-Z]/.test(urlMatch[0]) || urlMatch[0].includes('/')) {
      matches.push({
        type: 'url',
        match: urlMatch[0],
        content: urlMatch[0],
        index: urlMatch.index,
        length: urlMatch[0].length
      });
    }
  }
  
  // Find commands
  if (onCommandClick) {
    PATTERNS.COMMAND.lastIndex = 0;
    let cmdMatch;
    while ((cmdMatch = PATTERNS.COMMAND.exec(text)) !== null) {
      matches.push({
        type: 'command',
        match: cmdMatch[0],
        content: cmdMatch[1],
        index: cmdMatch.index,
        length: cmdMatch[0].length
      });
    }
  }
  
  // Sort matches by position
  matches.sort((a, b) => a.index - b.index);
  
  // Build result
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  
  matches.forEach((match, i) => {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    
    if (match.type === 'url') {
      let href = match.content;
      if (!match.content.match(/^(?:https?|ftp):\/\//)) {
        href = 'https://' + match.content;
      }
      
      parts.push(
        <Link
          key={`url-${i}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          {match.content}
        </Link>
      );
    } else if (match.type === 'command') {
      parts.push(
        <CommandLink
          key={`cmd-${i}`}
          onClick={(e) => {
            e.stopPropagation();
            onCommandClick!(match.content);
          }}
          title={`Click to send: ${match.content}`}
        >
          {match.match}
        </CommandLink>
      );
    }
    
    lastIndex = match.index + match.length;
  });
  
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  
  return <span className={className}>{parts.length > 0 ? parts : text}</span>;
};

FICSOutput.displayName = 'FICSOutput';