import React from 'react';
import { MessageRenderer, MessageRendererProps } from './MessageRenderer';
import { PreformattedMessageRow, CommandLink } from './MessageStyles';
import { InteractiveContent } from './InteractiveContent';

// Base class for console messages
abstract class ConsoleRenderer extends MessageRenderer {
  render({ message, onCommandClick }: MessageRendererProps): React.ReactNode {
    const parsedMessage = message.metadata?.parsedMessage;
    
    
    return (
      <PreformattedMessageRow 
        $color={message.metadata?.color || undefined}
        $fontFamily={message.metadata?.fontFamily || undefined}
        $fontStyle={message.metadata?.fontStyle || undefined}
      >
        <InteractiveContent
          content={parsedMessage?.content || message.content}
          elements={parsedMessage?.elements || []}
          onCommandClick={onCommandClick}
        />
      </PreformattedMessageRow>
    );
  }
}

export class ShoutRenderer extends ConsoleRenderer {
  readonly type = 'shout';
}

export class CShoutRenderer extends ConsoleRenderer {
  readonly type = 'cshout';
}

export class NotificationRenderer extends ConsoleRenderer {
  readonly type = 'notification';
}

export class SeekAnnouncementRenderer extends ConsoleRenderer {
  readonly type = 'seekAnnouncement';
}

export class MatchRequestRenderer extends ConsoleRenderer {
  readonly type = 'matchRequest';
}

export class IllegalMoveRenderer extends ConsoleRenderer {
  readonly type = 'illegalMove';
}

export class DrawOfferRenderer extends ConsoleRenderer {
  readonly type = 'drawOffer';
}

export class UnobserveRenderer extends ConsoleRenderer {
  readonly type = 'unobserve';
}

export class GameNotificationRenderer extends ConsoleRenderer {
  readonly type = 'gameNotification';
}

// Command output renderers
export class WhoOutputRenderer extends ConsoleRenderer {
  readonly type = 'whoOutput';
}

export class GamesOutputRenderer extends ConsoleRenderer {
  readonly type = 'gamesOutput';
}

export class FingerOutputRenderer extends ConsoleRenderer {
  readonly type = 'fingerOutput';
}

export class HistoryOutputRenderer extends MessageRenderer {
  readonly type = 'historyOutput';
  
  render({ message, onCommandClick }: MessageRendererProps): React.ReactNode {
    const content = message.content;
    const metadata = message.metadata?.parsedMessage?.metadata as any;
    const player = metadata?.player || '';
    
    // Split content into lines
    const lines = content.split('\n');
    
    return (
      <PreformattedMessageRow 
        $color={message.metadata?.color || undefined}
        $fontFamily={message.metadata?.fontFamily || undefined}
        $fontStyle={message.metadata?.fontStyle || undefined}
      >
        {lines.map((line, index) => {
          // Check if this line is a history entry (starts with a number and colon)
          const entryMatch = line.match(/^(\d+):/);
          if (entryMatch && onCommandClick) {
            const gameNumber = entryMatch[1];
            return (
              <React.Fragment key={index}>
                <CommandLink 
                  onClick={() => onCommandClick(`examine ${player} ${gameNumber}`)}
                  style={{ display: 'block' }}
                >
                  {line}
                </CommandLink>
              </React.Fragment>
            );
          }
          return (
            <React.Fragment key={index}>
              {line}
              {index < lines.length - 1 && '\n'}
            </React.Fragment>
          );
        })}
      </PreformattedMessageRow>
    );
  }
}

export class JournalOutputRenderer extends ConsoleRenderer {
  readonly type = 'journalOutput';
}

export class SoughtOutputRenderer extends ConsoleRenderer {
  readonly type = 'soughtOutput';
}

export class ChannelListOutputRenderer extends ConsoleRenderer {
  readonly type = 'channelListOutput';
}

export class NewsOutputRenderer extends ConsoleRenderer {
  readonly type = 'newsOutput';
}

export class InOutputRenderer extends ConsoleRenderer {
  readonly type = 'inOutput';
}

// System message renderers
export class LoginRenderer extends ConsoleRenderer {
  readonly type = 'login';
}

export class PasswordRenderer extends ConsoleRenderer {
  readonly type = 'password';
}

export class GuestLoginConfirmationRenderer extends ConsoleRenderer {
  readonly type = 'guestLoginConfirmation';
}

export class SessionStartRenderer extends ConsoleRenderer {
  readonly type = 'sessionStart';
}

export class SystemRenderer extends ConsoleRenderer {
  readonly type = 'system';
}

export class RawRenderer extends ConsoleRenderer {
  readonly type = 'raw';
}