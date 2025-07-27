import React from 'react';
import { MessageRenderer, MessageRendererProps } from './MessageRenderer';
import { PreformattedMessageRow, CommandLink } from './MessageStyles';

export class GameNotificationRenderer extends MessageRenderer {
  readonly type = 'gameNotification';
  
  render({ message, onCommandClick }: MessageRendererProps): React.ReactNode {
    const parsedMessage = message.metadata?.parsedMessage;
    const gameNumber = parsedMessage?.metadata?.gameNumber;
    
    const handleClick = () => {
      if (gameNumber && onCommandClick) {
        onCommandClick(`observe ${gameNumber}`);
      }
    };
    
    return (
      <PreformattedMessageRow 
        $color={message.metadata?.color || undefined}
        $fontFamily={message.metadata?.fontFamily || undefined}
        $fontStyle={message.metadata?.fontStyle || undefined}
      >
        <CommandLink onClick={handleClick}>
          {message.content}
        </CommandLink>
      </PreformattedMessageRow>
    );
  }
}