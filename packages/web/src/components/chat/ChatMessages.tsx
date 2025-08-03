import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@fics/shared';
import { ChatMessage } from '@fics/shared';
import { smartScrollToBottom } from '../../utils/chatScrolling';
import { Message } from './Message';
import './renderers'; // Import to register all renderers

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
  
  /* Enable momentum scrolling on iOS */
  -webkit-overflow-scrolling: touch;
  
  /* Custom scrollbar */
  scrollbar-width: thin;
  scrollbar-color: ${props => props.theme.colors.border} transparent;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  @media (max-width: 768px) {
    &::-webkit-scrollbar {
      width: 4px;
    }
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
  
  @media (max-width: 768px) {
    padding-bottom: calc(${props => props.theme.spacing[3]} + 100px + env(safe-area-inset-bottom, 8px));
  }
`;

const MessageGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing[1]};
  min-width: 0;
  width: 100%;
  
  &:last-child {
    margin-bottom: 0;
  }
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

const MessageWrapper = styled.div`
  margin-bottom: 2px;
  
  &:last-child {
    margin-bottom: 0;
  }
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
  
  // Scroll to bottom when historical messages are loaded
  useEffect(() => {
    if (containerRef.current && activeTab?.lastHistoryLoad) {
      const container = containerRef.current;
      requestAnimationFrame(() => {
        container.scrollTop = container.scrollHeight;
      });
    }
  }, [activeTab?.lastHistoryLoad]);

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
          {messages.map((message) => (
            <MessageWrapper key={message.id}>
              <Message
                message={message}
                currentUsername={currentUsername}
                onCommandClick={handleCommandClick}
                onHover={onMessageHover}
              />
            </MessageWrapper>
          ))}
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
          
          if (firstMessage.type === 'system') {
            return (
              <SystemMessage key={groupIndex}>
                {group.messages.map((msg) => (
                  <MessageWrapper key={msg.id}>
                    <Message
                      message={msg}
                      currentUsername={currentUsername}
                      onCommandClick={handleCommandClick}
                      onHover={onMessageHover}
                    />
                  </MessageWrapper>
                ))}
              </SystemMessage>
            );
          }
          
          return (
            <MessageGroup key={groupIndex}>
              {group.messages.map((msg, i) => {
                // For grouped messages, we only show subsequent messages' content
                // The first message shows sender info
                if (i === 0) {
                  return (
                    <MessageWrapper key={msg.id}>
                      <Message
                        message={msg}
                        currentUsername={currentUsername}
                        onCommandClick={handleCommandClick}
                        onHover={onMessageHover}
                      />
                    </MessageWrapper>
                  );
                } else {
                  // For subsequent messages in a group, create a content-only message
                  const contentOnlyMessage = {
                    ...msg,
                    sender: '', // Hide sender for grouped messages
                    metadata: {
                      ...msg.metadata,
                      isGroupedMessage: true
                    }
                  };
                  return (
                    <MessageWrapper key={msg.id}>
                      <Message
                        message={contentOnlyMessage}
                        currentUsername={currentUsername}
                        onCommandClick={handleCommandClick}
                        onHover={onMessageHover}
                      />
                    </MessageWrapper>
                  );
                }
              })}
            </MessageGroup>
          );
        })}
      </MessagesContainer>
    </MessagesWrapper>
  );
});

ChatMessages.displayName = 'ChatMessages';