import React from 'react';
import { MessageRenderer, MessageRendererProps } from './MessageRenderer';
import { SimpleFicsRenderer } from './SimpleFicsRenderer';
import styled from 'styled-components';
import { useRootStore } from '@fics/shared';

const MessageContainer = styled.div`
  margin: 0;
  position: relative;
  z-index: 1;
`;

const LoadMoreLink = styled.button`
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
  background: ${props => props.theme.colors.backgroundSecondary};
  border: 1px solid ${props => props.theme.colors.primary};
  padding: 8px 16px;
  font-size: inherit;
  font-family: inherit;
  display: inline-block;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
  
  &:focus {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
  }
`;

const LoadMoreRenderer: React.FC<{ message: any }> = ({ message }) => {
  const { chatStore } = useRootStore();
  
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('🔵 Load more clicked!');
    console.log('Message:', message);
    console.log('Metadata:', message.metadata);
    
    const channelNumber = message.metadata?.channelNumber;
    console.log('Raw channel number:', channelNumber, 'Type:', typeof channelNumber);
    
    const parsedChannelNumber = typeof channelNumber === 'string' ? parseInt(channelNumber) : channelNumber;
    console.log('Parsed channel number:', parsedChannelNumber);
    
    if (parsedChannelNumber && parsedChannelNumber > 0) {
      console.log('✅ Loading more messages for channel:', parsedChannelNumber);
      try {
        chatStore.loadMoreHistoricalMessages(parsedChannelNumber);
      } catch (error) {
        console.error('❌ Error loading more messages:', error);
      }
    } else {
      console.error('❌ Invalid channel number:', channelNumber, 'parsed as:', parsedChannelNumber);
    }
  };
  
  // Debug: log when component mounts
  React.useEffect(() => {
    console.log('🟢 LoadMoreRenderer mounted');
    console.log('Message:', message);
    console.log('Metadata:', message.metadata);
    console.log('Channel number:', message.metadata?.channelNumber);
  }, []);
  
  return (
    <LoadMoreLink 
      onClick={handleClick}
      onMouseDown={(e) => console.log('Mouse down on load more')}
      type="button"
    >
      📜 Load earlier messages
    </LoadMoreLink>
  );
};

export class SimpleDefaultRenderer extends MessageRenderer {
  readonly type = 'default';
  
  canRender(): boolean {
    // Default renderer can handle any message as fallback
    return true;
  }
  
  render({ message }: MessageRendererProps): React.ReactNode {
    // Debug: log all system messages
    if (message.type === 'system') {
      console.log('System message:', message.content, 'isLoadMore:', message.metadata?.isLoadMore, 'metadata:', message.metadata);
    }
    
    // Check if this is a "load more" message
    if (message.metadata?.isLoadMore) {
      console.log('Rendering LoadMoreRenderer for message:', message);
      return (
        <MessageContainer>
          <LoadMoreRenderer message={message} />
        </MessageContainer>
      );
    }
    
    // Just render the raw FICS content with our simple renderer
    // Pass elements from parsed message if available
    const elements = message.metadata?.parsedMessage?.elements;
    return (
      <MessageContainer>
        <SimpleFicsRenderer content={message.content} elements={elements} />
      </MessageContainer>
    );
  }
}