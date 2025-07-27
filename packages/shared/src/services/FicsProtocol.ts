import {
    FicsMessage,
    GameStart,
    Style12,
    ChannelTell,
    DirectTell,
    GameEnd,
    MovesList,
    TimesealConfig,
    InteractiveElement,
    ParsedMessage,
    SeekAnnouncementData,
    WhoOutputData,
    FingerOutputData,
    HistoryOutputData,
    JournalOutputData,
    SoughtOutputData,
    GamesOutputData,
    ChannelListOutputData,
    NewsOutputData,
    InOutputData
} from './FicsProtocol.types';
import { parseMessage, parseMessageWithStores } from './parsers';
import { RootStore } from '../models/RootStore';

export class FicsProtocol {
    private static readonly TIMESEAL_CONNECT = "TIMESEAL2|openseal|simpleficsinterface|";
    private static readonly TIMESEAL_KEY = "Timestamp (FICS) v1.0 - programmed by Henrik Gram.";

    // Message parsing methods
    static parseMessage(msg: string): FicsMessage[] {
        // Use the new parser system
        return parseMessage(msg);
    }
    
    // New method that uses stores for side effects
    static parseMessageWithStores(msg: string, stores: RootStore): FicsMessage[] {
        return parseMessageWithStores(msg, stores);
    }

    // Command building methods
    static buildCommand(command: string, ...args: string[]): string {
        return [command, ...args].join(' ').trim();
    }

    static buildTell(username: string, message: string): string {
        return this.buildCommand('tell', username, message);
    }

    static buildChannelTell(channel: number, message: string): string {
        return this.buildCommand('tell', channel.toString(), message);
    }

    static buildObserve(target: string | number): string {
        return this.buildCommand('observe', target.toString());
    }

    static buildMove(move: string): string {
        return move;
    }

    static buildSeek(time: number, increment: number, rated: boolean = true, formula?: string): string {
        const parts = ['seek', time.toString(), increment.toString()];
        if (!rated) parts.push('unrated');
        if (formula) parts.push('formula', formula);
        return parts.join(' ');
    }

    // Timeseal methods
    static getTimesealConfig(): TimesealConfig {
        return {
            connectString: this.TIMESEAL_CONNECT,
            key: this.TIMESEAL_KEY
        };
    }

    static encodeTimeseal(message: string): Uint8Array {
        let t = message.length;
        const n = new Uint8Array(t + 30);

        for (let i = 0; i < message.length; i++) {
            n[i] = message.charCodeAt(i);
        }

        n[t] = 24;
        t++;

        const now = new Date().getTime();
        const seconds = Math.floor(now / 1000);
        const timestamp = (seconds % 10000 * 1000 + (now - 1000 * seconds)).toString();

        for (let i = 0; i < timestamp.length; i++) {
            n[t + i] = timestamp.charCodeAt(i);
        }

        t += timestamp.length;
        n[t] = 25;
        t++;

        while (t % 12 !== 0) {
            n[t] = 49;
            t++;
        }

        // Scramble the message
        for (let i = 0; i < t; i += 12) {
            n[i] ^= n[i + 11];
            n[i + 11] ^= n[i];
            n[i] ^= n[i + 11];
            n[i + 2] ^= n[i + 9];
            n[i + 9] ^= n[i + 2];
            n[i + 2] ^= n[i + 9];
            n[i + 4] ^= n[i + 7];
            n[i + 7] ^= n[i + 4];
            n[i + 4] ^= n[i + 7];
        }

        // XOR with key
        for (let i = 0; i < t; i++) {
            const keyChar = this.TIMESEAL_KEY.charCodeAt(i % 50);
            n[i] = ((128 | n[i]) ^ keyChar) - 32;
        }

        n[t] = 128;
        t++;
        n[t] = 10;
        t++;

        return n.slice(0, t);
    }

    static handleTimesealAcknowledgement(msg: string): { cleanedMessage: string; ackCount: number } {
        let ackCount = 0;
        let cleanedMessage = msg;
        
        // Handle both [G]\0
        const pattern = "[G]\0";
        
        let timesealAckIndex = cleanedMessage.indexOf(pattern);

        while (timesealAckIndex !== -1) {
            ackCount++;
            cleanedMessage = cleanedMessage.substring(0, timesealAckIndex) + cleanedMessage.substring(timesealAckIndex + pattern.length);
            timesealAckIndex = cleanedMessage.indexOf(pattern);
        }


        return {cleanedMessage, ackCount};
    }

    static createTimesealAck(): Uint8Array {
        return this.encodeTimeseal(String.fromCharCode(2) + '9');
    }

    // Message cleanup methods
    static cleanupMessage(msg: string): string {
        msg = msg.replaceAll("\n\r", "\n");
        // Don't remove backslashes - they indicate continuation lines
        // msg = msg.replaceAll('\n\\', '\n');

        if (!msg.endsWith("\n")) msg += "\n";
        if (msg.startsWith("\n")) msg = msg.substring(1);

        return msg;
    }

    static cleanupOutgoingMessage(msg: string): string {
        msg = msg.trim();
        // Replace smart quotes with regular quotes
        msg = msg.replaceAll('\u201C', '"'); // Left double quotation mark
        msg = msg.replaceAll('\u201D', '"'); // Right double quotation mark
        msg = msg.replaceAll('\u2019', "'"); // Right single quotation mark
        msg = msg.replaceAll('\u2026', '...'); // Horizontal ellipsis
        return msg;
    }

    static filterInvalidCharacters(msg: string): { filtered: string; removed: string } {
        let filtered = '';
        let removed = '';

        for (let i = 0; i < msg.length; i++) {
            const charCode = msg.charCodeAt(i);
            if (charCode >= 32 && charCode <= 126) {
                filtered += msg.charAt(i);
            } else {
                removed += msg.charAt(i);
            }
        }

        return {filtered, removed};
    }

    // Helper to check if message contains bell character
    static containsBell(msg: string): boolean {
        return msg.includes("\u0007");
    }

    static removeBell(msg: string): string {
        return msg.replaceAll("\u0007", "");
    }
}

export * from './FicsProtocol.types';