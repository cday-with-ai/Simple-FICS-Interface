import React from 'react';
import { MessageRenderer, MessageRendererProps } from './MessageRenderer';
import { MessageRow, Sender, Content, MessageSpacer } from './MessageStyles';
import { InteractiveContent } from './InteractiveContent';
import { PlayerName } from '../../ui/PlayerName';

export class DirectTellRenderer extends MessageRenderer {
  readonly type = 'directTell';
  
  render({ message, currentUsername, onCommandClick }: MessageRendererProps): React.ReactNode {
    const isYou = message.sender.toLowerCase() === currentUsername.toLowerCase();
    const parsedMessage = message.metadata?.parsedMessage;
    const isGroupedMessage = message.metadata?.isGroupedMessage;
    
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
            <InteractiveContent
              content={parsedMessage?.metadata?.message || message.content}
              elements={parsedMessage?.elements}
              onCommandClick={onCommandClick}
            />
          </Content>
        </MessageRow>
      );
    }
    
    return (
      <MessageRow 
        $color={message.metadata?.color}
        $fontFamily={message.metadata?.fontFamily}
        $fontStyle={message.metadata?.fontStyle}
      >
        <Sender $isYou={isYou}>
          {isYou ? message.sender : <PlayerName name={message.sender} />}
        </Sender>
        <Content>
          <InteractiveContent
            content={parsedMessage?.metadata?.message || message.content}
            elements={parsedMessage?.elements}
            onCommandClick={onCommandClick}
          />
        </Content>
      </MessageRow>
    );
  }
}