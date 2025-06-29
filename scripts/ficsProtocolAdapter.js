// This adapter allows the existing fics.js to use the new FicsProtocol module
// It provides a bridge between the ES modules in the shared package and the existing code

// Since we can't directly import TypeScript modules in the browser without a build step,
// we'll need to either:
// 1. Build the shared package to JavaScript first
// 2. Use a bundler like webpack/rollup
// 3. Or refactor fics.js to use plain JavaScript protocol handling

// For now, let's create a JavaScript version of the core protocol parsing
// that matches the TypeScript interface

export class FicsProtocolAdapter {
    static parseStyle12(style12Line) {
        const parts = style12Line.split(' ');
        if (parts.length < 31) return null;

        const board = [];
        for (let i = 1; i <= 8; i++) {
            board.push(parts[i].split(''));
        }

        return {
            board,
            colorToMove: parts[9],
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

    static parseGameStart(msg) {
        // Observing game format
        const obsMatch = msg.match(/Game (\d+): ([a-zA-Z0-9]+) \(([0-9+-]+)\) ([a-zA-Z0-9]+) \(([0-9+-]+)\) (rated|unrated) ([a-zA-Z0-9]+) (\d+) (\d+)/);
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

        // Creating game format
        const createMatch = msg.match(/Creating: ([a-zA-Z0-9]+) \(([0-9+-]+)\) ([a-zA-Z0-9]+) \(([0-9+-]+)\) (rated|unrated) ([a-zA-Z0-9]+) (\d+) (\d+)/);
        const gameMatch = msg.match(/\{Game (\d+) \(([a-zA-Z0-9]+) vs\. ([a-zA-Z0-9]+)\)/);

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

    static parseChannelTell(msg) {
        const match = msg.match(/^([a-zA-Z0-9*]+)\(([0-9]+)\)\s*:\s*(.*)/);
        if (match) {
            return {
                username: match[1],
                channelNumber: match[2],
                message: match[3]
            };
        }
        return null;
    }

    static parseGameEnd(msg) {
        const match = msg.match(/\{Game (\d+) \(([a-zA-Z0-9]+) vs\. ([a-zA-Z0-9]+)\) ([^}]+)\}\s*(.+)/);
        if (match) {
            return {
                gameNumber: parseInt(match[1]),
                whiteName: match[2],
                blackName: match[3],
                reason: match[4],
                result: match[5].trim()
            };
        }

        // Examination end
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

    static parseIllegalMove(msg) {
        const match = msg.match(/Illegal move \(([^)]+)\)/);
        return match ? {move: match[1]} : null;
    }

    static parseDrawOffer(msg) {
        const match = msg.match(/([a-zA-Z0-9]+) offers you a draw\./);
        return match ? {username: match[1]} : null;
    }

    static parseUnobserve(msg) {
        const gameNumbers = [];
        const regex = /Removing game (\d+) from observation list/g;
        let match;

        while ((match = regex.exec(msg)) !== null) {
            gameNumbers.push(parseInt(match[1]));
        }

        return gameNumbers;
    }

    static cleanupMessage(msg) {
        msg = msg.replaceAll("\n\r", "\n");
        msg = msg.replaceAll('\n\\', '\n');

        if (!msg.endsWith("\n")) msg += "\n";
        if (msg.startsWith("\n")) msg = msg.substring(1);

        return msg;
    }

    static cleanupOutgoingMessage(msg) {
        msg = msg.trim();
        msg = msg.replaceAll(""
        ", "\""
    )
        ;
        msg = msg.replaceAll(""
        ", "\""
    )
        ;
        msg = msg.replaceAll("'", "'");
        msg = msg.replaceAll("…", "...");
        return msg;
    }

    static filterInvalidCharacters(msg) {
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

    static containsBell(msg) {
        return msg.includes("\u0007");
    }

    static removeBell(msg) {
        return msg.replaceAll("\u0007", "");
    }
}