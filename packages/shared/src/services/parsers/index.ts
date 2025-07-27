import { Parser } from './BaseParser';
import { FicsMessage } from '../FicsProtocol.types';
import { RootStore } from '../../models/RootStore';

// Output parsers
import { WhoParser } from './output/WhoParser';
import { GamesParser } from './output/GamesParser';
import { SoughtParser } from './output/SoughtParser';
import { JournalParser } from './output/JournalParser';
import { InParser } from './output/InParser';
import { FingerParser } from './output/FingerParser';
import { HistoryParser } from './output/HistoryParser';
import { NewsParser } from './output/NewsParser';
import { ChannelListParser } from './output/ChannelListParser';
import { ChannelLogParser } from './output/ChannelLogParser';

// Game parsers
import { Style12Parser } from './game/Style12Parser';
import { GameStartParser } from './game/GameStartParser';
// import { GameNotificationParser } from './game/GameNotificationParser';
import { GameEndParser } from './game/GameEndParser';
import { SeekAnnouncementParser } from './game/SeekAnnouncementParser';
import { MovesListParser } from './game/MovesListParser';
import { MatchRequestParser } from './game/MatchRequestParser';
import { IllegalMoveParser } from './game/IllegalMoveParser';
import { DrawOfferParser } from './game/DrawOfferParser';
import { UnobserveParser } from './game/UnobserveParser';
import { ObservingGameParser } from './game/ObservingGameParser';

// Communication parsers
import { DirectTellParser } from './communication/DirectTellParser';
import { OutgoingTellParser } from './communication/OutgoingTellParser';
import { TellReplyParser } from './communication/TellReplyParser';
import { TellContinuationParser } from './communication/TellContinuationParser';
import { ChannelTellParser } from './communication/ChannelTellParser';
import { ChannelToldParser } from './communication/ChannelToldParser';
import { ShoutParser } from './communication/ShoutParser';
import { CShoutParser } from './communication/CShoutParser';

// System parsers
import { NotificationParser } from './system/NotificationParser';
import { LoginParser } from './system/LoginParser';
import { PasswordParser } from './system/PasswordParser';
import { SessionStartParser } from './system/SessionStartParser';
import { SystemMessageParser } from './system/SystemMessageParser';
import { GuestLoginConfirmationParser } from './system/GuestLoginConfirmationParser';

// Create and order all parsers
export const MESSAGE_PARSERS: Parser[] = [
    // Highest priority - game messages
    new Style12Parser(),        // priority: 100
    
    // System prompts - very high priority
    new GuestLoginConfirmationParser(), // priority: 96
    new LoginParser(),         // priority: 95
    new PasswordParser(),      // priority: 95
    
    // Game state messages
    new GameStartParser(),      // priority: 90
    new GameEndParser(),        // priority: 90
    new SessionStartParser(),   // priority: 90
    
    // Game data and moves
    new MovesListParser(),     // priority: 85
    new IllegalMoveParser(),   // priority: 85
    new DrawOfferParser(),     // priority: 85
    new UnobserveParser(),     // priority: 85
    // new GameNotificationParser(), // priority: 85
    new ObservingGameParser(), // priority: 85
    
    // Command outputs and outgoing messages
    new WhoParser(),           // priority: 80
    new GamesParser(),         // priority: 80
    new SoughtParser(),        // priority: 80
    new JournalParser(),       // priority: 80
    new InParser(),            // priority: 80
    new FingerParser(),        // priority: 80
    new HistoryParser(),       // priority: 80
    new NewsParser(),          // priority: 80
    new ChannelListParser(),   // priority: 80
    new ChannelLogParser(),    // priority: 80
    new OutgoingTellParser(),  // priority: 80
    
    // Game announcements and requests
    new SeekAnnouncementParser(), // priority: 75
    new MatchRequestParser(),     // priority: 75
    
    // Communication
    new ChannelToldParser(),   // priority: 72
    new TellContinuationParser(), // priority: 71
    new DirectTellParser(),    // priority: 70
    new TellReplyParser(),     // priority: 70
    new ChannelTellParser(),   // priority: 70
    new ShoutParser(),         // priority: 70
    new CShoutParser(),        // priority: 70
    
    // General system messages
    new NotificationParser(),  // priority: 60
    
    // Catch-all parser - must be last
    new SystemMessageParser(), // priority: 10
].sort((a, b) => b.priority - a.priority); // Sort by priority descending


export function parseMessage(msg: string): FicsMessage[] {
    if (msg == null || msg === undefined) {
        return [{type: 'raw', data: { content: '', elements: [] }}];
    }
    
    // Normalize line endings (this function might be called from tests)
    let normalizedMsg = msg.replace(/\r\n/g, '\n').replace(/\n\r/g, '\n').replace(/\r/g, '\n');
    
    // Remove trailing FICS prompt if present (for tests)
    normalizedMsg = normalizedMsg.replace(/\nfics%\s*$/g, '');
    normalizedMsg = normalizedMsg.replace(/^fics%\s*\n/g, '');
    
    // Try each parser in priority order
    for (const parser of MESSAGE_PARSERS) {
        if (parser.canParse(normalizedMsg)) {
            const result = parser.parse(normalizedMsg);
            if (result) {
                // For movesList messages, use the metadata as the data
                const data = parser.name === 'movesList' && result.metadata ? result.metadata : result;
                
                return [{
                    type: parser.name as any,
                    data: data
                }];
            }
        }
    }
    
    // Ultimate fallback - raw message
    return [{
        type: 'raw',
        data: {
            content: msg,
            elements: []
        }
    }];
}

// New method that handles side effects
export function parseMessageWithStores(msg: string, stores: RootStore): FicsMessage[] {
    if (msg == null || msg === undefined) {
        return [{type: 'raw', data: { content: '', elements: [] }}];
    }
    
    // Message is already a complete FICS message (everything up to a fics% prompt)
    // No need to split on prompts anymore
    const normalizedMsg = msg;
    
    // Find all parsers that can handle this message
    const candidateParsers = MESSAGE_PARSERS.filter(parser => parser.canParse(normalizedMsg));
    
    // Try each candidate parser in priority order (already sorted)
    for (const parser of candidateParsers) {
        const result = parser.handle(normalizedMsg, stores);
        if (result) {
            // For movesList messages, use the metadata as the data
            const data = parser.name === 'movesList' && result.metadata ? result.metadata : result;
            
            return [{
                type: parser.name as any,
                data: data
            }];
        }
    }
    
    // Ultimate fallback - raw message
    return [{
        type: 'raw',
        data: {
            content: msg,
            elements: []
        }
    }];
}