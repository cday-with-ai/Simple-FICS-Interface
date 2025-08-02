import React from 'react';
import { MessageRenderer, MessageRendererProps } from './MessageRenderer';
import { SimpleFicsRenderer } from './SimpleFicsRenderer';

// Base class for simple console renderers
abstract class SimpleConsoleRendererBase extends MessageRenderer {
  render({ message }: MessageRendererProps): React.ReactNode {
    // Use the raw content, preserving FICS formatting
    // Pass elements from parsed message if available
    const elements = message.metadata?.parsedMessage?.elements;
    if (message.metadata?.consoleType === 'gamesOutput' && message.metadata?.parsedMessage) {
      console.log('[SimpleConsoleRenderer] gamesOutput metadata:', message.metadata);
    }
    return <SimpleFicsRenderer content={message.content} elements={elements} />;
  }
}

// Simplified console renderer that just shows FICS output as-is
export class SimpleConsoleRenderer extends SimpleConsoleRendererBase {
  readonly type = 'console';
}

// Create specific renderers for different message types
// They all use the same simple rendering approach
export class SimpleShoutRenderer extends SimpleConsoleRendererBase {
  readonly type = 'shout';
}

export class SimpleCShoutRenderer extends SimpleConsoleRendererBase {
  readonly type = 'cshout';
}

export class SimpleNotificationRenderer extends SimpleConsoleRendererBase {
  readonly type = 'notification';
}

export class SimpleSeekAnnouncementRenderer extends SimpleConsoleRendererBase {
  readonly type = 'seekAnnouncement';
}

export class SimpleMatchRequestRenderer extends SimpleConsoleRendererBase {
  readonly type = 'matchRequest';
}

export class SimpleIllegalMoveRenderer extends SimpleConsoleRendererBase {
  readonly type = 'illegalMove';
}

export class SimpleDrawOfferRenderer extends SimpleConsoleRendererBase {
  readonly type = 'drawOffer';
}

export class SimpleUnobserveRenderer extends SimpleConsoleRendererBase {
  readonly type = 'unobserve';
}

export class SimpleGameNotificationRenderer extends SimpleConsoleRendererBase {
  readonly type = 'gameNotification';
}

// Command output renderers
export class SimpleWhoOutputRenderer extends SimpleConsoleRendererBase {
  readonly type = 'whoOutput';
}

export class SimpleGamesOutputRenderer extends SimpleConsoleRendererBase {
  readonly type = 'gamesOutput';
}

export class SimpleFingerOutputRenderer extends SimpleConsoleRendererBase {
  readonly type = 'fingerOutput';
}

export class SimpleHistoryOutputRenderer extends SimpleConsoleRendererBase {
  readonly type = 'historyOutput';
}

export class SimpleJournalOutputRenderer extends SimpleConsoleRendererBase {
  readonly type = 'journalOutput';
}

export class SimpleSoughtOutputRenderer extends SimpleConsoleRendererBase {
  readonly type = 'soughtOutput';
}

export class SimpleChannelListOutputRenderer extends SimpleConsoleRendererBase {
  readonly type = 'channelListOutput';
}

export class SimpleNewsOutputRenderer extends SimpleConsoleRendererBase {
  readonly type = 'newsOutput';
}

export class SimpleInOutputRenderer extends SimpleConsoleRendererBase {
  readonly type = 'inOutput';
}

// System message renderers
export class SimpleLoginRenderer extends SimpleConsoleRendererBase {
  readonly type = 'login';
}

export class SimplePasswordRenderer extends SimpleConsoleRendererBase {
  readonly type = 'password';
}

export class SimpleGuestLoginConfirmationRenderer extends SimpleConsoleRendererBase {
  readonly type = 'guestLoginConfirmation';
}

export class SimpleSessionStartRenderer extends SimpleConsoleRendererBase {
  readonly type = 'sessionStart';
}

export class SimpleSystemRenderer extends SimpleConsoleRendererBase {
  readonly type = 'system';
}

export class SimpleRawRenderer extends SimpleConsoleRendererBase {
  readonly type = 'raw';
}