import React from 'react';
import styled from 'styled-components';
import { PlayerName } from './PlayerName';

interface LinkifiedTextProps {
  text: string;
  className?: string;
  onCommandClick?: (command: string) => void;
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

// Comprehensive URL regex that matches various URL formats
const URL_REGEX = /(?:(?:https?|ftp):\/\/)?(?:www\.)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?|(?:www\.)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?/gi;


// Regex to match quoted FICS commands like "play 56", 'accept', "decline", etc.
const COMMAND_REGEX = /["']([^"']+)["']/g;

// Valid FICS commands (lowercase for case-insensitive comparison)
const VALID_FICS_COMMANDS = new Set([
  'abort', 'accept', 'addlist', 'adjourn', 'alias', 'allobservers', 'assess',
  'backward', 'bell', 'best', 'boards', 'bsetup', 'bugwho', 'cbest',
  'clearmessages', 'convert_bcf', 'convert_elo', 'convert_uscf', 'copygame',
  'crank', 'cshout', 'date', 'decline', 'draw', 'examine', 'finger', 'flag',
  'flip', 'fmessage', 'follow', 'forward', 'games', 'getgame', 'gnotify', 'goboard',
  'handles', 'hbest', 'help', 'history', 'hrank', 'inchannel', 'index', 'info',
  'it', 'jkill', 'jsave', 'kibitz', 'limits', 'llogons', 'logons', 'mailhelp',
  'mailmess', 'mailmoves', 'mailoldmoves', 'mailsource', 'mailstored', 'match',
  'messages', 'mexamine', 'moretime', 'moves', 'news', 'next', 'observe',
  'oldmoves', 'open', 'password', 'pause', 'pending', 'pfollow', 'play',
  'pobserve', 'promote', 'pstat', 'qtell', 'quit', 'rank', 'refresh', 'resign',
  'resume', 'revert', 'say', 'seek', 'servers', 'set', 'shout', 'showadmins', 'showlist',
  'simabort', 'simallabort', 'simadjourn', 'simalladjourn', 'simgames',
  'simmatch', 'simnext', 'simobserve', 'simopen', 'simpass', 'simprev',
  'smoves', 'smposition', 'sought', 'sposition', 'statistics', 'stored',
  'style', 'sublist', 'switch', 'takeback', 'tell', 'time', 'unalias',
  'unexamine', 'unobserve', 'unpause', 'unseek', 'uptime', 'variables',
  'whisper', 'who', 'withdraw', 'xkibitz', 'xtell', 'xwhisper', 'znotify'
]);

// Regex to match player names in seek messages
// Matches: PlayerName (rating) seeking ... or PlayerName(C) (rating) seeking ...
// Rating can be numbers, ++++ for unrated guests, or ---- for provisional
const SEEK_PLAYER_REGEX = /^(\w+(?:\([A-Z]\))?) \((?:\+{4}|-{4}|\+*\d+)\) seeking/;

// Store the last seen history player name
let lastHistoryPlayer: string | null = null;
// Store the last seen journal player name
let lastJournalPlayer: string | null = null;

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
  
  // Check if this looks like channel member list (in command output)
  const isChannelOutput = /^\s*Channel\s+\d+(?:\s+"[^"]+")?\s*:/.test(text);
  
  // Check if this looks like moves command output
  const isMovesOutput = /\w+\s+\(\d+\)\s+vs\.\s+\w+\s+\(\d+\)/.test(text);
  
  // Check if this is a game message (Game N: ...)
  const isGameMessage = /^Game \d+:/.test(text);
  
  // Check if this is a channel log message with timestamp
  const isChannelLog = /^\:\[\d{2}:\d{2}:\d{2}\]/.test(text);
  
  // Check if this is a "Present company includes:" or "Your arrival was noted by:" message
  const isPlayerList = /^(?:Present company includes:|Your arrival was noted by:)/.test(text);
  
  // Check if this is a list output (like censor, noplay, etc.)
  const isListOutput = /^\s*--\s+\w+\s+list:/.test(text) || 
    // Also match lines that are part of a list (multiple player names in columns)
    /^(?:\s*\w+\s+){2,}\w+\s*$/.test(text);
  
  // Check if this is a finger note line (numbered lines with player interactions)
  const isFingerNote = /^\s*\d+:\s*\w+(?:\[\d+\])?\s+(?:tells you:|says:|at\s+)/.test(text);
  
  // Check if this is a finger header
  const isFingerHeader = /^\s*Finger of\s+\w+/.test(text);
  
  // Check if this is history output
  const isHistoryOutput = /^\s*\d+:\s+[+-=]\s+\d+\s+[WBN]\s+\d+\s+\w+/.test(text) ||
    /History for \w+:/.test(text);
  
  // Check if this is journal output
  const isJournalOutput = /^\s*%\d+:\s+\w+/.test(text) ||
    /Journal for \w+:/.test(text);
  
  // Check if this is sought/seek list output
  const isSoughtOutput = /^\s*\d+\s+(?:\d{3,4}|----|\+{4})\s+\w+/.test(text) &&
    !text.includes('games displayed');
  
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
  } else if (isChannelOutput) {
    // Find the colon that separates channel info from member list
    const colonIndex = text.indexOf(':');
    if (colonIndex !== -1) {
      // Parse player names after the colon
      const membersPart = text.substring(colonIndex + 1);
      // Match player names with optional {}, (TD), (U), (*) suffixes
      // Handles: playerName, {playerName}, playerName(TD), {playerName(TD)}
      const memberRegex = /\{?(\w+)(?:\([A-Z*]+\))?\}?/g;
      let memberMatch;
      
      while ((memberMatch = memberRegex.exec(membersPart)) !== null) {
        const playerName = memberMatch[1];
        // Skip if it's just whitespace or empty
        if (!playerName || playerName.trim() === '') continue;
        
        // Calculate the actual position of the player name (not the curly brace)
        const fullMatch = memberMatch[0];
        const nameStartInMatch = fullMatch.indexOf(playerName);
        const playerIndex = colonIndex + 1 + memberMatch.index + nameStartInMatch;
        
        matches.push({
          type: 'player',
          match: playerName,
          content: playerName,
          index: playerIndex,
          length: playerName.length
        });
      }
    }
  } else if (isMovesOutput) {
    // Parse player names from moves header: player1 (rating) vs. player2 (rating)
    const movesHeaderRegex = /(\w+)\s+\(\d+\)\s+vs\.\s+(\w+)\s+\(\d+\)/;
    const headerMatch = movesHeaderRegex.exec(text);
    
    if (headerMatch) {
      const [fullMatch, player1, player2] = headerMatch;
      const matchStart = headerMatch.index;
      
      // Add first player
      const player1Index = matchStart + fullMatch.indexOf(player1);
      matches.push({
        type: 'player',
        match: player1,
        content: player1,
        index: player1Index,
        length: player1.length
      });
      
      // Add second player
      const player2Index = matchStart + fullMatch.indexOf(player2);
      matches.push({
        type: 'player',
        match: player2,
        content: player2,
        index: player2Index,
        length: player2.length
      });
    }
  } else if (isGameMessage) {
    // Parse player names from game messages
    // Pattern 1: "Game N: playerName offers/declines/accepts..."
    const actionRegex = /^Game \d+:\s+(\w+)\s+(?:offers|declines|accepts|requests|forfeits)/;
    const actionMatch = actionRegex.exec(text);
    if (actionMatch) {
      const playerName = actionMatch[1];
      const playerIndex = text.indexOf(playerName);
      matches.push({
        type: 'player',
        match: playerName,
        content: playerName,
        index: playerIndex,
        length: playerName.length
      });
    }
    
    // Pattern 2: "Game N (player1 vs. player2)..." - note the space before parentheses
    const vsRegex = /Game \d+\s*\((\w+)\s+vs\.\s+(\w+)\)/;
    const vsMatch = vsRegex.exec(text);
    if (vsMatch) {
      const [fullMatch, player1, player2] = vsMatch;
      const matchStart = vsMatch.index;
      
      // Add first player
      const player1Index = text.indexOf(player1, matchStart);
      matches.push({
        type: 'player',
        match: player1,
        content: player1,
        index: player1Index,
        length: player1.length
      });
      
      // Add second player
      const player2Index = text.indexOf(player2, matchStart);
      matches.push({
        type: 'player',
        match: player2,
        content: player2,
        index: player2Index,
        length: player2.length
      });
    }
  } else if (isChannelLog) {
    // Parse player names from channel log entries: :[HH:MM:SS] PlayerName: message
    const logRegex = /^\:\[\d{2}:\d{2}:\d{2}\]\s+(\w+):/;
    const logMatch = logRegex.exec(text);
    if (logMatch) {
      const playerName = logMatch[1];
      const playerIndex = text.indexOf(playerName, logMatch.index);
      matches.push({
        type: 'player',
        match: playerName,
        content: playerName,
        index: playerIndex,
        length: playerName.length
      });
    }
  } else if (isPlayerList) {
    // Parse player names from list after the colon
    const colonIndex = text.indexOf(':');
    if (colonIndex !== -1) {
      const playersPart = text.substring(colonIndex + 1);
      // Match player names (word characters, can have dots at the end)
      const playerRegex = /(\w+)(?=\s|\.|\.|$)/g;
      let playerMatch;
      
      while ((playerMatch = playerRegex.exec(playersPart)) !== null) {
        const playerName = playerMatch[1];
        const playerIndex = colonIndex + 1 + playerMatch.index;
        
        matches.push({
          type: 'player',
          match: playerName,
          content: playerName,
          index: playerIndex,
          length: playerName.length
        });
      }
    }
  } else if (isListOutput) {
    // Parse player names from list output (like censor, noplay lists)
    // Skip the header line
    if (!text.includes(' list:')) {
      // Match all player names (word characters)
      const playerRegex = /\b(\w+)\b/g;
      let playerMatch;
      
      while ((playerMatch = playerRegex.exec(text)) !== null) {
        const playerName = playerMatch[1];
        
        matches.push({
          type: 'player',
          match: playerName,
          content: playerName,
          index: playerMatch.index,
          length: playerName.length
        });
      }
    }
  } else if (isFingerNote) {
    // Parse player names from finger notes
    // Pattern 1: "N: PlayerName tells you:"
    // Pattern 2: "N: PlayerName[channel] says:"
    // Pattern 3: "N: PlayerName at date:"
    const noteRegex = /^\s*\d+:\s*(\w+)(?:\[\d+\])?\s+(?:tells you:|says:|at\s+)/;
    const noteMatch = noteRegex.exec(text);
    if (noteMatch) {
      const playerName = noteMatch[1];
      const playerIndex = text.indexOf(playerName);
      matches.push({
        type: 'player',
        match: playerName,
        content: playerName,
        index: playerIndex,
        length: playerName.length
      });
    }
  } else if (isFingerHeader) {
    // Parse player name from "Finger of playerName(*):" header
    const headerRegex = /^\s*Finger of\s+(\w+)/;
    const headerMatch = headerRegex.exec(text);
    if (headerMatch) {
      const playerName = headerMatch[1];
      const playerIndex = text.indexOf(playerName);
      matches.push({
        type: 'player',
        match: playerName,
        content: playerName,
        index: playerIndex,
        length: playerName.length
      });
    }
  } else if (isHistoryOutput) {
    // Handle history header: "History for playerName:"
    const headerRegex = /History for (\w+):/;
    const headerMatch = headerRegex.exec(text);
    if (headerMatch) {
      const playerName = headerMatch[1];
      lastHistoryPlayer = playerName; // Store for use in subsequent lines
      const playerIndex = text.indexOf(playerName);
      matches.push({
        type: 'player',
        match: playerName,
        content: playerName,
        index: playerIndex,
        length: playerName.length
      });
    } else {
      // Handle history entries: "N: +/- rating color rating opponent ..."
      const historyRegex = /^(\s*)(\d+):\s+[+-=]\s+\d+\s+[WBN]\s+\d+\s+(\w+)/;
      const historyMatch = historyRegex.exec(text);
      if (historyMatch) {
        const [fullMatch, indent, gameNum, opponent] = historyMatch;
        
        // Add clickable game number if we have the player name
        if (onCommandClick && lastHistoryPlayer) {
          const gameNumIndex = indent.length;
          matches.push({
            type: 'command',
            match: gameNum + ':',
            content: `examine ${lastHistoryPlayer} ${gameNum}`,
            index: gameNumIndex,
            length: gameNum.length + 1  // Include the colon
          });
        }
        
        // Add opponent name
        const opponentIndex = text.indexOf(opponent);
        matches.push({
          type: 'player',
          match: opponent,
          content: opponent,
          index: opponentIndex,
          length: opponent.length
        });
      }
    }
  } else if (isJournalOutput) {
    // Handle journal header: "Journal for playerName:"
    const headerRegex = /Journal for (\w+):/;
    const headerMatch = headerRegex.exec(text);
    if (headerMatch) {
      const playerName = headerMatch[1];
      lastJournalPlayer = playerName; // Store for use in subsequent lines
      const playerIndex = text.indexOf(playerName);
      matches.push({
        type: 'player',
        match: playerName,
        content: playerName,
        index: playerIndex,
        length: playerName.length
      });
    } else {
      // Handle journal entries: "%N: player1 rating player2 rating ..."
      // Players can have optional * prefix (guest games)
      const journalRegex = /^(\s*)(%\d+):\s+(\*?\w+)\s+\d+\s+(\*?\w+)/;
      const journalMatch = journalRegex.exec(text);
      if (journalMatch) {
        const [fullMatch, indent, gameNum, player1, player2] = journalMatch;
        
        // Add clickable game number if we have the journal player name
        if (onCommandClick && lastJournalPlayer) {
          const gameNumIndex = indent.length;
          matches.push({
            type: 'command',
            match: gameNum + ':',
            content: `examine ${lastJournalPlayer} ${gameNum}`,
            index: gameNumIndex,
            length: gameNum.length + 1  // Include the colon
          });
        }
        
        // Add both player names (strip * for the link but keep for display)
        const player1Index = text.indexOf(player1, indent.length + gameNum.length);
        const player1Name = player1.replace(/^\*/, ''); // Remove * prefix for the actual name
        const player1StartIndex = player1.startsWith('*') ? player1Index + 1 : player1Index;
        
        matches.push({
          type: 'player',
          match: player1Name,
          content: player1Name,
          index: player1StartIndex,
          length: player1Name.length
        });
        
        const player2Index = text.indexOf(player2, player1Index + player1.length);
        const player2Name = player2.replace(/^\*/, ''); // Remove * prefix for the actual name
        const player2StartIndex = player2.startsWith('*') ? player2Index + 1 : player2Index;
        
        matches.push({
          type: 'player',
          match: player2Name,
          content: player2Name,
          index: player2StartIndex,
          length: player2Name.length
        });
      }
    }
  } else if (isSoughtOutput) {
    // Parse sought list entries: "N rating playerName time inc ..."
    const soughtRegex = /^\s*(\d+)\s+((?:\d{3,4}|----|\+{4}))\s+(\w+(?:\([A-Z]\))?)/;
    const soughtMatch = soughtRegex.exec(text);
    if (soughtMatch) {
      const [fullMatch, gameNum, rating, playerName] = soughtMatch;
      
      // Add clickable game number
      if (onCommandClick) {
        const gameNumIndex = text.indexOf(gameNum);
        matches.push({
          type: 'command',
          match: gameNum,
          content: `play ${gameNum}`,
          index: gameNumIndex,
          length: gameNum.length
        });
      }
      
      // Add player name (remove (C) suffix if present for the actual name)
      const playerDisplayName = playerName;
      const playerActualName = playerName.replace(/\([A-Z]\)$/, '');
      const playerIndex = text.indexOf(playerDisplayName);
      
      matches.push({
        type: 'player',
        match: playerActualName,
        content: playerActualName,
        index: playerIndex,
        length: playerActualName.length
      });
    }
  } else {
    // Find URLs (not in special output formats)
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
  if (onCommandClick && !isWhoOutput && !isGamesOutput && !isChannelOutput && !isMovesOutput && !isGameMessage && !isChannelLog && !isPlayerList && !isListOutput && !isFingerNote && !isFingerHeader && !isHistoryOutput && !isJournalOutput && !isSoughtOutput) {
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
      const commandText = commandMatch[1].trim();
      // Check if the quoted text starts with a valid FICS command
      // Handle both regular commands and /prefix variations (e.g., "who /B")
      const words = commandText.split(/\s+/);
      const firstWord = words[0].toLowerCase();
      
      // Check if it's a valid command (including /B, /b, /L, etc. suffixes)
      const isValidCommand = VALID_FICS_COMMANDS.has(firstWord) || 
        (words.length > 1 && VALID_FICS_COMMANDS.has(firstWord) && words[1].startsWith('/'));
      
      if (isValidCommand) {
        matches.push({
          type: 'command',
          match: commandMatch[0], // Full match with quotes
          content: commandMatch[1], // Command without quotes
          index: commandMatch.index,
          length: commandMatch[0].length
        });
      }
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