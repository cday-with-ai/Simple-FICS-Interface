// Models
export {GameStore} from './models/GameStore';
export {FICSStore} from './models/FICSStore';
export {ChatStore} from './models/ChatStore';
export {PreferencesStore} from './models/PreferencesStore';
export {RootStore, createRootStore} from './models/RootStore';

// Services
export {ChessAPI, Move, PieceType, Color, Variant, GameResult} from '@fics/chessapi';
export type {Piece, CastlingRights, MoveObject, Square, Board} from '@fics/chessapi';
export {FicsProtocol} from './services/FicsProtocol';
export type {
    FicsMessage,
    GameStartInfo,
    Style12,
    ChannelTell,
    DirectTell,
    GameEnd,
    MovesList,
    TimesealConfig
} from './services/FicsProtocol';

// Contexts (React integration)
export {
    RootStoreProvider,
    useRootStore,
    useGameStore,
    useFICSStore,
    useChatStore,
    usePreferencesStore
} from './contexts/RootStoreContext';

// Types
export type {GameState, Player} from './models/GameStore';
export type {FICSUser} from './models/FICSStore';
export type {ChatMessage, ChatTab} from './models/ChatStore';
export type {Preferences} from './models/PreferencesStore';