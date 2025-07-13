import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@fics/shared';
import { ChatMessage } from '@fics/shared';
import { smartScrollToBottom } from '../../utils/chatScrolling';
import { PlayerName } from '../ui/PlayerName';
import { LinkifiedText } from '../ui/LinkifiedText';
import { FICSOutput } from '../ui/FICSOutput';

const MessagesWrapper = styled.div`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.container};
  margin: ${props => props.theme.spacing[1]};
  border: 1px solid ${props => props.theme.colors.border};
  box-shadow: ${props => props.theme.shadows.container};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: ${props => props.theme.spacing[3]};
  min-height: 0;
  
  /* Custom scrollbar */
  scrollbar-width: thin;
  scrollbar-color: ${props => props.theme.colors.border} transparent;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.colors.border};
    border-radius: 4px;
    
    &:hover {
      background-color: ${props => props.theme.colors.borderHover};
    }
  }
`;

const Timestamp = styled.span`
  color: ${props => props.theme.colors.textTertiary};
  font-size: 10px;
  flex-shrink: 0;
  user-select: none;
  opacity: 0;
  transition: opacity 0.2s ease;
  min-width: 50px;
`;

const MessageGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing[1]};
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &:hover ${Timestamp} {
    opacity: 1;
  }
`;

const InlineMessageRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${props => props.theme.spacing[1]};
`;

const MessageRow = styled.div<{ $type: ChatMessage['type']; $color?: string }>`
  display: flex;
  align-items: baseline;
  gap: ${props => props.theme.spacing[1]};
  font-size: 11px;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  line-height: 1.3;
  white-space: pre-wrap;
  word-break: break-all;
  position: relative;
  flex: 1;
  
  ${props => props.$color ? `
    color: ${props.$color} !important;
  ` : props.$type === 'system' ? `
    color: ${props.theme.colors.textSecondary};
  ` : props.$type === 'whisper' ? `
    color: ${props.theme.colors.primary};
  ` : props.$type === 'announcement' ? `
    color: ${props.theme.colors.warning};
    font-weight: ${props.theme.typography.fontWeight.semibold};
  ` : `
    color: ${props.theme.colors.text};
  `}
`;

const ConsoleMessageWrapper = styled.div`
  position: relative;
  
  &:hover ${Timestamp} {
    opacity: 1;
  }
`;

const ConsoleTimestamp = styled(Timestamp)`
  position: absolute;
  left: 0;
  top: 0;
  background: ${props => props.theme.colors.background};
  padding: 0 4px;
  z-index: 1;
  font-weight: ${props => props.theme.typography.fontWeight.bold};
`;

const Sender = styled.span<{ $isYou?: boolean }>`
  color: ${props => props.$isYou 
    ? props.theme.colors.primary 
    : props.theme.colors.text
  };
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  flex-shrink: 0;
  
  &::after {
    content: ':';
  }
`;

const Content = styled.span`
  word-break: break-word;
  white-space: pre-wrap;
  flex: 1;
`;

const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${props => props.theme.colors.textTertiary};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-style: italic;
`;

const SystemMessage = styled.div`
  color: ${props => props.theme.colors.textSecondary};
  font-style: italic;
  text-align: center;
  margin: ${props => props.theme.spacing[2]} 0;
  font-size: ${props => props.theme.typography.fontSize.sm};
`;

const formatTimestamp = (timestamp: Date | string | number): string => {
  // Ensure we have a Date object
  let date: Date;
  
  if (timestamp instanceof Date) {
    date = timestamp;
  } else {
    // Convert string or number to Date
    date = new Date(timestamp);
  }
  
  // Check if the date is valid
  if (isNaN(date.getTime())) {
    console.error('Invalid timestamp:', timestamp);
    return 'Invalid time';
  }
  
  // Use local time formatting
  return date.toLocaleTimeString();
};

interface ChatMessagesProps {
  onMessageHover?: (timestamp: Date | string | number | null) => void;
}

export const ChatMessages: React.FC<ChatMessagesProps> = observer(({ onMessageHover }) => {
  const { chatStore, ficsStore, preferencesStore } = useRootStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTab = chatStore.activeTab;
  const messages = activeTab?.messages || [];
  const currentUsername = ficsStore.username || 'You';
  
  // Handler for clicking FICS commands in messages
  const handleCommandClick = (command: string) => {
    ficsStore.sendCommand(command);
  };
  
  // Auto-scroll effect - use a key that changes with messages
  useEffect(() => {
    if (containerRef.current && messages.length > 0) {
      const container = containerRef.current;
      
      // Small delay to ensure render is complete
      const timeoutId = setTimeout(() => {
        if (activeTab?.type === 'console') {
          // For console, always scroll to bottom
          container.scrollTop = container.scrollHeight;
        } else {
          // For other tabs, use smart scroll
          smartScrollToBottom(container, 50);
        }
      }, 50);
      
      return () => clearTimeout(timeoutId);
    }
  }, [messages.length, messages[messages.length - 1]?.id]); // Depend on last message ID
  
  // Also scroll to bottom when switching tabs
  useEffect(() => {
    if (containerRef.current && messages.length > 0) {
      const container = containerRef.current;
      requestAnimationFrame(() => {
        // Always scroll to bottom when switching to a different tab
        container.scrollTop = container.scrollHeight;
      });
    }
  }, [activeTab?.id]);

  if (!activeTab) {
    return (
      <MessagesWrapper>
        <MessagesContainer className="chat-messages-container">
          <EmptyState>No active chat</EmptyState>
        </MessagesContainer>
      </MessagesWrapper>
    );
  }

  if (messages.length === 0) {
    return (
      <MessagesWrapper>
        <MessagesContainer className="chat-messages-container">
          <EmptyState>
            {activeTab.type === 'channel' 
              ? `No messages in (${activeTab.name}) yet`
              : activeTab.type === 'private'
              ? `No messages with ${activeTab.name} yet`
              : 'Connecting to freechess.org...'
            }
          </EmptyState>
        </MessagesContainer>
      </MessagesWrapper>
    );
  }

  // Group consecutive messages from the same sender
  const groupedMessages: Array<{
    sender: string;
    timestamp: Date;
    messages: ChatMessage[];
  }> = [];

  messages.forEach((message, index) => {
    const prevMessage = index > 0 ? messages[index - 1] : null;
    const timeDiff = prevMessage 
      ? new Date(message.timestamp).getTime() - new Date(prevMessage.timestamp).getTime()
      : Infinity;
    
    if (
      prevMessage &&
      prevMessage.sender === message.sender &&
      prevMessage.type === message.type &&
      timeDiff < 60000 // Within 1 minute
    ) {
      // Add to existing group
      groupedMessages[groupedMessages.length - 1].messages.push(message);
    } else {
      // Create new group
      groupedMessages.push({
        sender: message.sender,
        timestamp: new Date(message.timestamp),
        messages: [message]
      });
    }
  });

  // For console tab, show raw messages without grouping
  if (activeTab.type === 'console') {
    return (
      <MessagesWrapper>
        <MessagesContainer ref={containerRef} className="chat-messages-container">
          {messages.map((message) => {
          // Get console color if metadata is present
          let messageColor: string | undefined;
          if (message.metadata?.consoleType) {
            const color = preferencesStore.getConsoleColor(
              message.metadata.consoleType,
              message.metadata.channelNumber
            );
            if (color) {
              messageColor = color;
            }
            
          }
          
          return (
            <MessageRow 
              key={message.id}
              $type={message.type}
              $color={messageColor}
              onMouseEnter={() => onMessageHover?.(message.timestamp)}
              onMouseLeave={() => onMessageHover?.(null)}
            >
              {messageColor ? (
                <span style={{ color: messageColor }}>
                  <LinkifiedText text={message.content} onCommandClick={handleCommandClick} />
                </span>
              ) : (
                <LinkifiedText text={message.content} onCommandClick={handleCommandClick} />
              )}
            </MessageRow>
          );
        })}
        </MessagesContainer>
      </MessagesWrapper>
    );
  }

  // For other tabs, use the grouped display
  return (
    <MessagesWrapper>
      <MessagesContainer ref={containerRef} className="chat-messages-container">
        {groupedMessages.map((group, groupIndex) => {
        const firstMessage = group.messages[0];
        const isYou = group.sender.toLowerCase() === currentUsername.toLowerCase();
        
        if (firstMessage.type === 'system') {
          return (
            <SystemMessage key={groupIndex}>
              {group.messages.map((msg, i) => (
                <React.Fragment key={msg.id}>
                  {i > 0 && '\n'}
                  <LinkifiedText text={msg.content} onCommandClick={handleCommandClick} />
                </React.Fragment>
              ))}
            </SystemMessage>
          );
        }
        
        // Get channel color if this is a channel message
        let messageColor: string | undefined;
        if (activeTab.type === 'channel' && firstMessage.metadata?.consoleType === 'channel') {
          const color = preferencesStore.getConsoleColor(
            firstMessage.metadata.consoleType,
            firstMessage.metadata.channelNumber
          );
          if (color) {
            messageColor = color;
          }
        }
        
        return (
          <MessageGroup 
            key={groupIndex}
            onMouseEnter={() => onMessageHover?.(group.timestamp)}
            onMouseLeave={() => onMessageHover?.(null)}
          >
            <MessageRow $type={firstMessage.type} $color={messageColor}>
              <Sender $isYou={isYou}>
                {isYou ? group.sender : <PlayerName name={group.sender} />}
              </Sender>
              <Content>
                {group.messages.map((msg, i) => (
                  <React.Fragment key={msg.id}>
                    {i > 0 && '\n'}
                    <LinkifiedText text={msg.content} />
                  </React.Fragment>
                ))}
              </Content>
            </MessageRow>
          </MessageGroup>
        );
      })}
      </MessagesContainer>
    </MessagesWrapper>
  );
});

ChatMessages.displayName = 'ChatMessages';