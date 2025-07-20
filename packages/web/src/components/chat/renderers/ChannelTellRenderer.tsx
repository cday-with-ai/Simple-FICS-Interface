import React from 'react';
import { MessageRenderer, MessageRendererProps } from './MessageRenderer';
import { MessageRow, Sender, Content, MessageSpacer } from './MessageStyles';
import { InteractiveContent } from './InteractiveContent';
import { PlayerName } from '../../ui/PlayerName';

export class ChannelTellRenderer extends MessageRenderer {
  readonly type = 'channelTell';
  
  render({ message, currentUsername, onCommandClick }: MessageRendererProps): React.ReactNode {
    const isYou = message.sender.toLowerCase() === currentUsername.toLowerCase();
    const parsedMessage = message.metadata?.parsedMessage;
    const isGroupedMessage = message.metadata?.isGroupedMessage;
    
    // For channel tabs, we need to show clean message content without interactive elements
    // to avoid the InteractiveContent component detecting channel patterns in the message itself
    const isChannelTab = message.channel?.startsWith('channel-');
    const messageContent = parsedMessage?.metadata?.message || message.content;
    
    // For grouped messages, only show content
    if (isGroupedMessage || !message.sender) {
      return (
        <MessageRow 
          $color={message.metadata?.color}
          $fontFamily={message.metadata?.fontFamily}
          $fontStyle={message.metadata?.fontStyle}
        >
          <MessageSpacer />
          <Content>
            {isChannelTab ? (
              <span style={{ whiteSpace: 'pre-wrap' }}>{messageContent}</span>
            ) : (
              <InteractiveContent
                content={messageContent}
                elements={parsedMessage?.elements}
                onCommandClick={onCommandClick}
              />
            )}
          </Content>
        </MessageRow>
      );
    }
    
    return (
      <MessageRow 
        $color={message.metadata?.color}
        $fontFamily={message.metadata?.fontFamily}
        $fontStyle={message.metadata?.fontStyle}
        data-settings="chat"
        className="channel-tell-message"
      >
        <Sender $isYou={isYou}>
          {isYou ? message.sender : <PlayerName name={message.sender} />}
        </Sender>
        <Content>
          {isChannelTab ? (
            <span style={{ whiteSpace: 'pre-wrap' }}>{messageContent}</span>
          ) : (
            <InteractiveContent
              content={messageContent}
              elements={[]} // Don't use elements for channel tabs - positions are wrong
              onCommandClick={onCommandClick}
            />
          )}
        </Content>
      </MessageRow>
    );
  }
}