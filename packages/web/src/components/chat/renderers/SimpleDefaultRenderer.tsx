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
  text-decoration: none;
  background: none;
  border: none;
  padding: 4px 8px;
  font-size: inherit;
  font-family: inherit;
  display: inline-block;
  
  &:hover {
    text-decoration: underline;
    background-color: ${props => props.theme.colors.backgroundSecondary};
    border-radius: 4px;
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
    console.log('Load more clicked, metadata:', message.metadata);
    const channelNumber = parseInt(message.metadata?.channelNumber || '0');
    console.log('Channel number:', channelNumber);
    if (channelNumber > 0) {
      console.log('Loading more messages for channel:', channelNumber);
      chatStore.loadMoreHistoricalMessages(channelNumber);
    } else {
      console.error('Invalid channel number:', channelNumber);
    }
  };
  
  // Debug: log when component mounts
  React.useEffect(() => {
    console.log('LoadMoreRenderer mounted with message:', message);
  }, []);
  
  return (
    <LoadMoreLink 
      onClick={handleClick}
      onMouseDown={(e) => console.log('Mouse down on load more')}
      type="button"
    >
      {message.content}
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