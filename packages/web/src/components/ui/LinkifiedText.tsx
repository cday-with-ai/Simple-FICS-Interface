import React from 'react';
import styled from 'styled-components';
import { PlayerName } from './PlayerName';

interface LinkifiedTextProps {
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

// Comprehensive URL regex that matches various URL formats
const URL_REGEX = /(?:(?:https?|ftp):\/\/)?(?:www\.)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?|(?:www\.)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?/gi;

// Regex to match player names in who command output
// Matches ratings like 2889, ----, ++++, followed by optional symbols and player names
const WHO_PLAYER_REGEX = /(?:^|\s)(?:\d{3,4}|----|\+{4})([.^:#&]?)(\w+)(?:\([A-Z*]+\))?(?:\([A-Z]{2}\))?/g;

// Regex to match quoted FICS commands like "play 56", 'accept', "decline", etc.
const COMMAND_REGEX = /["']([^"']+)["']/g;

// Regex to match player names in seek messages
// Matches: PlayerName (rating) seeking ... or PlayerName(C) (rating) seeking ...
// Rating can be numbers, ++++ for unrated guests, or ---- for provisional
const SEEK_PLAYER_REGEX = /^(\w+(?:\([A-Z]\))?) \((?:\+{4}|-{4}|\+*\d+)\) seeking/;

export const LinkifiedText: React.FC<LinkifiedTextProps> = ({ text, className, onCommandClick }) => {
  // Find all matches (URLs, commands, and player names) with their positions
  const matches: Array<{
    type: 'url' | 'command' | 'player';
    match: string;
    content: string;
    index: number;
    length: number;
  }> = [];
  
  // Check if this looks like a who command output
  const isWhoOutput = text.includes('players displayed') || 
    WHO_PLAYER_REGEX.test(text);
  
  // Find URLs (skip if this is who output to avoid false positives)
  if (!isWhoOutput) {
    URL_REGEX.lastIndex = 0;
    let urlMatch;
    while ((urlMatch = URL_REGEX.exec(text)) !== null) {
      matches.push({
        type: 'url',
        match: urlMatch[0],
        content: urlMatch[0],
        index: urlMatch.index,
        length: urlMatch[0].length
      });
    }
  }
  
  // Find player names in seek messages (only if onCommandClick is provided)
  if (onCommandClick && !isWhoOutput) {
    const seekMatch = SEEK_PLAYER_REGEX.exec(text);
    if (seekMatch) {
      const playerName = seekMatch[1]; // Player name with optional (C) suffix
      matches.push({
        type: 'player',
        match: playerName,
        content: playerName.replace(/\([A-Z]\)$/, ''), // Remove (C) suffix for the command
        index: 0,
        length: playerName.length
      });
    }
  }
  
  // Find player names in who output
  if (isWhoOutput) {
    WHO_PLAYER_REGEX.lastIndex = 0;
    let whoMatch;
    while ((whoMatch = WHO_PLAYER_REGEX.exec(text)) !== null) {
      const fullMatch = whoMatch[0];
      const symbol = whoMatch[1] || '';
      const playerName = whoMatch[2];
      
      // Calculate the actual position of the player name
      const playerIndex = whoMatch.index + fullMatch.indexOf(playerName);
      
      matches.push({
        type: 'player',
        match: playerName,
        content: playerName,
        index: playerIndex,
        length: playerName.length
      });
    }
  }
  
  // Find commands (only if onCommandClick is provided)
  if (onCommandClick) {
    COMMAND_REGEX.lastIndex = 0;
    let commandMatch;
    while ((commandMatch = COMMAND_REGEX.exec(text)) !== null) {
      matches.push({
        type: 'command',
        match: commandMatch[0], // Full match with quotes
        content: commandMatch[1], // Command without quotes
        index: commandMatch.index,
        length: commandMatch[0].length
      });
    }
  }
  
  // Sort matches by position
  matches.sort((a, b) => a.index - b.index);
  
  // Build the result
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  
  matches.forEach((match, i) => {
    // Add text before this match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    
    if (match.type === 'url') {
      // Prepare the href - add protocol if missing
      let href = match.content;
      if (!match.content.match(/^(?:https?|ftp):\/\//)) {
        // Check if it looks like a domain (has dots)
        if (match.content.includes('.')) {
          href = 'https://' + match.content;
        }
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
    } else if (match.type === 'player') {
      parts.push(
        <PlayerName
          key={`player-${i}`}
          name={match.content}
        />
      );
    }
    
    lastIndex = match.index + match.length;
  });
  
  // Add any remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  
  // If no matches were found, return the original text
  if (parts.length === 0) {
    return <span className={className}>{text}</span>;
  }
  
  return <span className={className}>{parts}</span>;
};

LinkifiedText.displayName = 'LinkifiedText';