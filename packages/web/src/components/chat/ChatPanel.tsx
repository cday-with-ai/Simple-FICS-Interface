import React, { useState } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@fics/shared';
import { ChatTabs } from './ChatTabs';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';

interface ChatPanelProps {
  className?: string;
  compact?: boolean;
}

const Container = styled.div<{ $compact: boolean }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.shadows.sm};
  overflow: hidden;
  min-height: ${props => props.$compact ? '200px' : '300px'};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: ${props => props.theme.spacing[2]};
  background-color: ${props => props.theme.colors.backgroundTertiary};
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const Title = styled.h3`
  margin: 0;
  font-size: ${props => props.theme.typography.fontSize.md};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text};
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
`;

export const ChatPanel: React.FC<ChatPanelProps> = observer(({ className, compact = false }) => {
  const { chatStore, ficsStore } = useRootStore();
  const [inputValue, setInputValue] = useState('');

  // Add some mock messages for testing (remove in production)
  React.useEffect(() => {
    // Add initial welcome message
    chatStore.addMessage('console', {
      channel: 'console',
      sender: 'FICS',
      content: 'Welcome to Free Internet Chess Server (FICS)',
      timestamp: new Date(),
      type: 'system'
    });

    // Create a test channel
    chatStore.createTab('channel-1', '1', 'channel');
    chatStore.addMessage('channel-1', {
      channel: 'channel-1',
      sender: 'ChessMaster',
      content: 'Anyone up for a game of blitz?',
      timestamp: new Date(Date.now() - 60000),
      type: 'message'
    });

    // Create a test private message
    chatStore.createTab('testuser', 'TestUser', 'private');
    chatStore.addMessage('testuser', {
      channel: 'testuser',
      sender: 'TestUser',
      content: 'Hey! Want to play a game?',
      timestamp: new Date(Date.now() - 30000),
      type: 'whisper'
    });
  }, [chatStore]);

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;

    // Add to history
    chatStore.addToHistory(message);
    
    // Determine if it's a command or a message
    if (message.startsWith('/') || message.startsWith('\\')) {
      // FICS command - send directly
      ficsStore.sendCommand(message.substring(1));
      
      // Add to console tab
      chatStore.addMessage('console', {
        channel: 'console',
        sender: 'You',
        content: message,
        timestamp: new Date(),
        type: 'message'
      });
    } else {
      // Regular message - determine destination
      const activeTab = chatStore.activeTab;
      if (!activeTab) return;

      if (activeTab.type === 'channel') {
        // Channel message
        ficsStore.sendCommand(`tell ${activeTab.id} ${message}`);
      } else if (activeTab.type === 'private') {
        // Private message
        ficsStore.sendCommand(`tell ${activeTab.id} ${message}`);
      } else {
        // Console - treat as command
        ficsStore.sendCommand(message);
      }

      // Add message to current tab
      chatStore.addMessage(activeTab.id, {
        channel: activeTab.id,
        sender: ficsStore.username || 'You',
        content: message,
        timestamp: new Date(),
        type: 'message'
      });
    }

    setInputValue('');
  };

  const handleHistoryNavigation = (direction: 'up' | 'down') => {
    const historicalCommand = chatStore.navigateHistory(direction);
    if (historicalCommand !== null) {
      setInputValue(historicalCommand);
    }
  };

  return (
    <Container className={className} $compact={compact}>
      {!compact && (
        <Header>
          <Title>Chat</Title>
        </Header>
      )}
      <Content>
        <ChatTabs />
        <ChatMessages />
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSendMessage}
          onHistoryNavigate={handleHistoryNavigation}
          placeholder={
            chatStore.activeTab?.type === 'channel' 
              ? `Message #${chatStore.activeTab.name}...`
              : chatStore.activeTab?.type === 'private'
              ? `Message ${chatStore.activeTab.name}...`
              : 'Enter command...'
          }
        />
      </Content>
    </Container>
  );
});

ChatPanel.displayName = 'ChatPanel';