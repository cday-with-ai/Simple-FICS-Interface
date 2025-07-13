import {
    FicsMessage,
    GameStart,
    Style12,
    ChannelTell,
    DirectTell,
    GameEnd,
    MovesList,
    TimesealConfig
} from './FicsProtocol.types';

export class FicsProtocol {
    private static readonly TIMESEAL_CONNECT = "TIMESEAL2|openseal|simpleficsinterface|";
    private static readonly TIMESEAL_KEY = "Timestamp (FICS) v1.0 - programmed by Henrik Gram.";

    // Message parsing methods
    static parseMessage(msg: string): FicsMessage[] {
        if (msg == null || msg === undefined) {
            return [{type: 'raw', data: ''}];
        }

        const messages: FicsMessage[] = [];

        // Normalize line endings from \r\n or \n\r to just \n
        msg = msg.replace(/\r\n/g, '\n').replace(/\n\r/g, '\n').replace(/\r/g, '\n');
        
        // Remove trailing fics% prompt if present
        msg = msg.replace(/\nfics%\s*$/, '\n');

        // Parse multi-line channel tells and other chat messages FIRST
        // These can contain newlines and \ continuations
        const channelTells = this.parseChannelTells(msg);
        messages.push(...channelTells);

        // Track which lines have been processed by channel tells
        const processedLines = new Set<number>();
        const lines = msg.split('\n');
        
        // Mark lines that were part of channel tells
        let lineIndex = 0;
        for (const line of lines) {
            for (const tell of channelTells) {
                if (tell.type === 'channelTell' && tell.data) {
                    // Check if this line is the start of this channel tell
                    if (line.includes(tell.data.username) && line.includes(`(${tell.data.channelNumber})`)) {
                        processedLines.add(lineIndex);
                        // Mark continuation lines as processed too
                        let nextIndex = lineIndex + 1;
                        while (nextIndex < lines.length && lines[nextIndex].match(/^\\\s*/)) {
                            processedLines.add(nextIndex);
                            nextIndex++;
                        }
                    }
                }
            }
            lineIndex++;
        }
        
        // Create remaining message without processed lines
        let remainingMsg = lines.filter((_, index) => !processedLines.has(index)).join('\n');

        // Parse Style12 messages (can span multiple lines in the input)
        const style12Messages = this.parseStyle12Messages(remainingMsg);
        messages.push(...style12Messages);

        // Parse moves list (can be multi-line)
        const movesList = this.parseMovesList(remainingMsg);
        if (movesList) {
            messages.push({type: 'movesList', data: movesList});
        }

        // Parse game start messages (might be multi-line for creating game format)
        const gameStart = this.parseGameStart(remainingMsg);
        if (gameStart) {
            messages.push({type: 'gameStart', data: gameStart});
        }

        // Parse unobserve (can have multiple in one message)
        const unobserve = this.parseUnobserve(remainingMsg);
        unobserve.forEach(gameNumber => {
            messages.push({type: 'unobserve', data: {gameNumber}});
        });

        // Now process line by line for other line-based messages
        const remainingLines = remainingMsg.split('\n').filter(line => line.trim().length > 0);
        
        // Process raw messages with continuation lines
        let i = 0;
        while (i < remainingLines.length) {
            const line = remainingLines[i];
            // Skip lines that were already processed
            if (line.trim().startsWith('<12>') ||
                (movesList && (line.includes('Movelist for game') || line.match(/^\[.*\]$/) || line.match(/^\d+\./))) ||
                (gameStart && (line.includes('Creating:') || line.match(/^\{Game \d+.*\}$/) || line.match(/^Game \d+:/))) ||
                line.match(/Removing game \d+ from observation list/) ||
                channelTells.some(tell => tell.type === 'channelTell' && tell.data && line.includes(tell.data.username) && line.includes(`(${tell.data.channelNumber})`))) {
                continue;
            }

            let lineProcessed = false;

            // Check for login prompt
            if (line.toLowerCase().includes('login: ')) {
                messages.push({type: 'login', data: null});
                lineProcessed = true;
            }

            // Check for password prompt
            if (line.toLowerCase().includes('password: ')) {
                messages.push({type: 'password', data: null});
                lineProcessed = true;
            }

            // Check for session start
            const sessionStartMatch = line.match(/\*{4} Starting FICS session as ([a-zA-Z0-9]+)/);
            if (sessionStartMatch) {
                messages.push({type: 'sessionStart', data: {username: sessionStartMatch[1]}});
                lineProcessed = true;
            }
            
            // Also check for guest login pattern
            const guestMatch = line.match(/Logging you in as "([a-zA-Z0-9]+)"/);
            if (guestMatch) {
                // For guest logins, we'll treat this as session start
                messages.push({type: 'sessionStart', data: {username: guestMatch[1]}});
                lineProcessed = true;
            }

            // Parse direct tells
            if (!lineProcessed) {
                const directTell = this.parseDirectTell(line);
                if (directTell) {
                    messages.push({type: 'directTell', data: directTell});
                    lineProcessed = true;
                }
            }

            // Parse game end
            const gameEnd = this.parseGameEnd(line);
            if (gameEnd) {
                messages.push({type: 'gameEnd', data: gameEnd});
                lineProcessed = true;
            }

            // Parse illegal move
            const illegalMove = this.parseIllegalMove(line);
            if (illegalMove) {
                messages.push({type: 'illegalMove', data: illegalMove});
                lineProcessed = true;
            }

            // Parse draw offer
            const drawOffer = this.parseDrawOffer(line);
            if (drawOffer) {
                messages.push({type: 'drawOffer', data: drawOffer});
                lineProcessed = true;
            }

            // If this line wasn't processed by any specific parser, add it as raw
            // Handle continuation lines for raw messages
            if (!lineProcessed && line.trim().length > 0 && line.trim() !== 'fics%') {
                // Check if this is a multi-line raw message (like channel member lists)
                let fullMessage = line;
                let j = i + 1;
                
                // Look ahead for continuation lines
                while (j < remainingLines.length && remainingLines[j].trim().startsWith('\\')) {
                    // Keep the original line with backslash for display
                    fullMessage += '\n' + remainingLines[j];
                    j++;
                }
                
                messages.push({type: 'raw', data: fullMessage});
                i = j - 1; // Skip the continuation lines we've already processed
            }
            
            i++;
        }

        // If no messages were parsed from any line, return the original as raw
        if (messages.length === 0) {
            messages.push({type: 'raw', data: msg});
        }

        return messages;
    }

    private static parseStyle12Messages(msg: string): FicsMessage[] {
        const messages: FicsMessage[] = [];
        let style12Start = msg.indexOf("<12>");

        while (style12Start === 0 || (style12Start > 0 && msg.charAt(style12Start - 1) === '\n')) {
            const end = msg.indexOf("\n", style12Start + 5);
            const style12Block = end >= 0 ? msg.substring(style12Start, end) : msg.substring(style12Start);

            const style12 = this.parseStyle12(style12Block);
            if (style12) {
                messages.push({type: 'style12', data: style12});
            }

            if (end >= 0) {
                msg = msg.substring(0, style12Start) + msg.substring(end + 1);
            } else {
                msg = msg.substring(0, style12Start);
            }
            style12Start = msg.indexOf("<12>");
        }

        return messages;
    }

    private static parseStyle12(style12Line: string): Style12 | null {
        const parts = style12Line.split(' ');
        if (parts.length < 31) return null;

        // Parse the board
        const board: string[][] = [];
        for (let i = 1; i <= 8; i++) {
            const rank = parts[i].split('');
            board.push(rank);
        }

        return {
            board,
            colorToMove: parts[9] as 'W' | 'B',
            castlingRights: parts[10],
            enPassantSquare: parts[11],
            halfMoveClock: parseInt(parts[12]),
            gameNumber: parseInt(parts[16]),
            whiteName: parts[17],
            blackName: parts[18],
            relation: parseInt(parts[19]),
            initialTime: parseInt(parts[20]),
            incrementTime: parseInt(parts[21]),
            whiteMaterialStrength: parseInt(parts[22]),
            blackMaterialStrength: parseInt(parts[23]),
            whiteTimeRemaining: parseInt(parts[24]),
            blackTimeRemaining: parseInt(parts[25]),
            moveNumber: parseInt(parts[26]),
            verboseMove: parts[27],
            timeTaken: parts[28],
            prettyMove: parts[29],
            flipBoard: parts[30] === '1'
        };
    }

    private static parseGameStart(msg: string): GameStart | null {
        // Check for observing game format
        const obsMatch = msg.match(/Game (\d+): ([a-zA-Z0-9_\[\]*-]+) \(([0-9+CEP-]+)\) ([a-zA-Z0-9_\[\]*-]+) \(([0-9+CEP-]+)\) (rated|unrated) ([a-zA-Z0-9-]+) (\d+) (\d+)/);
        if (obsMatch) {
            return {
                gameNumber: parseInt(obsMatch[1]),
                whiteName: obsMatch[2],
                whiteRating: obsMatch[3],
                blackName: obsMatch[4],
                blackRating: obsMatch[5],
                isRated: obsMatch[6] === 'rated',
                gameType: obsMatch[7],
                minutes: parseInt(obsMatch[8]),
                increment: parseInt(obsMatch[9])
            };
        }

        // Check for creating game format
        const createMatch = msg.match(/Creating: ([a-zA-Z0-9_\[\]*-]+) \(([0-9+CEP-]+)\) ([a-zA-Z0-9_\[\]*-]+) \(([0-9+CEP-]+)\) (rated|unrated) ([a-zA-Z0-9-]+) (\d+) (\d+)/);
        const gameMatch = msg.match(/\{Game (\d+) \(([a-zA-Z0-9_\[\]*-]+) vs\. ([a-zA-Z0-9_\[\]*-]+)\)/);

        if (createMatch && gameMatch) {
            return {
                gameNumber: parseInt(gameMatch[1]),
                whiteName: createMatch[1],
                whiteRating: createMatch[2],
                blackName: createMatch[3],
                blackRating: createMatch[4],
                isRated: createMatch[5] === 'rated',
                gameType: createMatch[6],
                minutes: parseInt(createMatch[7]),
                increment: parseInt(createMatch[8])
            };
        }

        return null;
    }

    private static escapeRegex(str: string): string {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    private static parseChannelTells(msg: string): FicsMessage[] {
        const messages: FicsMessage[] = [];
        
        // Split into potential message blocks first
        const lines = msg.split('\n');
        let i = 0;
        
        while (i < lines.length) {
            const line = lines[i].trim();
            
            // Check if this line starts a channel tell
            const channelMatch = line.match(/^([a-zA-Z0-9_\[\]*-]+)(?:\([^)]*\))*\((\d+)\)\s*:\s*(.*)/);
            
            if (channelMatch) {
                let fullMessage = channelMatch[3];
                let j = i + 1;
                
                // Look for continuation lines (starting with \)
                while (j < lines.length && lines[j].match(/^\\\s*/)) {
                    // Remove the leading \ and append the rest
                    fullMessage += '\n' + lines[j].replace(/^\\\s*/, '');
                    j++;
                }
                
                messages.push({
                    type: 'channelTell',
                    data: {
                        username: channelMatch[1],
                        channelNumber: channelMatch[2],
                        message: fullMessage
                    }
                });
                
                i = j;
            } else {
                i++;
            }
        }
        
        return messages;
    }

    private static parseChannelTell(msg: string): ChannelTell | null {
        // This is now only used for single-line channel tells
        // Multi-line tells are handled by parseChannelTells
        const trimmedMsg = msg.trim();
        
        // Updated regex to handle titles between username and channel number
        // Examples: username(39): message, username(*)(39): message, username(TD)(TR)(39): message
        const match = trimmedMsg.match(/^([a-zA-Z0-9_\[\]*-]+)(?:\([^)]*\))*\((\d+)\)\s*:\s*(.*)/);
        
        if (match) {
            return {
                username: match[1],
                channelNumber: match[2],
                message: match[3]
            };
        }
        return null;
    }

    private static parseDirectTell(msg: string): DirectTell | null {
        const match = msg.match(/^([a-zA-Z0-9_\[\]()* -]+) tells you:\s*(.*)/);
        if (match) {
            return {
                username: match[1],
                message: match[2]
            };
        }
        return null;
    }

    private static parseGameEnd(msg: string): GameEnd | null {
        const match = msg.match(/\{Game (\d+) \(([a-zA-Z0-9_\[\]*-]+) vs\. ([a-zA-Z0-9_\[\]*-]+)\) ([^}]+)\}\s*(.+)/);
        if (match) {
            return {
                gameNumber: parseInt(match[1]),
                whiteName: match[2],
                blackName: match[3],
                reason: match[4],
                result: match[5].trim()
            };
        }

        // Check for examination end
        const examMatch = msg.match(/You are no longer examining game (\d+)/);
        if (examMatch) {
            return {
                gameNumber: parseInt(examMatch[1]),
                whiteName: 'examiner',
                blackName: 'examiner',
                reason: 'Examination terminated',
                result: '*'
            };
        }

        return null;
    }

    private static parseMovesList(msg: string): MovesList | null {
        const match = msg.match(/Movelist for game (\d+):/);
        if (!match) return null;

        const gameNumber = parseInt(match[1]);
        const moves: string[] = [];

        // Extract PGN headers if present
        const headers: Partial<MovesList> = {gameNumber, moves};

        // Parse PGN headers
        const eventMatch = msg.match(/\[Event "([^"]+)"\]/);
        if (eventMatch) headers.event = eventMatch[1];

        const siteMatch = msg.match(/\[Site "([^"]+)"\]/);
        if (siteMatch) headers.site = siteMatch[1];

        const dateMatch = msg.match(/\[Date "([^"]+)"\]/);
        if (dateMatch) headers.date = dateMatch[1];

        const whiteMatch = msg.match(/\[White "([^"]+)"\]/);
        if (whiteMatch) headers.white = whiteMatch[1];

        const blackMatch = msg.match(/\[Black "([^"]+)"\]/);
        if (blackMatch) headers.black = blackMatch[1];

        const whiteEloMatch = msg.match(/\[WhiteElo "([^"]+)"\]/);
        if (whiteEloMatch) headers.whiteElo = whiteEloMatch[1];

        const blackEloMatch = msg.match(/\[BlackElo "([^"]+)"\]/);
        if (blackEloMatch) headers.blackElo = blackEloMatch[1];

        const timeControlMatch = msg.match(/\[TimeControl "([^"]+)"\]/);
        if (timeControlMatch) headers.timeControl = timeControlMatch[1];

        const resultMatch = msg.match(/\[Result "([^"]+)"\]/);
        if (resultMatch) headers.result = resultMatch[1];

        // Extract moves (simplified - in real implementation would need proper PGN parsing)
        const movesSection = msg.substring(msg.lastIndexOf(']') + 1).trim();
        if (movesSection) {
            const moveTokens = movesSection.split(/\s+/).filter(token =>
                token && !token.match(/^\d+\./) && token !== '*' && token !== '1-0' && token !== '0-1' && token !== '1/2-1/2'
            );
            headers.moves = moveTokens;
        }

        return headers as MovesList;
    }

    private static parseIllegalMove(msg: string): { move: string } | null {
        const match = msg.match(/Illegal move \(([^)]+)\)/);
        if (match) {
            return {move: match[1]};
        }
        return null;
    }

    private static parseDrawOffer(msg: string): { username: string } | null {
        const match = msg.match(/^([a-zA-Z0-9_\[\]()* -]+) offers you a draw\.$/);
        if (match) {
            return {username: match[1]};
        }
        return null;
    }

    private static parseUnobserve(msg: string): number[] {
        const gameNumbers: number[] = [];
        const regex = /Removing game (\d+) from observation list/g;
        let match;

        while ((match = regex.exec(msg)) !== null) {
            gameNumbers.push(parseInt(match[1]));
        }

        return gameNumbers;
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

    static handleTimesealAcknowledgement(msg: string): { cleanedMessage: string; needsAck: boolean } {
        let needsAck = false;
        let cleanedMessage = msg;
        let timesealAckIndex = msg.indexOf("[G]\0");

        while (timesealAckIndex !== -1) {
            needsAck = true;
            cleanedMessage = cleanedMessage.substring(0, timesealAckIndex) + cleanedMessage.substring(timesealAckIndex + 4);
            timesealAckIndex = cleanedMessage.indexOf("[G]\0");
        }

        return {cleanedMessage, needsAck};
    }

    static createTimesealAck(): Uint8Array {
        return this.encodeTimeseal(String.fromCharCode(2, 57));
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