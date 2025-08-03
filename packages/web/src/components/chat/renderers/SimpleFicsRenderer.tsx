import React, { useState } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@fics/shared';
import { PlayerContextMenu } from '../../ui/PlayerContextMenu';

const PreformattedText = styled.pre<{ $fontSize: number }>`
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: ${props => props.$fontSize}px;
  line-height: 1.4;
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  color: ${props => props.theme.colors.text};
`;

const SimpleLink = styled.a`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.colors.primary};
    text-decoration: underline;
  }
`;

const HoverableLineWrapper = styled.span`
  display: inline;
  
  a {
    color: inherit;
    text-decoration: none;
  }
  
  &:hover a {
    color: ${props => props.theme.colors.primary};
    text-decoration: underline;
  }
`;

interface SimpleFicsRendererProps {
  content: string;
  ansiColors?: boolean;
  elements?: Array<{
    type: 'player' | 'command' | 'gameNumber' | 'seekNumber' | 'url' | 'channelNumber';
    text: string;
    value?: string | number;
    action?: string;
    start: number;
    end: number;
  }>;
}

export const SimpleFicsRenderer: React.FC<SimpleFicsRendererProps> = observer(({ 
  content, 
  ansiColors = true,
  elements = []
}) => {
  const { ficsStore, preferencesStore, backendStore } = useRootStore();
  const chatAppearance = preferencesStore.getChatAppearance();
  const [contextMenu, setContextMenu] = useState<{ playerName: string; x: number; y: number } | null>(null);
  
  
  // Trim leading newline for display only
  const displayContent = content.startsWith('\n') ? content.substring(1) : content;
  
  // Convert ANSI color codes to HTML if enabled
  const processAnsiColors = (text: string): string => {
    if (!ansiColors) return text;
    
    // Basic ANSI color mapping
    const colorMap: Record<string, string> = {
      '30': '#000000', // Black
      '31': '#CC0000', // Red
      '32': '#4E9A06', // Green
      '33': '#C4A000', // Yellow
      '34': '#3465A4', // Blue
      '35': '#75507B', // Magenta
      '36': '#06989A', // Cyan
      '37': '#D3D7CF', // White
      '90': '#555753', // Bright Black
      '91': '#EF2929', // Bright Red
      '92': '#8AE234', // Bright Green
      '93': '#FCE94F', // Bright Yellow
      '94': '#729FCF', // Bright Blue
      '95': '#AD7FA8', // Bright Magenta
      '96': '#34E2E2', // Bright Cyan
      '97': '#EEEEEC', // Bright White
    };
    
    // Simple ANSI escape sequence replacement
    return text.replace(/\x1b\[(\d+)m/g, (match, code) => {
      const color = colorMap[code];
      if (color) {
        return `<span style="color: ${color}">`;
      } else if (code === '0') {
        return '</span>';
      }
      return '';
    });
  };
  
  // Detect wrapped URLs in tells and return information about them
  const detectWrappedUrls = (text: string): Array<{start: number, end: number, url: string}> => {
    const wrappedUrls: Array<{start: number, end: number, url: string}> = [];
    
    // Check if this is a tell message
    const isTell = text.match(/^\w+(?:\([^)]*\))*\s*tells\s+you:|^\s*\w+(?:\([^)]*\))*\((\d+)\):/m);
    
    if (isTell) {
      // Find URLs that span multiple lines
      const urlStartRegex = /(https?:\/\/[^\s]+)\s*$/gm;
      let match;
      
      while ((match = urlStartRegex.exec(text)) !== null) {
        const urlStart = match[1];
        const startPos = match.index;
        const lineEndPos = match.index + match[0].length;
        
        // Check if next line continues the URL
        const nextLineMatch = text.substring(lineEndPos).match(/^\n\s+([^\s]+)/);
        if (nextLineMatch && nextLineMatch[1].match(/[.\/\-?=&]/)) {
          // This looks like a URL continuation
          const fullUrl = urlStart + nextLineMatch[1];
          const endPos = lineEndPos + nextLineMatch[0].length;
          
          wrappedUrls.push({
            start: startPos,
            end: endPos,
            url: fullUrl
          });
        }
      }
    }
    
    return wrappedUrls;
  };
  
  // Simple link detection - only the essentials
  const renderWithLinks = (text: string): React.ReactNode => {
    // First, process ANSI colors
    const colorProcessed = processAnsiColors(text);
    
    // Detect wrapped URLs (use original content for wrapped URL detection)
    const wrappedUrls = detectWrappedUrls(content);
    
    // Define simple patterns with type-safe handlers
    type PatternHandler = {
      regex: RegExp;
      handler: (matches: RegExpExecArray, fullUrl?: string) => React.ReactNode;
    };
    
    const patterns: PatternHandler[] = [
      // URLs
      {
        regex: /(https?:\/\/[^\s]+)/g,
        handler: (matches, fullUrl) => {
          const displayUrl = matches[0];
          const actualUrl = fullUrl || displayUrl;
          return (
            <SimpleLink
              href={actualUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                window.open(actualUrl, '_blank');
              }}
            >
              {displayUrl}
            </SimpleLink>
          );
        }
      },
      // Player names (simple pattern: word at start of line followed by tells you:)
      {
        regex: /^(\w+) tells you:/gm,
        handler: (matches) => {
          const name = matches[1];
          return (
            <span key={`player-${name}`}>
              <SimpleLink
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setContextMenu({ 
                    playerName: name, 
                    x: e.clientX, 
                    y: e.clientY 
                  });
                }}
              >
                {name}
              </SimpleLink>
              {matches[0].substring(name.length)}
            </span>
          );
        }
      },
      // Game numbers (simple pattern: Game 123)
      {
        regex: /\bGame (\d+)\b/g,
        handler: (matches) => (
          <SimpleLink
            onClick={(e) => {
              e.preventDefault();
              ficsStore.sendCommand(`observe ${matches[1]}`);
            }}
          >
            {matches[0]}
          </SimpleLink>
        )
      }
    ];
    
    // Username pattern - only if we have logged-in users cached
    const usernamePattern: PatternHandler | null = backendStore.loggedInUsers.size > 0 ? {
      regex: /\b[A-Za-z][A-Za-z0-9_-]{2,16}\b/g, // FICS usernames: start with letter, 3-17 chars total
      handler: (matches) => {
        const username = matches[0];
        if (backendStore.isUserLoggedIn(username)) {
          return (
            <SimpleLink
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setContextMenu({ 
                  playerName: username, 
                  x: e.clientX, 
                  y: e.clientY 
                });
              }}
            >
              {username}
            </SimpleLink>
          );
        }
        return username; // Return plain text if not logged in
      }
    } : null;
    
    // If we have ANSI colors, parse as HTML
    if (ansiColors && colorProcessed !== text) {
      return <span dangerouslySetInnerHTML={{ __html: colorProcessed }} />;
    }
    
    // Otherwise, apply simple link patterns
    let lastIndex = 0;
    const parts: React.ReactNode[] = [];
    const usedRanges: Array<[number, number]> = [];
    
    // Collect all matches
    const allMatches: Array<{
      start: number;
      end: number;
      render: React.ReactNode;
      priority: number;
    }> = [];
    
    // First, add parser-provided elements with highest priority
    elements.forEach((element) => {
      // Adjust offset if we trimmed a leading newline
      const adjustedOffset = displayContent !== content ? element.start - 1 : element.start;
      
      if (adjustedOffset >= 0 && adjustedOffset < text.length) {
        // Check if this element spans a full line (for games, journal, history)
        const isFullLine = element.type === 'command' && 
          element.text.includes(':') && 
          (element.text.match(/^\s*\d+\s+/) || element.text.match(/^%\d+:/) || element.text.match(/^\d+:/));
        
        const elementRender = (() => {
          const linkContent = (() => {
            switch (element.type) {
              case 'command':
                return (
                  <SimpleLink
                    onClick={(e) => {
                      e.preventDefault();
                      ficsStore.sendCommand(element.action || element.value as string);
                    }}
                  >
                    {element.text}
                  </SimpleLink>
                );
              case 'player':
                return (
                  <SimpleLink
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setContextMenu({ 
                        playerName: element.text, 
                        x: e.clientX, 
                        y: e.clientY 
                      });
                    }}
                  >
                    {element.text}
                  </SimpleLink>
                );
              case 'gameNumber':
                return (
                  <SimpleLink
                    onClick={(e) => {
                      e.preventDefault();
                      ficsStore.sendCommand(`observe ${element.value}`);
                    }}
                  >
                    {element.text}
                  </SimpleLink>
                );
              default:
                return element.text;
            }
          })();
          
          // Wrap full-line links in hoverable wrapper
          if (isFullLine) {
            return <HoverableLineWrapper>{linkContent}</HoverableLineWrapper>;
          }
          return linkContent;
        })();
        
        allMatches.push({
          start: adjustedOffset,
          end: adjustedOffset + element.text.length,
          render: elementRender,
          priority: 20 // Highest priority for parser elements
        });
      }
    });
    
    // Then add wrapped URL matches with high priority
    wrappedUrls.forEach((wrappedUrl) => {
      // Check if this wrapped URL starts with a regular URL pattern
      const urlMatch = text.substring(wrappedUrl.start).match(/^(https?:\/\/[^\s]+)/);
      if (urlMatch) {
        const displayUrl = urlMatch[1];
        allMatches.push({
          start: wrappedUrl.start,
          end: wrappedUrl.start + displayUrl.length,
          render: (
            <SimpleLink
              href={wrappedUrl.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                window.open(wrappedUrl.url, '_blank');
              }}
            >
              {displayUrl}
            </SimpleLink>
          ),
          priority: 10 // High priority for wrapped URLs
        });
        usedRanges.push([wrappedUrl.start, wrappedUrl.end]);
      }
    });
    
    // Then process other patterns
    patterns.forEach(pattern => {
      const regex = new RegExp(pattern.regex);
      let match;
      
      while ((match = regex.exec(text)) !== null) {
        const start = match.index;
        const end = start + match[0].length;
        
        // Check if this range overlaps with any used range (wrapped URLs)
        const overlaps = usedRanges.some(([usedStart, usedEnd]) => 
          (start >= usedStart && start < usedEnd) || 
          (end > usedStart && end <= usedEnd)
        );
        
        if (!overlaps) {
          allMatches.push({
            start,
            end,
            render: pattern.handler(match),
            priority: 1
          });
        }
      }
    });
    
    // Process username pattern with lower priority
    if (usernamePattern) {
      const regex = new RegExp(usernamePattern.regex);
      let match;
      
      while ((match = regex.exec(text)) !== null) {
        const start = match.index;
        const end = start + match[0].length;
        
        // Check if this range overlaps with any used range
        const overlaps = usedRanges.some(([usedStart, usedEnd]) => 
          (start >= usedStart && start < usedEnd) || 
          (end > usedStart && end <= usedEnd)
        );
        
        if (!overlaps) {
          const rendered = usernamePattern.handler(match);
          // Only add if it's actually a link (not plain text)
          if (rendered !== match[0]) {
            allMatches.push({
              start,
              end,
              render: rendered,
              priority: 0 // Lower priority than other patterns
            });
          }
        }
      }
    }
    
    // Sort matches by position and priority
    allMatches.sort((a, b) => {
      if (a.start !== b.start) return a.start - b.start;
      return b.priority - a.priority;
    });
    
    // Remove overlapping matches (keep higher priority)
    const finalMatches = allMatches.filter((match, index) => {
      if (index === 0) return true;
      const prevMatch = allMatches[index - 1];
      return match.start >= prevMatch.end;
    });
    
    // Build the result
    finalMatches.forEach((match, index) => {
      // Add text before this match
      if (match.start > lastIndex) {
        parts.push(text.substring(lastIndex, match.start));
      }
      
      // Add the rendered match
      parts.push(<React.Fragment key={index}>{match.render}</React.Fragment>);
      
      lastIndex = match.end;
    });
    
    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    return parts.length > 0 ? parts : text;
  };
  
  return (
    <>
      <PreformattedText $fontSize={chatAppearance.fontSize}>
        {renderWithLinks(displayContent)}
      </PreformattedText>
      {contextMenu && (
        <PlayerContextMenu
          playerName={contextMenu.playerName}
          position={{ x: contextMenu.x, y: contextMenu.y }}
          onClose={() => setContextMenu(null)}
        />
      )}
    </>
  );
});