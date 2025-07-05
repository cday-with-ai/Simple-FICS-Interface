import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@fics/shared';
import { ChatMessage } from '@fics/shared';

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

const MessageGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing[3]};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const MessageRow = styled.div<{ $type: ChatMessage['type'] }>`
  display: flex;
  gap: ${props => props.theme.spacing[2]};
  align-items: baseline;
  margin-bottom: ${props => props.theme.spacing[1]};
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-family: ${props => props.theme.typography.fontFamilyMono};
  
  ${props => props.$type === 'system' && `
    color: ${props.theme.colors.textSecondary};
    font-style: italic;
  `}
  
  ${props => props.$type === 'whisper' && `
    color: ${props.theme.colors.primary};
  `}
  
  ${props => props.$type === 'announcement' && `
    color: ${props.theme.colors.warning};
    font-weight: ${props.theme.typography.fontWeight.semibold};
  `}
`;

const Timestamp = styled.span`
  color: ${props => props.theme.colors.textTertiary};
  font-size: ${props => props.theme.typography.fontSize.xs};
  flex-shrink: 0;
  user-select: none;
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

const formatTimestamp = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

export const ChatMessages: React.FC = observer(() => {
  const { chatStore, ficsStore } = useRootStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTab = chatStore.activeTab;
  const messages = activeTab?.messages || [];
  const currentUsername = ficsStore.username || 'You';
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const isScrolledToBottom = 
        container.scrollHeight - container.scrollTop <= container.clientHeight + 50;
      
      if (isScrolledToBottom) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [messages.length]);

  if (!activeTab) {
    return (
      <MessagesContainer>
        <EmptyState>No active chat</EmptyState>
      </MessagesContainer>
    );
  }

  if (messages.length === 0) {
    return (
      <MessagesContainer>
        <EmptyState>
          {activeTab.type === 'channel' 
            ? `No messages in #${activeTab.name} yet`
            : activeTab.type === 'private'
            ? `No messages with ${activeTab.name} yet`
            : 'No messages yet'
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

  return (
    <MessagesContainer ref={containerRef}>
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
          <MessageGroup key={groupIndex}>
            <MessageRow $type={firstMessage.type}>
              <Timestamp>{formatTimestamp(group.timestamp)}</Timestamp>
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