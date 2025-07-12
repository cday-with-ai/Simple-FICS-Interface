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

const JournalLink = styled.span`
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

const SoughtLink = styled.span`
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

const GamesLink = styled.span`
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

// Comprehensive URL regex that matches various URL formats
const URL_REGEX = /(?:(?:https?|ftp):\/\/)?(?:www\.)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?|(?:www\.)?(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?/gi;


// Regex to match quoted FICS commands like "play 56", 'accept', "decline", etc.
const COMMAND_REGEX = /["']([^"']+)["']/g;

// Regex to match bracketed commands like [next], [more], [back], etc.
const BRACKET_COMMAND_REGEX = /\[(\w+)\]/g;

// Valid FICS commands (lowercase for case-insensitive comparison)
const VALID_FICS_COMMANDS = new Set([
  'abort', 'accept', 'addlist', 'adjourn', 'alias', 'allobservers', 'assess',
  'clear', // Special command for clearing lists (censor, noplay, notify, gnotify, channel)
  'set', // Special command for setting preferences (theme, orient, mode)
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
  // Debug log for history, journal, sought, and games lines
  if (text.includes('History for') || text.match(/^\d+:\s+[+-=]/) || 
      text.includes('Journal for') || text.match(/^%\d+:/) ||
      text.match(/^\s*\d+\s+(?:\d{3,4}|----|\+{4})\s+\w+/) ||
      (text.includes(' - ') && text.includes('(') && text.match(/^\s*\d+\s+/))) {
    console.log('LinkifiedText processing:', { text: text.substring(0, 50), hasCommandClick: !!onCommandClick });
  }
  
  // Find all matches (URLs, commands, and player names) with their positions
  const matches: Array<{
    type: 'url' | 'command' | 'player';
    match: string;
    content: string;
    index: number;
    length: number;
    isHistoryLine?: boolean;
    isJournalLine?: boolean;
    isSoughtLine?: boolean;
    isGamesLine?: boolean;
  }> = [];
  
  // If we're not in command mode (no onCommandClick), only process URLs
  const isCommandMode = !!onCommandClick;
  
  
  // Early return for non-command mode - only process URLs
  if (!isCommandMode) {
    // Find URLs only
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
    
    // Build the result with just URLs
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    
    matches.forEach((match, i) => {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      
      let href = match.content;
      if (!match.content.match(/^(?:https?|ftp):\/\//)) {
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
      
      lastIndex = match.index + match.length;
    });
    
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    return <span className={className}>{parts.length > 0 ? parts : text}</span>;
  }
  
  // Check if this looks like a who command output
  const isWhoOutput = text.includes('players displayed') || 
    (/^\s*(?:\d{3,4}|----|\+{4})/.test(text) && 
     !text.match(/^\d{4}\s+\(/) && // Exclude news items
     !text.match(/^\s*\d+\s+(?:\d{3,4}|----|\+{4})\s+\w+/)); // Exclude sought output
  
  // Check if this is sought/seek list output (single player format, not games which have two players)
  const isSoughtOutput = /^\s*\d+\s+(?:\d{3,4}|----|\+{4})\s+\w+(?:\([A-Z]\))?\s+\d+\s+\d+\s+(?:unrated|rated)/.test(text) &&
    !text.includes('games displayed') &&
    !text.includes(' - '); // Games have timing format like "6:46 - 5:48"
  
  // Check if this looks like games command output (two players with timing info)
  const isGamesOutput = text.includes('games displayed') || 
    (/^\s*\d{1,3}\s+(?:\d{3,4}|----|\+{4})\s+\w+\s+(?:\d{3,4}|----|\+{4})\s+\w+/.test(text) &&
     text.includes(' - ') && // Games have timing format like "6:46 - 5:48"
     text.includes('(') && // Games have move counts like "(15-11)"
     !isSoughtOutput); // Exclude sought output
  
  // Check if this looks like channel member list (in command output)
  // Must start with "Channel N" to avoid matching regular channel messages
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
  // Only match the header line, not content lines (too many false positives)
  const isListOutput = /^\s*--\s+\w+\s+list:/.test(text);
  
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
  
  // Check if this is best list output
  const isBestListOutput = /^\s*\d+\.\s+\w+\s+\d{4}/.test(text) ||
    /^\s+\w+\s+\d{4}\s+\d+\.\s+\w+\s+\d{4}/.test(text);
  
  // Check if this is news index output
  const isNewsIndexOutput = /^\d{4}\s+\(\w{3},\s+\w{3}\s+\d+\)/.test(text) ||
    text.includes('Index of new news items:') ||
    text.includes('Index of the last few news items:');
  
  // Check if this is a notification message
  const isNotificationMessage = /^Notification:\s+\w+\s+has\s+(?:arrived|departed)/.test(text);
  
  // Check if this is a "told" confirmation message (skip player detection for these)
  const isToldMessage = /^\(told \d+ players? in channel \d+/.test(text) || /^\(told \w+\)/.test(text);
  
  // Check if this looks like user input (not FICS output) - these often get echoed in console
  // User messages typically don't have special FICS formatting
  // Be more specific to avoid catching FICS output
  const looksLikeUserInput = text.length > 10 && // Not too short
    !text.match(/^\s/) && // Doesn't start with whitespace
    !text.match(/^Channel\s+\d+/) && // Not a channel list
    !text.match(/^[A-Z]/) && // FICS output often starts with capitals
    !text.match(/^\w+\s+\(\d+\)/) && // Not a player (rating) format
    !text.match(/^Game\s+\d+/) && // Not a game message
    !text.includes('displayed') && // Not a list footer
    !text.match(/^--/) && // Not a list header
    !text.match(/^\d{4}\s+\(\w{3},/) && // Not a news item
    !text.match(/^\d+\s+\(/) && // Not any numbered list with parentheses
    !text.match(/^\d+:\s+[+-=]/) && // Not a history entry
    !text.match(/^%\d+:/) && // Not a journal entry
    text.split(/\s+/).length > 3; // Has multiple words (likely a sentence)
  
  // Debug logging for history, journal, sought, and games detection
  if (text.includes('History for') || text.match(/^\d+:\s+[+-=]/) ||
      text.includes('Journal for') || text.match(/^%\d+:/) ||
      text.match(/^\s*\d+\s+(?:\d{3,4}|----|\+{4})\s+\w+/) ||
      (text.includes(' - ') && text.includes('(') && text.match(/^\s*\d+\s+/))) {
    console.log('History/Journal/Sought/Games detection:', { 
      text: text.substring(0, 50), 
      isHistoryOutput,
      isJournalOutput,
      isSoughtOutput,
      isWhoOutput,
      isGamesOutput,
      isCommandMode,
      isToldMessage,
      looksLikeUserInput
    });
  }
  
  // Skip all special processing for "told" messages and user input (but not news items)
  if ((isToldMessage || looksLikeUserInput) && !isNewsIndexOutput) {
    // Only process URLs for these messages
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
  // For who output, find player names
  else if (isWhoOutput && !isGamesOutput) {
    console.log('Processing as WHO output:', { text: text.substring(0, 50) });
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
    console.log('In games handling block', { text: text.substring(0, 50) });
    // Pattern to match game entries: game# rating1 player1 rating2 player2 ...
    const gamesRegex = /^\s*(\d{1,3})\s+(?:\d{3,4}|----|\+{4})\s+\w+\s+(?:\d{3,4}|----|\+{4})\s+\w+/;
    const gamesMatch = gamesRegex.exec(text);
    console.log('Games regex match:', gamesMatch);
    if (gamesMatch) {
      const gameNum = gamesMatch[1];
      console.log('Games entry detected:', { gameNum, text });
      // Make the entire line clickable
      matches.push({
        type: 'command',
        match: text,
        content: `observe ${gameNum}`,
        index: 0,
        length: text.length,
        isGamesLine: true
      });
      console.log('Added games line to matches:', matches[matches.length - 1]);
    } else {
      console.log('Games entry not matched:', { text, gamesMatch, trimmedText: text.trim() });
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
    
    // Also find URLs in channel log messages
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
    console.log('In history handling block', { text: text.substring(0, 50), lastHistoryPlayer });
    // Handle history header: "History for playerName:"
    const headerRegex = /History for (\w+):/;
    const headerMatch = headerRegex.exec(text);
    if (headerMatch) {
      const playerName = headerMatch[1];
      lastHistoryPlayer = playerName; // Store for use in subsequent lines
      console.log('History header detected, player:', playerName);
    } else if (lastHistoryPlayer) {
      // Handle history entries: "N: +/- rating color rating opponent ..."
      console.log('Checking history entry with lastHistoryPlayer:', lastHistoryPlayer);
      // The regex needs to be more flexible to match the actual format
      // Format: "N: +/- rating [W/B/N] rating opponent [ game_type ] ECO result Date"
      const entryRegex = /^\s*(\d+):\s+[+-=]\s+\d+\s+[WBN]\s+\d+\s+(\w+)/;
      const entryMatch = entryRegex.exec(text);
      console.log('Entry regex match:', entryMatch);
      if (entryMatch) {
        const gameNumber = entryMatch[1];
        console.log('History entry detected:', { gameNumber, player: lastHistoryPlayer, text });
        // Make the entire line clickable
        matches.push({
          type: 'command',
          match: text,
          content: `examine ${lastHistoryPlayer} ${gameNumber}`,
          index: 0,
          length: text.length,
          isHistoryLine: true
        });
        console.log('Added history line to matches:', matches[matches.length - 1]);
      } else {
        console.log('History entry not matched:', { text, lastHistoryPlayer, entryMatch, trimmedText: text.trim() });
      }
    } else {
      console.log('No lastHistoryPlayer set for entry line');
    }
  } else if (isJournalOutput) {
    console.log('In journal handling block', { text: text.substring(0, 50), lastJournalPlayer });
    // Handle journal header: "Journal for playerName:"
    const headerRegex = /Journal for (\w+):/;
    const headerMatch = headerRegex.exec(text);
    if (headerMatch) {
      const playerName = headerMatch[1];
      lastJournalPlayer = playerName; // Store for use in subsequent lines
      console.log('Journal header detected, player:', playerName);
    } else if (lastJournalPlayer) {
      // Handle journal entries: "%N: player1 rating player2 rating ..."
      console.log('Checking journal entry with lastJournalPlayer:', lastJournalPlayer);
      const journalRegex = /^(\s*)(%\d+):/;
      const journalMatch = journalRegex.exec(text);
      console.log('Journal regex match:', journalMatch);
      if (journalMatch) {
        const [fullMatch, indent, gameNum] = journalMatch;
        console.log('Journal entry detected:', { gameNum, player: lastJournalPlayer, text });
        // Make the entire line clickable
        matches.push({
          type: 'command',
          match: text,
          content: `examine ${lastJournalPlayer} ${gameNum}`,
          index: 0,
          length: text.length,
          isJournalLine: true
        });
        console.log('Added journal line to matches:', matches[matches.length - 1]);
      } else {
        console.log('Journal entry not matched:', { text, lastJournalPlayer, journalMatch, trimmedText: text.trim() });
      }
    } else {
      console.log('No lastJournalPlayer set for entry line');
    }
  } else if (isSoughtOutput) {
    console.log('In sought handling block', { text: text.substring(0, 50) });
    // Parse sought list entries: "N rating playerName time inc ..."
    const soughtRegex = /^\s*(\d+)\s+(?:\d{3,4}|----|\+{4})\s+\w+/;
    const soughtMatch = soughtRegex.exec(text);
    console.log('Sought regex match:', soughtMatch);
    if (soughtMatch) {
      const gameNum = soughtMatch[1];
      console.log('Sought entry detected:', { gameNum, text });
      // Make the entire line clickable
      matches.push({
        type: 'command',
        match: text,
        content: `play ${gameNum}`,
        index: 0,
        length: text.length,
        isSoughtLine: true
      });
      console.log('Added sought line to matches:', matches[matches.length - 1]);
    } else {
      console.log('Sought entry not matched:', { text, soughtMatch, trimmedText: text.trim() });
    }
  } else if (isBestListOutput) {
    // Skip header line that contains "Blitz", "Standard", "Lightning"
    if (text.includes('Blitz') && text.includes('Standard') && text.includes('Lightning')) {
      // This is the header line, don't process it
    } else {
      // Parse best list entries which can have multiple entries per line
      // Pattern: "N. PlayerName rating" or just "PlayerName rating"
      const bestRegex = /(?:(\d+)\.\s+)?(\w+)\s+(\d{4})/g;
      let bestMatch;
      
      while ((bestMatch = bestRegex.exec(text)) !== null) {
        const [fullMatch, rank, playerName, rating] = bestMatch;
        const playerIndex = bestMatch.index + (rank ? rank.length + 2 : 0); // Account for "N. "
        
        matches.push({
          type: 'player',
          match: playerName,
          content: playerName,
          index: playerIndex,
          length: playerName.length
        });
      }
    }
  } else if (isNewsIndexOutput) {
    // Skip the header line
    if (text.includes('Index of new news items:') || text.includes('Index of the last few news items:')) {
      // This is the header, don't process it
    } else {
      // Parse news entries: "NNNN (Day, Mon DD) Description"
      const newsRegex = /^(\d{4})\s+\(/;
      const newsMatch = newsRegex.exec(text);
      if (newsMatch) {
        const newsNumber = newsMatch[1];
        
        if (onCommandClick) {
          matches.push({
            type: 'command',
            match: newsNumber,
            content: `news ${newsNumber}`,
            index: 0,
            length: newsNumber.length
          });
        }
      }
    }
  } else if (isNotificationMessage) {
    // Parse notification messages: "Notification: PlayerName has arrived/departed."
    const notificationRegex = /^Notification:\s+(\w+)\s+has\s+(?:arrived|departed)/;
    const notificationMatch = notificationRegex.exec(text);
    if (notificationMatch) {
      const playerName = notificationMatch[1];
      const playerIndex = text.indexOf(playerName);
      
      matches.push({
        type: 'player',
        match: playerName,
        content: playerName,
        index: playerIndex,
        length: playerName.length
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
  if (onCommandClick && !isWhoOutput && !isGamesOutput && !isChannelOutput && !isMovesOutput && !isGameMessage && !isChannelLog && !isPlayerList && !isListOutput && !isFingerNote && !isFingerHeader && !isHistoryOutput && !isJournalOutput && !isSoughtOutput && !isBestListOutput && !isNewsIndexOutput && !isNotificationMessage) {
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
    // Find quoted commands
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
    
    // Find bracketed commands like [next], [more], etc.
    BRACKET_COMMAND_REGEX.lastIndex = 0;
    let bracketMatch;
    while ((bracketMatch = BRACKET_COMMAND_REGEX.exec(text)) !== null) {
      const command = bracketMatch[1].toLowerCase();
      // Common navigation commands in help pages
      if (['next', 'more', 'back', 'prev', 'previous', 'done', 'quit'].includes(command)) {
        matches.push({
          type: 'command',
          match: bracketMatch[0], // Full match with brackets
          content: command, // Command without brackets
          index: bracketMatch.index,
          length: bracketMatch[0].length
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
      if (match.isHistoryLine) {
        parts.push(
          <HistoryLink
            key={`hist-${i}`}
            onClick={(e) => {
              e.stopPropagation();
              onCommandClick!(match.content);
            }}
            title={`Click to examine game: ${match.content}`}
          >
            {match.match}
          </HistoryLink>
        );
      } else if (match.isJournalLine) {
        parts.push(
          <JournalLink
            key={`journal-${i}`}
            onClick={(e) => {
              e.stopPropagation();
              onCommandClick!(match.content);
            }}
            title={`Click to examine game: ${match.content}`}
          >
            {match.match}
          </JournalLink>
        );
      } else if (match.isSoughtLine) {
        parts.push(
          <SoughtLink
            key={`sought-${i}`}
            onClick={(e) => {
              e.stopPropagation();
              onCommandClick!(match.content);
            }}
            title={`Click to play game: ${match.content}`}
          >
            {match.match}
          </SoughtLink>
        );
      } else if (match.isGamesLine) {
        parts.push(
          <GamesLink
            key={`games-${i}`}
            onClick={(e) => {
              e.stopPropagation();
              onCommandClick!(match.content);
            }}
            title={`Click to observe game: ${match.content}`}
          >
            {match.match}
          </GamesLink>
        );
      } else {
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