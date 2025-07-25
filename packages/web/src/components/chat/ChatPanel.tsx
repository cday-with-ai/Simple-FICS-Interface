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
  overflow: hidden;
  min-height: ${props => props.$compact ? '200px' : '300px'};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const HeaderTimestamp = styled.span`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
  margin-left: auto;
`;

const PingDisplay = styled.span`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textSecondary};
  margin-left: auto;
  margin-right: ${props => props.theme.spacing[4]};
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
  padding: ${props => props.theme.spacing[2]};
  padding-top: 0;
  padding-bottom: 0;
  
  @media (max-width: 768px) {
    height: calc(100vh - 180px);
    max-height: calc(100vh - 180px);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
`;

export const ChatPanel: React.FC<ChatPanelProps> = observer(({ className, compact = false }) => {
  const { chatStore, ficsStore, preferencesStore } = useRootStore();
  const [inputValue, setInputValue] = useState('');
  const [isWaitingForPassword, setIsWaitingForPassword] = useState(false);
  const [hoveredMessageTime, setHoveredMessageTime] = useState<Date | string | number | null>(null);

  // Auto-connect to FICS on mount
  React.useEffect(() => {
    if (!ficsStore.connected && !ficsStore.connecting) {
      console.log('Auto-connecting to FICS...');
      ficsStore.connect();
    }
  }, [ficsStore]);
  

  // Monitor FICS errors
  React.useEffect(() => {
    if (ficsStore.error) {
      chatStore.addMessage('console', {
        channel: 'console',
        sender: 'System',
        content: `Error: ${ficsStore.error}`,
        timestamp: new Date(),
        type: 'system'
      });
    }
  }, [ficsStore.error, chatStore]);

  const handleSendMessage = (message: string) => {
    console.log('handleSendMessage called with:', message, 'Length:', message.length);
    if (!message.trim()) return;

    // Add to history
    chatStore.addToHistory(message);
    
    // Handle special local commands (only /help now)
    if (message === '/help' || message === '\\help') {
      chatStore.addMessage('console', {
        channel: 'console',
        sender: 'You',
        content: message,
        timestamp: new Date(),
        type: 'message'
      });
      
      chatStore.addMessage('console', {
        channel: 'console',
        sender: 'System',
        content: `FICS Commands:
guest - Login as guest
<username> - Login with username (will prompt for password)
tell <user> <message> - Send private message
tell <channel> <message> - Send channel message
who - List online users
games - List current games
observe <game> - Observe a game
seek <time> <inc> - Seek a game
quit - Disconnect from FICS

Local commands:
/help - Show this help`,
        timestamp: new Date(),
        type: 'system'
      });
      setInputValue('');
      return;
    }
    
    // Determine if it's a command or a message
    if (message.startsWith('/') || message.startsWith('\\')) {
      // Command prefix - strip it and send
      const command = message.substring(1);
      
      // Show in console
      chatStore.addMessage('console', {
        channel: 'console',
        sender: 'You',
        content: message,
        timestamp: new Date(),
        type: 'message'
      });
      
      ficsStore.sendCommand(command);
    } else {
      // Regular message - determine destination based on active tab
      const activeTab = chatStore.activeTab;
      if (!activeTab) return;

      if (activeTab.type === 'channel') {
        // Channel message - send as "tell <channel> <message>"
        const channelNum = activeTab.id.replace('channel-', '');
        
        // Don't add the message here - FICS will echo it back
        // and the ChannelTellParser will add it to the tab
        
        ficsStore.sendCommand(`tell ${channelNum} ${message}`);
      } else if (activeTab.type === 'private') {
        // Private message - send as "tell <user> <message>"
        
        // Show in private tab
        chatStore.addMessage(activeTab.id, {
          channel: activeTab.id,
          sender: 'You',
          content: message,
          timestamp: new Date(),
          type: 'message'
        });
        
        ficsStore.sendCommand(`tell ${activeTab.id} ${message}`);
      } else {
        // Console - check if it's a tell command
        const tellMatch = message.match(/^tell\s+(\w+)\s+(.+)$/);
        
        if (tellMatch && preferencesStore.preferences.openTellsInTabs) {
          const [, username, tellMessage] = tellMatch;
          const cleanUsername = username.replace(/\([^)]*\)/g, '').trim();
          const privateTabId = cleanUsername.toLowerCase();
          
          // Create tab if it doesn't exist
          chatStore.createTab(privateTabId, cleanUsername, 'private');
          
          // Add message to the private tab
          chatStore.addMessage(privateTabId, {
            channel: privateTabId,
            sender: 'You',
            content: tellMessage,
            timestamp: new Date(),
            type: 'message'
          });
        } else {
          // Show in console for other commands
          chatStore.addMessage('console', {
            channel: 'console',
            sender: 'You',
            content: message,
            timestamp: new Date(),
            type: 'message'
          });
        }
        
        ficsStore.sendCommand(message);
      }
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
          {ficsStore.averagePing !== null && (
            <PingDisplay>
              Ping: {ficsStore.averagePing}ms
            </PingDisplay>
          )}
          {hoveredMessageTime && (
            <HeaderTimestamp>
              Received: {new Date(hoveredMessageTime).toLocaleTimeString()}
            </HeaderTimestamp>
          )}
        </Header>
      )}
      <Content>
        <ChatTabs />
        <ChatMessages onMessageHover={setHoveredMessageTime} />
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSendMessage}
          onHistoryNavigate={handleHistoryNavigation}
          placeholder={
            chatStore.activeTab?.type === 'channel' 
              ? `tell ${chatStore.activeTab.name} ...`
              : chatStore.activeTab?.type === 'private'
              ? `tell ${chatStore.activeTab.name} ...`
              : 'Enter command...'
          }
        />
      </Content>
    </Container>
  );
});

ChatPanel.displayName = 'ChatPanel';