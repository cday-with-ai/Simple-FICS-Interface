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
    
    // For channel tabs, we need to show clean message content but still allow URLs
    const isChannelTab = message.channel?.startsWith('channel-');
    const messageContent = parsedMessage?.metadata?.message || message.content;
    
    // For grouped messages, only show content
    if (isGroupedMessage || !message.sender) {
      return (
        <MessageRow 
          $color={message.metadata?.color || undefined}
          $fontFamily={message.metadata?.fontFamily || undefined}
          $fontStyle={message.metadata?.fontStyle || undefined}
        >
          <MessageSpacer />
          <Content>
            <InteractiveContent
              content={messageContent}
              elements={isChannelTab ? [] : parsedMessage?.elements}
              onCommandClick={onCommandClick}
            />
          </Content>
        </MessageRow>
      );
    }
    
    return (
      <MessageRow 
        $color={message.metadata?.color || undefined}
        $fontFamily={message.metadata?.fontFamily || undefined}
        $fontStyle={message.metadata?.fontStyle || undefined}
        data-settings="chat"
        className="channel-tell-message"
      >
        <Sender $isYou={isYou}>
          {isYou ? message.sender : <PlayerName name={message.sender} />}
        </Sender>
        <Content>
          <InteractiveContent
            content={messageContent}
            elements={[]} // Always use empty elements array to trigger auto-detection
            onCommandClick={onCommandClick}
          />
        </Content>
      </MessageRow>
    );
  }
}