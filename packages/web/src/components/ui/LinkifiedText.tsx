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
    /^\s*(?:\d{3,4}|----|\+{4})/.test(text);
  
  // Check if this looks like games command output
  const isGamesOutput = text.includes('games displayed') || 
    /^\s*\d{1,3}\s+(?:\d{3,4}|----|\+{4})\s+\w+/.test(text);
  
  // For who output, find player names
  if (isWhoOutput && !isGamesOutput) {
    // Pattern to match player entries: rating/symbols + player name + optional flags
    const whoPlayerRegex = /(?:^|\s)((?:\d{3,4}|----|\+{4})\s*)([.^:#&]?)([A-Za-z]\w*)(?:\([A-Z*]+\))?(?:\([A-Z]{2}\))?/g;
    let whoMatch;
    while ((whoMatch = whoPlayerRegex.exec(text)) !== null) {
      const [fullMatch, rating, symbol, playerName] = whoMatch;
      // Calculate position of just the player name
      const playerStart = whoMatch.index + whoMatch[0].indexOf(playerName);
      
      matches.push({
        type: 'player',
        match: playerName,
        content: playerName,
        index: playerStart,
        length: playerName.length
      });
    }
  } else if (isGamesOutput) {
    // Pattern to match game entries
    // Format: game# rating1 player1 rating2 player2 [game_type time inc] ...
    const gamesRegex = /^\s*(\d{1,3})\s+(?:\(Exam\.\s+)?(\d{3,4}|----|\+{4})\s+(\w+)\s+(\d{3,4}|----|\+{4})\s+(\w+)/gm;
    let gameMatch;
    while ((gameMatch = gamesRegex.exec(text)) !== null) {
      const [fullMatch, gameNum, rating1, player1, rating2, player2] = gameMatch;
      const lineStart = gameMatch.index;
      
      // Add game number as command
      if (onCommandClick) {
        const gameNumIndex = lineStart + fullMatch.indexOf(gameNum);
        matches.push({
          type: 'command',
          match: gameNum,
          content: `observe ${gameNum}`,
          index: gameNumIndex,
          length: gameNum.length
        });
      }
      
      // Add player names
      const player1Index = lineStart + fullMatch.indexOf(player1);
      const player2Index = lineStart + fullMatch.indexOf(player2);
      
      matches.push({
        type: 'player',
        match: player1,
        content: player1,
        index: player1Index,
        length: player1.length
      });
      
      matches.push({
        type: 'player',
        match: player2,
        content: player2,
        index: player2Index,
        length: player2.length
      });
    }
  } else {
    // Find URLs (not in who output)
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
  if (onCommandClick && !isWhoOutput && !isGamesOutput) {
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