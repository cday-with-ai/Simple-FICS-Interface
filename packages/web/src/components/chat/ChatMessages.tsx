import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@fics/shared';
import { ChatMessage } from '@fics/shared';
import { smartScrollToBottom } from '../../utils/chatScrolling';

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${props => props.theme.spacing[2]};
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

const MessageRow = styled.div<{ $type: ChatMessage['type'] }>`
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
  
  ${props => props.$type === 'system' && `
    color: ${props.theme.colors.textSecondary};
  `}
  
  ${props => props.$type === 'whisper' && `
    color: ${props.theme.colors.primary};
  `}
  
  ${props => props.$type === 'announcement' && `
    color: ${props.theme.colors.warning};
    font-weight: ${props.theme.typography.fontWeight.semibold};
  `}
  
  ${props => props.$type === 'message' && `
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
  const { chatStore, ficsStore } = useRootStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTab = chatStore.activeTab;
  const messages = activeTab?.messages || [];
  const currentUsername = ficsStore.username || 'You';
  
  // Smart auto-scroll: only scroll to bottom when user is already at/near bottom
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      
      // Use double requestAnimationFrame to ensure DOM is fully updated
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // For console tab, always use smart scroll
          if (activeTab?.type === 'console') {
            smartScrollToBottom(container, 100); // Larger threshold for console
          } else {
            // For initial load or when switching tabs, always scroll to bottom
            if (messages.length <= 1) {
              container.scrollTop = container.scrollHeight;
            } else {
              // Use smart scroll for subsequent messages with a larger threshold
              smartScrollToBottom(container, 50);
            }
          }
        });
      });
    }
  }, [messages.length, activeTab?.type]);
  
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
      <MessagesContainer className="chat-messages-container">
        <EmptyState>No active chat</EmptyState>
      </MessagesContainer>
    );
  }

  if (messages.length === 0) {
    return (
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
      ? message.timestamp.getTime() - prevMessage.timestamp.getTime()
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
        timestamp: message.timestamp,
        messages: [message]
      });
    }
  });

  // For console tab, show raw messages without grouping
  if (activeTab.type === 'console') {
    return (
      <MessagesContainer ref={containerRef} className="chat-messages-container">
        {messages.map((message) => (
          <MessageRow 
            key={message.id}
            $type={message.type}
            onMouseEnter={() => onMessageHover?.(message.timestamp)}
            onMouseLeave={() => onMessageHover?.(null)}
          >
            {message.content}
          </MessageRow>
        ))}
      </MessagesContainer>
    );
  }

  // For other tabs, use the grouped display
  return (
    <MessagesContainer ref={containerRef} className="chat-messages-container">
      {groupedMessages.map((group, groupIndex) => {
        const firstMessage = group.messages[0];
        const isYou = group.sender.toLowerCase() === currentUsername.toLowerCase();
        
        if (firstMessage.type === 'system') {
          return (
            <SystemMessage key={groupIndex}>
              {group.messages.map(msg => msg.content).join('\n')}
            </SystemMessage>
          );
        }
        
        return (
          <MessageGroup 
            key={groupIndex}
            onMouseEnter={() => onMessageHover?.(group.timestamp)}
            onMouseLeave={() => onMessageHover?.(null)}
          >
            <MessageRow $type={firstMessage.type}>
              <Sender $isYou={isYou}>{group.sender}</Sender>
              <Content>
                {group.messages.map((msg, i) => (
                  <React.Fragment key={msg.id}>
                    {i > 0 && '\n'}
                    {msg.content}
                  </React.Fragment>
                ))}
              </Content>
            </MessageRow>
          </MessageGroup>
        );
      })}
    </MessagesContainer>
  );
});

ChatMessages.displayName = 'ChatMessages';