import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { useBackendStore } from '@fics/shared';
import { ChannelMessage } from '@fics/shared';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  padding: 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.1rem;
`;

const ChannelSelector = styled.select`
  background: ${props => props.theme.colors.backgroundSecondary};
  color: ${props => props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.border};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MessageItem = styled.div`
  padding: 0.5rem;
  background: ${props => props.theme.colors.surface};
  border-radius: 4px;
  border-left: 3px solid ${props => props.theme.colors.primary};
`;

const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
  font-size: 0.85rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const Username = styled.span`
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
`;

const Timestamp = styled.span`
  font-size: 0.8rem;
`;

const MessageText = styled.div`
  font-size: 0.9rem;
  line-height: 1.4;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${props => props.theme.colors.error};
`;

const LoadMoreButton = styled.button`
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin: 1rem auto;
  display: block;
  font-size: 0.9rem;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const BackendStatus = styled.div<{ $healthy: boolean }>`
  font-size: 0.8rem;
  color: ${props => props.$healthy ? props.theme.colors.success : props.theme.colors.error};
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const StatusDot = styled.div<{ $healthy: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.$healthy ? props.theme.colors.success : props.theme.colors.error};
`;

const MONITORED_CHANNELS = [39, 49, 50, 10, 1, 2, 36, 37, 38, 40];

export const ChannelHistory = observer(() => {
  const backendStore = useBackendStore();
  const [selectedChannel, setSelectedChannel] = useState(39); // Default to channel 39
  const [offset, setOffset] = useState(0);
  const limit = 50;

  useEffect(() => {
    // Load initial messages for selected channel
    backendStore.loadChannelMessages(selectedChannel, limit, offset);
  }, [selectedChannel, backendStore]);

  const handleChannelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const channel = parseInt(e.target.value);
    setSelectedChannel(channel);
    setOffset(0);
  };

  const handleLoadMore = () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
    backendStore.loadChannelMessages(selectedChannel, limit, newOffset);
  };

  const messages = backendStore.getChannelMessages(selectedChannel);
  const isLoading = backendStore.isChannelLoading(selectedChannel);
  const error = backendStore.getChannelError(selectedChannel);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderMessage = (message: ChannelMessage) => (
    <MessageItem key={message.id}>
      <MessageHeader>
        <Username>{message.username}</Username>
        <Timestamp>{formatTimestamp(message.timestamp)}</Timestamp>
      </MessageHeader>
      <MessageText>{message.message}</MessageText>
    </MessageItem>
  );

  return (
    <Container>
      <Header>
        <Title>Channel History</Title>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <ChannelSelector value={selectedChannel} onChange={handleChannelChange}>
            {MONITORED_CHANNELS.map(channel => (
              <option key={channel} value={channel}>
                Channel {channel}
              </option>
            ))}
          </ChannelSelector>
          <BackendStatus $healthy={backendStore.isBackendHealthy}>
            <StatusDot $healthy={backendStore.isBackendHealthy} />
            {backendStore.isBackendHealthy ? 'Connected' : 'Disconnected'}
          </BackendStatus>
        </div>
      </Header>

      <MessagesContainer>
        {error && <ErrorMessage>Error: {error}</ErrorMessage>}
        
        {!error && messages.length === 0 && !isLoading && (
          <LoadingMessage>No messages found for this channel.</LoadingMessage>
        )}
        
        {messages.map(renderMessage)}
        
        {isLoading && <LoadingMessage>Loading messages...</LoadingMessage>}
        
        {!isLoading && messages.length > 0 && messages.length >= offset + limit && (
          <LoadMoreButton onClick={handleLoadMore} disabled={isLoading}>
            Load More
          </LoadMoreButton>
        )}
      </MessagesContainer>
    </Container>
  );
});