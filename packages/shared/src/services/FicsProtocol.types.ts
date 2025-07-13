export interface GameStart {
    gameNumber: number;
    whiteName: string;
    whiteRating: string;
    blackName: string;
    blackRating: string;
    isRated: boolean;
    gameType: string;
    minutes: number;
    increment: number;
}

export interface Style12 {
    board: string[][];
    colorToMove: 'W' | 'B';
    castlingRights: string;
    enPassantSquare: string;
    halfMoveClock: number;
    gameNumber: number;
    whiteName: string;
    blackName: string;
    relation: number;
    initialTime: number;
    incrementTime: number;
    whiteMaterialStrength: number;
    blackMaterialStrength: number;
    whiteTimeRemaining: number;
    blackTimeRemaining: number;
    moveNumber: number;
    verboseMove: string;
    timeTaken: string;
    prettyMove: string;
    flipBoard: boolean;
}

export interface ChannelTell {
    username: string;
    channelNumber: string;
    message: string;
}

export interface DirectTell {
    username: string;
    message: string;
}

export interface ChatContinuation {
    message: string;
}

export interface GameEnd {
    gameNumber: number;
    whiteName: string;
    blackName: string;
    reason: string;
    result: string;
}

export interface MovesList {
    gameNumber: number;
    moves: string[];
    event?: string;
    site?: string;
    date?: string;
    round?: string;
    white?: string;
    black?: string;
    whiteElo?: string;
    blackElo?: string;
    timeControl?: string;
    result?: string;
}

export type FicsMessage =
    | { type: 'gameStart'; data: GameStart }
    | { type: 'style12'; data: Style12 }
    | { type: 'channelTell'; data: ChannelTell & ParsedMessage }
    | { type: 'chatContinuation'; data: ChatContinuation }
    | { type: 'directTell'; data: DirectTell & ParsedMessage }
    | { type: 'gameEnd'; data: GameEnd }
    | { type: 'movesList'; data: MovesList }
    | { type: 'illegalMove'; data: { move: string } }
    | { type: 'drawOffer'; data: { username: string } }
    | { type: 'unobserve'; data: { gameNumber: number } }
    | { type: 'login'; data: null }
    | { type: 'password'; data: null }
    | { type: 'sessionStart'; data: { username: string } }
    | { type: 'seekAnnouncement'; data: ParsedMessage<SeekAnnouncementData> }
    | { type: 'whoOutput'; data: ParsedMessage<WhoOutputData> }
    | { type: 'fingerOutput'; data: ParsedMessage<FingerOutputData> }
    | { type: 'historyOutput'; data: ParsedMessage<HistoryOutputData> }
    | { type: 'journalOutput'; data: ParsedMessage<JournalOutputData> }
    | { type: 'soughtOutput'; data: ParsedMessage<SoughtOutputData> }
    | { type: 'gamesOutput'; data: ParsedMessage<GamesOutputData> }
    | { type: 'channelListOutput'; data: ParsedMessage<ChannelListOutputData> }
    | { type: 'newsOutput'; data: ParsedMessage<NewsOutputData> }
    | { type: 'notification'; data: ParsedMessage<{ type: string; player?: string }> }
    | { type: 'shout'; data: ParsedMessage<{ username: string; message: string }> }
    | { type: 'cshout'; data: ParsedMessage<{ username: string; message: string }> }
    | { type: 'announcement'; data: ParsedMessage<{ message: string }> }
    | { type: 'raw'; data: ParsedMessage };

export interface TimesealConfig {
    connectString: string;
    key: string;
}

// Interactive element types for parsed messages
export interface InteractiveElement {
    type: 'player' | 'command' | 'gameNumber' | 'seekNumber' | 'url' | 'channelNumber';
    text: string;
    action: string; // The command to execute or URL to open
    start: number;  // Position in the text
    end: number;
}

// Base interface for all parsed messages
export interface ParsedMessage<T = any> {
    content: string; // The display text
    elements?: InteractiveElement[]; // Clickable elements within the content
    metadata?: T; // Additional structured data
}

// Specific message metadata types
export interface SeekAnnouncementData {
    player: string;
    rating: string;
    seekNumber: number;
    gameType: string;
    time: number;
    increment: number;
    rated: boolean;
}

export interface WhoOutputData {
    players: Array<{
        handle: string;
        blitz?: number;
        standard?: number;
        status?: string;
    }>;
    totalPlayers: number;
}

export interface FingerOutputData {
    player: string;
    sections: Array<{
        type: 'header' | 'stats' | 'ratings' | 'notes' | 'sanctions';
        content: string;
    }>;
}

export interface HistoryOutputData {
    player: string;
    entries: Array<{
        index: number;
        result: '+' | '-' | '=';
        rating: number;
        color: 'W' | 'B';
        opponentRating: number;
        opponent: string;
        eco?: string;
        moves: number;
        date: string;
        gameNumber?: number;
    }>;
}

export interface JournalOutputData {
    player: string;
    entries: Array<{
        index: string;
        whiteName: string;
        whiteRating: number;
        blackName: string;
        blackRating: number;
        result: string;
        eco?: string;
        moves: number;
        date: string;
    }>;
}

export interface SoughtOutputData {
    entries: Array<{
        index: number;
        rating: string;
        handle: string;
        time: number;
        increment: number;
        rated: boolean;
        gameType: string;
        colorRequest?: string;
        ratingRange?: string;
        automatic?: boolean;
        formula?: boolean;
    }>;
}

export interface GamesOutputData {
    entries: Array<{
        gameNumber: number;
        whiteRating: string;
        whiteName: string;
        blackRating: string;
        blackName: string;
        gameType: string;
        rated: boolean;
        time: number;
        increment: number;
        whiteTime: string;
        blackTime: string;
        movePair: string;
    }>;
}

export interface ChannelListOutputData {
    channelNumber: number;
    channelName?: string;
    members: string[];
    totalMembers: number;
}

export interface NewsOutputData {
    entries: Array<{
        number: number;
        date: string;
        title: string;
    }>;
}