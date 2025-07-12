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
    | { type: 'channelTell'; data: ChannelTell }
    | { type: 'chatContinuation'; data: ChatContinuation }
    | { type: 'directTell'; data: DirectTell }
    | { type: 'gameEnd'; data: GameEnd }
    | { type: 'movesList'; data: MovesList }
    | { type: 'illegalMove'; data: { move: string } }
    | { type: 'drawOffer'; data: { username: string } }
    | { type: 'unobserve'; data: { gameNumber: number } }
    | { type: 'login'; data: null }
    | { type: 'password'; data: null }
    | { type: 'sessionStart'; data: { username: string } }
    | { type: 'raw'; data: string };

export interface TimesealConfig {
    connectString: string;
    key: string;
}