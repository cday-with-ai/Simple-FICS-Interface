// ECO (Encyclopedia of Chess Openings) lookup functions

// TypeScript interfaces for ECO data
interface EcoOpening {
    fen: string;
    eco: string;
    openingName: string;
    moves: string;
}

// Global variables to store the lookup maps
let lookupByFenMap = new Map<string, string>();
let lookupByMovesMap = new Map<string, string>();
let lookupArray: EcoOpening[] = [];

// Initialize the ECO database
function initECO(): boolean {
    lookupArray.forEach(function (o: EcoOpening) {
        lookupByFenMap.set(o.fen, `${o.eco} ${o.openingName}`);
        lookupByMovesMap.set(o.moves, `${o.eco} ${o.openingName}`);
    });
    // ECO database initialized
    return true;
}

// Lookup an opening by FEN position
function lookupFromFEN(fen: string): string {
    if (lookupByFenMap.size === 0) {
        initECO();
    }
    return lookupByFenMap.get(fen) || "Unknown opening";
}

// Lookup an opening by move list
function lookupFromMoveList(moves: string): string | null {
    if (lookupByMovesMap.size === 0) {
        initECO();
    }
    return lookupByMovesMap.get(moves) || null;
}

// Test function for debugging
function test(): void {
    const testFen = "rnbqkbnr/ppp1pppp/8/3p2B1/3P4/8/PPP1PPPP/RN1QKBNR b KQkq - 1 2";
    console.log(`test Fen lookup ${testFen}=${lookupFromFEN(testFen)}`);
    const testMoveList = "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. e3 Bf5 5. cxd5 cxd5 6. Qb3 Qc8 7. Bd2 e6 8. Na3";
    console.log(`test move list lookup ${testMoveList}=${lookupFromMoveList(testMoveList)}`);
}

// Export the functions and types for use in other modules
export {
    lookupFromFEN,
    lookupFromMoveList,
    test,
    initECO
};

export type {EcoOpening};

lookupArray = [{
    fen: "rnbqkbnr/pppppppp/8/8/1P6/8/P1PPPPPP/RNBQKBNR b KQkq b3 0 1",
    eco: "A00",
    openingName: "Polish (Sokolsky) opening",
    moves: "1. b4"
}, {
    fen: "rnbqkb1r/pppppppp/7n/8/1P6/8/P1PPPPPP/RNBQKBNR w KQkq - 1 2",
    eco: "A00",
    openingName: "Polish: Tuebingen variation",
    moves: "1. b4 Nh6"
}, {
    fen: "rnbqkbnr/pp1ppppp/2p5/8/1P6/8/P1PPPPPP/RNBQKBNR w KQkq - 0 2",
    eco: "A00",
    openingName: "Polish: Outflank variation",
    moves: "1. b4 c6"
}, {
    fen: "rnbqkbnr/pppppppp/8/8/8/6P1/PPPPPP1P/RNBQKBNR b KQkq - 0 1",
    eco: "A00",
    openingName: "Benko's opening",
    moves: "1. g3"
}, {
    fen: "rnbqkbnr/ppppppp1/8/7p/8/6P1/PPPPPP1P/RNBQKBNR w KQkq h6 0 2",
    eco: "A00",
    openingName: "Lasker simul special",
    moves: "1. g3 h5"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/4p3/8/5NP1/PPPPPP1P/RNBQKB1R b KQkq - 1 2",
    eco: "A00",
    openingName: "Benko's opening: reversed Alekhine",
    moves: "1. g3 e5 2. Nf3"
}, {
    fen: "rnbqkbnr/pppppppp/8/8/6P1/8/PPPPPP1P/RNBQKBNR b KQkq g3 0 1",
    eco: "A00",
    openingName: "Grob's attack",
    moves: "1. g4"
}, {
    fen: "rnbqkbnr/pp2pppp/2p5/3p2P1/8/8/PPPPPPBP/RNBQK1NR b KQkq - 0 3",
    eco: "A00",
    openingName: "Grob: spike attack",
    moves: "1. g4 d5 2. Bg2 c6 3. g5"
}, {
    fen: "rn1qkbnr/ppp1pppp/8/3p4/2P3b1/8/PP1PPPBP/RNBQK1NR b KQkq c3 0 3",
    eco: "A00",
    openingName: "Grob: Fritz gambit",
    moves: "1. g4 d5 2. Bg2 Bxg4 3. c4"
}, {
    fen: "rn1qkbnr/ppp1pppp/8/8/2Pp2b1/8/PP1PPPBP/RNBQK1NR w KQkq - 0 4",
    eco: "A00",
    openingName: "Grob: Romford counter-gambit",
    moves: "1. g4 d5 2. Bg2 Bxg4 3. c4 d4"
}, {
    fen: "rnbqkbnr/pppppppp/8/8/8/7P/PPPPPPP1/RNBQKBNR b KQkq - 0 1",
    eco: "A00",
    openingName: "Clemenz (Mead's, Basman's or de Klerk's) opening",
    moves: "1. h3"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/4p3/8/P6P/1PPPPPP1/RNBQKBNR b KQkq - 0 2",
    eco: "A00",
    openingName: "Global opening",
    moves: "1. h3 e5 2. a3"
}, {
    fen: "rnbqkbnr/pppppppp/8/8/8/7N/PPPPPPPP/RNBQKB1R b KQkq - 1 1",
    eco: "A00",
    openingName: "Amar (Paris) opening",
    moves: "1. Nh3"
}, {
    fen: "rn1qkbnr/ppp2ppp/8/3p4/5p2/6PB/PPPPP2P/RNBQK2R w KQkq - 0 5",
    eco: "A00",
    openingName: "Amar gambit",
    moves: "1. Nh3 d5 2. g3 e5 3. f4 Bxh3 4. Bxh3 exf4"
}, {
    fen: "rnbqkbnr/pppppppp/8/8/8/2N5/PPPPPPPP/R1BQKBNR b KQkq - 1 1",
    eco: "A00",
    openingName: "Dunst (Sleipner, Heinrichsen) opening",
    moves: "1. Nc3"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/4p3/8/2N5/PPPPPPPP/R1BQKBNR w KQkq e6 0 2",
    eco: "A00",
    openingName: "Dunst (Sleipner, Heinrichsen) opening",
    moves: "1. Nc3 e5"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/4p3/8/P1N5/1PPPPPPP/R1BQKBNR b KQkq - 0 2",
    eco: "A00",
    openingName: "Battambang opening",
    moves: "1. Nc3 e5 2. a3"
}, {
    fen: "r1bqkbnr/pp1ppppp/2n5/8/7Q/2N5/PPP1PPPP/R1B1KBNR b KQkq - 2 4",
    eco: "A00",
    openingName: "Novosibirsk opening",
    moves: "1. Nc3 c5 2. d4 cxd4 3. Qxd4 Nc6 4. Qh4"
}, {
    fen: "rnbqkbnr/pppppppp/8/8/8/P7/1PPPPPPP/RNBQKBNR b KQkq - 0 1",
    eco: "A00",
    openingName: "Anderssen's opening",
    moves: "1. a3"
}, {
    fen: "rnbqkbnr/pppppppp/8/8/P7/8/1PPPPPPP/RNBQKBNR b KQkq a3 0 1",
    eco: "A00",
    openingName: "Ware (Meadow Hay) opening",
    moves: "1. a4"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/4p3/P6P/8/1PPPPPP1/RNBQKBNR b KQkq h3 0 2",
    eco: "A00",
    openingName: "Crab opening",
    moves: "1. a4 e5 2. h4"
}, {
    fen: "rnbqkbnr/pppppppp/8/8/8/2P5/PP1PPPPP/RNBQKBNR b KQkq - 0 1",
    eco: "A00",
    openingName: "Saragossa opening",
    moves: "1. c3"
}, {
    fen: "rnbqkbnr/pppppppp/8/8/8/3P4/PPP1PPPP/RNBQKBNR b KQkq - 0 1",
    eco: "A00",
    openingName: "Mieses opening",
    moves: "1. d3"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/4p3/8/3P4/PPP1PPPP/RNBQKBNR w KQkq e6 0 2",
    eco: "A00",
    openingName: "Mieses opening",
    moves: "1. d3 e5"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/4p3/8/3P4/PPPNPPPP/R1BQKBNR b KQkq - 1 2",
    eco: "A00",
    openingName: "Valencia opening",
    moves: "1. d3 e5 2. Nd2"
}, {
    fen: "r1bqkbnr/pp1ppppp/2n5/2p5/8/2NP2P1/PPP1PP1P/R1BQKBNR b KQkq - 0 3",
    eco: "A00",
    openingName: "Venezolana opening",
    moves: "1. d3 c5 2. Nc3 Nc6 3. g3"
}, {
    fen: "rnbqkbnr/pppppppp/8/8/8/4P3/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
    eco: "A00",
    openingName: "Van't Kruijs opening",
    moves: "1. e3"
}, {
    fen: "r1bqkb1r/ppp2ppp/2np1n2/4p3/2P5/1PN1P3/P2P1PPP/R1BQKBNR w KQkq - 1 5",
    eco: "A00",
    openingName: "Amsterdam attack",
    moves: "1. e3 e5 2. c4 d6 3. Nc3 Nc6 4. b3 Nf6"
}, {
    fen: "rnbqkbnr/pppppppp/8/8/8/5P2/PPPPP1PP/RNBQKBNR b KQkq - 0 1",
    eco: "A00",
    openingName: "Gedult's opening",
    moves: "1. f3"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/4p3/8/5P2/PPPPPKPP/RNBQ1BNR b kq - 1 2",
    eco: "A00",
    openingName: "Hammerschlag (Fried fox/Pork chop opening)",
    moves: "1. f3 e5 2. Kf2"
}, {
    fen: "rnbqkbnr/pppppppp/8/8/7P/8/PPPPPPP1/RNBQKBNR b KQkq h3 0 1",
    eco: "A00",
    openingName: "Anti-Borg (Desprez) opening",
    moves: "1. h4"
}, {
    fen: "rnbqkbnr/pppppppp/8/8/8/N7/PPPPPPPP/R1BQKBNR b KQkq - 1 1",
    eco: "A00",
    openingName: "Durkin's attack",
    moves: "1. Na3"
}, {
    fen: "rnbqkbnr/pppppppp/8/8/8/1P6/P1PPPPPP/RNBQKBNR b KQkq - 0 1",
    eco: "A01",
    openingName: "Nimzovich-Larsen attack",
    moves: "1. b3"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/4p3/8/1P6/P1PPPPPP/RNBQKBNR w KQkq e6 0 2",
    eco: "A01",
    openingName: "Nimzovich-Larsen attack: modern variation",
    moves: "1. b3 e5"
}, {
    fen: "rnbqkb1r/pppppppp/5n2/8/8/1P6/P1PPPPPP/RNBQKBNR w KQkq - 1 2",
    eco: "A01",
    openingName: "Nimzovich-Larsen attack: Indian variation",
    moves: "1. b3 Nf6"
}, {
    fen: "rnbqkbnr/ppp1pppp/8/3p4/8/1P6/P1PPPPPP/RNBQKBNR w KQkq d6 0 2",
    eco: "A01",
    openingName: "Nimzovich-Larsen attack: classical variation",
    moves: "1. b3 d5"
}, {
    fen: "rnbqkbnr/pp1ppppp/8/2p5/8/1P6/P1PPPPPP/RNBQKBNR w KQkq c6 0 2",
    eco: "A01",
    openingName: "Nimzovich-Larsen attack: English variation",
    moves: "1. b3 c5"
}, {
    fen: "rnbqkbnr/ppppp1pp/8/5p2/8/1P6/P1PPPPPP/RNBQKBNR w KQkq f6 0 2",
    eco: "A01",
    openingName: "Nimzovich-Larsen attack: Dutch variation",
    moves: "1. b3 f5"
}, {
    fen: "rnbqkbnr/p1pppppp/8/1p6/8/1P6/P1PPPPPP/RNBQKBNR w KQkq b6 0 2",
    eco: "A01",
    openingName: "Nimzovich-Larsen attack: Polish variation",
    moves: "1. b3 b5"
}, {
    fen: "rnbqkbnr/p1pppppp/1p6/8/8/1P6/P1PPPPPP/RNBQKBNR w KQkq - 0 2",
    eco: "A01",
    openingName: "Nimzovich-Larsen attack: symmetrical variation",
    moves: "1. b3 b6"
}, {
    fen: "rnbqkbnr/pppppppp/8/8/5P2/8/PPPPP1PP/RNBQKBNR b KQkq f3 0 1",
    eco: "A02",
    openingName: "Bird's opening",
    moves: "1. f4"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/4p3/5P2/8/PPPPP1PP/RNBQKBNR w KQkq e6 0 2",
    eco: "A02",
    openingName: "Bird: From gambit",
    moves: "1. f4 e5"
}, {
    fen: "rnbqk1nr/ppp2p1p/3b4/6p1/8/5N2/PPPPP1PP/RNBQKB1R w KQkq g6 0 5",
    eco: "A02",
    openingName: "Bird: From gambit, Lasker variation",
    moves: "1. f4 e5 2. fxe5 d6 3. exd6 Bxd6 4. Nf3 g5"
}, {
    fen: "rnbqk2r/ppp2ppp/3b3n/8/3P4/5N2/PPP1P1PP/RNBQKB1R b KQkq d3 0 5",
    eco: "A02",
    openingName: "Bird: From gambit, Lipke variation",
    moves: "1. f4 e5 2. fxe5 d6 3. exd6 Bxd6 4. Nf3 Nh6 5. d4"
}, {
    fen: "rnbqkb1r/ppppp1pp/5n2/8/4pPP1/2N5/PPPP3P/R1BQKBNR b KQkq g3 0 4",
    eco: "A02",
    openingName: "Bird's opening, Swiss gambit",
    moves: "1. f4 f5 2. e4 fxe4 3. Nc3 Nf6 4. g4"
}, {
    fen: "rnbqkbnr/pppppp1p/8/6p1/5P2/8/PPPPP1PP/RNBQKBNR w KQkq g6 0 2",
    eco: "A02",
    openingName: "Bird: Hobbs gambit",
    moves: "1. f4 g5"
}, {
    fen: "rnbqkbnr/ppp1pppp/8/3p4/5P2/8/PPPPP1PP/RNBQKBNR w KQkq d6 0 2",
    eco: "A03",
    openingName: "Bird's opening",
    moves: "1. f4 d5"
}, {
    fen: "rnbqkbnr/ppp1pppp/8/3p4/2P2P2/8/PP1PP1PP/RNBQKBNR b KQkq c3 0 2",
    eco: "A03",
    openingName: "Mujannah opening",
    moves: "1. f4 d5 2. c4"
}, {
    fen: "rnbqkbnr/ppp1pppp/8/3p4/4PP2/8/PPPP2PP/RNBQKBNR b KQkq e3 0 2",
    eco: "A03",
    openingName: "Bird's opening: Williams gambit",
    moves: "1. f4 d5 2. e4"
}, {
    fen: "rnbqkb1r/pp2pppp/5n2/2pp4/5P2/4PN2/PPPP2PP/RNBQKB1R w KQkq c6 0 4",
    eco: "A03",
    openingName: "Bird's opening: Lasker variation",
    moves: "1. f4 d5 2. Nf3 Nf6 3. e3 c5"
}, {
    fen: "rnbqkbnr/pppppppp/8/8/8/5N2/PPPPPPPP/RNBQKB1R b KQkq - 1 1",
    eco: "A04",
    openingName: "Reti opening",
    moves: "1. Nf3"
}, {
    fen: "rnbqkbnr/ppppp1pp/8/5p2/8/5N2/PPPPPPPP/RNBQKB1R w KQkq f6 0 2",
    eco: "A04",
    openingName: "Reti v Dutch",
    moves: "1. Nf3 f5"
}, {
    fen: "rnbqkbnr/ppppp1pp/8/5p2/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq e3 0 2",
    eco: "A04",
    openingName: "Reti: Pirc-Lisitsin gambit",
    moves: "1. Nf3 f5 2. e4"
}, {
    fen: "rnbqkb1r/ppppp1pp/5n2/5p2/4P3/3P1N2/PPP2PPP/RNBQKB1R b KQkq e3 0 3",
    eco: "A04",
    openingName: "Reti: Lisitsin gambit deferred",
    moves: "1. Nf3 f5 2. d3 Nf6 3. e4"
}, {
    fen: "rnbqkbnr/ppp1pppp/3p4/8/8/5N2/PPPPPPPP/RNBQKB1R w KQkq - 0 2",
    eco: "A04",
    openingName: "Reti opening",
    moves: "1. Nf3 d6"
}, {
    fen: "rn1qkbnr/ppp1pppp/3p4/8/4P1b1/5N2/PPPP1PPP/RNBQKB1R w KQkq - 1 3",
    eco: "A04",
    openingName: "Reti: Wade defence",
    moves: "1. Nf3 d6 2. e4 Bg4"
}, {
    fen: "rnbqkbnr/pppppp1p/8/6p1/8/5N2/PPPPPPPP/RNBQKB1R w KQkq g6 0 2",
    eco: "A04",
    openingName: "Reti: Herrstroem gambit",
    moves: "1. Nf3 g5"
}, {
    fen: "rnbqkb1r/pppppppp/5n2/8/8/5N2/PPPPPPPP/RNBQKB1R w KQkq - 2 2",
    eco: "A05",
    openingName: "Reti opening",
    moves: "1. Nf3 Nf6"
}, {
    fen: "rnbqkb1r/p1pppppp/5n2/1p6/8/5NP1/PPPPPP1P/RNBQKB1R w KQkq b6 0 3",
    eco: "A05",
    openingName: "Reti: King's Indian attack, Spassky's variation",
    moves: "1. Nf3 Nf6 2. g3 b5"
}, {
    fen: "rnbqkb1r/pppppp1p/5np1/8/8/5NP1/PPPPPP1P/RNBQKB1R w KQkq - 0 3",
    eco: "A05",
    openingName: "Reti: King's Indian attack",
    moves: "1. Nf3 Nf6 2. g3 g6"
}, {
    fen: "rnbqkb1r/pppppp1p/5np1/8/1P6/5NP1/P1PPPP1P/RNBQKB1R b KQkq b3 0 3",
    eco: "A05",
    openingName: "Reti: King's Indian attack, Reti-Smyslov variation",
    moves: "1. Nf3 Nf6 2. g3 g6 3. b4"
}, {
    fen: "rnbqkbnr/ppp1pppp/8/3p4/8/5N2/PPPPPPPP/RNBQKB1R w KQkq d6 0 2",
    eco: "A06",
    openingName: "Reti opening",
    moves: "1. Nf3 d5"
}, {
    fen: "rnbqkbnr/ppp1pppp/8/3p4/8/3P1N2/PPP1PPPP/RNBQKB1R b KQkq - 0 2",
    eco: "A06",
    openingName: "Reti: old Indian attack",
    moves: "1. Nf3 d5 2. d3"
}, {
    fen: "rnbqkbnr/ppp1pppp/8/3p4/1P6/5N2/P1PPPPPP/RNBQKB1R b KQkq b3 0 2",
    eco: "A06",
    openingName: "Santasiere's folly",
    moves: "1. Nf3 d5 2. b4"
}, {
    fen: "rnbqkbnr/ppp1pppp/8/3p4/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq e3 0 2",
    eco: "A06",
    openingName: "Tennison (Lemberg, Zukertort) gambit",
    moves: "1. Nf3 d5 2. e4"
}, {
    fen: "rnbqkbnr/ppp1pppp/8/3p4/8/1P3N2/P1PPPPPP/RNBQKB1R b KQkq - 0 2",
    eco: "A06",
    openingName: "Reti: Nimzovich-Larsen attack",
    moves: "1. Nf3 d5 2. b3"
}, {
    fen: "rnbqkbnr/ppp1pppp/8/3p4/8/5NP1/PPPPPP1P/RNBQKB1R b KQkq - 0 2",
    eco: "A07",
    openingName: "Reti: King's Indian attack (Barcza system)",
    moves: "1. Nf3 d5 2. g3"
}, {
    fen: "rn1qkb1r/pp2pppp/2p2n2/3p4/6b1/5NP1/PPPPPPBP/RNBQ1RK1 w kq - 2 5",
    eco: "A07",
    openingName: "Reti: King's Indian attack, Yugoslav variation",
    moves: "1. Nf3 d5 2. g3 Nf6 3. Bg2 c6 4. O-O Bg4"
}, {
    fen: "r2qkbnr/pppnpppp/8/3p4/6b1/5NP1/PPPPPPBP/RNBQK2R w KQkq - 3 4",
    eco: "A07",
    openingName: "Reti: King's Indian attack, Keres variation",
    moves: "1. Nf3 d5 2. g3 Bg4 3. Bg2 Nd7"
}, {
    fen: "rnbqkbnr/ppp1pp1p/6p1/3p4/8/5NP1/PPPPPP1P/RNBQKB1R w KQkq - 0 3",
    eco: "A07",
    openingName: "Reti: King's Indian attack",
    moves: "1. Nf3 d5 2. g3 g6"
}, {
    fen: "rnbqk2r/ppp1npbp/6p1/3pp3/8/3P1NP1/PPP1PPBP/RNBQ1RK1 w kq - 1 6",
    eco: "A07",
    openingName: "Reti: King's Indian attack, Pachman system",
    moves: "1. Nf3 d5 2. g3 g6 3. Bg2 Bg7 4. O-O e5 5. d3 Ne7"
}, {
    fen: "rnbqkbnr/pp2pppp/8/2pp4/8/5NP1/PPPPPP1P/RNBQKB1R w KQkq c6 0 3",
    eco: "A07",
    openingName: "Reti: King's Indian attack (with ...c5)",
    moves: "1. Nf3 d5 2. g3 c5"
}, {
    fen: "rnbqkbnr/pp2pppp/8/2pp4/8/5NP1/PPPPPPBP/RNBQK2R b KQkq - 1 3",
    eco: "A08",
    openingName: "Reti: King's Indian attack",
    moves: "1. Nf3 d5 2. g3 c5 3. Bg2"
}, {
    fen: "r1bq1rk1/pp2bppp/2n1pn2/2pp4/4P3/3P1NP1/PPPN1PBP/R1BQR1K1 b - - 2 8",
    eco: "A08",
    openingName: "Reti: King's Indian attack, French variation",
    moves: "1. Nf3 d5 2. g3 c5 3. Bg2 Nc6 4. O-O e6 5. d3 Nf6 6. Nbd2 Be7 7. e4 O-O 8. Re1"
}, {
    fen: "rnbqkbnr/ppp1pppp/8/3p4/2P5/5N2/PP1PPPPP/RNBQKB1R b KQkq c3 0 2",
    eco: "A09",
    openingName: "Reti opening",
    moves: "1. Nf3 d5 2. c4"
}, {
    fen: "rnbqkbnr/ppp1pppp/8/8/2Pp4/5N2/PP1PPPPP/RNBQKB1R w KQkq - 0 3",
    eco: "A09",
    openingName: "Reti: advance variation",
    moves: "1. Nf3 d5 2. c4 d4"
}, {
    fen: "rnbqkbnr/ppp1pppp/8/8/2p5/5N2/PP1PPPPP/RNBQKB1R w KQkq - 0 3",
    eco: "A09",
    openingName: "Reti accepted",
    moves: "1. Nf3 d5 2. c4 dxc4"
}, {
    fen: "rn1qkbnr/ppp1pppp/4b3/8/2p5/4PN2/PP1P1PPP/RNBQKB1R w KQkq - 1 4",
    eco: "A09",
    openingName: "Reti accepted: Keres variation",
    moves: "1. Nf3 d5 2. c4 dxc4 3. e3 Be6"
}, {
    fen: "rnbqkbnr/pppppppp/8/8/2P5/8/PP1PPPPP/RNBQKBNR b KQkq c3 0 1",
    eco: "A10",
    openingName: "English opening",
    moves: "1. c4"
}, {
    fen: "rnbqkbnr/pppppp1p/6p1/8/2P5/8/PP1PPPPP/RNBQKBNR w KQkq - 0 2",
    eco: "A10",
    openingName: "English opening",
    moves: "1. c4 g6"
}, {
    fen: "rnbqkbnr/pppp1p1p/6p1/4p3/2P1P3/8/PP1P1PPP/RNBQKBNR w KQkq e6 0 3",
    eco: "A10",
    openingName: "English: Adorjan defence",
    moves: "1. c4 g6 2. e4 e5"
}, {
    fen: "rnbqkbnr/p1pppppp/8/1p6/2P5/8/PP1PPPPP/RNBQKBNR w KQkq b6 0 2",
    eco: "A10",
    openingName: "English: Jaenisch gambit",
    moves: "1. c4 b5"
}, {
    fen: "rnbqkbnr/ppppp1pp/8/5p2/2P5/8/PP1PPPPP/RNBQKBNR w KQkq f6 0 2",
    eco: "A10",
    openingName: "English: Anglo-Dutch defense",
    moves: "1. c4 f5"
}, {
    fen: "rnbqkbnr/pp1ppppp/2p5/8/2P5/8/PP1PPPPP/RNBQKBNR w KQkq - 0 2",
    eco: "A11",
    openingName: "English: Caro-Kann defensive system",
    moves: "1. c4 c6"
}, {
    fen: "rnbqkbnr/pp2pppp/2p5/3p4/2P5/1P3N2/P2PPPPP/RNBQKB1R b KQkq - 0 3",
    eco: "A12",
    openingName: "English: Caro-Kann defensive system",
    moves: "1. c4 c6 2. Nf3 d5 3. b3"
}, {
    fen: "rn1qkb1r/pp2pppp/2p2n2/3p4/2P3b1/1P3NP1/P2PPP1P/RNBQKB1R w KQkq - 1 5",
    eco: "A12",
    openingName: "English: Torre defensive system",
    moves: "1. c4 c6 2. Nf3 d5 3. b3 Nf6 4. g3 Bg4"
}, {
    fen: "rn1qkb1r/pp2pppp/2p2n2/3p1b2/2P5/1P3NP1/P2PPP1P/RNBQKB1R w KQkq - 1 5",
    eco: "A12",
    openingName: "English: London defensive system",
    moves: "1. c4 c6 2. Nf3 d5 3. b3 Nf6 4. g3 Bf5"
}, {
    fen: "rnbqkb1r/pp2pppp/2p2n2/3p4/2P5/1P3N2/PB1PPPPP/RN1QKB1R b KQkq - 2 4",
    eco: "A12",
    openingName: "English: Caro-Kann defensive system",
    moves: "1. c4 c6 2. Nf3 d5 3. b3 Nf6 4. Bb2"
}, {
    fen: "rnbqkb1r/pp2pp1p/2p2np1/3p4/2P5/1P3N2/PB1PPPPP/RN1QKB1R w KQkq - 0 5",
    eco: "A12",
    openingName: "English: Bled variation",
    moves: "1. c4 c6 2. Nf3 d5 3. b3 Nf6 4. Bb2 g6"
}, {
    fen: "rn1qkb1r/pp2pppp/2p2n2/3p1b2/2P5/1P3N2/PB1PPPPP/RN1QKB1R w KQkq - 3 5",
    eco: "A12",
    openingName: "English: New York (London) defensive system",
    moves: "1. c4 c6 2. Nf3 d5 3. b3 Nf6 4. Bb2 Bf5"
}, {
    fen: "rn1qkb1r/pp2pppp/2p2n2/3p4/2P3b1/1P3N2/PB1PPPPP/RN1QKB1R w KQkq - 3 5",
    eco: "A12",
    openingName: "English: Capablanca's variation",
    moves: "1. c4 c6 2. Nf3 d5 3. b3 Nf6 4. Bb2 Bg4"
}, {
    fen: "rn1qkbnr/pp2pppp/2p5/3p4/2P3b1/1P3N2/P2PPPPP/RNBQKB1R w KQkq - 1 4",
    eco: "A12",
    openingName: "English: Caro-Kann defensive system, Bogolyubov variation",
    moves: "1. c4 c6 2. Nf3 d5 3. b3 Bg4"
}, {
    fen: "rnbqkbnr/pppp1ppp/4p3/8/2P5/8/PP1PPPPP/RNBQKBNR w KQkq - 0 2",
    eco: "A13",
    openingName: "English opening",
    moves: "1. c4 e6"
}, {
    fen: "rnbqkb1r/2pp1ppp/p3pn2/1p6/2P5/5NP1/PP1PPPBP/RNBQK2R w KQkq b6 0 5",
    eco: "A13",
    openingName: "English: Romanishin gambit",
    moves: "1. c4 e6 2. Nf3 Nf6 3. g3 a6 4. Bg2 b5"
}, {
    fen: "rnbqkbnr/ppp2ppp/4p3/3p4/2P5/5N2/PP1PPPPP/RNBQKB1R w KQkq d6 0 3",
    eco: "A13",
    openingName: "English opening: Agincourt variation",
    moves: "1. c4 e6 2. Nf3 d5"
}, {
    fen: "rnbqkb1r/pp3ppp/4pn2/2pp4/2P5/1P2PN2/PB1P1PPP/RN1QKB1R b KQkq - 0 5",
    eco: "A13",
    openingName: "English: Wimpey system",
    moves: "1. c4 e6 2. Nf3 d5 3. b3 Nf6 4. Bb2 c5 5. e3"
}, {
    fen: "rnbqkbnr/ppp2ppp/4p3/3p4/2P5/5NP1/PP1PPP1P/RNBQKB1R b KQkq - 0 3",
    eco: "A13",
    openingName: "English opening: Agincourt variation",
    moves: "1. c4 e6 2. Nf3 d5 3. g3"
}, {
    fen: "rnbqkbnr/pp3ppp/2p1p3/3p4/2P5/5NP1/PP1PPP1P/RNBQKB1R w KQkq - 0 4",
    eco: "A13",
    openingName: "English: Kurajica defence",
    moves: "1. c4 e6 2. Nf3 d5 3. g3 c6"
}, {
    fen: "rnbqkb1r/ppp2ppp/4pn2/3p4/2P5/5NP1/PP1PPP1P/RNBQKB1R w KQkq - 1 4",
    eco: "A13",
    openingName: "English: Neo-Catalan",
    moves: "1. c4 e6 2. Nf3 d5 3. g3 Nf6"
}, {
    fen: "rnbqkb1r/ppp2ppp/4pn2/8/2p5/5NP1/PP1PPPBP/RNBQK2R w KQkq - 0 5",
    eco: "A13",
    openingName: "English: Neo-Catalan accepted",
    moves: "1. c4 e6 2. Nf3 d5 3. g3 Nf6 4. Bg2 dxc4"
}, {
    fen: "rnbqk2r/ppp1bppp/4pn2/3p4/2P5/5NP1/PP1PPPBP/RNBQ1RK1 b kq - 4 5",
    eco: "A14",
    openingName: "English: Neo-Catalan declined",
    moves: "1. c4 e6 2. Nf3 d5 3. g3 Nf6 4. Bg2 Be7 5. O-O"
}, {
    fen: "r1bqk2r/pp2bppp/2n1p3/2pn4/8/2N2NP1/PP1PPPBP/R1BQ1RK1 w kq - 2 8",
    eco: "A14",
    openingName: "English: Symmetrical, Keres defence",
    moves: "1. c4 e6 2. Nf3 d5 3. g3 Nf6 4. Bg2 Be7 5. O-O c5 6. cxd5 Nxd5 7. Nc3 Nc6"
}, {
    fen: "rnbqkb1r/pppppppp/5n2/8/2P5/8/PP1PPPPP/RNBQKBNR w KQkq - 1 2",
    eco: "A15",
    openingName: "English, 1...Nf6 (Anglo-Indian defense)",
    moves: "1. c4 Nf6"
}, {
    fen: "rnbqkb1r/pppppppp/5n2/8/1PP5/8/P2PPPPP/RNBQKBNR b KQkq b3 0 2",
    eco: "A15",
    openingName: "English orang-utan",
    moves: "1. c4 Nf6 2. b4"
}, {
    fen: "rnbqkb1r/pppppppp/5n2/8/2P5/5N2/PP1PPPPP/RNBQKB1R b KQkq - 2 2",
    eco: "A15",
    openingName: "English opening",
    moves: "1. c4 Nf6 2. Nf3"
}, {
    fen: "rnbqkb1r/pppppppp/5n2/8/2P5/2N5/PP1PPPPP/R1BQKBNR b KQkq - 2 2",
    eco: "A16",
    openingName: "English opening",
    moves: "1. c4 Nf6 2. Nc3"
}, {
    fen: "rnbqkb1r/ppp1pppp/5n2/3p4/2P5/2N5/PP1PPPPP/R1BQKBNR w KQkq d6 0 3",
    eco: "A16",
    openingName: "English: Anglo-Gruenfeld defense",
    moves: "1. c4 Nf6 2. Nc3 d5"
}, {
    fen: "rnbqkb1r/ppp1pp1p/6p1/8/8/2n3P1/PP1PPPBP/R1BQK1NR w KQkq - 0 6",
    eco: "A16",
    openingName: "English: Anglo-Gruenfeld, Smyslov defense",
    moves: "1. c4 Nf6 2. Nc3 d5 3. cxd5 Nxd5 4. g3 g6 5. Bg2 Nxc3"
}, {
    fen: "rnbqkb1r/ppp1pp1p/1n4p1/8/8/2N3P1/PP1PPPBP/R1BQK1NR w KQkq - 2 6",
    eco: "A16",
    openingName: "English: Anglo-Gruenfeld, Czech defense",
    moves: "1. c4 Nf6 2. Nc3 d5 3. cxd5 Nxd5 4. g3 g6 5. Bg2 Nb6"
}, {
    fen: "rnbqkb1r/ppp1pppp/8/3n4/8/2N2N2/PP1PPPPP/R1BQKB1R b KQkq - 1 4",
    eco: "A16",
    openingName: "English: Anglo-Gruenfeld defense",
    moves: "1. c4 Nf6 2. Nc3 d5 3. cxd5 Nxd5 4. Nf3"
}, {
    fen: "rnbqk2r/ppp2pbp/6p1/3np3/8/2N2NP1/PP1PPPBP/R1BQK2R w KQkq e6 0 7",
    eco: "A16",
    openingName: "English: Anglo-Gruenfeld defense, Korchnoi variation",
    moves: "1. c4 Nf6 2. Nc3 d5 3. cxd5 Nxd5 4. Nf3 g6 5. g3 Bg7 6. Bg2 e5"
}, {
    fen: "rnbqkb1r/pppp1ppp/4pn2/8/2P5/2N5/PP1PPPPP/R1BQKBNR w KQkq - 0 3",
    eco: "A17",
    openingName: "English opening",
    moves: "1. c4 Nf6 2. Nc3 e6"
}, {
    fen: "rnbqkb1r/p1pp1ppp/1p2pn2/8/2P5/2N2N2/PP1PPPPP/R1BQKB1R w KQkq - 0 4",
    eco: "A17",
    openingName: "English: Queens Indian formation",
    moves: "1. c4 Nf6 2. Nc3 e6 3. Nf3 b6"
}, {
    fen: "rn1qkb1r/pbpp1ppp/1p2pn2/8/2P1P3/2NB1N2/PP1P1PPP/R1BQK2R b KQkq - 2 5",
    eco: "A17",
    openingName: "English: Queens Indian, Romanishin variation",
    moves: "1. c4 Nf6 2. Nc3 e6 3. Nf3 b6 4. e4 Bb7 5. Bd3"
}, {
    fen: "rnbqk2r/pppp1ppp/4pn2/8/1bP5/2N2N2/PP1PPPPP/R1BQKB1R w KQkq - 2 4",
    eco: "A17",
    openingName: "English: Nimzo-English opening",
    moves: "1. c4 Nf6 2. Nc3 e6 3. Nf3 Bb4"
}, {
    fen: "rnbqkb1r/pppp1ppp/4pn2/8/2P1P3/2N5/PP1P1PPP/R1BQKBNR b KQkq e3 0 3",
    eco: "A18",
    openingName: "English: Mikenas-Carls variation",
    moves: "1. c4 Nf6 2. Nc3 e6 3. e4"
}, {
    fen: "rnbqkb1r/ppp2ppp/4pn2/3pP3/2P5/2N5/PP1P1PPP/R1BQKBNR b KQkq - 0 4",
    eco: "A18",
    openingName: "English: Mikenas-Carls, Flohr variation",
    moves: "1. c4 Nf6 2. Nc3 e6 3. e4 d5 4. e5"
}, {
    fen: "r1bqkb1r/pppp1ppp/2n1pn2/8/2P1P3/2N5/PP1P1PPP/R1BQKBNR w KQkq - 1 4",
    eco: "A18",
    openingName: "English: Mikenas-Carls, Kevitz variation",
    moves: "1. c4 Nf6 2. Nc3 e6 3. e4 Nc6"
}, {
    fen: "rnbqkb1r/pp1p1ppp/4pn2/2p5/2P1P3/2N5/PP1P1PPP/R1BQKBNR w KQkq c6 0 4",
    eco: "A19",
    openingName: "English: Mikenas-Carls, Sicilian variation",
    moves: "1. c4 Nf6 2. Nc3 e6 3. e4 c5"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/4p3/2P5/8/PP1PPPPP/RNBQKBNR w KQkq e6 0 2",
    eco: "A20",
    openingName: "English opening",
    moves: "1. c4 e5"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/4p3/2P5/5N2/PP1PPPPP/RNBQKB1R b KQkq - 1 2",
    eco: "A20",
    openingName: "English, Nimzovich variation",
    moves: "1. c4 e5 2. Nf3"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/8/2P1p3/5N2/PP1PPPPP/RNBQKB1R w KQkq - 0 3",
    eco: "A20",
    openingName: "English, Nimzovich, Flohr variation",
    moves: "1. c4 e5 2. Nf3 e4"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/4p3/2P5/2N5/PP1PPPPP/R1BQKBNR b KQkq - 1 2",
    eco: "A21",
    openingName: "English opening",
    moves: "1. c4 e5 2. Nc3"
}, {
    fen: "r2qkbnr/ppp2ppp/2npb3/4p3/2P5/2N3P1/PP1PPPBP/R1BQK1NR w KQkq - 3 5",
    eco: "A21",
    openingName: "English, Troeger defence",
    moves: "1. c4 e5 2. Nc3 d6 3. g3 Be6 4. Bg2 Nc6"
}, {
    fen: "rnbqkbnr/pp3ppp/2pp4/4p3/2P5/2N3P1/PP1PPP1P/R1BQKBNR w KQkq - 0 4",
    eco: "A21",
    openingName: "English, Keres variation",
    moves: "1. c4 e5 2. Nc3 d6 3. g3 c6"
}, {
    fen: "rnbqkbnr/ppp2ppp/3p4/4p3/2P5/2N2N2/PP1PPPPP/R1BQKB1R b KQkq - 1 3",
    eco: "A21",
    openingName: "English opening",
    moves: "1. c4 e5 2. Nc3 d6 3. Nf3"
}, {
    fen: "rn1qkbnr/ppp2ppp/3p4/4p3/2P3b1/2N2N2/PP1PPPPP/R1BQKB1R w KQkq - 2 4",
    eco: "A21",
    openingName: "English, Smyslov defence",
    moves: "1. c4 e5 2. Nc3 d6 3. Nf3 Bg4"
}, {
    fen: "rnbqk1nr/pppp1ppp/8/4p3/1bP5/2N5/PP1PPPPP/R1BQKBNR w KQkq - 2 3",
    eco: "A21",
    openingName: "English, Kramnik-Shirov counterattack",
    moves: "1. c4 e5 2. Nc3 Bb4"
}, {
    fen: "rnbqkb1r/pppp1ppp/5n2/4p3/2P5/2N5/PP1PPPPP/R1BQKBNR w KQkq - 2 3",
    eco: "A22",
    openingName: "English opening",
    moves: "1. c4 e5 2. Nc3 Nf6"
}, {
    fen: "rnbqkb1r/p1pp1ppp/5n2/1p4N1/2P1p3/2N5/PP1PPPPP/R1BQKB1R w KQkq b6 0 5",
    eco: "A22",
    openingName: "English: Bellon gambit",
    moves: "1. c4 e5 2. Nc3 Nf6 3. Nf3 e4 4. Ng5 b5"
}, {
    fen: "rnbqkb1r/pppp1ppp/5n2/4p3/2P5/2N3P1/PP1PPP1P/R1BQKBNR b KQkq - 0 3",
    eco: "A22",
    openingName: "English: Carls' Bremen system",
    moves: "1. c4 e5 2. Nc3 Nf6 3. g3"
}, {
    fen: "rnbqkb1r/ppp2ppp/5n2/3pp3/2P5/2N3P1/PP1PPP1P/R1BQKBNR w KQkq d6 0 4",
    eco: "A22",
    openingName: "English: Bremen, reverse dragon",
    moves: "1. c4 e5 2. Nc3 Nf6 3. g3 d5"
}, {
    fen: "rnbqk2r/pppp1ppp/5n2/4p3/1bP5/2N3P1/PP1PPP1P/R1BQKBNR w KQkq - 1 4",
    eco: "A22",
    openingName: "English: Bremen, Smyslov system",
    moves: "1. c4 e5 2. Nc3 Nf6 3. g3 Bb4"
}, {
    fen: "rnbqkb1r/pp1p1ppp/2p2n2/4p3/2P5/2N3P1/PP1PPP1P/R1BQKBNR w KQkq - 0 4",
    eco: "A23",
    openingName: "English: Bremen system, Keres variation",
    moves: "1. c4 e5 2. Nc3 Nf6 3. g3 c6"
}, {
    fen: "rnbqkb1r/pppp1p1p/5np1/4p3/2P5/2N3P1/PP1PPP1P/R1BQKBNR w KQkq - 0 4",
    eco: "A24",
    openingName: "English: Bremen system with ...g6",
    moves: "1. c4 e5 2. Nc3 Nf6 3. g3 g6"
}, {
    fen: "r1bqkbnr/pppp1ppp/2n5/4p3/2P5/2N5/PP1PPPPP/R1BQKBNR w KQkq - 2 3",
    eco: "A25",
    openingName: "English: Sicilian reversed",
    moves: "1. c4 e5 2. Nc3 Nc6"
}, {
    fen: "r1bqk1nr/pppp1pbp/2n3p1/4p3/2P5/2N3P1/PP1PPPBP/R1BQK1NR w KQkq - 2 5",
    eco: "A25",
    openingName: "English: closed system",
    moves: "1. c4 e5 2. Nc3 Nc6 3. g3 g6 4. Bg2 Bg7"
}, {
    fen: "r1bqk2r/ppp2pbp/2np2pn/4p3/2P5/2N1P1P1/PP1PNPBP/R1BQK2R w KQkq - 2 7",
    eco: "A25",
    openingName: "English: closed, Taimanov variation",
    moves: "1. c4 e5 2. Nc3 Nc6 3. g3 g6 4. Bg2 Bg7 5. e3 d6 6. Nge2 Nh6"
}, {
    fen: "r2qk1nr/ppp2pbp/2npb1p1/4p3/2P5/2N1P1P1/PP1PNPBP/R1BQK2R w KQkq - 2 7",
    eco: "A25",
    openingName: "English: closed, Hort variation",
    moves: "1. c4 e5 2. Nc3 Nc6 3. g3 g6 4. Bg2 Bg7 5. e3 d6 6. Nge2 Be6"
}, {
    fen: "r1bqk1nr/pppp1pbp/2n3p1/4p3/2P5/2N3P1/PP1PPPBP/1RBQK1NR b Kkq - 3 5",
    eco: "A25",
    openingName: "English: closed, 5.Rb1",
    moves: "1. c4 e5 2. Nc3 Nc6 3. g3 g6 4. Bg2 Bg7 5. Rb1"
}, {
    fen: "r1bqk2r/pppp1pbp/2n3pn/4p3/2P5/2N3P1/PP1PPPBP/1RBQK1NR w Kkq - 4 6",
    eco: "A25",
    openingName: "English: closed, 5.Rb1 Taimanov variation",
    moves: "1. c4 e5 2. Nc3 Nc6 3. g3 g6 4. Bg2 Bg7 5. Rb1 Nh6"
}, {
    fen: "r1bqk1nr/pppp1pbp/2n3p1/4p3/2P5/2NP2P1/PP2PPBP/R1BQK1NR b KQkq - 0 5",
    eco: "A25",
    openingName: "English: closed system (without ...d6)",
    moves: "1. c4 e5 2. Nc3 Nc6 3. g3 g6 4. Bg2 Bg7 5. d3"
}, {
    fen: "r1bqk1nr/ppp2pbp/2np2p1/4p3/2P5/2NP2P1/PP2PPBP/R1BQK1NR w KQkq - 0 6",
    eco: "A26",
    openingName: "English: closed system",
    moves: "1. c4 e5 2. Nc3 Nc6 3. g3 g6 4. Bg2 Bg7 5. d3 d6"
}, {
    fen: "r1bqk1nr/ppp2pbp/2np2p1/4p3/2P1P3/2NP2P1/PP3PBP/R1BQK1NR b KQkq e3 0 6",
    eco: "A26",
    openingName: "English: Botvinnik system",
    moves: "1. c4 e5 2. Nc3 Nc6 3. g3 g6 4. Bg2 Bg7 5. d3 d6 6. e4"
}, {
    fen: "r1bqkbnr/pppp1ppp/2n5/4p3/2P5/2N2N2/PP1PPPPP/R1BQKB1R b KQkq - 3 3",
    eco: "A27",
    openingName: "English: three knights system",
    moves: "1. c4 e5 2. Nc3 Nc6 3. Nf3"
}, {
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2P5/2N2N2/PP1PPPPP/R1BQKB1R w KQkq - 4 4",
    eco: "A28",
    openingName: "English: four knights system",
    moves: "1. c4 e5 2. Nc3 Nc6 3. Nf3 Nf6"
}, {
    fen: "r1bqk2r/pppp1pp1/5n1p/4n3/2PN3B/2P5/P3PPPP/R2QKB1R w KQkq - 1 9",
    eco: "A28",
    openingName: "English: Nenarokov variation",
    moves: "1. c4 e5 2. Nc3 Nc6 3. Nf3 Nf6 4. d4 exd4 5. Nxd4 Bb4 6. Bg5 h6 7. Bh4 Bxc3+ 8. bxc3 Ne5"
}, {
    fen: "r1bqkb1r/pppp1ppp/2n2n2/8/2PPp3/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 5",
    eco: "A28",
    openingName: "English: Bradley Beach variation",
    moves: "1. c4 e5 2. Nc3 Nc6 3. Nf3 Nf6 4. d4 e4"
}, {
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2P1P3/2N2N2/PP1P1PPP/R1BQKB1R b KQkq e3 0 4",
    eco: "A28",
    openingName: "English: four knights, Nimzovich variation",
    moves: "1. c4 e5 2. Nc3 Nc6 3. Nf3 Nf6 4. e4"
}, {
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2P5/P1N2N2/1P1PPPPP/R1BQKB1R b KQkq - 0 4",
    eco: "A28",
    openingName: "English: four knights, Marini variation",
    moves: "1. c4 e5 2. Nc3 Nc6 3. Nf3 Nf6 4. a3"
}, {
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2P5/2NP1N2/PP2PPPP/R1BQKB1R b KQkq - 0 4",
    eco: "A28",
    openingName: "English: four knights, Capablanca variation",
    moves: "1. c4 e5 2. Nc3 Nc6 3. Nf3 Nf6 4. d3"
}, {
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2P5/2N1PN2/PP1P1PPP/R1BQKB1R b KQkq - 0 4",
    eco: "A28",
    openingName: "English: four knights, 4.e3",
    moves: "1. c4 e5 2. Nc3 Nc6 3. Nf3 Nf6 4. e3"
}, {
    fen: "r1bqr1k1/pppp1ppp/2n2n2/3NpQ2/1bP5/4PN2/PP1P1PPP/R1B1KB1R b KQ - 6 7",
    eco: "A28",
    openingName: "English: four knights, Stean variation",
    moves: "1. c4 e5 2. Nc3 Nc6 3. Nf3 Nf6 4. e3 Bb4 5. Qc2 O-O 6. Nd5 Re8 7. Qf5"
}, {
    fen: "r1bqk2r/pppp1ppp/2n2n2/4p3/2P5/2b1PN2/PPQP1PPP/R1B1KB1R w KQkq - 0 6",
    eco: "A28",
    openingName: "English: four knights, Romanishin variation",
    moves: "1. c4 e5 2. Nc3 Nc6 3. Nf3 Nf6 4. e3 Bb4 5. Qc2 Bxc3"
}, {
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2P5/2N2NP1/PP1PPP1P/R1BQKB1R b KQkq - 0 4",
    eco: "A29",
    openingName: "English: four knights, kingside fianchetto",
    moves: "1. c4 e5 2. Nc3 Nc6 3. Nf3 Nf6 4. g3"
}, {
    fen: "rnbqkbnr/pp1ppppp/8/2p5/2P5/8/PP1PPPPP/RNBQKBNR w KQkq c6 0 2",
    eco: "A30",
    openingName: "English: symmetrical variation",
    moves: "1. c4 c5"
}, {
    fen: "rn1qk2r/pb1pbppp/1p2pn2/2p5/2P5/2N2NP1/PP1PPPBP/R1BQ1RK1 w kq - 2 7",
    eco: "A30",
    openingName: "English: symmetrical, hedgehog system",
    moves: "1. c4 c5 2. Nf3 Nf6 3. g3 b6 4. Bg2 Bb7 5. O-O e6 6. Nc3 Be7"
}, {
    fen: "r2qk2r/1b1nbppp/pp1ppn2/8/2PQ4/1PN2NP1/P3PPBP/R1BR2K1 w kq - 1 11",
    eco: "A30",
    openingName: "English: symmetrical, hedgehog, flexible formation",
    moves: "1. c4 c5 2. Nf3 Nf6 3. g3 b6 4. Bg2 Bb7 5. O-O e6 6. Nc3 Be7 7. d4 cxd4 8. Qxd4 d6 9. Rd1 a6 10. b3 Nbd7"
}, {
    fen: "rnbqkb1r/pp1ppppp/5n2/2p5/2PP4/5N2/PP2PPPP/RNBQKB1R b KQkq d3 0 3",
    eco: "A31",
    openingName: "English: symmetrical, Benoni formation",
    moves: "1. c4 c5 2. Nf3 Nf6 3. d4"
}, {
    fen: "rnbqkb1r/pp1p1ppp/4pn2/8/2PN4/8/PP2PPPP/RNBQKB1R w KQkq - 0 5",
    eco: "A32",
    openingName: "English: symmetrical variation",
    moves: "1. c4 c5 2. Nf3 Nf6 3. d4 cxd4 4. Nxd4 e6"
}, {
    fen: "r1bqkb1r/pp1p1ppp/2n1pn2/8/2PN4/2N5/PP2PPPP/R1BQKB1R w KQkq - 2 6",
    eco: "A33",
    openingName: "English: symmetrical variation",
    moves: "1. c4 c5 2. Nf3 Nf6 3. d4 cxd4 4. Nxd4 e6 5. Nc3 Nc6"
}, {
    fen: "r1b1kb1r/pp1p1ppp/1qn1pn2/8/2PN4/2N3P1/PP2PP1P/R1BQKB1R w KQkq - 1 7",
    eco: "A33",
    openingName: "English: symmetrical, Geller variation",
    moves: "1. c4 c5 2. Nf3 Nf6 3. d4 cxd4 4. Nxd4 e6 5. Nc3 Nc6 6. g3 Qb6"
}, {
    fen: "rnbqkbnr/pp1ppppp/8/2p5/2P5/2N5/PP1PPPPP/R1BQKBNR b KQkq - 1 2",
    eco: "A34",
    openingName: "English: symmetrical variation",
    moves: "1. c4 c5 2. Nc3"
}, {
    fen: "rnbqkb1r/pp2pppp/8/2pn4/8/2N2N2/PP1PPPPP/R1BQKB1R w KQkq - 0 5",
    eco: "A34",
    openingName: "English: symmetrical, three knights system",
    moves: "1. c4 c5 2. Nc3 Nf6 3. Nf3 d5 4. cxd5 Nxd5"
}, {
    fen: "rnbqkb1r/pp1ppppp/5n2/2p5/2P5/2N3P1/PP1PPP1P/R1BQKBNR b KQkq - 0 3",
    eco: "A34",
    openingName: "English: symmetrical variation",
    moves: "1. c4 c5 2. Nc3 Nf6 3. g3"
}, {
    fen: "rnbqkb1r/ppn1pppp/8/2p5/8/2N3P1/PP1PPPBP/R1BQK1NR w KQkq - 2 6",
    eco: "A34",
    openingName: "English: symmetrical, Rubinstein system",
    moves: "1. c4 c5 2. Nc3 Nf6 3. g3 d5 4. cxd5 Nxd5 5. Bg2 Nc7"
}, {
    fen: "r1bqkbnr/pp1ppppp/2n5/2p5/2P5/2N5/PP1PPPPP/R1BQKBNR w KQkq - 2 3",
    eco: "A35",
    openingName: "English: symmetrical variation",
    moves: "1. c4 c5 2. Nc3 Nc6"
}, {
    fen: "r1bqkb1r/pp1ppppp/2n2n2/2p5/2P5/2N2N2/PP1PPPPP/R1BQKB1R w KQkq - 4 4",
    eco: "A35",
    openingName: "English: symmetrical, four knights system",
    moves: "1. c4 c5 2. Nc3 Nc6 3. Nf3 Nf6"
}, {
    fen: "r1bqkbnr/pp1ppppp/2n5/2p5/2P5/2N3P1/PP1PPP1P/R1BQKBNR b KQkq - 0 3",
    eco: "A36",
    openingName: "English: symmetrical variation",
    moves: "1. c4 c5 2. Nc3 Nc6 3. g3"
}, {
    fen: "r1bqk1nr/pp1pppbp/2n3p1/2p5/2P5/2N3P1/PP1PPPBP/R1BQK1NR w KQkq - 2 5",
    eco: "A36",
    openingName: "English: ultra-symmetrical variation",
    moves: "1. c4 c5 2. Nc3 Nc6 3. g3 g6 4. Bg2 Bg7"
}, {
    fen: "r1bqk1nr/pp1p1pbp/2n3p1/2p1p3/2P5/2N1P1P1/PP1P1PBP/R1BQK1NR w KQkq e6 0 6",
    eco: "A36",
    openingName: "English: symmetrical, Botvinnik system reversed",
    moves: "1. c4 c5 2. Nc3 Nc6 3. g3 g6 4. Bg2 Bg7 5. e3 e5"
}, {
    fen: "r1bqk1nr/pp1pppbp/2n3p1/2p5/2P1P3/2N3P1/PP1P1PBP/R1BQK1NR b KQkq e3 0 5",
    eco: "A36",
    openingName: "English: symmetrical, Botvinnik system",
    moves: "1. c4 c5 2. Nc3 Nc6 3. g3 g6 4. Bg2 Bg7 5. e4"
}, {
    fen: "r1bqk1nr/pp1pppbp/2n3p1/2p5/2P5/2N2NP1/PP1PPPBP/R1BQK2R b KQkq - 3 5",
    eco: "A37",
    openingName: "English: symmetrical variation",
    moves: "1. c4 c5 2. Nc3 Nc6 3. g3 g6 4. Bg2 Bg7 5. Nf3"
}, {
    fen: "r1bqk1nr/pp1p1pbp/2n3p1/2p1p3/2P5/2N2NP1/PP1PPPBP/R1BQK2R w KQkq e6 0 6",
    eco: "A37",
    openingName: "English: symmetrical, Botvinnik system reversed",
    moves: "1. c4 c5 2. Nc3 Nc6 3. g3 g6 4. Bg2 Bg7 5. Nf3 e5"
}, {
    fen: "r1bqk2r/pp1pppbp/2n2np1/2p5/2P5/2N2NP1/PP1PPPBP/R1BQK2R w KQkq - 4 6",
    eco: "A38",
    openingName: "English: symmetrical variation",
    moves: "1. c4 c5 2. Nc3 Nc6 3. g3 g6 4. Bg2 Bg7 5. Nf3 Nf6"
}, {
    fen: "r1bq1rk1/pp1pppbp/2n2np1/2p5/2P5/2NP1NP1/PP2PPBP/R1BQ1RK1 b - - 0 7",
    eco: "A38",
    openingName: "English: symmetrical, main line with d3",
    moves: "1. c4 c5 2. Nc3 Nc6 3. g3 g6 4. Bg2 Bg7 5. Nf3 Nf6 6. O-O O-O 7. d3"
}, {
    fen: "r1bq1rk1/pp1pppbp/2n2np1/2p5/2P5/1PN2NP1/P2PPPBP/R1BQ1RK1 b - - 0 7",
    eco: "A38",
    openingName: "English: symmetrical, main line with b3",
    moves: "1. c4 c5 2. Nc3 Nc6 3. g3 g6 4. Bg2 Bg7 5. Nf3 Nf6 6. O-O O-O 7. b3"
}, {
    fen: "r1bq1rk1/pp1pppbp/2n2np1/2p5/2PP4/2N2NP1/PP2PPBP/R1BQ1RK1 b - d3 0 7",
    eco: "A39",
    openingName: "English: symmetrical, main line with d4",
    moves: "1. c4 c5 2. Nc3 Nc6 3. g3 g6 4. Bg2 Bg7 5. Nf3 Nf6 6. O-O O-O 7. d4"
}, {
    fen: "rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq d3 0 1",
    eco: "A40",
    openingName: "Queen's pawn",
    moves: "1. d4"
}, {
    fen: "r1bqkbnr/pppppppp/2n5/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 1 2",
    eco: "A40",
    openingName: "Queen's pawn: Lundin (Kevitz-Mikenas) defence",
    moves: "1. d4 Nc6"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/4p3/3P4/8/PPP1PPPP/RNBQKBNR w KQkq e6 0 2",
    eco: "A40",
    openingName: "Queen's pawn: Charlick (Englund) gambit",
    moves: "1. d4 e5"
}, {
    fen: "r1b1kb1r/ppppq1pp/2n2n2/3Q4/8/5N2/PPP1PPPP/RNB1KB1R w KQkq - 0 6",
    eco: "A40",
    openingName: "Queen's pawn: Englund gambit",
    moves: "1. d4 e5 2. dxe5 Nc6 3. Nf3 Qe7 4. Qd5 f6 5. exf6 Nxf6"
}, {
    fen: "rnbqkbnr/p1pppppp/1p6/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
    eco: "A40",
    openingName: "Queen's pawn: English defence",
    moves: "1. d4 b6"
}, {
    fen: "rnbqkbnr/p1pppppp/8/1p6/3P4/8/PPP1PPPP/RNBQKBNR w KQkq b6 0 2",
    eco: "A40",
    openingName: "Polish defence",
    moves: "1. d4 b5"
}, {
    fen: "rnbqkbnr/pppp1ppp/4p3/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
    eco: "A40",
    openingName: "Queen's pawn",
    moves: "1. d4 e6"
}, {
    fen: "rnbqkbnr/p1pp1ppp/1p2p3/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3",
    eco: "A40",
    openingName: "Queen's pawn: Keres defence",
    moves: "1. d4 e6 2. c4 b6"
}, {
    fen: "rnbqk1nr/pppp1ppp/4p3/8/1bPP4/8/PP2PPPP/RNBQKBNR w KQkq - 1 3",
    eco: "A40",
    openingName: "Queen's pawn: Franco-Indian (Keres) defence",
    moves: "1. d4 e6 2. c4 Bb4+"
}, {
    fen: "rnbqkbnr/pppppp1p/6p1/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
    eco: "A40",
    openingName: "Modern defence",
    moves: "1. d4 g6"
}, {
    fen: "rnbqk1nr/pp1pp2p/6p1/2pP1p2/2P5/2P5/P3PPPP/R1BQKBNR w KQkq f6 0 6",
    eco: "A40",
    openingName: "Beefeater defence",
    moves: "1. d4 g6 2. c4 Bg7 3. Nc3 c5 4. d5 Bxc3+ 5. bxc3 f5"
}, {
    fen: "rnbqkbnr/ppp1pppp/3p4/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
    eco: "A41",
    openingName: "Queen's Pawn",
    moves: "1. d4 d6"
}, {
    fen: "rn1qkbnr/ppp1pppp/3p4/8/3P2b1/5N2/PPP1PPPP/RNBQKB1R w KQkq - 2 3",
    eco: "A41",
    openingName: "Old Indian: Tartakower (Wade) variation",
    moves: "1. d4 d6 2. Nf3 Bg4"
}, {
    fen: "rnbqkbnr/ppp1pppp/3p4/8/2PP4/8/PP2PPPP/RNBQKBNR b KQkq c3 0 2",
    eco: "A41",
    openingName: "Old Indian defence",
    moves: "1. d4 d6 2. c4"
}, {
    fen: "rnbqk1nr/ppp1ppbp/3p2p1/8/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4",
    eco: "A41",
    openingName: "Modern defence",
    moves: "1. d4 d6 2. c4 g6 3. Nc3 Bg7"
}, {
    fen: "rn1qk1nr/ppp1ppbp/3p2p1/8/2PPP1b1/5N2/PP3PPP/RNBQKB1R w KQkq - 1 5",
    eco: "A41",
    openingName: "Robatsch defence: Rossolimo variation",
    moves: "1. e4 g6 2. d4 Bg7 3. Nf3 d6 4. c4 Bg4"
}, {
    fen: "rnbqk1nr/ppp1ppbp/3p2p1/8/2PPP3/2N5/PP3PPP/R1BQKBNR b KQkq e3 0 4",
    eco: "A42",
    openingName: "Modern defence: Averbakh system",
    moves: "1. d4 d6 2. c4 g6 3. Nc3 Bg7 4. e4"
}, {
    fen: "rnb1k1nr/pp2ppbp/3p2p1/q1p5/2PPP3/2N2N2/PP3PPP/R1BQKB1R w KQkq - 2 6",
    eco: "A42",
    openingName: "Pterodactyl defence",
    moves: "1. d4 d6 2. c4 g6 3. Nc3 Bg7 4. e4 c5 5. Nf3 Qa5"
}, {
    fen: "rnbqk1nr/ppp1p1bp/3p2p1/5p2/2PPP3/2N5/PP3PPP/R1BQKBNR w KQkq f6 0 5",
    eco: "A42",
    openingName: "Modern defence: Averbakh system, Randspringer variation",
    moves: "1. d4 d6 2. c4 g6 3. Nc3 Bg7 4. e4 f5"
}, {
    fen: "r1bqk1nr/ppp1ppbp/2np2p1/8/2PPP3/2N5/PP3PPP/R1BQKBNR w KQkq - 1 5",
    eco: "A42",
    openingName: "Modern defence: Averbakh system, Kotov variation",
    moves: "1. d4 d6 2. c4 g6 3. Nc3 Bg7 4. e4 Nc6"
}, {
    fen: "rnbqkbnr/pp1ppppp/8/2p5/3P4/8/PPP1PPPP/RNBQKBNR w KQkq c6 0 2",
    eco: "A43",
    openingName: "Old Benoni defence",
    moves: "1. d4 c5"
}, {
    fen: "rnbqkbnr/pp1p1ppp/4p3/2pP4/4P3/8/PPP2PPP/RNBQKBNR b KQkq e3 0 3",
    eco: "A43",
    openingName: "Old Benoni: Franco-Benoni defence",
    moves: "1. d4 c5 2. d5 e6 3. e4"
}, {
    fen: "rnbqkbnr/pp1pp1pp/8/2pP1p2/8/8/PPP1PPPP/RNBQKBNR w KQkq f6 0 3",
    eco: "A43",
    openingName: "Old Benoni: Mujannah formation",
    moves: "1. d4 c5 2. d5 f5"
}, {
    fen: "rnbqkb1r/pp1ppppp/5n2/2pP4/8/8/PPP1PPPP/RNBQKBNR w KQkq - 1 3",
    eco: "A43",
    openingName: "Old Benoni defence",
    moves: "1. d4 c5 2. d5 Nf6"
}, {
    fen: "rnb1kb1r/pp1ppppp/5n2/q1pP4/8/2N5/PPP1PPPP/R1BQKBNR w KQkq - 3 4",
    eco: "A43",
    openingName: "Woozle defence",
    moves: "1. d4 c5 2. d5 Nf6 3. Nc3 Qa5"
}, {
    fen: "rnbqkb1r/pp1ppppp/5n2/2pP4/8/5N2/PPP1PPPP/RNBQKB1R b KQkq - 2 3",
    eco: "A43",
    openingName: "Old Benoni defence",
    moves: "1. d4 c5 2. d5 Nf6 3. Nf3"
}, {
    fen: "rnbqkb1r/pp1ppppp/5n2/3P4/2p5/5N2/PPP1PPPP/RNBQKB1R w KQkq - 0 4",
    eco: "A43",
    openingName: "Hawk (Habichd) defence",
    moves: "1. d4 c5 2. d5 Nf6 3. Nf3 c4"
}, {
    fen: "rnbqkbnr/pp2pppp/3p4/2pP4/8/8/PPP1PPPP/RNBQKBNR w KQkq - 0 3",
    eco: "A43",
    openingName: "Old Benoni defence",
    moves: "1. d4 c5 2. d5 d6"
}, {
    fen: "rnbqkbnr/pp2pp1p/3p2p1/2pP4/8/2N5/PPP1PPPP/R1BQKBNR w KQkq - 0 4",
    eco: "A43",
    openingName: "Old Benoni: Schmid's system",
    moves: "1. d4 c5 2. d5 d6 3. Nc3 g6"
}, {
    fen: "rnbqkbnr/pp1p1ppp/8/2pPp3/8/8/PPP1PPPP/RNBQKBNR w KQkq e6 0 3",
    eco: "A44",
    openingName: "Old Benoni defence",
    moves: "1. d4 c5 2. d5 e5"
}, {
    fen: "rnbqkbnr/pp3ppp/3p4/2pPp3/4P3/8/PPP2PPP/RNBQKBNR w KQkq - 0 4",
    eco: "A44",
    openingName: "Semi-Benoni (`blockade variation')",
    moves: "1. d4 c5 2. d5 e5 3. e4 d6"
}, {
    fen: "rnbqkb1r/pppppppp/5n2/8/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 1 2",
    eco: "A45",
    openingName: "Queen's pawn game",
    moves: "1. d4 Nf6"
}, {
    fen: "rnbqkb1r/pppppppp/5n2/8/3P2P1/8/PPP1PP1P/RNBQKBNR b KQkq g3 0 2",
    eco: "A45",
    openingName: "Queen's pawn: Bronstein gambit",
    moves: "1. d4 Nf6 2. g4"
}, {
    fen: "rnbqkb1r/pppppppp/5n2/8/3P1P2/8/PPP1P1PP/RNBQKBNR b KQkq f3 0 2",
    eco: "A45",
    openingName: "Canard opening",
    moves: "1. d4 Nf6 2. f4"
}, {
    fen: "rnbqkb1r/pppppppp/5n2/8/3P4/5P2/PPP1P1PP/RNBQKBNR b KQkq - 0 2",
    eco: "A45",
    openingName: "Paleface attack",
    moves: "1. d4 Nf6 2. f3"
}, {
    fen: "rnbqkb1r/ppp1pppp/5n2/3p4/3PP3/5P2/PPP3PP/RNBQKBNR b KQkq e3 0 3",
    eco: "A45",
    openingName: "Blackmar-Diemer gambit",
    moves: "1. d4 Nf6 2. f3 d5 3. e4"
}, {
    fen: "rnbqkb1r/ppp1pppp/5n2/3p4/3P2P1/5P2/PPP1P2P/RNBQKBNR b KQkq g3 0 3",
    eco: "A45",
    openingName: "Gedult attack",
    moves: "1. d4 Nf6 2. f3 d5 3. g4"
}, {
    fen: "rnbqkb1r/pppppppp/5n2/6B1/3P4/8/PPP1PPPP/RN1QKBNR b KQkq - 2 2",
    eco: "A45",
    openingName: "Trompovsky attack (Ruth, Opovcensky opening)",
    moves: "1. d4 Nf6 2. Bg5"
}, {
    fen: "rnbqkb1r/pppppppp/5n2/8/3P4/5N2/PPP1PPPP/RNBQKB1R b KQkq - 2 2",
    eco: "A46",
    openingName: "Queen's pawn game",
    moves: "1. d4 Nf6 2. Nf3"
}, {
    fen: "rnbqkb1r/pppp1ppp/4pn2/6B1/3P4/5N2/PPP1PPPP/RN1QKB1R b KQkq - 1 3",
    eco: "A46",
    openingName: "Queen's pawn: Torre attack",
    moves: "1. d4 Nf6 2. Nf3 e6 3. Bg5"
}, {
    fen: "rnbqkb1r/pp1p1ppp/4pn2/2p3B1/3PP3/5N2/PPP2PPP/RN1QKB1R b KQkq e3 0 4",
    eco: "A46",
    openingName: "Queen's pawn: Torre attack, Wagner gambit",
    moves: "1. d4 Nf6 2. Nf3 e6 3. Bg5 c5 4. e4"
}, {
    fen: "rnbqkb1r/pppp1ppp/4pn2/8/3P4/4PN2/PPP2PPP/RNBQKB1R b KQkq - 0 3",
    eco: "A46",
    openingName: "Queen's pawn: Yusupov-Rubinstein system",
    moves: "1. d4 Nf6 2. Nf3 e6 3. e3"
}, {
    fen: "rnbqkb1r/pppppppp/8/8/3Pn3/5N2/PPP1PPPP/RNBQKB1R w KQkq - 3 3",
    eco: "A46",
    openingName: "Doery defence",
    moves: "1. d4 Nf6 2. Nf3 Ne4"
}, {
    fen: "rnbqkb1r/p1pppppp/1p3n2/8/3P4/5N2/PPP1PPPP/RNBQKB1R w KQkq - 0 3",
    eco: "A47",
    openingName: "Queen's Indian defence",
    moves: "1. d4 Nf6 2. Nf3 b6"
}, {
    fen: "rn1qkb1r/pb1ppppp/1p3n2/2p5/3P4/5NP1/PPP1PPBP/RNBQK2R w KQkq c6 0 5",
    eco: "A47",
    openingName: "Queen's Indian: Marienbad system",
    moves: "1. d4 Nf6 2. Nf3 b6 3. g3 Bb7 4. Bg2 c5"
}, {
    fen: "rn1qkb1r/pb1ppppp/1p3n2/8/2PQ4/5NP1/PP2PPBP/RNB1K2R b KQkq - 0 6",
    eco: "A47",
    openingName: "Queen's Indian: Marienbad system, Berg variation",
    moves: "1. d4 Nf6 2. Nf3 b6 3. g3 Bb7 4. Bg2 c5 5. c4 cxd4 6. Qxd4"
}, {
    fen: "rnbqkb1r/pppppp1p/5np1/8/3P4/5N2/PPP1PPPP/RNBQKB1R w KQkq - 0 3",
    eco: "A48",
    openingName: "King's Indian: East Indian defence",
    moves: "1. d4 Nf6 2. Nf3 g6"
}, {
    fen: "rnbqkb1r/pppppp1p/5np1/6B1/3P4/5N2/PPP1PPPP/RN1QKB1R b KQkq - 1 3",
    eco: "A48",
    openingName: "King's Indian: Torre attack",
    moves: "1. d4 Nf6 2. Nf3 g6 3. Bg5"
}, {
    fen: "rnbqkb1r/pppppp1p/5np1/8/3P1B2/5N2/PPP1PPPP/RN1QKB1R b KQkq - 1 3",
    eco: "A48",
    openingName: "King's Indian: London system",
    moves: "1. d4 Nf6 2. Nf3 g6 3. Bf4"
}, {
    fen: "rnbqkb1r/pppppp1p/5np1/8/3P4/5NP1/PPP1PP1P/RNBQKB1R b KQkq - 0 3",
    eco: "A49",
    openingName: "King's Indian: fianchetto without c4",
    moves: "1. d4 Nf6 2. Nf3 g6 3. g3"
}, {
    fen: "rnbqkb1r/pppppppp/5n2/8/2PP4/8/PP2PPPP/RNBQKBNR b KQkq c3 0 2",
    eco: "A50",
    openingName: "Queen's pawn game",
    moves: "1. d4 Nf6 2. c4"
}, {
    fen: "r1bqkb1r/pppppppp/2n2n2/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 1 3",
    eco: "A50",
    openingName: "Kevitz-Trajkovich defence",
    moves: "1. d4 Nf6 2. c4 Nc6"
}, {
    fen: "rnbqkb1r/p1pppppp/1p3n2/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3",
    eco: "A50",
    openingName: "Queen's Indian accelerated",
    moves: "1. d4 Nf6 2. c4 b6"
}, {
    fen: "rnbqkb1r/pppp1ppp/5n2/4p3/2PP4/8/PP2PPPP/RNBQKBNR w KQkq e6 0 3",
    eco: "A51",
    openingName: "Budapest defence declined",
    moves: "1. d4 Nf6 2. c4 e5"
}, {
    fen: "rnbqkb1r/pppp1ppp/8/4P3/2P1n3/8/PP2PPPP/RNBQKBNR w KQkq - 1 4",
    eco: "A51",
    openingName: "Budapest: Fajarowicz variation",
    moves: "1. d4 Nf6 2. c4 e5 3. dxe5 Ne4"
}, {
    fen: "rnbqkb1r/pppp1ppp/8/4P3/2P1n3/8/PPQ1PPPP/RNB1KBNR b KQkq - 2 4",
    eco: "A51",
    openingName: "Budapest: Fajarowicz, Steiner variation",
    moves: "1. d4 Nf6 2. c4 e5 3. dxe5 Ne4 4. Qc2"
}, {
    fen: "rnbqkb1r/pppp1ppp/8/4P3/2P3n1/8/PP2PPPP/RNBQKBNR w KQkq - 1 4",
    eco: "A52",
    openingName: "Budapest defence",
    moves: "1. d4 Nf6 2. c4 e5 3. dxe5 Ng4"
}, {
    fen: "rnbqkb1r/pppp1ppp/8/4P3/2P3n1/5N2/PP2PPPP/RNBQKB1R b KQkq - 2 4",
    eco: "A52",
    openingName: "Budapest: Adler variation",
    moves: "1. d4 Nf6 2. c4 e5 3. dxe5 Ng4 4. Nf3"
}, {
    fen: "rnbqkb1r/pppp1ppp/8/4P3/2P2Bn1/8/PP2PPPP/RN1QKBNR b KQkq - 2 4",
    eco: "A52",
    openingName: "Budapest: Rubinstein variation",
    moves: "1. d4 Nf6 2. c4 e5 3. dxe5 Ng4 4. Bf4"
}, {
    fen: "rnbqkb1r/pppp1ppp/8/4P3/2P1P1n1/8/PP3PPP/RNBQKBNR b KQkq e3 0 4",
    eco: "A52",
    openingName: "Budapest: Alekhine variation",
    moves: "1. d4 Nf6 2. c4 e5 3. dxe5 Ng4 4. e4"
}, {
    fen: "rnbqkb1r/pppp1ppp/2n5/8/2P1PP2/8/PP4PP/RNBQKBNR w KQkq - 1 6",
    eco: "A52",
    openingName: "Budapest: Alekhine, Abonyi variation",
    moves: "1. d4 Nf6 2. c4 e5 3. dxe5 Ng4 4. e4 Nxe5 5. f4 Nec6"
}, {
    fen: "rnbqkb1r/ppp2ppp/3p4/4P3/2P1P1n1/8/PP3PPP/RNBQKBNR w KQkq - 0 5",
    eco: "A52",
    openingName: "Budapest: Alekhine variation, Balogh gambit",
    moves: "1. d4 Nf6 2. c4 e5 3. dxe5 Ng4 4. e4 d6"
}, {
    fen: "rnbqkb1r/ppp1pppp/3p1n2/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3",
    eco: "A53",
    openingName: "Old Indian defence",
    moves: "1. d4 Nf6 2. c4 d6"
}, {
    fen: "rn1qkb1r/ppp1pppp/3p1n2/5b2/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4",
    eco: "A53",
    openingName: "Old Indian: Janowski variation",
    moves: "1. d4 Nf6 2. c4 d6 3. Nc3 Bf5"
}, {
    fen: "rnbqkb1r/ppp2ppp/3p1n2/4p3/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq e6 0 4",
    eco: "A54",
    openingName: "Old Indian: Ukrainian variation",
    moves: "1. d4 Nf6 2. c4 d6 3. Nc3 e5"
}, {
    fen: "r1bqkb1r/pppn1ppp/3p1n2/4p3/2PP4/2NBP3/PP3PPP/R1BQK1NR b KQkq - 2 5",
    eco: "A54",
    openingName: "Old Indian: Dus-Khotimirsky variation",
    moves: "1. d4 Nf6 2. c4 d6 3. Nc3 e5 4. e3 Nbd7 5. Bd3"
}, {
    fen: "rnbqkb1r/ppp2ppp/3p1n2/4p3/2PP4/2N2N2/PP2PPPP/R1BQKB1R b KQkq - 1 4",
    eco: "A54",
    openingName: "Old Indian: Ukrainian variation, 4.Nf3",
    moves: "1. d4 Nf6 2. c4 d6 3. Nc3 e5 4. Nf3"
}, {
    fen: "r1bqkb1r/pppn1ppp/3p1n2/4p3/2PPP3/2N2N2/PP3PPP/R1BQKB1R b KQkq e3 0 5",
    eco: "A55",
    openingName: "Old Indian: main line",
    moves: "1. d4 Nf6 2. c4 d6 3. Nc3 e5 4. Nf3 Nbd7 5. e4"
}, {
    fen: "rnbqkb1r/pp1ppppp/5n2/2p5/2PP4/8/PP2PPPP/RNBQKBNR w KQkq c6 0 3",
    eco: "A56",
    openingName: "Benoni defence",
    moves: "1. d4 Nf6 2. c4 c5"
}, {
    fen: "rnbqkb1r/pp2pppp/3p1n2/2pP4/2P5/8/PP2PPPP/RNBQKBNR w KQkq - 0 4",
    eco: "A56",
    openingName: "Benoni defence, Hromodka system",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 d6"
}, {
    fen: "rnbqkb1r/pp1ppppp/8/2pP4/2P1n3/8/PP2PPPP/RNBQKBNR w KQkq - 1 4",
    eco: "A56",
    openingName: "Vulture defence",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 Ne4"
}, {
    fen: "rnbqkb1r/pp1p1ppp/5n2/2pPp3/2P5/8/PP2PPPP/RNBQKBNR w KQkq e6 0 4",
    eco: "A56",
    openingName: "Czech Benoni defence",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 e5"
}, {
    fen: "rnbqkb1r/pp3p1p/3p1np1/2pPp3/2P1P3/2N5/PP3PPP/R1BQKBNR w KQkq - 0 6",
    eco: "A56",
    openingName: "Czech Benoni: King's Indian system",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 e5 4. Nc3 d6 5. e4 g6"
}, {
    fen: "rnbqkb1r/p2ppppp/5n2/1ppP4/2P5/8/PP2PPPP/RNBQKBNR w KQkq b6 0 4",
    eco: "A57",
    openingName: "Benko gambit",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 b5"
}, {
    fen: "rnbqkb1r/3ppppp/p4n2/1PpP4/8/8/PP2PPPP/RNBQKBNR w KQkq - 0 5",
    eco: "A57",
    openingName: "Benko gambit half accepted",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 b5 4. cxb5 a6"
}, {
    fen: "rnbqkb1r/3ppppp/p4n2/1PpP4/8/2N5/PP2PPPP/R1BQKBNR b KQkq - 1 5",
    eco: "A57",
    openingName: "Benko gambit: Zaitsev system",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 b5 4. cxb5 a6 5. Nc3"
}, {
    fen: "rnbqkb1r/4pppp/3p1n2/1NpP4/1pB1P3/8/PP3PPP/R1BQK1NR b KQkq - 1 8",
    eco: "A57",
    openingName: "Benko gambit: Nescafe Frappe attack",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 b5 4. cxb5 a6 5. Nc3 axb5 6. e4 b4 7. Nb5 d6 8. Bc4"
}, {
    fen: "rnbqkb1r/3ppppp/P4n2/2pP4/8/8/PP2PPPP/RNBQKBNR b KQkq - 0 5",
    eco: "A58",
    openingName: "Benko gambit accepted",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 b5 4. cxb5 a6 5. bxa6"
}, {
    fen: "rn1qkb1r/4pp1p/b2p1np1/2pP4/8/2N5/PP1NPPPP/R1BQKB1R b KQkq - 1 8",
    eco: "A58",
    openingName: "Benko gambit: Nd2 variation",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 b5 4. cxb5 a6 5. bxa6 Bxa6 6. Nc3 d6 7. Nf3 g6 8. Nd2"
}, {
    fen: "rn1qkb1r/4pp1p/b2p1np1/2pP4/8/2N2NP1/PP2PP1P/R1BQKB1R b KQkq - 0 8",
    eco: "A58",
    openingName: "Benko gambit: fianchetto variation",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 b5 4. cxb5 a6 5. bxa6 Bxa6 6. Nc3 d6 7. Nf3 g6 8. g3"
}, {
    fen: "rn1qkb1r/4pppp/b2p1n2/2pP4/4P3/2N5/PP3PPP/R1BQKBNR b KQkq e3 0 7",
    eco: "A59",
    openingName: "Benko gambit: 7.e4",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 b5 4. cxb5 a6 5. bxa6 Bxa6 6. Nc3 d6 7. e4"
}, {
    fen: "rn1qkb1r/4pp1p/3p1np1/2pP4/4P3/2N5/PP2NPPP/R1BQ1K1R b kq - 1 9",
    eco: "A59",
    openingName: "Benko gambit: Ne2 variation",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 b5 4. cxb5 a6 5. bxa6 Bxa6 6. Nc3 d6 7. e4 Bxf1 8. Kxf1 g6 9. Nge2"
}, {
    fen: "rn1qkb1r/4pp1p/3p1np1/2pP4/4P3/2N3P1/PP3P1P/R1BQ1KNR b kq - 0 9",
    eco: "A59",
    openingName: "Benko gambit",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 b5 4. cxb5 a6 5. bxa6 Bxa6 6. Nc3 d6 7. e4 Bxf1 8. Kxf1 g6 9. g3"
}, {
    fen: "rn1q1rk1/4ppbp/3p1np1/2pP4/4P3/2N2NP1/PP3PKP/R1BQ3R b - - 4 11",
    eco: "A59",
    openingName: "Benko gambit: main line",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 b5 4. cxb5 a6 5. bxa6 Bxa6 6. Nc3 d6 7. e4 Bxf1 8. Kxf1 g6 9. g3 Bg7 10. Kg2 O-O 11. Nf3"
}, {
    fen: "rnbqkb1r/pp1p1ppp/4pn2/2pP4/2P5/8/PP2PPPP/RNBQKBNR w KQkq - 0 4",
    eco: "A60",
    openingName: "Benoni defence",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 e6"
}, {
    fen: "rnbqkb1r/pp3p1p/3p1np1/2pP4/8/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 7",
    eco: "A61",
    openingName: "Benoni defence",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. Nf3 g6"
}, {
    fen: "rnbqkb1r/pp3p1p/3p1np1/2pP2B1/8/2N2N2/PP2PPPP/R2QKB1R b KQkq - 1 7",
    eco: "A61",
    openingName: "Benoni: Uhlmann variation",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. Nf3 g6 7. Bg5"
}, {
    fen: "rnbqkb1r/pp3p1p/3p1np1/2pP4/8/2N5/PP1NPPPP/R1BQKB1R b KQkq - 1 7",
    eco: "A61",
    openingName: "Benoni: Nimzovich (knight's tour) variation",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. Nf3 g6 7. Nd2"
}, {
    fen: "rnbqkb1r/pp3p1p/3p1np1/2pP4/8/2N2NP1/PP2PP1P/R1BQKB1R b KQkq - 0 7",
    eco: "A61",
    openingName: "Benoni: fianchetto variation",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. Nf3 g6 7. g3"
}, {
    fen: "rnbq1rk1/pp3pbp/3p1np1/2pP4/8/2N2NP1/PP2PPBP/R1BQK2R w KQ - 3 9",
    eco: "A62",
    openingName: "Benoni: fianchetto variation",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. Nf3 g6 7. g3 Bg7 8. Bg2 O-O"
}, {
    fen: "r1bq1rk1/pp1n1pbp/3p1np1/2pP4/8/2N2NP1/PP2PPBP/R1BQ1RK1 w - - 5 10",
    eco: "A63",
    openingName: "Benoni: fianchetto, 9...Nbd7",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. Nf3 g6 7. g3 Bg7 8. Bg2 O-O 9. O-O Nbd7"
}, {
    fen: "r1bqr1k1/1p1n1pbp/p2p1np1/2pP4/P7/2N3P1/1P1NPPBP/R1BQ1RK1 w - - 1 12",
    eco: "A64",
    openingName: "Benoni: fianchetto, 11...Re8",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. Nf3 g6 7. g3 Bg7 8. Bg2 O-O 9. O-O Nbd7 10. Nd2 a6 11. a4 Re8"
}, {
    fen: "rnbqkb1r/pp3ppp/3p1n2/2pP4/4P3/2N5/PP3PPP/R1BQKBNR b KQkq e3 0 6",
    eco: "A65",
    openingName: "Benoni: 6.e4",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. e4"
}, {
    fen: "rnbqkb1r/pp3p1p/3p1np1/2pP4/4PP2/2N5/PP4PP/R1BQKBNR b KQkq f3 0 7",
    eco: "A66",
    openingName: "Benoni: pawn storm variation",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. e4 g6 7. f4"
}, {
    fen: "rnbqk2r/pp3pbp/3p1np1/2pPP3/5P2/2N5/PP4PP/R1BQKBNR b KQkq - 0 8",
    eco: "A66",
    openingName: "Benoni: Mikenas variation",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. e4 g6 7. f4 Bg7 8. e5"
}, {
    fen: "rnbqk2r/pp3pbp/3p1np1/1BpP4/4PP2/2N5/PP4PP/R1BQK1NR b KQkq - 2 8",
    eco: "A67",
    openingName: "Benoni: Taimanov variation",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. e4 g6 7. f4 Bg7 8. Bb5+"
}, {
    fen: "rnbq1rk1/pp3pbp/3p1np1/2pP4/4PP2/2N2N2/PP4PP/R1BQKB1R w KQ - 3 9",
    eco: "A68",
    openingName: "Benoni: four pawns attack",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. e4 g6 7. f4 Bg7 8. Nf3 O-O"
}, {
    fen: "rnbqr1k1/pp3pbp/3p1np1/2pP4/4PP2/2N2N2/PP2B1PP/R1BQK2R w KQ - 5 10",
    eco: "A69",
    openingName: "Benoni: four pawns attack, main line",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. e4 g6 7. f4 Bg7 8. Nf3 O-O 9. Be2 Re8"
}, {
    fen: "rnbqkb1r/pp3p1p/3p1np1/2pP4/4P3/2N2N2/PP3PPP/R1BQKB1R b KQkq - 1 7",
    eco: "A70",
    openingName: "Benoni: classical with e4 and Nf3",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. e4 g6 7. Nf3"
}, {
    fen: "rnbqk2r/pp3pbp/3p1np1/2pP4/4P3/2N2N2/PP2BPPP/R1BQK2R b KQkq - 3 8",
    eco: "A70",
    openingName: "Benoni: classical without 9.O-O",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. e4 g6 7. Nf3 Bg7 8. Be2"
}, {
    fen: "rnbqk2r/pp3pbp/3p1np1/2pP2B1/4P3/2N2N2/PP3PPP/R2QKB1R b KQkq - 3 8",
    eco: "A71",
    openingName: "Benoni: classical, 8.Bg5",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. e4 g6 7. Nf3 Bg7 8. Bg5"
}, {
    fen: "rnbq1rk1/pp3pbp/3p1np1/2pP4/4P3/2N2N2/PP2BPPP/R1BQK2R w KQ - 4 9",
    eco: "A72",
    openingName: "Benoni: classical without 9.O-O",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. e4 g6 7. Nf3 Bg7 8. Be2 O-O"
}, {
    fen: "rnbq1rk1/pp3pbp/3p1np1/2pP4/4P3/2N2N2/PP2BPPP/R1BQ1RK1 b - - 5 9",
    eco: "A73",
    openingName: "Benoni: classical, 9.O-O",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. e4 g6 7. Nf3 Bg7 8. Be2 O-O 9. O-O"
}, {
    fen: "rnbq1rk1/1p3pbp/p2p1np1/2pP4/P3P3/2N2N2/1P2BPPP/R1BQ1RK1 b - a3 0 10",
    eco: "A74",
    openingName: "Benoni: classical, 9...a6, 10.a4",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. e4 g6 7. Nf3 Bg7 8. Be2 O-O 9. O-O a6 10. a4"
}, {
    fen: "rn1q1rk1/1p3pbp/p2p1np1/2pP4/P3P1b1/2N2N2/1P2BPPP/R1BQ1RK1 w - - 1 11",
    eco: "A75",
    openingName: "Benoni: classical with ...a6 and 10...Bg4",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. e4 g6 7. Nf3 Bg7 8. Be2 O-O 9. O-O a6 10. a4 Bg4"
}, {
    fen: "rnbqr1k1/pp3pbp/3p1np1/2pP4/4P3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 6 10",
    eco: "A76",
    openingName: "Benoni: classical, 9...Re8",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. e4 g6 7. Nf3 Bg7 8. Be2 O-O 9. O-O Re8"
}, {
    fen: "rnbqr1k1/pp3pbp/3p1np1/2pP4/4P3/2N5/PP1NBPPP/R1BQ1RK1 b - - 7 10",
    eco: "A77",
    openingName: "Benoni: classical, 9...Re8, 10.Nd2",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. e4 g6 7. Nf3 Bg7 8. Be2 O-O 9. O-O Re8 10. Nd2"
}, {
    fen: "r1bqr1k1/pp3pbp/n2p1np1/2pP4/4P3/2N5/PP1NBPPP/R1BQ1RK1 w - - 8 11",
    eco: "A78",
    openingName: "Benoni: classical with ...Re8 and ...Na6",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. e4 g6 7. Nf3 Bg7 8. Be2 O-O 9. O-O Re8 10. Nd2 Na6"
}, {
    fen: "r1bqr1k1/pp3pbp/n2p1np1/2pP4/4P3/2N2P2/PP1NB1PP/R1BQ1RK1 b - - 0 11",
    eco: "A79",
    openingName: "Benoni: classical, 11.f3",
    moves: "1. d4 Nf6 2. c4 c5 3. d5 e6 4. Nc3 exd5 5. cxd5 d6 6. e4 g6 7. Nf3 Bg7 8. Be2 O-O 9. O-O Re8 10. Nd2 Na6 11. f3"
}, {
    fen: "rnbqkbnr/ppppp1pp/8/5p2/3P4/8/PPP1PPPP/RNBQKBNR w KQkq f6 0 2",
    eco: "A80",
    openingName: "Dutch",
    moves: "1. d4 f5"
}, {
    fen: "rnbqkb1r/ppppp1pp/5n2/5p2/3P2P1/2N5/PPP1PP1P/R1BQKBNR b KQkq g3 0 3",
    eco: "A80",
    openingName: "Dutch, Spielmann gambit",
    moves: "1. d4 f5 2. Nc3 Nf6 3. g4"
}, {
    fen: "rnbqkbnr/ppppp1pp/8/5p2/3P4/3Q4/PPP1PPPP/RNB1KBNR b KQkq - 1 2",
    eco: "A80",
    openingName: "Dutch, Manhattan (Alapin, Ulvestad) variation",
    moves: "1. d4 f5 2. Qd3"
}, {
    fen: "rnbqkbnr/pppp2pp/4p3/5p2/3P2P1/3Q4/PPP1PP1P/RNB1KBNR b KQkq g3 0 3",
    eco: "A80",
    openingName: "Dutch, Von Pretzel gambit",
    moves: "1. d4 f5 2. Qd3 e6 3. g4"
}, {
    fen: "rnbqkbnr/ppppp1pp/8/5p2/3P4/7P/PPP1PPP1/RNBQKBNR b KQkq - 0 2",
    eco: "A80",
    openingName: "Dutch, Korchnoi attack",
    moves: "1. d4 f5 2. h3"
}, {
    fen: "rnbqkbnr/ppppp1pp/8/5p2/3P2P1/8/PPP1PP1P/RNBQKBNR b KQkq g3 0 2",
    eco: "A80",
    openingName: "Dutch, Krejcik gambit",
    moves: "1. d4 f5 2. g4"
}, {
    fen: "rnbqkbnr/ppppp1pp/8/5pB1/3P4/8/PPP1PPPP/RN1QKBNR b KQkq - 1 2",
    eco: "A80",
    openingName: "Dutch, 2.Bg5 variation",
    moves: "1. d4 f5 2. Bg5"
}, {
    fen: "rnbqkbnr/ppppp1pp/8/5p2/3P4/6P1/PPP1PP1P/RNBQKBNR b KQkq - 0 2",
    eco: "A81",
    openingName: "Dutch defence",
    moves: "1. d4 f5 2. g3"
}, {
    fen: "rnbqkb1r/pppp2pp/4pn2/5p2/3P4/6PN/PPP1PPBP/RNBQK2R b KQkq - 1 4",
    eco: "A81",
    openingName: "Dutch defence, Blackburne variation",
    moves: "1. d4 f5 2. g3 Nf6 3. Bg2 e6 4. Nh3"
}, {
    fen: "rnbqkb1r/ppppp2p/5np1/5p2/3P4/6P1/PPP1PPBP/RNBQK1NR w KQkq - 0 4",
    eco: "A81",
    openingName: "Dutch defence",
    moves: "1. d4 f5 2. g3 Nf6 3. Bg2 g6"
}, {
    fen: "rnbqk2r/pp1pp1bp/2p3pn/5p2/3P4/5NP1/PPP1PPBP/RNBQ1RK1 w kq - 2 6",
    eco: "A81",
    openingName: "Dutch: Leningrad, Basman system",
    moves: "1. d4 f5 2. g3 g6 3. Bg2 Bg7 4. Nf3 c6 5. O-O Nh6"
}, {
    fen: "rnbqk1nr/ppppp1bp/6p1/5p2/3P4/6PN/PPP1PPBP/RNBQK2R b KQkq - 3 4",
    eco: "A81",
    openingName: "Dutch: Leningrad, Karlsbad variation",
    moves: "1. d4 f5 2. g3 g6 3. Bg2 Bg7 4. Nh3"
}, {
    fen: "rnbqkbnr/ppppp1pp/8/5p2/3PP3/8/PPP2PPP/RNBQKBNR b KQkq e3 0 2",
    eco: "A82",
    openingName: "Dutch: Staunton gambit",
    moves: "1. d4 f5 2. e4"
}, {
    fen: "rnbqkbnr/ppp1p1pp/3p4/5p2/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3",
    eco: "A82",
    openingName: "Dutch: Balogh defence",
    moves: "1. d4 f5 2. e4 d6"
}, {
    fen: "rnbqkbnr/ppppp1pp/8/8/3Pp3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3",
    eco: "A82",
    openingName: "Dutch: Staunton gambit",
    moves: "1. d4 f5 2. e4 fxe4"
}, {
    fen: "rnbqkb1r/ppppp1pp/5n2/8/3Pp1P1/2N5/PPP2P1P/R1BQKBNR b KQkq g3 0 4",
    eco: "A82",
    openingName: "Dutch: Staunton gambit, Tartakower variation",
    moves: "1. d4 f5 2. e4 fxe4 3. Nc3 Nf6 4. g4"
}, {
    fen: "rnbqkb1r/ppppp1pp/5n2/6B1/3Pp3/2N5/PPP2PPP/R2QKBNR b KQkq - 3 4",
    eco: "A83",
    openingName: "Dutch: Staunton gambit, Staunton's line",
    moves: "1. d4 f5 2. e4 fxe4 3. Nc3 Nf6 4. Bg5"
}, {
    fen: "rnbqkb1r/ppppp2p/5np1/6B1/3Pp2P/2N5/PPP2PP1/R2QKBNR b KQkq h3 0 5",
    eco: "A83",
    openingName: "Dutch: Staunton gambit, Alekhine variation",
    moves: "1. d4 f5 2. e4 fxe4 3. Nc3 Nf6 4. Bg5 g6 5. h4"
}, {
    fen: "rnbqkb1r/ppppp2p/5np1/6B1/3Pp3/2N2P2/PPP3PP/R2QKBNR b KQkq - 0 5",
    eco: "A83",
    openingName: "Dutch: Staunton gambit, Lasker variation",
    moves: "1. d4 f5 2. e4 fxe4 3. Nc3 Nf6 4. Bg5 g6 5. f3"
}, {
    fen: "rnbqkb1r/pp1pp1pp/2p2n2/6B1/3Pp3/2N5/PPP2PPP/R2QKBNR w KQkq - 0 5",
    eco: "A83",
    openingName: "Dutch: Staunton gambit, Chigorin variation",
    moves: "1. d4 f5 2. e4 fxe4 3. Nc3 Nf6 4. Bg5 c6"
}, {
    fen: "rnbqkb1r/p1ppp1pp/1p3n2/6B1/3Pp3/2N5/PPP2PPP/R2QKBNR w KQkq - 0 5",
    eco: "A83",
    openingName: "Dutch: Staunton gambit, Nimzovich variation",
    moves: "1. d4 f5 2. e4 fxe4 3. Nc3 Nf6 4. Bg5 b6"
}, {
    fen: "rnbqkbnr/ppppp1pp/8/5p2/2PP4/8/PP2PPPP/RNBQKBNR b KQkq c3 0 2",
    eco: "A84",
    openingName: "Dutch defence",
    moves: "1. d4 f5 2. c4"
}, {
    fen: "rnbqkb1r/ppppp2p/6pn/5p2/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4",
    eco: "A84",
    openingName: "Dutch defence: Bladel variation",
    moves: "1. d4 f5 2. c4 g6 3. Nc3 Nh6"
}, {
    fen: "rnbqkbnr/pppp2pp/4p3/5p2/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3",
    eco: "A84",
    openingName: "Dutch defence",
    moves: "1. d4 f5 2. c4 e6"
}, {
    fen: "rnbqkbnr/pppp2pp/4p3/5p2/2PP4/2N5/PP2PPPP/R1BQKBNR b KQkq - 1 3",
    eco: "A84",
    openingName: "Dutch defence, Rubinstein variation",
    moves: "1. d4 f5 2. c4 e6 3. Nc3"
}, {
    fen: "rnbqkbnr/pppp2pp/4p3/5p2/2PPP3/8/PP3PPP/RNBQKBNR b KQkq e3 0 3",
    eco: "A84",
    openingName: "Dutch: Staunton gambit deferred",
    moves: "1. d4 f5 2. c4 e6 3. e4"
}, {
    fen: "rnbqkb1r/ppppp1pp/5n2/5p2/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 1 3",
    eco: "A84",
    openingName: "Dutch defence",
    moves: "1. d4 f5 2. c4 Nf6"
}, {
    fen: "rnbqkb1r/ppppp1pp/5n2/5p2/2PP4/2N5/PP2PPPP/R1BQKBNR b KQkq - 2 3",
    eco: "A85",
    openingName: "Dutch with c4 & Nc3",
    moves: "1. d4 f5 2. c4 Nf6 3. Nc3"
}, {
    fen: "rnbqkb1r/ppppp1pp/5n2/5p2/2PP4/6P1/PP2PP1P/RNBQKBNR b KQkq - 0 3",
    eco: "A86",
    openingName: "Dutch with c4 & g3",
    moves: "1. d4 f5 2. c4 Nf6 3. g3"
}, {
    fen: "rnb1kb1r/ppq1p1pp/2pp1n2/5p2/2PP4/2N3P1/PP2PPBP/R1BQK1NR w KQkq - 2 6",
    eco: "A86",
    openingName: "Dutch: Hort-Antoshin system",
    moves: "1. d4 f5 2. c4 Nf6 3. g3 d6 4. Bg2 c6 5. Nc3 Qc7"
}, {
    fen: "rnbqkb1r/ppppp2p/5np1/5p2/2PP4/6P1/PP2PP1P/RNBQKBNR w KQkq - 0 4",
    eco: "A86",
    openingName: "Dutch: Leningrad variation",
    moves: "1. d4 f5 2. c4 Nf6 3. g3 g6"
}, {
    fen: "rnbqk2r/ppppp1bp/5np1/5p2/2PP4/5NP1/PP2PPBP/RNBQK2R b KQkq - 3 5",
    eco: "A87",
    openingName: "Dutch: Leningrad, main variation",
    moves: "1. d4 f5 2. c4 Nf6 3. g3 g6 4. Bg2 Bg7 5. Nf3"
}, {
    fen: "rnbq1rk1/pp2p1bp/2pp1np1/5p2/2PP4/2N2NP1/PP2PPBP/R1BQ1RK1 w - - 0 8",
    eco: "A88",
    openingName: "Dutch: Leningrad, main variation with c6",
    moves: "1. d4 f5 2. c4 Nf6 3. g3 g6 4. Bg2 Bg7 5. Nf3 O-O 6. O-O d6 7. Nc3 c6"
}, {
    fen: "r1bq1rk1/ppp1p1bp/2np1np1/5p2/2PP4/2N2NP1/PP2PPBP/R1BQ1RK1 w - - 2 8",
    eco: "A89",
    openingName: "Dutch: Leningrad, main variation with Nc6",
    moves: "1. d4 f5 2. c4 Nf6 3. g3 g6 4. Bg2 Bg7 5. Nf3 O-O 6. O-O d6 7. Nc3 Nc6"
}, {
    fen: "rnbqkb1r/pppp2pp/4pn2/5p2/2PP4/6P1/PP2PPBP/RNBQK1NR b KQkq - 1 4",
    eco: "A90",
    openingName: "Dutch defence",
    moves: "1. d4 f5 2. c4 Nf6 3. g3 e6 4. Bg2"
}, {
    fen: "rnbqk2r/pppp2pp/4pn2/5p2/1bPP4/6P1/PP2PPBP/RNBQK1NR w KQkq - 2 5",
    eco: "A90",
    openingName: "Dutch defence: Dutch-Indian (Nimzo-Dutch) variation",
    moves: "1. d4 f5 2. c4 Nf6 3. g3 e6 4. Bg2 Bb4+"
}, {
    fen: "rnbqk2r/ppppb1pp/4pn2/5p2/2PP4/6P1/PP1BPPBP/RN1QK1NR w KQkq - 4 6",
    eco: "A90",
    openingName: "Dutch-Indian, Alekhine variation",
    moves: "1. d4 f5 2. c4 Nf6 3. g3 e6 4. Bg2 Bb4+ 5. Bd2 Be7"
}, {
    fen: "rnbqk2r/ppppb1pp/4pn2/5p2/2PP4/6P1/PP2PPBP/RNBQK1NR w KQkq - 2 5",
    eco: "A91",
    openingName: "Dutch defence",
    moves: "1. d4 f5 2. c4 Nf6 3. g3 e6 4. Bg2 Be7"
}, {
    fen: "rnbq1rk1/ppppb1pp/4pn2/5p2/2PP4/5NP1/PP2PPBP/RNBQK2R w KQ - 4 6",
    eco: "A92",
    openingName: "Dutch defence",
    moves: "1. d4 f5 2. c4 Nf6 3. g3 e6 4. Bg2 Be7 5. Nf3 O-O"
}, {
    fen: "rnbq1rk1/ppppb1pp/4p3/5p2/2PPn3/5NP1/PP2PPBP/RNBQ1RK1 w - - 6 7",
    eco: "A92",
    openingName: "Dutch defence, Alekhine variation",
    moves: "1. d4 f5 2. c4 Nf6 3. g3 e6 4. Bg2 Be7 5. Nf3 O-O 6. O-O Ne4"
}, {
    fen: "rnbq1rk1/ppp1b1pp/4pn2/3p1p2/2PP4/5NP1/PP2PPBP/RNBQ1RK1 w - d6 0 7",
    eco: "A92",
    openingName: "Dutch: stonewall variation",
    moves: "1. d4 f5 2. c4 Nf6 3. g3 e6 4. Bg2 Be7 5. Nf3 O-O 6. O-O d5"
}, {
    fen: "rnbq1rk1/ppp1b1pp/4pn2/3p1p2/2PP4/2N2NP1/PP2PPBP/R1BQ1RK1 b - - 1 7",
    eco: "A92",
    openingName: "Dutch: stonewall with Nc3",
    moves: "1. d4 f5 2. c4 Nf6 3. g3 e6 4. Bg2 Be7 5. Nf3 O-O 6. O-O d5 7. Nc3"
}, {
    fen: "rnbq1rk1/ppp1b1pp/4pn2/3p1p2/2PP4/1P3NP1/P3PPBP/RNBQ1RK1 b - - 0 7",
    eco: "A93",
    openingName: "Dutch: stonewall, Botwinnik variation",
    moves: "1. d4 f5 2. c4 Nf6 3. g3 e6 4. Bg2 Be7 5. Nf3 O-O 6. O-O d5 7. b3"
}, {
    fen: "rnbq1rk1/pp2b1pp/2p1pn2/3p1p2/2PP4/BP3NP1/P3PPBP/RN1Q1RK1 b - - 1 8",
    eco: "A94",
    openingName: "Dutch: stonewall with Ba3",
    moves: "1. d4 f5 2. c4 Nf6 3. g3 e6 4. Bg2 Be7 5. Nf3 O-O 6. O-O d5 7. b3 c6 8. Ba3"
}, {
    fen: "rnbq1rk1/pp2b1pp/2p1pn2/3p1p2/2PP4/2N2NP1/PP2PPBP/R1BQ1RK1 w - - 0 8",
    eco: "A95",
    openingName: "Dutch: stonewall with Nc3",
    moves: "1. d4 f5 2. c4 Nf6 3. g3 e6 4. Bg2 Be7 5. Nf3 O-O 6. O-O d5 7. Nc3 c6"
}, {
    fen: "rnb1qrk1/pp2b1pp/2p1pn2/3p1pB1/2PP4/2N2NP1/PPQ1PPBP/R4RK1 b - - 3 9",
    eco: "A95",
    openingName: "Dutch: stonewall: Chekhover variation",
    moves: "1. d4 f5 2. c4 Nf6 3. g3 e6 4. Bg2 Be7 5. Nf3 O-O 6. O-O d5 7. Nc3 c6 8. Qc2 Qe8 9. Bg5"
}, {
    fen: "rnbq1rk1/ppp1b1pp/3ppn2/5p2/2PP4/5NP1/PP2PPBP/RNBQ1RK1 w - - 0 7",
    eco: "A96",
    openingName: "Dutch: classical variation",
    moves: "1. d4 f5 2. c4 Nf6 3. g3 e6 4. Bg2 Be7 5. Nf3 O-O 6. O-O d6"
}, {
    fen: "rnb1qrk1/ppp1b1pp/3ppn2/5p2/2PP4/2N2NP1/PP2PPBP/R1BQ1RK1 w - - 2 8",
    eco: "A97",
    openingName: "Dutch: Ilyin-Genevsky variation",
    moves: "1. d4 f5 2. c4 Nf6 3. g3 e6 4. Bg2 Be7 5. Nf3 O-O 6. O-O d6 7. Nc3 Qe8"
}, {
    fen: "rnb1qrk1/ppp1b1pp/3ppn2/5p2/2PP4/2N2NP1/PP2PPBP/R1BQR1K1 b - - 3 8",
    eco: "A97",
    openingName: "Dutch: Ilyin-Genevsky, Winter variation",
    moves: "1. d4 f5 2. c4 Nf6 3. g3 e6 4. Bg2 Be7 5. Nf3 O-O 6. O-O d6 7. Nc3 Qe8 8. Re1"
}, {
    fen: "rnb1qrk1/ppp1b1pp/3ppn2/5p2/2PP4/2N2NP1/PPQ1PPBP/R1B2RK1 b - - 3 8",
    eco: "A98",
    openingName: "Dutch: Ilyin-Genevsky variation with Qc2",
    moves: "1. d4 f5 2. c4 Nf6 3. g3 e6 4. Bg2 Be7 5. Nf3 O-O 6. O-O d6 7. Nc3 Qe8 8. Qc2"
}, {
    fen: "rnb1qrk1/ppp1b1pp/3ppn2/5p2/2PP4/1PN2NP1/P3PPBP/R1BQ1RK1 b - - 0 8",
    eco: "A99",
    openingName: "Dutch: Ilyin-Genevsky variation with b3",
    moves: "1. d4 f5 2. c4 Nf6 3. g3 e6 4. Bg2 Be7 5. Nf3 O-O 6. O-O d6 7. Nc3 Qe8 8. b3"
}, {
    fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1",
    eco: "B00",
    openingName: "King's pawn opening",
    moves: "1. e4"
}, {
    fen: "rnbqkb1r/ppppp2p/5ppn/8/2PPP3/8/PP3PPP/RNBQKBNR w KQkq - 0 4",
    eco: "B00",
    openingName: "Hippopotamus defence",
    moves: "1. e4 Nh6 2. d4 g6 3. c4 f6"
}, {
    fen: "rnbqkbnr/1ppppppp/8/p7/4P3/8/PPPP1PPP/RNBQKBNR w KQkq a6 0 2",
    eco: "B00",
    openingName: "Corn stalk defence",
    moves: "1. e4 a5"
}, {
    fen: "r1bqkbnr/pppppppp/n7/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 1 2",
    eco: "B00",
    openingName: "Lemming defence",
    moves: "1. e4 Na6"
}, {
    fen: "rnbqkbnr/ppppp1pp/8/5p2/4P3/8/PPPP1PPP/RNBQKBNR w KQkq f6 0 2",
    eco: "B00",
    openingName: "Fred",
    moves: "1. e4 f5"
}, {
    fen: "rnbqkbnr/ppppp1pp/5p2/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
    eco: "B00",
    openingName: "Barnes defence",
    moves: "1. e4 f6"
}, {
    fen: "rnbq1bnr/pppppkpp/5p2/8/3PP3/8/PPP2PPP/RNBQKBNR w KQ - 1 3",
    eco: "B00",
    openingName: "Fried fox defence",
    moves: "1. e4 f6 2. d4 Kf7"
}, {
    fen: "rnbqkbnr/ppppppp1/7p/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
    eco: "B00",
    openingName: "Carr's defence",
    moves: "1. e4 h6"
}, {
    fen: "rnbqkbnr/pppppp1p/8/6p1/4P3/8/PPPP1PPP/RNBQKBNR w KQkq g6 0 2",
    eco: "B00",
    openingName: "Reversed Grob (Borg/Basman defence/macho Grob)",
    moves: "1. e4 g5"
}, {
    fen: "rnbqkbnr/1ppppppp/p7/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
    eco: "B00",
    openingName: "St. George (Baker) defence",
    moves: "1. e4 a6"
}, {
    fen: "rnbqkbnr/p1pppppp/1p6/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
    eco: "B00",
    openingName: "Owen defence",
    moves: "1. e4 b6"
}, {
    fen: "rn1qkbnr/p1pppppp/bp6/8/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 1 3",
    eco: "B00",
    openingName: "Guatemala defence",
    moves: "1. e4 b6 2. d4 Ba6"
}, {
    fen: "r1bqkbnr/pppppppp/2n5/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 1 2",
    eco: "B00",
    openingName: "KP: Nimzovich defence",
    moves: "1. e4 Nc6"
}, {
    fen: "r1bqkbnr/pppppppp/2n5/8/3PP3/2P5/P4PPP/RNBQKBNR b KQkq d3 0 4",
    eco: "B00",
    openingName: "KP: Nimzovich defence, Wheeler gambit",
    moves: "1. e4 Nc6 2. b4 Nxb4 3. c3 Nc6 4. d4"
}, {
    fen: "r1bqkbnr/pppppppp/2n5/8/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 2 2",
    eco: "B00",
    openingName: "KP: Nimzovich defence",
    moves: "1. e4 Nc6 2. Nf3"
}, {
    fen: "r1bqkbnr/ppppp1pp/2n5/5p2/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq f6 0 3",
    eco: "B00",
    openingName: "KP: Colorado counter",
    moves: "1. e4 Nc6 2. Nf3 f5"
}, {
    fen: "r1bqkbnr/pppppppp/2n5/8/3PP3/8/PPP2PPP/RNBQKBNR b KQkq d3 0 2",
    eco: "B00",
    openingName: "KP: Nimzovich defence",
    moves: "1. e4 Nc6 2. d4"
}, {
    fen: "r1b1kbnr/ppp1pppp/2n5/3q4/3P4/2N5/PPP2PPP/R1BQKBNR b KQkq - 1 4",
    eco: "B00",
    openingName: "KP: Nimzovich defence, Marshall gambit",
    moves: "1. e4 Nc6 2. d4 d5 3. exd5 Qxd5 4. Nc3"
}, {
    fen: "r1bqkbnr/ppp1pppp/2n5/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR b KQkq - 1 3",
    eco: "B00",
    openingName: "KP: Nimzovich defence, Bogolyubov variation",
    moves: "1. e4 Nc6 2. d4 d5 3. Nc3"
}, {
    fen: "r1bqkbnr/ppppp1pp/2n2p2/8/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3",
    eco: "B00",
    openingName: "KP: Neo-Mongoloid defence",
    moves: "1. e4 Nc6 2. d4 f6"
}, {
    fen: "rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 2",
    eco: "B01",
    openingName: "Scandinavian (centre counter) defence",
    moves: "1. e4 d5"
}, {
    fen: "rn2kb1r/ppp1pppp/5n2/q7/3P2b1/2N2N1P/PPP2PP1/R1BQKB1R b KQkq - 0 6",
    eco: "B01",
    openingName: "Scandinavian defence, Lasker variation",
    moves: "1. e4 d5 2. exd5 Qxd5 3. Nc3 Qa5 4. d4 Nf6 5. Nf3 Bg4 6. h3"
}, {
    fen: "rn2kb1r/ppp1pppp/5n2/q4b2/3P4/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 3 6",
    eco: "B01",
    openingName: "Scandinavian defence",
    moves: "1. e4 d5 2. exd5 Qxd5 3. Nc3 Qa5 4. d4 Nf6 5. Nf3 Bf5"
}, {
    fen: "rn2kb1r/pp2pppp/2p2n2/q3Nb2/3P2P1/2N5/PPP2P1P/R1BQKB1R b KQkq g3 0 7",
    eco: "B01",
    openingName: "Scandinavian defence, Gruenfeld variation",
    moves: "1. e4 d5 2. exd5 Qxd5 3. Nc3 Qa5 4. d4 Nf6 5. Nf3 Bf5 6. Ne5 c6 7. g4"
}, {
    fen: "rnb1kbnr/ppp2ppp/8/q3p3/3P4/2N5/PPP2PPP/R1BQKBNR w KQkq e6 0 5",
    eco: "B01",
    openingName: "Scandinavian: Anderssen counter-attack",
    moves: "1. e4 d5 2. exd5 Qxd5 3. Nc3 Qa5 4. d4 e5"
}, {
    fen: "r1b1k1nr/ppp2ppp/2n5/q3P3/1b6/2N2N2/PPPB1PPP/R2QKB1R b KQkq - 4 7",
    eco: "B01",
    openingName: "Scandinavian: Anderssen counter-attack orthodox attack",
    moves: "1. e4 d5 2. exd5 Qxd5 3. Nc3 Qa5 4. d4 e5 5. dxe5 Bb4 6. Bd2 Nc6 7. Nf3"
}, {
    fen: "rnb1kbnr/ppp2ppp/8/q3p3/3P4/2N2N2/PPP2PPP/R1BQKB1R b KQkq - 1 5",
    eco: "B01",
    openingName: "Scandinavian: Anderssen counter-attack, Goteborg system",
    moves: "1. e4 d5 2. exd5 Qxd5 3. Nc3 Qa5 4. d4 e5 5. Nf3"
}, {
    fen: "rn2kbnr/ppp2ppp/8/q3p3/3P2b1/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 2 6",
    eco: "B01",
    openingName: "Scandinavian: Anderssen counter-attack, Collijn variation",
    moves: "1. e4 d5 2. exd5 Qxd5 3. Nc3 Qa5 4. d4 e5 5. Nf3 Bg4"
}, {
    fen: "rnb1kbnr/ppp1pppp/8/q7/1P6/2N5/P1PP1PPP/R1BQKBNR b KQkq b3 0 4",
    eco: "B01",
    openingName: "Scandinavian, Mieses-Kotrvc gambit",
    moves: "1. e4 d5 2. exd5 Qxd5 3. Nc3 Qa5 4. b4"
}, {
    fen: "rnb1kbnr/ppp1pppp/3q4/8/8/2N5/PPPP1PPP/R1BQKBNR w KQkq - 2 4",
    eco: "B01",
    openingName: "Scandinavian: Pytel-Wade variation",
    moves: "1. e4 d5 2. exd5 Qxd5 3. Nc3 Qd6"
}, {
    fen: "rnbqkb1r/ppp1pppp/5n2/3P4/8/8/PPPP1PPP/RNBQKBNR w KQkq - 1 3",
    eco: "B01",
    openingName: "Scandinavian defence",
    moves: "1. e4 d5 2. exd5 Nf6"
}, {
    fen: "rnbqkb1r/ppp2ppp/4pn2/3P4/2P5/8/PP1P1PPP/RNBQKBNR w KQkq - 0 4",
    eco: "B01",
    openingName: "Scandinavian: Icelandic gambit",
    moves: "1. e4 d5 2. exd5 Nf6 3. c4 e6"
}, {
    fen: "rnbqkb1r/pp2pppp/2p2n2/3P4/2P5/8/PP1P1PPP/RNBQKBNR w KQkq - 0 4",
    eco: "B01",
    openingName: "Scandinavian gambit",
    moves: "1. e4 d5 2. exd5 Nf6 3. c4 c6"
}, {
    fen: "rnbqkb1r/ppp1pppp/5n2/3P4/3P4/8/PPP2PPP/RNBQKBNR b KQkq d3 0 3",
    eco: "B01",
    openingName: "Scandinavian defence",
    moves: "1. e4 d5 2. exd5 Nf6 3. d4"
}, {
    fen: "rnbqkb1r/ppp1pppp/8/3n4/3P4/8/PPP2PPP/RNBQKBNR w KQkq - 0 4",
    eco: "B01",
    openingName: "Scandinavian: Marshall variation",
    moves: "1. e4 d5 2. exd5 Nf6 3. d4 Nxd5"
}, {
    fen: "rnbqkb1r/ppp1pppp/8/8/1nPP4/8/PP3PPP/RNBQKBNR w KQkq - 1 5",
    eco: "B01",
    openingName: "Scandinavian: Kiel variation",
    moves: "1. e4 d5 2. exd5 Nf6 3. d4 Nxd5 4. c4 Nb4"
}, {
    fen: "rnbqkb1r/ppp1pp1p/5np1/3P4/3P4/8/PPP2PPP/RNBQKBNR w KQkq - 0 4",
    eco: "B01",
    openingName: "Scandinavian: Richter variation",
    moves: "1. e4 d5 2. exd5 Nf6 3. d4 g6"
}, {
    fen: "rnbqkb1r/pppppppp/5n2/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 1 2",
    eco: "B02",
    openingName: "Alekhine's defence",
    moves: "1. e4 Nf6"
}, {
    fen: "rnbqkb1r/ppp1pppp/5n2/3p4/4P3/2N5/PPPP1PPP/R1BQKBNR w KQkq d6 0 3",
    eco: "B02",
    openingName: "Alekhine's defence: Scandinavian variation",
    moves: "1. e4 Nf6 2. Nc3 d5"
}, {
    fen: "rnbqkb1r/pppnpppp/4P3/3p4/8/2N5/PPPP1PPP/R1BQKBNR b KQkq - 0 4",
    eco: "B02",
    openingName: "Alekhine's defence: Spielmann variation",
    moves: "1. e4 Nf6 2. Nc3 d5 3. e5 Nfd7 4. e6"
}, {
    fen: "rnbqkb1r/pppppppp/5n2/8/4P3/3P4/PPP2PPP/RNBQKBNR b KQkq - 0 2",
    eco: "B02",
    openingName: "Alekhine's defence: Maroczy variation",
    moves: "1. e4 Nf6 2. d3"
}, {
    fen: "rnbqkb1r/pppppppp/5n2/8/2B1P3/8/PPPP1PPP/RNBQK1NR b KQkq - 2 2",
    eco: "B02",
    openingName: "Alekhine's defence: Krejcik variation",
    moves: "1. e4 Nf6 2. Bc4"
}, {
    fen: "rnbqkb1r/pppppppp/8/4P3/4n3/8/PPPP1PPP/RNBQKBNR w KQkq - 1 3",
    eco: "B02",
    openingName: "Alekhine's defence: Mokele Mbembe (Buecker) variation",
    moves: "1. e4 Nf6 2. e5 Ne4"
}, {
    fen: "rnbqkbnr/pppppppp/8/4P3/8/8/PPPP1PPP/RNBQKBNR w KQkq - 1 3",
    eco: "B02",
    openingName: "Alekhine's defence: Brooklyn defence",
    moves: "1. e4 Nf6 2. e5 Ng8"
}, {
    fen: "rnbqkb1r/pppppppp/8/3nP3/8/8/PPPP1PPP/RNBQKBNR w KQkq - 1 3",
    eco: "B02",
    openingName: "Alekhine's defence",
    moves: "1. e4 Nf6 2. e5 Nd5"
}, {
    fen: "rnbqkb1r/pp1ppppp/1n6/2p1P3/8/1B1P4/PPP2PPP/RNBQK1NR b KQkq - 0 5",
    eco: "B02",
    openingName: "Alekhine's defence: Kmoch variation",
    moves: "1. e4 Nf6 2. e5 Nd5 3. Bc4 Nb6 4. Bb3 c5 5. d3"
}, {
    fen: "rnbqkb1r/pppppppp/8/3nP3/8/2N5/PPPP1PPP/R1BQKBNR b KQkq - 2 3",
    eco: "B02",
    openingName: "Alekhine's defence: Saemisch attack",
    moves: "1. e4 Nf6 2. e5 Nd5 3. Nc3"
}, {
    fen: "rnbqkb1r/pppppppp/8/3nP3/8/1P6/P1PP1PPP/RNBQKBNR b KQkq - 0 3",
    eco: "B02",
    openingName: "Alekhine's defence: Welling variation",
    moves: "1. e4 Nf6 2. e5 Nd5 3. b3"
}, {
    fen: "rnbqkb1r/pppppppp/8/3nP3/2P5/8/PP1P1PPP/RNBQKBNR b KQkq c3 0 3",
    eco: "B02",
    openingName: "Alekhine's defence",
    moves: "1. e4 Nf6 2. e5 Nd5 3. c4"
}, {
    fen: "rnbqkb1r/pppppppp/1n6/4P3/2P5/1P6/P2P1PPP/RNBQKBNR b KQkq - 0 4",
    eco: "B02",
    openingName: "Alekhine's defence: Steiner variation",
    moves: "1. e4 Nf6 2. e5 Nd5 3. c4 Nb6 4. b3"
}, {
    fen: "rnbqkb1r/pppppppp/1n6/2P1P3/8/8/PP1P1PPP/RNBQKBNR b KQkq - 0 4",
    eco: "B02",
    openingName: "Alekhine's defence: two pawns' (Lasker's) attack",
    moves: "1. e4 Nf6 2. e5 Nd5 3. c4 Nb6 4. c5"
}, {
    fen: "rnbqkb1r/ppp2ppp/3pp3/2PnP3/2B5/2N5/PP1P1PPP/R1BQK1NR w KQkq - 0 7",
    eco: "B02",
    openingName: "Alekhine's defence: two pawns' attack, Mikenas variation",
    moves: "1. e4 Nf6 2. e5 Nd5 3. c4 Nb6 4. c5 Nd5 5. Bc4 e6 6. Nc3 d6"
}, {
    fen: "rnbqkb1r/pppppppp/8/3nP3/3P4/8/PPP2PPP/RNBQKBNR b KQkq d3 0 3",
    eco: "B03",
    openingName: "Alekhine's defence",
    moves: "1. e4 Nf6 2. e5 Nd5 3. d4"
}, {
    fen: "rnbqkb1r/p1pppppp/8/1p1nP3/3P4/8/PPP2PPP/RNBQKBNR w KQkq b6 0 4",
    eco: "B03",
    openingName: "Alekhine's defence: O'Sullivan gambit",
    moves: "1. e4 Nf6 2. e5 Nd5 3. d4 b5"
}, {
    fen: "rnbqkb1r/ppp1pppp/3p4/3nP3/3P4/8/PPP2PPP/RNBQKBNR w KQkq - 0 4",
    eco: "B03",
    openingName: "Alekhine's defence",
    moves: "1. e4 Nf6 2. e5 Nd5 3. d4 d6"
}, {
    fen: "rnbqkb1r/ppp1pppp/3p4/3nP3/2BP4/8/PPP2PPP/RNBQK1NR b KQkq - 1 4",
    eco: "B03",
    openingName: "Alekhine's defence: Balogh variation",
    moves: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. Bc4"
}, {
    fen: "rnbqkb1r/ppp1pppp/3p4/3nP3/2PP4/8/PP3PPP/RNBQKBNR b KQkq c3 0 4",
    eco: "B03",
    openingName: "Alekhine's defence",
    moves: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4"
}, {
    fen: "rnbqkb1r/ppp1pppp/1n1P4/8/2PP4/8/PP3PPP/RNBQKBNR b KQkq - 0 5",
    eco: "B03",
    openingName: "Alekhine's defence: exchange variation",
    moves: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. exd6"
}, {
    fen: "r2q1rk1/pp2ppbp/1nnp2p1/5b2/2PP1B2/2N2N1P/PP2BPP1/R2Q1RK1 b - - 4 11",
    eco: "B03",
    openingName: "Alekhine's defence: exchange, Karpov variation",
    moves: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. exd6 cxd6 6. Nf3 g6 7. Be2 Bg7 8. O-O O-O 9. h3 Nc6 10. Nc3 Bf5 11. Bf4"
}, {
    fen: "rnbqkb1r/ppp1pppp/1n1p4/4P3/2PP1P2/8/PP4PP/RNBQKBNR b KQkq f3 0 5",
    eco: "B03",
    openingName: "Alekhine's defence: four pawns attack",
    moves: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. f4"
}, {
    fen: "rn1q1rk1/ppp1b1pp/1n2pp2/4Pb2/2PP4/2N2N2/PP2B1PP/R1BQ1RK1 w - - 0 11",
    eco: "B03",
    openingName: "Alekhine's defence: four pawns attack, Korchnoi variation",
    moves: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. f4 dxe5 6. fxe5 Bf5 7. Nc3 e6 8. Nf3 Be7 9. Be2 O-O 10. O-O f6"
}, {
    fen: "r1bqkb1r/ppp1pppp/1nn5/4P3/2PP4/8/PP4PP/RNBQKBNR w KQkq - 1 7",
    eco: "B03",
    openingName: "Alekhine's defence: four pawns attack, 6...Nc6",
    moves: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. f4 dxe5 6. fxe5 Nc6"
}, {
    fen: "r2qkb1r/ppp1p1pp/1nn1p3/2P5/3P2b1/5N2/PP4PP/RNBQKB1R b KQkq - 0 9",
    eco: "B03",
    openingName: "Alekhine's defence: four pawns attack, Ilyin-Genevsky var.",
    moves: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. f4 dxe5 6. fxe5 Nc6 7. Nf3 Bg4 8. e6 fxe6 9. c5"
}, {
    fen: "r1bqkb1r/ppp1pppp/1nn5/4P3/2PP4/4B3/PP4PP/RN1QKBNR b KQkq - 2 7",
    eco: "B03",
    openingName: "Alekhine's defence: four pawns attack, 7.Be3",
    moves: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. f4 dxe5 6. fxe5 Nc6 7. Be3"
}, {
    fen: "2kr3r/pppqbppp/1nn1p3/4Pb2/2PP4/2N1BN2/PP2B1PP/R2Q1RK1 w - - 6 12",
    eco: "B03",
    openingName: "Alekhine's defence: four pawns attack, Tartakower variation",
    moves: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. f4 dxe5 6. fxe5 Nc6 7. Be3 Bf5 8. Nc3 e6 9. Nf3 Qd7 10. Be2 O-O-O 11. O-O Be7"
}, {
    fen: "rnbqkb1r/ppp1pp1p/1n1p4/4P1p1/2PP1P2/8/PP4PP/RNBQKBNR w KQkq g6 0 6",
    eco: "B03",
    openingName: "Alekhine's defence: four pawns attack, Planinc variation",
    moves: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. f4 g5"
}, {
    fen: "rnbqkb1r/ppp1pp1p/1n1p2p1/4P3/2PP1P2/8/PP4PP/RNBQKBNR w KQkq - 0 6",
    eco: "B03",
    openingName: "Alekhine's defence: four pawns attack, fianchetto variation",
    moves: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. f4 g6"
}, {
    fen: "rn1qkb1r/ppp1pppp/1n1p4/4Pb2/2PP1P2/8/PP4PP/RNBQKBNR w KQkq - 1 6",
    eco: "B03",
    openingName: "Alekhine's defence: four pawns attack, Trifunovic variation",
    moves: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. c4 Nb6 5. f4 Bf5"
}, {
    fen: "rnbqkb1r/ppp1pppp/3p4/3nP3/3P4/5N2/PPP2PPP/RNBQKB1R b KQkq - 1 4",
    eco: "B04",
    openingName: "Alekhine's defence: modern variation",
    moves: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. Nf3"
}, {
    fen: "rnbqkb1r/ppp1pppp/8/3np3/3P4/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 5",
    eco: "B04",
    openingName: "Alekhine's defence: modern, Larsen variation",
    moves: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. Nf3 dxe5"
}, {
    fen: "rnbqkb1r/ppp1pppp/1n1p4/4P3/3P4/5N2/PPP2PPP/RNBQKB1R w KQkq - 2 5",
    eco: "B04",
    openingName: "Alekhine's defence: modern, Schmid variation",
    moves: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. Nf3 Nb6"
}, {
    fen: "rnbqkb1r/ppp1pp1p/3p2p1/3nP3/3P4/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 5",
    eco: "B04",
    openingName: "Alekhine's defence: modern, fianchetto variation",
    moves: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. Nf3 g6"
}, {
    fen: "rnbqk2r/ppp1ppbp/1n1p2p1/4P3/P2P4/1B3N2/1PP2PPP/RNBQK2R b KQkq a3 0 7",
    eco: "B04",
    openingName: "Alekhine's defence: modern, Keres variation",
    moves: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. Nf3 g6 5. Bc4 Nb6 6. Bb3 Bg7 7. a4"
}, {
    fen: "rn1qkb1r/ppp1pppp/3p4/3nP3/3P2b1/5N2/PPP2PPP/RNBQKB1R w KQkq - 2 5",
    eco: "B05",
    openingName: "Alekhine's defence: modern variation, 4...Bg4",
    moves: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. Nf3 Bg4"
}, {
    fen: "rn1qkb1r/pp2pppp/2pp4/3nP3/3P2b1/5N2/PPP1BPPP/RNBQK2R w KQkq - 0 6",
    eco: "B05",
    openingName: "Alekhine's defence: modern, Flohr variation",
    moves: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. Nf3 Bg4 5. Be2 c6"
}, {
    fen: "rn1qkb1r/ppp1pppp/3p4/3nP3/3P2b1/5N1P/PPP2PP1/RNBQKB1R b KQkq - 0 5",
    eco: "B05",
    openingName: "Alekhine's defence: modern, Panov variation",
    moves: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. Nf3 Bg4 5. h3"
}, {
    fen: "rn1qkb1r/ppp1pppp/3p4/3nP3/2PP2b1/5N2/PP3PPP/RNBQKB1R b KQkq c3 0 5",
    eco: "B05",
    openingName: "Alekhine's defence: modern, Alekhine variation",
    moves: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. Nf3 Bg4 5. c4"
}, {
    fen: "rn1qkb1r/ppp1pppp/1n1p4/3PP3/2P3b1/5N2/PP3PPP/RNBQKB1R b KQkq - 0 6",
    eco: "B05",
    openingName: "Alekhine's defence: modern, Vitolins attack",
    moves: "1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. Nf3 Bg4 5. c4 Nb6 6. d5"
}, {
    fen: "rnbqkbnr/pppppp1p/6p1/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
    eco: "B06",
    openingName: "Robatsch (modern) defence",
    moves: "1. e4 g6"
}, {
    fen: "rnbqkb1r/ppppppnp/6p1/4P3/3P2P1/8/PPP2P1P/RNBQKBNR w KQkq - 1 5",
    eco: "B06",
    openingName: "Norwegian defence",
    moves: "1. e4 g6 2. d4 Nf6 3. e5 Nh5 4. g4 Ng7"
}, {
    fen: "rnbqk1nr/ppppppbp/6p1/8/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 1 3",
    eco: "B06",
    openingName: "Robatsch (modern) defence",
    moves: "1. e4 g6 2. d4 Bg7"
}, {
    fen: "rnbqk1nr/ppppppbp/6p1/8/3PPP2/8/PPP3PP/RNBQKBNR b KQkq f3 0 3",
    eco: "B06",
    openingName: "Robatsch defence: three pawns attack",
    moves: "1. e4 g6 2. d4 Bg7 3. f4"
}, {
    fen: "rnbqk1nr/ppppppbp/6p1/8/3PP3/2N5/PPP2PPP/R1BQKBNR b KQkq - 2 3",
    eco: "B06",
    openingName: "Robatsch defence",
    moves: "1. e4 g6 2. d4 Bg7 3. Nc3"
}, {
    fen: "rnbqk1nr/pp2ppb1/2p3p1/3pP2p/3P1P2/2N5/PPP3PP/R1BQKBNR w KQkq h6 0 6",
    eco: "B06",
    openingName: "Robatsch defence: Gurgenidze variation",
    moves: "1. e4 g6 2. d4 Bg7 3. Nc3 c6 4. f4 d5 5. e5 h5"
}, {
    fen: "rnbqk1nr/ppp1ppbp/3p2p1/8/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 0 4",
    eco: "B06",
    openingName: "Robatsch (modern) defence",
    moves: "1. e4 g6 2. d4 Bg7 3. Nc3 d6"
}, {
    fen: "rnbqk1nr/ppp1ppbp/3p2p1/8/3PP3/2N2N2/PPP2PPP/R1BQKB1R b KQkq - 1 4",
    eco: "B06",
    openingName: "Robatsch defence: two knights variation",
    moves: "1. e4 g6 2. d4 Bg7 3. Nc3 d6 4. Nf3"
}, {
    fen: "rnbqk1nr/pp2ppbp/2pp2p1/8/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 5",
    eco: "B06",
    openingName: "Robatsch defence: two knights, Suttles variation",
    moves: "1. e4 g6 2. d4 Bg7 3. Nc3 d6 4. Nf3 c6"
}, {
    fen: "rnbqk1nr/ppp1ppbp/3p2p1/8/3PPP2/2N5/PPP3PP/R1BQKBNR b KQkq f3 0 4",
    eco: "B06",
    openingName: "Robatsch defence: Pseudo-Austrian attack",
    moves: "1. e4 g6 2. d4 Bg7 3. Nc3 d6 4. f4"
}, {
    fen: "rnbqkb1r/ppp1pppp/3p1n2/8/3PP3/2N5/PPP2PPP/R1BQKBNR b KQkq - 2 3",
    eco: "B07",
    openingName: "Pirc defence",
    moves: "1. e4 d6 2. d4 Nf6 3. Nc3"
}, {
    fen: "rnbqkb1r/pp2pppp/2pp1n2/8/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 0 4",
    eco: "B07",
    openingName: "Pirc: Ufimtsev-Pytel variation",
    moves: "1. e4 d6 2. d4 Nf6 3. Nc3 c6"
}, {
    fen: "rnbqkb1r/ppp1pp1p/3p1np1/8/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 0 4",
    eco: "B07",
    openingName: "Pirc defence",
    moves: "1. e4 d6 2. d4 Nf6 3. Nc3 g6"
}, {
    fen: "rnbqkb1r/pp2pp1p/2pp1np1/8/3PP3/2N1B3/PPPQ1PPP/R3KBNR b KQkq - 1 5",
    eco: "B07",
    openingName: "Pirc: 150 attack",
    moves: "1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. Be3 c6 5. Qd2"
}, {
    fen: "rnbqkb1r/ppp1pp1p/3p1np1/8/3PP3/2N3P1/PPP2P1P/R1BQKBNR b KQkq - 0 4",
    eco: "B07",
    openingName: "Pirc: Sveshnikov system",
    moves: "1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. g3"
}, {
    fen: "rnbqkb1r/ppp1pp1p/3p1np1/8/2BPP3/2N5/PPP2PPP/R1BQK1NR b KQkq - 1 4",
    eco: "B07",
    openingName: "Pirc: Holmov system",
    moves: "1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. Bc4"
}, {
    fen: "rnbqkb1r/ppp1pp1p/3p1np1/6B1/3PP3/2N5/PPP2PPP/R2QKBNR b KQkq - 1 4",
    eco: "B07",
    openingName: "Pirc: Byrne variation",
    moves: "1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. Bg5"
}, {
    fen: "rnbqkb1r/ppp1pp1p/3p1np1/8/3PP3/2N5/PPP1BPPP/R1BQK1NR b KQkq - 1 4",
    eco: "B07",
    openingName: "Pirc defence",
    moves: "1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. Be2"
}, {
    fen: "rnbqk2r/ppp1ppbp/3p1np1/8/3PP1P1/2N5/PPP1BP1P/R1BQK1NR b KQkq g3 0 5",
    eco: "B07",
    openingName: "Pirc: Chinese variation",
    moves: "1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. Be2 Bg7 5. g4"
}, {
    fen: "rnbqk2r/ppp1ppbp/3p1np1/8/3PP2P/2N5/PPP1BPP1/R1BQK1NR b KQkq h3 0 5",
    eco: "B07",
    openingName: "Pirc: bayonet (Mariotti) attack",
    moves: "1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. Be2 Bg7 5. h4"
}, {
    fen: "rnbqk1nr/ppp1ppbp/3p2p1/8/3PP3/2P2N2/PP3PPP/RNBQKB1R b KQkq - 0 4",
    eco: "B07",
    openingName: "Robatsch defence: Geller's system",
    moves: "1. e4 g6 2. d4 Bg7 3. Nf3 d6 4. c3"
}, {
    fen: "rnbqkb1r/ppp1pp1p/3p1np1/8/3PP3/2N2N2/PPP2PPP/R1BQKB1R b KQkq - 1 4",
    eco: "B08",
    openingName: "Pirc: classical (two knights) system",
    moves: "1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. Nf3"
}, {
    fen: "rnbqk2r/ppp1ppbp/3p1np1/8/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 2 5",
    eco: "B08",
    openingName: "Pirc: classical (two knights) system",
    moves: "1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. Nf3 Bg7"
}, {
    fen: "rnbqk2r/ppp1ppbp/3p1np1/8/3PP3/2N2N1P/PPP2PP1/R1BQKB1R b KQkq - 0 5",
    eco: "B08",
    openingName: "Pirc: classical, h3 system",
    moves: "1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. Nf3 Bg7 5. h3"
}, {
    fen: "rnbqk2r/ppp1ppbp/3p1np1/8/3PP3/2N2N2/PPP1BPPP/R1BQK2R b KQkq - 3 5",
    eco: "B08",
    openingName: "Pirc: classical system, 5.Be2",
    moves: "1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. Nf3 Bg7 5. Be2"
}, {
    fen: "rnbqkb1r/ppp1pp1p/3p1np1/8/3PPP2/2N5/PPP3PP/R1BQKBNR b KQkq f3 0 4",
    eco: "B09",
    openingName: "Pirc: Austrian attack",
    moves: "1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. f4"
}, {
    fen: "rnbq1rk1/ppp1ppbp/3p1np1/8/3PPP2/2N2N2/PPP3PP/R1BQKB1R w KQ - 3 6",
    eco: "B09",
    openingName: "Pirc: Austrian attack",
    moves: "1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. f4 Bg7 5. Nf3 O-O"
}, {
    fen: "rnbq1rk1/ppp1ppbp/3p1np1/4P3/3P1P2/2N2N2/PPP3PP/R1BQKB1R b KQ - 0 6",
    eco: "B09",
    openingName: "Pirc: Austrian attack, 6.e5",
    moves: "1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. f4 Bg7 5. Nf3 O-O 6. e5"
}, {
    fen: "rnbq1rk1/ppp1ppbp/3p1np1/8/3PPP2/2N1BN2/PPP3PP/R2QKB1R b KQ - 4 6",
    eco: "B09",
    openingName: "Pirc: Austrian attack, 6.Be3",
    moves: "1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. f4 Bg7 5. Nf3 O-O 6. Be3"
}, {
    fen: "rnbq1rk1/ppp1ppbp/3p1np1/8/3PPP2/2NB1N2/PPP3PP/R1BQK2R b KQ - 4 6",
    eco: "B09",
    openingName: "Pirc: Austrian attack, 6.Bd3",
    moves: "1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. f4 Bg7 5. Nf3 O-O 6. Bd3"
}, {
    fen: "rnbqk2r/pp2ppbp/3p1np1/2p5/3PPP2/2N2N2/PPP3PP/R1BQKB1R w KQkq c6 0 6",
    eco: "B09",
    openingName: "Pirc: Austrian attack, dragon formation",
    moves: "1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. f4 Bg7 5. Nf3 c5"
}, {
    fen: "rnbqk2r/ppp1ppbp/3p1np1/8/2BPPP2/2N5/PPP3PP/R1BQK1NR b KQkq - 2 5",
    eco: "B09",
    openingName: "Pirc: Austrian attack, Ljubojevic variation",
    moves: "1. e4 d6 2. d4 Nf6 3. Nc3 g6 4. f4 Bg7 5. Bc4"
}, {
    fen: "rnbqkbnr/pp1ppppp/2p5/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
    eco: "B10",
    openingName: "Caro-Kann defence",
    moves: "1. e4 c6"
}, {
    fen: "rnbqkbnr/pp1ppppp/2p5/8/2B1P3/8/PPPP1PPP/RNBQK1NR b KQkq - 1 2",
    eco: "B10",
    openingName: "Caro-Kann: Hillbilly attack",
    moves: "1. e4 c6 2. Bc4"
}, {
    fen: "rnbqkbnr/pp1ppppp/2p5/8/2P1P3/8/PP1P1PPP/RNBQKBNR b KQkq c3 0 2",
    eco: "B10",
    openingName: "Caro-Kann: anti-Caro-Kann defence",
    moves: "1. e4 c6 2. c4"
}, {
    fen: "rnbqkbnr/pp2pppp/2p5/3p4/2P1P3/8/PP1P1PPP/RNBQKBNR w KQkq d6 0 3",
    eco: "B10",
    openingName: "Caro-Kann: anti-anti-Caro-Kann defence",
    moves: "1. e4 c6 2. c4 d5"
}, {
    fen: "rnbqkbnr/pp1ppppp/2p5/8/4P3/3P4/PPP2PPP/RNBQKBNR b KQkq - 0 2",
    eco: "B10",
    openingName: "Caro-Kann: closed (Breyer) variation",
    moves: "1. e4 c6 2. d3"
}, {
    fen: "rnbqkbnr/pp1ppppp/2p5/8/4P3/2N5/PPPP1PPP/R1BQKBNR b KQkq - 1 2",
    eco: "B10",
    openingName: "Caro-Kann defence",
    moves: "1. e4 c6 2. Nc3"
}, {
    fen: "rnbqkbnr/pp2pppp/2p5/3p4/4P3/2N2Q2/PPPP1PPP/R1B1KBNR b KQkq - 1 3",
    eco: "B10",
    openingName: "Caro-Kann: Goldman (Spielmann) variation",
    moves: "1. e4 c6 2. Nc3 d5 3. Qf3"
}, {
    fen: "rnbqkbnr/pp2pppp/2p5/3p4/4P3/2N2N2/PPPP1PPP/R1BQKB1R b KQkq - 1 3",
    eco: "B10",
    openingName: "Caro-Kann: two knights variation",
    moves: "1. e4 c6 2. Nc3 d5 3. Nf3"
}, {
    fen: "rn1qkbnr/pp2pppp/2p5/3p4/4P1b1/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 2 4",
    eco: "B11",
    openingName: "Caro-Kann: two knights, 3...Bg4",
    moves: "1. e4 c6 2. Nc3 d5 3. Nf3 Bg4"
}, {
    fen: "rnbqkbnr/pp1ppppp/2p5/8/3PP3/8/PPP2PPP/RNBQKBNR b KQkq d3 0 2",
    eco: "B12",
    openingName: "Caro-Kann defence",
    moves: "1. e4 c6 2. d4"
}, {
    fen: "r1bqkbnr/ppnppppp/2p5/8/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 3 4",
    eco: "B12",
    openingName: "de Bruycker defence",
    moves: "1. e4 c6 2. d4 Na6 3. Nc3 Nc7"
}, {
    fen: "rnbqkb1r/pp1ppppp/2p2n2/8/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 1 3",
    eco: "B12",
    openingName: "Caro-Masi defence",
    moves: "1. e4 c6 2. d4 Nf6"
}, {
    fen: "rnbqkbnr/pp2pppp/2p5/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq d6 0 3",
    eco: "B12",
    openingName: "Caro-Kann defence",
    moves: "1. e4 c6 2. d4 d5"
}, {
    fen: "rnbqkbnr/pp2pppp/2p5/3p4/3PP3/5P2/PPP3PP/RNBQKBNR b KQkq - 0 3",
    eco: "B12",
    openingName: "Caro-Kann: Tartakower (fantasy) variation",
    moves: "1. e4 c6 2. d4 d5 3. f3"
}, {
    fen: "rnbqkbnr/pp2pppp/2p5/3p4/3PP3/8/PPPN1PPP/R1BQKBNR b KQkq - 1 3",
    eco: "B12",
    openingName: "Caro-Kann: 3.Nd2",
    moves: "1. e4 c6 2. d4 d5 3. Nd2"
}, {
    fen: "rnb1kbnr/pp2pppp/1qp5/3p4/3PP3/8/PPPN1PPP/R1BQKBNR w KQkq - 2 4",
    eco: "B12",
    openingName: "Caro-Kann: Edinburgh variation",
    moves: "1. e4 c6 2. d4 d5 3. Nd2 Qb6"
}, {
    fen: "rnbqkbnr/pp2pppp/2p5/3pP3/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3",
    eco: "B12",
    openingName: "Caro-Kann: advance variation",
    moves: "1. e4 c6 2. d4 d5 3. e5"
}, {
    fen: "rn1qkbnr/pp3ppp/2p1p3/3pPb2/3P4/2P5/PP2BPPP/RNBQK1NR b KQkq - 1 5",
    eco: "B12",
    openingName: "Caro-Kann: advance, Short variation",
    moves: "1. e4 c6 2. d4 d5 3. e5 Bf5 4. c3 e6 5. Be2"
}, {
    fen: "rnbqkbnr/pp2pppp/2p5/3P4/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3",
    eco: "B13",
    openingName: "Caro-Kann: exchange variation",
    moves: "1. e4 c6 2. d4 d5 3. exd5"
}, {
    fen: "r1bqkb1r/pp2pppp/2n2n2/3p4/3P1B2/2PB4/PP3PPP/RN1QK1NR b KQkq - 2 6",
    eco: "B13",
    openingName: "Caro-Kann: exchange, Rubinstein variation",
    moves: "1. e4 c6 2. d4 d5 3. exd5 cxd5 4. Bd3 Nc6 5. c3 Nf6 6. Bf4"
}, {
    fen: "rnbqkbnr/pp2pppp/8/3p4/2PP4/8/PP3PPP/RNBQKBNR b KQkq c3 0 4",
    eco: "B13",
    openingName: "Caro-Kann: Panov-Botvinnik attack",
    moves: "1. e4 c6 2. d4 d5 3. exd5 cxd5 4. c4"
}, {
    fen: "rnbqkb1r/pp2pppp/5n2/2Pp4/3P4/8/PP3PPP/RNBQKBNR b KQkq - 0 5",
    eco: "B13",
    openingName: "Caro-Kann: Panov-Botvinnik, Gunderam attack",
    moves: "1. e4 c6 2. d4 d5 3. exd5 cxd5 4. c4 Nf6 5. c5"
}, {
    fen: "rnbqkb1r/pp2pppp/5n2/3p4/2PP4/2N5/PP3PPP/R1BQKBNR b KQkq - 2 5",
    eco: "B13",
    openingName: "Caro-Kann: Panov-Botvinnik attack",
    moves: "1. e4 c6 2. d4 d5 3. exd5 cxd5 4. c4 Nf6 5. Nc3"
}, {
    fen: "r1bqkb1r/pp2pppp/5n2/n2P2B1/2p5/2N5/PP3PPP/R2QKBNR w KQkq - 1 8",
    eco: "B13",
    openingName: "Caro-Kann: Panov-Botvinnik, Herzog defence",
    moves: "1. e4 c6 2. d4 d5 3. exd5 cxd5 4. c4 Nf6 5. Nc3 Nc6 6. Bg5 dxc4 7. d5 Na5"
}, {
    fen: "r1bqkb1r/pp3ppp/2n1pn2/3p2B1/2PP4/2N5/PP3PPP/R2QKBNR w KQkq - 0 7",
    eco: "B13",
    openingName: "Caro-Kann: Panov-Botvinnik, normal variation",
    moves: "1. e4 c6 2. d4 d5 3. exd5 cxd5 4. c4 Nf6 5. Nc3 Nc6 6. Bg5 e6"
}, {
    fen: "r1b1kb1r/pp2pppp/2n2n2/q2p2B1/2PP4/2N5/PP3PPP/R2QKBNR w KQkq - 5 7",
    eco: "B13",
    openingName: "Caro-Kann: Panov-Botvinnik, Czerniak variation",
    moves: "1. e4 c6 2. d4 d5 3. exd5 cxd5 4. c4 Nf6 5. Nc3 Nc6 6. Bg5 Qa5"
}, {
    fen: "r1b1kb1r/pp2pppp/1qn2n2/3p2B1/2PP4/2N5/PP3PPP/R2QKBNR w KQkq - 5 7",
    eco: "B13",
    openingName: "Caro-Kann: Panov-Botvinnik, Reifir (Spielmann) variation",
    moves: "1. e4 c6 2. d4 d5 3. exd5 cxd5 4. c4 Nf6 5. Nc3 Nc6 6. Bg5 Qb6"
}, {
    fen: "rnbqkb1r/pp3ppp/4pn2/3p4/2PP4/2N5/PP3PPP/R1BQKBNR w KQkq - 0 6",
    eco: "B14",
    openingName: "Caro-Kann: Panov-Botvinnik attack, 5...e6",
    moves: "1. e4 c6 2. d4 d5 3. exd5 cxd5 4. c4 Nf6 5. Nc3 e6"
}, {
    fen: "rnbqkb1r/pp2pp1p/5np1/3p4/2PP4/2N5/PP3PPP/R1BQKBNR w KQkq - 0 6",
    eco: "B14",
    openingName: "Caro-Kann: Panov-Botvinnik attack, 5...g6",
    moves: "1. e4 c6 2. d4 d5 3. exd5 cxd5 4. c4 Nf6 5. Nc3 g6"
}, {
    fen: "rnbqkbnr/pp2pppp/2p5/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR b KQkq - 1 3",
    eco: "B15",
    openingName: "Caro-Kann defence",
    moves: "1. e4 c6 2. d4 d5 3. Nc3"
}, {
    fen: "rnbqkbnr/p3pppp/2p5/1p1p4/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq b6 0 4",
    eco: "B15",
    openingName: "Caro-Kann: Gurgenidze counter-attack",
    moves: "1. e4 c6 2. d4 d5 3. Nc3 b5"
}, {
    fen: "rnbqkbnr/pp2pp1p/2p3p1/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 0 4",
    eco: "B15",
    openingName: "Caro-Kann: Gurgenidze system",
    moves: "1. e4 c6 2. d4 d5 3. Nc3 g6"
}, {
    fen: "rnbqkbnr/pp2pppp/2p5/8/3Pp3/2N2P2/PPP3PP/R1BQKBNR b KQkq - 0 4",
    eco: "B15",
    openingName: "Caro-Kann: Rasa-Studier gambit",
    moves: "1. e4 c6 2. d4 d5 3. Nc3 dxe4 4. f3"
}, {
    fen: "rnbqkbnr/pp2pppp/2p5/8/3PN3/8/PPP2PPP/R1BQKBNR b KQkq - 0 4",
    eco: "B15",
    openingName: "Caro-Kann defence",
    moves: "1. e4 c6 2. d4 d5 3. Nc3 dxe4 4. Nxe4"
}, {
    fen: "rnbqkb1r/pp2pppp/2p2n2/8/3PN3/3B4/PPP2PPP/R1BQK1NR b KQkq - 2 5",
    eco: "B15",
    openingName: "Caro-Kann: Alekhine gambit",
    moves: "1. e4 c6 2. d4 d5 3. Nc3 dxe4 4. Nxe4 Nf6 5. Bd3"
}, {
    fen: "rnbqkb1r/pp3ppp/2p2p2/8/3P4/8/PPP2PPP/R1BQKBNR w KQkq - 0 6",
    eco: "B15",
    openingName: "Caro-Kann: Tartakower (Nimzovich) variation",
    moves: "1. e4 c6 2. d4 d5 3. Nc3 dxe4 4. Nxe4 Nf6 5. Nxf6+ exf6"
}, {
    fen: "rnbqkb1r/pp3ppp/2p2p2/8/2BP4/8/PPP2PPP/R1BQK1NR b KQkq - 1 6",
    eco: "B15",
    openingName: "Caro-Kann: Forgacs variation",
    moves: "1. e4 c6 2. d4 d5 3. Nc3 dxe4 4. Nxe4 Nf6 5. Nxf6+ exf6 6. Bc4"
}, {
    fen: "rnbqkb1r/pp2pp1p/2p2p2/8/3P4/8/PPP2PPP/R1BQKBNR w KQkq - 0 6",
    eco: "B16",
    openingName: "Caro-Kann: Bronstein-Larsen variation",
    moves: "1. e4 c6 2. d4 d5 3. Nc3 dxe4 4. Nxe4 Nf6 5. Nxf6+ gxf6"
}, {
    fen: "r1bqkbnr/pp1npppp/2p5/8/3PN3/8/PPP2PPP/R1BQKBNR w KQkq - 1 5",
    eco: "B17",
    openingName: "Caro-Kann: Steinitz variation",
    moves: "1. e4 c6 2. d4 d5 3. Nc3 dxe4 4. Nxe4 Nd7"
}, {
    fen: "rn1qkbnr/pp2pppp/2p5/5b2/3PN3/8/PPP2PPP/R1BQKBNR w KQkq - 1 5",
    eco: "B18",
    openingName: "Caro-Kann: classical variation",
    moves: "1. e4 c6 2. d4 d5 3. Nc3 dxe4 4. Nxe4 Bf5"
}, {
    fen: "rn1qkbnr/pp2pppp/2p3b1/8/3P4/6NN/PPP2PPP/R1BQKB1R b KQkq - 4 6",
    eco: "B18",
    openingName: "Caro-Kann: classical, Flohr variation",
    moves: "1. e4 c6 2. d4 d5 3. Nc3 dxe4 4. Nxe4 Bf5 5. Ng3 Bg6 6. Nh3"
}, {
    fen: "rn1qkbnr/pp2pppp/2p3b1/8/3P1P2/6N1/PPP3PP/R1BQKBNR b KQkq f3 0 6",
    eco: "B18",
    openingName: "Caro-Kann: classical, Maroczy attack",
    moves: "1. e4 c6 2. d4 d5 3. Nc3 dxe4 4. Nxe4 Bf5 5. Ng3 Bg6 6. f4"
}, {
    fen: "rn1qkbnr/pp2pppp/2p3b1/8/3P3P/6N1/PPP2PP1/R1BQKBNR b KQkq h3 0 6",
    eco: "B18",
    openingName: "Caro-Kann: classical, 6.h4",
    moves: "1. e4 c6 2. d4 d5 3. Nc3 dxe4 4. Nxe4 Bf5 5. Ng3 Bg6 6. h4"
}, {
    fen: "r2qkbnr/pp1nppp1/2p3bp/8/3P3P/5NN1/PPP2PP1/R1BQKB1R w KQkq - 2 8",
    eco: "B19",
    openingName: "Caro-Kann: classical, 7...Nd7",
    moves: "1. e4 c6 2. d4 d5 3. Nc3 dxe4 4. Nxe4 Bf5 5. Ng3 Bg6 6. h4 h6 7. Nf3 Nd7"
}, {
    fen: "r2qkbnr/pp1nppp1/2p3bp/7P/3P4/5NN1/PPP2PP1/R1BQKB1R b KQkq - 0 8",
    eco: "B19",
    openingName: "Caro-Kann: classical, Spassky variation",
    moves: "1. e4 c6 2. d4 d5 3. Nc3 dxe4 4. Nxe4 Bf5 5. Ng3 Bg6 6. h4 h6 7. Nf3 Nd7 8. h5"
}, {
    fen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2",
    eco: "B20",
    openingName: "Sicilian defence",
    moves: "1. e4 c5"
}, {
    fen: "r1bqkbnr/pp2ppp1/2np4/2p4p/2P1P3/2N3P1/PP1P1P1P/R1BQKBNR w KQkq h6 0 5",
    eco: "B20",
    openingName: "Sicilian: Gloria variation",
    moves: "1. e4 c5 2. c4 d6 3. Nc3 Nc6 4. g3 h5"
}, {
    fen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/6P1/PPPP1P1P/RNBQKBNR b KQkq - 0 2",
    eco: "B20",
    openingName: "Sicilian: Steinitz variation",
    moves: "1. e4 c5 2. g3"
}, {
    fen: "rnbqkbnr/pp1ppppp/8/2p5/1P2P3/8/P1PP1PPP/RNBQKBNR b KQkq b3 0 2",
    eco: "B20",
    openingName: "Sicilian: wing gambit",
    moves: "1. e4 c5 2. b4"
}, {
    fen: "rnbqkbnr/pp1ppppp/8/8/1pP1P3/8/P2P1PPP/RNBQKBNR b KQkq c3 0 3",
    eco: "B20",
    openingName: "Sicilian: wing gambit, Santasiere variation",
    moves: "1. e4 c5 2. b4 cxb4 3. c4"
}, {
    fen: "rnbqkbnr/pp1ppppp/8/8/1p2P3/P7/2PP1PPP/RNBQKBNR b KQkq - 0 3",
    eco: "B20",
    openingName: "Sicilian: wing gambit, Marshall variation",
    moves: "1. e4 c5 2. b4 cxb4 3. a3"
}, {
    fen: "rnb1kbnr/pp2pppp/8/3q4/1p6/P7/1BPP1PPP/RN1QKBNR b KQkq - 1 5",
    eco: "B20",
    openingName: "Sicilian: wing gambit, Marienbad variation",
    moves: "1. e4 c5 2. b4 cxb4 3. a3 d5 4. exd5 Qxd5 5. Bb2"
}, {
    fen: "rnbqkbnr/pp1ppppp/8/8/4P3/p7/2PP1PPP/RNBQKBNR w KQkq - 0 4",
    eco: "B20",
    openingName: "Sicilian: wing gambit, Carlsbad variation",
    moves: "1. e4 c5 2. b4 cxb4 3. a3 bxa3"
}, {
    fen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPPNPPP/RNBQKB1R b KQkq - 1 2",
    eco: "B20",
    openingName: "Sicilian: Keres variation (2.Ne2)",
    moves: "1. e4 c5 2. Ne2"
}, {
    fen: "rnbqkbnr/pp1ppppp/8/2p5/4PP2/8/PPPP2PP/RNBQKBNR b KQkq f3 0 2",
    eco: "B21",
    openingName: "Sicilian: Grand Prix attack",
    moves: "1. e4 c5 2. f4"
}, {
    fen: "rnbqkbnr/pp1ppppp/8/2p5/3PP3/8/PPP2PPP/RNBQKBNR b KQkq d3 0 2",
    eco: "B21",
    openingName: "Sicilian: Smith-Morra gambit",
    moves: "1. e4 c5 2. d4"
}, {
    fen: "rnbqkbnr/pp1p1ppp/8/4p3/3pP3/2P2N2/PP3PPP/RNBQKB1R b KQkq - 0 4",
    eco: "B21",
    openingName: "Sicilian: Andreaschek gambit",
    moves: "1. e4 c5 2. d4 cxd4 3. Nf3 e5 4. c3"
}, {
    fen: "rnbqkbnr/pp1ppppp/8/8/3pP3/2P5/PP3PPP/RNBQKBNR b KQkq - 0 3",
    eco: "B21",
    openingName: "Sicilian: Smith-Morra gambit",
    moves: "1. e4 c5 2. d4 cxd4 3. c3"
}, {
    fen: "2bqkbnr/r4ppp/p1npp3/1p6/4P3/1BN2N2/PP2QPPP/R1B2RK1 w k - 2 10",
    eco: "B21",
    openingName: "Sicilian: Smith-Morra gambit, Chicago defence",
    moves: "1. e4 c5 2. d4 cxd4 3. c3 dxc3 4. Nxc3 Nc6 5. Nf3 d6 6. Bc4 e6 7. O-O a6 8. Qe2 b5 9. Bb3 Ra7"
}, {
    fen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/2P5/PP1P1PPP/RNBQKBNR b KQkq - 0 2",
    eco: "B22",
    openingName: "Sicilian: Alapin's variation (2.c3)",
    moves: "1. e4 c5 2. c3"
}, {
    fen: "r1bqkb1r/pp1ppppp/2n5/2pnP3/8/N1P2N2/PP1P1PPP/R1BQKB1R b KQkq - 4 5",
    eco: "B22",
    openingName: "Sicilian: 2.c3, Heidenfeld variation",
    moves: "1. e4 c5 2. c3 Nf6 3. e5 Nd5 4. Nf3 Nc6 5. Na3"
}, {
    fen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/2N5/PPPP1PPP/R1BQKBNR b KQkq - 1 2",
    eco: "B23",
    openingName: "Sicilian: closed",
    moves: "1. e4 c5 2. Nc3"
}, {
    fen: "rnbqkbnr/pp3ppp/4p3/2pp4/4P3/2N3P1/PPPP1P1P/R1BQKBNR w KQkq d6 0 4",
    eco: "B23",
    openingName: "Sicilian: closed, Korchnoi variation",
    moves: "1. e4 c5 2. Nc3 e6 3. g3 d5"
}, {
    fen: "r1bqkbnr/pp1ppppp/2n5/2p5/4P3/2N5/PPPP1PPP/R1BQKBNR w KQkq - 2 3",
    eco: "B23",
    openingName: "Sicilian: closed, 2...Nc6",
    moves: "1. e4 c5 2. Nc3 Nc6"
}, {
    fen: "r1bqkbnr/pp1ppppp/2n5/2p5/4P3/2N5/PPPPNPPP/R1BQKB1R b KQkq - 3 3",
    eco: "B23",
    openingName: "Sicilian: chameleon variation",
    moves: "1. e4 c5 2. Nc3 Nc6 3. Nge2"
}, {
    fen: "r1bqkbnr/pp1ppppp/2n5/2p5/4PP2/2N5/PPPP2PP/R1BQKBNR b KQkq f3 0 3",
    eco: "B23",
    openingName: "Sicilian: Grand Prix attack",
    moves: "1. e4 c5 2. Nc3 Nc6 3. f4"
}, {
    fen: "r1bqk1nr/pp1p1pbp/2n1p1p1/2p2P2/2B1P3/2N2N2/PPPP2PP/R1BQK2R b KQkq - 0 6",
    eco: "B23",
    openingName: "Sicilian: Grand Prix attack, Schofman variation",
    moves: "1. e4 c5 2. Nc3 Nc6 3. f4 g6 4. Nf3 Bg7 5. Bc4 e6 6. f5"
}, {
    fen: "r1bqkbnr/pp1ppppp/2n5/2p5/4P3/2N3P1/PPPP1P1P/R1BQKBNR b KQkq - 0 3",
    eco: "B24",
    openingName: "Sicilian: closed",
    moves: "1. e4 c5 2. Nc3 Nc6 3. g3"
}, {
    fen: "r1bqk1nr/pp1p1pbp/4p1p1/2p5/3nP3/3PB1P1/PPP1NPBP/R2QK1NR b KQkq - 3 7",
    eco: "B24",
    openingName: "Sicilian: closed, Smyslov variation",
    moves: "1. e4 c5 2. Nc3 Nc6 3. g3 g6 4. Bg2 Bg7 5. d3 e6 6. Be3 Nd4 7. Nce2"
}, {
    fen: "r1bqk1nr/pp2ppbp/2np2p1/2p5/4P3/2NP2P1/PPP2PBP/R1BQK1NR w KQkq - 0 6",
    eco: "B25",
    openingName: "Sicilian: closed",
    moves: "1. e4 c5 2. Nc3 Nc6 3. g3 g6 4. Bg2 Bg7 5. d3 d6"
}, {
    fen: "r1bqk1nr/pp3pbp/2np2p1/2p1p3/4P3/2NP2P1/PPP1NPBP/R1BQK2R w KQkq e6 0 7",
    eco: "B25",
    openingName: "Sicilian: closed, 6.Ne2 e5 (Botvinnik)",
    moves: "1. e4 c5 2. Nc3 Nc6 3. g3 g6 4. Bg2 Bg7 5. d3 d6 6. Nge2 e5"
}, {
    fen: "r1bqk1nr/pp2ppbp/2np2p1/2p5/4PP2/2NP2P1/PPP3BP/R1BQK1NR b KQkq f3 0 6",
    eco: "B25",
    openingName: "Sicilian: closed, 6.f4",
    moves: "1. e4 c5 2. Nc3 Nc6 3. g3 g6 4. Bg2 Bg7 5. d3 d6 6. f4"
}, {
    fen: "r1bqk1nr/pp3pbp/2np2p1/2p1p3/4PP2/2NP2P1/PPP3BP/R1BQK1NR w KQkq e6 0 7",
    eco: "B25",
    openingName: "Sicilian: closed, 6.f4 e5 (Botvinnik)",
    moves: "1. e4 c5 2. Nc3 Nc6 3. g3 g6 4. Bg2 Bg7 5. d3 d6 6. f4 e5"
}, {
    fen: "r1bqk1nr/pp2ppbp/2np2p1/2p5/4P3/2NPB1P1/PPP2PBP/R2QK1NR b KQkq - 1 6",
    eco: "B26",
    openingName: "Sicilian: closed, 6.Be3",
    moves: "1. e4 c5 2. Nc3 Nc6 3. g3 g6 4. Bg2 Bg7 5. d3 d6 6. Be3"
}, {
    fen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2",
    eco: "B27",
    openingName: "Sicilian defence",
    moves: "1. e4 c5 2. Nf3"
}, {
    fen: "rnb1kbnr/pp1ppppp/8/q1p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
    eco: "B27",
    openingName: "Sicilian: Stiletto (Althouse) variation",
    moves: "1. e4 c5 2. Nf3 Qa5"
}, {
    fen: "rnb1kbnr/ppqppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
    eco: "B27",
    openingName: "Sicilian: Quinteros variation",
    moves: "1. e4 c5 2. Nf3 Qc7"
}, {
    fen: "rnbqkbnr/p2ppppp/1p6/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3",
    eco: "B27",
    openingName: "Sicilian: Katalimov variation",
    moves: "1. e4 c5 2. Nf3 b6"
}, {
    fen: "rnbqkbnr/pp1ppp1p/6p1/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3",
    eco: "B27",
    openingName: "Sicilian: Hungarian variation",
    moves: "1. e4 c5 2. Nf3 g6"
}, {
    fen: "rnbqk1nr/pp1ppp1p/6pb/2p5/2P1P3/5N2/PP1P1PPP/RNBQKB1R w KQkq - 1 4",
    eco: "B27",
    openingName: "Sicilian: Acton extension",
    moves: "1. e4 c5 2. Nf3 g6 3. c4 Bh6"
}, {
    fen: "rnbqkbnr/1p1ppppp/p7/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3",
    eco: "B28",
    openingName: "Sicilian: O'Kelly variation",
    moves: "1. e4 c5 2. Nf3 a6"
}, {
    fen: "rnbqkb1r/pp1ppppp/5n2/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
    eco: "B29",
    openingName: "Sicilian: Nimzovich-Rubinstein variation",
    moves: "1. e4 c5 2. Nf3 Nf6"
}, {
    fen: "r1bqkb1r/pp1p1ppp/2n5/2ppP3/3P4/5N2/PPP2PPP/R1BQKB1R w KQkq - 1 7",
    eco: "B29",
    openingName: "Sicilian: Nimzovich-Rubinstein; Rubinstein counter-gambit",
    moves: "1. e4 c5 2. Nf3 Nf6 3. e5 Nd5 4. Nc3 e6 5. Nxd5 exd5 6. d4 Nc6"
}, {
    fen: "r1bqkbnr/pp1ppppp/2n5/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
    eco: "B30",
    openingName: "Sicilian defence",
    moves: "1. e4 c5 2. Nf3 Nc6"
}, {
    fen: "r1bqkbnr/pp1ppppp/2n5/1Bp5/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
    eco: "B30",
    openingName: "Sicilian: Nimzovich-Rossolimo attack (without ...d6)",
    moves: "1. e4 c5 2. Nf3 Nc6 3. Bb5"
}, {
    fen: "r1bqkbnr/pp1ppp1p/2n3p1/1Bp5/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4",
    eco: "B31",
    openingName: "Sicilian: Nimzovich-Rossolimo attack (with ...g6, without ...d6)",
    moves: "1. e4 c5 2. Nf3 Nc6 3. Bb5 g6"
}, {
    fen: "r1bqk1nr/pp1p1pbp/2n3p1/1Bp1p3/1P2P3/5N2/P1PP1PPP/RNBQR1K1 b kq b3 0 6",
    eco: "B31",
    openingName: "Sicilian: Nimzovich-Rossolimo attack, Gurgenidze variation",
    moves: "1. e4 c5 2. Nf3 Nc6 3. Bb5 g6 4. O-O Bg7 5. Re1 e5 6. b4"
}, {
    fen: "r1bqkbnr/pp1ppppp/2n5/2p5/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq d3 0 3",
    eco: "B32",
    openingName: "Sicilian defence",
    moves: "1. e4 c5 2. Nf3 Nc6 3. d4"
}, {
    fen: "r1b1kbnr/ppqppppp/2n5/8/3NP3/8/PPP2PPP/RNBQKB1R w KQkq - 1 5",
    eco: "B32",
    openingName: "Sicilian: Flohr variation",
    moves: "1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 Qc7"
}, {
    fen: "r1bqkbnr/pp2pppp/2n5/3p4/3NP3/8/PPP2PPP/RNBQKB1R w KQkq d6 0 5",
    eco: "B32",
    openingName: "Sicilian: Nimzovich variation",
    moves: "1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 d5"
}, {
    fen: "r1bqkbnr/pp1p1ppp/2n5/4p3/3NP3/8/PPP2PPP/RNBQKB1R w KQkq e6 0 5",
    eco: "B32",
    openingName: "Sicilian: Labourdonnais-Loewenthal variation",
    moves: "1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 e5"
}, {
    fen: "r1bqkbnr/pp3ppp/2np4/1N2p3/4P3/8/PPP2PPP/RNBQKB1R w KQkq - 0 6",
    eco: "B32",
    openingName: "Sicilian: Labourdonnais-Loewenthal (Kalashnikov) variation",
    moves: "1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 e5 5. Nb5 d6"
}, {
    fen: "r1bqkb1r/pp1ppppp/2n2n2/8/3NP3/8/PPP2PPP/RNBQKB1R w KQkq - 1 5",
    eco: "B33",
    openingName: "Sicilian defence",
    moves: "1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 Nf6"
}, {
    fen: "r1bqkb1r/pp1p1ppp/2n2n2/4p3/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq e6 0 6",
    eco: "B33",
    openingName: "Sicilian: Pelikan (Lasker/Sveshnikov) variation",
    moves: "1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e5"
}, {
    fen: "r2qkb1r/1p3ppp/p1npbn2/4p1B1/4P3/N1N5/PPP2PPP/R2QKB1R w KQkq - 2 9",
    eco: "B33",
    openingName: "Sicilian: Pelikan, Bird variation",
    moves: "1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e5 6. Ndb5 d6 7. Bg5 a6 8. Na3 Be6"
}, {
    fen: "r1bqkb1r/5ppp/p1np1n2/1p2p1B1/4P3/N1N5/PPP2PPP/R2QKB1R w KQkq b6 0 9",
    eco: "B33",
    openingName: "Sicilian: Pelikan, Chelyabinsk variation",
    moves: "1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e5 6. Ndb5 d6 7. Bg5 a6 8. Na3 b5"
}, {
    fen: "r1bqkb1r/5p1p/p1np4/1p1Npp2/4P3/N7/PPP2PPP/R2QKB1R w KQkq - 0 11",
    eco: "B33",
    openingName: "Sicilian: Sveshnikov variation",
    moves: "1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e5 6. Ndb5 d6 7. Bg5 a6 8. Na3 b5 9. Bxf6 gxf6 10. Nd5 f5"
}, {
    fen: "r1bqkbnr/pp1ppp1p/2N3p1/8/4P3/8/PPP2PPP/RNBQKB1R b KQkq - 0 5",
    eco: "B34",
    openingName: "Sicilian: accelerated fianchetto, exchange variation",
    moves: "1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 g6 5. Nxc6"
}, {
    fen: "r1bqkbnr/pp1ppp1p/2n3p1/8/3NP3/2N5/PPP2PPP/R1BQKB1R b KQkq - 1 5",
    eco: "B34",
    openingName: "Sicilian: accelerated fianchetto, modern variation",
    moves: "1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 g6 5. Nc3"
}, {
    fen: "r1bqk2r/pp1pppbp/2n2np1/8/2BNP3/2N1B3/PPP2PPP/R2QK2R b KQkq - 5 7",
    eco: "B35",
    openingName: "Sicilian: accelerated fianchetto, modern variation with Bc4",
    moves: "1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 g6 5. Nc3 Bg7 6. Be3 Nf6 7. Bc4"
}, {
    fen: "r1bqkbnr/pp1ppp1p/2n3p1/8/2PNP3/8/PP3PPP/RNBQKB1R b KQkq c3 0 5",
    eco: "B36",
    openingName: "Sicilian: accelerated fianchetto, Maroczy bind",
    moves: "1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 g6 5. c4"
}, {
    fen: "r1bqkb1r/pp2pp1p/3p1np1/8/2PQP3/2N5/PP3PPP/R1B1KB1R w KQkq - 0 8",
    eco: "B36",
    openingName: "Sicilian: accelerated fianchetto, Gurgenidze variation",
    moves: "1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 g6 5. c4 Nf6 6. Nc3 Nxd4 7. Qxd4 d6"
}, {
    fen: "r1bqk1nr/pp1pppbp/2n3p1/8/2PNP3/8/PP3PPP/RNBQKB1R w KQkq - 1 6",
    eco: "B37",
    openingName: "Sicilian: accelerated fianchetto, Maroczy bind, 5...Bg7",
    moves: "1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 g6 5. c4 Bg7"
}, {
    fen: "r1bqk2r/pp2ppbp/2np2pn/8/2P1P3/8/PPN1BPPP/RNBQK2R w KQkq - 2 8",
    eco: "B37",
    openingName: "Sicilian: accelerated fianchetto, Simagin variation",
    moves: "1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 g6 5. c4 Bg7 6. Nc2 d6 7. Be2 Nh6"
}, {
    fen: "r1bqk1nr/pp1pppbp/2n3p1/8/2PNP3/4B3/PP3PPP/RN1QKB1R b KQkq - 2 6",
    eco: "B38",
    openingName: "Sicilian: accelerated fianchetto, Maroczy bind, 6.Be3",
    moves: "1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 g6 5. c4 Bg7 6. Be3"
}, {
    fen: "r1bqk2r/pp1pppbp/2n3p1/8/2PNP1n1/2N1B3/PP3PPP/R2QKB1R w KQkq - 5 8",
    eco: "B39",
    openingName: "Sicilian: accelerated fianchetto, Breyer variation",
    moves: "1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 g6 5. c4 Bg7 6. Be3 Nf6 7. Nc3 Ng4"
}, {
    fen: "rnbqkbnr/pp1p1ppp/4p3/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3",
    eco: "B40",
    openingName: "Sicilian defence",
    moves: "1. e4 c5 2. Nf3 e6"
}, {
    fen: "rnbqkbnr/pp3ppp/4p3/2pp4/3PP3/5N2/PPP2PPP/RNBQKB1R w KQkq d6 0 4",
    eco: "B40",
    openingName: "Sicilian: Marshall variation",
    moves: "1. e4 c5 2. Nf3 e6 3. d4 d5"
}, {
    fen: "rnbqkbnr/pp1p1ppp/4p3/8/3pP3/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 4",
    eco: "B40",
    openingName: "Sicilian defence",
    moves: "1. e4 c5 2. Nf3 e6 3. d4 cxd4"
}, {
    fen: "rnbqkb1r/pp1p1ppp/4pn2/8/3NP3/8/PPP2PPP/RNBQKB1R w KQkq - 1 5",
    eco: "B40",
    openingName: "Sicilian: Anderssen variation",
    moves: "1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 Nf6"
}, {
    fen: "rnbqk2r/pp1p1ppp/4pn2/8/1b1NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 3 6",
    eco: "B40",
    openingName: "Sicilian: Pin variation (Sicilian counter-attack)",
    moves: "1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 Bb4"
}, {
    fen: "rnbqk2r/pp1p1ppp/5n2/4p3/1b1NP3/2NB4/PPP2PPP/R1BQK2R w KQkq - 0 7",
    eco: "B40",
    openingName: "Sicilian: Pin, Jaffe variation",
    moves: "1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 Bb4 6. Bd3 e5"
}, {
    fen: "rnbqk2r/pp1p1ppp/4pn2/4P3/1b1N4/2N5/PPP2PPP/R1BQKB1R b KQkq - 0 6",
    eco: "B40",
    openingName: "Sicilian: Pin, Koch variation",
    moves: "1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 Bb4 6. e5"
}, {
    fen: "rnbqkbnr/1p1p1ppp/p3p3/8/3NP3/8/PPP2PPP/RNBQKB1R w KQkq - 0 5",
    eco: "B41",
    openingName: "Sicilian: Kan variation",
    moves: "1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 a6"
}, {
    fen: "rnbqkbnr/1p1p1ppp/p3p3/8/2PNP3/8/PP3PPP/RNBQKB1R b KQkq c3 0 5",
    eco: "B41",
    openingName: "Sicilian: Kan, Maroczy bind (Reti variation)",
    moves: "1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 a6 5. c4"
}, {
    fen: "r1bqk2r/1p1p1ppp/p1n1pn2/8/1bPNP3/2N5/PPB2PPP/R1BQK2R b KQkq - 6 8",
    eco: "B41",
    openingName: "Sicilian: Kan, Maroczy bind - Bronstein variation",
    moves: "1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 a6 5. c4 Nf6 6. Nc3 Bb4 7. Bd3 Nc6 8. Bc2"
}, {
    fen: "rnbqkbnr/1p1p1ppp/p3p3/8/3NP3/3B4/PPP2PPP/RNBQK2R b KQkq - 1 5",
    eco: "B42",
    openingName: "Sicilian: Kan, 5.Bd3",
    moves: "1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 a6 5. Bd3"
}, {
    fen: "rnbqkb1r/1p3p1p/p2ppnp1/8/2PNP3/3B4/PP3PPP/RNBQ1RK1 w kq - 0 8",
    eco: "B42",
    openingName: "Sicilian: Kan, Gipslis variation",
    moves: "1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 a6 5. Bd3 Nf6 6. O-O d6 7. c4 g6"
}, {
    fen: "rnbqk1nr/1p1p1ppp/p3p3/2b5/3NP3/3B4/PPP2PPP/RNBQK2R w KQkq - 2 6",
    eco: "B42",
    openingName: "Sicilian: Kan, Polugaievsky variation",
    moves: "1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 a6 5. Bd3 Bc5"
}, {
    fen: "rnbqkbnr/1p1p1p1p/p3p1p1/8/3NP3/3B4/PPP2PPP/RNBQK2R w KQkq - 0 6",
    eco: "B42",
    openingName: "Sicilian: Kan, Swiss cheese variation",
    moves: "1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 a6 5. Bd3 g6"
}, {
    fen: "rnbqkbnr/1p1p1ppp/p3p3/8/3NP3/2N5/PPP2PPP/R1BQKB1R b KQkq - 1 5",
    eco: "B43",
    openingName: "Sicilian: Kan, 5.Nc3",
    moves: "1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 a6 5. Nc3"
}, {
    fen: "r1bqkbnr/pp1p1ppp/2n1p3/8/3NP3/8/PPP2PPP/RNBQKB1R w KQkq - 1 5",
    eco: "B44",
    openingName: "Sicilian defence",
    moves: "1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 Nc6"
}, {
    fen: "r1bqkbnr/pp1p1ppp/2n1p3/1N6/4P3/8/PPP2PPP/RNBQKB1R b KQkq - 2 5",
    eco: "B44",
    openingName: "Sicilian, Szen (`anti-Taimanov') variation",
    moves: "1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 Nc6 5. Nb5"
}, {
    fen: "r1bq1rk1/4bppp/ppnppn2/8/2P1P3/N1N5/PP2BPPP/R1BQ1RK1 w - - 0 11",
    eco: "B44",
    openingName: "Sicilian, Szen, hedgehog variation",
    moves: "1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 Nc6 5. Nb5 d6 6. c4 Nf6 7. N1c3 a6 8. Na3 Be7 9. Be2 O-O 10. O-O b6"
}, {
    fen: "r1bqkb1r/1p3ppp/p1n1pn2/3p4/2P1P3/N1N5/PP3PPP/R1BQKB1R w KQkq - 0 9",
    eco: "B44",
    openingName: "Sicilian, Szen variation, Dely-Kasparov gambit",
    moves: "1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 Nc6 5. Nb5 d6 6. c4 Nf6 7. N1c3 a6 8. Na3 d5"
}, {
    fen: "r1bqkbnr/pp1p1ppp/2n1p3/8/3NP3/2N5/PPP2PPP/R1BQKB1R b KQkq - 2 5",
    eco: "B45",
    openingName: "Sicilian: Taimanov variation",
    moves: "1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 Nc6 5. Nc3"
}, {
    fen: "r1bqk2r/pp1p1ppp/2nNpn2/8/1b2P3/2N5/PPP2PPP/R1BQKB1R b KQkq - 6 7",
    eco: "B45",
    openingName: "Sicilian: Taimanov, American attack",
    moves: "1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 Nc6 5. Nc3 Nf6 6. Ndb5 Bb4 7. Nd6+"
}, {
    fen: "r1bqkbnr/1p1p1ppp/p1n1p3/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6",
    eco: "B46",
    openingName: "Sicilian: Taimanov variation",
    moves: "1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 Nc6 5. Nc3 a6"
}, {
    fen: "r1b1kbnr/ppqp1ppp/2n1p3/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 3 6",
    eco: "B47",
    openingName: "Sicilian: Taimanov (Bastrikov) variation",
    moves: "1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 Nc6 5. Nc3 Qc7"
}, {
    fen: "r1b1kbnr/ppqp1ppp/2n1p3/8/3NP3/2N1B3/PPP2PPP/R2QKB1R b KQkq - 4 6",
    eco: "B48",
    openingName: "Sicilian: Taimanov variation",
    moves: "1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 Nc6 5. Nc3 Qc7 6. Be3"
}, {
    fen: "r1b1kbnr/1pqp1ppp/p1n1p3/8/3NP3/2N1B3/PPP1BPPP/R2QK2R b KQkq - 1 7",
    eco: "B49",
    openingName: "Sicilian: Taimanov variation",
    moves: "1. e4 c5 2. Nf3 e6 3. d4 cxd4 4. Nxd4 Nc6 5. Nc3 Qc7 6. Be3 a6 7. Be2"
}, {
    fen: "rnbqkbnr/pp2pppp/3p4/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3",
    eco: "B50",
    openingName: "Sicilian",
    moves: "1. e4 c5 2. Nf3 d6"
}, {
    fen: "rnbqkbnr/pp2pppp/3p4/2p5/1P2P3/5N2/P1PP1PPP/RNBQKB1R b KQkq b3 0 3",
    eco: "B50",
    openingName: "Sicilian: wing gambit deferred",
    moves: "1. e4 c5 2. Nf3 d6 3. b4"
}, {
    fen: "rnbqkbnr/pp2pppp/3p4/1Bp5/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 1 3",
    eco: "B51",
    openingName: "Sicilian: Canal-Sokolsky (Nimzovich-Rossolimo, Moscow) attack",
    moves: "1. e4 c5 2. Nf3 d6 3. Bb5+"
}, {
    fen: "rn1qkbnr/pp1bpppp/3p4/1Bp5/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 2 4",
    eco: "B52",
    openingName: "Sicilian: Canal-Sokolsky attack, 3...Bd7",
    moves: "1. e4 c5 2. Nf3 d6 3. Bb5+ Bd7"
}, {
    fen: "r3kb1r/pp1qpppp/2np1n2/2p5/3PP3/2P2N2/PP3PPP/RNBQ1RK1 b kq d3 0 7",
    eco: "B52",
    openingName: "Sicilian: Canal-Sokolsky attack, Bronstein gambit",
    moves: "1. e4 c5 2. Nf3 d6 3. Bb5+ Bd7 4. Bxd7+ Qxd7 5. O-O Nc6 6. c3 Nf6 7. d4"
}, {
    fen: "rn2kbnr/pp1qpppp/3p4/2p5/2P1P3/5N2/PP1P1PPP/RNBQK2R b KQkq c3 0 5",
    eco: "B52",
    openingName: "Sicilian: Canal-Sokolsky attack, Sokolsky variation",
    moves: "1. e4 c5 2. Nf3 d6 3. Bb5+ Bd7 4. Bxd7+ Qxd7 5. c4"
}, {
    fen: "rnbqkbnr/pp2pppp/3p4/8/3QP3/5N2/PPP2PPP/RNB1KB1R b KQkq - 0 4",
    eco: "B53",
    openingName: "Sicilian, Chekhover variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Qxd4"
}, {
    fen: "r1b1kbnr/pp1qpppp/2np4/1B6/3QP3/5N2/PPP2PPP/RNB1K2R w KQkq - 3 6",
    eco: "B53",
    openingName: "Sicilian: Chekhover, Zaitsev variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Qxd4 Nc6 5. Bb5 Qd7"
}, {
    fen: "rnbqkbnr/pp2pppp/3p4/8/3NP3/8/PPP2PPP/RNBQKB1R b KQkq - 0 4",
    eco: "B54",
    openingName: "Sicilian",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4"
}, {
    fen: "rnbqkb1r/pp2pppp/3p1n2/8/3NP3/5P2/PPP3PP/RNBQKB1R b KQkq - 0 5",
    eco: "B54",
    openingName: "Sicilian: Prins (Moscow) variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. f3"
}, {
    fen: "rnbqkb1r/pp3ppp/3p1n2/1B2p3/3NP3/5P2/PPP3PP/RNBQK2R b KQkq - 1 6",
    eco: "B55",
    openingName: "Sicilian: Prins variation, Venice attack",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. f3 e5 6. Bb5+"
}, {
    fen: "rnbqkb1r/pp2pppp/3p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R b KQkq - 2 5",
    eco: "B56",
    openingName: "Sicilian",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3"
}, {
    fen: "rnbqkb1r/pp3ppp/3p1n2/1B2p3/3NP3/2N5/PPP2PPP/R1BQK2R b KQkq - 1 6",
    eco: "B56",
    openingName: "Sicilian: Venice attack",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e5 6. Bb5+"
}, {
    fen: "r1bqkb1r/pp2pppp/2np1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 3 6",
    eco: "B56",
    openingName: "Sicilian",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 Nc6"
}, {
    fen: "r1bqkb1r/pp2pppp/2np1n2/8/2BNP3/2N5/PPP2PPP/R1BQK2R b KQkq - 4 6",
    eco: "B57",
    openingName: "Sicilian: Sozin, not Scheveningen",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 Nc6 6. Bc4"
}, {
    fen: "r1bqkb1r/p3pp1p/2pp1np1/4P3/2B5/2N5/PPP2PPP/R1BQK2R b KQkq - 0 8",
    eco: "B57",
    openingName: "Sicilian: Magnus Smith trap",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 Nc6 6. Bc4 g6 7. Nxc6 bxc6 8. e5"
}, {
    fen: "r1b1kb1r/pp2pppp/1qnp1n2/8/2BNP3/2N5/PPP2PPP/R1BQK2R w KQkq - 5 7",
    eco: "B57",
    openingName: "Sicilian: Sozin, Benko variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 Nc6 6. Bc4 Qb6"
}, {
    fen: "r1bqkb1r/pp2pppp/2np1n2/8/3NP3/2N5/PPP1BPPP/R1BQK2R b KQkq - 1 6",
    eco: "B58",
    openingName: "Sicilian: classical",
    moves: "1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 d6 6. Be2"
}, {
    fen: "r1bqkb1r/pp3ppp/2np1n2/4p3/3NP3/2N5/PPP1BPPP/R1BQK2R w KQkq e6 0 7",
    eco: "B58",
    openingName: "Sicilian: Boleslavsky variation",
    moves: "1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 d6 6. Be2 e5"
}, {
    fen: "r1bqkb1r/pp3ppp/2Np1n2/4p3/4P3/2N5/PPP1BPPP/R1BQK2R b KQkq - 0 7",
    eco: "B58",
    openingName: "Sicilian: Boleslavsky, Louma variation",
    moves: "1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 d6 6. Be2 e5 7. Nxc6"
}, {
    fen: "r1bqkb1r/pp3ppp/2np1n2/4p3/4P3/1NN5/PPP1BPPP/R1BQK2R b KQkq - 1 7",
    eco: "B59",
    openingName: "Sicilian: Boleslavsky variation, 7.Nb3",
    moves: "1. e4 c5 2. Nf3 Nc6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 d6 6. Be2 e5 7. Nb3"
}, {
    fen: "r1bqkb1r/pp2pppp/2np1n2/6B1/3NP3/2N5/PPP2PPP/R2QKB1R b KQkq - 4 6",
    eco: "B60",
    openingName: "Sicilian: Richter-Rauzer",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 Nc6 6. Bg5"
}, {
    fen: "r1bqkb1r/pp2pp1p/2np1np1/6B1/3NP3/2N5/PPP2PPP/R2QKB1R w KQkq - 0 7",
    eco: "B60",
    openingName: "Sicilian: Richter-Rauzer, Bondarevsky variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 Nc6 6. Bg5 g6"
}, {
    fen: "r2qkb1r/pp1bpppp/2np1n2/6B1/3NP3/2N5/PPP2PPP/R2QKB1R w KQkq - 5 7",
    eco: "B60",
    openingName: "Sicilian: Richter-Rauzer, Larsen variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 Nc6 6. Bg5 Bd7"
}, {
    fen: "r2qkb1r/pp1bpppp/2np1n2/6B1/3NP3/2N5/PPPQ1PPP/R3KB1R b KQkq - 6 7",
    eco: "B61",
    openingName: "Sicilian: Richter-Rauzer, Larsen variation, 7.Qd2",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 Nc6 6. Bg5 Bd7 7. Qd2"
}, {
    fen: "r1bqkb1r/pp3ppp/2nppn2/6B1/3NP3/2N5/PPP2PPP/R2QKB1R w KQkq - 0 7",
    eco: "B62",
    openingName: "Sicilian: Richter-Rauzer, 6...e6",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 Nc6 6. Bg5 e6"
}, {
    fen: "r1bqkb1r/pp3ppp/2nppn2/6B1/4P3/1NN5/PPP2PPP/R2QKB1R b KQkq - 1 7",
    eco: "B62",
    openingName: "Sicilian: Richter-Rauzer, Podvebrady variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 Nc6 6. Bg5 e6 7. Nb3"
}, {
    fen: "r1bqkb1r/pp3ppp/2nppn2/1B4B1/3NP3/2N5/PPP2PPP/R2QK2R b KQkq - 1 7",
    eco: "B62",
    openingName: "Sicilian: Richter-Rauzer, Margate (Alekhine) variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 Nc6 6. Bg5 e6 7. Bb5"
}, {
    fen: "r1bqkb1r/pp3ppp/2Nppn2/6B1/4P3/2N5/PPP2PPP/R2QKB1R b KQkq - 0 7",
    eco: "B62",
    openingName: "Sicilian: Richter-Rauzer, Richter attack",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 Nc6 6. Bg5 e6 7. Nxc6"
}, {
    fen: "r1bqkb1r/pp3ppp/2nppn2/6B1/3NP3/2NQ4/PPP2PPP/R3KB1R b KQkq - 1 7",
    eco: "B62",
    openingName: "Sicilian: Richter-Rauzer, Keres variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 Nc6 6. Bg5 e6 7. Qd3"
}, {
    fen: "r1bqkb1r/pp3ppp/2nppn2/6B1/3NP3/2N5/PPPQ1PPP/R3KB1R b KQkq - 1 7",
    eco: "B63",
    openingName: "Sicilian: Richter-Rauzer, Rauzer attack",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 Nc6 6. Bg5 e6 7. Qd2"
}, {
    fen: "r1bqk2r/pp2bppp/2nppn2/6B1/3NP3/2N5/PPPQ1PPP/R3KB1R w KQkq - 2 8",
    eco: "B63",
    openingName: "Sicilian: Richter-Rauzer, Rauzer attack, 7...Be7",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 Nc6 6. Bg5 e6 7. Qd2 Be7"
}, {
    fen: "r1bq1rk1/pp2bppp/2nppn2/6B1/3NPP2/2N5/PPPQ2PP/2KR1B1R b - f3 0 9",
    eco: "B64",
    openingName: "Sicilian: Richter-Rauzer, Rauzer attack, 7...Be7 defence, 9.f4",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 Nc6 6. Bg5 e6 7. Qd2 Be7 8. O-O-O O-O 9. f4"
}, {
    fen: "r1bq1rk1/pp2bppp/2np1n2/4p1B1/3NPP2/2N5/PPPQ2PP/2KR1B1R w - - 0 10",
    eco: "B64",
    openingName: "Sicilian: Richter-Rauzer, Rauzer attack, Geller variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 Nc6 6. Bg5 e6 7. Qd2 Be7 8. O-O-O O-O 9. f4 e5"
}, {
    fen: "r1bq1rk1/pp2bppp/3ppn2/6B1/3nPP2/2N5/PPPQ2PP/2KR1B1R w - - 0 10",
    eco: "B65",
    openingName: "Sicilian: Richter-Rauzer, Rauzer attack, 7...Be7 defence, 9...Nxd4",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 Nc6 6. Bg5 e6 7. Qd2 Be7 8. O-O-O O-O 9. f4 Nxd4"
}, {
    fen: "r1bq1rk1/pp2bppp/3ppn2/6B1/3QPP2/2N5/PPP3PP/2KR1B1R b - - 0 10",
    eco: "B65",
    openingName: "Sicilian: Richter-Rauzer, Rauzer attack, 7...Be7 defence, 9...Nxd4",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 Nc6 6. Bg5 e6 7. Qd2 Be7 8. O-O-O O-O 9. f4 Nxd4 10. Qxd4"
}, {
    fen: "r1bqkb1r/1p3ppp/p1nppn2/6B1/3NP3/2N5/PPPQ1PPP/R3KB1R w KQkq - 0 8",
    eco: "B66",
    openingName: "Sicilian: Richter-Rauzer, Rauzer attack, 7...a6",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 Nc6 6. Bg5 e6 7. Qd2 a6"
}, {
    fen: "r2qkb1r/1p1b1ppp/p1nppn2/6B1/3NP3/2N5/PPPQ1PPP/2KR1B1R w kq - 2 9",
    eco: "B67",
    openingName: "Sicilian: Richter-Rauzer, Rauzer attack, 7...a6 defence, 8...Bd7",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 Nc6 6. Bg5 e6 7. Qd2 a6 8. O-O-O Bd7"
}, {
    fen: "r2qk2r/1p1bbppp/p1nppn2/6B1/3NPP2/2N5/PPPQ2PP/2KR1B1R w kq - 1 10",
    eco: "B68",
    openingName: "Sicilian: Richter-Rauzer, Rauzer attack, 7...a6 defence, 9...Be7",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 Nc6 6. Bg5 e6 7. Qd2 a6 8. O-O-O Bd7 9. f4 Be7"
}, {
    fen: "r2qk2r/3bbppp/p1nppB2/1p6/4PP2/2N2N2/PPPQ2PP/2KR1B1R b kq - 0 11",
    eco: "B69",
    openingName: "Sicilian: Richter-Rauzer, Rauzer attack, 7...a6 defence, 11.Bxf6",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 Nc6 6. Bg5 e6 7. Qd2 a6 8. O-O-O Bd7 9. f4 Be7 10. Nf3 b5 11. Bxf6"
}, {
    fen: "rnbqkb1r/pp2pp1p/3p1np1/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6",
    eco: "B70",
    openingName: "Sicilian: dragon variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6"
}, {
    fen: "rnbqkb1r/pp2pp1p/3p1np1/8/3NPP2/2N5/PPP3PP/R1BQKB1R b KQkq f3 0 6",
    eco: "B71",
    openingName: "Sicilian: dragon, Levenfish variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. f4"
}, {
    fen: "r1bqkb1r/pp1npp1p/3p1np1/8/3NPP2/2N5/PPP3PP/R1BQKB1R w KQkq - 1 7",
    eco: "B71",
    openingName: "Sicilian: dragon, Levenfish; Flohr variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. f4 Nbd7"
}, {
    fen: "rnbqkb1r/pp2pp1p/3p1np1/8/3NP3/2N1B3/PPP2PPP/R2QKB1R b KQkq - 1 6",
    eco: "B72",
    openingName: "Sicilian: dragon, 6.Be3",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be3"
}, {
    fen: "rnbqk2r/pp2ppbp/3p1np1/8/3NP3/2N1B3/PPP1BPPP/R2QK2R b KQkq - 3 7",
    eco: "B72",
    openingName: "Sicilian: dragon, classical attack",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be3 Bg7 7. Be2"
}, {
    fen: "r1bqk2r/pp2ppbp/2np1np1/8/3NP3/2N1B3/PPPQBPPP/R3K2R b KQkq - 5 8",
    eco: "B72",
    openingName: "Sicilian: dragon, classical, Amsterdam variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be3 Bg7 7. Be2 Nc6 8. Qd2"
}, {
    fen: "r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1B3/PPPQBPPP/2KR3R b - - 7 9",
    eco: "B72",
    openingName: "Sicilian: dragon, classical, Grigoriev variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be3 Bg7 7. Be2 Nc6 8. Qd2 O-O 9. O-O-O"
}, {
    fen: "r1bqk2r/pp2ppbp/2np1np1/8/4P3/1NN1B3/PPP1BPPP/R2QK2R b KQkq - 5 8",
    eco: "B72",
    openingName: "Sicilian: dragon, classical, Nottingham variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be3 Bg7 7. Be2 Nc6 8. Nb3"
}, {
    fen: "r1bqk2r/pp2ppbp/2np1np1/8/3NP3/2N1B3/PPP1BPPP/R2Q1RK1 b kq - 5 8",
    eco: "B73",
    openingName: "Sicilian: dragon, classical, 8.O-O",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be3 Bg7 7. Be2 Nc6 8. O-O"
}, {
    fen: "r1b2rk1/pp2ppbp/1qnp1np1/4P3/3N1P2/2N1B3/PPP1B1PP/R2Q1RK1 b - - 0 10",
    eco: "B73",
    openingName: "Sicilian: dragon, classical, Zollner gambit",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be3 Bg7 7. Be2 Nc6 8. O-O O-O 9. f4 Qb6 10. e5"
}, {
    fen: "r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1B3/PPPQBPPP/R4RK1 b - - 7 9",
    eco: "B73",
    openingName: "Sicilian: dragon, classical, Richter variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be3 Bg7 7. Be2 Nc6 8. O-O O-O 9. Qd2"
}, {
    fen: "r1bq1rk1/pp2ppbp/2np1np1/8/4P3/1NN1B3/PPP1BPPP/R2Q1RK1 b - - 7 9",
    eco: "B74",
    openingName: "Sicilian: dragon, classical, 9.Nb3",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be3 Bg7 7. Be2 Nc6 8. O-O O-O 9. Nb3"
}, {
    fen: "r4rk1/pp2ppbp/3p1np1/q4P2/4P1P1/2N1B3/PPP1Q2P/R4RK1 b - g3 0 14",
    eco: "B74",
    openingName: "Sicilian: dragon, classical, Stockholm attack",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be3 Bg7 7. Be2 Nc6 8. O-O O-O 9. Nb3 Be6 10. f4 Na5 11. f5 Bc4 12. Nxa5 Bxe2 13. Qxe2 Qxa5 14. g4"
}, {
    fen: "r2q1rk1/pp2ppbp/3p1np1/n4P2/2b1P3/1NNBB3/PPP3PP/R2Q1RK1 b - - 2 12",
    eco: "B74",
    openingName: "Sicilian: dragon, classical, Spielmann variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be3 Bg7 7. Be2 Nc6 8. O-O O-O 9. Nb3 Be6 10. f4 Na5 11. f5 Bc4 12. Bd3"
}, {
    fen: "r2q1rk1/pp2ppbp/5np1/n2p1P2/4P3/1NNPB3/PP4PP/R2Q1RK1 w - - 0 14",
    eco: "B74",
    openingName: "Sicilian: dragon, classical, Bernard defence",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be3 Bg7 7. Be2 Nc6 8. O-O O-O 9. Nb3 Be6 10. f4 Na5 11. f5 Bc4 12. Bd3 Bxd3 13. cxd3 d5"
}, {
    fen: "r1q2rk1/pp2ppbp/2npbnp1/8/4PP2/1NN1B3/PPP1B1PP/R2Q1RK1 w - - 1 11",
    eco: "B74",
    openingName: "Sicilian: dragon, classical, Reti-Tartakower variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be3 Bg7 7. Be2 Nc6 8. O-O O-O 9. Nb3 Be6 10. f4 Qc8"
}, {
    fen: "r1bq1rk1/1p2ppbp/2np1np1/p7/4P3/1NN1B3/PPP1BPPP/R2Q1RK1 w - a6 0 10",
    eco: "B74",
    openingName: "Sicilian: dragon, classical, Alekhine variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be3 Bg7 7. Be2 Nc6 8. O-O O-O 9. Nb3 a5"
}, {
    fen: "rnbqk2r/pp2ppbp/3p1np1/8/3NP3/2N1BP2/PPP3PP/R2QKB1R b KQkq - 0 7",
    eco: "B75",
    openingName: "Sicilian: dragon, Yugoslav attack",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be3 Bg7 7. f3"
}, {
    fen: "rnbq1rk1/pp2ppbp/3p1np1/8/3NP3/2N1BP2/PPP3PP/R2QKB1R w KQ - 1 8",
    eco: "B76",
    openingName: "Sicilian: dragon, Yugoslav attack, 7...O-O",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be3 Bg7 7. f3 O-O"
}, {
    fen: "r1bq1rk1/pp2ppbp/2np1np1/8/3NP3/2N1BP2/PPPQ2PP/2KR1B1R b - - 4 9",
    eco: "B76",
    openingName: "Sicilian: dragon, Yugoslav attack, Rauser variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be3 Bg7 7. f3 O-O 8. Qd2 Nc6 9. O-O-O"
}, {
    fen: "r1bq1rk1/pp2ppbp/2np1np1/8/2BNP3/2N1BP2/PPPQ2PP/R3K2R b KQ - 4 9",
    eco: "B77",
    openingName: "Sicilian: dragon, Yugoslav attack, 9.Bc4",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be3 Bg7 7. f3 O-O 8. Qd2 Nc6 9. Bc4"
}, {
    fen: "r1bq1rk1/1p2ppbp/2np1np1/p7/2BNP3/2N1BP2/PPPQ2PP/R3K2R w KQ a6 0 10",
    eco: "B77",
    openingName: "Sicilian: dragon, Yugoslav attack, Byrne variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be3 Bg7 7. f3 O-O 8. Qd2 Nc6 9. Bc4 a5"
}, {
    fen: "r2q1rk1/pp1bppbp/2np1np1/8/2BNP3/2N1BP2/PPPQ2PP/R3K2R w KQ - 5 10",
    eco: "B77",
    openingName: "Sicilian: dragon, Yugoslav attack, 9...Bd7",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be3 Bg7 7. f3 O-O 8. Qd2 Nc6 9. Bc4 Bd7"
}, {
    fen: "r2q1rk1/pp1bppbp/2np1np1/8/2BNP3/2N1BP2/PPPQ2PP/2KR3R b - - 6 10",
    eco: "B78",
    openingName: "Sicilian: dragon, Yugoslav attack, 10.O-O-O",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be3 Bg7 7. f3 O-O 8. Qd2 Nc6 9. Bc4 Bd7 10. O-O-O"
}, {
    fen: "r1r3k1/pp1bppbp/2np1np1/q7/3NP2P/1BN1BP2/PPPQ2P1/2KR3R b - h3 0 12",
    eco: "B79",
    openingName: "Sicilian: dragon, Yugoslav attack, 12.h4",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 g6 6. Be3 Bg7 7. f3 O-O 8. Qd2 Nc6 9. Bc4 Bd7 10. O-O-O Qa5 11. Bb3 Rfc8 12. h4"
}, {
    fen: "rnbqkb1r/pp3ppp/3ppn2/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6",
    eco: "B80",
    openingName: "Sicilian: Scheveningen variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e6"
}, {
    fen: "rnbqkb1r/1p3ppp/p2ppn2/8/3NP3/2N1B3/PPPQ1PPP/R3KB1R b KQkq - 1 7",
    eco: "B80",
    openingName: "Sicilian: Scheveningen, English variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e6 6. Be3 a6 7. Qd2"
}, {
    fen: "rnbqkb1r/pp3ppp/3ppn2/1B6/3NP3/2N5/PPP2PPP/R1BQK2R b KQkq - 1 6",
    eco: "B80",
    openingName: "Sicilian: Scheveningen, Vitolins variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e6 6. Bb5+"
}, {
    fen: "rnbqkb1r/pp3ppp/3ppn2/8/3NP3/2N3P1/PPP2P1P/R1BQKB1R b KQkq - 0 6",
    eco: "B80",
    openingName: "Sicilian: Scheveningen, fianchetto variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e6 6. g3"
}, {
    fen: "rnbqkb1r/pp3ppp/3ppn2/8/3NP1P1/2N5/PPP2P1P/R1BQKB1R b KQkq g3 0 6",
    eco: "B81",
    openingName: "Sicilian: Scheveningen, Keres attack",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e6 6. g4"
}, {
    fen: "rnbqkb1r/pp3ppp/3ppn2/8/3NPP2/2N5/PPP3PP/R1BQKB1R b KQkq f3 0 6",
    eco: "B82",
    openingName: "Sicilian: Scheveningen, 6.f4",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e6 6. f4"
}, {
    fen: "r1bqk2r/pp2bppp/2nppn2/8/3NPP2/2N1BQ2/PPP3PP/R3KB1R b KQkq - 4 8",
    eco: "B82",
    openingName: "Sicilian: Scheveningen, Tal variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e6 6. f4 Nc6 7. Be3 Be7 8. Qf3"
}, {
    fen: "rnbqkb1r/pp3ppp/3ppn2/8/3NP3/2N5/PPP1BPPP/R1BQK2R b KQkq - 1 6",
    eco: "B83",
    openingName: "Sicilian: Scheveningen, 6.Be2",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e6 6. Be2"
}, {
    fen: "r1bqkb1r/pp3ppp/2nppn2/8/3NP3/2N5/PPP1BPPP/R1BQK2R w KQkq - 2 7",
    eco: "B83",
    openingName: "Sicilian: modern Scheveningen",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e6 6. Be2 Nc6"
}, {
    fen: "r1bq1rk1/pp2bppp/2nppn2/8/3NPP2/2N1B3/PPP1B1PP/R2Q1RK1 b - f3 0 9",
    eco: "B83",
    openingName: "Sicilian: modern Scheveningen, main line",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e6 6. Be2 Nc6 7. O-O Be7 8. Be3 O-O 9. f4"
}, {
    fen: "r2q1rk1/pp1bbppp/2nppn2/8/4PP2/1NN1B3/PPP1B1PP/R2Q1RK1 b - - 2 10",
    eco: "B83",
    openingName: "Sicilian: modern Scheveningen, main line with Nb3",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e6 6. Be2 Nc6 7. O-O Be7 8. Be3 O-O 9. f4 Bd7 10. Nb3"
}, {
    fen: "rnbqkb1r/1p3ppp/p2ppn2/8/3NP3/2N5/PPP1BPPP/R1BQK2R w KQkq - 0 7",
    eco: "B84",
    openingName: "Sicilian: Scheveningen (Paulsen), classical variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e6 6. Be2 a6"
}, {
    fen: "r1bqkb1r/1p1n1ppp/p2ppn2/8/3NP3/2N5/PPP1BPPP/R1BQ1RK1 w kq - 2 8",
    eco: "B84",
    openingName: "Sicilian: Scheveningen, classical, Nd7 system",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e6 6. Be2 a6 7. O-O Nbd7"
}, {
    fen: "rnb1kb1r/1pq2ppp/p2ppn2/8/3NP3/2N5/PPP1BPPP/R1BQ1RK1 w kq - 2 8",
    eco: "B84",
    openingName: "Sicilian: Scheveningen (Paulsen), classical variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e6 6. Be2 a6 7. O-O Qc7"
}, {
    fen: "r1b1kb1r/1pq2ppp/p1nppn2/8/3NPP2/2N5/PPP1B1PP/R1BQ1RK1 w kq - 1 9",
    eco: "B85",
    openingName: "Sicilian: Scheveningen, classical variation with ...Qc7 and ...Nc6",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e6 6. Be2 a6 7. O-O Qc7 8. f4 Nc6"
}, {
    fen: "r1b1k2r/1pq1bppp/p1nppn2/8/P2NPP2/2N5/1PP1B1PP/R1BQ1R1K b kq a3 0 10",
    eco: "B85",
    openingName: "Sicilian: Scheveningen, classical, Maroczy system",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e6 6. Be2 a6 7. O-O Qc7 8. f4 Nc6 9. Kh1 Be7 10. a4"
}, {
    fen: "r1b1kb1r/1pq2ppp/p1nppn2/8/3NPP2/2N1B3/PPP1B1PP/R2Q1RK1 b kq - 2 9",
    eco: "B85",
    openingName: "Sicilian: Scheveningen, classical",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e6 6. Be2 a6 7. O-O Qc7 8. f4 Nc6 9. Be3"
}, {
    fen: "r1b2rk1/1pq1bppp/p1nppn2/8/3NPP2/2N1B3/PPP1B1PP/R3QRK1 w - - 5 11",
    eco: "B85",
    openingName: "Sicilian: Scheveningen, classical main line",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e6 6. Be2 a6 7. O-O Qc7 8. f4 Nc6 9. Be3 Be7 10. Qe1 O-O"
}, {
    fen: "rnbqkb1r/pp3ppp/3ppn2/8/2BNP3/2N5/PPP2PPP/R1BQK2R b KQkq - 1 6",
    eco: "B86",
    openingName: "Sicilian: Sozin attack",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e6 6. Bc4"
}, {
    fen: "rnbqkb1r/5ppp/p2ppn2/1p6/3NP3/1BN5/PPP2PPP/R1BQK2R w KQkq b6 0 8",
    eco: "B87",
    openingName: "Sicilian: Sozin with ...a6 and ...b5",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e6 6. Bc4 a6 7. Bb3 b5"
}, {
    fen: "r1bqkb1r/pp3ppp/2nppn2/8/2BNP3/2N5/PPP2PPP/R1BQK2R w KQkq - 2 7",
    eco: "B88",
    openingName: "Sicilian: Sozin, Leonhardt variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e6 6. Bc4 Nc6"
}, {
    fen: "r1bq1rk1/pp2bppp/2nppn2/8/3NPP2/1BN1B3/PPP3PP/R2QK2R b KQ f3 0 9",
    eco: "B88",
    openingName: "Sicilian: Sozin, Fischer variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e6 6. Bc4 Nc6 7. Bb3 Be7 8. Be3 O-O 9. f4"
}, {
    fen: "r1bqkb1r/pp3ppp/2nppn2/8/2BNP3/2N1B3/PPP2PPP/R2QK2R b KQkq - 3 7",
    eco: "B89",
    openingName: "Sicilian: Sozin, 7.Be3",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e6 6. Bc4 Nc6 7. Be3"
}, {
    fen: "r1bqk2r/pp2bppp/2nppn2/8/2BNP3/2N1B3/PPP1QPPP/R3K2R b KQkq - 5 8",
    eco: "B89",
    openingName: "Sicilian: Velimirovic attack",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 e6 6. Bc4 Nc6 7. Be3 Be7 8. Qe2"
}, {
    fen: "rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N5/PPP2PPP/R1BQKB1R w KQkq - 0 6",
    eco: "B90",
    openingName: "Sicilian: Najdorf",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6"
}, {
    fen: "rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N4P/PPP2PP1/R1BQKB1R b KQkq - 0 6",
    eco: "B90",
    openingName: "Sicilian: Najdorf, Adams attack",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. h3"
}, {
    fen: "rnbqkb1r/1p2pppp/p2p1n2/8/2BNP3/2N5/PPP2PPP/R1BQK2R b KQkq - 1 6",
    eco: "B90",
    openingName: "Sicilian: Najdorf, Lipnitzky attack",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Bc4"
}, {
    fen: "rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N1B3/PPP2PPP/R2QKB1R b KQkq - 1 6",
    eco: "B90",
    openingName: "Sicilian: Najdorf, Byrne (English) attack",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Be3"
}, {
    fen: "rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N3P1/PPP2P1P/R1BQKB1R b KQkq - 0 6",
    eco: "B91",
    openingName: "Sicilian: Najdorf, Zagreb (fianchetto) variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. g3"
}, {
    fen: "rnbqkb1r/1p2pppp/p2p1n2/8/3NP3/2N5/PPP1BPPP/R1BQK2R b KQkq - 1 6",
    eco: "B92",
    openingName: "Sicilian: Najdorf, Opovcensky variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Be2"
}, {
    fen: "rnbqkb1r/1p2pppp/p2p1n2/8/3NPP2/2N5/PPP3PP/R1BQKB1R b KQkq f3 0 6",
    eco: "B93",
    openingName: "Sicilian: Najdorf, 6.f4",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. f4"
}, {
    fen: "rnbqkb1r/1p2pppp/p2p1n2/6B1/3NP3/2N5/PPP2PPP/R2QKB1R b KQkq - 1 6",
    eco: "B94",
    openingName: "Sicilian: Najdorf, 6.Bg5",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Bg5"
}, {
    fen: "r3kb1r/1b3ppp/p2ppn2/qpn1P1B1/3N4/1BN5/PPPQ1PPP/2KRR3 b kq - 0 12",
    eco: "B94",
    openingName: "Sicilian: Najdorf, Ivkov variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Bg5 Nbd7 7. Bc4 Qa5 8. Qd2 e6 9. O-O-O b5 10. Bb3 Bb7 11. Rhe1 Nc5 12. e5"
}, {
    fen: "rnbqkb1r/1p3ppp/p2ppn2/6B1/3NP3/2N5/PPP2PPP/R2QKB1R w KQkq - 0 7",
    eco: "B95",
    openingName: "Sicilian: Najdorf, 6...e6",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Bg5 e6"
}, {
    fen: "rnbqkb1r/1p3ppp/p2ppn2/6B1/3NPP2/2N5/PPP3PP/R2QKB1R b KQkq f3 0 7",
    eco: "B96",
    openingName: "Sicilian: Najdorf, 7.f4",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Bg5 e6 7. f4"
}, {
    fen: "rnbqkb1r/5ppp/p2ppn2/1p4B1/3NPP2/2N5/PPP3PP/R2QKB1R w KQkq b6 0 8",
    eco: "B96",
    openingName: "Sicilian: Najdorf, Polugayevsky variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Bg5 e6 7. f4 b5"
}, {
    fen: "rnb1kb1r/2q2ppp/p3pn2/1p2P1B1/3N4/2N5/PPP1Q1PP/R3KB1R b KQkq - 2 10",
    eco: "B96",
    openingName: "Sicilian: Najdorf, Polugayevsky, Simagin variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Bg5 e6 7. f4 b5 8. e5 dxe5 9. fxe5 Qc7 10. Qe2"
}, {
    fen: "rnb1kb1r/1p3ppp/pq1ppn2/6B1/3NPP2/2N5/PPP3PP/R2QKB1R w KQkq - 1 8",
    eco: "B97",
    openingName: "Sicilian: Najdorf, 7...Qb6",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Bg5 e6 7. f4 Qb6"
}, {
    fen: "rnb1kb1r/1p3ppp/p2ppn2/6B1/3NPP2/q1N5/P1PQ2PP/1R2KB1R w Kkq - 2 10",
    eco: "B97",
    openingName: "Sicilian: Najdorf, Poisoned pawn variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Bg5 e6 7. f4 Qb6 8. Qd2 Qxb2 9. Rb1 Qa3"
}, {
    fen: "rnbqk2r/1p2bppp/p2ppn2/6B1/3NPP2/2N5/PPP3PP/R2QKB1R w KQkq - 1 8",
    eco: "B98",
    openingName: "Sicilian: Najdorf, 7...Be7",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Bg5 e6 7. f4 Be7"
}, {
    fen: "rnb1k2r/1pq1bpp1/p2ppn1p/8/3NPP1B/2N2Q2/PPP3PP/R3KB1R w KQkq - 2 10",
    eco: "B98",
    openingName: "Sicilian: Najdorf, Browne variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Bg5 e6 7. f4 Be7 8. Qf3 h6 9. Bh4 Qc7"
}, {
    fen: "rnbqk2r/1p2bp2/p2ppn1p/6p1/3NPP1B/2N2Q2/PPP3PP/R3KB1R w KQkq g6 0 10",
    eco: "B98",
    openingName: "Sicilian: Najdorf, Goteborg (Argentine) variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Bg5 e6 7. f4 Be7 8. Qf3 h6 9. Bh4 g5"
}, {
    fen: "rnb1k2r/1pq1bppp/p2ppn2/6B1/3NPP2/2N2Q2/PPP3PP/R3KB1R w KQkq - 3 9",
    eco: "B98",
    openingName: "Sicilian: Najdorf variation",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Bg5 e6 7. f4 Be7 8. Qf3 Qc7"
}, {
    fen: "r1b1k2r/1pqnbppp/p2ppn2/6B1/3NPP2/2N2Q2/PPP3PP/2KR1B1R w kq - 5 10",
    eco: "B99",
    openingName: "Sicilian: Najdorf, 7...Be7 main line",
    moves: "1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Nc3 a6 6. Bg5 e6 7. f4 Be7 8. Qf3 Qc7 9. O-O-O Nbd7"
}, {
    fen: "rnbqkbnr/pppp1ppp/4p3/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
    eco: "C00",
    openingName: "French defence",
    moves: "1. e4 e6"
}, {
    fen: "rnbqkbnr/pppp1ppp/4p3/8/2P1P3/8/PP1P1PPP/RNBQKBNR b KQkq c3 0 2",
    eco: "C00",
    openingName: "French defence, Steiner variation",
    moves: "1. e4 e6 2. c4"
}, {
    fen: "rnbqkbnr/pppp1ppp/4p3/8/4P3/1P6/P1PP1PPP/RNBQKBNR b KQkq - 0 2",
    eco: "C00",
    openingName: "French: Reti (Spielmann) variation",
    moves: "1. e4 e6 2. b3"
}, {
    fen: "rnbqkbnr/pppp1ppp/4p3/4P3/8/8/PPPP1PPP/RNBQKBNR b KQkq - 0 2",
    eco: "C00",
    openingName: "French: Steinitz attack",
    moves: "1. e4 e6 2. e5"
}, {
    fen: "rnbqkbnr/pppp1ppp/4p3/8/4PP2/8/PPPP2PP/RNBQKBNR b KQkq f3 0 2",
    eco: "C00",
    openingName: "French: Labourdonnais variation",
    moves: "1. e4 e6 2. f4"
}, {
    fen: "rnbqkbnr/pppp1ppp/4p3/8/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2",
    eco: "C00",
    openingName: "French defence",
    moves: "1. e4 e6 2. Nf3"
}, {
    fen: "rnbqkbnr/pp3ppp/4p3/2ppP3/1P6/5N2/P1PP1PPP/RNBQKB1R b KQkq b3 0 4",
    eco: "C00",
    openingName: "French: Wing gambit",
    moves: "1. e4 e6 2. Nf3 d5 3. e5 c5 4. b4"
}, {
    fen: "rnbqkbnr/pppp1ppp/4p3/8/4P3/2N5/PPPP1PPP/R1BQKBNR b KQkq - 1 2",
    eco: "C00",
    openingName: "French defence",
    moves: "1. e4 e6 2. Nc3"
}, {
    fen: "rnbqkbnr/ppp2ppp/4p3/3p4/4PP2/2N5/PPPP2PP/R1BQKBNR b KQkq f3 0 3",
    eco: "C00",
    openingName: "French: Pelikan variation",
    moves: "1. e4 e6 2. Nc3 d5 3. f4"
}, {
    fen: "rnbqkbnr/ppp2ppp/4p3/3p4/4P3/2N2N2/PPPP1PPP/R1BQKB1R b KQkq - 1 3",
    eco: "C00",
    openingName: "French: Two knights variation",
    moves: "1. e4 e6 2. Nc3 d5 3. Nf3"
}, {
    fen: "rnbqkbnr/pppp1ppp/4p3/8/4P3/8/PPPPQPPP/RNB1KBNR b KQkq - 1 2",
    eco: "C00",
    openingName: "French: Chigorin variation",
    moves: "1. e4 e6 2. Qe2"
}, {
    fen: "rnbqkbnr/pppp1ppp/4p3/8/4P3/3P4/PPP2PPP/RNBQKBNR b KQkq - 0 2",
    eco: "C00",
    openingName: "French: King's Indian attack",
    moves: "1. e4 e6 2. d3"
}, {
    fen: "r1bqkb1r/ppp2ppp/2n1pn2/3p4/4P3/3P1N2/PPPNBPPP/R1BQK2R b KQkq - 5 5",
    eco: "C00",
    openingName: "French: Reversed Philidor formation",
    moves: "1. e4 e6 2. d3 d5 3. Nd2 Nf6 4. Ngf3 Nc6 5. Be2"
}, {
    fen: "rnbqkbnr/pppp1ppp/4p3/8/3PP3/8/PPP2PPP/RNBQKBNR b KQkq d3 0 2",
    eco: "C00",
    openingName: "French defence",
    moves: "1. e4 e6 2. d4"
}, {
    fen: "rnbqkbnr/ppp2ppp/3pp3/8/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3",
    eco: "C00",
    openingName: "Lengfellner system",
    moves: "1. e4 e6 2. d4 d6"
}, {
    fen: "rnbqkbnr/1ppp1ppp/p3p3/8/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3",
    eco: "C00",
    openingName: "St. George defence",
    moves: "1. e4 e6 2. d4 a6"
}, {
    fen: "rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq d6 0 3",
    eco: "C00",
    openingName: "French defence",
    moves: "1. e4 e6 2. d4 d5"
}, {
    fen: "rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/3B4/PPP2PPP/RNBQK1NR b KQkq - 1 3",
    eco: "C00",
    openingName: "French: Schlechter variation",
    moves: "1. e4 e6 2. d4 d5 3. Bd3"
}, {
    fen: "rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/4B3/PPP2PPP/RN1QKBNR b KQkq - 1 3",
    eco: "C00",
    openingName: "French: Alapin variation",
    moves: "1. e4 e6 2. d4 d5 3. Be3"
}, {
    fen: "rnbqkbnr/ppp2ppp/4p3/3P4/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3",
    eco: "C01",
    openingName: "French: exchange variation",
    moves: "1. e4 e6 2. d4 d5 3. exd5"
}, {
    fen: "rnbqkb1r/ppp2ppp/5n2/3p2B1/3P4/2N5/PPP2PPP/R2QKBNR b KQkq - 3 5",
    eco: "C01",
    openingName: "French: exchange, Svenonius variation",
    moves: "1. e4 e6 2. d4 d5 3. exd5 exd5 4. Nc3 Nf6 5. Bg5"
}, {
    fen: "r1bqkb1r/ppp2ppp/2n2n2/3p2B1/3P4/2N5/PPP2PPP/R2QKBNR w KQkq - 4 6",
    eco: "C01",
    openingName: "French: exchange, Bogolyubov variation",
    moves: "1. e4 e6 2. d4 d5 3. exd5 exd5 4. Nc3 Nf6 5. Bg5 Nc6"
}, {
    fen: "rnbqkbnr/ppp2ppp/4p3/3pP3/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3",
    eco: "C02",
    openingName: "French: advance variation",
    moves: "1. e4 e6 2. d4 d5 3. e5"
}, {
    fen: "rnbqkbnr/pp3ppp/4p3/2PpP3/8/8/PPP2PPP/RNBQKBNR b KQkq - 0 4",
    eco: "C02",
    openingName: "French: advance, Steinitz variation",
    moves: "1. e4 e6 2. d4 d5 3. e5 c5 4. dxc5"
}, {
    fen: "rnbqkbnr/pp3ppp/4p3/2ppP3/3P2Q1/8/PPP2PPP/RNB1KBNR b KQkq - 1 4",
    eco: "C02",
    openingName: "French: advance, Nimzovich variation",
    moves: "1. e4 e6 2. d4 d5 3. e5 c5 4. Qg4"
}, {
    fen: "rnbqkbnr/pp3ppp/4p3/2ppP3/3P4/5N2/PPP2PPP/RNBQKB1R b KQkq - 1 4",
    eco: "C02",
    openingName: "French: advance, Nimzovich system",
    moves: "1. e4 e6 2. d4 d5 3. e5 c5 4. Nf3"
}, {
    fen: "rnbqkbnr/pp3ppp/4p3/2ppP3/3P4/2P5/PP3PPP/RNBQKBNR b KQkq - 0 4",
    eco: "C02",
    openingName: "French: advance variation",
    moves: "1. e4 e6 2. d4 d5 3. e5 c5 4. c3"
}, {
    fen: "rn2kbnr/pp1b1ppp/1q2p3/2ppP3/3P4/2P2N2/PP3PPP/RNBQKB1R w KQkq - 3 6",
    eco: "C02",
    openingName: "French: advance, Wade variation",
    moves: "1. e4 e6 2. d4 d5 3. e5 c5 4. c3 Qb6 5. Nf3 Bd7"
}, {
    fen: "r1bqkbnr/pp3ppp/2n1p3/2ppP3/3P4/2P5/PP3PPP/RNBQKBNR w KQkq - 1 5",
    eco: "C02",
    openingName: "French: advance variation",
    moves: "1. e4 e6 2. d4 d5 3. e5 c5 4. c3 Nc6"
}, {
    fen: "r1bqkbnr/pp3ppp/2n1p3/2ppP3/3P4/2P2N2/PP3PPP/RNBQKB1R b KQkq - 2 5",
    eco: "C02",
    openingName: "French: advance, Paulsen attack",
    moves: "1. e4 e6 2. d4 d5 3. e5 c5 4. c3 Nc6 5. Nf3"
}, {
    fen: "r1b1kbnr/pp3ppp/1qn1p3/2ppP3/3P4/2PB1N2/PP3PPP/RNBQK2R b KQkq - 4 6",
    eco: "C02",
    openingName: "French: advance, Milner-Barry gambit",
    moves: "1. e4 e6 2. d4 d5 3. e5 c5 4. c3 Nc6 5. Nf3 Qb6 6. Bd3"
}, {
    fen: "r2qkbnr/pp1b1ppp/2n1p3/2ppP3/3P4/2P2N2/PP3PPP/RNBQKB1R w KQkq - 3 6",
    eco: "C02",
    openingName: "French: advance, Euwe variation",
    moves: "1. e4 e6 2. d4 d5 3. e5 c5 4. c3 Nc6 5. Nf3 Bd7"
}, {
    fen: "rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/8/PPPN1PPP/R1BQKBNR b KQkq - 1 3",
    eco: "C03",
    openingName: "French: Tarrasch",
    moves: "1. e4 e6 2. d4 d5 3. Nd2"
}, {
    fen: "rnbqkbnr/ppp3pp/4p3/3p1p2/3PP3/8/PPPN1PPP/R1BQKBNR w KQkq f6 0 4",
    eco: "C03",
    openingName: "French: Tarrasch, Haberditz variation",
    moves: "1. e4 e6 2. d4 d5 3. Nd2 f5"
}, {
    fen: "r1bqkbnr/ppp2ppp/2n1p3/3p4/3PP3/8/PPPN1PPP/R1BQKBNR w KQkq - 2 4",
    eco: "C03",
    openingName: "French: Tarrasch, Guimard variation",
    moves: "1. e4 e6 2. d4 d5 3. Nd2 Nc6"
}, {
    fen: "r1bqkb1r/ppp2ppp/2n1pn2/3p4/3PP3/5N2/PPPN1PPP/R1BQKB1R w KQkq - 4 5",
    eco: "C04",
    openingName: "French: Tarrasch, Guimard main line",
    moves: "1. e4 e6 2. d4 d5 3. Nd2 Nc6 4. Ngf3 Nf6"
}, {
    fen: "rnbqkb1r/ppp2ppp/4pn2/3p4/3PP3/8/PPPN1PPP/R1BQKBNR w KQkq - 2 4",
    eco: "C05",
    openingName: "French: Tarrasch, closed variation",
    moves: "1. e4 e6 2. d4 d5 3. Nd2 Nf6"
}, {
    fen: "rnbqkb1r/p2n1ppp/1p2p3/2ppP3/3P4/2PB4/PP1N1PPP/R1BQK1NR w KQkq - 0 7",
    eco: "C05",
    openingName: "French: Tarrasch, Botvinnik variation",
    moves: "1. e4 e6 2. d4 d5 3. Nd2 Nf6 4. e5 Nfd7 5. Bd3 c5 6. c3 b6"
}, {
    fen: "r1bqkb1r/pp1n1ppp/2n1p3/2ppP3/3P4/2PB4/PP1N1PPP/R1BQK1NR w KQkq - 1 7",
    eco: "C05",
    openingName: "French: Tarrasch, closed variation",
    moves: "1. e4 e6 2. d4 d5 3. Nd2 Nf6 4. e5 Nfd7 5. Bd3 c5 6. c3 Nc6"
}, {
    fen: "r1bqkb1r/pp1n1ppp/2n1p3/3pP3/3P4/3B4/PP1NNPPP/R1BQK2R b KQkq - 0 8",
    eco: "C06",
    openingName: "French: Tarrasch, closed variation, main line",
    moves: "1. e4 e6 2. d4 d5 3. Nd2 Nf6 4. e5 Nfd7 5. Bd3 c5 6. c3 Nc6 7. Ne2 cxd4 8. cxd4"
}, {
    fen: "r1bqkb1r/pp3ppp/1nn1p3/3pP3/3P4/3B4/PP1NNPPP/R1BQK2R w KQkq - 1 9",
    eco: "C06",
    openingName: "French: Tarrasch, Leningrad variation",
    moves: "1. e4 e6 2. d4 d5 3. Nd2 Nf6 4. e5 Nfd7 5. Bd3 c5 6. c3 Nc6 7. Ne2 cxd4 8. cxd4 Nb6"
}, {
    fen: "rnbqkbnr/pp3ppp/4p3/2pp4/3PP3/8/PPPN1PPP/R1BQKBNR w KQkq c6 0 4",
    eco: "C07",
    openingName: "French: Tarrasch, open variation",
    moves: "1. e4 e6 2. d4 d5 3. Nd2 c5"
}, {
    fen: "rnbqkbnr/pp3ppp/4p3/8/2Bp4/5N2/PPPN1PPP/R1BQK2R w KQkq - 2 7",
    eco: "C07",
    openingName: "French: Tarrasch, Eliskases variation",
    moves: "1. e4 e6 2. d4 d5 3. Nd2 c5 4. exd5 Qxd5 5. Ngf3 cxd4 6. Bc4 Qd8"
}, {
    fen: "rnbqkbnr/pp3ppp/8/2pp4/3P4/8/PPPN1PPP/R1BQKBNR w KQkq - 0 5",
    eco: "C08",
    openingName: "French: Tarrasch, open, 4.ed ed",
    moves: "1. e4 e6 2. d4 d5 3. Nd2 c5 4. exd5 exd5"
}, {
    fen: "r1bqkbnr/pp3ppp/2n5/2pp4/3P4/5N2/PPPN1PPP/R1BQKB1R w KQkq - 2 6",
    eco: "C09",
    openingName: "French: Tarrasch, open variation, main line",
    moves: "1. e4 e6 2. d4 d5 3. Nd2 c5 4. exd5 exd5 5. Ngf3 Nc6"
}, {
    fen: "rnbqkbnr/ppp2ppp/4p3/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR b KQkq - 1 3",
    eco: "C10",
    openingName: "French: Paulsen variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3"
}, {
    fen: "rnbqkbnr/pp3ppp/4p3/2pp4/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq c6 0 4",
    eco: "C10",
    openingName: "French: Marshall variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 c5"
}, {
    fen: "rnbqkbnr/ppp2ppp/4p3/8/3Pp3/2N5/PPP2PPP/R1BQKBNR w KQkq - 0 4",
    eco: "C10",
    openingName: "French: Rubinstein variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 dxe4"
}, {
    fen: "rn1qkbnr/ppp2ppp/2b1p3/8/3PN3/5N2/PPP2PPP/R1BQKB1R w KQkq - 3 6",
    eco: "C10",
    openingName: "French: Fort Knox variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 dxe4 4. Nxe4 Bd7 5. Nf3 Bc6"
}, {
    fen: "r1bqkbnr/pppn1ppp/4p3/8/3PN3/8/PPP2PPP/R1BQKBNR w KQkq - 1 5",
    eco: "C10",
    openingName: "French: Rubinstein variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 dxe4 4. Nxe4 Nd7"
}, {
    fen: "r1bqkb1r/ppp2ppp/4pn2/4N3/3P4/8/PPP2PPP/R1BQKB1R b KQkq - 1 7",
    eco: "C10",
    openingName: "French: Rubinstein, Capablanca line",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 dxe4 4. Nxe4 Nd7 5. Nf3 Ngf6 6. Nxf6+ Nxf6 7. Ne5"
}, {
    fen: "rnb1kbnr/ppp2ppp/4p3/3q4/3PN3/8/PPP2PPP/R1BQKBNR w KQkq - 1 5",
    eco: "C10",
    openingName: "French: Frere (Becker) variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 dxe4 4. Nxe4 Qd5"
}, {
    fen: "rnbqkb1r/ppp2ppp/4pn2/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 2 4",
    eco: "C11",
    openingName: "French defence",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6"
}, {
    fen: "rnbqkb1r/ppp2ppp/4pn2/3p4/3PP3/2NB4/PPP2PPP/R1BQK1NR b KQkq - 3 4",
    eco: "C11",
    openingName: "French: Swiss variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bd3"
}, {
    fen: "rnbqkb1r/ppp2ppp/4pn2/3p4/3PP3/2N1B3/PPP2PPP/R2QKBNR b KQkq - 3 4",
    eco: "C11",
    openingName: "French: Henneberger variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Be3"
}, {
    fen: "rnbqkb1r/ppp2ppp/4pn2/3pP3/3P4/2N5/PPP2PPP/R1BQKBNR b KQkq - 0 4",
    eco: "C11",
    openingName: "French: Steinitz variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. e5"
}, {
    fen: "rnbqk2r/pp1n1ppp/4p3/2bpP3/5PQ1/2N5/PPP3PP/R1B1KBNR b KQkq - 1 7",
    eco: "C11",
    openingName: "French: Steinitz, Bradford attack",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. e5 Nfd7 5. f4 c5 6. dxc5 Bxc5 7. Qg4"
}, {
    fen: "r1bqkb1r/pp1n1ppp/2n1p3/2PpP3/5P2/2N5/PPP3PP/R1BQKBNR w KQkq - 1 7",
    eco: "C11",
    openingName: "French: Steinitz variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. e5 Nfd7 5. f4 c5 6. dxc5 Nc6"
}, {
    fen: "r1bq1rk1/pp1n2pp/2n1pp2/2bpP3/5PQ1/P1N2N2/1PP3PP/R1B1KB1R w KQ - 0 10",
    eco: "C11",
    openingName: "French: Steinitz, Brodsky-Jones variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. e5 Nfd7 5. f4 c5 6. dxc5 Nc6 7. a3 Bxc5 8. Qg4 O-O 9. Nf3 f6"
}, {
    fen: "rnbqkb1r/pp1n1ppp/4p3/2ppP3/3P1P2/2N2N2/PPP3PP/R1BQKB1R b KQkq - 1 6",
    eco: "C11",
    openingName: "French: Steinitz variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. e5 Nfd7 5. f4 c5 6. Nf3"
}, {
    fen: "r1bqkb1r/pp1n1ppp/2n1p3/2ppP3/3P1P2/2N1BN2/PPP3PP/R2QKB1R b KQkq - 3 7",
    eco: "C11",
    openingName: "French: Steinitz, Boleslavsky variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. e5 Nfd7 5. f4 c5 6. Nf3 Nc6 7. Be3"
}, {
    fen: "rnbqkb1r/pppn1ppp/4p3/3pP3/3P2Q1/2N5/PPP2PPP/R1B1KBNR b KQkq - 2 5",
    eco: "C11",
    openingName: "French: Steinitz, Gledhill attack",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. e5 Nfd7 5. Qg4"
}, {
    fen: "rnbqkb1r/ppp2ppp/4pn2/6B1/3Pp3/2N5/PPP2PPP/R2QKBNR w KQkq - 0 5",
    eco: "C11",
    openingName: "French: Burn variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 dxe4"
}, {
    fen: "rnbqk2r/ppp2ppp/4pn2/3p2B1/1b1PP3/2N5/PPP2PPP/R2QKBNR w KQkq - 4 5",
    eco: "C12",
    openingName: "French: MacCutcheon variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 Bb4"
}, {
    fen: "rnb1k2r/ppp2p1p/4pp2/q7/1b1P4/2N5/PPPQ1PPP/R3KBNR w KQkq - 2 8",
    eco: "C12",
    openingName: "French: MacCutcheon, Bogolyubov variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 Bb4 5. exd5 Qxd5 6. Bxf6 gxf6 7. Qd2 Qa5"
}, {
    fen: "rnbqk2r/ppp2ppp/4pn2/3pP1B1/1b1P4/2N5/PPP2PPP/R2QKBNR b KQkq - 0 5",
    eco: "C12",
    openingName: "French: MacCutcheon, advance variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 Bb4 5. e5"
}, {
    fen: "rnbqk2r/ppp2pp1/4pP1p/3p2B1/1b1P4/2N5/PPP2PPP/R2QKBNR b KQkq - 0 6",
    eco: "C12",
    openingName: "French: MacCutcheon, Chigorin variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 Bb4 5. e5 h6 6. exf6"
}, {
    fen: "rnbqk1r1/ppp2pP1/4p3/3p4/1b1P2Qp/2N5/PPP2PP1/R3KBNR b KQq - 1 9",
    eco: "C12",
    openingName: "French: MacCutcheon, Grigoriev variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 Bb4 5. e5 h6 6. exf6 hxg5 7. fxg7 Rg8 8. h4 gxh4 9. Qg4"
}, {
    fen: "rnbqk2r/ppp2pp1/4pn1p/3pP3/1b1P3B/2N5/PPP2PPP/R2QKBNR b KQkq - 1 6",
    eco: "C12",
    openingName: "French: MacCutcheon, Bernstein variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 Bb4 5. e5 h6 6. Bh4"
}, {
    fen: "rnbqk2r/ppp2pp1/4pn1p/3pP3/1b1P4/2N1B3/PPP2PPP/R2QKBNR b KQkq - 1 6",
    eco: "C12",
    openingName: "French: MacCutcheon, Janowski variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 Bb4 5. e5 h6 6. Be3"
}, {
    fen: "rnbqk2r/ppp2pp1/4pn1p/3pP3/1b1P4/2N5/PPP2PPP/R1BQKBNR b KQkq - 1 6",
    eco: "C12",
    openingName: "French: MacCutcheon, Dr. Olland (Dutch) variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 Bb4 5. e5 h6 6. Bc1"
}, {
    fen: "rnbqk2r/pppn1pp1/4p2p/3pP3/1b1P4/2N5/PPPB1PPP/R2QKBNR w KQkq - 2 7",
    eco: "C12",
    openingName: "French: MacCutcheon, Tartakower variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 Bb4 5. e5 h6 6. Bd2 Nfd7"
}, {
    fen: "rnbqk2r/ppp2pp1/4pn1p/3pP3/3P4/2b5/PPPB1PPP/R2QKBNR w KQkq - 0 7",
    eco: "C12",
    openingName: "French: MacCutcheon, Lasker variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 Bb4 5. e5 h6 6. Bd2 Bxc3"
}, {
    fen: "rnbq1k1r/ppp2pp1/4p2p/3pP3/3Pn1Q1/2P5/P1P2PPP/R1B1KBNR b KQ - 4 9",
    eco: "C12",
    openingName: "French: MacCutcheon, Duras variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 Bb4 5. e5 h6 6. Bd2 Bxc3 7. bxc3 Ne4 8. Qg4 Kf8 9. Bc1"
}, {
    fen: "rnbqk2r/ppp2p2/4p1pp/3pP3/3Pn1Q1/2P5/P1PB1PPP/R3KBNR w KQkq - 0 9",
    eco: "C12",
    openingName: "French: MacCutcheon, Lasker variation, 8...g6",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 Bb4 5. e5 h6 6. Bd2 Bxc3 7. bxc3 Ne4 8. Qg4 g6"
}, {
    fen: "rnbqk2r/ppp1bppp/4pn2/3p2B1/3PP3/2N5/PPP2PPP/R2QKBNR w KQkq - 4 5",
    eco: "C13",
    openingName: "French: classical",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 Be7"
}, {
    fen: "rnbqk2r/ppp1bppp/4pB2/3p4/3PP3/2N5/PPP2PPP/R2QKBNR b KQkq - 0 5",
    eco: "C13",
    openingName: "French: classical, Anderssen variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 Be7 5. Bxf6"
}, {
    fen: "rnbqk2r/ppp1bppp/4p3/3pP3/3P2Q1/2N5/PPP2PPP/R3KBNR b KQkq - 2 7",
    eco: "C13",
    openingName: "French: classical, Anderssen-Richter variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 Be7 5. Bxf6 Bxf6 6. e5 Be7 7. Qg4"
}, {
    fen: "rnbqk1nr/ppp1bppp/4p3/3pP1B1/3P4/2N5/PPP2PPP/R2QKBNR w KQkq - 1 6",
    eco: "C13",
    openingName: "French: classical, Vistaneckis (Nimzovich) variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 Be7 5. e5 Ng8"
}, {
    fen: "rnbqk1nr/p1p1bppp/1p2p3/3pP3/3P4/2N1B3/PPP2PPP/R2QKBNR w KQkq - 0 7",
    eco: "C13",
    openingName: "French: classical, Frankfurt variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 Be7 5. e5 Ng8 6. Be3 b6"
}, {
    fen: "rnbqk2r/ppp1bppp/4p3/3pP1B1/3Pn3/2N5/PPP2PPP/R2QKBNR w KQkq - 1 6",
    eco: "C13",
    openingName: "French: classical, Tartakower variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 Be7 5. e5 Ne4"
}, {
    fen: "rnbqk2r/pppnbppp/4p3/3pP1B1/3P3P/2N5/PPP2PP1/R2QKBNR b KQkq h3 0 6",
    eco: "C13",
    openingName: "French: Albin-Alekhine-Chatard attack",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 Be7 5. e5 Nfd7 6. h4"
}, {
    fen: "rnbqk2r/1ppnbppp/p3p3/3pP1B1/3P3P/2N5/PPP2PP1/R2QKBNR w KQkq - 0 7",
    eco: "C13",
    openingName: "French: Albin-Alekhine-Chatard attack, Maroczy variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 Be7 5. e5 Nfd7 6. h4 a6"
}, {
    fen: "rnbqk2r/pp1nbppp/4p3/2ppP1B1/3P3P/2N5/PPP2PP1/R2QKBNR w KQkq c6 0 7",
    eco: "C13",
    openingName: "French: Albin-Alekhine-Chatard attack, Breyer variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 Be7 5. e5 Nfd7 6. h4 c5"
}, {
    fen: "rnbqk2r/pppnb1pp/4pp2/3pP1B1/3P3P/2N5/PPP2PP1/R2QKBNR w KQkq - 0 7",
    eco: "C13",
    openingName: "French: Albin-Alekhine-Chatard attack, Teichmann variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 Be7 5. e5 Nfd7 6. h4 f6"
}, {
    fen: "rnbq1rk1/pppnbppp/4p3/3pP1B1/3P3P/2N5/PPP2PP1/R2QKBNR w KQ - 1 7",
    eco: "C13",
    openingName: "French: Albin-Alekhine-Chatard attack, Spielmann variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 Be7 5. e5 Nfd7 6. h4 O-O"
}, {
    fen: "rnb1k2r/pppnqppp/4p3/3pP3/3P4/2N5/PPP2PPP/R2QKBNR w KQkq - 0 7",
    eco: "C14",
    openingName: "French: classical variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 Be7 5. e5 Nfd7 6. Bxe7 Qxe7"
}, {
    fen: "rnb1k2r/pppnqppp/4p3/3pP3/3P4/2NB4/PPP2PPP/R2QK1NR b KQkq - 1 7",
    eco: "C14",
    openingName: "French: classical, Tarrasch variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 Be7 5. e5 Nfd7 6. Bxe7 Qxe7 7. Bd3"
}, {
    fen: "rnb1k2r/pppnqppp/4p3/3pP3/3P4/2N5/PPPQ1PPP/R3KBNR b KQkq - 1 7",
    eco: "C14",
    openingName: "French: classical, Rubinstein variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 Be7 5. e5 Nfd7 6. Bxe7 Qxe7 7. Qd2"
}, {
    fen: "rnb1k2r/pppnqppp/4p3/1N1pP3/3P4/8/PPP2PPP/R2QKBNR b KQkq - 1 7",
    eco: "C14",
    openingName: "French: classical, Alapin variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 Be7 5. e5 Nfd7 6. Bxe7 Qxe7 7. Nb5"
}, {
    fen: "rnb1k2r/pppnqppp/4p3/3pP3/3P2Q1/2N5/PPP2PPP/R3KBNR b KQkq - 1 7",
    eco: "C14",
    openingName: "French: classical, Pollock variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 Be7 5. e5 Nfd7 6. Bxe7 Qxe7 7. Qg4"
}, {
    fen: "rnb1k2r/pppnqppp/4p3/3pP3/3P1P2/2N5/PPP3PP/R2QKBNR b KQkq f3 0 7",
    eco: "C14",
    openingName: "French: classical, Steinitz variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 Be7 5. e5 Nfd7 6. Bxe7 Qxe7 7. f4"
}, {
    fen: "r1b2rk1/pp1nqppp/2n1p3/3pP3/2pP1P2/2N2N2/PPPQ2PP/2KR1B1R w - - 0 11",
    eco: "C14",
    openingName: "French: classical, Stahlberg variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Nf6 4. Bg5 Be7 5. e5 Nfd7 6. Bxe7 Qxe7 7. f4 O-O 8. Nf3 c5 9. Qd2 Nc6 10. O-O-O c4"
}, {
    fen: "rnbqk1nr/ppp2ppp/4p3/3p4/1b1PP3/2N5/PPP2PPP/R1BQKBNR w KQkq - 2 4",
    eco: "C15",
    openingName: "French: Winawer (Nimzovich) variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Bb4"
}, {
    fen: "rnb1k1nr/pp3ppp/4p3/2pq4/1b1P4/2NB4/PPPB1PPP/R2QK1NR b KQkq - 1 6",
    eco: "C15",
    openingName: "French: Winawer, Kondratiyev variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Bb4 4. Bd3 c5 5. exd5 Qxd5 6. Bd2"
}, {
    fen: "rnbqk1nr/ppp2ppp/4p3/3p4/1b1PP3/2N5/PPPB1PPP/R2QKBNR b KQkq - 3 4",
    eco: "C15",
    openingName: "French: Winawer, fingerslip variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Bb4 4. Bd2"
}, {
    fen: "rnbqk1nr/ppp2ppp/4p3/3p4/1b1PP3/2N5/PPP1NPPP/R1BQKB1R b KQkq - 3 4",
    eco: "C15",
    openingName: "French: Winawer, Alekhine (Maroczy) gambit",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Bb4 4. Ne2"
}, {
    fen: "r1bq1rk1/ppp1bppp/2n1pn2/8/3PN3/P5N1/1PP1BPPP/R1BQK2R w KQ - 5 9",
    eco: "C15",
    openingName: "French: Winawer, Alekhine gambit, Alatortsev variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Bb4 4. Ne2 dxe4 5. a3 Be7 6. Nxe4 Nf6 7. N2g3 O-O 8. Be2 Nc6"
}, {
    fen: "rnbqk1nr/ppp2ppp/4p3/8/3Pp3/P1b5/1PP1NPPP/R1BQKB1R w KQkq - 0 6",
    eco: "C15",
    openingName: "French: Winawer, Alekhine gambit",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Bb4 4. Ne2 dxe4 5. a3 Bxc3+"
}, {
    fen: "r1bqk1nr/ppp2ppp/2n1p3/8/3Pp3/P1N5/1PP2PPP/R1BQKB1R w KQkq - 1 7",
    eco: "C15",
    openingName: "French: Winawer, Alekhine gambit, Kan variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Bb4 4. Ne2 dxe4 5. a3 Bxc3+ 6. Nxc3 Nc6"
}, {
    fen: "rnbqk1nr/ppp2ppp/4p3/3pP3/1b1P4/2N5/PPP2PPP/R1BQKBNR b KQkq - 0 4",
    eco: "C16",
    openingName: "French: Winawer, advance variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Bb4 4. e5"
}, {
    fen: "rnb1k1nr/pppq1ppp/4p3/3pP3/1b1P4/2N5/PPP2PPP/R1BQKBNR w KQkq - 1 5",
    eco: "C16",
    openingName: "French: Winawer, Petrosian variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Bb4 4. e5 Qd7"
}, {
    fen: "rnbqk1nr/pp3ppp/4p3/2ppP3/1b1P4/2N5/PPP2PPP/R1BQKBNR w KQkq c6 0 5",
    eco: "C17",
    openingName: "French: Winawer, advance variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Bb4 4. e5 c5"
}, {
    fen: "rnbqk1nr/pp3ppp/4p3/2ppP3/1b1P4/2N5/PPPB1PPP/R2QKBNR b KQkq - 1 5",
    eco: "C17",
    openingName: "French: Winawer, advance, Bogolyubov variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Bb4 4. e5 c5 5. Bd2"
}, {
    fen: "rnbqk1nr/pp3ppp/4p3/2ppP3/1b1P2Q1/2N5/PPP2PPP/R1B1KBNR b KQkq - 1 5",
    eco: "C17",
    openingName: "French: Winawer, advance, Russian variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Bb4 4. e5 c5 5. Qg4"
}, {
    fen: "rnbqk1nr/pp3ppp/4p3/2ppP3/1b1P4/P1N5/1PP2PPP/R1BQKBNR b KQkq - 0 5",
    eco: "C17",
    openingName: "French: Winawer, advance, 5.a3",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Bb4 4. e5 c5 5. a3"
}, {
    fen: "rnbqk1nr/pp3ppp/4p3/3pP3/1P6/2p2N2/1PP2PPP/R1BQKB1R b KQkq - 1 7",
    eco: "C17",
    openingName: "French: Winawer, advance, Rauzer variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Bb4 4. e5 c5 5. a3 cxd4 6. axb4 dxc3 7. Nf3"
}, {
    fen: "rnbqk1nr/pp3ppp/4p3/2ppP3/3P4/P1P5/2P2PPP/R1BQKBNR b KQkq - 0 6",
    eco: "C18",
    openingName: "French: Winawer, advance variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Bb4 4. e5 c5 5. a3 Bxc3+ 6. bxc3"
}, {
    fen: "rnb1k1nr/ppq2ppp/4p3/2ppP3/3P4/P1P5/2P2PPP/R1BQKBNR w KQkq - 1 7",
    eco: "C18",
    openingName: "French: Winawer, classical variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Bb4 4. e5 c5 5. a3 Bxc3+ 6. bxc3 Qc7"
}, {
    fen: "rnbqk2r/pp2nppp/4p3/2ppP3/3P4/P1P5/2P2PPP/R1BQKBNR w KQkq - 1 7",
    eco: "C19",
    openingName: "French: Winawer, advance, 6...Ne7",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Bb4 4. e5 c5 5. a3 Bxc3+ 6. bxc3 Ne7"
}, {
    fen: "rnbqk2r/pp2nppp/4p3/2ppP3/P2P4/2P5/2P2PPP/R1BQKBNR b KQkq - 0 7",
    eco: "C19",
    openingName: "French: Winawer, advance, Smyslov variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Bb4 4. e5 c5 5. a3 Bxc3+ 6. bxc3 Ne7 7. a4"
}, {
    fen: "rnbqk2r/pp2nppp/4p3/2ppP3/3P4/P1P2N2/2P2PPP/R1BQKB1R b KQkq - 2 7",
    eco: "C19",
    openingName: "French: Winawer, advance, positional main line",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Bb4 4. e5 c5 5. a3 Bxc3+ 6. bxc3 Ne7 7. Nf3"
}, {
    fen: "rnbqk2r/pp2nppp/4p3/2ppP3/3P2Q1/P1P5/2P2PPP/R1B1KBNR b KQkq - 2 7",
    eco: "C19",
    openingName: "French: Winawer, advance, poisoned pawn variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Bb4 4. e5 c5 5. a3 Bxc3+ 6. bxc3 Ne7 7. Qg4"
}, {
    fen: "rnb1k1r1/ppq1np1Q/4p3/3pP3/3p4/P1P5/2P2PPP/R1BK1BNR b q - 1 10",
    eco: "C19",
    openingName: "French: Winawer, advance, poisoned pawn, Euwe-Gligoric variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Bb4 4. e5 c5 5. a3 Bxc3+ 6. bxc3 Ne7 7. Qg4 Qc7 8. Qxg7 Rg8 9. Qxh7 cxd4 10. Kd1"
}, {
    fen: "rnb1k1r1/ppq1np1Q/4p3/3pP3/3p4/P1P5/2P1NPPP/R1B1KB1R b KQq - 1 10",
    eco: "C19",
    openingName: "French: Winawer, advance, poisoned pawn, Konstantinopolsky variation",
    moves: "1. e4 e6 2. d4 d5 3. Nc3 Bb4 4. e5 c5 5. a3 Bxc3+ 6. bxc3 Ne7 7. Qg4 Qc7 8. Qxg7 Rg8 9. Qxh7 cxd4 10. Ne2"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2",
    eco: "C20",
    openingName: "King's pawn game",
    moves: "1. e4 e5"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/3P4/PPP2PPP/RNBQKBNR b KQkq - 0 2",
    eco: "C20",
    openingName: "KP: Indian opening",
    moves: "1. e4 e5 2. d3"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/P7/1PPP1PPP/RNBQKBNR b KQkq - 0 2",
    eco: "C20",
    openingName: "KP: Mengarini's opening",
    moves: "1. e4 e5 2. a3"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/5P2/PPPP2PP/RNBQKBNR b KQkq - 0 2",
    eco: "C20",
    openingName: "KP: King's head opening",
    moves: "1. e4 e5 2. f3"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/4p2Q/4P3/8/PPPP1PPP/RNB1KBNR b KQkq - 1 2",
    eco: "C20",
    openingName: "KP: Patzer opening",
    moves: "1. e4 e5 2. Qh5"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/5Q2/PPPP1PPP/RNB1KBNR b KQkq - 1 2",
    eco: "C20",
    openingName: "KP: Napoleon's opening",
    moves: "1. e4 e5 2. Qf3"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/2P5/PP1P1PPP/RNBQKBNR b KQkq - 0 2",
    eco: "C20",
    openingName: "KP: Lopez opening",
    moves: "1. e4 e5 2. c3"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPPNPPP/RNBQKB1R b KQkq - 1 2",
    eco: "C20",
    openingName: "Alapin's opening",
    moves: "1. e4 e5 2. Ne2"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/8/3pP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3",
    eco: "C21",
    openingName: "Centre game",
    moves: "1. e4 e5 2. d4 exd4"
}, {
    fen: "rnbqkbnr/p2p1ppp/8/1pp5/2BpP3/5N2/PPP2PPP/RNBQK2R w KQkq b6 0 5",
    eco: "C21",
    openingName: "Centre game, Kieseritsky variation",
    moves: "1. e4 e5 2. d4 exd4 3. Nf3 c5 4. Bc4 b5"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/8/3pPP2/8/PPP3PP/RNBQKBNR b KQkq f3 0 3",
    eco: "C21",
    openingName: "Halasz gambit",
    moves: "1. e4 e5 2. d4 exd4 3. f4"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/8/3pP3/2P5/PP3PPP/RNBQKBNR b KQkq - 0 3",
    eco: "C21",
    openingName: "Danish gambit",
    moves: "1. e4 e5 2. d4 exd4 3. c3"
}, {
    fen: "rnb1kbnr/ppppqppp/8/8/2B1P3/8/PB3PPP/RN1QK1NR w KQkq - 1 6",
    eco: "C21",
    openingName: "Danish gambit: Collijn defence",
    moves: "1. e4 e5 2. d4 exd4 3. c3 dxc3 4. Bc4 cxb2 5. Bxb2 Qe7"
}, {
    fen: "rnbqkbnr/ppp2ppp/8/3p4/2B1P3/8/PB3PPP/RN1QK1NR w KQkq d6 0 6",
    eco: "C21",
    openingName: "Danish gambit: Schlechter defence",
    moves: "1. e4 e5 2. d4 exd4 3. c3 dxc3 4. Bc4 cxb2 5. Bxb2 d5"
}, {
    fen: "rnbqkbnr/ppp2ppp/8/3p4/3pP3/2P5/PP3PPP/RNBQKBNR w KQkq d6 0 4",
    eco: "C21",
    openingName: "Danish gambit: Soerensen defence",
    moves: "1. e4 e5 2. d4 exd4 3. c3 d5"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/8/3QP3/8/PPP2PPP/RNB1KBNR b KQkq - 0 3",
    eco: "C21",
    openingName: "Centre game",
    moves: "1. e4 e5 2. d4 exd4 3. Qxd4"
}, {
    fen: "r1bqkbnr/pppp1ppp/2n5/8/3QP3/8/PPP2PPP/RNB1KBNR w KQkq - 1 4",
    eco: "C22",
    openingName: "Centre game",
    moves: "1. e4 e5 2. d4 exd4 3. Qxd4 Nc6"
}, {
    fen: "r1bqkbnr/pppp1ppp/2n5/8/4P3/4Q3/PPP2PPP/RNB1KBNR b KQkq - 2 4",
    eco: "C22",
    openingName: "Centre game: Paulsen attack",
    moves: "1. e4 e5 2. d4 exd4 3. Qxd4 Nc6 4. Qe3"
}, {
    fen: "r1bqk1nr/ppppbppp/2n5/8/4P3/2P1Q3/PP3PPP/RNB1KBNR w KQkq - 1 6",
    eco: "C22",
    openingName: "Centre game: Charousek variation",
    moves: "1. e4 e5 2. d4 exd4 3. Qxd4 Nc6 4. Qe3 Bb4+ 5. c3 Be7"
}, {
    fen: "r1bqkbnr/pppp2pp/2n5/5p2/4P3/4Q3/PPP2PPP/RNB1KBNR w KQkq f6 0 5",
    eco: "C22",
    openingName: "Centre game: l'Hermet variation",
    moves: "1. e4 e5 2. d4 exd4 3. Qxd4 Nc6 4. Qe3 f5"
}, {
    fen: "r1bqkb1r/pppp1ppp/2n2n2/8/4P3/4Q3/PPP2PPP/RNB1KBNR w KQkq - 3 5",
    eco: "C22",
    openingName: "Centre game: Berger variation",
    moves: "1. e4 e5 2. d4 exd4 3. Qxd4 Nc6 4. Qe3 Nf6"
}, {
    fen: "r1bqr1k1/ppp2ppp/2np1n2/8/1bB1P3/2N1Q2N/PPPB1PPP/2KR3R b - - 1 9",
    eco: "C22",
    openingName: "Centre game: Kupreichik variation",
    moves: "1. e4 e5 2. d4 exd4 3. Qxd4 Nc6 4. Qe3 Nf6 5. Nc3 Bb4 6. Bd2 O-O 7. O-O-O Re8 8. Bc4 d6 9. Nh3"
}, {
    fen: "r1bqkbnr/pppp1ppp/2n5/8/2Q1P3/8/PPP2PPP/RNB1KBNR b KQkq - 2 4",
    eco: "C22",
    openingName: "Centre game: Hall variation",
    moves: "1. e4 e5 2. d4 exd4 3. Qxd4 Nc6 4. Qc4"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/4p3/2B1P3/8/PPPP1PPP/RNBQK1NR b KQkq - 1 2",
    eco: "C23",
    openingName: "Bishop's opening",
    moves: "1. e4 e5 2. Bc4"
}, {
    fen: "rnbqkbnr/pp1p1ppp/2p5/4p3/2B1P3/8/PPPP1PPP/RNBQK1NR w KQkq - 0 3",
    eco: "C23",
    openingName: "Bishop's opening: Philidor counter-attack",
    moves: "1. e4 e5 2. Bc4 c6"
}, {
    fen: "r2qkbnr/pp3ppp/8/3pn3/8/8/PPP1NPPP/RNBQK2R b KQkq - 1 8",
    eco: "C23",
    openingName: "Bishop's opening: Lisitsyn variation",
    moves: "1. e4 e5 2. Bc4 c6 3. d4 d5 4. exd5 cxd5 5. Bb5+ Bd7 6. Bxd7+ Nxd7 7. dxe5 Nxe5 8. Ne2"
}, {
    fen: "rnbqkbnr/pppp2pp/8/4pp2/2B1P3/8/PPPP1PPP/RNBQK1NR w KQkq f6 0 3",
    eco: "C23",
    openingName: "Bishop's opening: Calabrese counter-gambit",
    moves: "1. e4 e5 2. Bc4 f5"
}, {
    fen: "rnbqkbnr/pppp2pp/8/4pp2/2B1P3/3P4/PPP2PPP/RNBQK1NR b KQkq - 0 3",
    eco: "C23",
    openingName: "Bishop's opening: Calabrese counter-gambit, Jaenisch variation",
    moves: "1. e4 e5 2. Bc4 f5 3. d3"
}, {
    fen: "rnbqk1nr/pppp1ppp/8/2b1p3/2B1P3/8/PPPP1PPP/RNBQK1NR w KQkq - 2 3",
    eco: "C23",
    openingName: "Bishop's opening: Classical variation",
    moves: "1. e4 e5 2. Bc4 Bc5"
}, {
    fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1PP2/2P5/PP1PQ1PP/RNB1K1NR b KQkq f3 0 5",
    eco: "C23",
    openingName: "Bishop's opening: Lopez gambit",
    moves: "1. e4 e5 2. Bc4 Bc5 3. Qe2 Nc6 4. c3 Nf6 5. f4"
}, {
    fen: "rnbqk1nr/pppp1ppp/8/2b1p3/2B1P3/2P5/PP1P1PPP/RNBQK1NR b KQkq - 0 3",
    eco: "C23",
    openingName: "Bishop's opening: Philidor variation",
    moves: "1. e4 e5 2. Bc4 Bc5 3. c3"
}, {
    fen: "rnbq1rk1/ppp2ppp/5P2/2b4Q/2pp4/2P5/PP3PPP/RNB1K1NR w KQ - 2 8",
    eco: "C23",
    openingName: "Bishop's opening: Pratt variation",
    moves: "1. e4 e5 2. Bc4 Bc5 3. c3 Nf6 4. d4 exd4 5. e5 d5 6. exf6 dxc4 7. Qh5 O-O"
}, {
    fen: "rnbqk1nr/ppp2ppp/8/2bpp3/2B1P3/2P5/PP1P1PPP/RNBQK1NR w KQkq d6 0 4",
    eco: "C23",
    openingName: "Bishop's opening: Lewis counter-gambit",
    moves: "1. e4 e5 2. Bc4 Bc5 3. c3 d5"
}, {
    fen: "rnb1k1nr/pppp1ppp/8/2b1p1q1/2B1P3/2P5/PP1P1PPP/RNBQK1NR w KQkq - 1 4",
    eco: "C23",
    openingName: "Bishop's opening: del Rio variation",
    moves: "1. e4 e5 2. Bc4 Bc5 3. c3 Qg5"
}, {
    fen: "rnbqk1nr/pppp1ppp/8/2b1p3/2BPP3/8/PPP2PPP/RNBQK1NR b KQkq d3 0 3",
    eco: "C23",
    openingName: "Bishop's opening: Lewis gambit",
    moves: "1. e4 e5 2. Bc4 Bc5 3. d4"
}, {
    fen: "rnbqk1nr/pppp1ppp/8/2b1p3/1PB1P3/8/P1PP1PPP/RNBQK1NR b KQkq b3 0 3",
    eco: "C23",
    openingName: "Bishop's opening: Wing gambit",
    moves: "1. e4 e5 2. Bc4 Bc5 3. b4"
}, {
    fen: "rnbqk1nr/pppp1ppp/8/4p3/1bB1PP2/8/P1PP2PP/RNBQK1NR b KQkq f3 0 4",
    eco: "C23",
    openingName: "Bishop's opening: MacDonnell double gambit",
    moves: "1. e4 e5 2. Bc4 Bc5 3. b4 Bxb4 4. f4"
}, {
    fen: "rnbqk1nr/pppp1ppp/8/8/2BPP2b/5N2/P1P4p/RNBQ1R1K b kq - 1 9",
    eco: "C23",
    openingName: "Bishop's opening: Four pawns' gambit",
    moves: "1. e4 e5 2. Bc4 Bc5 3. b4 Bxb4 4. f4 exf4 5. Nf3 Be7 6. d4 Bh4+ 7. g3 fxg3 8. O-O gxh2+ 9. Kh1"
}, {
    fen: "rnbqkb1r/pppp1ppp/5n2/4p3/2B1P3/8/PPPP1PPP/RNBQK1NR w KQkq - 2 3",
    eco: "C24",
    openingName: "Bishop's opening: Berlin defence",
    moves: "1. e4 e5 2. Bc4 Nf6"
}, {
    fen: "rnbqkb1r/pppp1ppp/5n2/4p3/2B1PP2/8/PPPP2PP/RNBQK1NR b KQkq f3 0 3",
    eco: "C24",
    openingName: "Bishop's opening: Greco gambit",
    moves: "1. e4 e5 2. Bc4 Nf6 3. f4"
}, {
    fen: "rnbqkb1r/pppp1ppp/5n2/4p3/2BPP3/8/PPP2PPP/RNBQK1NR b KQkq d3 0 3",
    eco: "C24",
    openingName: "Bishop's opening: Ponziani gambit",
    moves: "1. e4 e5 2. Bc4 Nf6 3. d4"
}, {
    fen: "rnbqkb1r/pppp1ppp/5n2/8/2BpP3/5N2/PPP2PPP/RNBQK2R b KQkq - 1 4",
    eco: "C43",
    openingName: "Petrov: Urusov gambit",
    moves: "1. e4 e5 2. Nf3 Nf6 3. d4 exd4 4. Bc4"
}, {
    fen: "rnb1k2r/ppp1qppp/5n2/3P4/1bBp4/2P2N2/PP3PPP/RNBQK2R w KQkq - 1 7",
    eco: "C24",
    openingName: "Bishop's opening: Urusov gambit, Panov variation",
    moves: "1. e4 e5 2. Bc4 Nf6 3. d4 exd4 4. Nf3 d5 5. exd5 Bb4+ 6. c3 Qe7+"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/2N5/PPPP1PPP/R1BQKBNR b KQkq - 1 2",
    eco: "C25",
    openingName: "Vienna game",
    moves: "1. e4 e5 2. Nc3"
}, {
    fen: "rnbqk2r/pppp1ppp/5n2/4p3/1b2P1Q1/2N5/PPPP1PPP/R1B1KBNR w KQkq - 4 4",
    eco: "C25",
    openingName: "Vienna: Zhuravlev countergambit",
    moves: "1. e4 e5 2. Nc3 Bb4 3. Qg4 Nf6"
}, {
    fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/2N5/PPPP1PPP/R1BQKBNR w KQkq - 2 3",
    eco: "C25",
    openingName: "Vienna game, Max Lange defence",
    moves: "1. e4 e5 2. Nc3 Nc6"
}, {
    fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/2N3P1/PPPP1P1P/R1BQKBNR b KQkq - 0 3",
    eco: "C25",
    openingName: "Vienna: Paulsen variation",
    moves: "1. e4 e5 2. Nc3 Nc6 3. g3"
}, {
    fen: "r1bqkbnr/pppp1ppp/2n5/4p3/3PP3/2N5/PPP2PPP/R1BQKBNR b KQkq d3 0 3",
    eco: "C25",
    openingName: "Vienna: Fyfe gambit",
    moves: "1. e4 e5 2. Nc3 Nc6 3. d4"
}, {
    fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4PP2/2N5/PPPP2PP/R1BQKBNR b KQkq f3 0 3",
    eco: "C25",
    openingName: "Vienna gambit",
    moves: "1. e4 e5 2. Nc3 Nc6 3. f4"
}, {
    fen: "r1bqkbnr/pppp1ppp/2n5/8/3PPp2/2N5/PPP3PP/R1BQKBNR b KQkq d3 0 4",
    eco: "C25",
    openingName: "Vienna: Steinitz gambit",
    moves: "1. e4 e5 2. Nc3 Nc6 3. f4 exf4 4. d4"
}, {
    fen: "r1b1kbnr/ppp2ppp/2n5/3p4/3PPp1q/2N5/PPP1K1PP/R1BQ1BNR w kq d6 0 6",
    eco: "C25",
    openingName: "Vienna: Steinitz gambit, Zukertort defence",
    moves: "1. e4 e5 2. Nc3 Nc6 3. f4 exf4 4. d4 Qh4+ 5. Ke2 d5"
}, {
    fen: "r1b1kbnr/p1pp1ppp/1pn5/8/3PPp1q/2N5/PPP1K1PP/R1BQ1BNR w kq - 0 6",
    eco: "C25",
    openingName: "Vienna: Steinitz gambit, Fraser-Minckwitz variation",
    moves: "1. e4 e5 2. Nc3 Nc6 3. f4 exf4 4. d4 Qh4+ 5. Ke2 b6"
}, {
    fen: "r1bqkbnr/pppp1ppp/2n5/8/4Pp2/2N2N2/PPPP2PP/R1BQKB1R b KQkq - 1 4",
    eco: "C25",
    openingName: "Vienna gambit",
    moves: "1. e4 e5 2. Nc3 Nc6 3. f4 exf4 4. Nf3"
}, {
    fen: "r1bqkbnr/pppp1p1p/2n5/6N1/4PppP/2N5/PPPP2P1/R1BQKB1R b KQkq - 1 6",
    eco: "C25",
    openingName: "Vienna: Hamppe-Allgaier gambit",
    moves: "1. e4 e5 2. Nc3 Nc6 3. f4 exf4 4. Nf3 g5 5. h4 g4 6. Ng5"
}, {
    fen: "r1bqkbnr/ppp2p1p/2np4/6N1/4PppP/2N5/PPPP2P1/R1BQKB1R w KQkq - 0 7",
    eco: "C25",
    openingName: "Vienna: Hamppe-Allgaier gambit, Alapin variation",
    moves: "1. e4 e5 2. Nc3 Nc6 3. f4 exf4 4. Nf3 g5 5. h4 g4 6. Ng5 d6"
}, {
    fen: "r1bqkbnr/pppp1p1p/2n5/8/2B1Ppp1/2N2N2/PPPP2PP/R1BQ1RK1 b kq - 1 6",
    eco: "C25",
    openingName: "Vienna: Hamppe-Muzio gambit",
    moves: "1. e4 e5 2. Nc3 Nc6 3. f4 exf4 4. Nf3 g5 5. Bc4 g4 6. O-O"
}, {
    fen: "r1b1kbnr/pppp1p1p/5q2/4n3/2B1PQ2/2N5/PPPP2PP/R1B2RK1 w kq - 1 9",
    eco: "C25",
    openingName: "Vienna: Hamppe-Muzio, Dubois variation",
    moves: "1. e4 e5 2. Nc3 Nc6 3. f4 exf4 4. Nf3 g5 5. Bc4 g4 6. O-O gxf3 7. Qxf3 Ne5 8. Qxf4 Qf6"
}, {
    fen: "r1bqkbnr/pppp1p1p/2n5/6p1/3PPp2/2N2N2/PPP3PP/R1BQKB1R b KQkq d3 0 5",
    eco: "C25",
    openingName: "Vienna: Pierce gambit",
    moves: "1. e4 e5 2. Nc3 Nc6 3. f4 exf4 4. Nf3 g5 5. d4"
}, {
    fen: "r2qkbnr/ppp2p1p/2P5/8/2BP1pb1/2N2p2/PPP3PP/R1BQ1RK1 b kq - 0 9",
    eco: "C25",
    openingName: "Vienna: Pierce gambit, Rushmere attack",
    moves: "1. e4 e5 2. Nc3 Nc6 3. f4 exf4 4. Nf3 g5 5. d4 g4 6. Bc4 gxf3 7. O-O d5 8. exd5 Bg4 9. dxc6"
}, {
    fen: "rnbqkb1r/pppp1ppp/5n2/4p3/4P3/2N5/PPPP1PPP/R1BQKBNR w KQkq - 2 3",
    eco: "C26",
    openingName: "Vienna: Falkbeer variation",
    moves: "1. e4 e5 2. Nc3 Nf6"
}, {
    fen: "rnbqkb1r/pppp1ppp/5n2/4p3/4P3/P1N5/1PPP1PPP/R1BQKBNR b KQkq - 0 3",
    eco: "C26",
    openingName: "Vienna: Mengarini variation",
    moves: "1. e4 e5 2. Nc3 Nf6 3. a3"
}, {
    fen: "rnbqkb1r/pppp1ppp/5n2/4p3/4P3/2N3P1/PPPP1P1P/R1BQKBNR b KQkq - 0 3",
    eco: "C26",
    openingName: "Vienna: Paulsen-Mieses variation",
    moves: "1. e4 e5 2. Nc3 Nf6 3. g3"
}, {
    fen: "rnbqkb1r/pppp1ppp/5n2/4p3/2B1P3/2N5/PPPP1PPP/R1BQK1NR b KQkq - 3 3",
    eco: "C26",
    openingName: "Vienna game",
    moves: "1. e4 e5 2. Nc3 Nf6 3. Bc4"
}, {
    fen: "rnbqkb1r/pppp1ppp/8/4p3/2B1n3/2N5/PPPP1PPP/R1BQK1NR w KQkq - 0 4",
    eco: "C27",
    openingName: "Vienna game",
    moves: "1. e4 e5 2. Nc3 Nf6 3. Bc4 Nxe4"
}, {
    fen: "N1bk1b1r/p2pq2p/1pnn2p1/3Qpp2/8/1B6/PPPP1PPP/R1B1K1NR w KQ - 0 11",
    eco: "C27",
    openingName: "Vienna: `Frankenstein-Dracula' variation",
    moves: "1. e4 e5 2. Nc3 Nf6 3. Bc4 Nxe4 4. Qh5 Nd6 5. Bb3 Nc6 6. Nb5 g6 7. Qf3 f5 8. Qd5 Qe7 9. Nxc7+ Kd8 10. Nxa8 b6"
}, {
    fen: "r1bqkb1r/pppp1ppp/2nn4/4p2Q/3P4/1BN5/PPP2PPP/R1B1K1NR b KQkq d3 0 6",
    eco: "C27",
    openingName: "Vienna: Adams' gambit",
    moves: "1. e4 e5 2. Nc3 Nf6 3. Bc4 Nxe4 4. Qh5 Nd6 5. Bb3 Nc6 6. d4"
}, {
    fen: "rnbqk2r/ppppbppp/3n4/4p2Q/8/1BN5/PPPP1PPP/R1B1K1NR w KQkq - 4 6",
    eco: "C27",
    openingName: "Vienna game",
    moves: "1. e4 e5 2. Nc3 Nf6 3. Bc4 Nxe4 4. Qh5 Nd6 5. Bb3 Be7"
}, {
    fen: "r1bqk2r/ppppbppp/2nn4/4N2Q/8/1BN5/PPPP1PPP/R1B1K2R b KQkq - 0 7",
    eco: "C27",
    openingName: "Vienna: Alekhine variation",
    moves: "1. e4 e5 2. Nc3 Nf6 3. Bc4 Nxe4 4. Qh5 Nd6 5. Bb3 Be7 6. Nf3 Nc6 7. Nxe5"
}, {
    fen: "rnbqkb1r/pppp1ppp/8/4p3/2B1n3/2N2N2/PPPP1PPP/R1BQK2R b KQkq - 1 4",
    eco: "C27",
    openingName: "Boden-Kieseritsky gambit",
    moves: "1. e4 e5 2. Nc3 Nf6 3. Bc4 Nxe4 4. Nf3"
}, {
    fen: "rnbqkb1r/ppp2ppp/8/3pp3/2B1n3/2N2N2/PPPP1PPP/R1BQK2R w KQkq d6 0 5",
    eco: "C27",
    openingName: "Boden-Kieseritsky gambit: Lichtenhein defence",
    moves: "1. e4 e5 2. Nc3 Nf6 3. Bc4 Nxe4 4. Nf3 d5"
}, {
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N5/PPPP1PPP/R1BQK1NR w KQkq - 4 4",
    eco: "C28",
    openingName: "Vienna game",
    moves: "1. e4 e5 2. Nc3 Nf6 3. Bc4 Nc6"
}, {
    fen: "rnbqkb1r/ppp2ppp/5n2/3pp3/4PP2/2N5/PPPP2PP/R1BQKBNR w KQkq d6 0 4",
    eco: "C29",
    openingName: "Vienna gambit",
    moves: "1. e4 e5 2. Nc3 Nf6 3. f4 d5"
}, {
    fen: "rn1qkb1r/ppp2ppp/8/3pP3/4n1b1/2N2N2/PPPPQ1PP/R1B1KB1R b KQkq - 3 6",
    eco: "C29",
    openingName: "Vienna gambit: Kaufmann variation",
    moves: "1. e4 e5 2. Nc3 Nf6 3. f4 d5 4. fxe5 Nxe4 5. Nf3 Bg4 6. Qe2"
}, {
    fen: "rnbqk2r/ppp1bppp/8/3pP3/4n3/2N2N2/PPPP2PP/R1BQKB1R w KQkq - 2 6",
    eco: "C29",
    openingName: "Vienna gambit: Breyer variation",
    moves: "1. e4 e5 2. Nc3 Nf6 3. f4 d5 4. fxe5 Nxe4 5. Nf3 Be7"
}, {
    fen: "rnbqkb1r/ppp2ppp/8/3pP3/4n3/2N2Q2/PPPP2PP/R1B1KBNR b KQkq - 1 5",
    eco: "C29",
    openingName: "Vienna gambit: Paulsen attack",
    moves: "1. e4 e5 2. Nc3 Nf6 3. f4 d5 4. fxe5 Nxe4 5. Qf3"
}, {
    fen: "rnbqkb1r/ppp3pp/8/3pPp2/4n3/2N2Q2/PPPP2PP/R1B1KBNR w KQkq f6 0 6",
    eco: "C29",
    openingName: "Vienna gambit: Bardeleben variation",
    moves: "1. e4 e5 2. Nc3 Nf6 3. f4 d5 4. fxe5 Nxe4 5. Qf3 f5"
}, {
    fen: "rnbqkb1r/ppp3pp/8/3pPp2/3Pn3/2N2Q2/PPP3PP/R1B1KBNR b KQkq d3 0 6",
    eco: "C29",
    openingName: "Vienna gambit: Heyde variation",
    moves: "1. e4 e5 2. Nc3 Nf6 3. f4 d5 4. fxe5 Nxe4 5. Qf3 f5 6. d4"
}, {
    fen: "rnbqkb1r/ppp2ppp/8/3pP3/4n3/2NP4/PPP3PP/R1BQKBNR b KQkq - 0 5",
    eco: "C29",
    openingName: "Vienna gambit",
    moves: "1. e4 e5 2. Nc3 Nf6 3. f4 d5 4. fxe5 Nxe4 5. d3"
}, {
    fen: "rnb1kb1r/ppp2ppp/8/3NP2q/8/3P1Nn1/PPP4P/R1BQKB1R b KQkq - 0 8",
    eco: "C29",
    openingName: "Vienna gambit, Wurzburger trap",
    moves: "1. e4 e5 2. Nc3 Nf6 3. f4 d5 4. fxe5 Nxe4 5. d3 Qh4+ 6. g3 Nxg3 7. Nf3 Qh5 8. Nxd5"
}, {
    fen: "rnbqkb1r/ppp2ppp/5n2/3pp3/4PP2/2NP4/PPP3PP/R1BQKBNR b KQkq - 0 4",
    eco: "C29",
    openingName: "Vienna gambit, Steinitz variation",
    moves: "1. e4 e5 2. Nc3 Nf6 3. f4 d5 4. d3"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq f3 0 2",
    eco: "C30",
    openingName: "King's gambit",
    moves: "1. e4 e5 2. f4"
}, {
    fen: "rnb1kbnr/ppppqppp/8/4p3/4PP2/6P1/PPPP3P/RNBQKBNR w KQkq - 1 4",
    eco: "C30",
    openingName: "KGD: Keene's defence",
    moves: "1. e4 e5 2. f4 Qh4+ 3. g3 Qe7"
}, {
    fen: "rnbqkbnr/pp1p1ppp/8/2p1p3/4PP2/8/PPPP2PP/RNBQKBNR w KQkq c6 0 3",
    eco: "C30",
    openingName: "KGD: Mafia defence",
    moves: "1. e4 e5 2. f4 c5"
}, {
    fen: "rnb1kbnr/pppp1ppp/5q2/4p3/4PP2/8/PPPP2PP/RNBQKBNR w KQkq - 1 3",
    eco: "C30",
    openingName: "KGD: Norwalde variation",
    moves: "1. e4 e5 2. f4 Qf6"
}, {
    fen: "rnb1k1nr/pppp1ppp/8/4p3/1bB1Pq2/2N2N2/PPPP2PP/R1BQK2R b KQkq - 3 5",
    eco: "C30",
    openingName: "KGD: Norwalde variation, Buecker gambit",
    moves: "1. e4 e5 2. f4 Qf6 3. Nf3 Qxf4 4. Nc3 Bb4 5. Bc4"
}, {
    fen: "rnbqk1nr/pppp1ppp/8/2b1p3/4PP2/8/PPPP2PP/RNBQKBNR w KQkq - 1 3",
    eco: "C30",
    openingName: "KGD: classical variation",
    moves: "1. e4 e5 2. f4 Bc5"
}, {
    fen: "r2qk2r/ppp2ppp/2np1n2/2b5/2B1Pp2/2NP1Q1P/PPP3P1/R1B1K2R w KQkq - 0 9",
    eco: "C30",
    openingName: "KGD: classical, Svenonius variation",
    moves: "1. e4 e5 2. f4 Bc5 3. Nf3 d6 4. Nc3 Nf6 5. Bc4 Nc6 6. d3 Bg4 7. h3 Bxf3 8. Qxf3 exf4"
}, {
    fen: "r1bqk1nr/pppn1ppp/3p4/2b1p3/4PP2/2N2N2/PPPP2PP/R1BQKB1R w KQkq - 2 5",
    eco: "C30",
    openingName: "KGD: classical, Hanham variation",
    moves: "1. e4 e5 2. f4 Bc5 3. Nf3 d6 4. Nc3 Nd7"
}, {
    fen: "rnbqk1nr/ppp2ppp/3p4/2b1p3/4PP2/2P2N2/PP1P2PP/RNBQKB1R b KQkq - 0 4",
    eco: "C30",
    openingName: "KGD: classical, 4.c3",
    moves: "1. e4 e5 2. f4 Bc5 3. Nf3 d6 4. c3"
}, {
    fen: "rn1qk1nr/ppp2ppp/8/2b1p3/Q3P1b1/2P2N2/PP1P2PP/RNB1KB1R b KQkq - 1 6",
    eco: "C30",
    openingName: "KGD: classical, Marshall attack",
    moves: "1. e4 e5 2. f4 Bc5 3. Nf3 d6 4. c3 Bg4 5. fxe5 dxe5 6. Qa4+"
}, {
    fen: "rnbqk1nr/ppp3pp/3p4/2b1pp2/4PP2/2P2N2/PP1P2PP/RNBQKB1R w KQkq f6 0 5",
    eco: "C30",
    openingName: "KGD: classical counter-gambit",
    moves: "1. e4 e5 2. f4 Bc5 3. Nf3 d6 4. c3 f5"
}, {
    fen: "rnbqk1nr/ppp3pp/8/2b2p2/2BpP3/2P2N2/PP4PP/RNBQK2R b KQkq - 1 7",
    eco: "C30",
    openingName: "KGD: classical, Reti variation",
    moves: "1. e4 e5 2. f4 Bc5 3. Nf3 d6 4. c3 f5 5. fxe5 dxe5 6. d4 exd4 7. Bc4"
}, {
    fen: "rnbqk1nr/ppp2ppp/3p4/2b1P3/4P3/5N2/PPPP2PP/RNBQKB1R b KQkq - 0 4",
    eco: "C30",
    openingName: "KGD: classical, Soldatenkov variation",
    moves: "1. e4 e5 2. f4 Bc5 3. Nf3 d6 4. fxe5"
}, {
    fen: "rnbqk1nr/ppp2ppp/3p4/2b1p3/1P2PP2/5N2/P1PP2PP/RNBQKB1R b KQkq b3 0 4",
    eco: "C30",
    openingName: "KGD: classical, Heath variation",
    moves: "1. e4 e5 2. f4 Bc5 3. Nf3 d6 4. b4"
}, {
    fen: "rnbqkb1r/pppp1ppp/5n2/4p3/4PP2/8/PPPP2PP/RNBQKBNR w KQkq - 1 3",
    eco: "C30",
    openingName: "KGD: 2...Nf6",
    moves: "1. e4 e5 2. f4 Nf6"
}, {
    fen: "rnbqkbnr/ppp2ppp/8/3pp3/4PP2/8/PPPP2PP/RNBQKBNR w KQkq d6 0 3",
    eco: "C31",
    openingName: "KGD: Falkbeer counter-gambit",
    moves: "1. e4 e5 2. f4 d5"
}, {
    fen: "rnbqkbnr/ppp2ppp/8/3pp3/4PP2/5N2/PPPP2PP/RNBQKB1R b KQkq - 1 3",
    eco: "C31",
    openingName: "KGD: Falkbeer, Tartakower variation",
    moves: "1. e4 e5 2. f4 d5 3. Nf3"
}, {
    fen: "rnbqkbnr/ppp2ppp/8/3pp3/4PP2/2N5/PPPP2PP/R1BQKBNR b KQkq - 1 3",
    eco: "C31",
    openingName: "KGD: Falkbeer, Milner-Barry variation",
    moves: "1. e4 e5 2. f4 d5 3. Nc3"
}, {
    fen: "rnbqkbnr/ppp2ppp/8/3Pp3/5P2/8/PPPP2PP/RNBQKBNR b KQkq - 0 3",
    eco: "C31",
    openingName: "KGD: Falkbeer counter-gambit",
    moves: "1. e4 e5 2. f4 d5 3. exd5"
}, {
    fen: "rnbqkbnr/pp3ppp/2p5/3Pp3/5P2/8/PPPP2PP/RNBQKBNR w KQkq - 0 4",
    eco: "C31",
    openingName: "KGD: Nimzovich counter-gambit",
    moves: "1. e4 e5 2. f4 d5 3. exd5 c6"
}, {
    fen: "rnbqkbnr/ppp2ppp/8/3P4/4pP2/8/PPPP2PP/RNBQKBNR w KQkq - 0 4",
    eco: "C31",
    openingName: "KGD: Falkbeer, 3...e4",
    moves: "1. e4 e5 2. f4 d5 3. exd5 e4"
}, {
    fen: "rnbqkb1r/ppp2ppp/5n2/3P4/4pP2/2N5/PPPPQ1PP/R1B1KBNR b KQkq - 3 5",
    eco: "C31",
    openingName: "KGD: Falkbeer, Rubinstein variation",
    moves: "1. e4 e5 2. f4 d5 3. exd5 e4 4. Nc3 Nf6 5. Qe2"
}, {
    fen: "rnbqkbnr/ppp2ppp/8/1B1P4/4pP2/8/PPPP2PP/RNBQK1NR b KQkq - 1 4",
    eco: "C31",
    openingName: "KGD: Falkbeer, Nimzovich variation",
    moves: "1. e4 e5 2. f4 d5 3. exd5 e4 4. Bb5+"
}, {
    fen: "rnbqkbnr/ppp2ppp/8/3P4/4pP2/3P4/PPP3PP/RNBQKBNR b KQkq - 0 4",
    eco: "C31",
    openingName: "KGD: Falkbeer, 4.d3",
    moves: "1. e4 e5 2. f4 d5 3. exd5 e4 4. d3"
}, {
    fen: "rnbqk2r/ppp2ppp/5n2/3P4/1b3P2/2NPp3/PPPB2PP/R2QKBNR w KQkq - 0 7",
    eco: "C31",
    openingName: "KGD: Falkbeer, Morphy gambit",
    moves: "1. e4 e5 2. f4 d5 3. exd5 e4 4. d3 Nf6 5. Nc3 Bb4 6. Bd2 e3"
}, {
    fen: "rnbqkb1r/ppp2ppp/5n2/3P4/4PP2/8/PPP3PP/RNBQKBNR b KQkq - 0 5",
    eco: "C32",
    openingName: "KGD: Falkbeer, 5.de",
    moves: "1. e4 e5 2. f4 d5 3. exd5 e4 4. d3 Nf6 5. dxe4"
}, {
    fen: "rnb1k2r/ppp2ppp/8/3q4/4nP2/8/PPPNQbPP/RNBK1B1R b kq - 1 9",
    eco: "C32",
    openingName: "KGD: Falkbeer, Alapin variation",
    moves: "1. e4 e5 2. f4 d5 3. exd5 e4 4. d3 Nf6 5. dxe4 Nxe4 6. Nf3 Bc5 7. Qe2 Bf2+ 8. Kd1 Qxd5+ 9. Nfd2"
}, {
    fen: "rn1qk2r/ppp2ppp/8/2bP1b2/4nP2/5N2/PPP1Q1PP/RNB1KB1R w KQkq - 4 8",
    eco: "C32",
    openingName: "KGD: Falkbeer, main line, 7...Bf5",
    moves: "1. e4 e5 2. f4 d5 3. exd5 e4 4. d3 Nf6 5. dxe4 Nxe4 6. Nf3 Bc5 7. Qe2 Bf5"
}, {
    fen: "rn1q1rk1/ppp2ppp/8/2bP1b2/4nPP1/5N2/PPP1Q2P/RNB1KB1R w KQ - 1 9",
    eco: "C32",
    openingName: "KGD: Falkbeer, Tarrasch variation",
    moves: "1. e4 e5 2. f4 d5 3. exd5 e4 4. d3 Nf6 5. dxe4 Nxe4 6. Nf3 Bc5 7. Qe2 Bf5 8. g4 O-O"
}, {
    fen: "rnbqkb1r/ppp2ppp/8/3P4/4nP2/8/PPP1Q1PP/RNB1KBNR b KQkq - 1 6",
    eco: "C32",
    openingName: "KGD: Falkbeer, Charousek gambit",
    moves: "1. e4 e5 2. f4 d5 3. exd5 e4 4. d3 Nf6 5. dxe4 Nxe4 6. Qe2"
}, {
    fen: "rnb1kb1r/ppp3pp/8/3q1p2/4nPP1/8/PPPNQ2P/R1B1KBNR b KQkq g3 0 8",
    eco: "C32",
    openingName: "KGD: Falkbeer, Charousek variation",
    moves: "1. e4 e5 2. f4 d5 3. exd5 e4 4. d3 Nf6 5. dxe4 Nxe4 6. Qe2 Qxd5 7. Nd2 f5 8. g4"
}, {
    fen: "rnbqkb1r/ppp2ppp/5n2/3P4/4pP2/3P4/PPPN2PP/R1BQKBNR b KQkq - 2 5",
    eco: "C32",
    openingName: "KGD: Falkbeer, Keres variation",
    moves: "1. e4 e5 2. f4 d5 3. exd5 e4 4. d3 Nf6 5. Nd2"
}, {
    fen: "rnbqkb1r/ppp2ppp/5n2/3P4/4pP2/3P4/PPP1Q1PP/RNB1KBNR b KQkq - 2 5",
    eco: "C32",
    openingName: "KGD: Falkbeer, Reti variation",
    moves: "1. e4 e5 2. f4 d5 3. exd5 e4 4. d3 Nf6 5. Qe2"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/8/4Pp2/8/PPPP2PP/RNBQKBNR w KQkq - 0 3",
    eco: "C33",
    openingName: "King's gambit accepted",
    moves: "1. e4 e5 2. f4 exf4"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/8/4Pp2/8/PPPP1KPP/RNBQ1BNR b kq - 1 3",
    eco: "C33",
    openingName: "KGA: Tumbleweed gambit",
    moves: "1. e4 e5 2. f4 exf4 3. Kf2"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/8/4Pp2/1P6/P1PP2PP/RNBQKBNR b KQkq - 0 3",
    eco: "C33",
    openingName: "KGA: Orsini gambit",
    moves: "1. e4 e5 2. f4 exf4 3. b3"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/8/4Pp1P/8/PPPP2P1/RNBQKBNR b KQkq h3 0 3",
    eco: "C33",
    openingName: "KGA: Pawn's gambit (Stamma gambit)",
    moves: "1. e4 e5 2. f4 exf4 3. h4"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/8/4Pp2/3B4/PPPP2PP/RNBQK1NR b KQkq - 1 3",
    eco: "C33",
    openingName: "KGA: Schurig gambit",
    moves: "1. e4 e5 2. f4 exf4 3. Bd3"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/8/4Pp2/8/PPPPQ1PP/RNB1KBNR b KQkq - 1 3",
    eco: "C33",
    openingName: "KGA: Carrera (Basman) gambit",
    moves: "1. e4 e5 2. f4 exf4 3. Qe2"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/8/3PPp2/8/PPP3PP/RNBQKBNR b KQkq d3 0 3",
    eco: "C33",
    openingName: "KGA: Villemson (Steinitz) gambit",
    moves: "1. e4 e5 2. f4 exf4 3. d4"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/8/4Pp2/2N5/PPPP2PP/R1BQKBNR b KQkq - 1 3",
    eco: "C33",
    openingName: "KGA: Keres (Mason-Steinitz) gambit",
    moves: "1. e4 e5 2. f4 exf4 3. Nc3"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/8/4Pp2/5Q2/PPPP2PP/RNB1KBNR b KQkq - 1 3",
    eco: "C33",
    openingName: "KGA: Breyer gambit",
    moves: "1. e4 e5 2. f4 exf4 3. Qf3"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/8/4Pp2/8/PPPPB1PP/RNBQK1NR b KQkq - 1 3",
    eco: "C33",
    openingName: "KGA: Lesser bishop's (Petroff-Jaenisch-Tartakower) gambit",
    moves: "1. e4 e5 2. f4 exf4 3. Be2"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/8/2B1Pp2/8/PPPP2PP/RNBQK1NR b KQkq - 1 3",
    eco: "C33",
    openingName: "KGA: bishop's gambit",
    moves: "1. e4 e5 2. f4 exf4 3. Bc4"
}, {
    fen: "rnb1kbnr/ppp2p1p/8/3B2p1/4Pp1q/6P1/PPPP3P/RNBQ1KNR b kq - 0 6",
    eco: "C33",
    openingName: "KGA: bishop's gambit, Gifford variation",
    moves: "1. e4 e5 2. f4 exf4 3. Bc4 d5 4. Bxd5 Qh4+ 5. Kf1 g5 6. g3"
}, {
    fen: "rnb1k1nr/pppp1ppp/8/2b5/2B1Pp1q/8/PPPP2PP/RNBQ1KNR w kq - 4 5",
    eco: "C33",
    openingName: "KGA: bishop's gambit, Greco variation",
    moves: "1. e4 e5 2. f4 exf4 3. Bc4 Qh4+ 4. Kf1 Bc5"
}, {
    fen: "rnb1kbnr/pppp1p1p/8/6p1/2B1Pp1q/8/PPPP2PP/RNBQ1KNR w kq g6 0 5",
    eco: "C33",
    openingName: "KGA: bishop's gambit, classical defence",
    moves: "1. e4 e5 2. f4 exf4 3. Bc4 Qh4+ 4. Kf1 g5"
}, {
    fen: "rnb1k1nr/ppp2pbp/3p4/4P1p1/2BP1p1q/2N5/PPP3PP/R1BQ1KNR b kq - 0 7",
    eco: "C33",
    openingName: "KGA: bishop's gambit, Grimm attack",
    moves: "1. e4 e5 2. f4 exf4 3. Bc4 Qh4+ 4. Kf1 g5 5. Nc3 Bg7 6. d4 d6 7. e5"
}, {
    fen: "rnb1k2r/ppppnpbp/8/6p1/2BPPp1q/2N5/PPP3PP/R1BQ1KNR w kq - 1 7",
    eco: "C33",
    openingName: "KGA: bishop's gambit, classical defence",
    moves: "1. e4 e5 2. f4 exf4 3. Bc4 Qh4+ 4. Kf1 g5 5. Nc3 Bg7 6. d4 Ne7"
}, {
    fen: "rnb1k2r/ppppnpbp/8/6p1/2BPPp1q/2N3P1/PPP4P/R1BQ1KNR b kq - 0 7",
    eco: "C33",
    openingName: "KGA: bishop's gambit, McDonnell attack",
    moves: "1. e4 e5 2. f4 exf4 3. Bc4 Qh4+ 4. Kf1 g5 5. Nc3 Bg7 6. d4 Ne7 7. g3"
}, {
    fen: "rnb1k1nr/pppp1pbp/8/6p1/2B1Pp1q/2N3P1/PPPP3P/R1BQ1KNR b kq - 0 6",
    eco: "C33",
    openingName: "KGA: bishop's gambit, McDonnell attack",
    moves: "1. e4 e5 2. f4 exf4 3. Bc4 Qh4+ 4. Kf1 g5 5. Nc3 Bg7 6. g3"
}, {
    fen: "rnb1k1nr/pppp1pbp/8/6p1/2B1P2q/2N2Qp1/PPPP3P/R1B2KNR b kq - 1 7",
    eco: "C33",
    openingName: "KGA: bishop's gambit, Fraser variation",
    moves: "1. e4 e5 2. f4 exf4 3. Bc4 Qh4+ 4. Kf1 g5 5. Nc3 Bg7 6. g3 fxg3 7. Qf3"
}, {
    fen: "rnb1kbnr/pppp1p1p/8/6p1/2B1Pp1q/5Q2/PPPP2PP/RNB2KNR b kq - 1 5",
    eco: "C33",
    openingName: "KGA: bishop's gambit, classical defence, Cozio attack",
    moves: "1. e4 e5 2. f4 exf4 3. Bc4 Qh4+ 4. Kf1 g5 5. Qf3"
}, {
    fen: "r1b1kbnr/pppp1ppp/2n5/8/2B1Pp1q/8/PPPP2PP/RNBQ1KNR w kq - 4 5",
    eco: "C33",
    openingName: "KGA: bishop's gambit, Boden defence",
    moves: "1. e4 e5 2. f4 exf4 3. Bc4 Qh4+ 4. Kf1 Nc6"
}, {
    fen: "rnb1kbnr/p1pp1ppp/8/1p6/2B1Pp1q/8/PPPP2PP/RNBQ1KNR w kq b6 0 5",
    eco: "C33",
    openingName: "KGA: bishop's gambit, Bryan counter-gambit",
    moves: "1. e4 e5 2. f4 exf4 3. Bc4 Qh4+ 4. Kf1 b5"
}, {
    fen: "rnbqkbnr/p1pp1ppp/8/1p6/2B1Pp2/8/PPPP2PP/RNBQK1NR w KQkq b6 0 4",
    eco: "C33",
    openingName: "KGA: bishop's gambit, Bryan counter-gambit",
    moves: "1. e4 e5 2. f4 exf4 3. Bc4 b5"
}, {
    fen: "rnbqkb1r/ppppnppp/8/8/2B1Pp2/8/PPPP2PP/RNBQK1NR w KQkq - 2 4",
    eco: "C33",
    openingName: "KGA: bishop's gambit, Steinitz defence",
    moves: "1. e4 e5 2. f4 exf4 3. Bc4 Ne7"
}, {
    fen: "r1bqkbnr/pppp1ppp/2n5/8/2B1Pp2/8/PPPP2PP/RNBQK1NR w KQkq - 2 4",
    eco: "C33",
    openingName: "KGA: bishop's gambit, Maurian defence",
    moves: "1. e4 e5 2. f4 exf4 3. Bc4 Nc6"
}, {
    fen: "rnbqkbnr/pp1p1ppp/2p5/8/2B1Pp2/8/PPPP2PP/RNBQK1NR w KQkq - 0 4",
    eco: "C33",
    openingName: "KGA: bishop's gambit, Ruy Lopez defence",
    moves: "1. e4 e5 2. f4 exf4 3. Bc4 c6"
}, {
    fen: "rnbqkbnr/pppp2pp/8/5p2/2B1Pp2/8/PPPP2PP/RNBQK1NR w KQkq f6 0 4",
    eco: "C33",
    openingName: "KGA: bishop's gambit, Lopez-Gianutio counter-gambit",
    moves: "1. e4 e5 2. f4 exf4 3. Bc4 f5"
}, {
    fen: "rnbk1bnr/pppp2pp/8/8/2B1pp1q/2N5/PPPPQ1PP/R1BK2NR w - - 2 7",
    eco: "C33",
    openingName: "KGA: Lopez-Gianutio counter-gambit, Hein variation",
    moves: "1. e4 e5 2. f4 exf4 3. Bc4 f5 4. Qe2 Qh4+ 5. Kd1 fxe4 6. Nc3 Kd8"
}, {
    fen: "rnbqkbnr/ppp2ppp/8/3p4/2B1Pp2/8/PPPP2PP/RNBQK1NR w KQkq d6 0 4",
    eco: "C33",
    openingName: "KGA: bishop's gambit, Bledow variation",
    moves: "1. e4 e5 2. f4 exf4 3. Bc4 d5"
}, {
    fen: "rnb1k1nr/ppp2ppp/3b4/3B4/4Pp1q/8/PPPP2PP/RNBQ1KNR w kq - 3 6",
    eco: "C33",
    openingName: "KGA: bishop's gambit, Boren-Svenonius variation",
    moves: "1. e4 e5 2. f4 exf4 3. Bc4 d5 4. Bxd5 Qh4+ 5. Kf1 Bd6"
}, {
    fen: "rnbqkbnr/pp3ppp/2p5/3B4/4Pp2/8/PPPP2PP/RNBQK1NR w KQkq - 0 5",
    eco: "C33",
    openingName: "KGA: bishop's gambit, Anderssen variation",
    moves: "1. e4 e5 2. f4 exf4 3. Bc4 d5 4. Bxd5 c6"
}, {
    fen: "rnbqkb1r/ppp2ppp/5n2/3B4/4Pp2/8/PPPP2PP/RNBQK1NR w KQkq - 1 5",
    eco: "C33",
    openingName: "KGA: bishop's gambit, Morphy variation",
    moves: "1. e4 e5 2. f4 exf4 3. Bc4 d5 4. Bxd5 Nf6"
}, {
    fen: "rnbqkb1r/pppp1ppp/5n2/8/2B1Pp2/8/PPPP2PP/RNBQK1NR w KQkq - 2 4",
    eco: "C33",
    openingName: "KGA: bishop's gambit, Cozio (Morphy) defence",
    moves: "1. e4 e5 2. f4 exf4 3. Bc4 Nf6"
}, {
    fen: "rnbqkb1r/pppp1ppp/5n2/8/2B1Pp2/2N5/PPPP2PP/R1BQK1NR b KQkq - 3 4",
    eco: "C33",
    openingName: "KGA: bishop's gambit, Bogolyubov variation",
    moves: "1. e4 e5 2. f4 exf4 3. Bc4 Nf6 4. Nc3"
}, {
    fen: "rnbqk2r/pppp1ppp/5n2/4P3/1bB2p2/2N5/PPPP2PP/R1BQK1NR b KQkq - 0 5",
    eco: "C33",
    openingName: "KGA: bishop's gambit, Paulsen attack",
    moves: "1. e4 e5 2. f4 exf4 3. Bc4 Nf6 4. Nc3 Bb4 5. e5"
}, {
    fen: "rnbqkb1r/pp1p1ppp/2p2n2/8/2B1Pp2/2N5/PPPP2PP/R1BQK1NR w KQkq - 0 5",
    eco: "C33",
    openingName: "KGA: bishop's gambit, Jaenisch variation",
    moves: "1. e4 e5 2. f4 exf4 3. Bc4 Nf6 4. Nc3 c6"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/8/4Pp2/5N2/PPPP2PP/RNBQKB1R b KQkq - 1 3",
    eco: "C34",
    openingName: "King's knight's gambit",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3"
}, {
    fen: "rnbqkb1r/ppppnppp/8/8/4Pp2/5N2/PPPP2PP/RNBQKB1R w KQkq - 2 4",
    eco: "C34",
    openingName: "KGA: Bonsch-Osmolovsky variation",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 Ne7"
}, {
    fen: "rnbqkbnr/pppp2pp/8/5p2/4Pp2/5N2/PPPP2PP/RNBQKB1R w KQkq f6 0 4",
    eco: "C34",
    openingName: "KGA: Gianutio counter-gambit",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 f5"
}, {
    fen: "rnbqkbnr/ppp2ppp/3p4/8/4Pp2/5N2/PPPP2PP/RNBQKB1R w KQkq - 0 4",
    eco: "C34",
    openingName: "KGA: Fischer defence",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 d6"
}, {
    fen: "rnbqkbnr/pppp1pp1/7p/8/4Pp2/5N2/PPPP2PP/RNBQKB1R w KQkq - 0 4",
    eco: "C34",
    openingName: "KGA: Becker defence",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 h6"
}, {
    fen: "rnbqkb1r/pppp1ppp/5n2/8/4Pp2/5N2/PPPP2PP/RNBQKB1R w KQkq - 2 4",
    eco: "C34",
    openingName: "KGA: Schallop defence",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 Nf6"
}, {
    fen: "rnbqk1nr/ppppbppp/8/8/4Pp2/5N2/PPPP2PP/RNBQKB1R w KQkq - 2 4",
    eco: "C35",
    openingName: "KGA: Cunningham defence",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 Be7"
}, {
    fen: "rnbqk1nr/pppp1ppp/8/8/2B1Pp1b/5NP1/PPPP3P/RNBQK2R b KQkq - 0 5",
    eco: "C35",
    openingName: "KGA: Cunningham, Bertin gambit",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 Be7 4. Bc4 Bh4+ 5. g3"
}, {
    fen: "rnbqk1nr/pppp1ppp/8/8/2B1P2b/5N2/PPPP3p/RNBQ1R1K b kq - 1 7",
    eco: "C35",
    openingName: "KGA: Cunningham, three pawns gambit",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 Be7 4. Bc4 Bh4+ 5. g3 fxg3 6. O-O gxh2+ 7. Kh1"
}, {
    fen: "rnbqk2r/ppppbppp/5n2/8/2B1Pp2/5N2/PPPP2PP/RNBQK2R w KQkq - 4 5",
    eco: "C35",
    openingName: "KGA: Cunningham, Euwe defence",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 Be7 4. Bc4 Nf6"
}, {
    fen: "rnbqkbnr/ppp2ppp/8/3p4/4Pp2/5N2/PPPP2PP/RNBQKB1R w KQkq d6 0 4",
    eco: "C36",
    openingName: "KGA: Abbazia defence (classical defence, modern defence[!])",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 d5"
}, {
    fen: "rnbqkb1r/ppp2ppp/5n2/3P4/5p2/5N2/PPPP2PP/RNBQKB1R w KQkq - 1 5",
    eco: "C36",
    openingName: "KGA: Abbazia defence, modern variation",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 d5 4. exd5 Nf6"
}, {
    fen: "rnbqkb1r/p4ppp/2p5/3n4/2B2p2/5N2/PPPP2PP/RNBQK2R w KQkq - 2 8",
    eco: "C36",
    openingName: "KGA: Abbazia defence, Botvinnik variation",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 d5 4. exd5 Nf6 5. Bb5+ c6 6. dxc6 bxc6 7. Bc4 Nd5"
}, {
    fen: "rnbqkbnr/pppp1p1p/8/6p1/4Pp2/2N2N2/PPPP2PP/R1BQKB1R b KQkq - 1 4",
    eco: "C37",
    openingName: "KGA: Quaade gambit",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. Nc3"
}, {
    fen: "rnbqkbnr/pppp1p1p/8/6p1/3PPp2/5N2/PPP3PP/RNBQKB1R b KQkq d3 0 4",
    eco: "C37",
    openingName: "KGA: Rosentreter gambit",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. d4"
}, {
    fen: "rnbqkbnr/pppp1p1p/8/4N3/3PPpp1/8/PPP3PP/RNBQKB1R b KQkq - 1 5",
    eco: "C37",
    openingName: "KGA: Soerensen gambit",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. d4 g4 5. Ne5"
}, {
    fen: "rnbqkbnr/pppp1p1p/8/6p1/2B1Pp2/5N2/PPPP2PP/RNBQK2R b KQkq - 1 4",
    eco: "C37",
    openingName: "KGA: King's knight's gambit",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. Bc4"
}, {
    fen: "r1bqkbnr/pppp1p1p/2n5/6p1/2B1Pp2/5N2/PPPP2PP/RNBQK2R w KQkq - 2 5",
    eco: "C37",
    openingName: "KGA: Blachly gambit",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. Bc4 Nc6"
}, {
    fen: "rnbqkbnr/pppp1B1p/8/8/4Ppp1/5N2/PPPP2PP/RNBQK2R b KQkq - 0 5",
    eco: "C37",
    openingName: "KGA: Lolli gambit (wild Muzio gambit)",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. Bc4 g4 5. Bxf7+"
}, {
    fen: "rnb2bnr/pppp1k1p/5q2/8/4Pp2/2N1BQ2/PPP3PP/R4RK1 b - - 3 10",
    eco: "C37",
    openingName: "KGA: Lolli gambit, Young variation",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. Bc4 g4 5. Bxf7+ Kxf7 6. O-O gxf3 7. Qxf3 Qf6 8. d4 Qxd4+ 9. Be3 Qf6 10. Nc3"
}, {
    fen: "rnbqkbnr/pppp1p1p/8/8/2BPPpp1/5N2/PPP3PP/RNBQK2R b KQkq d3 0 5",
    eco: "C37",
    openingName: "KGA: Ghulam Kassim gambit",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. Bc4 g4 5. d4"
}, {
    fen: "rnbqkbnr/pppp1p1p/8/8/2B1Ppp1/2N2N2/PPPP2PP/R1BQK2R b KQkq - 1 5",
    eco: "C37",
    openingName: "KGA: MacDonnell gambit",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. Bc4 g4 5. Nc3"
}, {
    fen: "rnbqkbnr/pppp1p1p/8/4N3/2B1Ppp1/8/PPPP2PP/RNBQK2R b KQkq - 1 5",
    eco: "C37",
    openingName: "KGA: Salvio gambit",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. Bc4 g4 5. Ne5"
}, {
    fen: "rnb1kb1r/pppp1p1p/7n/4N3/2BPP1pq/5p2/PPP3PP/RNBQ1K1R w kq - 0 8",
    eco: "C37",
    openingName: "KGA: Silberschmidt gambit",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. Bc4 g4 5. Ne5 Qh4+ 6. Kf1 Nh6 7. d4 f3"
}, {
    fen: "rnb1kb1r/ppp2p1p/3p3n/4N3/2BPPppq/8/PPP3PP/RNBQ1K1R w kq - 0 8",
    eco: "C37",
    openingName: "KGA: Salvio gambit, Anderssen counter-attack",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. Bc4 g4 5. Ne5 Qh4+ 6. Kf1 Nh6 7. d4 d6"
}, {
    fen: "rnb1kbnr/pppp1p1p/8/4N3/2B1P1pq/5p2/PPPP2PP/RNBQ1K1R w kq - 0 7",
    eco: "C37",
    openingName: "KGA: Cochrane gambit",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. Bc4 g4 5. Ne5 Qh4+ 6. Kf1 f3"
}, {
    fen: "r1b1kbnr/pppp1p1p/2n5/4N3/2B1Pppq/8/PPPP2PP/RNBQ1K1R w kq - 4 7",
    eco: "C37",
    openingName: "KGA: Herzfeld gambit",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. Bc4 g4 5. Ne5 Qh4+ 6. Kf1 Nc6"
}, {
    fen: "rnbqkbnr/pppp1p1p/8/8/2B1Ppp1/5N2/PPPP2PP/RNBQ1RK1 b kq - 1 5",
    eco: "C37",
    openingName: "KGA: Muzio gambit",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. Bc4 g4 5. O-O"
}, {
    fen: "r1b1k2r/ppppnp1p/2n4b/4q3/2B2p2/2NP1Q2/PPPB2PP/4RRK1 b kq - 6 11",
    eco: "C37",
    openingName: "KGA: Muzio gambit, Paulsen variation",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. Bc4 g4 5. O-O gxf3 6. Qxf3 Qf6 7. e5 Qxe5 8. d3 Bh6 9. Nc3 Ne7 10. Bd2 Nbc6 11. Rae1"
}, {
    fen: "rnb1kbnr/pppp1B1p/8/4q3/5p2/5Q2/PPPP2PP/RNB2RK1 b kq - 0 8",
    eco: "C37",
    openingName: "KGA: double Muzio gambit",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. Bc4 g4 5. O-O gxf3 6. Qxf3 Qf6 7. e5 Qxe5 8. Bxf7+"
}, {
    fen: "rnb1kbnr/ppppqp1p/8/8/2B1Pp2/5Q2/PPPP2PP/RNB2RK1 w kq - 1 7",
    eco: "C37",
    openingName: "KGA: Muzio gambit, From defence",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. Bc4 g4 5. O-O gxf3 6. Qxf3 Qe7"
}, {
    fen: "r1bqkbnr/pppp1p1p/2n5/8/2B1Pp2/5Q2/PPPP2PP/RNB2RK1 w kq - 1 7",
    eco: "C37",
    openingName: "KGA: Muzio gambit, Holloway defence",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. Bc4 g4 5. O-O gxf3 6. Qxf3 Nc6"
}, {
    fen: "rnb1kbnr/ppppqp1p/8/8/2B1Ppp1/5N2/PPPP2PP/RNBQ1RK1 w kq - 2 6",
    eco: "C37",
    openingName: "KGA: Muzio gambit, Kling and Horwitz counter-attack",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. Bc4 g4 5. O-O Qe7"
}, {
    fen: "rnbqkbnr/ppp2p1p/8/3p4/2B1Ppp1/5N2/PPPP2PP/RNBQ1RK1 w kq d6 0 6",
    eco: "C37",
    openingName: "KGA: Muzio gambit, Brentano defence",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. Bc4 g4 5. O-O d5"
}, {
    fen: "rnbqk1nr/pppp1pbp/8/6p1/2B1Pp2/5N2/PPPP2PP/RNBQK2R w KQkq - 2 5",
    eco: "C38",
    openingName: "King's knight's gambit",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. Bc4 Bg7"
}, {
    fen: "rnbqk1nr/pppp1pbp/8/6p1/2B1Pp2/5N2/PPPP2PP/RNBQ1RK1 b kq - 3 5",
    eco: "C38",
    openingName: "KGA: Hanstein gambit",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. Bc4 Bg7 5. O-O"
}, {
    fen: "rnbqk1nr/pppp1pbp/8/6p1/2B1Pp1P/5N2/PPPP2P1/RNBQK2R b KQkq h3 0 5",
    eco: "C38",
    openingName: "KGA: Philidor gambit",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. Bc4 Bg7 5. h4"
}, {
    fen: "rnbqk1nb/pp3p2/2pp4/4N1p1/2BPPp2/2N5/PPP3P1/R1BQK3 b Qq - 1 10",
    eco: "C38",
    openingName: "KGA: Greco gambit",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. Bc4 Bg7 5. h4 h6 6. d4 d6 7. Nc3 c6 8. hxg5 hxg5 9. Rxh8 Bxh8 10. Ne5"
}, {
    fen: "rnbqk1nr/ppp2pb1/3p3p/6p1/2BPPp1P/3Q1N2/PPP3P1/RNB1K2R b KQkq - 1 7",
    eco: "C38",
    openingName: "KGA: Philidor gambit, Schultz variation",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. Bc4 Bg7 5. h4 h6 6. d4 d6 7. Qd3"
}, {
    fen: "rnbqkbnr/pppp1p1p/8/6p1/4Pp1P/5N2/PPPP2P1/RNBQKB1R b KQkq h3 0 4",
    eco: "C39",
    openingName: "King's knight's gambit",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4"
}, {
    fen: "rnbqkbnr/pppp1p1p/8/6N1/4PppP/8/PPPP2P1/RNBQKB1R b KQkq - 1 5",
    eco: "C39",
    openingName: "KGA: Allgaier gambit",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ng5"
}, {
    fen: "rnbq3r/pppp1k2/3b1n1p/8/4PQ1P/8/PPPP2P1/RNB1KB1R w KQ - 1 9",
    eco: "C39",
    openingName: "KGA: Allgaier, Horny defence",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ng5 h6 6. Nxf7 Kxf7 7. Qxg4 Nf6 8. Qxf4 Bd6"
}, {
    fen: "rnbq1bnr/pppp1k2/7p/8/3PPppP/8/PPP3P1/RNBQKB1R b KQ d3 0 7",
    eco: "C39",
    openingName: "KGA: Allgaier, Thorold variation",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ng5 h6 6. Nxf7 Kxf7 7. d4"
}, {
    fen: "rnbq1bnr/ppp3k1/7p/4B3/2BPp1pP/8/PPP3P1/RN1QK2R b KQ - 3 10",
    eco: "C39",
    openingName: "KGA: Allgaier, Cook variation",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ng5 h6 6. Nxf7 Kxf7 7. d4 d5 8. Bxf4 dxe4 9. Bc4+ Kg7 10. Be5+"
}, {
    fen: "rnbq1bnr/pppp1k2/7p/8/4PppP/2N5/PPPP2P1/R1BQKB1R b KQ - 1 7",
    eco: "C39",
    openingName: "KGA: Allgaier, Blackburne gambit",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ng5 h6 6. Nxf7 Kxf7 7. Nc3"
}, {
    fen: "rnbq1bnr/pppp1k2/7p/8/2B1PppP/8/PPPP2P1/RNBQK2R b KQ - 1 7",
    eco: "C39",
    openingName: "KGA: Allgaier, Walker attack",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ng5 h6 6. Nxf7 Kxf7 7. Bc4+"
}, {
    fen: "rnbq1bnr/ppp3k1/7p/3B4/3PPppP/8/PPP3P1/RNBQK2R b KQ d3 0 9",
    eco: "C39",
    openingName: "KGA: Allgaier, Urusov attack",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ng5 h6 6. Nxf7 Kxf7 7. Bc4+ d5 8. Bxd5+ Kg7 9. d4"
}, {
    fen: "rnbqkb1r/pppp1p1p/5n2/6N1/4PppP/8/PPPP2P1/RNBQKB1R w KQkq - 2 6",
    eco: "C39",
    openingName: "KGA: Allgaier, Schlechter defence",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ng5 Nf6"
}, {
    fen: "rnbqk1nr/pppp1pbp/8/4N3/4PppP/8/PPPP2P1/RNBQKB1R w KQkq - 2 6",
    eco: "C39",
    openingName: "KGA: Kieseritsky, Paulsen defence",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ne5 Bg7"
}, {
    fen: "rnbqkbnr/pppp1p2/8/4N2p/4PppP/8/PPPP2P1/RNBQKB1R w KQkq h6 0 6",
    eco: "C39",
    openingName: "KGA: Kieseritsky, long whip (Stockwhip, classical) defence",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ne5 h5"
}, {
    fen: "rnbqk1n1/pppp1p1r/7b/4N2p/2BPPppP/2N5/PPP3P1/R1BQK2R b KQq - 2 8",
    eco: "C39",
    openingName: "KGA: Kieseritsky, long whip defence, Jaenisch variation",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ne5 h5 6. Bc4 Rh7 7. d4 Bh6 8. Nc3"
}, {
    fen: "rnbqkbnr/ppp2p1p/8/3pN3/4PppP/8/PPPP2P1/RNBQKB1R w KQkq d6 0 6",
    eco: "C39",
    openingName: "KGA: Kieseritsky, Brentano (Campbell) defence",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ne5 d5"
}, {
    fen: "rnb1k2r/ppp2p1p/5n2/3qN3/1b1P1ppP/2N5/PPP2KP1/R1BQ1B1R b kq - 3 9",
    eco: "C39",
    openingName: "KGA: Kieseritsky, Brentano defence, Kaplanek variation",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ne5 d5 6. d4 Nf6 7. exd5 Qxd5 8. Nc3 Bb4 9. Kf2"
}, {
    fen: "rnbqkb1r/ppp2p1p/5n2/3pN3/3PPBpP/8/PPP3P1/RN1QKB1R b KQkq - 0 7",
    eco: "C39",
    openingName: "KGA: Kieseritsky, Brentano defence",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ne5 d5 6. d4 Nf6 7. Bxf4"
}, {
    fen: "rnbqkb1r/ppp2p1p/8/3pN3/3PnBpP/8/PPPN2P1/R2QKB1R b KQkq - 1 8",
    eco: "C39",
    openingName: "KGA: Kieseritsky, Brentano defence, Caro variation",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ne5 d5 6. d4 Nf6 7. Bxf4 Nxe4 8. Nd2"
}, {
    fen: "rnb1kbnr/ppppqp1p/8/4N3/4PppP/8/PPPP2P1/RNBQKB1R w KQkq - 2 6",
    eco: "C39",
    openingName: "KGA: Kieseritsky, Salvio (Rosenthal) defence",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ne5 Qe7"
}, {
    fen: "rnb1kbnr/ppppq2p/8/4Np2/2BPPppP/8/PPP3P1/RNBQK2R b KQkq - 1 7",
    eco: "C39",
    openingName: "KGA: Kieseritsky, Salvio defence, Cozio variation",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ne5 Qe7 6. d4 f5 7. Bc4"
}, {
    fen: "rnbqk1nr/ppppbp1p/8/4N3/4PppP/8/PPPP2P1/RNBQKB1R w KQkq - 2 6",
    eco: "C39",
    openingName: "KGA: Kieseritsky, Polerio defence",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ne5 Be7"
}, {
    fen: "r1bqkbnr/pppp1p1p/2n5/4N3/4PppP/8/PPPP2P1/RNBQKB1R w KQkq - 2 6",
    eco: "C39",
    openingName: "KGA: Kieseritsky, Neumann defence",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ne5 Nc6"
}, {
    fen: "rnbqkbnr/ppp2p1p/3p4/4N3/4PppP/8/PPPP2P1/RNBQKB1R w KQkq - 0 6",
    eco: "C39",
    openingName: "KGA: Kieseritsky, Kolisch defence",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ne5 d6"
}, {
    fen: "rnbqkb1r/pppp1p1p/5n2/4N3/4PppP/8/PPPP2P1/RNBQKB1R w KQkq - 2 6",
    eco: "C39",
    openingName: "KGA: Kieseritsky, Berlin defence",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ne5 Nf6"
}, {
    fen: "rnbqkb1r/ppp2p1p/5n2/3p4/4PpNP/8/PPPP2P1/RNBQKB1R w KQkq d6 0 7",
    eco: "C39",
    openingName: "KGA: Kieseritsky, Berlin defence, Riviere variation",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ne5 Nf6 6. Nxg4 d5"
}, {
    fen: "rnbqkb1r/pppp1p1p/5n2/4N3/2B1PppP/8/PPPP2P1/RNBQK2R b KQkq - 3 6",
    eco: "C39",
    openingName: "KGA: Kieseritsky, Berlin defence, 6.Bc4",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ne5 Nf6 6. Bc4"
}, {
    fen: "rnbqk2r/ppp2p1p/3b1n2/3PN3/2B2ppP/8/PPPP2P1/RNBQ1RK1 b kq - 2 8",
    eco: "C39",
    openingName: "KGA: Kieseritsky, Rice gambit",
    moves: "1. e4 e5 2. f4 exf4 3. Nf3 g5 4. h4 g4 5. Ne5 Nf6 6. Bc4 d5 7. exd5 Bd6 8. O-O"
}, {
    fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2",
    eco: "C40",
    openingName: "King's knight opening",
    moves: "1. e4 e5 2. Nf3"
}, {
    fen: "rnb1kbnr/ppppqppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
    eco: "C40",
    openingName: "Gunderam defence",
    moves: "1. e4 e5 2. Nf3 Qe7"
}, {
    fen: "rnb1kbnr/pppp1ppp/5q2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
    eco: "C40",
    openingName: "Greco defence",
    moves: "1. e4 e5 2. Nf3 Qf6"
}, {
    fen: "rnbqkbnr/pppp2pp/5p2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3",
    eco: "C40",
    openingName: "Damiano's defence",
    moves: "1. e4 e5 2. Nf3 f6"
}, {
    fen: "rnbqkbnr/ppp2ppp/8/3pp3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq d6 0 3",
    eco: "C40",
    openingName: "QP counter-gambit (elephant gambit)",
    moves: "1. e4 e5 2. Nf3 d5"
}, {
    fen: "rnbqk1nr/ppp2ppp/3b4/3Pp3/8/5N2/PPPP1PPP/RNBQKB1R w KQkq - 1 4",
    eco: "C40",
    openingName: "QP counter-gambit: Maroczy gambit",
    moves: "1. e4 e5 2. Nf3 d5 3. exd5 Bd6"
}, {
    fen: "rnbqkbnr/pppp2pp/8/4pp2/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq f6 0 3",
    eco: "C40",
    openingName: "Latvian counter-gambit",
    moves: "1. e4 e5 2. Nf3 f5"
}, {
    fen: "rnb1kbnr/ppp3pp/3p1q2/8/3Pp3/4N3/PPP2PPP/RNBQKB1R b KQkq - 1 6",
    eco: "C40",
    openingName: "Latvian: Nimzovich variation",
    moves: "1. e4 e5 2. Nf3 f5 3. Nxe5 Qf6 4. d4 d6 5. Nc4 fxe4 6. Ne3"
}, {
    fen: "r1bqkbnr/pppp2pp/2n5/4Np2/4P3/8/PPPP1PPP/RNBQKB1R w KQkq - 1 4",
    eco: "C40",
    openingName: "Latvian: Fraser defence",
    moves: "1. e4 e5 2. Nf3 f5 3. Nxe5 Nc6"
}, {
    fen: "rnbqkbnr/pppp2pp/8/4pp2/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 1 3",
    eco: "C40",
    openingName: "Latvian gambit, 3.Bc4",
    moves: "1. e4 e5 2. Nf3 f5 3. Bc4"
}, {
    fen: "rnb1kb1N/ppp3pp/5n2/3p4/2B1p3/8/PPPP1PqP/RNBQKR2 w Qq - 1 8",
    eco: "C40",
    openingName: "Latvian: Behting variation",
    moves: "1. e4 e5 2. Nf3 f5 3. Bc4 fxe4 4. Nxe5 Qg5 5. Nf7 Qxg2 6. Rf1 d5 7. Nxh8 Nf6"
}, {
    fen: "rnbqkbnr/ppp3pp/8/3pN3/2B1p3/8/PPPP1PPP/RNBQK2R w KQkq d6 0 5",
    eco: "C40",
    openingName: "Latvian: Polerio variation",
    moves: "1. e4 e5 2. Nf3 f5 3. Bc4 fxe4 4. Nxe5 d5"
}, {
    fen: "rnbqkb1r/pppp2pp/5n2/4N3/2B1p3/8/PPPP1PPP/RNBQK2R w KQkq - 1 5",
    eco: "C40",
    openingName: "Latvian: corkscrew counter-gambit",
    moves: "1. e4 e5 2. Nf3 f5 3. Bc4 fxe4 4. Nxe5 Nf6"
}, {
    fen: "rnbqkbnr/ppp2ppp/3p4/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 3",
    eco: "C41",
    openingName: "Philidor's defence",
    moves: "1. e4 e5 2. Nf3 d6"
}, {
    fen: "rnbqk1nr/ppp1bppp/3p4/4p3/2B1P3/2P2N2/PP1P1PPP/RNBQK2R b KQkq - 0 4",
    eco: "C41",
    openingName: "Philidor: Steinitz variation",
    moves: "1. e4 e5 2. Nf3 d6 3. Bc4 Be7 4. c3"
}, {
    fen: "rnbqkbnr/ppp3pp/3p4/4pp2/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq f6 0 4",
    eco: "C41",
    openingName: "Philidor: Lopez counter-gambit",
    moves: "1. e4 e5 2. Nf3 d6 3. Bc4 f5"
}, {
    fen: "rnbqkb1r/ppp3pN/3p3n/5p2/2BpP3/8/PPP2PPP/RNBQK2R b KQkq - 0 6",
    eco: "C41",
    openingName: "Philidor: Lopez counter-gambit, Jaenisch variation",
    moves: "1. e4 e5 2. Nf3 d6 3. Bc4 f5 4. d4 exd4 5. Ng5 Nh6 6. Nxh7"
}, {
    fen: "rnbqkbnr/ppp2ppp/3p4/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq d3 0 3",
    eco: "C41",
    openingName: "Philidor's defence",
    moves: "1. e4 e5 2. Nf3 d6 3. d4"
}, {
    fen: "rnbqkbnr/ppp3pp/3p4/4pp2/3PP3/5N2/PPP2PPP/RNBQKB1R w KQkq f6 0 4",
    eco: "C41",
    openingName: "Philidor: Philidor counter-gambit",
    moves: "1. e4 e5 2. Nf3 d6 3. d4 f5"
}, {
    fen: "rnbqkbnr/ppp3pp/4P3/3p2N1/4p3/8/PPP2PPP/RNBQKB1R b KQkq - 0 6",
    eco: "C41",
    openingName: "Philidor: Philidor counter-gambit, del Rio attack",
    moves: "1. e4 e5 2. Nf3 d6 3. d4 f5 4. dxe5 fxe4 5. Ng5 d5 6. e6"
}, {
    fen: "rnbqk1nr/ppp3pp/4P3/2bp2N1/4p3/2N5/PPP2PPP/R1BQKB1R b KQkq - 2 7",
    eco: "C41",
    openingName: "Philidor: Philidor counter-gambit, Berger variation",
    moves: "1. e4 e5 2. Nf3 d6 3. d4 f5 4. dxe5 fxe4 5. Ng5 d5 6. e6 Bc5 7. Nc3"
}, {
    fen: "rnbqkbnr/ppp3pp/3p4/4pp2/3PP3/2N2N2/PPP2PPP/R1BQKB1R b KQkq - 1 4",
    eco: "C41",
    openingName: "Philidor: Philidor counter-gambit, Zukertort variation",
    moves: "1. e4 e5 2. Nf3 d6 3. d4 f5 4. Nc3"
}, {
    fen: "rnbqkbnr/ppp2ppp/3p4/8/3pP3/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 4",
    eco: "C41",
    openingName: "Philidor: exchange variation",
    moves: "1. e4 e5 2. Nf3 d6 3. d4 exd4"
}, {
    fen: "rn1qkbnr/pppb1ppp/3p4/8/3QP3/5N2/PPP2PPP/RNB1KB1R w KQkq - 1 5",
    eco: "C41",
    openingName: "Philidor: Boden variation",
    moves: "1. e4 e5 2. Nf3 d6 3. d4 exd4 4. Qxd4 Bd7"
}, {
    fen: "rnbqkbnr/ppp2ppp/3p4/8/3NP3/8/PPP2PPP/RNBQKB1R b KQkq - 0 4",
    eco: "C41",
    openingName: "Philidor: exchange variation",
    moves: "1. e4 e5 2. Nf3 d6 3. d4 exd4 4. Nxd4"
}, {
    fen: "rnbqkbnr/ppp2ppp/8/3P4/3N4/8/PPP2PPP/RNBQKB1R b KQkq - 0 5",
    eco: "C41",
    openingName: "Philidor: Paulsen attack",
    moves: "1. e4 e5 2. Nf3 d6 3. d4 exd4 4. Nxd4 d5 5. exd5"
}, {
    fen: "rnbqkb1r/ppp2ppp/3p1n2/8/3NP3/8/PPP2PPP/RNBQKB1R w KQkq - 1 5",
    eco: "C41",
    openingName: "Philidor: exchange variation",
    moves: "1. e4 e5 2. Nf3 d6 3. d4 exd4 4. Nxd4 Nf6"
}, {
    fen: "r2q1rk1/pp2bppp/2npbn2/2p3B1/4P3/2N2N2/PPP1BPPP/R2QR1K1 b - - 5 10",
    eco: "C41",
    openingName: "Philidor: Berger variation",
    moves: "1. e4 e5 2. Nf3 d6 3. d4 exd4 4. Nxd4 Nf6 5. Nc3 Be7 6. Be2 O-O 7. O-O c5 8. Nf3 Nc6 9. Bg5 Be6 10. Re1"
}, {
    fen: "rnbqkbnr/ppp2p1p/3p2p1/8/3NP3/8/PPP2PPP/RNBQKB1R w KQkq - 0 5",
    eco: "C41",
    openingName: "Philidor: Larsen variation",
    moves: "1. e4 e5 2. Nf3 d6 3. d4 exd4 4. Nxd4 g6"
}, {
    fen: "rnbqkb1r/ppp2ppp/3p1n2/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R w KQkq - 1 4",
    eco: "C41",
    openingName: "Philidor: Nimzovich (Jaenisch) variation",
    moves: "1. e4 e5 2. Nf3 d6 3. d4 Nf6"
}, {
    fen: "r1bqkb1r/pppn1ppp/3p1n2/4p3/3PP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 3 5",
    eco: "C41",
    openingName: "Philidor: Improved Hanham variation",
    moves: "1. e4 e5 2. Nf3 d6 3. d4 Nf6 4. Nc3 Nbd7"
}, {
    fen: "r1bq1rk1/pp1nbppp/2pp1n2/8/P1BpP3/2N2N2/1PP1QPPP/R1B2RK1 w - - 0 9",
    eco: "C41",
    openingName: "Philidor: Nimzovich, Sozin variation",
    moves: "1. e4 e5 2. Nf3 d6 3. d4 Nf6 4. Nc3 Nbd7 5. Bc4 Be7 6. O-O O-O 7. Qe2 c6 8. a4 exd4"
}, {
    fen: "r1bq1rk1/pppnbBpp/3p1n2/4p1N1/3PP3/2N5/PPP2PPP/R1BQK2R b KQ - 0 7",
    eco: "C41",
    openingName: "Philidor: Nimzovich, Larobok variation",
    moves: "1. e4 e5 2. Nf3 d6 3. d4 Nf6 4. Nc3 Nbd7 5. Bc4 Be7 6. Ng5 O-O 7. Bxf7+"
}, {
    fen: "rnbqkb1r/ppp2ppp/3p1n2/4P3/4P3/5N2/PPP2PPP/RNBQKB1R b KQkq - 0 4",
    eco: "C41",
    openingName: "Philidor: Nimzovich variation",
    moves: "1. e4 e5 2. Nf3 d6 3. d4 Nf6 4. dxe5"
}, {
    fen: "rnbqkb1r/ppp2ppp/3p4/4P3/4n3/5N2/PPPN1PPP/R1BQKB1R b KQkq - 1 5",
    eco: "C41",
    openingName: "Philidor: Nimzovich, Sokolsky variation",
    moves: "1. e4 e5 2. Nf3 d6 3. d4 Nf6 4. dxe5 Nxe4 5. Nbd2"
}, {
    fen: "rnbqkb1r/ppp2ppp/3p4/3QP3/4n3/5N2/PPP2PPP/RNB1KB1R b KQkq - 1 5",
    eco: "C41",
    openingName: "Philidor: Nimzovich, Rellstab variation",
    moves: "1. e4 e5 2. Nf3 d6 3. d4 Nf6 4. dxe5 Nxe4 5. Qd5"
}, {
    fen: "rnbqkb1r/ppp2ppp/3p1n2/4p1N1/3PP3/8/PPP2PPP/RNBQKB1R b KQkq - 2 4",
    eco: "C41",
    openingName: "Philidor: Nimzovich, Locock variation",
    moves: "1. e4 e5 2. Nf3 d6 3. d4 Nf6 4. Ng5"
}, {
    fen: "rnbqkb1r/ppp2ppp/3p1n2/4p3/2BPP3/5N2/PPP2PPP/RNBQK2R b KQkq - 2 4",
    eco: "C41",
    openingName: "Philidor: Nimzovich, Klein variation",
    moves: "1. e4 e5 2. Nf3 d6 3. d4 Nf6 4. Bc4"
}, {
    fen: "r1bqkbnr/pppn1ppp/3p4/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R w KQkq - 1 4",
    eco: "C41",
    openingName: "Philidor: Hanham variation",
    moves: "1. e4 e5 2. Nf3 d6 3. d4 Nd7"
}, {
    fen: "r1bqkbnr/pp1n1ppp/2pp4/4p3/2BPP3/5N2/PPP2PPP/RNBQ1RK1 b kq - 1 5",
    eco: "C41",
    openingName: "Philidor: Hanham, Krause variation",
    moves: "1. e4 e5 2. Nf3 d6 3. d4 Nd7 4. Bc4 c6 5. O-O"
}, {
    fen: "r1bqk1nr/pp1nbppp/2pp4/4P3/2B1P3/5N2/PPP2PPP/RNBQ1RK1 b kq - 0 6",
    eco: "C41",
    openingName: "Philidor: Hanham, Steiner variation",
    moves: "1. e4 e5 2. Nf3 d6 3. d4 Nd7 4. Bc4 c6 5. O-O Be7 6. dxe5"
}, {
    fen: "r1bqkbnr/pp1n1ppp/2pp4/4p1N1/2BPP3/8/PPP2PPP/RNBQK2R b KQkq - 1 5",
    eco: "C41",
    openingName: "Philidor: Hanham, Kmoch variation",
    moves: "1. e4 e5 2. Nf3 d6 3. d4 Nd7 4. Bc4 c6 5. Ng5"
}, {
    fen: "r1bq1rk1/pp1nbppp/2p4n/3pp1N1/2BPPP2/2P5/PP4PP/RNBQ1RK1 w - - 0 9",
    eco: "C41",
    openingName: "Philidor: Hanham, Berger variation",
    moves: "1. e4 e5 2. Nf3 d6 3. d4 Nd7 4. Bc4 c6 5. Ng5 Nh6 6. f4 Be7 7. O-O O-O 8. c3 d5"
}, {
    fen: "r1bqkbnr/pp1n1ppp/2pp4/4p3/2BPP3/2N2N2/PPP2PPP/R1BQK2R b KQkq - 1 5",
    eco: "C41",
    openingName: "Philidor: Hanham, Schlechter variation",
    moves: "1. e4 e5 2. Nf3 d6 3. d4 Nd7 4. Bc4 c6 5. Nc3"
}, {
    fen: "r1bqkbnr/pp1n1ppp/2pp4/4p3/2BPP3/2P2N2/PP3PPP/RNBQK2R b KQkq - 0 5",
    eco: "C41",
    openingName: "Philidor: Hanham, Delmar variation",
    moves: "1. e4 e5 2. Nf3 d6 3. d4 Nd7 4. Bc4 c6 5. c3"
}, {
    fen: "rnbqkb1r/pppp1ppp/5n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
    eco: "C42",
    openingName: "Petrov's defence",
    moves: "1. e4 e5 2. Nf3 Nf6"
}, {
    fen: "rnbqkb1r/ppp2ppp/3p4/8/4n3/3P1N2/PPP2PPP/RNBQKB1R b KQkq - 0 5",
    eco: "C42",
    openingName: "Petrov: French attack",
    moves: "1. e4 e5 2. Nf3 Nf6 3. Nxe5 d6 4. Nf3 Nxe4 5. d3"
}, {
    fen: "rnbqkb1r/ppp2ppp/3p4/8/2P1n3/5N2/PP1P1PPP/RNBQKB1R b KQkq c3 0 5",
    eco: "C42",
    openingName: "Petrov: Kaufmann attack",
    moves: "1. e4 e5 2. Nf3 Nf6 3. Nxe5 d6 4. Nf3 Nxe4 5. c4"
}, {
    fen: "rnbqkb1r/ppp2ppp/3p4/8/4n3/2N2N2/PPPP1PPP/R1BQKB1R b KQkq - 1 5",
    eco: "C42",
    openingName: "Petrov: Nimzovich attack",
    moves: "1. e4 e5 2. Nf3 Nf6 3. Nxe5 d6 4. Nf3 Nxe4 5. Nc3"
}, {
    fen: "rnbqkb1r/ppp2ppp/3p4/8/4n3/5N2/PPPPQPPP/RNB1KB1R b KQkq - 1 5",
    eco: "C42",
    openingName: "Petrov: Cozio (Lasker) attack",
    moves: "1. e4 e5 2. Nf3 Nf6 3. Nxe5 d6 4. Nf3 Nxe4 5. Qe2"
}, {
    fen: "rnbqkb1r/ppp2ppp/3p4/8/3Pn3/5N2/PPP2PPP/RNBQKB1R b KQkq d3 0 5",
    eco: "C42",
    openingName: "Petrov: classical attack",
    moves: "1. e4 e5 2. Nf3 Nf6 3. Nxe5 d6 4. Nf3 Nxe4 5. d4"
}, {
    fen: "r1bqk2r/ppp1bppp/2n5/3p4/3Pn3/3B1N2/PPP2PPP/RNBQR1K1 b kq - 5 8",
    eco: "C42",
    openingName: "Petrov: classical attack, Chigorin variation",
    moves: "1. e4 e5 2. Nf3 Nf6 3. Nxe5 d6 4. Nf3 Nxe4 5. d4 d5 6. Bd3 Be7 7. O-O Nc6 8. Re1"
}, {
    fen: "r2qk2r/ppp1b1pp/2n5/3p1p2/3Pn1b1/2PB1N2/PP1N1PPP/R1BQR1K1 b kq - 1 10",
    eco: "C42",
    openingName: "Petrov: classical attack, Berger variation",
    moves: "1. e4 e5 2. Nf3 Nf6 3. Nxe5 d6 4. Nf3 Nxe4 5. d4 d5 6. Bd3 Be7 7. O-O Nc6 8. Re1 Bg4 9. c3 f5 10. Nbd2"
}, {
    fen: "r2qk2r/ppp1b1pp/2n5/3p1p2/2PPn1b1/3B1N2/PP3PPP/RNBQR1K1 b kq - 0 10",
    eco: "C42",
    openingName: "Petrov: classical attack, Krause variation",
    moves: "1. e4 e5 2. Nf3 Nf6 3. Nxe5 d6 4. Nf3 Nxe4 5. d4 d5 6. Bd3 Be7 7. O-O Nc6 8. Re1 Bg4 9. c3 f5 10. c4"
}, {
    fen: "r2qk2r/ppp3pp/2n5/3p1p2/2PPn1bb/3B1N2/PP3PPP/RNBQR1K1 w kq - 1 11",
    eco: "C42",
    openingName: "Petrov: classical attack, Maroczy variation",
    moves: "1. e4 e5 2. Nf3 Nf6 3. Nxe5 d6 4. Nf3 Nxe4 5. d4 d5 6. Bd3 Be7 7. O-O Nc6 8. Re1 Bg4 9. c3 f5 10. c4 Bh4"
}, {
    fen: "r1bqk2r/ppp1bppp/2n5/3p4/2PPn3/3B1N2/PP3PPP/RNBQ1RK1 b kq c3 0 8",
    eco: "C42",
    openingName: "Petrov: classical attack, Jaenisch variation",
    moves: "1. e4 e5 2. Nf3 Nf6 3. Nxe5 d6 4. Nf3 Nxe4 5. d4 d5 6. Bd3 Be7 7. O-O Nc6 8. c4"
}, {
    fen: "rnbq1rk1/ppp1bppp/8/3p4/3Pn3/3B1N2/PPP2PPP/RNBQ1RK1 w - - 4 8",
    eco: "C42",
    openingName: "Petrov: classical attack, Mason variation",
    moves: "1. e4 e5 2. Nf3 Nf6 3. Nxe5 d6 4. Nf3 Nxe4 5. d4 d5 6. Bd3 Be7 7. O-O O-O"
}, {
    fen: "rnbqk2r/ppp2ppp/3b4/3p4/3Pn3/3B1N2/PPP2PPP/RNBQK2R w KQkq - 2 7",
    eco: "C42",
    openingName: "Petrov: classical attack, Marshall variation",
    moves: "1. e4 e5 2. Nf3 Nf6 3. Nxe5 d6 4. Nf3 Nxe4 5. d4 d5 6. Bd3 Bd6"
}, {
    fen: "rn1q1rk1/ppp2ppp/3b4/3p4/2PPn1b1/3B1N2/PP3PPP/RNBQ1RK1 w - - 1 9",
    eco: "C42",
    openingName: "Petrov: classical attack, Tarrasch variation",
    moves: "1. e4 e5 2. Nf3 Nf6 3. Nxe5 d6 4. Nf3 Nxe4 5. d4 d5 6. Bd3 Bd6 7. O-O O-O 8. c4 Bg4"
}, {
    fen: "rn1q1rk1/ppp3pp/8/3P1p2/3Pn1b1/3B1N2/PP3PPb/RNBQR1K1 w - - 0 11",
    eco: "C42",
    openingName: "Petrov: classical attack, Marshall trap",
    moves: "1. e4 e5 2. Nf3 Nf6 3. Nxe5 d6 4. Nf3 Nxe4 5. d4 d5 6. Bd3 Bd6 7. O-O O-O 8. c4 Bg4 9. cxd5 f5 10. Re1 Bxh2+"
}, {
    fen: "rnbqkb1r/ppp2ppp/3p1n2/8/3P4/5N2/PPP2PPP/RNBQKB1R w KQkq - 1 6",
    eco: "C42",
    openingName: "Petrov: classical attack, close variation",
    moves: "1. e4 e5 2. Nf3 Nf6 3. Nxe5 d6 4. Nf3 Nxe4 5. d4 Nf6"
}, {
    fen: "rnbqkb1r/ppp2Npp/3p1n2/8/4P3/8/PPPP1PPP/RNBQKB1R b KQkq - 0 4",
    eco: "C42",
    openingName: "Petrov: Cochrane gambit",
    moves: "1. e4 e5 2. Nf3 Nf6 3. Nxe5 d6 4. Nxf7"
}, {
    fen: "rnbqkb1r/ppp2ppp/3p1n2/8/2N1P3/8/PPPP1PPP/RNBQKB1R b KQkq - 1 4",
    eco: "C42",
    openingName: "Petrov: Paulsen attack",
    moves: "1. e4 e5 2. Nf3 Nf6 3. Nxe5 d6 4. Nc4"
}, {
    fen: "rnbqkb1r/pppp1ppp/8/4N3/4n3/8/PPPP1PPP/RNBQKB1R w KQkq - 0 4",
    eco: "C42",
    openingName: "Petrov: Damiano variation",
    moves: "1. e4 e5 2. Nf3 Nf6 3. Nxe5 Nxe4"
}, {
    fen: "rnbqkb1r/pppp1ppp/5n2/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R b KQkq - 3 3",
    eco: "C42",
    openingName: "Petrov three knights game",
    moves: "1. e4 e5 2. Nf3 Nf6 3. Nc3"
}, {
    fen: "rnbqkb1r/pppp1ppp/5n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
    eco: "C42",
    openingName: "Petrov: Italian variation",
    moves: "1. e4 e5 2. Nf3 Nf6 3. Bc4"
}, {
    fen: "rnbqkb1r/pppp1ppp/5n2/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq d3 0 3",
    eco: "C43",
    openingName: "Petrov: modern (Steinitz) attack",
    moves: "1. e4 e5 2. Nf3 Nf6 3. d4"
}, {
    fen: "rnbqkb1r/pppp1ppp/8/4P3/3Qn3/5N2/PPP2PPP/RNB1KB1R b KQkq - 0 5",
    eco: "C43",
    openingName: "Petrov: modern attack, main line",
    moves: "1. e4 e5 2. Nf3 Nf6 3. d4 exd4 4. e5 Ne4 5. Qxd4"
}, {
    fen: "rnbqkb1r/pppp1ppp/8/4P3/3pn3/5N2/PPP1QPPP/RNB1KB1R b KQkq - 2 5",
    eco: "C43",
    openingName: "Petrov: modern attack, Steinitz variation",
    moves: "1. e4 e5 2. Nf3 Nf6 3. d4 exd4 4. e5 Ne4 5. Qe2"
}, {
    fen: "r1bqkb1r/pppp1ppp/2n5/2n1P3/3N4/8/PPP1QPPP/RNB1KB1R w KQkq - 1 7",
    eco: "C43",
    openingName: "Petrov: modern attack, Bardeleben variation",
    moves: "1. e4 e5 2. Nf3 Nf6 3. d4 exd4 4. e5 Ne4 5. Qe2 Nc5 6. Nxd4 Nc6"
}, {
    fen: "rnbqkb1r/pppp1ppp/8/4p3/3Pn3/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 4",
    eco: "C43",
    openingName: "Petrov: modern attack, Symmetrical variation",
    moves: "1. e4 e5 2. Nf3 Nf6 3. d4 Nxe4"
}, {
    fen: "rnbq1rk1/ppp2ppp/8/3pb3/2PPn3/3B4/PP3PPP/RNBQ1RK1 w - - 0 8",
    eco: "C43",
    openingName: "Petrov: modern attack, Trifunovic variation",
    moves: "1. e4 e5 2. Nf3 Nf6 3. d4 Nxe4 4. Bd3 d5 5. Nxe5 Bd6 6. O-O O-O 7. c4 Bxe5"
}, {
    fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
    eco: "C44",
    openingName: "King's pawn game",
    moves: "1. e4 e5 2. Nf3 Nc6"
}, {
    fen: "r1bqkbnr/pppp1ppp/8/4n3/3PP3/8/PPP2PPP/RNBQKB1R b KQkq d3 0 4",
    eco: "C44",
    openingName: "Irish (Chicago) gambit",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nxe5 Nxe5 4. d4"
}, {
    fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5NP1/PPPP1P1P/RNBQKB1R b KQkq - 0 3",
    eco: "C44",
    openingName: "Konstantinopolsky opening",
    moves: "1. e4 e5 2. Nf3 Nc6 3. g3"
}, {
    fen: "r1bqkbnr/pppp1ppp/2n5/4p3/2P1P3/5N2/PP1P1PPP/RNBQKB1R b KQkq c3 0 3",
    eco: "C44",
    openingName: "Dresden opening",
    moves: "1. e4 e5 2. Nf3 Nc6 3. c4"
}, {
    fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPPBPPP/RNBQK2R b KQkq - 3 3",
    eco: "C44",
    openingName: "Inverted Hungarian",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Be2"
}, {
    fen: "r1bqkb1r/ppp2ppp/2n2n2/3pp3/4P3/3P1N2/PPPNBPPP/R1BQK2R b KQkq - 1 5",
    eco: "C44",
    openingName: "Inverted Hanham",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Be2 Nf6 4. d3 d5 5. Nbd2"
}, {
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/3PP3/5N2/PPP1BPPP/RNBQK2R b KQkq d3 0 4",
    eco: "C44",
    openingName: "Tayler opening",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Be2 Nf6 4. d4"
}, {
    fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/2P2N2/PP1P1PPP/RNBQKB1R b KQkq - 0 3",
    eco: "C44",
    openingName: "Ponziani opening",
    moves: "1. e4 e5 2. Nf3 Nc6 3. c3"
}, {
    fen: "r2qkbnr/pppb1ppp/2n5/3pp3/Q3P3/2P2N2/PP1P1PPP/RNB1KB1R w KQkq - 2 5",
    eco: "C44",
    openingName: "Ponziani: Caro variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. c3 d5 4. Qa4 Bd7"
}, {
    fen: "r1bqkb1r/ppp2ppp/2n2n2/3pp3/Q3P3/2P2N2/PP1P1PPP/RNB1KB1R w KQkq - 2 5",
    eco: "C44",
    openingName: "Ponziani: Leonhardt variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. c3 d5 4. Qa4 Nf6"
}, {
    fen: "r1bqkbnr/ppp3pp/2n2p2/3pp3/Q3P3/2P2N2/PP1P1PPP/RNB1KB1R w KQkq - 0 5",
    eco: "C44",
    openingName: "Ponziani: Steinitz variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. c3 d5 4. Qa4 f6"
}, {
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/2P2N2/PP1P1PPP/RNBQKB1R w KQkq - 1 4",
    eco: "C44",
    openingName: "Ponziani: Jaenisch counter-attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. c3 Nf6"
}, {
    fen: "r1bqk2r/pppp1ppp/2n5/2bPp3/4n3/2P2N2/PP3PPP/RNBQKB1R w KQkq - 1 6",
    eco: "C44",
    openingName: "Ponziani: Fraser defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. c3 Nf6 4. d4 Nxe4 5. d5 Bc5"
}, {
    fen: "r1bqkb1r/ppppnppp/2n5/4p3/4P3/2P2N2/PP1P1PPP/RNBQKB1R w KQkq - 1 4",
    eco: "C44",
    openingName: "Ponziani: Reti variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. c3 Nge7"
}, {
    fen: "r1bqk1nr/ppppbppp/2n5/4p3/4P3/2P2N2/PP1P1PPP/RNBQKB1R w KQkq - 1 4",
    eco: "C44",
    openingName: "Ponziani: Romanishin variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. c3 Be7"
}, {
    fen: "r1bqkbnr/pppp2pp/2n5/4pp2/4P3/2P2N2/PP1P1PPP/RNBQKB1R w KQkq f6 0 4",
    eco: "C44",
    openingName: "Ponziani counter-gambit",
    moves: "1. e4 e5 2. Nf3 Nc6 3. c3 f5"
}, {
    fen: "r1bqkbnr/ppp3pp/2np4/3Ppp2/4P3/2P2N2/PP3PPP/RNBQKB1R b KQkq - 0 5",
    eco: "C44",
    openingName: "Ponziani counter-gambit, Schmidt attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. c3 f5 4. d4 d6 5. d5"
}, {
    fen: "rnbqk2r/ppp1b1pp/3p1n2/3Pp3/4N3/2PB4/PP3PPP/RNBQK2R w KQkq - 3 9",
    eco: "C44",
    openingName: "Ponziani counter-gambit, Cordel variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. c3 f5 4. d4 d6 5. d5 fxe4 6. Ng5 Nb8 7. Nxe4 Nf6 8. Bd3 Be7"
}, {
    fen: "r1bqkbnr/pppp1ppp/2n5/4p3/3PP3/5N2/PPP2PPP/RNBQKB1R b KQkq d3 0 3",
    eco: "C44",
    openingName: "Scotch opening",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4"
}, {
    fen: "r1bqkbnr/pppp1ppp/8/4p3/3nP3/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 4",
    eco: "C44",
    openingName: "Scotch: Lolli variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 Nxd4"
}, {
    fen: "r1bqkb1r/pp1p1Npp/2p1nn2/8/2B1P3/8/PPP2PPP/RNBQ1RK1 b kq - 0 7",
    eco: "C44",
    openingName: "Scotch: Cochrane variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 Nxd4 4. Nxe5 Ne6 5. Bc4 c6 6. O-O Nf6 7. Nxf7"
}, {
    fen: "r1bqkbnr/pppp1ppp/2n5/1B6/3pP3/5N2/PPP2PPP/RNBQK2R b KQkq - 1 4",
    eco: "C44",
    openingName: "Scotch: Relfsson gambit ('MacLopez')",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Bb5"
}, {
    fen: "r1bqkbnr/pppp1ppp/2n5/8/3pP3/2P2N2/PP3PPP/RNBQKB1R b KQkq - 0 4",
    eco: "C44",
    openingName: "Scotch: Goering gambit",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. c3"
}, {
    fen: "r2q1bnr/ppp1kBpp/3p4/3NN3/4P3/8/PP3PPP/R1Bb1RK1 b - - 2 10",
    eco: "C44",
    openingName: "Scotch: Sea-cadet mate",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. c3 dxc3 5. Nxc3 d6 6. Bc4 Bg4 7. O-O Ne5 8. Nxe5 Bxd1 9. Bxf7+ Ke7 10. Nd5#"
}, {
    fen: "r1bqk1nr/pppp1ppp/2n5/8/1b2P3/2N2N2/PP3PPP/R1BQKB1R w KQkq - 1 6",
    eco: "C44",
    openingName: "Scotch: Goering gambit",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. c3 dxc3 5. Nxc3 Bb4"
}, {
    fen: "r1bqk2r/pppp1ppp/2n2n2/8/1bB1P3/2N2N2/PP3PPP/R1BQK2R w KQkq - 3 7",
    eco: "C44",
    openingName: "Scotch: Goering gambit, Bardeleben variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. c3 dxc3 5. Nxc3 Bb4 6. Bc4 Nf6"
}, {
    fen: "r1bqkbnr/pppp1ppp/2n5/8/2BpP3/5N2/PPP2PPP/RNBQK2R b KQkq - 1 4",
    eco: "C44",
    openingName: "Scotch gambit",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Bc4"
}, {
    fen: "r2qk1nr/ppp2ppp/2np4/2b5/2BpP1b1/2P2N2/PP3PPP/RNBQ1RK1 w kq - 1 7",
    eco: "C44",
    openingName: "Scotch gambit: Anderssen (Paulsen, Suhle) counter-attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Bc4 Bc5 5. O-O d6 6. c3 Bg4"
}, {
    fen: "r1bqk1nr/pppp1ppp/2n5/2b3N1/2BpP3/8/PPP2PPP/RNBQK2R b KQkq - 3 5",
    eco: "C44",
    openingName: "Scotch gambit",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Bc4 Bc5 5. Ng5"
}, {
    fen: "r1bq3r/ppp2k1p/2n3p1/2Qp4/3pP3/8/PPP2PPP/RNB1K2R w KQ d6 0 10",
    eco: "C44",
    openingName: "Scotch gambit: Cochrane-Shumov defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Bc4 Bc5 5. Ng5 Nh6 6. Nxf7 Nxf7 7. Bxf7+ Kxf7 8. Qh5+ g6 9. Qxc5 d5"
}, {
    fen: "r1bqk2r/pppp1ppp/2n4n/2b3NQ/2BpP3/8/PPP2PPP/RNB1K2R b KQkq - 5 6",
    eco: "C44",
    openingName: "Scotch gambit: Vitzhum attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Bc4 Bc5 5. Ng5 Nh6 6. Qh5"
}, {
    fen: "r1bqk1nr/pppp1ppp/2n5/8/1bBpP3/5N2/PPP2PPP/RNBQK2R w KQkq - 2 5",
    eco: "C44",
    openingName: "Scotch gambit",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Bc4 Bb4+"
}, {
    fen: "r1bq1rk1/pppp1ppp/5n2/4n1N1/1bB5/8/PB3PPP/RN1Q1RK1 w - - 0 10",
    eco: "C44",
    openingName: "Scotch gambit: Hanneken variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Bc4 Bb4+ 5. c3 dxc3 6. O-O cxb2 7. Bxb2 Nf6 8. Ng5 O-O 9. e5 Nxe5"
}, {
    fen: "r1bqk1nr/pppp1ppp/2n5/8/1bB1P3/2P2N2/P4PPP/RNBQK2R b KQkq - 0 6",
    eco: "C44",
    openingName: "Scotch gambit",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Bc4 Bb4+ 5. c3 dxc3 6. bxc3"
}, {
    fen: "r1bqk1nr/pppp1ppp/2n5/b3P3/2B5/2P2N2/P4PPP/RNBQK2R b KQkq - 0 7",
    eco: "C44",
    openingName: "Scotch gambit: Cochrane variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Bc4 Bb4+ 5. c3 dxc3 6. bxc3 Ba5 7. e5"
}, {
    fen: "r1bqk1nr/ppppbppp/2n5/8/2BpP3/5N2/PPP2PPP/RNBQK2R w KQkq - 2 5",
    eco: "C44",
    openingName: "Scotch gambit: Benima defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Bc4 Be7"
}, {
    fen: "r1bqkb1r/pppp1ppp/2n2n2/8/2BpP3/5N2/PPP2PPP/RNBQK2R w KQkq - 2 5",
    eco: "C44",
    openingName: "Scotch gambit: Dubois-Reti defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Bc4 Nf6"
}, {
    fen: "r1bqkbnr/pppp1ppp/2n5/8/3NP3/8/PPP2PPP/RNBQKB1R b KQkq - 0 4",
    eco: "C45",
    openingName: "Scotch game",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4"
}, {
    fen: "r1bqkbnr/ppp2ppp/3p4/8/3QP3/3B4/PPP2PPP/RNB1K2R b KQkq - 1 6",
    eco: "C45",
    openingName: "Scotch: Ghulam Kassim variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4 Nxd4 5. Qxd4 d6 6. Bd3"
}, {
    fen: "r1b1kbnr/pppp1ppp/2n5/8/3NP2q/8/PPP2PPP/RNBQKB1R w KQkq - 1 5",
    eco: "C45",
    openingName: "Scotch: Pulling counter-attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4 Qh4"
}, {
    fen: "r1b1kbnr/pppp1ppp/2n5/1N6/4P2q/8/PPP2PPP/RNBQKB1R b KQkq - 2 5",
    eco: "C45",
    openingName: "Scotch: Horwitz attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4 Qh4 5. Nb5"
}, {
    fen: "N1bk3r/pp1p1ppp/2n2n2/8/1b6/P4B1q/1PPN1P1P/R1BQK2R b KQ - 0 11",
    eco: "C45",
    openingName: "Scotch: Berger variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4 Qh4 5. Nb5 Bb4+ 6. Nd2 Qxe4+ 7. Be2 Qxg2 8. Bf3 Qh3 9. Nxc7+ Kd8 10. Nxa8 Nf6 11. a3"
}, {
    fen: "r1b1k1nr/pppp1ppp/2n5/1N6/1b2P2q/8/PPPB1PPP/RN1QKB1R b KQkq - 4 6",
    eco: "C45",
    openingName: "Scotch game",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4 Qh4 5. Nb5 Bb4+ 6. Bd2"
}, {
    fen: "r1bk2nr/pppp1ppp/2n3q1/1N6/8/8/PPPNBPPP/R2Q1RK1 w - - 1 10",
    eco: "C45",
    openingName: "Scotch: Rosenthal variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4 Qh4 5. Nb5 Bb4+ 6. Bd2 Qxe4+ 7. Be2 Kd8 8. O-O Bxd2 9. Nxd2 Qg6"
}, {
    fen: "r1b1kbnr/pppp1ppp/2n5/8/4P2q/5N2/PPP2PPP/RNBQKB1R b KQkq - 2 5",
    eco: "C45",
    openingName: "Scotch: Fraser attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4 Qh4 5. Nf3"
}, {
    fen: "r1b1kbnr/pppp1ppp/2n5/8/3NP2q/2N5/PPP2PPP/R1BQKB1R b KQkq - 2 5",
    eco: "C45",
    openingName: "Scotch: Steinitz variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4 Qh4 5. Nc3"
}, {
    fen: "r1bqkb1r/pppp1ppp/2n2n2/8/3NP3/8/PPP2PPP/RNBQKB1R w KQkq - 1 5",
    eco: "C45",
    openingName: "Scotch: Schmidt variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4 Nf6"
}, {
    fen: "r1bqkb1r/p1pp1ppp/2p2n2/4P3/8/8/PPP2PPP/RNBQKB1R b KQkq - 0 6",
    eco: "C45",
    openingName: "Scotch: Mieses variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4 Nf6 5. Nxc6 bxc6 6. e5"
}, {
    fen: "r1bqkb1r/p1pp1ppp/2p2n2/8/4P3/8/PPPN1PPP/R1BQKB1R b KQkq - 1 6",
    eco: "C45",
    openingName: "Scotch: Tartakower variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4 Nf6 5. Nxc6 bxc6 6. Nd2"
}, {
    fen: "r1bqk1nr/pppp1ppp/2n5/2b5/3NP3/8/PPP2PPP/RNBQKB1R w KQkq - 1 5",
    eco: "C45",
    openingName: "Scotch game",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4 Bc5"
}, {
    fen: "r1b1k2r/ppppnppp/2n2q2/2b5/3NP3/2P1B3/PP1Q1PPP/RN2KB1R b KQkq - 2 7",
    eco: "C45",
    openingName: "Scotch: Blackburne attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4 Bc5 5. Be3 Qf6 6. c3 Nge7 7. Qd2"
}, {
    fen: "1rb2rk1/pp3ppp/5q2/3P4/1n6/2P1Q3/PP3PPP/RN2KB1R w KQ - 1 13",
    eco: "C45",
    openingName: "Scotch: Gottschall variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4 Bc5 5. Be3 Qf6 6. c3 Nge7 7. Qd2 d5 8. Nb5 Bxe3 9. Qxe3 O-O 10. Nxc7 Rb8 11. Nxd5 Nxd5 12. exd5 Nb4"
}, {
    fen: "r1b1k2r/ppppnppp/2n2q2/1Bb5/3NP3/2P1B3/PP3PPP/RN1QK2R b KQkq - 2 7",
    eco: "C45",
    openingName: "Scotch: Paulsen attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4 Bc5 5. Be3 Qf6 6. c3 Nge7 7. Bb5"
}, {
    fen: "r1bnk2r/ppppnppp/5q2/1Bb5/3NP3/2P1B3/PP3PPP/RN1QK2R w KQkq - 3 8",
    eco: "C45",
    openingName: "Scotch: Paulsen, Gunsberg defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4 Bc5 5. Be3 Qf6 6. c3 Nge7 7. Bb5 Nd8"
}, {
    fen: "r1b1k2r/ppppnppp/2n2q2/2b5/4P3/2P1B3/PPN2PPP/RN1QKB1R b KQkq - 2 7",
    eco: "C45",
    openingName: "Scotch: Meitner variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4 Bc5 5. Be3 Qf6 6. c3 Nge7 7. Nc2"
}, {
    fen: "r1b1k1nr/pppp1ppp/2n2q2/1Nb5/4P3/4B3/PPP2PPP/RN1QKB1R b KQkq - 4 6",
    eco: "C45",
    openingName: "Scotch: Blumenfeld attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4 Bc5 5. Be3 Qf6 6. Nb5"
}, {
    fen: "r1bqk1nr/pppp1ppp/2n5/2b5/4P3/1N6/PPP2PPP/RNBQKB1R b KQkq - 2 5",
    eco: "C45",
    openingName: "Scotch: Potter variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4 Bc5 5. Nb3"
}, {
    fen: "r1bqk1nr/pppp1ppp/2n5/8/1b2P3/1N6/PPP2PPP/RNBQKB1R w KQkq - 3 6",
    eco: "C45",
    openingName: "Scotch: Romanishin variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. d4 exd4 4. Nxd4 Bc5 5. Nb3 Bb4+"
}, {
    fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R b KQkq - 3 3",
    eco: "C46",
    openingName: "Three knights game",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3"
}, {
    fen: "r1bqk2r/pppp1ppp/2n2n2/3Np3/1b2P3/5N2/PPPP1PPP/R1BQKB1R w KQkq - 6 5",
    eco: "C46",
    openingName: "Three knights: Schlechter variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 Bb4 4. Nd5 Nf6"
}, {
    fen: "r1bqkbnr/pppp2pp/2n5/4pp2/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq f6 0 4",
    eco: "C46",
    openingName: "Three knights: Winawer defence (Gothic defence)",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 f5"
}, {
    fen: "r1bqkbnr/pppp1p1p/2n3p1/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 0 4",
    eco: "C46",
    openingName: "Three knights: Steinitz variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 g6"
}, {
    fen: "r1bqkbnr/pppp1p1p/2n3p1/3N4/3pP3/5N2/PPP2PPP/R1BQKB1R b KQkq - 1 5",
    eco: "C46",
    openingName: "Three knights: Steinitz, Rosenthal variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 g6 4. d4 exd4 5. Nd5"
}, {
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 4 4",
    eco: "C46",
    openingName: "Four knights game",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6"
}, {
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4N3/4P3/2N5/PPPP1PPP/R1BQKB1R b KQkq - 0 4",
    eco: "C46",
    openingName: "Four knights: Schultze-Mueller gambit",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Nxe5"
}, {
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R b KQkq - 5 4",
    eco: "C46",
    openingName: "Four knights: Italian variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Bc4"
}, {
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/P1N2N2/1PPP1PPP/R1BQKB1R b KQkq - 0 4",
    eco: "C46",
    openingName: "Four knights: Gunsberg variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. a3"
}, {
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/3PP3/2N2N2/PPP2PPP/R1BQKB1R b KQkq d3 0 4",
    eco: "C47",
    openingName: "Four knights: Scotch variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. d4"
}, {
    fen: "r1bqk2r/pppp1ppp/2n2n2/4N3/1b1PP3/2N5/PPP2PPP/R1BQKB1R b KQkq - 0 5",
    eco: "C47",
    openingName: "Four knights: Scotch, Krause variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. d4 Bb4 5. Nxe5"
}, {
    fen: "r1bqkb1r/pppp1ppp/2n2n2/8/3pP3/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 0 5",
    eco: "C47",
    openingName: "Four knights: Scotch, 4...exd4",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. d4 exd4"
}, {
    fen: "r1bqkb1r/pppp1ppp/2n2n2/3N4/3pP3/5N2/PPP2PPP/R1BQKB1R b KQkq - 1 5",
    eco: "C47",
    openingName: "Four knights: Belgrade gambit",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. d4 exd4 5. Nd5"
}, {
    fen: "r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/2N2N2/PPPP1PPP/R1BQK2R b KQkq - 5 4",
    eco: "C48",
    openingName: "Four knights: Spanish variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Bb5"
}, {
    fen: "r1bqkb1r/1ppp1ppp/p1B2n2/4p3/4P3/2N2N2/PPPP1PPP/R1BQK2R b KQkq - 0 5",
    eco: "C48",
    openingName: "Four knights: Ranken variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Bb5 a6 5. Bxc6"
}, {
    fen: "r3kb1r/1pp2ppp/p1p1b3/3q4/3PN3/8/PPP2PPP/R1BQR1K1 w kq - 1 11",
    eco: "C48",
    openingName: "Four knights: Spielmann variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Bb5 a6 5. Bxc6 dxc6 6. Nxe5 Nxe4 7. Nxe4 Qd4 8. O-O Qxe5 9. Re1 Be6 10. d4 Qd5"
}, {
    fen: "r1bqk2r/pppp1ppp/2n2n2/1Bb1p3/4P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 6 5",
    eco: "C48",
    openingName: "Four knights: Spanish, classical defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Bb5 Bc5"
}, {
    fen: "r1bq1rk1/pppp1ppp/2n2n2/1B2P3/1b1P1P2/2N5/PPP3PP/R1BQ1RK1 w - - 1 10",
    eco: "C48",
    openingName: "Four knights: Bardeleben variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Bb5 Bc5 5. O-O O-O 6. Nxe5 Nxe5 7. d4 Bd6 8. f4 Nc6 9. e5 Bb4"
}, {
    fen: "r1bq1rk1/pppp1ppp/5n2/1Bb1N3/3nP3/2N5/PPPP1PPP/R1BQ1RK1 w - - 1 7",
    eco: "C48",
    openingName: "Four knights: Marshall variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Bb5 Bc5 5. O-O O-O 6. Nxe5 Nd4"
}, {
    fen: "r1bqkb1r/pppp1ppp/5n2/1B2p3/3nP3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 6 5",
    eco: "C48",
    openingName: "Four knights: Rubinstein counter-gambit",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Bb5 Nd4"
}, {
    fen: "r1b1kb1r/ppppqppp/5n2/1B2N3/3nPP2/2N5/PPPP2PP/R1BQK2R b KQkq f3 0 6",
    eco: "C48",
    openingName: "Four knights: Rubinstein counter-gambit, Bogolyubov variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Bb5 Nd4 5. Nxe5 Qe7 6. f4"
}, {
    fen: "r1bqkb1r/pppp1ppp/5n2/4p3/3nP3/2N2N2/PPPPBPPP/R1BQK2R b KQkq - 7 5",
    eco: "C48",
    openingName: "Four knights: Rubinstein counter-gambit, 5.Be2",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Bb5 Nd4 5. Be2"
}, {
    fen: "r1bq1rk1/ppp2ppp/1b1p1n2/4p3/N3P3/3P1B2/PPP2PPP/R1BQ1RK1 w - - 2 10",
    eco: "C48",
    openingName: "Four knights: Rubinstein counter-gambit Maroczy variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Bb5 Nd4 5. Be2 Nxf3+ 6. Bxf3 Bc5 7. O-O O-O 8. d3 d6 9. Na4 Bb6"
}, {
    fen: "r1bqkb1r/pppp1ppp/5n2/1B2p3/3NP3/2N5/PPPP1PPP/R1BQK2R b KQkq - 0 5",
    eco: "C48",
    openingName: "Four knights: Rubinstein counter-gambit, exchange variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Bb5 Nd4 5. Nxd4"
}, {
    fen: "r1bqkb1r/pppp1ppp/5n2/1B2p3/3nP3/2N2N2/PPPP1PPP/R1BQ1RK1 b kq - 7 5",
    eco: "C48",
    openingName: "Four knights: Rubinstein counter-gambit, Henneberger variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Bb5 Nd4 5. O-O"
}, {
    fen: "r1bqk2r/pppp1ppp/2n2n2/1B2p3/1b2P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 6 5",
    eco: "C49",
    openingName: "Four knights: double Ruy Lopez",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Bb5 Bb4"
}, {
    fen: "r1bq1rk1/pppp1ppp/2n5/1B1P4/1b2p3/5N2/PPPP1PPP/R1BQ1RK1 w - - 0 8",
    eco: "C49",
    openingName: "Four knights: Gunsberg counter-attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Bb5 Bb4 5. O-O O-O 6. Nd5 Nxd5 7. exd5 e4"
}, {
    fen: "r1bq1rk1/pppp1ppp/2n2n2/1B2p3/1b2P3/2NP1N2/PPP2PPP/R1BQ1RK1 b - - 0 6",
    eco: "C49",
    openingName: "Four knights: double Ruy Lopez",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Bb5 Bb4 5. O-O O-O 6. d3"
}, {
    fen: "r1b2rk1/ppp1qppp/2n2n2/1B1pp3/1b2P3/3P1N2/PPP1NPPP/R1BQ1RK1 w - d6 0 8",
    eco: "C49",
    openingName: "Four knights: Alatortsev variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Bb5 Bb4 5. O-O O-O 6. d3 Qe7 7. Ne2 d5"
}, {
    fen: "r1bq1rk1/pppp1ppp/2n2n2/1B2p3/4P3/2bP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7",
    eco: "C49",
    openingName: "Four knights",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Bb5 Bb4 5. O-O O-O 6. d3 Bxc3"
}, {
    fen: "r1bq1rk1/ppp2ppp/2np1n2/1B2p3/4P3/2PP1N2/P1P2PPP/R1BQR1K1 b - - 1 8",
    eco: "C49",
    openingName: "Four knights: Janowski variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Bb5 Bb4 5. O-O O-O 6. d3 Bxc3 7. bxc3 d6 8. Re1"
}, {
    fen: "r1bq1rk1/ppp2ppp/2n2n2/1B1pp3/4P3/2PP1N2/P1P2PPP/R1BQ1RK1 w - d6 0 8",
    eco: "C49",
    openingName: "Four knights: Svenonius variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Bb5 Bb4 5. O-O O-O 6. d3 Bxc3 7. bxc3 d5"
}, {
    fen: "r1bq1rk1/ppp2ppp/2np1n2/1B2p3/1b2P3/2NP1N2/PPP2PPP/R1BQ1RK1 w - - 0 7",
    eco: "C49",
    openingName: "Four knights: symmetrical variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Bb5 Bb4 5. O-O O-O 6. d3 d6"
}, {
    fen: "r1b2rk1/ppp1qppp/2np1n2/1B2p1B1/4P3/2PP1N2/P1P2PPP/R2Q1RK1 w - - 1 9",
    eco: "C49",
    openingName: "Four knights: symmetrical, Metger unpin",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Bb5 Bb4 5. O-O O-O 6. d3 d6 7. Bg5 Bxc3 8. bxc3 Qe7"
}, {
    fen: "r2n1rk1/ppp1qppp/3p1n2/1B2p1B1/3PP1b1/2P2N2/P1P2PPP/R2QR1K1 w - - 1 11",
    eco: "C49",
    openingName: "Four knights: symmetrical, Capablanca variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Bb5 Bb4 5. O-O O-O 6. d3 d6 7. Bg5 Bxc3 8. bxc3 Qe7 9. Re1 Nd8 10. d4 Bg4"
}, {
    fen: "r1bq1rk1/ppp1nppp/3p1n2/1B2p1B1/1b2P3/2NP1N2/PPP2PPP/R2Q1RK1 w - - 2 8",
    eco: "C49",
    openingName: "Four knights: symmetrical, Pillsbury variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Bb5 Bb4 5. O-O O-O 6. d3 d6 7. Bg5 Ne7"
}, {
    fen: "r1b2rk1/pp2nppp/2pq1n2/3pp1B1/1b2P2N/1BNP4/PPP2PPP/R2Q1RK1 w - - 2 11",
    eco: "C49",
    openingName: "Four knights: symmetrical, Blake variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Bb5 Bb4 5. O-O O-O 6. d3 d6 7. Bg5 Ne7 8. Nh4 c6 9. Bc4 d5 10. Bb3 Qd6"
}, {
    fen: "r2q1rk1/ppp2ppp/2npbn2/1B2p1B1/1b2P3/2NP1N2/PPP2PPP/R2Q1RK1 w - - 2 8",
    eco: "C49",
    openingName: "Four knights: symmetrical, Tarrasch variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Bb5 Bb4 5. O-O O-O 6. d3 d6 7. Bg5 Be6"
}, {
    fen: "r1bq1rk1/ppp2ppp/2np1n2/1B2p3/1b2P3/3P1N2/PPP1NPPP/R1BQ1RK1 b - - 1 7",
    eco: "C49",
    openingName: "Four knights: symmetrical, Maroczy system",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Bb5 Bb4 5. O-O O-O 6. d3 d6 7. Ne2"
}, {
    fen: "r1bq1rk1/pppp1ppp/2B2n2/4p3/1b2P3/2N2N2/PPPP1PPP/R1BQ1RK1 b - - 0 6",
    eco: "C49",
    openingName: "Four knights: Nimzovich (Paulsen) variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Nc3 Nf6 4. Bb5 Bb4 5. O-O O-O 6. Bxc6"
}, {
    fen: "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
    eco: "C50",
    openingName: "King's pawn game",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4"
}, {
    fen: "r1b1kbnr/pppp1Npp/8/8/4q3/5n2/PPPPBP1P/RNBQKR2 w Qkq - 2 8",
    eco: "C50",
    openingName: "Blackburne shilling gambit",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nd4 4. Nxe5 Qg5 5. Nxf7 Qxg2 6. Rf1 Qxe4+ 7. Be2 Nf3#"
}, {
    fen: "r1bqkbnr/pppp2pp/2n5/4pp2/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq f6 0 4",
    eco: "C50",
    openingName: "Rousseau gambit",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 f5"
}, {
    fen: "r1bqk1nr/ppppbppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
    eco: "C50",
    openingName: "Hungarian defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Be7"
}, {
    fen: "r1bqk2r/ppppbppp/2n5/4P3/2Bpn3/2P2N2/PP3PPP/RNBQK2R w KQkq - 1 7",
    eco: "C50",
    openingName: "Hungarian defence: Tartakower variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Be7 4. d4 exd4 5. c3 Nf6 6. e5 Ne4"
}, {
    fen: "r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
    eco: "C50",
    openingName: "Giuoco Piano",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5"
}, {
    fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 6 5",
    eco: "C50",
    openingName: "Giuoco Piano: four knights variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. Nc3 Nf6"
}, {
    fen: "r1bqk1nr/pppp1Bpp/2n5/2b1p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 4",
    eco: "C50",
    openingName: "Giuoco Piano: Jerome gambit",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. Bxf7+"
}, {
    fen: "r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R b KQkq - 0 4",
    eco: "C50",
    openingName: "Giuoco Pianissimo",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. d3"
}, {
    fen: "r1bqk1nr/pppp2pp/2n5/2b1p1N1/2B1Pp2/3P4/PPP2PPP/RNBQK2R w KQkq - 0 6",
    eco: "C50",
    openingName: "Giuoco Pianissimo: Dubois variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. d3 f5 5. Ng5 f4"
}, {
    fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 1 5",
    eco: "C50",
    openingName: "Giuoco Pianissimo",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. d3 Nf6"
}, {
    fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQK2R b KQkq - 2 5",
    eco: "C50",
    openingName: "Giuoco Pianissimo: Italian four knights variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. d3 Nf6 5. Nc3"
}, {
    fen: "r1bqk2r/ppp2ppp/2np1n2/2b1p1B1/2B1P3/2NP1N2/PPP2PPP/R2QK2R b KQkq - 1 6",
    eco: "C50",
    openingName: "Giuoco Pianissimo: Canal variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. d3 Nf6 5. Nc3 d6 6. Bg5"
}, {
    fen: "r1bqk1nr/pppp1ppp/2n5/2b1p3/1PB1P3/5N2/P1PP1PPP/RNBQK2R b KQkq b3 0 4",
    eco: "C51",
    openingName: "Evans gambit declined",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4"
}, {
    fen: "r1bqk2r/pppp1ppp/1b5n/nP2N3/2B1P3/8/P1PP1PPP/RNBQK2R w KQkq - 1 7",
    eco: "C51",
    openingName: "Evans gambit declined, Lange variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bb6 5. b5 Na5 6. Nxe5 Nh6"
}, {
    fen: "r1b3r1/ppp2k1p/1b6/nP2B1q1/3PP3/8/P1PN1PPP/R2QK2R b KQ - 2 12",
    eco: "C51",
    openingName: "Evans gambit declined, Pavlov variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bb6 5. b5 Na5 6. Nxe5 Nh6 7. d4 d6 8. Bxh6 dxe5 9. Bxg7 Rg8 10. Bxf7+ Kxf7 11. Bxe5 Qg5 12. Nd2"
}, {
    fen: "r1b1k1nr/pppp1ppp/1b6/nP2N1q1/2B1P3/8/P1PP1PPP/RNBQK2R w KQkq - 1 7",
    eco: "C51",
    openingName: "Evans gambit declined, Hirschbach variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bb6 5. b5 Na5 6. Nxe5 Qg5"
}, {
    fen: "r1b3nr/ppppkBpp/1b6/nP2N1qQ/4P3/8/P1PP1PPP/RNB1K2R b KQ - 2 8",
    eco: "C51",
    openingName: "Evans gambit declined, Vasquez variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bb6 5. b5 Na5 6. Nxe5 Qg5 7. Bxf7+ Ke7 8. Qh5"
}, {
    fen: "r1bk2nr/pppp1Qpp/1b6/nP2q3/2B1P3/8/PBPP1PPP/RN2K2R b KQ - 2 9",
    eco: "C51",
    openingName: "Evans gambit declined, Hicken variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bb6 5. b5 Na5 6. Nxe5 Qg5 7. Qf3 Qxe5 8. Qxf7+ Kd8 9. Bb2"
}, {
    fen: "r1bqk1nr/pppp1ppp/1bn5/4p3/PPB1P3/5N2/2PP1PPP/RNBQK2R b KQkq a3 0 5",
    eco: "C51",
    openingName: "Evans gambit declined, 5.a4",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bb6 5. a4"
}, {
    fen: "r1bqk1nr/1ppp1ppp/pbn5/4p3/PPB1P3/2N2N2/2PP1PPP/R1BQK2R b KQkq - 1 6",
    eco: "C51",
    openingName: "Evans gambit declined, Showalter variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bb6 5. a4 a6 6. Nc3"
}, {
    fen: "r1bqk1nr/pppp1ppp/1bn5/4p3/1PB1P3/5N2/PBPP1PPP/RN1QK2R b KQkq - 2 5",
    eco: "C51",
    openingName: "Evans gambit declined, Cordel variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bb6 5. Bb2"
}, {
    fen: "r1bqk1nr/ppp2ppp/2n5/2bpp3/1PB1P3/5N2/P1PP1PPP/RNBQK2R w KQkq d6 0 5",
    eco: "C51",
    openingName: "Evans counter-gambit",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 d5"
}, {
    fen: "r1bqk1nr/pppp1ppp/2n5/4p3/1bB1P3/5N2/P1PP1PPP/RNBQK2R w KQkq - 0 5",
    eco: "C51",
    openingName: "Evans gambit",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4"
}, {
    fen: "r1bqk1nr/ppp2ppp/1bnp4/8/2BPP3/5N2/P4PPP/RNBQ1RK1 w kq - 1 9",
    eco: "C51",
    openingName: "Evans gambit: normal variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Bc5 6. d4 exd4 7. O-O d6 8. cxd4 Bb6"
}, {
    fen: "r1bqk1nr/ppp2ppp/1b1p4/n2P4/2B1P3/5N2/PB3PPP/RN1Q1RK1 b kq - 2 10",
    eco: "C51",
    openingName: "Evans gambit: Ulvestad variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Bc5 6. d4 exd4 7. O-O d6 8. cxd4 Bb6 9. d5 Na5 10. Bb2"
}, {
    fen: "r1bqk2r/ppp1nppp/1b1p4/n2P4/2B1P3/5N2/PB3PPP/RN1Q1RK1 w kq - 3 11",
    eco: "C51",
    openingName: "Evans gambit: Paulsen variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Bc5 6. d4 exd4 7. O-O d6 8. cxd4 Bb6 9. d5 Na5 10. Bb2 Ne7"
}, {
    fen: "r1bqk1nr/ppp2ppp/1bnp4/8/2BPP3/2N2N2/P4PPP/R1BQ1RK1 b kq - 2 9",
    eco: "C51",
    openingName: "Evans gambit: Morphy attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Bc5 6. d4 exd4 7. O-O d6 8. cxd4 Bb6 9. Nc3"
}, {
    fen: "r1bqk1nr/ppp2ppp/1b1p4/n5B1/2BPP3/2N2N2/P4PPP/R2Q1RK1 b kq - 4 10",
    eco: "C51",
    openingName: "Evans gambit: Goering attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Bc5 6. d4 exd4 7. O-O d6 8. cxd4 Bb6 9. Nc3 Na5 10. Bg5"
}, {
    fen: "r1bqk1nr/ppp3pp/1b1p1p2/n7/2BPP3/2N1BN2/P4PPP/R2Q1RK1 b kq - 1 11",
    eco: "C51",
    openingName: "Evans gambit: Steinitz variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Bc5 6. d4 exd4 7. O-O d6 8. cxd4 Bb6 9. Nc3 Na5 10. Bg5 f6 11. Be3"
}, {
    fen: "r2qk1nr/ppp2ppp/1bnp4/8/2BPP1b1/2N2N2/P4PPP/R1BQ1RK1 w kq - 3 10",
    eco: "C51",
    openingName: "Evans gambit",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Bc5 6. d4 exd4 7. O-O d6 8. cxd4 Bb6 9. Nc3 Bg4"
}, {
    fen: "r2qk1nr/ppp2ppp/1bnp4/8/Q1BPP1b1/2N2N2/P4PPP/R1B2RK1 b kq - 4 10",
    eco: "C51",
    openingName: "Evans gambit: Fraser attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Bc5 6. d4 exd4 7. O-O d6 8. cxd4 Bb6 9. Nc3 Bg4 10. Qa4"
}, {
    fen: "r2q1knr/pppb1Bpp/1b1p4/n7/3PP3/2N2N2/P1Q2PPP/R1B2RK1 b - - 2 13",
    eco: "C51",
    openingName: "Evans gambit: Fraser-Mortimer attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Bc5 6. d4 exd4 7. O-O d6 8. cxd4 Bb6 9. Nc3 Bg4 10. Qa4 Bd7 11. Qb3 Na5 12. Bxf7+ Kf8 13. Qc2"
}, {
    fen: "r1bqk1nr/pppp1ppp/2nb4/4p3/2B1P3/2P2N2/P2P1PPP/RNBQK2R w KQkq - 1 6",
    eco: "C51",
    openingName: "Evans gambit: Stone-Ware variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Bd6"
}, {
    fen: "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/2P2N2/P2P1PPP/RNBQK2R w KQkq - 1 6",
    eco: "C51",
    openingName: "Evans gambit: Mayet defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Bf8"
}, {
    fen: "r1bqk1nr/ppppbppp/2n5/4p3/2B1P3/2P2N2/P2P1PPP/RNBQK2R w KQkq - 1 6",
    eco: "C51",
    openingName: "Evans gambit: 5...Be7",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Be7"
}, {
    fen: "r1bqk1nr/ppppbppp/8/n3p3/2BPP3/2P2N2/P4PPP/RNBQK2R w KQkq - 1 7",
    eco: "C51",
    openingName: "Evans gambit: Cordel variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Be7 6. d4 Na5"
}, {
    fen: "r1bqk1nr/pppp1ppp/2n5/b3p3/2B1P3/2P2N2/P2P1PPP/RNBQK2R w KQkq - 1 6",
    eco: "C52",
    openingName: "Evans gambit",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Ba5"
}, {
    fen: "r1bqk1nr/pppp1ppp/2n5/b7/2B1P3/2p2N2/P4PPP/RNBQ1RK1 w kq - 0 8",
    eco: "C52",
    openingName: "Evans gambit: compromised defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Ba5 6. d4 exd4 7. O-O dxc3"
}, {
    fen: "r1b1k2r/ppppnppp/2n3q1/b3P3/2B5/BQN2N2/P4PPP/R4RK1 b kq - 2 11",
    eco: "C52",
    openingName: "Evans gambit: compromised defence, Paulsen variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Ba5 6. d4 exd4 7. O-O dxc3 8. Qb3 Qf6 9. e5 Qg6 10. Nxc3 Nge7 11. Ba3"
}, {
    fen: "r1b1k2r/ppppnppp/2n3q1/b3P3/2B5/1QN2N2/P4PPP/R1BR2K1 b kq - 2 11",
    eco: "C52",
    openingName: "Evans gambit: compromised defence, Potter variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Ba5 6. d4 exd4 7. O-O dxc3 8. Qb3 Qf6 9. e5 Qg6 10. Nxc3 Nge7 11. Rd1"
}, {
    fen: "r1bqk1nr/p1pp1ppp/2n5/bp2p3/2BPP3/2P2N2/P4PPP/RNBQK2R w KQkq b6 0 7",
    eco: "C52",
    openingName: "Evans gambit: Leonhardt variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Ba5 6. d4 b5"
}, {
    fen: "r1bqk1nr/ppp2ppp/2np4/b3p3/2BPP3/2P2N2/P4PPP/RNBQK2R w KQkq - 0 7",
    eco: "C52",
    openingName: "Evans gambit",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Ba5 6. d4 d6"
}, {
    fen: "r1bqk1nr/ppp2ppp/2np4/b3p3/2BPP3/1QP2N2/P4PPP/RNB1K2R b KQkq - 1 7",
    eco: "C52",
    openingName: "Evans gambit: Tartakower attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Ba5 6. d4 d6 7. Qb3"
}, {
    fen: "r1b1k1nr/pppq1ppp/1b6/n3N3/2B1P3/BQP5/P4PPP/RN3RK1 b kq - 0 11",
    eco: "C52",
    openingName: "Evans gambit: Levenfish variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Ba5 6. d4 d6 7. Qb3 Qd7 8. dxe5 dxe5 9. O-O Bb6 10. Ba3 Na5 11. Nxe5"
}, {
    fen: "r1bqk1nr/ppp2ppp/2np4/b3p1B1/2BPP3/2P2N2/P4PPP/RN1QK2R b KQkq - 1 7",
    eco: "C52",
    openingName: "Evans gambit: Sokolsky variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Ba5 6. d4 d6 7. Bg5"
}, {
    fen: "r1bqk1nr/pppp1ppp/2n5/b3p3/2B1P3/2P2N2/P2P1PPP/RNBQ1RK1 b kq - 2 6",
    eco: "C52",
    openingName: "Evans gambit",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Ba5 6. O-O"
}, {
    fen: "r1bq1rk1/pppp1ppp/2n2n2/b3N3/2BPP3/2P5/P4PPP/RNBQ1RK1 b - - 0 8",
    eco: "C52",
    openingName: "Evans gambit: Richardson attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Ba5 6. O-O Nf6 7. d4 O-O 8. Nxe5"
}, {
    fen: "r1bqk1nr/ppp2ppp/2np4/b3p3/2B1P3/2P2N2/P2P1PPP/RNBQ1RK1 w kq - 0 7",
    eco: "C52",
    openingName: "Evans gambit",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Ba5 6. O-O d6"
}, {
    fen: "r1bqk1nr/ppp2ppp/2np4/b7/2BpP3/1QP2N2/P4PPP/RNB2RK1 b kq - 1 8",
    eco: "C52",
    openingName: "Evans gambit: Waller attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Ba5 6. O-O d6 7. d4 exd4 8. Qb3"
}, {
    fen: "r1bqk1nr/ppp2ppp/1bnp4/4p3/2BPP3/2P2N2/P4PPP/RNBQ1RK1 w kq - 1 8",
    eco: "C52",
    openingName: "Evans gambit: Lasker defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Ba5 6. O-O d6 7. d4 Bb6"
}, {
    fen: "r2qk1nr/pppb1ppp/2np4/b3p3/2BPP3/2P2N2/P4PPP/RNBQ1RK1 w kq - 1 8",
    eco: "C52",
    openingName: "Evans gambit: Sanders-Alapin variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Ba5 6. O-O d6 7. d4 Bd7"
}, {
    fen: "r2qk1nr/ppp2ppp/2np4/b3p3/2BPP1b1/2P2N2/P4PPP/RNBQ1RK1 w kq - 1 8",
    eco: "C52",
    openingName: "Evans gambit: Alapin-Steinitz variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. b4 Bxb4 5. c3 Ba5 6. O-O d6 7. d4 Bg4"
}, {
    fen: "r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/2P2N2/PP1P1PPP/RNBQK2R b KQkq - 0 4",
    eco: "C53",
    openingName: "Giuoco Piano",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3"
}, {
    fen: "r1bqk1nr/ppp2ppp/1bnp4/8/2BPP3/5N2/PP3PPP/RNBQK2R w KQkq - 1 7",
    eco: "C53",
    openingName: "Giuoco Piano: LaBourdonnais variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 d6 5. d4 exd4 6. cxd4 Bb6"
}, {
    fen: "r1b1k1nr/ppppqppp/2n5/2b1p3/2B1P3/2P2N2/PP1P1PPP/RNBQK2R w KQkq - 1 5",
    eco: "C53",
    openingName: "Giuoco Piano: close variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Qe7"
}, {
    fen: "r1b1k1nr/ppppqppp/1bn5/4p3/2BPP3/2P2N2/PP3PPP/RNBQK2R w KQkq - 1 6",
    eco: "C53",
    openingName: "Giuoco Piano: centre-holding variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Qe7 5. d4 Bb6"
}, {
    fen: "r1b1k2r/1pp1qppp/pbnp1n2/4p3/P1BPP3/2P2N1P/1P3PP1/RNBQR1K1 b kq - 0 9",
    eco: "C53",
    openingName: "Giuoco Piano: Tarrasch variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Qe7 5. d4 Bb6 6. O-O Nf6 7. a4 a6 8. Re1 d6 9. h3"
}, {
    fen: "r1b1k1nr/ppppqppp/1bn5/4p1B1/2BPP3/2P2N2/PP3PPP/RN1QK2R b KQkq - 2 6",
    eco: "C53",
    openingName: "Giuoco Piano: Mestel variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Qe7 5. d4 Bb6 6. Bg5"
}, {
    fen: "rnb1k1nr/ppppqppp/1b1P4/4p3/2B1P3/2P2N2/PP3PPP/RNBQK2R b KQkq - 0 7",
    eco: "C53",
    openingName: "Giuoco Piano: Eisinger variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Qe7 5. d4 Bb6 6. d5 Nb8 7. d6"
}, {
    fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2P2N2/PP1P1PPP/RNBQK2R w KQkq - 1 5",
    eco: "C53",
    openingName: "Giuoco Piano",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6"
}, {
    fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/1PB1P3/2P2N2/P2P1PPP/RNBQK2R b KQkq b3 0 5",
    eco: "C53",
    openingName: "Giuoco Piano: Bird's attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. b4"
}, {
    fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2BPP3/2P2N2/PP3PPP/RNBQK2R b KQkq d3 0 5",
    eco: "C53",
    openingName: "Giuoco Piano",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d4"
}, {
    fen: "r1bqk2r/pppp1ppp/2n5/2bBP3/8/2p2NK1/PP4PP/RNBQ3R b kq - 1 9",
    eco: "C53",
    openingName: "Giuoco Piano: Ghulam Kassim variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d4 exd4 6. e5 Ne4 7. Bd5 Nxf2 8. Kxf2 dxc3+ 9. Kg3"
}, {
    fen: "r1bqk2r/ppp2ppp/2n2n2/2bpP3/2Bp4/2P2N2/PP3PPP/RNBQK2R w KQkq d6 0 7",
    eco: "C53",
    openingName: "Giuoco Piano",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d4 exd4 6. e5 d5"
}, {
    fen: "r1bqk2r/ppp2ppp/2n5/1B1pP3/1b1Pn3/5N2/PP3PPP/RNBQK2R w KQkq - 1 9",
    eco: "C53",
    openingName: "Giuoco Piano: Anderssen variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d4 exd4 6. e5 d5 7. Bb5 Ne4 8. cxd4 Bb4+"
}, {
    fen: "r1bqk2r/pppp1ppp/2n2n2/2b5/2BPP3/5N2/PP3PPP/RNBQK2R b KQkq - 0 6",
    eco: "C54",
    openingName: "Giuoco Piano",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d4 exd4 6. cxd4"
}, {
    fen: "r1bq3r/ppp3pp/5k2/3pN3/1n1Pn3/1Q3P2/PP4PP/RN2K2R b KQ - 0 12",
    eco: "C54",
    openingName: "Giuoco Piano: Krause variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d4 exd4 6. cxd4 Bb4+ 7. Bd2 Nxe4 8. Bxb4 Nxb4 9. Bxf7+ Kxf7 10. Qb3+ d5 11. Ne5+ Kf6 12. f3"
}, {
    fen: "r1bqk2r/pppp1ppp/2n2n2/8/1bBPP3/5N2/PP3PPP/RNBQ1K1R b kq - 2 7",
    eco: "C54",
    openingName: "Giuoco Piano: Cracow variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d4 exd4 6. cxd4 Bb4+ 7. Kf1"
}, {
    fen: "r1bqk2r/pppp1ppp/2n2n2/8/1bBPP3/2N2N2/PP3PPP/R1BQK2R b KQkq - 2 7",
    eco: "C54",
    openingName: "Giuoco Piano: Greco's attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d4 exd4 6. cxd4 Bb4+ 7. Nc3"
}, {
    fen: "r1bqk2r/pppp1ppp/2n5/8/1bBP4/2n2N2/PP3PPP/R1BQ1RK1 w kq - 0 9",
    eco: "C54",
    openingName: "Giuoco Piano: Greco variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d4 exd4 6. cxd4 Bb4+ 7. Nc3 Nxe4 8. O-O Nxc3"
}, {
    fen: "r1bqk2r/ppp2ppp/2n5/3p4/2BP4/1Qb2N2/P4PPP/R1B2RK1 w kq d6 0 11",
    eco: "C54",
    openingName: "Giuoco Piano: Bernstein variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d4 exd4 6. cxd4 Bb4+ 7. Nc3 Nxe4 8. O-O Nxc3 9. bxc3 Bxc3 10. Qb3 d5"
}, {
    fen: "r1bqk2r/pppp1ppp/2n5/8/2BP4/B1b2N2/P4PPP/R2Q1RK1 b kq - 1 10",
    eco: "C54",
    openingName: "Giuoco Piano: Aitken variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d4 exd4 6. cxd4 Bb4+ 7. Nc3 Nxe4 8. O-O Nxc3 9. bxc3 Bxc3 10. Ba3"
}, {
    fen: "r1bqk2r/pppp1ppp/2n5/8/2BPn3/2b2N2/PP3PPP/R1BQ1RK1 w kq - 0 9",
    eco: "C54",
    openingName: "Giuoco Piano",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d4 exd4 6. cxd4 Bb4+ 7. Nc3 Nxe4 8. O-O Bxc3"
}, {
    fen: "r1bqk2r/ppp2ppp/2n5/3p4/2BPn3/B1P2N2/P4PPP/R2Q1RK1 b kq - 1 10",
    eco: "C54",
    openingName: "Giuoco Piano: Steinitz variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d4 exd4 6. cxd4 Bb4+ 7. Nc3 Nxe4 8. O-O Bxc3 9. bxc3 d5 10. Ba3"
}, {
    fen: "r1bqk2r/pppp1ppp/2n5/3P4/2B1n3/2b2N2/PP3PPP/R1BQ1RK1 b kq - 0 9",
    eco: "C54",
    openingName: "Giuoco Piano: Moeller (Therkatz) attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d4 exd4 6. cxd4 Bb4+ 7. Nc3 Nxe4 8. O-O Bxc3 9. d5"
}, {
    fen: "r1bq1rk1/ppp1nppN/3p4/3P4/2B1R3/8/PP3PPP/R2Q2K1 b - - 0 14",
    eco: "C54",
    openingName: "Giuoco Piano: Therkatz-Herzog variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d4 exd4 6. cxd4 Bb4+ 7. Nc3 Nxe4 8. O-O Bxc3 9. d5 Bf6 10. Re1 Ne7 11. Rxe4 d6 12. Bg5 Bxg5 13. Nxg5 O-O 14. Nxh7"
}, {
    fen: "r1bqk2r/ppp1nppp/3p1b2/3P4/2B1R1P1/5N2/PP3P1P/R1BQ2K1 b kq g3 0 12",
    eco: "C54",
    openingName: "Giuoco Piano: Moeller, bayonet attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d4 exd4 6. cxd4 Bb4+ 7. Nc3 Nxe4 8. O-O Bxc3 9. d5 Bf6 10. Re1 Ne7 11. Rxe4 d6 12. g4"
}, {
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
    eco: "C55",
    openingName: "Two knights defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6"
}, {
    fen: "r1bqk2r/pppp1p2/5n1p/4p1p1/2BnPP1B/8/PPP3PP/RN1Q1RK1 b kq f3 0 9",
    eco: "C55",
    openingName: "Giuoco piano: Rosentreter variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. O-O Bc5 5. d4 Bxd4 6. Nxd4 Nxd4 7. Bg5 h6 8. Bh4 g5 9. f4"
}, {
    fen: "r1bqk2r/ppp2ppp/3p1n2/4p1B1/2BnP3/8/PPP2PPP/RN1Q1RK1 w kq - 0 8",
    eco: "C55",
    openingName: "Giuoco piano",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. O-O Bc5 5. d4 Bxd4 6. Nxd4 Nxd4 7. Bg5 d6"
}, {
    fen: "r1b1k2r/ppp1qppp/5n2/4p1B1/2BnP3/2N5/PPP3PP/R2Q1RK1 b kq - 1 10",
    eco: "C55",
    openingName: "Giuoco piano: Holzhausen attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. O-O Bc5 5. d4 Bxd4 6. Nxd4 Nxd4 7. Bg5 d6 8. f4 Qe7 9. fxe5 dxe5 10. Nc3"
}, {
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R b KQkq - 0 4",
    eco: "C55",
    openingName: "Two knights defence (Modern bishop's opening)",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. d3"
}, {
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2BPP3/5N2/PPP2PPP/RNBQK2R b KQkq d3 0 4",
    eco: "C55",
    openingName: "Two knights defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. d4"
}, {
    fen: "r1b1k2r/ppp2ppp/2N5/1B1pP3/4n2q/8/PPP2bPP/RNBQ1K1R w kq - 2 10",
    eco: "C55",
    openingName: "Two knights defence, Keidanz variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. d4 exd4 5. e5 d5 6. Bb5 Ne4 7. Nxd4 Bc5 8. Nxc6 Bxf2+ 9. Kf1 Qh4"
}, {
    fen: "r1bqkb1r/pppp1ppp/2n2n2/6N1/2BpP3/8/PPP2PPP/RNBQK2R b KQkq - 1 5",
    eco: "C55",
    openingName: "Two knights defence, Perreux variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. d4 exd4 5. Ng5"
}, {
    fen: "r1bqkb1r/pppp1ppp/2n2n2/8/2BpP3/5N2/PPP2PPP/RNBQ1RK1 b kq - 1 5",
    eco: "C55",
    openingName: "Two knights defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. d4 exd4 5. O-O"
}, {
    fen: "r1bqk2r/pppp1ppp/2n2n2/2b1P3/2Bp4/5N2/PPP2PPP/RNBQ1RK1 b kq - 0 6",
    eco: "C55",
    openingName: "two knights: Max Lange attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. d4 exd4 5. O-O Bc5 6. e5"
}, {
    fen: "2kr3r/ppp2ppp/1bn1bPq1/6N1/2ppNPP1/8/PPP4P/R1BQR1K1 w - - 1 14",
    eco: "C55",
    openingName: "two knights: Max Lange attack, Berger variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. d4 exd4 5. O-O Bc5 6. e5 d5 7. exf6 dxc4 8. Re1+ Be6 9. Ng5 Qd5 10. Nc3 Qf5 11. g4 Qg6 12. Nce4 Bb6 13. f4 O-O-O"
}, {
    fen: "r3k2r/ppp2ppp/2n1bP2/2b2qN1/2ppN3/8/PPP2PPP/R1BQR1K1 b kq - 7 11",
    eco: "C55",
    openingName: "two knights: Max Lange attack, Marshall variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. d4 exd4 5. O-O Bc5 6. e5 d5 7. exf6 dxc4 8. Re1+ Be6 9. Ng5 Qd5 10. Nc3 Qf5 11. Nce4"
}, {
    fen: "r3kb1r/ppp2ppp/2n1bP2/5qN1/2ppN3/8/PPP2PPP/R1BQR1K1 w kq - 8 12",
    eco: "C55",
    openingName: "two knights: Max Lange attack, Rubinstein variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. d4 exd4 5. O-O Bc5 6. e5 d5 7. exf6 dxc4 8. Re1+ Be6 9. Ng5 Qd5 10. Nc3 Qf5 11. Nce4 Bf8"
}, {
    fen: "r2qk2r/ppp2p1p/2n1bPp1/2b3N1/2pp4/8/PPP2PPP/RNBQR1K1 w kq - 0 10",
    eco: "C55",
    openingName: "two knights: Max Lange attack, Loman defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. d4 exd4 5. O-O Bc5 6. e5 d5 7. exf6 dxc4 8. Re1+ Be6 9. Ng5 g6"
}, {
    fen: "r2qk2r/ppp2pPp/2n1b3/2b5/2pp4/5N2/PPP2PPP/RNBQR1K1 b kq - 0 9",
    eco: "C55",
    openingName: "two knights: Max Lange attack, Schlechter variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. d4 exd4 5. O-O Bc5 6. e5 d5 7. exf6 dxc4 8. Re1+ Be6 9. fxg7"
}, {
    fen: "r1bqk2r/pppp1ppp/2n5/2b1P3/2Bp2n1/5N2/PPP2PPP/RNBQ1RK1 w kq - 1 7",
    eco: "C55",
    openingName: "two knights: Max Lange attack, Steinitz variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. d4 exd4 5. O-O Bc5 6. e5 Ng4"
}, {
    fen: "r1bqk2r/pppp1ppp/2n5/2b1P3/2Bp2n1/2P2N2/PP3PPP/RNBQ1RK1 b kq - 0 7",
    eco: "C55",
    openingName: "two knights: Max Lange attack, Krause variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. d4 exd4 5. O-O Bc5 6. e5 Ng4 7. c3"
}, {
    fen: "r1bqkb1r/pppp1ppp/2n5/8/2Bpn3/5N2/PPP2PPP/RNBQ1RK1 w kq - 0 6",
    eco: "C56",
    openingName: "Two knights defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. d4 exd4 5. O-O Nxe4"
}, {
    fen: "r4b1r/ppp1kp2/2n1bN1p/q5p1/1P1p3B/5N2/P1P2PPP/R2QR1K1 b - b3 0 13",
    eco: "C56",
    openingName: "two knights defence: Yurdansky attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. d4 exd4 5. O-O Nxe4 6. Re1 d5 7. Bxd5 Qxd5 8. Nc3 Qa5 9. Nxe4 Be6 10. Bg5 h6 11. Bh4 g5 12. Nf6+ Ke7 13. b4"
}, {
    fen: "r1bqkb1r/ppp2ppp/2n5/3p4/2Bpn3/2N2N2/PPP2PPP/R1BQR1K1 b kq - 1 7",
    eco: "C56",
    openingName: "two knights defence: Canal variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. d4 exd4 5. O-O Nxe4 6. Re1 d5 7. Nc3"
}, {
    fen: "r1bqkb1r/pppp1ppp/2n2n2/4p1N1/2B1P3/8/PPPP1PPP/RNBQK2R b KQkq - 5 4",
    eco: "C57",
    openingName: "Two knights defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5"
}, {
    fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p1N1/2B1P3/8/PPPP1PPP/RNBQK2R w KQkq - 6 5",
    eco: "C57",
    openingName: "two knights defence: Wilkes Barre (Traxler) variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 Bc5"
}, {
    fen: "r1bqkb1r/p1p2ppp/2n2n2/1p1Pp1N1/2B5/8/PPPP1PPP/RNBQK2R w KQkq b6 0 6",
    eco: "C57",
    openingName: "two knights defence: Ulvestad variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 d5 5. exd5 b5"
}, {
    fen: "r1bqkb1r/ppp2ppp/5n2/3Pp1N1/2Bn4/8/PPPP1PPP/RNBQK2R w KQkq - 1 6",
    eco: "C57",
    openingName: "two knights defence: Fritz variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 d5 5. exd5 Nd4"
}, {
    fen: "r1bqkb1r/p1p2ppp/8/1p1np3/3nN3/2P5/PP1P1PPP/RNBQKB1R b KQkq - 1 8",
    eco: "C57",
    openingName: "two knights defence: Fritz, Gruber variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 d5 5. exd5 Nd4 6. c3 b5 7. Bf1 Nxd5 8. Ne4"
}, {
    fen: "r1bqkb1r/ppp2ppp/2n5/3np1N1/2BP4/8/PPP2PPP/RNBQK2R b KQkq d3 0 6",
    eco: "C57",
    openingName: "two knights defence: Lolli attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 d5 5. exd5 Nxd5 6. d4"
}, {
    fen: "r1bqk2r/ppp2ppp/2n5/3np1N1/1bBP4/8/PPP2PPP/RNBQK2R w KQkq - 1 7",
    eco: "C57",
    openingName: "two knights defence: Pincus variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 d5 5. exd5 Nxd5 6. d4 Bb4+"
}, {
    fen: "r1bqkb1r/ppp2Npp/2n5/3np3/2B5/8/PPPP1PPP/RNBQK2R b KQkq - 0 6",
    eco: "C57",
    openingName: "two knights defence: Fegatello attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 d5 5. exd5 Nxd5 6. Nxf7"
}, {
    fen: "r1bq1b1r/ppn3pp/2p1k3/3np3/2BPQ3/P1N5/1PP2PPP/R1B1K2R w KQ - 1 12",
    eco: "C57",
    openingName: "two knights defence: Fegatello attack, Leonhardt variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 d5 5. exd5 Nxd5 6. Nxf7 Kxf7 7. Qf3+ Ke6 8. Nc3 Nb4 9. Qe4 c6 10. a3 Na6 11. d4 Nc7"
}, {
    fen: "r1bq1b1r/ppp1n1pp/4k3/3np3/2B5/2N2Q2/PPPP1PPP/R1B1K2R w KQ - 4 9",
    eco: "C57",
    openingName: "two knights defence: Fegatello attack, Polerio defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 d5 5. exd5 Nxd5 6. Nxf7 Kxf7 7. Qf3+ Ke6 8. Nc3 Ne7"
}, {
    fen: "r1bqkb1r/ppp2ppp/5n2/n2Pp1N1/2B5/8/PPPP1PPP/RNBQK2R w KQkq - 1 6",
    eco: "C58",
    openingName: "two knights defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 d5 5. exd5 Na5"
}, {
    fen: "r1bqkb1r/ppp2ppp/5n2/n2Pp1N1/2B5/3P4/PPP2PPP/RNBQK2R b KQkq - 0 6",
    eco: "C58",
    openingName: "two knights defence: Kieseritsky variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 d5 5. exd5 Na5 6. d3"
}, {
    fen: "r1bqk2r/ppp2pp1/5n1p/2bP4/2P1p3/8/PPPNQPPP/RNB1K2R b KQkq - 2 10",
    eco: "C58",
    openingName: "two knights defence: Yankovich variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 d5 5. exd5 Na5 6. d3 h6 7. Nf3 e4 8. Qe2 Nxc4 9. dxc4 Bc5 10. Nfd2"
}, {
    fen: "r1bqk2r/ppp1bpp1/5n1p/3P4/2P1p3/5N2/PPP1QPPP/RNB1K2R w KQkq - 1 10",
    eco: "C58",
    openingName: "two knights defence: Maroczy variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 d5 5. exd5 Na5 6. d3 h6 7. Nf3 e4 8. Qe2 Nxc4 9. dxc4 Be7"
}, {
    fen: "r1bqkb1r/ppp2ppp/5n2/nB1Pp1N1/8/8/PPPP1PPP/RNBQK2R b KQkq - 2 6",
    eco: "C58",
    openingName: "Two knights defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 d5 5. exd5 Na5 6. Bb5+"
}, {
    fen: "r1bqkb1r/p4ppp/2p2n2/nB2p1N1/8/5Q2/PPPP1PPP/RNB1K2R b KQkq - 1 8",
    eco: "C58",
    openingName: "two knights defence: Bogolyubov variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 d5 5. exd5 Na5 6. Bb5+ c6 7. dxc6 bxc6 8. Qf3"
}, {
    fen: "r1b1kb1r/p1q2ppp/2p2n2/n3p1N1/8/3B1Q2/PPPP1PPP/RNB1K2R b KQkq - 3 9",
    eco: "C58",
    openingName: "two knights defence: Paoli variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 d5 5. exd5 Na5 6. Bb5+ c6 7. dxc6 bxc6 8. Qf3 Qc7 9. Bd3"
}, {
    fen: "1rbqkb1r/p4ppp/2p2n2/nB2p1N1/8/5Q2/PPPP1PPP/RNB1K2R w KQk - 2 9",
    eco: "C58",
    openingName: "two knights defence: Colman variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 d5 5. exd5 Na5 6. Bb5+ c6 7. dxc6 bxc6 8. Qf3 Rb8"
}, {
    fen: "r1bqkb1r/p4ppp/5n2/np2p1N1/8/5Q2/PPPP1PPP/RNB1K2R w KQkq - 0 9",
    eco: "C58",
    openingName: "two knights defence: Blackburne variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 d5 5. exd5 Na5 6. Bb5+ c6 7. dxc6 bxc6 8. Qf3 cxb5"
}, {
    fen: "r1bqkb1r/p4ppp/2p2n2/n3p1N1/8/8/PPPPBPPP/RNBQK2R b KQkq - 1 8",
    eco: "C58",
    openingName: "Two knights defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 d5 5. exd5 Na5 6. Bb5+ c6 7. dxc6 bxc6 8. Be2"
}, {
    fen: "r1bqkb1r/p4pp1/2p2n1p/n3p1N1/8/8/PPPPBPPP/RNBQK2R w KQkq - 0 9",
    eco: "C59",
    openingName: "Two knights defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 d5 5. exd5 Na5 6. Bb5+ c6 7. dxc6 bxc6 8. Be2 h6"
}, {
    fen: "r1b1k2r/p1q2pp1/2pb1n1p/n3N3/3Pp3/8/PPPBBPPP/RN1QK2R b KQkq - 2 12",
    eco: "C59",
    openingName: "two knights defence: Knorre variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 d5 5. exd5 Na5 6. Bb5+ c6 7. dxc6 bxc6 8. Be2 h6 9. Nf3 e4 10. Ne5 Bd6 11. d4 Qc7 12. Bd2"
}, {
    fen: "r1b1kb1r/p1q2pp1/2p2n1p/n3N3/4p3/8/PPPPBPPP/RNBQK2R w KQkq - 2 11",
    eco: "C59",
    openingName: "two knights defence: Goering variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 d5 5. exd5 Na5 6. Bb5+ c6 7. dxc6 bxc6 8. Be2 h6 9. Nf3 e4 10. Ne5 Qc7"
}, {
    fen: "r1bqkb1r/p4pp1/2p2n1p/n3p3/8/7N/PPPPBPPP/RNBQK2R b KQkq - 1 9",
    eco: "C59",
    openingName: "two knights defence: Steinitz variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bc4 Nf6 4. Ng5 d5 5. exd5 Na5 6. Bb5+ c6 7. dxc6 bxc6 8. Be2 h6 9. Nh3"
}, {
    fen: "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
    eco: "C60",
    openingName: "Ruy Lopez (Spanish opening)",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5"
}, {
    fen: "r1bqkbnr/pppp2pp/2n2p2/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4",
    eco: "C60",
    openingName: "Ruy Lopez: Nuernberg variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 f6"
}, {
    fen: "r1bqkbnr/pppp1ppp/8/nB2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
    eco: "C60",
    openingName: "Ruy Lopez: Pollock defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Na5"
}, {
    fen: "r1bqk1nr/ppppbppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
    eco: "C60",
    openingName: "Ruy Lopez: Lucena defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Be7"
}, {
    fen: "r1b1kbnr/ppppqppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
    eco: "C60",
    openingName: "Ruy Lopez: Vinogradov variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Qe7"
}, {
    fen: "r1bqkbnr/pppp1p1p/2n5/1B2p1p1/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq g6 0 4",
    eco: "C60",
    openingName: "Ruy Lopez: Brentano defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 g5"
}, {
    fen: "r1bqkbnr/pppp1p1p/2n3p1/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4",
    eco: "C60",
    openingName: "Ruy Lopez: fianchetto (Smyslov/Barnes) defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 g6"
}, {
    fen: "r1bqkb1r/ppppnppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
    eco: "C60",
    openingName: "Ruy Lopez: Cozio defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Nge7"
}, {
    fen: "r1bqkb1r/ppppnp1p/2n3p1/1B2p3/4P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5",
    eco: "C60",
    openingName: "Ruy Lopez: Cozio defence, Paulsen variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Nge7 4. Nc3 g6"
}, {
    fen: "r1bqkbnr/pppp1ppp/8/1B2p3/3nP3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
    eco: "C61",
    openingName: "Ruy Lopez: Bird's defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Nd4"
}, {
    fen: "r1bqkb1r/ppppnppp/8/1B6/3pP3/8/PPPP1PPP/RNBQ1RK1 w kq - 2 6",
    eco: "C61",
    openingName: "Ruy Lopez: Bird's defence, Paulsen variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Nd4 4. Nxd4 exd4 5. O-O Ne7"
}, {
    fen: "r1bqkbnr/ppp2ppp/2np4/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4",
    eco: "C62",
    openingName: "Ruy Lopez: old Steinitz defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 d6"
}, {
    fen: "r2qkb1r/pppb1ppp/2Bp1n2/4p3/3PP3/2N2N2/PPP2PPP/R1BQK2R b KQkq - 0 6",
    eco: "C62",
    openingName: "Ruy Lopez: old Steinitz defence, Nimzovich attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 d6 4. d4 Bd7 5. Nc3 Nf6 6. Bxc6"
}, {
    fen: "r2qkbnr/pppb1ppp/2np4/1B2p3/2PPP3/5N2/PP3PPP/RNBQK2R b KQkq c3 0 5",
    eco: "C62",
    openingName: "Ruy Lopez: old Steinitz defence, semi-Duras variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 d6 4. d4 Bd7 5. c4"
}, {
    fen: "r1bqkbnr/pppp2pp/2n5/1B2pp2/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq f6 0 4",
    eco: "C63",
    openingName: "Ruy Lopez: Schliemann defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 f5"
}, {
    fen: "r1bqkbnr/pppp2pp/2n5/1B2pp2/4P3/2N2N2/PPPP1PPP/R1BQK2R b KQkq - 1 4",
    eco: "C63",
    openingName: "Ruy Lopez: Schliemann defence, Berger variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 f5 4. Nc3"
}, {
    fen: "r1bqk1nr/pppp1ppp/2n5/1Bb1p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
    eco: "C64",
    openingName: "Ruy Lopez: classical (Cordel) defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Bc5"
}, {
    fen: "r1bqk1nr/pppp1ppp/8/1Bb1p3/1P1nP3/5N2/P1PP1PPP/RNBQ1RK1 b kq b3 0 5",
    eco: "C64",
    openingName: "Ruy Lopez: classical defence, Zaitsev variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Bc5 4. O-O Nd4 5. b4"
}, {
    fen: "r1bqk1nr/pppp1ppp/2n5/1Bb1p3/4P3/2P2N2/PP1P1PPP/RNBQK2R b KQkq - 0 4",
    eco: "C64",
    openingName: "Ruy Lopez: classical defence, 4.c3",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Bc5 4. c3"
}, {
    fen: "r1bq1rk1/pppp1ppp/1bn2n2/1B2p3/3PP3/2P2N2/PP3PPP/RNBQ1RK1 w - - 1 7",
    eco: "C64",
    openingName: "Ruy Lopez: classical defence, Benelux variation  ",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Bc5 4. c3 Nf6 5. O-O O-O 6. d4 Bb6"
}, {
    fen: "r1bqk1nr/pppp1ppp/1bn5/1B2p3/4P3/2P2N2/PP1P1PPP/RNBQK2R w KQkq - 1 5",
    eco: "C64",
    openingName: "Ruy Lopez: classical defence, Charousek variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Bc5 4. c3 Bb6"
}, {
    fen: "r1b1k1nr/ppppqppp/2n5/1Bb1p3/4P3/2P2N2/PP1P1PPP/RNBQK2R w KQkq - 1 5",
    eco: "C64",
    openingName: "Ruy Lopez: classical defence, Boden variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Bc5 4. c3 Qe7"
}, {
    fen: "r1bqk1nr/pppp2pp/2n5/1Bb1pp2/4P3/2P2N2/PP1P1PPP/RNBQK2R w KQkq f6 0 5",
    eco: "C64",
    openingName: "Ruy Lopez: Cordel gambit",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Bc5 4. c3 f5"
}, {
    fen: "r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
    eco: "C65",
    openingName: "Ruy Lopez: Berlin defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6"
}, {
    fen: "r1bqkb1r/pppp1ppp/2n2n2/1B6/3pP3/5N2/PPP2PPP/RNBQ1RK1 b kq - 1 5",
    eco: "C65",
    openingName: "Ruy Lopez: Berlin defence, Nyholm attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. d4 exd4 5. O-O"
}, {
    fen: "r1bqkb1r/ppppnppp/5n2/1B2p3/4P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 1 5",
    eco: "C65",
    openingName: "Ruy Lopez: Berlin defence, Mortimer variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. d3 Ne7"
}, {
    fen: "r1bqkb1r/pp1pnppp/2p2n2/1B2N3/4P3/3P4/PPP2PPP/RNBQK2R w KQkq - 0 6",
    eco: "C65",
    openingName: "Ruy Lopez: Berlin defence, Mortimer trap",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. d3 Ne7 5. Nxe5 c6"
}, {
    fen: "r1bqkb1r/ppp2ppp/2Bp1n2/4p3/4P3/3P1N2/PPP2PPP/RNBQK2R b KQkq - 0 5",
    eco: "C65",
    openingName: "Ruy Lopez: Berlin defence, Anderssen variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. d3 d6 5. Bxc6+"
}, {
    fen: "r1bqkb1r/ppp2ppp/2np1n2/1B2p3/2P1P3/3P1N2/PP3PPP/RNBQK2R b KQkq c3 0 5",
    eco: "C65",
    openingName: "Ruy Lopez: Berlin defence, Duras variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. d3 d6 5. c4"
}, {
    fen: "r1bqk2r/pppp1ppp/2n2n2/1Bb1p3/4P3/3PBN2/PPP2PPP/RN1QK2R b KQkq - 2 5",
    eco: "C65",
    openingName: "Ruy Lopez: Berlin defence, Kaufmann variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. d3 Bc5 5. Be3"
}, {
    fen: "r1bqkb1r/pppp1ppp/2n2n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQ1RK1 b kq - 5 4",
    eco: "C65",
    openingName: "Ruy Lopez: Berlin defence, 4.O-O",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. O-O"
}, {
    fen: "r1bqk2r/pppp1ppp/2n2n2/1Bb1p3/4P3/5N2/PPPP1PPP/RNBQ1RK1 w kq - 6 5",
    eco: "C65",
    openingName: "Ruy Lopez: Berlin defence, Beverwijk variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. O-O Bc5"
}, {
    fen: "r1bqkb1r/ppp2ppp/2np1n2/1B2p3/4P3/5N2/PPPP1PPP/RNBQ1RK1 w kq - 0 5",
    eco: "C66",
    openingName: "Ruy Lopez: Berlin defence, 4.O-O, d6",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. O-O d6"
}, {
    fen: "r2qk2r/pppbbppp/2np1n2/1B2p3/3PP3/2N2N2/PPP2PPP/R1BQ1RK1 w kq - 3 7",
    eco: "C66",
    openingName: "Ruy Lopez: Berlin defence, hedgehog variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. O-O d6 5. d4 Bd7 6. Nc3 Be7"
}, {
    fen: "r2q1rk1/pppbbppp/2np1n2/1B2p3/3PP3/2N2N2/PPP2PPP/R1BQR1K1 w - - 5 8",
    eco: "C66",
    openingName: "Ruy Lopez: Berlin defence, Tarrasch trap",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. O-O d6 5. d4 Bd7 6. Nc3 Be7 7. Re1 O-O"
}, {
    fen: "r2qk2r/pppbbppp/2np1n2/1B2p1B1/3PP3/2N2N2/PPP2PPP/R2Q1RK1 b kq - 4 7",
    eco: "C66",
    openingName: "Ruy Lopez: closed Berlin defence, Bernstein variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. O-O d6 5. d4 Bd7 6. Nc3 Be7 7. Bg5"
}, {
    fen: "r2qk2r/pppbbppp/2Bp1n2/4p3/3PP3/2N2N2/PPP2PPP/R1BQ1RK1 b kq - 0 7",
    eco: "C66",
    openingName: "Ruy Lopez: closed Berlin defence, Showalter variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. O-O d6 5. d4 Bd7 6. Nc3 Be7 7. Bxc6"
}, {
    fen: "r2qkb1r/pppb1ppp/2np1n2/1B6/3pP3/2N2N2/PPP2PPP/R1BQ1RK1 w kq - 0 7",
    eco: "C66",
    openingName: "Ruy Lopez: closed Berlin defence, Wolf variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. O-O d6 5. d4 Bd7 6. Nc3 exd4"
}, {
    fen: "r1bqkb1r/pppn1ppp/2np4/1B2p3/3PP3/5N2/PPP2PPP/RNBQ1RK1 w kq - 1 6",
    eco: "C66",
    openingName: "Ruy Lopez: closed Berlin defence, Chigorin variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. O-O d6 5. d4 Nd7"
}, {
    fen: "r1bqkb1r/pppp1ppp/2n5/1B2p3/4n3/5N2/PPPP1PPP/RNBQ1RK1 w kq - 0 5",
    eco: "C67",
    openingName: "Ruy Lopez: Berlin defence, open variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. O-O Nxe4"
}, {
    fen: "r1bqkb1r/pppp1ppp/2nn4/1B2P3/8/5N2/PPP2PPP/RNBQ1RK1 b kq - 0 6",
    eco: "C67",
    openingName: "Ruy Lopez: open Berlin defence, l'Hermet variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. O-O Nxe4 5. d4 Nd6 6. dxe5"
}, {
    fen: "r1bqkb1r/pppp1ppp/2nn4/4p3/B2P4/5N2/PPP2PPP/RNBQ1RK1 b kq - 2 6",
    eco: "C67",
    openingName: "Ruy Lopez: open Berlin defence, Showalter variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. O-O Nxe4 5. d4 Nd6 6. Ba4"
}, {
    fen: "r1bqk2r/ppppbppp/2n5/1B2p3/3Pn3/5N2/PPP2PPP/RNBQ1RK1 w kq - 1 6",
    eco: "C67",
    openingName: "Ruy Lopez: open Berlin defence, 5...Be7",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. O-O Nxe4 5. d4 Be7"
}, {
    fen: "r1bq1rk1/p1ppbppp/8/2p1P3/3B4/2N5/PPP1QPPP/R3R1K1 w - - 0 14",
    eco: "C67",
    openingName: "Ruy Lopez: Berlin defence, Rio de Janeiro variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. O-O Nxe4 5. d4 Be7 6. Qe2 Nd6 7. Bxc6 bxc6 8. dxe5 Nb7 9. Nc3 O-O 10. Re1 Nc5 11. Nd4 Ne6 12. Be3 Nxd4 13. Bxd4 c5"
}, {
    fen: "r1bqk2r/pnppbppp/2p5/4P3/2P5/5N2/PP2QPPP/RNB2RK1 b kq c3 0 9",
    eco: "C67",
    openingName: "Ruy Lopez: Berlin defence, Zukertort variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. O-O Nxe4 5. d4 Be7 6. Qe2 Nd6 7. Bxc6 bxc6 8. dxe5 Nb7 9. c4"
}, {
    fen: "r1bqk2r/pnppbppp/2p5/4P3/8/1P3N2/P1P1QPPP/RNB2RK1 b kq - 0 9",
    eco: "C67",
    openingName: "Ruy Lopez: Berlin defence, Pillsbury variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. O-O Nxe4 5. d4 Be7 6. Qe2 Nd6 7. Bxc6 bxc6 8. dxe5 Nb7 9. b3"
}, {
    fen: "r1bqk2r/pnppbppp/2p5/4P3/3N4/8/PPP1QPPP/RNB2RK1 b kq - 2 9",
    eco: "C67",
    openingName: "Ruy Lopez: Berlin defence, Winawer attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. O-O Nxe4 5. d4 Be7 6. Qe2 Nd6 7. Bxc6 bxc6 8. dxe5 Nb7 9. Nd4"
}, {
    fen: "r1bqk2r/p1ppbppp/2p5/4Pn2/8/5N2/PPP1QPPP/RNB2RK1 w kq - 1 9",
    eco: "C67",
    openingName: "Ruy Lopez: Berlin defence, Cordel variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. O-O Nxe4 5. d4 Be7 6. Qe2 Nd6 7. Bxc6 bxc6 8. dxe5 Nf5"
}, {
    fen: "r1bqk2r/ppp1bppp/2n5/1B1pp3/3Pn3/5N2/PPP1QPPP/RNB2RK1 w kq d6 0 7",
    eco: "C67",
    openingName: "Ruy Lopez: Berlin defence, Trifunovic variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. O-O Nxe4 5. d4 Be7 6. Qe2 d5"
}, {
    fen: "r1bqk2r/ppppbppp/2n5/1B2P3/4n3/5N2/PPP2PPP/RNBQ1RK1 b kq - 0 6",
    eco: "C67",
    openingName: "Ruy Lopez: Berlin defence, Minckwitz variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. O-O Nxe4 5. d4 Be7 6. dxe5"
}, {
    fen: "r1bqkb1r/1ppp1ppp/p1n5/1B2p3/3Pn3/5N2/PPP2PPP/RNBQ1RK1 w kq - 0 6",
    eco: "C67",
    openingName: "Ruy Lopez: Berlin defence, Rosenthal variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 Nf6 4. O-O Nxe4 5. d4 a6"
}, {
    fen: "r1bqkbnr/1ppp1ppp/p1B5/4p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 4",
    eco: "C68",
    openingName: "Ruy Lopez: exchange variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Bxc6"
}, {
    fen: "r3kbnr/1ppb1ppp/p1p5/8/3NP3/8/PPP2PPP/RNB1K2R w KQkq - 1 8",
    eco: "C68",
    openingName: "Ruy Lopez: exchange, Alekhine variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Bxc6 dxc6 5. d4 exd4 6. Qxd4 Qxd4 7. Nxd4 Bd7"
}, {
    fen: "r1bqkbnr/1pp2ppp/p1p5/4p3/4P3/2N2N2/PPPP1PPP/R1BQK2R b KQkq - 1 5",
    eco: "C68",
    openingName: "Ruy Lopez: exchange, Keres variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Bxc6 dxc6 5. Nc3"
}, {
    fen: "r1bqkbnr/1pp3pp/p1p2p2/4p3/4P3/2NP1N2/PPP2PPP/R1BQK2R b KQkq - 0 6",
    eco: "C68",
    openingName: "Ruy Lopez: exchange, Romanovsky variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Bxc6 dxc6 5. Nc3 f6 6. d3"
}, {
    fen: "r1bqkbnr/1pp2ppp/p1p5/4p3/4P3/5N2/PPPP1PPP/RNBQ1RK1 b kq - 1 5",
    eco: "C69",
    openingName: "Ruy Lopez: exchange variation, 5.O-O",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Bxc6 dxc6 5. O-O"
}, {
    fen: "r2qkbnr/1pp2pp1/p1p5/4p2p/4P1b1/5N1P/PPPP1PP1/RNBQ1RK1 w kq h6 0 7",
    eco: "C69",
    openingName: "Ruy Lopez: exchange variation, Alapin gambit",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Bxc6 dxc6 5. O-O Bg4 6. h3 h5"
}, {
    fen: "r1bqkbnr/1pp3pp/p1p2p2/4p3/4P3/5N2/PPPP1PPP/RNBQ1RK1 w kq - 0 6",
    eco: "C69",
    openingName: "Ruy Lopez: exchange, Gligoric variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Bxc6 dxc6 5. O-O f6"
}, {
    fen: "r1b1kbnr/1pp2ppp/p1pq4/4p3/4P3/5N2/PPPP1PPP/RNBQ1RK1 w kq - 2 6",
    eco: "C69",
    openingName: "Ruy Lopez: exchange, Bronstein variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Bxc6 dxc6 5. O-O Qd6"
}, {
    fen: "r1bqkbnr/1ppp1ppp/p1n5/4p3/B3P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 1 4",
    eco: "C70",
    openingName: "Ruy Lopez",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4"
}, {
    fen: "r1bqkbnr/1ppp1p1p/p1n3p1/4p3/B3P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5",
    eco: "C70",
    openingName: "Ruy Lopez: fianchetto defence deferred",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 g6"
}, {
    fen: "r1bqkb1r/1pppnppp/p1n5/4p3/B3P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 2 5",
    eco: "C70",
    openingName: "Ruy Lopez: Cozio defence deferred",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nge7"
}, {
    fen: "r1bqkbnr/1ppp1ppp/p7/4p3/B2nP3/5N2/PPPP1PPP/RNBQK2R w KQkq - 2 5",
    eco: "C70",
    openingName: "Ruy Lopez: Bird's defence deferred",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nd4"
}, {
    fen: "r1bqk1nr/1ppp1ppp/p1n5/4p3/Bb2P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 2 5",
    eco: "C70",
    openingName: "Ruy Lopez: Alapin's defence deferred",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Bb4"
}, {
    fen: "r1bqk1nr/1ppp1ppp/p1n5/2b1p3/B3P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 2 5",
    eco: "C70",
    openingName: "Ruy Lopez: Classical defence deferred",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Bc5"
}, {
    fen: "r1bqkbnr/2pp1ppp/p1n5/1p2p3/B3P3/5N2/PPPP1PPP/RNBQK2R w KQkq b6 0 5",
    eco: "C70",
    openingName: "Ruy Lopez: Caro variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 b5"
}, {
    fen: "r1bqk1nr/2pp1ppp/p1n5/1pb1p3/4P3/1B3N2/PPPP1PPP/RNBQK2R w KQkq - 2 6",
    eco: "C70",
    openingName: "Ruy Lopez: Graz variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 b5 5. Bb3 Bc5"
}, {
    fen: "r1bqkbnr/2pp1ppp/p7/np2p3/4P3/1B3N2/PPPP1PPP/RNBQK2R w KQkq - 2 6",
    eco: "C70",
    openingName: "Ruy Lopez: Taimanov (chase/wing/accelerated counterthrust) variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 b5 5. Bb3 Na5"
}, {
    fen: "r1bqkbnr/1ppp2pp/p1n5/4pp2/B3P3/5N2/PPPP1PPP/RNBQK2R w KQkq f6 0 5",
    eco: "C70",
    openingName: "Ruy Lopez: Schliemann defence deferred",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 f5"
}, {
    fen: "r1bqkbnr/1pp2ppp/p1np4/4p3/B3P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 5",
    eco: "C71",
    openingName: "Ruy Lopez: modern Steinitz defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 d6"
}, {
    fen: "r1bqkbnr/5ppp/p2p4/1pp5/3QP3/1B6/PPP2PPP/RNB1K2R w KQkq c6 0 9",
    eco: "C71",
    openingName: "Ruy Lopez: Noah's ark trap",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 d6 5. d4 b5 6. Bb3 Nxd4 7. Nxd4 exd4 8. Qxd4 c5"
}, {
    fen: "r1bqkbnr/1pp2ppp/p1np4/4p3/B3P3/2N2N2/PPPP1PPP/R1BQK2R b KQkq - 1 5",
    eco: "C71",
    openingName: "Ruy Lopez: modern Steinitz defence, Three knights variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 d6 5. Nc3"
}, {
    fen: "r1bqkbnr/1pp2ppp/p1np4/4p3/B1P1P3/5N2/PP1P1PPP/RNBQK2R b KQkq c3 0 5",
    eco: "C71",
    openingName: "Ruy Lopez: modern Steinitz defence, Duras (Keres) variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 d6 5. c4"
}, {
    fen: "r1bqkbnr/1pp2ppp/p1np4/4p3/B3P3/5N2/PPPP1PPP/RNBQ1RK1 b kq - 1 5",
    eco: "C72",
    openingName: "Ruy Lopez: modern Steinitz defence, 5.O-O",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 d6 5. O-O"
}, {
    fen: "r1bqkbnr/2p2ppp/p1pp4/4p3/3PP3/5N2/PPP2PPP/RNBQK2R b KQkq d3 0 6",
    eco: "C73",
    openingName: "Ruy Lopez: modern Steinitz defence, Richter variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 d6 5. Bxc6+ bxc6 6. d4"
}, {
    fen: "r1bqkbnr/2p3pp/p1pp1p2/4p3/3PP3/5N2/PPP2PPP/RNBQK2R w KQkq - 0 7",
    eco: "C73",
    openingName: "Ruy Lopez: modern Steinitz defence, Alapin variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 d6 5. Bxc6+ bxc6 6. d4 f6"
}, {
    fen: "r1bqkbnr/1pp2ppp/p1np4/4p3/B3P3/2P2N2/PP1P1PPP/RNBQK2R b KQkq - 0 5",
    eco: "C74",
    openingName: "Ruy Lopez: modern Steinitz defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 d6 5. c3"
}, {
    fen: "r1bqkbnr/1pp3pp/p1np4/4pp2/B3P3/2P2N2/PP1P1PPP/RNBQK2R w KQkq f6 0 6",
    eco: "C74",
    openingName: "Ruy Lopez: modern Steinitz defence, siesta variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 d6 5. c3 f5"
}, {
    fen: "r2qkbnr/1pp3pp/p1np4/4pb2/B7/2P2N2/PP1P1PPP/RNBQ1RK1 b kq - 1 7",
    eco: "C74",
    openingName: "Ruy Lopez: Siesta, Kopayev variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 d6 5. c3 f5 6. exf5 Bxf5 7. O-O"
}, {
    fen: "r2qkbnr/1ppb1ppp/p1np4/4p3/B3P3/2P2N2/PP1P1PPP/RNBQK2R w KQkq - 1 6",
    eco: "C75",
    openingName: "Ruy Lopez: modern Steinitz defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 d6 5. c3 Bd7"
}, {
    fen: "r2qkb1r/1ppbnppp/p1np4/4p3/B2PP3/2P2N2/PP3PPP/RNBQK2R w KQkq - 1 7",
    eco: "C75",
    openingName: "Ruy Lopez: modern Steinitz defence, Rubinstein variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 d6 5. c3 Bd7 6. d4 Nge7"
}, {
    fen: "r2qkbnr/1ppb1p1p/p1np2p1/4p3/B2PP3/2P2N2/PP3PPP/RNBQK2R w KQkq - 0 7",
    eco: "C76",
    openingName: "Ruy Lopez: modern Steinitz defence, fianchetto (Bronstein) variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 d6 5. c3 Bd7 6. d4 g6"
}, {
    fen: "r1bqkb1r/1ppp1ppp/p1n2n2/4p3/B3P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 2 5",
    eco: "C77",
    openingName: "Ruy Lopez: Morphy defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6"
}, {
    fen: "r1bqkb1r/1ppp1ppp/p1n2n2/4p3/B3P3/2N2N2/PPPP1PPP/R1BQK2R b KQkq - 3 5",
    eco: "C77",
    openingName: "Ruy Lopez: four knights (Tarrasch) variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. Nc3"
}, {
    fen: "r1bqkb1r/1ppp1ppp/p1B2n2/4p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 5",
    eco: "C77",
    openingName: "Ruy Lopez: Treybal (Bayreuth) variation (exchange var. deferred)",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. Bxc6"
}, {
    fen: "r1bqkb1r/1ppp1ppp/p1n2n2/4p3/B3P3/5N2/PPPPQPPP/RNB1K2R b KQkq - 3 5",
    eco: "C77",
    openingName: "Ruy Lopez: Wormald (Alapin) attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. Qe2"
}, {
    fen: "r2qk2r/2p1bppp/p1np1n2/1p2p3/3PP1b1/1BP2N2/PP2QPPP/RNB1K2R w KQkq - 1 9",
    eco: "C77",
    openingName: "Ruy Lopez: Wormald attack, Gruenfeld variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. Qe2 b5 6. Bb3 Be7 7. d4 d6 8. c3 Bg4"
}, {
    fen: "r1bqkb1r/1ppp1ppp/p1n2n2/4p3/B3P3/3P1N2/PPP2PPP/RNBQK2R b KQkq - 0 5",
    eco: "C77",
    openingName: "Ruy Lopez: Anderssen variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. d3"
}, {
    fen: "r1bqkb1r/1pp2ppp/p1np1n2/4p3/B1P1P3/3P1N2/PP3PPP/RNBQK2R b KQkq c3 0 6",
    eco: "C77",
    openingName: "Ruy Lopez: Morphy defence, Duras variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. d3 d6 6. c4"
}, {
    fen: "r1bqkb1r/1ppp1ppp/p1n2n2/4p3/B3P3/5N2/PPPP1PPP/RNBQ1RK1 b kq - 3 5",
    eco: "C78",
    openingName: "Ruy Lopez: 5.O-O",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O"
}, {
    fen: "r1bqk2r/2ppbppp/p1n2n2/1p2p3/P3P3/1B3N2/1PPP1PPP/RNBQ1RK1 b kq a3 0 7",
    eco: "C78",
    openingName: "Ruy Lopez: Wing attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O b5 6. Bb3 Be7 7. a4"
}, {
    fen: "r1bqkb1r/2p2ppp/p1np1n2/1p2p3/4P3/1B3N2/PPPP1PPP/RNBQ1RK1 w kq - 0 7",
    eco: "C78",
    openingName: "Ruy Lopez: ...b5 & ...d6",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O b5 6. Bb3 d6"
}, {
    fen: "r1bq1k1r/2p2ppp/p4n2/1pbPR1N1/3n4/1B6/PPPP1PPP/RNBQ2K1 w - - 1 11",
    eco: "C78",
    openingName: "Ruy Lopez: Rabinovich variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O b5 6. Bb3 d6 7. Ng5 d5 8. exd5 Nd4 9. Re1 Bc5 10. Rxe5+ Kf8"
}, {
    fen: "r2qkb1r/1bpp1ppp/p1n2n2/1p2p3/4P3/1B3N2/PPPP1PPP/RNBQ1RK1 w kq - 2 7",
    eco: "C78",
    openingName: "Ruy Lopez: Archangelsk (counterthrust) variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O b5 6. Bb3 Bb7"
}, {
    fen: "r1bqk2r/1ppp1ppp/p1n2n2/2b1p3/B3P3/5N2/PPPP1PPP/RNBQ1RK1 w kq - 4 6",
    eco: "C78",
    openingName: "Ruy Lopez: Moeller defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Bc5"
}, {
    fen: "r1bqkb1r/1pp2ppp/p1np1n2/4p3/B3P3/5N2/PPPP1PPP/RNBQ1RK1 w kq - 0 6",
    eco: "C79",
    openingName: "Ruy Lopez: Steinitz defence deferred (Russian defence)",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O d6"
}, {
    fen: "r2qkb1r/2p2ppp/p1pp1n2/4p3/3PP1b1/5N2/PPP2PPP/RNBQ1RK1 w kq - 1 8",
    eco: "C79",
    openingName: "Ruy Lopez: Steinitz defence deferred, Lipnitsky variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O d6 6. Bxc6+ bxc6 7. d4 Bg4"
}, {
    fen: "r1bqkb1r/2p2ppp/p1pp4/4p3/3Pn3/5N2/PPP2PPP/RNBQ1RK1 w kq - 0 8",
    eco: "C79",
    openingName: "Ruy Lopez: Steinitz defence deferred, Rubinstein variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O d6 6. Bxc6+ bxc6 7. d4 Nxe4"
}, {
    fen: "r1bqkb1r/2p3pp/p1p5/3pPp2/4n3/2N2N2/PPP2PPP/R1BQR1K1 b kq - 1 10",
    eco: "C79",
    openingName: "Ruy Lopez: Steinitz defence deferred, Boleslavsky variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O d6 6. Bxc6+ bxc6 7. d4 Nxe4 8. Re1 f5 9. dxe5 d5 10. Nc3"
}, {
    fen: "r1bqkb1r/1ppp1ppp/p1n5/4p3/B3n3/5N2/PPPP1PPP/RNBQ1RK1 w kq - 0 6",
    eco: "C80",
    openingName: "Ruy Lopez: open (Tarrasch) defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Nxe4"
}, {
    fen: "r1bqkb1r/1ppp1ppp/p1n5/4p3/B3n3/5N2/PPPPQPPP/RNB2RK1 b kq - 1 6",
    eco: "C80",
    openingName: "Ruy Lopez: open, Tartakower variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Nxe4 6. Qe2"
}, {
    fen: "r1bqkb1r/1ppp1ppp/p1n5/4p3/B3n3/2N2N2/PPPP1PPP/R1BQ1RK1 b kq - 1 6",
    eco: "C80",
    openingName: "Ruy Lopez: open, Knorre variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Nxe4 6. Nc3"
}, {
    fen: "r1bqkb1r/1ppp1ppp/p1n5/4p3/B2Pn3/5N2/PPP2PPP/RNBQ1RK1 b kq d3 0 6",
    eco: "C80",
    openingName: "Ruy Lopez: open, 6.d4",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Nxe4 6. d4"
}, {
    fen: "r1bqkb1r/1ppp1ppp/p1n5/8/B2pn3/5N2/PPP2PPP/RNBQ1RK1 w kq - 0 7",
    eco: "C80",
    openingName: "Ruy Lopez: open, Riga variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Nxe4 6. d4 exd4"
}, {
    fen: "r1bqkb1r/2pp1ppp/p1n5/1p2p3/B2Pn3/5N2/PPP2PPP/RNBQ1RK1 w kq b6 0 7",
    eco: "C80",
    openingName: "Ruy Lopez: open, 6.d4 b5",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Nxe4 6. d4 b5"
}, {
    fen: "r1bqkb1r/2pp1ppp/p1n5/1p2N3/B2Pn3/8/PPP2PPP/RNBQ1RK1 b kq - 0 7",
    eco: "C80",
    openingName: "Ruy Lopez: open, Friess attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Nxe4 6. d4 b5 7. Nxe5"
}, {
    fen: "r1bqkb1r/2pp1ppp/p1n5/1p1Pp3/B3n3/5N2/PPP2PPP/RNBQ1RK1 b kq - 0 7",
    eco: "C80",
    openingName: "Ruy Lopez: open, Richter variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Nxe4 6. d4 b5 7. d5"
}, {
    fen: "r1bqkb1r/2pp1ppp/p1n5/1p2p3/3Pn3/1B3N2/PPP2PPP/RNBQ1RK1 b kq - 1 7",
    eco: "C80",
    openingName: "Ruy Lopez: open, 7.Bb3",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Nxe4 6. d4 b5 7. Bb3"
}, {
    fen: "r1bqkb1r/2p2ppp/p7/1p1pp3/P2nn3/1B3N2/1PP2PPP/RNBQ1RK1 w kq - 0 9",
    eco: "C80",
    openingName: "Ruy Lopez: open, Schlechter defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Nxe4 6. d4 b5 7. Bb3 d5 8. a4 Nxd4"
}, {
    fen: "r1bqkb1r/2p2ppp/p7/1p1p4/P2pn3/1BN5/1PP2PPP/R1BQ1RK1 b kq - 1 10",
    eco: "C80",
    openingName: "Ruy Lopez: open, Berger variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Nxe4 6. d4 b5 7. Bb3 d5 8. a4 Nxd4 9. Nxd4 exd4 10. Nc3"
}, {
    fen: "r1bqkb1r/2p2ppp/p1n5/1p1pp3/2PPn3/1B3N2/PP3PPP/RNBQ1RK1 b kq c3 0 8",
    eco: "C80",
    openingName: "Ruy Lopez: open, Harksen gambit",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Nxe4 6. d4 b5 7. Bb3 d5 8. c4"
}, {
    fen: "r1bqkb1r/2p2ppp/p1n5/1p1pP3/4n3/1B3N2/PPP2PPP/RNBQ1RK1 b kq - 0 8",
    eco: "C80",
    openingName: "Ruy Lopez: open, 8.de",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Nxe4 6. d4 b5 7. Bb3 d5 8. dxe5"
}, {
    fen: "r1bqkb1r/2p1nppp/p7/1p1pP3/4n3/1B3N2/PPP2PPP/RNBQ1RK1 w kq - 1 9",
    eco: "C80",
    openingName: "Ruy Lopez: open, Zukertort variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Nxe4 6. d4 b5 7. Bb3 d5 8. dxe5 Ne7"
}, {
    fen: "r2qkb1r/2p2ppp/p1n1b3/1p1pP3/4n3/1B3N2/PPP2PPP/RNBQ1RK1 w kq - 1 9",
    eco: "C80",
    openingName: "Ruy Lopez: open, 8...Be6",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Nxe4 6. d4 b5 7. Bb3 d5 8. dxe5 Be6"
}, {
    fen: "r2qkb1r/2p2ppp/p1n1b3/1p1pP3/4n3/1B3N2/PPPN1PPP/R1BQ1RK1 b kq - 2 9",
    eco: "C80",
    openingName: "Ruy Lopez: open, Bernstein variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Nxe4 6. d4 b5 7. Bb3 d5 8. dxe5 Be6 9. Nbd2"
}, {
    fen: "r2qkb1r/2p2ppp/p1n1b3/1pn1P1N1/3p4/1BP5/PP1N1PPP/R1BQ1RK1 b kq - 1 11",
    eco: "C80",
    openingName: "Ruy Lopez: open, Bernstein variation, Karpov gambit",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Nxe4 6. d4 b5 7. Bb3 d5 8. dxe5 Be6 9. Nbd2 Nc5 10. c3 d4 11. Ng5"
}, {
    fen: "r2qkb1r/2p2ppp/p1n1b3/1p1pP3/4n3/1B3N2/PPP1QPPP/RNB2RK1 b kq - 2 9",
    eco: "C81",
    openingName: "Ruy Lopez: open, Howell attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Nxe4 6. d4 b5 7. Bb3 d5 8. dxe5 Be6 9. Qe2"
}, {
    fen: "r4rk1/2pqbppp/p1n1b3/3pP3/2B1n3/5N2/PP2QPPP/RNBR2K1 w - - 1 13",
    eco: "C81",
    openingName: "Ruy Lopez: open, Howell attack, Ekstroem variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Nxe4 6. d4 b5 7. Bb3 d5 8. dxe5 Be6 9. Qe2 Be7 10. Rd1 O-O 11. c4 bxc4 12. Bxc4 Qd7"
}, {
    fen: "r2qk2r/2p1bppp/p1n1b3/1p1pP3/2P1n3/1B3N2/PP2QPPP/RNB2RK1 b kq c3 0 10",
    eco: "C81",
    openingName: "Ruy Lopez: open, Howell attack, Adam variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Nxe4 6. d4 b5 7. Bb3 d5 8. dxe5 Be6 9. Qe2 Be7 10. c4"
}, {
    fen: "r2qkb1r/2p2ppp/p1n1b3/1p1pP3/4n3/1BP2N2/PP3PPP/RNBQ1RK1 b kq - 0 9",
    eco: "C82",
    openingName: "Ruy Lopez: open, 9.c3",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Nxe4 6. d4 b5 7. Bb3 d5 8. dxe5 Be6 9. c3"
}, {
    fen: "r2qkb1r/2p2ppp/p1n1b3/1pnpP3/8/1BP2N2/PP3PPP/RNBQ1RK1 w kq - 1 10",
    eco: "C82",
    openingName: "Ruy Lopez: open, Berlin variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Nxe4 6. d4 b5 7. Bb3 d5 8. dxe5 Be6 9. c3 Nc5"
}, {
    fen: "r2qk2r/2p2ppp/p1n1b3/1pbpP3/4n3/1BP2N2/PP3PPP/RNBQ1RK1 w kq - 1 10",
    eco: "C82",
    openingName: "Ruy Lopez: open, Italian variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Nxe4 6. d4 b5 7. Bb3 d5 8. dxe5 Be6 9. c3 Bc5"
}, {
    fen: "r2qk2r/2p2ppp/p1n1b3/1pbpP3/4n3/1BP2N2/PP1N1PPP/R1BQ1RK1 b kq - 2 10",
    eco: "C82",
    openingName: "Ruy Lopez: open, St. Petersburg variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Nxe4 6. d4 b5 7. Bb3 d5 8. dxe5 Be6 9. c3 Bc5 10. Nbd2"
}, {
    fen: "r2q1rk1/2p2ppp/p1n1b3/1pbpP3/8/2P2N2/PPBN1nPP/R1BQ1RK1 w - - 0 12",
    eco: "C82",
    openingName: "Ruy Lopez: open, Dilworth variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Nxe4 6. d4 b5 7. Bb3 d5 8. dxe5 Be6 9. c3 Bc5 10. Nbd2 O-O 11. Bc2 Nxf2"
}, {
    fen: "r2qk2r/2p2ppp/p1n1b3/1pbpP3/4n3/1BPQ1N2/PP3PPP/RNB2RK1 b kq - 2 10",
    eco: "C82",
    openingName: "Ruy Lopez: open, Motzko attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Nxe4 6. d4 b5 7. Bb3 d5 8. dxe5 Be6 9. c3 Bc5 10. Qd3"
}, {
    fen: "r2qk2r/2p1nppp/p3b3/1pbpP3/4n3/1BPQ1N2/PP3PPP/RNB2RK1 w kq - 3 11",
    eco: "C82",
    openingName: "Ruy Lopez: open, Motzko attack, Nenarokov variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Nxe4 6. d4 b5 7. Bb3 d5 8. dxe5 Be6 9. c3 Bc5 10. Qd3 Ne7"
}, {
    fen: "r2qk2r/2p1bppp/p1n1b3/1p1pP3/4n3/1BP2N2/PP3PPP/RNBQ1RK1 w kq - 1 10",
    eco: "C83",
    openingName: "Ruy Lopez: open, classical defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Nxe4 6. d4 b5 7. Bb3 d5 8. dxe5 Be6 9. c3 Be7"
}, {
    fen: "r2q1rk1/2p1bppp/p1n1b3/1p1pP3/4n3/1BP2N2/PP1NQPPP/R1B2RK1 b - - 4 11",
    eco: "C83",
    openingName: "Ruy Lopez: open, Malkin variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Nxe4 6. d4 b5 7. Bb3 d5 8. dxe5 Be6 9. c3 Be7 10. Nbd2 O-O 11. Qe2"
}, {
    fen: "r2qk2r/2p1bppp/p1n1b3/1p1pP3/4n3/1BP2N2/PP3PPP/RNBQR1K1 b kq - 2 10",
    eco: "C83",
    openingName: "Ruy Lopez: open, 9...Be7, 10.Re1",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Nxe4 6. d4 b5 7. Bb3 d5 8. dxe5 Be6 9. c3 Be7 10. Re1"
}, {
    fen: "r4rk1/2pqb1pp/p1n1p3/1p1pP3/4R3/1BP5/PP3PPP/RNBQ2K1 b - - 0 13",
    eco: "C83",
    openingName: "Ruy Lopez: open, Tarrasch trap",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Nxe4 6. d4 b5 7. Bb3 d5 8. dxe5 Be6 9. c3 Be7 10. Re1 O-O 11. Nd4 Qd7 12. Nxe6 fxe6 13. Rxe4"
}, {
    fen: "r2q1rk1/2p1bppp/p3b3/1p1pn3/3Nn3/1BP5/PP3PPP/RNBQR1K1 w - - 0 12",
    eco: "C83",
    openingName: "Ruy Lopez: open, Breslau variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Nxe4 6. d4 b5 7. Bb3 d5 8. dxe5 Be6 9. c3 Be7 10. Re1 O-O 11. Nd4 Nxe5"
}, {
    fen: "r1bqk2r/1pppbppp/p1n2n2/4p3/B3P3/5N2/PPPP1PPP/RNBQ1RK1 w kq - 4 6",
    eco: "C84",
    openingName: "Ruy Lopez: closed defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7"
}, {
    fen: "r1bqk2r/1pppbppp/p1n2n2/4p3/B2PP3/5N2/PPP2PPP/RNBQ1RK1 b kq d3 0 6",
    eco: "C84",
    openingName: "Ruy Lopez: closed, centre attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. d4"
}, {
    fen: "r1bqk2r/1pppbppp/p1n5/4P3/B2pn3/2P2N2/PP3PPP/RNBQ1RK1 b kq - 0 8",
    eco: "C84",
    openingName: "Ruy Lopez: closed, Basque gambit (North Spanish variation)",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. d4 exd4 7. e5 Ne4 8. c3"
}, {
    fen: "r1bqk2r/1pppbppp/p1B2n2/4p3/4P3/5N2/PPPP1PPP/RNBQ1RK1 b kq - 0 6",
    eco: "C85",
    openingName: "Ruy Lopez: Exchange variation doubly deferred (DERLD)",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Bxc6"
}, {
    fen: "r1bqk2r/1pppbppp/p1n2n2/4p3/B3P3/5N2/PPPPQPPP/RNB2RK1 b kq - 5 6",
    eco: "C86",
    openingName: "Ruy Lopez: Worrall attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Qe2"
}, {
    fen: "r1bq1rk1/2ppbppp/p1n2n2/1p2p3/4P3/1B3N2/PPPPQPPP/RNB2RK1 w - - 2 8",
    eco: "C86",
    openingName: "Ruy Lopez: Worrall attack, sharp line",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Qe2 b5 7. Bb3 O-O"
}, {
    fen: "r1bqk2r/2p1bppp/p1np1n2/1p2p3/4P3/1B3N2/PPPPQPPP/RNB2RK1 w kq - 0 8",
    eco: "C86",
    openingName: "Ruy Lopez: Worrall attack, solid line",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Qe2 b5 7. Bb3 d6"
}, {
    fen: "r1bqk2r/1pp1bppp/p1np1n2/4p3/B3P3/5N2/PPPP1PPP/RNBQR1K1 w kq - 0 7",
    eco: "C87",
    openingName: "Ruy Lopez: closed, Averbach variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 d6"
}, {
    fen: "r1bqk2r/2ppbppp/p1n2n2/1p2p3/4P3/1B3N2/PPPP1PPP/RNBQR1K1 b kq - 1 7",
    eco: "C88",
    openingName: "Ruy Lopez: closed",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3"
}, {
    fen: "rnb1k2r/2q1bp1p/p2p1n2/1ppPp1p1/4P3/2P2N1P/PPBN1PP1/R1BQR1K1 w kq g6 0 14",
    eco: "C88",
    openingName: "Ruy Lopez: closed, Leonhardt variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 Na5 9. Bc2 c5 10. d4 Qc7 11. h3 Nc6 12. d5 Nb8 13. Nbd2 g5"
}, {
    fen: "r1b1k2r/2q1bppp/p2p1n2/npp1p3/P2PP3/2P2N2/1PB2PPP/RNBQR1K1 b kq a3 0 11",
    eco: "C88",
    openingName: "Ruy Lopez: closed, Balla variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. c3 Na5 9. Bc2 c5 10. d4 Qc7 11. a4"
}, {
    fen: "r1bqk2r/2p1bppp/p1np1n2/1p2p3/3PP3/1B3N2/PPP2PPP/RNBQR1K1 b kq d3 0 8",
    eco: "C88",
    openingName: "Ruy Lopez: closed, 7...d6, 8.d4",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. d4"
}, {
    fen: "r1bqk2r/4bppp/p2p1n2/1pp5/3QP3/1B6/PPP2PPP/RNB1R1K1 w kq c6 0 11",
    eco: "C88",
    openingName: "Ruy Lopez: Noah's ark trap",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 d6 8. d4 Nxd4 9. Nxd4 exd4 10. Qxd4 c5"
}, {
    fen: "r2qk2r/1bppbppp/p1n2n2/1p2p3/4P3/1B3N2/PPPP1PPP/RNBQR1K1 w kq - 2 8",
    eco: "C88",
    openingName: "Ruy Lopez: Trajkovic counter-attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 Bb7"
}, {
    fen: "r1bq1rk1/2ppbppp/p1n2n2/1p2p3/4P3/1B3N2/PPPP1PPP/RNBQR1K1 w - - 2 8",
    eco: "C88",
    openingName: "Ruy Lopez: closed, 7...O-O",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O"
}, {
    fen: "r1bq1rk1/2ppbppp/p1n2n2/1p2p3/P3P3/1B3N2/1PPP1PPP/RNBQR1K1 b - a3 0 8",
    eco: "C88",
    openingName: "Ruy Lopez: closed, anti-Marshall 8.a4",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. a4"
}, {
    fen: "r1bq1rk1/2ppbppp/p1n2n2/1p2p3/4P3/1BP2N2/PP1P1PPP/RNBQR1K1 b - - 0 8",
    eco: "C88",
    openingName: "Ruy Lopez: closed, 8.c3",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. c3"
}, {
    fen: "r1bq1rk1/2p1bppp/p1n2n2/1p1pp3/4P3/1BP2N2/PP1P1PPP/RNBQR1K1 w - d6 0 9",
    eco: "C89",
    openingName: "Ruy Lopez: Marshall counter-attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. c3 d5"
}, {
    fen: "r1bq1rk1/4bppp/p1p5/1p1nR3/8/1BP5/PP1P1PPP/RNBQ2K1 w - - 0 12",
    eco: "C89",
    openingName: "Ruy Lopez: Marshall counter-attack, 11...c6",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. c3 d5 9. exd5 Nxd5 10. Nxe5 Nxe5 11. Rxe5 c6"
}, {
    fen: "r1bq1rk1/5ppp/p2b4/1p1p4/3P4/2P1R3/PP3PPP/RNBQ2K1 b - - 2 14",
    eco: "C89",
    openingName: "Ruy Lopez: Marshall, Kevitz variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. c3 d5 9. exd5 Nxd5 10. Nxe5 Nxe5 11. Rxe5 c6 12. Bxd5 cxd5 13. d4 Bd6 14. Re3"
}, {
    fen: "r1bq1rk1/4bppp/p1p5/1p1nR3/3P4/1BP5/PP3PPP/RNBQ2K1 b - d3 0 12",
    eco: "C89",
    openingName: "Ruy Lopez: Marshall, main line, 12.d2d4",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. c3 d5 9. exd5 Nxd5 10. Nxe5 Nxe5 11. Rxe5 c6 12. d4"
}, {
    fen: "r1b2rk1/5ppp/p1pb4/1p1n4/3P4/1BP3Pq/PP3P1P/RNBQR1K1 w - - 1 15",
    eco: "C89",
    openingName: "Ruy Lopez: Marshall, main line, 14...Qh3",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. c3 d5 9. exd5 Nxd5 10. Nxe5 Nxe5 11. Rxe5 c6 12. d4 Bd6 13. Re1 Qh4 14. g3 Qh3"
}, {
    fen: "5rk1/5ppp/p1pbr3/1p1n3q/P2P2b1/1BPQB1P1/1P1N1P1P/R3R1K1 w - - 1 19",
    eco: "C89",
    openingName: "Ruy Lopez: Marshall, main line, Spassky variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. c3 d5 9. exd5 Nxd5 10. Nxe5 Nxe5 11. Rxe5 c6 12. d4 Bd6 13. Re1 Qh4 14. g3 Qh3 15. Be3 Bg4 16. Qd3 Rae8 17. Nd2 Re6 18. a4 Qh5"
}, {
    fen: "r1bq1rk1/2p1bppp/p1n2n2/1p1P4/4p3/1BP2N2/PP1P1PPP/RNBQR1K1 w - - 0 10",
    eco: "C89",
    openingName: "Ruy Lopez: Marshall, Herman Steiner variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. c3 d5 9. exd5 e4"
}, {
    fen: "r1bq1rk1/2p1bppp/p1np1n2/1p2p3/4P3/1BP2N2/PP1P1PPP/RNBQR1K1 w - - 0 9",
    eco: "C90",
    openingName: "Ruy Lopez: closed (with ...d6)",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. c3 d6"
}, {
    fen: "r1bq1rk1/2p1bppp/p1np1n2/1p2p3/4P3/1BPP1N2/PP3PPP/RNBQR1K1 b - - 0 9",
    eco: "C90",
    openingName: "Ruy Lopez: closed, Pilnik variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. c3 d6 9. d3"
}, {
    fen: "r1bq1rk1/2p1bppp/p1np1n2/1p2p3/4P3/2P2N2/PPBP1PPP/RNBQR1K1 b - - 1 9",
    eco: "C90",
    openingName: "Ruy Lopez: closed, Lutikov variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. c3 d6 9. Bc2"
}, {
    fen: "r1bq1rk1/2p1bppp/p1np1n2/1p2p3/4P3/PBP2N2/1P1P1PPP/RNBQR1K1 b - - 0 9",
    eco: "C90",
    openingName: "Ruy Lopez: closed, Suetin variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. c3 d6 9. a3"
}, {
    fen: "r1bq1rk1/2p1bppp/p1np1n2/1p2p3/3PP3/1BP2N2/PP3PPP/RNBQR1K1 b - d3 0 9",
    eco: "C91",
    openingName: "Ruy Lopez: closed, 9.d4",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. c3 d6 9. d4"
}, {
    fen: "r2q1rk1/2p1bppp/p1np1n2/1p2p3/3PP1b1/1BP2N2/PP3PPP/RNBQR1K1 w - - 1 10",
    eco: "C91",
    openingName: "Ruy Lopez: closed, Bogolyubov variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. c3 d6 9. d4 Bg4"
}, {
    fen: "r1bq1rk1/2p1bppp/p1np1n2/1p2p3/4P3/1BP2N1P/PP1P1PP1/RNBQR1K1 b - - 0 9",
    eco: "C92",
    openingName: "Ruy Lopez: closed, 9.h3",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. c3 d6 9. h3"
}, {
    fen: "r1bq1rk1/2p1bppp/2np1n2/pp2p3/4P3/1BP2N1P/PP1P1PP1/RNBQR1K1 w - - 0 10",
    eco: "C92",
    openingName: "Ruy Lopez: closed, Keres (9...a5) variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. c3 d6 9. h3 a5"
}, {
    fen: "r2q1rk1/2p1bppp/p1npbn2/1p2p3/4P3/1BP2N1P/PP1P1PP1/RNBQR1K1 w - - 1 10",
    eco: "C92",
    openingName: "Ruy Lopez: closed, Kholmov variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. c3 d6 9. h3 Be6"
}, {
    fen: "r1bq1rk1/2pnbppp/p1np4/1p2p3/4P3/1BP2N1P/PP1P1PP1/RNBQR1K1 w - - 1 10",
    eco: "C92",
    openingName: "Ruy Lopez: closed, Ragozin-Petrosian (`Keres') variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. c3 d6 9. h3 Nd7"
}, {
    fen: "r2q1rk1/1bp1bppp/p1np1n2/1p2p3/4P3/1BP2N1P/PP1P1PP1/RNBQR1K1 w - - 1 10",
    eco: "C92",
    openingName: "Ruy Lopez: closed, Flohr-Zaitsev system (Lenzerheide variation)",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. c3 d6 9. h3 Bb7"
}, {
    fen: "r1bq1rk1/2p1bpp1/p1np1n1p/1p2p3/4P3/1BP2N1P/PP1P1PP1/RNBQR1K1 w - - 0 10",
    eco: "C93",
    openingName: "Ruy Lopez: closed, Smyslov defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. c3 d6 9. h3 h6"
}, {
    fen: "rnbq1rk1/2p1bppp/p2p1n2/1p2p3/4P3/1BP2N1P/PP1P1PP1/RNBQR1K1 w - - 1 10",
    eco: "C94",
    openingName: "Ruy Lopez: closed, Breyer defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. c3 d6 9. h3 Nb8"
}, {
    fen: "rnbq1rk1/2p1bppp/p2p1n2/1p2p3/3PP3/1BP2N1P/PP3PP1/RNBQR1K1 b - d3 0 10",
    eco: "C95",
    openingName: "Ruy Lopez: closed, Breyer, 10.d4",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. c3 d6 9. h3 Nb8 10. d4"
}, {
    fen: "r1bq1rk1/2pnbppp/p2p1n2/1p2p3/3PP3/1BP2N1P/PP3PP1/RNBQR1K1 w - - 1 11",
    eco: "C95",
    openingName: "Ruy Lopez: closed, Breyer, Borisenko variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. c3 d6 9. h3 Nb8 10. d4 Nbd7"
}, {
    fen: "r2q1rk1/1b1nbppp/p2p1n2/1pp1p3/3PP3/2P2N1P/PPBN1PP1/R1BQR1K1 w - c6 0 13",
    eco: "C95",
    openingName: "Ruy Lopez: closed, Breyer, Gligoric variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. c3 d6 9. h3 Nb8 10. d4 Nbd7 11. Nbd2 Bb7 12. Bc2 c5"
}, {
    fen: "r1bq1rk1/2pnbppp/p2p1n2/1p2p3/3PP2N/1BP4P/PP3PP1/RNBQR1K1 b - - 2 11",
    eco: "C95",
    openingName: "Ruy Lopez: closed, Breyer, Simagin variation",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. c3 d6 9. h3 Nb8 10. d4 Nbd7 11. Nh4"
}, {
    fen: "r1bq1rk1/2p1bppp/p2p1n2/np2p3/4P3/2P2N1P/PPBP1PP1/RNBQR1K1 b - - 2 10",
    eco: "C96",
    openingName: "Ruy Lopez: closed (8...Na5)",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. c3 d6 9. h3 Na5 10. Bc2"
}, {
    fen: "r1b2rk1/2q1bppp/p1pp1n2/np2p3/3PP3/2P2N1P/PPB2PP1/RNBQR1K1 w - - 1 12",
    eco: "C96",
    openingName: "Ruy Lopez: closed, Rossolimo defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. c3 d6 9. h3 Na5 10. Bc2 c6 11. d4 Qc7"
}, {
    fen: "r1bq1rk1/4bppp/p2p1n2/npp1p3/4P3/2P2N1P/PPBP1PP1/RNBQR1K1 w - c6 0 11",
    eco: "C96",
    openingName: "Ruy Lopez: closed (10...c5)",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. c3 d6 9. h3 Na5 10. Bc2 c5"
}, {
    fen: "r1bq1rk1/4bppp/p1np1n2/1pp1p3/3PP3/2P2N1P/PPB2PP1/RNBQR1K1 w - - 1 12",
    eco: "C96",
    openingName: "Ruy Lopez: closed, Borisenko defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. c3 d6 9. h3 Na5 10. Bc2 c5 11. d4 Nc6"
}, {
    fen: "r1bq1rk1/3nbppp/p2p4/npp1p3/3PP3/2P2N1P/PPB2PP1/RNBQR1K1 w - - 1 12",
    eco: "C96",
    openingName: "Ruy Lopez: closed, Keres (...Nd7) defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. c3 d6 9. h3 Na5 10. Bc2 c5 11. d4 Nd7"
}, {
    fen: "r1b2rk1/2q1bppp/p2p1n2/npp1p3/3PP3/2P2N1P/PPB2PP1/RNBQR1K1 w - - 1 12",
    eco: "C97",
    openingName: "Ruy Lopez: closed, Chigorin defence",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. c3 d6 9. h3 Na5 10. Bc2 c5 11. d4 Qc7"
}, {
    fen: "r3r1k1/2qbbp1p/p2p1np1/npp1p3/3PP3/2P1NN1P/PPB2PP1/R1BQR1K1 w - - 0 15",
    eco: "C97",
    openingName: "Ruy Lopez: closed, Chigorin, Yugoslav system",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. c3 d6 9. h3 Na5 10. Bc2 c5 11. d4 Qc7 12. Nbd2 Bd7 13. Nf1 Rfe8 14. Ne3 g6"
}, {
    fen: "r1b2rk1/2q1bppp/p1np1n2/1pp1p3/3PP3/2P2N1P/PPBN1PP1/R1BQR1K1 w - - 3 13",
    eco: "C98",
    openingName: "Ruy Lopez: closed, Chigorin, 12...Nc6",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. c3 d6 9. h3 Na5 10. Bc2 c5 11. d4 Qc7 12. Nbd2 Nc6"
}, {
    fen: "r1b2rk1/2q1bppp/p1np1n2/1pP1p3/4P3/2P2N1P/PPBN1PP1/R1BQR1K1 b - - 0 13",
    eco: "C98",
    openingName: "Ruy Lopez: closed, Chigorin, Rauzer attack",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. c3 d6 9. h3 Na5 10. Bc2 c5 11. d4 Qc7 12. Nbd2 Nc6 13. dxc5"
}, {
    fen: "r1b2rk1/2q1bppp/p2p1n2/np2p3/3PP3/5N1P/PPBN1PP1/R1BQR1K1 b - - 0 13",
    eco: "C99",
    openingName: "Ruy Lopez: closed, Chigorin, 12...c5d4",
    moves: "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6 4. Ba4 Nf6 5. O-O Be7 6. Re1 b5 7. Bb3 O-O 8. c3 d6 9. h3 Na5 10. Bc2 c5 11. d4 Qc7 12. Nbd2 cxd4 13. cxd4"
}, {
    fen: "rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq d6 0 2",
    eco: "D00",
    openingName: "Queen's pawn game",
    moves: "1. d4 d5"
}, {
    fen: "rnbqkbnr/ppp1pppp/8/3p4/3P1B2/8/PPP1PPPP/RN1QKBNR b KQkq - 1 2",
    eco: "D00",
    openingName: "Queen's pawn, Mason variation",
    moves: "1. d4 d5 2. Bf4"
}, {
    fen: "rnbqkbnr/pp2pppp/8/2pp4/3P1B2/8/PPP1PPPP/RN1QKBNR w KQkq c6 0 3",
    eco: "D00",
    openingName: "Queen's pawn, Mason variation, Steinitz counter-gambit",
    moves: "1. d4 d5 2. Bf4 c5"
}, {
    fen: "rnbqkbnr/ppp1pppp/8/3p2B1/3P4/8/PPP1PPPP/RN1QKBNR b KQkq - 1 2",
    eco: "D00",
    openingName: "Levitsky attack (Queen's bishop attack)",
    moves: "1. d4 d5 2. Bg5"
}, {
    fen: "rnbqkbnr/ppp1pppp/8/3p4/3PP3/8/PPP2PPP/RNBQKBNR b KQkq e3 0 2",
    eco: "D00",
    openingName: "Blackmar gambit",
    moves: "1. d4 d5 2. e4"
}, {
    fen: "rnbqkb1r/ppp1pppp/5n2/3p4/3P4/3BP3/PPP2PPP/RNBQK1NR b KQkq - 2 3",
    eco: "D00",
    openingName: "Queen's pawn: stonewall attack",
    moves: "1. d4 d5 2. e3 Nf6 3. Bd3"
}, {
    fen: "rnbqkbnr/ppp1pppp/8/3p4/3P4/2N5/PPP1PPPP/R1BQKBNR b KQkq - 1 2",
    eco: "D00",
    openingName: "Queen's pawn: Chigorin variation",
    moves: "1. d4 d5 2. Nc3"
}, {
    fen: "rn1qkbnr/ppp1pppp/8/3p4/3P2b1/2N5/PPP1PPPP/R1BQKBNR w KQkq - 2 3",
    eco: "D00",
    openingName: "Queen's pawn: Anti-Veresov",
    moves: "1. d4 d5 2. Nc3 Bg4"
}, {
    fen: "rnbqkb1r/ppp1pppp/5n2/3p4/3PP3/2N5/PPP2PPP/R1BQKBNR b KQkq e3 0 3",
    eco: "D00",
    openingName: "Blackmar-Diemer gambit",
    moves: "1. d4 d5 2. Nc3 Nf6 3. e4"
}, {
    fen: "rnbqkb1r/ppp2ppp/4pn2/8/3P4/2N2N2/PPP3PP/R1BQKB1R w KQkq - 0 6",
    eco: "D00",
    openingName: "Blackmar-Diemer: Euwe defence",
    moves: "1. d4 d5 2. Nc3 Nf6 3. e4 dxe4 4. f3 exf3 5. Nxf3 e6"
}, {
    fen: "rnbqkb1r/ppp2ppp/5n2/3pp3/3PP3/2N5/PPP2PPP/R1BQKBNR w KQkq e6 0 4",
    eco: "D00",
    openingName: "Blackmar-Diemer: Lemberg counter-gambit",
    moves: "1. d4 d5 2. Nc3 Nf6 3. e4 e5"
}, {
    fen: "rnbqkb1r/ppp1pppp/5n2/3p2B1/3P4/2N5/PPP1PPPP/R2QKBNR b KQkq - 3 3",
    eco: "D01",
    openingName: "Richter-Veresov attack",
    moves: "1. d4 d5 2. Nc3 Nf6 3. Bg5"
}, {
    fen: "rn1qkb1r/ppp1pppp/5B2/3p1b2/3P4/2N5/PPP1PPPP/R2QKBNR b KQkq - 0 4",
    eco: "D01",
    openingName: "Richter-Veresov attack, Veresov variation",
    moves: "1. d4 d5 2. Nc3 Nf6 3. Bg5 Bf5 4. Bxf6"
}, {
    fen: "rn1qkb1r/ppp1pppp/5n2/3p1bB1/3P4/2N2P2/PPP1P1PP/R2QKBNR b KQkq - 0 4",
    eco: "D01",
    openingName: "Richter-Veresov attack, Richter variation",
    moves: "1. d4 d5 2. Nc3 Nf6 3. Bg5 Bf5 4. f3"
}, {
    fen: "rnbqkbnr/ppp1pppp/8/3p4/3P4/5N2/PPP1PPPP/RNBQKB1R b KQkq - 1 2",
    eco: "D02",
    openingName: "Queen's pawn game",
    moves: "1. d4 d5 2. Nf3"
}, {
    fen: "r1bqkbnr/ppp1pppp/2n5/3p4/3P4/5N2/PPP1PPPP/RNBQKB1R w KQkq - 2 3",
    eco: "D02",
    openingName: "Queen's pawn game, Chigorin variation",
    moves: "1. d4 d5 2. Nf3 Nc6"
}, {
    fen: "rnbqkbnr/pp2pppp/8/2pp4/3P4/5N2/PPP1PPPP/RNBQKB1R w KQkq c6 0 3",
    eco: "D02",
    openingName: "Queen's pawn game, Krause variation",
    moves: "1. d4 d5 2. Nf3 c5"
}, {
    fen: "rnbqkb1r/ppp1pppp/5n2/3p4/3P4/5N2/PPP1PPPP/RNBQKB1R w KQkq - 2 3",
    eco: "D02",
    openingName: "Queen's pawn game",
    moves: "1. d4 d5 2. Nf3 Nf6"
}, {
    fen: "rnbqkb1r/ppp1pppp/5n2/3p4/3P1B2/5N2/PPP1PPPP/RN1QKB1R b KQkq - 3 3",
    eco: "D02",
    openingName: "Queen's bishop game",
    moves: "1. d4 d5 2. Nf3 Nf6 3. Bf4"
}, {
    fen: "rnbqkb1r/ppp1pppp/5n2/3p2B1/3P4/5N2/PPP1PPPP/RN1QKB1R b KQkq - 3 3",
    eco: "D03",
    openingName: "Torre attack (Tartakower variation)",
    moves: "1. d4 d5 2. Nf3 Nf6 3. Bg5"
}, {
    fen: "rnbqkb1r/ppp1pppp/5n2/3p4/3P4/4PN2/PPP2PPP/RNBQKB1R b KQkq - 0 3",
    eco: "D04",
    openingName: "Queen's pawn game",
    moves: "1. d4 d5 2. Nf3 Nf6 3. e3"
}, {
    fen: "rnbqkb1r/ppp2ppp/4pn2/3p4/3P4/4PN2/PPP2PPP/RNBQKB1R w KQkq - 0 4",
    eco: "D05",
    openingName: "Queen's pawn game",
    moves: "1. d4 d5 2. Nf3 Nf6 3. e3 e6"
}, {
    fen: "rnbqkb1r/pp3ppp/4pn2/2pp4/3P4/1P2PN2/P1PN1PPP/R1BQKB1R b KQkq - 0 5",
    eco: "D05",
    openingName: "Queen's pawn game, Zukertort variation",
    moves: "1. d4 d5 2. Nf3 Nf6 3. e3 e6 4. Nbd2 c5 5. b3"
}, {
    fen: "rnbqkb1r/ppp2ppp/4pn2/3p4/3P4/3BPN2/PPP2PPP/RNBQK2R b KQkq - 1 4",
    eco: "D05",
    openingName: "Queen's pawn game",
    moves: "1. d4 d5 2. Nf3 Nf6 3. e3 e6 4. Bd3"
}, {
    fen: "rnbqkb1r/pp3ppp/4pn2/2pp4/3P4/1P1BPN2/P1P2PPP/RNBQK2R b KQkq - 0 5",
    eco: "D05",
    openingName: "Queen's pawn game, Rubinstein (Colle-Zukertort) variation",
    moves: "1. d4 d5 2. Nf3 Nf6 3. e3 e6 4. Bd3 c5 5. b3"
}, {
    fen: "rnbqkb1r/pp3ppp/4pn2/2pp4/3P4/2PBPN2/PP3PPP/RNBQK2R b KQkq - 0 5",
    eco: "D05",
    openingName: "Colle system",
    moves: "1. d4 d5 2. Nf3 Nf6 3. e3 e6 4. Bd3 c5 5. c3"
}, {
    fen: "rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq c3 0 2",
    eco: "D06",
    openingName: "Queen's Gambit",
    moves: "1. d4 d5 2. c4"
}, {
    fen: "rn1qkbnr/ppp1pppp/8/3p1b2/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 1 3",
    eco: "D06",
    openingName: "QGD: Grau (Sahovic) defence",
    moves: "1. d4 d5 2. c4 Bf5"
}, {
    fen: "rnbqkb1r/ppp1pppp/5n2/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 1 3",
    eco: "D06",
    openingName: "QGD: Marshall defence",
    moves: "1. d4 d5 2. c4 Nf6"
}, {
    fen: "rnbqkbnr/pp2pppp/8/2pp4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq c6 0 3",
    eco: "D06",
    openingName: "QGD: symmetrical (Austrian) defence",
    moves: "1. d4 d5 2. c4 c5"
}, {
    fen: "r1bqkbnr/ppp1pppp/2n5/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 1 3",
    eco: "D07",
    openingName: "QGD: Chigorin defence",
    moves: "1. d4 d5 2. c4 Nc6"
}, {
    fen: "r1bqkbnr/ppp1pppp/2n5/8/2pP4/2N2N2/PP2PPPP/R1BQKB1R b KQkq - 1 4",
    eco: "D07",
    openingName: "QGD: Chigorin defence, Janowski variation",
    moves: "1. d4 d5 2. c4 Nc6 3. Nc3 dxc4 4. Nf3"
}, {
    fen: "rnbqkbnr/ppp2ppp/8/3pp3/2PP4/8/PP2PPPP/RNBQKBNR w KQkq e6 0 3",
    eco: "D08",
    openingName: "QGD: Albin counter-gambit",
    moves: "1. d4 d5 2. c4 e5"
}, {
    fen: "rnbqk1nr/ppp2ppp/8/4P3/1bP5/4p3/PP1B1PPP/RN1QKBNR w KQkq - 0 6",
    eco: "D08",
    openingName: "QGD: Albin counter-gambit, Lasker trap",
    moves: "1. d4 d5 2. c4 e5 3. dxe5 d4 4. e3 Bb4+ 5. Bd2 dxe3"
}, {
    fen: "rnbqkbnr/ppp2ppp/8/4P3/2Pp4/5N2/PP2PPPP/RNBQKB1R b KQkq - 1 4",
    eco: "D08",
    openingName: "QGD: Albin counter-gambit",
    moves: "1. d4 d5 2. c4 e5 3. dxe5 d4 4. Nf3"
}, {
    fen: "r1bqkbnr/ppp2ppp/2n5/4P3/2Pp4/5N2/PP1NPPPP/R1BQKB1R b KQkq - 3 5",
    eco: "D08",
    openingName: "QGD: Albin counter-gambit, Alapin variation",
    moves: "1. d4 d5 2. c4 e5 3. dxe5 d4 4. Nf3 Nc6 5. Nbd2"
}, {
    fen: "r3k1nr/ppp1qppp/2n5/4P3/1bPp4/5N1P/PP1BPPP1/R2QKB1R w KQkq - 3 9",
    eco: "D08",
    openingName: "QGD: Albin counter-gambit, Krenosz variation",
    moves: "1. d4 d5 2. c4 e5 3. dxe5 d4 4. Nf3 Nc6 5. Nbd2 Bg4 6. h3 Bxf3 7. Nxf3 Bb4+ 8. Bd2 Qe7"
}, {
    fen: "r1bqkbnr/ppp3pp/2n2p2/4P3/2Pp4/5N2/PP1NPPPP/R1BQKB1R w KQkq - 0 6",
    eco: "D08",
    openingName: "QGD: Albin counter-gambit, Janowski variation",
    moves: "1. d4 d5 2. c4 e5 3. dxe5 d4 4. Nf3 Nc6 5. Nbd2 f6"
}, {
    fen: "r1b1kbnr/ppp1qppp/2n5/4P3/2Pp4/5N2/PP1NPPPP/R1BQKB1R w KQkq - 4 6",
    eco: "D08",
    openingName: "QGD: Albin counter-gambit, Balogh variation",
    moves: "1. d4 d5 2. c4 e5 3. dxe5 d4 4. Nf3 Nc6 5. Nbd2 Qe7"
}, {
    fen: "r1bqkbnr/ppp2ppp/2n5/4P3/2Pp4/5NP1/PP2PP1P/RNBQKB1R b KQkq - 0 5",
    eco: "D09",
    openingName: "QGD: Albin counter-gambit, 5.g3",
    moves: "1. d4 d5 2. c4 e5 3. dxe5 d4 4. Nf3 Nc6 5. g3"
}, {
    fen: "rnbqkbnr/pp2pppp/2p5/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3",
    eco: "D10",
    openingName: "QGD Slav defence",
    moves: "1. d4 d5 2. c4 c6"
}, {
    fen: "rnbqkbnr/pp2pppp/2p5/8/2pPP3/2N5/PP3PPP/R1BQKBNR b KQkq e3 0 4",
    eco: "D10",
    openingName: "QGD Slav defence, Alekhine variation",
    moves: "1. d4 d5 2. c4 c6 3. Nc3 dxc4 4. e4"
}, {
    fen: "rnbqkbnr/pp3ppp/2p5/3pp3/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq e6 0 4",
    eco: "D10",
    openingName: "QGD Slav: Winawer counter-gambit",
    moves: "1. d4 d5 2. c4 c6 3. Nc3 e5"
}, {
    fen: "rnbqkbnr/pp2pppp/2p5/3P4/3P4/8/PP2PPPP/RNBQKBNR b KQkq - 0 3",
    eco: "D10",
    openingName: "QGD Slav defence: exchange variation",
    moves: "1. d4 d5 2. c4 c6 3. cxd5"
}, {
    fen: "rnbqkbnr/pp2pppp/2p5/3p4/2PP4/5N2/PP2PPPP/RNBQKB1R b KQkq - 1 3",
    eco: "D11",
    openingName: "QGD Slav: 3.Nf3",
    moves: "1. d4 d5 2. c4 c6 3. Nf3"
}, {
    fen: "rnbqkb1r/pp2pppp/2p2n2/3p4/2PP4/5N2/PP1NPPPP/R1BQKB1R b KQkq - 3 4",
    eco: "D11",
    openingName: "QGD Slav: Breyer variation",
    moves: "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nbd2"
}, {
    fen: "rnbqkb1r/pp2pppp/2p2n2/3p4/2PP4/4PN2/PP3PPP/RNBQKB1R b KQkq - 0 4",
    eco: "D11",
    openingName: "QGD Slav: 4.e3",
    moves: "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. e3"
}, {
    fen: "rn1qkb1r/pp2pppp/2p2n2/3p1b2/2PP4/4PN2/PP3PPP/RNBQKB1R w KQkq - 1 5",
    eco: "D12",
    openingName: "QGD Slav: 4.e3 Bf5",
    moves: "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. e3 Bf5"
}, {
    fen: "rnq1kb1r/pp3ppp/4pn2/3p1b2/3P4/NQ2PN2/PP1B1PPP/R3KB1R b KQkq - 1 8",
    eco: "D12",
    openingName: "QGD Slav: Landau variation",
    moves: "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. e3 Bf5 5. cxd5 cxd5 6. Qb3 Qc8 7. Bd2 e6 8. Na3"
}, {
    fen: "rn1qkb1r/pp2pppp/5n2/3p1b2/3P4/2N1PN2/PP3PPP/R1BQKB1R b KQkq - 1 6",
    eco: "D12",
    openingName: "QGD Slav: exchange variation",
    moves: "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. e3 Bf5 5. cxd5 cxd5 6. Nc3"
}, {
    fen: "rn1qkb1r/pp1n1ppp/4p3/3pNb2/3P4/2N1P3/PP3PPP/R1BQKB1R w KQkq - 2 8",
    eco: "D12",
    openingName: "QGD Slav: Amsterdam variation",
    moves: "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. e3 Bf5 5. cxd5 cxd5 6. Nc3 e6 7. Ne5 Nfd7"
}, {
    fen: "rnbqkb1r/pp2pppp/5n2/3p4/3P4/5N2/PP2PPPP/RNBQKB1R w KQkq - 0 5",
    eco: "D13",
    openingName: "QGD Slav: exchange variation",
    moves: "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. cxd5 cxd5"
}, {
    fen: "r2qkb1r/pp2pppp/2n2n2/3p1b2/3P1B2/2N2N2/PP2PPPP/R2QKB1R w KQkq - 4 7",
    eco: "D14",
    openingName: "QGD Slav: exchange variation, 6.Bf4 Bf5",
    moves: "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. cxd5 cxd5 5. Nc3 Nc6 6. Bf4 Bf5"
}, {
    fen: "r2qk2r/pp3ppp/2n1pn2/3p1b2/1b1P1B2/1QN1PN2/PP3PPP/R3KB1R w KQkq - 2 9",
    eco: "D14",
    openingName: "QGD Slav: exchange, Trifunovic variation",
    moves: "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. cxd5 cxd5 5. Nc3 Nc6 6. Bf4 Bf5 7. e3 e6 8. Qb3 Bb4"
}, {
    fen: "rnbqkb1r/pp2pppp/2p2n2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R b KQkq - 3 4",
    eco: "D15",
    openingName: "QGD Slav: 4.Nc3",
    moves: "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3"
}, {
    fen: "rnb1kb1r/pp2pppp/1qp2n2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 4 5",
    eco: "D15",
    openingName: "QGD Slav: Suechting variation",
    moves: "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 Qb6"
}, {
    fen: "rnbqkb1r/pp2pp1p/2p2np1/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 5",
    eco: "D90",
    openingName: "Gruenfeld: Schlechter variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Nf3 c6"
}, {
    fen: "rnbqkb1r/pp2pppp/2p2n2/8/2pP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 5",
    eco: "D15",
    openingName: "QGD Slav accepted",
    moves: "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 dxc4"
}, {
    fen: "rnbqkb1r/pp2pppp/2p2n2/8/2pP4/2N1PN2/PP3PPP/R1BQKB1R b KQkq - 0 5",
    eco: "D15",
    openingName: "QGD Slav: 5.e3 (Alekhine variation)",
    moves: "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 dxc4 5. e3"
}, {
    fen: "rnbqkb1r/pp2pppp/2p2n2/8/2pPP3/2N2N2/PP3PPP/R1BQKB1R b KQkq e3 0 5",
    eco: "D15",
    openingName: "QGD Slav: Slav gambit",
    moves: "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 dxc4 5. e4"
}, {
    fen: "rnbqkb1r/p3pppp/2p2n2/1p2P3/2pP4/2N2N2/PP3PPP/R1BQKB1R b KQkq - 0 6",
    eco: "D15",
    openingName: "QGD Slav: Tolush-Geller gambit",
    moves: "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 dxc4 5. e4 b5 6. e5"
}, {
    fen: "rnbqkb1r/pp2pppp/2p2n2/8/P1pP4/2N2N2/1P2PPPP/R1BQKB1R b KQkq a3 0 5",
    eco: "D16",
    openingName: "QGD Slav accepted: Alapin variation",
    moves: "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 dxc4 5. a4"
}, {
    fen: "r2qkb1r/pp2pppp/n1p2n2/8/P1pPP1b1/2N2N2/1P3PPP/R1BQKB1R w KQkq - 1 7",
    eco: "D16",
    openingName: "QGD Slav: Smyslov variation",
    moves: "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 dxc4 5. a4 Na6 6. e4 Bg4"
}, {
    fen: "rnbqkb1r/pp3ppp/2p1pn2/8/P1pP4/2N2N2/1P2PPPP/R1BQKB1R w KQkq - 0 6",
    eco: "D16",
    openingName: "QGD Slav: Soultanbeieff variation",
    moves: "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 dxc4 5. a4 e6"
}, {
    fen: "rn1qkb1r/pp2pppp/2p2n2/8/P1pP2b1/2N2N2/1P2PPPP/R1BQKB1R w KQkq - 1 6",
    eco: "D16",
    openingName: "QGD Slav: Steiner variation",
    moves: "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 dxc4 5. a4 Bg4"
}, {
    fen: "rn1qkb1r/pp2pppp/2p2n2/5b2/P1pP4/2N2N2/1P2PPPP/R1BQKB1R w KQkq - 1 6",
    eco: "D17",
    openingName: "QGD Slav: Czech defence",
    moves: "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 dxc4 5. a4 Bf5"
}, {
    fen: "rn1qkb1r/pp2pppp/2p2n2/4Nb2/P1pP4/2N5/1P2PPPP/R1BQKB1R b KQkq - 2 6",
    eco: "D17",
    openingName: "QGD Slav: Krause attack",
    moves: "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 dxc4 5. a4 Bf5 6. Ne5"
}, {
    fen: "r3kb1r/ppqn1ppp/2p2n2/4pb2/P1NP4/2N3P1/1P2PP1P/R1BQKB1R w KQkq e6 0 9",
    eco: "D17",
    openingName: "QGD Slav: Carlsbad variation",
    moves: "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 dxc4 5. a4 Bf5 6. Ne5 Nbd7 7. Nxc4 Qc7 8. g3 e5"
}, {
    fen: "rn1qkb1r/pp3ppp/2p1pn2/4Nb2/P1pP4/2N5/1P2PPPP/R1BQKB1R w KQkq - 0 7",
    eco: "D17",
    openingName: "QGD Slav: Wiesbaden variation",
    moves: "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 dxc4 5. a4 Bf5 6. Ne5 e6"
}, {
    fen: "rn1qkb1r/pp2pppp/2p2n2/5b2/P1pP4/2N1PN2/1P3PPP/R1BQKB1R b KQkq - 0 6",
    eco: "D18",
    openingName: "QGD Slav: Dutch variation",
    moves: "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 dxc4 5. a4 Bf5 6. e3"
}, {
    fen: "r2qkb1r/pp2pppp/n1p2n2/5b2/P1pP4/2N1PN2/1P3PPP/R1BQKB1R w KQkq - 1 7",
    eco: "D18",
    openingName: "QGD Slav: Dutch, Lasker variation",
    moves: "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 dxc4 5. a4 Bf5 6. e3 Na6"
}, {
    fen: "rn1qk2r/pp3ppp/2p1pn2/5b2/PbBP4/2N1PN2/1P3PPP/R1BQ1RK1 b kq - 2 8",
    eco: "D19",
    openingName: "QGD Slav: Dutch variation",
    moves: "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 dxc4 5. a4 Bf5 6. e3 e6 7. Bxc4 Bb4 8. O-O"
}, {
    fen: "rn1q1rk1/pp3ppp/2p1pn2/5b2/PbBP4/2N1PN2/1P2QPPP/R1B2RK1 b - - 4 9",
    eco: "D19",
    openingName: "QGD Slav: Dutch variation, main line",
    moves: "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 dxc4 5. a4 Bf5 6. e3 e6 7. Bxc4 Bb4 8. O-O O-O 9. Qe2"
}, {
    fen: "rn1q1rk1/pp3ppp/2p1p3/5b2/PbBPn1P1/2N1PN2/1P2QP1P/R1B2RK1 b - g3 0 10",
    eco: "D19",
    openingName: "QGD Slav: Dutch, Saemisch variation",
    moves: "1. d4 d5 2. c4 c6 3. Nf3 Nf6 4. Nc3 dxc4 5. a4 Bf5 6. e3 e6 7. Bxc4 Bb4 8. O-O O-O 9. Qe2 Ne4 10. g4"
}, {
    fen: "rnbqkbnr/ppp1pppp/8/8/2pP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3",
    eco: "D20",
    openingName: "Queen's gambit accepted",
    moves: "1. d4 d5 2. c4 dxc4"
}, {
    fen: "rnbqkbnr/ppp1pppp/8/8/2pPP3/8/PP3PPP/RNBQKBNR b KQkq e3 0 3",
    eco: "D20",
    openingName: "QGA: 3.e4",
    moves: "1. d4 d5 2. c4 dxc4 3. e4"
}, {
    fen: "rnbqkb1r/p3pppp/5n2/1ppP4/2p1P3/2N5/PP3PPP/R1BQKBNR w KQkq b6 0 6",
    eco: "D20",
    openingName: "QGA: Linares variation",
    moves: "1. d4 d5 2. c4 dxc4 3. e4 c5 4. d5 Nf6 5. Nc3 b5"
}, {
    fen: "rnbqkbnr/ppp1p1pp/8/5p2/2pPP3/8/PP3PPP/RNBQKBNR w KQkq f6 0 4",
    eco: "D20",
    openingName: "QGA: Schwartz defence",
    moves: "1. d4 d5 2. c4 dxc4 3. e4 f5"
}, {
    fen: "rnbqkbnr/ppp1pppp/8/8/2pP4/5N2/PP2PPPP/RNBQKB1R b KQkq - 1 3",
    eco: "D21",
    openingName: "QGA: 3.Nf3",
    moves: "1. d4 d5 2. c4 dxc4 3. Nf3"
}, {
    fen: "rnbqkbnr/p1p1pppp/8/1p6/2pP4/5N2/PP2PPPP/RNBQKB1R w KQkq b6 0 4",
    eco: "D21",
    openingName: "QGA: Ericson variation",
    moves: "1. d4 d5 2. c4 dxc4 3. Nf3 b5"
}, {
    fen: "rnbqkbnr/1pp1pppp/p7/8/2pPP3/5N2/PP3PPP/RNBQKB1R b KQkq e3 0 4",
    eco: "D21",
    openingName: "QGA: Alekhine defense, Borisenko-Furman variation",
    moves: "1. d4 d5 2. c4 dxc4 3. Nf3 a6 4. e4"
}, {
    fen: "rnbqkbnr/1pp1pppp/p7/8/2pP4/5N2/PP2PPPP/RNBQKB1R w KQkq - 0 4",
    eco: "D22",
    openingName: "QGA: Alekhine defence",
    moves: "1. d4 d5 2. c4 dxc4 3. Nf3 a6"
}, {
    fen: "rn1qkbnr/1pp2ppp/p3p3/3P4/2B3b1/4PN2/PP3PPP/RNBQK2R b KQkq - 0 6",
    eco: "D22",
    openingName: "QGA: Alekhine defence, Alatortsev variation",
    moves: "1. d4 d5 2. c4 dxc4 3. Nf3 a6 4. e3 Bg4 5. Bxc4 e6 6. d5"
}, {
    fen: "rnbqkbnr/2p1pppp/p7/1p6/2pP4/4PN2/PP3PPP/RNBQKB1R w KQkq b6 0 5",
    eco: "D22",
    openingName: "QGA: Haberditz variation",
    moves: "1. d4 d5 2. c4 dxc4 3. Nf3 a6 4. e3 b5"
}, {
    fen: "rnbqkb1r/ppp1pppp/5n2/8/2pP4/5N2/PP2PPPP/RNBQKB1R w KQkq - 2 4",
    eco: "D23",
    openingName: "Queen's gambit accepted",
    moves: "1. d4 d5 2. c4 dxc4 3. Nf3 Nf6"
}, {
    fen: "rnbqkb1r/ppp1pppp/5n2/8/Q1pP4/5N2/PP2PPPP/RNB1KB1R b KQkq - 3 4",
    eco: "D23",
    openingName: "QGA: Mannheim variation",
    moves: "1. d4 d5 2. c4 dxc4 3. Nf3 Nf6 4. Qa4+"
}, {
    fen: "rnbqkb1r/ppp1pppp/5n2/8/2pP4/2N2N2/PP2PPPP/R1BQKB1R b KQkq - 3 4",
    eco: "D24",
    openingName: "QGA, 4.Nc3",
    moves: "1. d4 d5 2. c4 dxc4 3. Nf3 Nf6 4. Nc3"
}, {
    fen: "rnbqkb1r/1pp1pppp/p4n2/8/2pPP3/2N2N2/PP3PPP/R1BQKB1R b KQkq e3 0 5",
    eco: "D24",
    openingName: "QGA, Bogolyubov variation",
    moves: "1. d4 d5 2. c4 dxc4 3. Nf3 Nf6 4. Nc3 a6 5. e4"
}, {
    fen: "rnbqkb1r/ppp1pppp/5n2/8/2pP4/4PN2/PP3PPP/RNBQKB1R b KQkq - 0 4",
    eco: "D25",
    openingName: "QGA, 4.e3",
    moves: "1. d4 d5 2. c4 dxc4 3. Nf3 Nf6 4. e3"
}, {
    fen: "rnbqkb1r/ppp1pp1p/5np1/8/2pP4/4PN2/PP3PPP/RNBQKB1R w KQkq - 0 5",
    eco: "D25",
    openingName: "QGA, Smyslov variation",
    moves: "1. d4 d5 2. c4 dxc4 3. Nf3 Nf6 4. e3 g6"
}, {
    fen: "rn1qkb1r/ppp1pppp/5n2/8/2pP2b1/4PN2/PP3PPP/RNBQKB1R w KQkq - 1 5",
    eco: "D25",
    openingName: "QGA, Janowsky-Larsen variation",
    moves: "1. d4 d5 2. c4 dxc4 3. Nf3 Nf6 4. e3 Bg4"
}, {
    fen: "rn1qkb1r/ppp1pppp/4bn2/8/2pP4/4PN2/PP3PPP/RNBQKB1R w KQkq - 1 5",
    eco: "D25",
    openingName: "QGA, Flohr variation",
    moves: "1. d4 d5 2. c4 dxc4 3. Nf3 Nf6 4. e3 Be6"
}, {
    fen: "rnbqkb1r/ppp2ppp/4pn2/8/2pP4/4PN2/PP3PPP/RNBQKB1R w KQkq - 0 5",
    eco: "D26",
    openingName: "QGA: 4...e6",
    moves: "1. d4 d5 2. c4 dxc4 3. Nf3 Nf6 4. e3 e6"
}, {
    fen: "rnbqkb1r/pp3ppp/4pn2/2p5/2BP4/4PN2/PP3PPP/RNBQK2R w KQkq c6 0 6",
    eco: "D26",
    openingName: "QGA: classical variation",
    moves: "1. d4 d5 2. c4 dxc4 3. Nf3 Nf6 4. e3 e6 5. Bxc4 c5"
}, {
    fen: "r1bqk2r/5ppp/p1n1pn2/1pb1P3/2B5/5N2/PP2QPPP/RNB2RK1 b kq - 0 10",
    eco: "D26",
    openingName: "QGA: classical, Furman variation",
    moves: "1. d4 d5 2. c4 dxc4 3. Nf3 Nf6 4. e3 e6 5. Bxc4 c5 6. Qe2 a6 7. dxc5 Bxc5 8. O-O Nc6 9. e4 b5 10. e5"
}, {
    fen: "rnbqkb1r/pp3ppp/4pn2/2p5/2BP4/4PN2/PP3PPP/RNBQ1RK1 b kq - 1 6",
    eco: "D26",
    openingName: "QGA: classical variation, 6.O-O",
    moves: "1. d4 d5 2. c4 dxc4 3. Nf3 Nf6 4. e3 e6 5. Bxc4 c5 6. O-O"
}, {
    fen: "rnbqkb1r/pp3ppp/4pn2/8/2Bp4/4PN2/PP3PPP/RNBQ1RK1 w kq - 0 7",
    eco: "D26",
    openingName: "QGA: classical, Steinitz variation",
    moves: "1. d4 d5 2. c4 dxc4 3. Nf3 Nf6 4. e3 e6 5. Bxc4 c5 6. O-O cxd4"
}, {
    fen: "rnbqkb1r/1p3ppp/p3pn2/2p5/2BP4/4PN2/PP3PPP/RNBQ1RK1 w kq - 0 7",
    eco: "D27",
    openingName: "QGA: classical, 6...a6",
    moves: "1. d4 d5 2. c4 dxc4 3. Nf3 Nf6 4. e3 e6 5. Bxc4 c5 6. O-O a6"
}, {
    fen: "rnbqkb1r/1p3ppp/p3pn2/2p5/P1BP4/4PN2/1P3PPP/RNBQ1RK1 b kq a3 0 7",
    eco: "D27",
    openingName: "QGA: classical, Rubinstein variation",
    moves: "1. d4 d5 2. c4 dxc4 3. Nf3 Nf6 4. e3 e6 5. Bxc4 c5 6. O-O a6 7. a4"
}, {
    fen: "rnbqkb1r/1p3ppp/p3pn2/2p5/2BPP3/5N2/PP3PPP/RNBQ1RK1 b kq - 0 7",
    eco: "D27",
    openingName: "QGA: classical, Geller variation",
    moves: "1. d4 d5 2. c4 dxc4 3. Nf3 Nf6 4. e3 e6 5. Bxc4 c5 6. O-O a6 7. e4"
}, {
    fen: "rnbqkb1r/1p3ppp/p3pn2/2p5/2BP4/4PN2/PP2QPPP/RNB2RK1 b kq - 1 7",
    eco: "D28",
    openingName: "QGA: classical, 7.Qe2",
    moves: "1. d4 d5 2. c4 dxc4 3. Nf3 Nf6 4. e3 e6 5. Bxc4 c5 6. O-O a6 7. Qe2"
}, {
    fen: "rnbqkb1r/5ppp/p3pn2/1pp5/2BP4/4PN2/PP2QPPP/RNB2RK1 w kq b6 0 8",
    eco: "D28",
    openingName: "QGA: classical, 7...b5",
    moves: "1. d4 d5 2. c4 dxc4 3. Nf3 Nf6 4. e3 e6 5. Bxc4 c5 6. O-O a6 7. Qe2 b5"
}, {
    fen: "r3kb1r/1bq2ppp/p3pn2/1p1P4/2p5/2N1PN2/PPQ2PPP/R1BR2K1 w kq - 1 14",
    eco: "D28",
    openingName: "QGA: classical, Flohr variation",
    moves: "1. d4 d5 2. c4 dxc4 3. Nf3 Nf6 4. e3 e6 5. Bxc4 c5 6. O-O a6 7. Qe2 b5 8. Bb3 Nc6 9. Rd1 c4 10. Bc2 Nb4 11. Nc3 Nxc2 12. Qxc2 Bb7 13. d5 Qc7"
}, {
    fen: "rn1qkb1r/1b3ppp/p3pn2/1pp5/3P4/1B2PN2/PP2QPPP/RNB2RK1 w kq - 2 9",
    eco: "D29",
    openingName: "QGA: classical, 8...Bb7",
    moves: "1. d4 d5 2. c4 dxc4 3. Nf3 Nf6 4. e3 e6 5. Bxc4 c5 6. O-O a6 7. Qe2 b5 8. Bb3 Bb7"
}, {
    fen: "r2qk2r/1b1n1ppp/p2bpn2/1pp5/3P4/1BN1PN2/PP2QPPP/R1BR2K1 w kq - 6 11",
    eco: "D29",
    openingName: "QGA: classical, Smyslov variation",
    moves: "1. d4 d5 2. c4 dxc4 3. Nf3 Nf6 4. e3 e6 5. Bxc4 c5 6. O-O a6 7. Qe2 b5 8. Bb3 Bb7 9. Rd1 Nbd7 10. Nc3 Bd6"
}, {
    fen: "rnbqkbnr/ppp2ppp/4p3/3p4/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3",
    eco: "D30",
    openingName: "Queen's gambit declined",
    moves: "1. d4 d5 2. c4 e6"
}, {
    fen: "rnbqkb1r/pp3ppp/2p1pn2/3p4/2PP4/4PN2/PP1N1PPP/R1BQKB1R b KQkq - 1 5",
    eco: "D30",
    openingName: "QGD Slav",
    moves: "1. d4 d5 2. c4 e6 3. Nf3 Nf6 4. e3 c6 5. Nbd2"
}, {
    fen: "rnbqkb1r/pp4pp/2p1p3/3p1p2/2PPn3/3BPN2/PP1N1PPP/R1BQK2R w KQkq f6 0 7",
    eco: "D30",
    openingName: "QGD: Stonewall variation",
    moves: "1. d4 d5 2. c4 e6 3. Nf3 Nf6 4. e3 c6 5. Nbd2 Ne4 6. Bd3 f5"
}, {
    fen: "r1bqkb1r/pp1n1ppp/2p1pn2/3p4/2PP4/4PN2/PP1N1PPP/R1BQKB1R w KQkq - 2 6",
    eco: "D30",
    openingName: "QGD Slav",
    moves: "1. d4 d5 2. c4 e6 3. Nf3 Nf6 4. e3 c6 5. Nbd2 Nbd7"
}, {
    fen: "r1bqkb1r/pp1n1ppp/4pn2/2pp4/2PP4/3BPN2/PP1N1PPP/R1BQK2R w KQkq - 0 7",
    eco: "D30",
    openingName: "QGD Slav: Semmering variation",
    moves: "1. d4 d5 2. c4 e6 3. Nf3 Nf6 4. e3 c6 5. Nbd2 Nbd7 6. Bd3 c5"
}, {
    fen: "rnbqkb1r/pp3p1p/2p1pnp1/3p4/2PP4/4PN2/PP1N1PPP/R1BQKB1R w KQkq - 0 6",
    eco: "D30",
    openingName: "QGD: Spielmann variation",
    moves: "1. d4 d5 2. c4 e6 3. Nf3 Nf6 4. e3 c6 5. Nbd2 g6"
}, {
    fen: "rnbqkb1r/ppp2ppp/4pn2/3p2B1/2PP4/5N2/PP2PPPP/RN1QKB1R b KQkq - 3 4",
    eco: "D30",
    openingName: "QGD",
    moves: "1. d4 d5 2. c4 e6 3. Nf3 Nf6 4. Bg5"
}, {
    fen: "r1bqkb1r/pp1n1ppp/2p1pn2/3p2B1/2PP4/4PN2/PP1N1PPP/R2QKB1R b KQkq - 1 6",
    eco: "D30",
    openingName: "QGD: Capablanca variation",
    moves: "1. d4 d5 2. c4 e6 3. Nf3 Nf6 4. Bg5 Nbd7 5. e3 c6 6. Nbd2"
}, {
    fen: "rnbqk2r/ppp2ppp/4pn2/3p2B1/1bPP4/5N2/PP2PPPP/RN1QKB1R w KQkq - 4 5",
    eco: "D30",
    openingName: "QGD: Vienna variation",
    moves: "1. d4 d5 2. c4 e6 3. Nf3 Nf6 4. Bg5 Bb4+"
}, {
    fen: "rnbqkb1r/ppp2pp1/4pn1p/3p2B1/2PP4/5N2/PP2PPPP/RN1QKB1R w KQkq - 0 5",
    eco: "D30",
    openingName: "QGD: Capablanca-Duras variation",
    moves: "1. d4 d5 2. c4 e6 3. Nf3 Nf6 4. Bg5 h6"
}, {
    fen: "rnb1kb1r/pp3pp1/2p1pq1p/3p4/2PP4/1QN2N2/PP2PPPP/R3KB1R b KQkq - 1 7",
    eco: "D43",
    openingName: "QGD semi-Slav: Hastings variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c6 5. Bg5 h6 6. Bxf6 Qxf6 7. Qb3"
}, {
    fen: "rnbqkbnr/ppp2ppp/4p3/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR b KQkq - 1 3",
    eco: "D31",
    openingName: "QGD: 3.Nc3",
    moves: "1. d4 d5 2. c4 e6 3. Nc3"
}, {
    fen: "rnbqkbnr/1pp2ppp/p3p3/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 0 4",
    eco: "D31",
    openingName: "QGD: Janowski variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 a6"
}, {
    fen: "rnbqkbnr/p1p2ppp/1p2p3/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 0 4",
    eco: "D31",
    openingName: "QGD: Alapin variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 b6"
}, {
    fen: "rnbqk1nr/ppp1bppp/4p3/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4",
    eco: "D31",
    openingName: "QGD: Charousek (Petrosian) variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Be7"
}, {
    fen: "rnbqkbnr/pp3ppp/2p1p3/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 0 4",
    eco: "D31",
    openingName: "QGD: semi-Slav",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 c6"
}, {
    fen: "rnbqkbnr/pp3ppp/2p1p3/8/2pP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 5",
    eco: "D31",
    openingName: "QGD: semi-Slav, Noteboom variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 c6 4. Nf3 dxc4"
}, {
    fen: "rnb1k1nr/p3qppp/2p1p3/1p6/PbpP4/2N1PN2/1P1B1PPP/R2QKB1R w KQkq - 2 8",
    eco: "D31",
    openingName: "QGD: semi-Slav, Koomen variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 c6 4. Nf3 dxc4 5. a4 Bb4 6. e3 b5 7. Bd2 Qe7"
}, {
    fen: "rnb1k1nr/p4ppp/1qp1p3/1p6/PbpP4/2N1PN2/1P1B1PPP/R2QKB1R w KQkq - 2 8",
    eco: "D31",
    openingName: "QGD: semi-Slav, Junge variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 c6 4. Nf3 dxc4 5. a4 Bb4 6. e3 b5 7. Bd2 Qb6"
}, {
    fen: "rnbqk1nr/5ppp/2p1p3/pp6/PbpP4/2N1PN2/1P1B1PPP/R2QKB1R w KQkq a6 0 8",
    eco: "D31",
    openingName: "QGD: semi-Slav, Abrahams variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 c6 4. Nf3 dxc4 5. a4 Bb4 6. e3 b5 7. Bd2 a5"
}, {
    fen: "rnbqkbnr/pp3ppp/2p1p3/3p4/2PPP3/2N5/PP3PPP/R1BQKBNR b KQkq e3 0 4",
    eco: "D31",
    openingName: "QGD: semi-Slav, Marshall gambit",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 c6 4. e4"
}, {
    fen: "rnbqkbnr/pp3ppp/4p3/2pp4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq c6 0 4",
    eco: "D32",
    openingName: "QGD: Tarrasch defence",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 c5"
}, {
    fen: "rnbqkbnr/pp3ppp/4p3/3P4/3p4/2N5/PP2PPPP/R1BQKBNR w KQkq - 0 5",
    eco: "D32",
    openingName: "QGD: Tarrasch, von Hennig-Schara gambit",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 c5 4. cxd5 cxd4"
}, {
    fen: "rnbqkbnr/pp3ppp/8/2pp4/3P4/2N5/PP2PPPP/R1BQKBNR w KQkq - 0 5",
    eco: "D32",
    openingName: "QGD: Tarrasch defence, 4.cd ed",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 c5 4. cxd5 exd5"
}, {
    fen: "rnbqkbnr/p4ppp/8/1pP5/N2p4/8/PP2PPPP/R1BQKBNR w KQkq b6 0 7",
    eco: "D32",
    openingName: "QGD: Tarrasch defence, Tarrasch gambit",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 c5 4. cxd5 exd5 5. dxc5 d4 6. Na4 b5"
}, {
    fen: "rnbqkbnr/pp3ppp/8/2pp4/3PP3/2N5/PP3PPP/R1BQKBNR b KQkq e3 0 5",
    eco: "D32",
    openingName: "QGD: Tarrasch defence, Marshall gambit",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 c5 4. cxd5 exd5 5. e4"
}, {
    fen: "rnbqkbnr/pp3ppp/8/2pp4/3P4/2N2N2/PP2PPPP/R1BQKB1R b KQkq - 1 5",
    eco: "D32",
    openingName: "QGD: Tarrasch defence",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 c5 4. cxd5 exd5 5. Nf3"
}, {
    fen: "r1bqkbnr/pp3ppp/2n5/2pp4/3P4/2N2NP1/PP2PP1P/R1BQKB1R b KQkq - 0 6",
    eco: "D33",
    openingName: "QGD: Tarrasch, Schlechter-Rubinstein system",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 c5 4. cxd5 exd5 5. Nf3 Nc6 6. g3"
}, {
    fen: "r1bqkbnr/pp3ppp/2n5/3p4/2pP4/2N2NP1/PP2PP1P/R1BQKB1R w KQkq - 0 7",
    eco: "D33",
    openingName: "QGD: Tarrasch, Folkestone (Swedish) variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 c5 4. cxd5 exd5 5. Nf3 Nc6 6. g3 c4"
}, {
    fen: "r1bqkbnr/pp3ppp/2n5/3p4/2pPP3/2N2NP1/PP3P1P/R1BQKB1R b KQkq e3 0 7",
    eco: "D33",
    openingName: "QGD: Tarrasch, Schlechter-Rubinstein system, Rey Ardid variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 c5 4. cxd5 exd5 5. Nf3 Nc6 6. g3 c4 7. e4"
}, {
    fen: "r1bqkb1r/pp3ppp/2n2n2/2pp4/3P4/2N2NP1/PP2PP1P/R1BQKB1R w KQkq - 1 7",
    eco: "D33",
    openingName: "QGD: Tarrasch, Prague variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 c5 4. cxd5 exd5 5. Nf3 Nc6 6. g3 Nf6"
}, {
    fen: "r2qkb1r/pp3ppp/2n2n2/2pp4/3P2b1/2N2NP1/PP2PPBP/R1BQK2R w KQkq - 3 8",
    eco: "D33",
    openingName: "QGD: Tarrasch, Wagner variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 c5 4. cxd5 exd5 5. Nf3 Nc6 6. g3 Nf6 7. Bg2 Bg4"
}, {
    fen: "r1bqk2r/pp2bppp/2n2n2/2pp4/3P4/2N2NP1/PP2PPBP/R1BQK2R w KQkq - 3 8",
    eco: "D34",
    openingName: "QGD: Tarrasch, Prague variation, 7...Be7",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 c5 4. cxd5 exd5 5. Nf3 Nc6 6. g3 Nf6 7. Bg2 Be7"
}, {
    fen: "r1bq1rk1/pp2bppp/2n2n2/2pp4/3P4/2N2NP1/PP2PPBP/R1BQ1RK1 w - - 5 9",
    eco: "D34",
    openingName: "QGD: Tarrasch, Prague variation, Normal position",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 c5 4. cxd5 exd5 5. Nf3 Nc6 6. g3 Nf6 7. Bg2 Be7 8. O-O O-O"
}, {
    fen: "r1bq1rk1/pp3ppp/2n2n2/2bp4/N7/5NP1/PP2PPBP/R1BQ1RK1 b - - 1 10",
    eco: "D34",
    openingName: "QGD: Tarrasch, Reti variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 c5 4. cxd5 exd5 5. Nf3 Nc6 6. g3 Nf6 7. Bg2 Be7 8. O-O O-O 9. dxc5 Bxc5 10. Na4"
}, {
    fen: "r1bq1rk1/pp2bppp/2n2n2/2pp2B1/3P4/2N2NP1/PP2PPBP/R2Q1RK1 b - - 6 9",
    eco: "D34",
    openingName: "QGD: Tarrasch, Prague variation, 9.Bg5",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 c5 4. cxd5 exd5 5. Nf3 Nc6 6. g3 Nf6 7. Bg2 Be7 8. O-O O-O 9. Bg5"
}, {
    fen: "r2q1rk1/pp2bppp/2n1bn2/3p2B1/2pP4/2N2NP1/PP2PPBP/2RQ1RK1 w - - 0 11",
    eco: "D34",
    openingName: "QGD: Tarrasch, Bogolyubov variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 c5 4. cxd5 exd5 5. Nf3 Nc6 6. g3 Nf6 7. Bg2 Be7 8. O-O O-O 9. Bg5 Be6 10. Rc1 c4"
}, {
    fen: "r2q1rk1/p3bppp/1pn1bn2/2pp2B1/3P4/2N2NP1/PP2PPBP/2RQ1RK1 w - - 0 11",
    eco: "D34",
    openingName: "QGD: Tarrasch, Stoltz variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 c5 4. cxd5 exd5 5. Nf3 Nc6 6. g3 Nf6 7. Bg2 Be7 8. O-O O-O 9. Bg5 Be6 10. Rc1 b6"
}, {
    fen: "rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4",
    eco: "D35",
    openingName: "QGD: 3...Nf6",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6"
}, {
    fen: "rnbqkb1r/ppp2ppp/4pn2/3p4/2PP1B2/2N5/PP2PPPP/R2QKBNR b KQkq - 3 4",
    eco: "D35",
    openingName: "QGD: Harrwitz attack",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bf4"
}, {
    fen: "rnbqkb1r/ppp2ppp/4pn2/3P4/3P4/2N5/PP2PPPP/R1BQKBNR b KQkq - 0 4",
    eco: "D35",
    openingName: "QGD: exchange variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. cxd5"
}, {
    fen: "r1bqkb1r/pppn1ppp/5n2/3p4/3P1B2/2N2N2/PP2PPPP/R2QKB1R b KQkq - 3 6",
    eco: "D35",
    openingName: "QGD: exchange, Saemisch variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. cxd5 exd5 5. Nf3 Nbd7 6. Bf4"
}, {
    fen: "rnbqkb1r/ppp2ppp/5n2/3p2B1/3P4/2N5/PP2PPPP/R2QKBNR b KQkq - 1 5",
    eco: "D35",
    openingName: "QGD: exchange, positional line",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. cxd5 exd5 5. Bg5"
}, {
    fen: "r1bqrnk1/ppp1bppp/5n2/3p2B1/3P4/2NBP3/PPQ1NPPP/2KR3R b - - 8 10",
    eco: "D35",
    openingName: "QGD: exchange, chameleon variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. cxd5 exd5 5. Bg5 Be7 6. e3 O-O 7. Bd3 Nbd7 8. Qc2 Re8 9. Nge2 Nf8 10. O-O-O"
}, {
    fen: "rnbqkb1r/pp3ppp/2p2n2/3p2B1/3P4/2N5/PP2PPPP/R2QKBNR w KQkq - 0 6",
    eco: "D35",
    openingName: "QGD: exchange, positional line, 5...c6",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. cxd5 exd5 5. Bg5 c6"
}, {
    fen: "rnbqkb1r/pp3ppp/2p2n2/3p2B1/3P4/2N5/PPQ1PPPP/R3KBNR b KQkq - 1 6",
    eco: "D36",
    openingName: "QGD: exchange, positional line, 6.Qc2",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. cxd5 exd5 5. Bg5 c6 6. Qc2"
}, {
    fen: "rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R b KQkq - 3 4",
    eco: "D37",
    openingName: "QGD: 4.Nf3",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3"
}, {
    fen: "rnbqk2r/ppp1bppp/4pn2/3p4/2PP1B2/2N2N2/PP2PPPP/R2QKB1R b KQkq - 5 5",
    eco: "D37",
    openingName: "QGD: classical variation (5.Bf4)",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 Be7 5. Bf4"
}, {
    fen: "rnbqk2r/ppp2ppp/4pn2/3p4/1bPP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 4 5",
    eco: "D38",
    openingName: "QGD: Ragozin variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 Bb4"
}, {
    fen: "rnbqk2r/ppp2ppp/4pn2/6B1/1bpP4/2N2N2/PP2PPPP/R2QKB1R w KQkq - 0 6",
    eco: "D39",
    openingName: "QGD: Ragozin, Vienna variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 Bb4 5. Bg5 dxc4"
}, {
    fen: "rnbqkb1r/pp3ppp/4pn2/2pp4/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq c6 0 5",
    eco: "D40",
    openingName: "QGD: Semi-Tarrasch defence",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c5"
}, {
    fen: "r1bq1rk1/pp3ppp/2nbpn2/2pp4/2PP4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 5 8",
    eco: "D40",
    openingName: "QGD: Semi-Tarrasch, symmetrical variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c5 5. e3 Nc6 6. Bd3 Bd6 7. O-O O-O"
}, {
    fen: "r1b2rk1/pp2qppp/2n1pn2/2bp4/2P1P3/2NB1N2/PP2QPPP/R1B2RK1 b - - 0 10",
    eco: "D40",
    openingName: "QGD: Semi-Tarrasch, Levenfish variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c5 5. e3 Nc6 6. Bd3 Bd6 7. O-O O-O 8. Qe2 Qe7 9. dxc5 Bxc5 10. e4"
}, {
    fen: "rnbqkb1r/pp3ppp/4pn2/2pp2B1/2PP4/2N2N2/PP2PPPP/R2QKB1R b KQkq - 1 5",
    eco: "D40",
    openingName: "QGD: Semi-Tarrasch defence, Pillsbury variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c5 5. Bg5"
}, {
    fen: "rnbqkb1r/pp3ppp/4pn2/2pP4/3P4/2N2N2/PP2PPPP/R1BQKB1R b KQkq - 0 5",
    eco: "D41",
    openingName: "QGD: Semi-Tarrasch, 5.cd",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c5 5. cxd5"
}, {
    fen: "rnbq1rk1/pp3ppp/4p3/1B6/3PP3/5N2/P2Q1PPP/R3K2R b KQ - 2 11",
    eco: "D41",
    openingName: "QGD: Semi-Tarrasch, Kmoch variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c5 5. cxd5 Nxd5 6. e4 Nxc3 7. bxc3 cxd4 8. cxd4 Bb4+ 9. Bd2 Bxd2+ 10. Qxd2 O-O 11. Bb5"
}, {
    fen: "rnb1k2r/pp3ppp/4p3/q7/1b1PP3/5N2/P2B1PPP/R2QKB1R w KQkq - 3 10",
    eco: "D41",
    openingName: "QGD: Semi-Tarrasch, San Sebastian variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c5 5. cxd5 Nxd5 6. e4 Nxc3 7. bxc3 cxd4 8. cxd4 Bb4+ 9. Bd2 Qa5"
}, {
    fen: "rnbqkb1r/pp3ppp/4p3/2pn4/3P4/2N1PN2/PP3PPP/R1BQKB1R b KQkq - 0 6",
    eco: "D41",
    openingName: "QGD: Semi-Tarrasch with e3",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c5 5. cxd5 Nxd5 6. e3"
}, {
    fen: "r1bqkb1r/pp3ppp/2n1p3/2pn4/3P4/2NBPN2/PP3PPP/R1BQK2R b KQkq - 2 7",
    eco: "D42",
    openingName: "QGD: Semi-Tarrasch, 7.Bd3",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c5 5. cxd5 Nxd5 6. e3 Nc6 7. Bd3"
}, {
    fen: "rnbqkb1r/pp3ppp/2p1pn2/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 0 5",
    eco: "D43",
    openingName: "QGD semi-Slav",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c6"
}, {
    fen: "rnbqkb1r/pp3ppp/2p1pn2/6B1/2pP4/2N2N2/PP2PPPP/R2QKB1R w KQkq - 0 6",
    eco: "D44",
    openingName: "QGD semi-Slav: 5.Bg5 dc",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c6 5. Bg5 dxc4"
}, {
    fen: "rnbqkb1r/pp3ppp/2p1pn2/6B1/2pPP3/2N2N2/PP3PPP/R2QKB1R b KQkq e3 0 6",
    eco: "D44",
    openingName: "QGD semi-Slav: Botvinnik system (anti-Meran)",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c6 5. Bg5 dxc4 6. e4"
}, {
    fen: "rnbqkb1r/p4p2/2p1pP1p/1p2N3/2pP3p/2N5/PP3PPP/R2QKB1R b KQkq - 1 10",
    eco: "D44",
    openingName: "QGD semi-Slav: Ekstrom variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c6 5. Bg5 dxc4 6. e4 b5 7. e5 h6 8. Bh4 g5 9. exf6 gxh4 10. Ne5"
}, {
    fen: "rnbqkb1r/p4p2/2p1pn1p/1p2P1N1/2pP3B/2N5/PP3PPP/R2QKB1R b KQkq - 0 9",
    eco: "D44",
    openingName: "QGD semi-Slav: anti-Meran gambit",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c6 5. Bg5 dxc4 6. e4 b5 7. e5 h6 8. Bh4 g5 9. Nxg5"
}, {
    fen: "r1bqkb1r/p2n1p2/2p1pn2/1p2P1B1/2pP4/2N3P1/PP3P1P/R2QKB1R b KQkq - 0 11",
    eco: "D44",
    openingName: "QGD semi-Slav: anti-Meran, Lilienthal variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c6 5. Bg5 dxc4 6. e4 b5 7. e5 h6 8. Bh4 g5 9. Nxg5 hxg5 10. Bxg5 Nbd7 11. g3"
}, {
    fen: "r1bqkb1r/p2n1p2/2p1pn2/1p2P1B1/2pP4/2N2Q2/PP3PPP/R3KB1R b KQkq - 2 11",
    eco: "D44",
    openingName: "QGD semi-Slav: anti-Meran, Szabo variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c6 5. Bg5 dxc4 6. e4 b5 7. e5 h6 8. Bh4 g5 9. Nxg5 hxg5 10. Bxg5 Nbd7 11. Qf3"
}, {
    fen: "rnbqkb1r/p4p2/2p1p2p/1p1nP1N1/2pP3B/2N5/PP3PPP/R2QKB1R w KQkq - 1 10",
    eco: "D44",
    openingName: "QGD semi-Slav: anti-Meran, Alatortsev system",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c6 5. Bg5 dxc4 6. e4 b5 7. e5 h6 8. Bh4 g5 9. Nxg5 Nd5"
}, {
    fen: "rnbqkb1r/pp3ppp/2p1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R b KQkq - 0 5",
    eco: "D45",
    openingName: "QGD semi-Slav: 5.e3",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c6 5. e3"
}, {
    fen: "rnbqkb1r/pp4pp/2p1p3/3p1p2/2PPn3/2NBPN2/PP3PPP/R1BQK2R w KQkq f6 0 7",
    eco: "D45",
    openingName: "QGD semi-Slav: stonewall defence",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c6 5. e3 Ne4 6. Bd3 f5"
}, {
    fen: "rnbqkb1r/1p3ppp/p1p1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQkq - 0 6",
    eco: "D45",
    openingName: "QGD semi-Slav: accelerated Meran (Alekhine variation)",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c6 5. e3 a6"
}, {
    fen: "r1bqkb1r/pp1n1ppp/2p1pn2/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R w KQkq - 1 6",
    eco: "D45",
    openingName: "QGD semi-Slav: 5...Nd7",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c6 5. e3 Nbd7"
}, {
    fen: "r1bqkb1r/pp1n1ppp/2p1pn2/3p4/2PP4/2N1PN2/PPQ2PPP/R1B1KB1R b KQkq - 2 6",
    eco: "D45",
    openingName: "QGD semi-Slav: Stoltz variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c6 5. e3 Nbd7 6. Qc2"
}, {
    fen: "r1bqkb1r/pp1n1ppp/2p1pn2/3pN3/2PP4/2N1P3/PP3PPP/R1BQKB1R b KQkq - 2 6",
    eco: "D45",
    openingName: "QGD semi-Slav: Rubinstein (anti-Meran) system",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c6 5. e3 Nbd7 6. Ne5"
}, {
    fen: "r1bqkb1r/pp1n1ppp/2p1pn2/3p4/2PP4/2NBPN2/PP3PPP/R1BQK2R b KQkq - 2 6",
    eco: "D46",
    openingName: "QGD semi-Slav: 6.Bd3",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c6 5. e3 Nbd7 6. Bd3"
}, {
    fen: "r1bqk2r/pp1nbppp/2p1pn2/3p4/2PP4/2NBPN2/PP3PPP/R1BQK2R w KQkq - 3 7",
    eco: "D46",
    openingName: "QGD semi-Slav: Bogolyubov variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c6 5. e3 Nbd7 6. Bd3 Be7"
}, {
    fen: "r1bqk2r/pp1n1ppp/2p1pn2/3p4/1bPP4/2NBPN2/PP3PPP/R1BQK2R w KQkq - 3 7",
    eco: "D46",
    openingName: "QGD semi-Slav: Romih variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c6 5. e3 Nbd7 6. Bd3 Bb4"
}, {
    fen: "r1bqk2r/pp1n1ppp/2pbpn2/3p4/2PP4/2NBPN2/PP3PPP/R1BQK2R w KQkq - 3 7",
    eco: "D46",
    openingName: "QGD semi-Slav: Chigorin defence",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c6 5. e3 Nbd7 6. Bd3 Bd6"
}, {
    fen: "r1bqkb1r/pp1n1ppp/2p1pn2/8/2BP4/2N1PN2/PP3PPP/R1BQK2R b KQkq - 0 7",
    eco: "D47",
    openingName: "QGD semi-Slav: 7.Bc4",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c6 5. e3 Nbd7 6. Bd3 dxc4 7. Bxc4"
}, {
    fen: "r1bqkb1r/p2n1ppp/2p1pn2/1p6/2BP4/2N1PN2/PP3PPP/R1BQK2R w KQkq b6 0 8",
    eco: "D47",
    openingName: "QGD semi-Slav: Meran variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c6 5. e3 Nbd7 6. Bd3 dxc4 7. Bxc4 b5"
}, {
    fen: "r1bqkb1r/p2n1ppp/2p1pn2/8/1p1P4/2NBPN2/PP3PPP/R1BQK2R w KQkq - 0 9",
    eco: "D47",
    openingName: "QGD semi-Slav: neo-Meran (Lundin variation)",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c6 5. e3 Nbd7 6. Bd3 dxc4 7. Bxc4 b5 8. Bd3 b4"
}, {
    fen: "r2qkb1r/pb1n1ppp/2p1pn2/1p6/3P4/2NBPN2/PP3PPP/R1BQK2R w KQkq - 2 9",
    eco: "D47",
    openingName: "QGD semi-Slav: Meran, Wade variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c6 5. e3 Nbd7 6. Bd3 dxc4 7. Bxc4 b5 8. Bd3 Bb7"
}, {
    fen: "r1bqkb1r/3n1ppp/p1p1pn2/1p6/3P4/2NBPN2/PP3PPP/R1BQK2R w KQkq - 0 9",
    eco: "D48",
    openingName: "QGD semi-Slav: Meran, 8...a6",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c6 5. e3 Nbd7 6. Bd3 dxc4 7. Bxc4 b5 8. Bd3 a6"
}, {
    fen: "r1bqkb1r/3n1ppp/p1p1pn2/8/1p1PP3/2NB1N2/PP3PPP/R1BQK2R w KQkq - 0 10",
    eco: "D48",
    openingName: "QGD semi-Slav: Meran, Pirc variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c6 5. e3 Nbd7 6. Bd3 dxc4 7. Bxc4 b5 8. Bd3 a6 9. e4 b4"
}, {
    fen: "r1bqkb1r/3n1ppp/p3pn2/1pp5/3PP3/2NB1N2/PP3PPP/R1BQK2R w KQkq - 0 10",
    eco: "D48",
    openingName: "QGD semi-Slav: Meran",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c6 5. e3 Nbd7 6. Bd3 dxc4 7. Bxc4 b5 8. Bd3 a6 9. e4 c5"
}, {
    fen: "r1bqkb1r/3n1ppp/p3pn2/1ppP4/4P3/2NB1N2/PP3PPP/R1BQK2R b KQkq - 0 10",
    eco: "D48",
    openingName: "QGD semi-Slav: Meran, Reynolds' variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c6 5. e3 Nbd7 6. Bd3 dxc4 7. Bxc4 b5 8. Bd3 a6 9. e4 c5 10. d5"
}, {
    fen: "r1bqkb1r/3n1ppp/p3pn2/1pp1P3/3P4/2NB1N2/PP3PPP/R1BQK2R b KQkq - 0 10",
    eco: "D48",
    openingName: "QGD semi-Slav: Meran, old main line",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c6 5. e3 Nbd7 6. Bd3 dxc4 7. Bxc4 b5 8. Bd3 a6 9. e4 c5 10. e5"
}, {
    fen: "r1bqkb1r/3n1ppp/p3pn2/1N2P3/3p4/3B1N2/PP3PPP/R1BQK2R b KQkq - 0 11",
    eco: "D49",
    openingName: "QGD semi-Slav: Meran, Blumenfeld variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c6 5. e3 Nbd7 6. Bd3 dxc4 7. Bxc4 b5 8. Bd3 a6 9. e4 c5 10. e5 cxd4 11. Nxb5"
}, {
    fen: "r1bqkb1r/3n1ppp/p3p3/1N2P3/3p2n1/3B1N2/PP3PPP/R1BQK2R w KQkq - 1 12",
    eco: "D49",
    openingName: "QGD semi-Slav: Meran, Rabinovich variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c6 5. e3 Nbd7 6. Bd3 dxc4 7. Bxc4 b5 8. Bd3 a6 9. e4 c5 10. e5 cxd4 11. Nxb5 Ng4"
}, {
    fen: "r1bqkb1r/5ppp/p3pn2/1N2n3/3p4/3B1N2/PP3PPP/R1BQK2R w KQkq - 0 12",
    eco: "D49",
    openingName: "QGD semi-Slav: Meran, Sozin variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c6 5. e3 Nbd7 6. Bd3 dxc4 7. Bxc4 b5 8. Bd3 a6 9. e4 c5 10. e5 cxd4 11. Nxb5 Nxe5"
}, {
    fen: "r1bqkb1r/5ppp/4pn2/1p2N3/3p4/3B1Q2/PP3PPP/R1B1K2R b KQkq - 1 13",
    eco: "D49",
    openingName: "QGD semi-Slav: Meran, Stahlberg variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c6 5. e3 Nbd7 6. Bd3 dxc4 7. Bxc4 b5 8. Bd3 a6 9. e4 c5 10. e5 cxd4 11. Nxb5 Nxe5 12. Nxe5 axb5 13. Qf3"
}, {
    fen: "r1bqkb1r/5ppp/4pn2/1p2N3/3p4/3B4/PP3PPP/R1BQ1RK1 b kq - 1 13",
    eco: "D49",
    openingName: "QGD semi-Slav: Meran, Sozin variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c6 5. e3 Nbd7 6. Bd3 dxc4 7. Bxc4 b5 8. Bd3 a6 9. e4 c5 10. e5 cxd4 11. Nxb5 Nxe5 12. Nxe5 axb5 13. O-O"
}, {
    fen: "r3kb1r/5ppp/b3pn2/1p1qN1B1/3p4/3B4/PP2QPPP/R4RK1 b kq - 5 15",
    eco: "D49",
    openingName: "QGD semi-Slav: Meran, Rellstab attack",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Nf3 c6 5. e3 Nbd7 6. Bd3 dxc4 7. Bxc4 b5 8. Bd3 a6 9. e4 c5 10. e5 cxd4 11. Nxb5 Nxe5 12. Nxe5 axb5 13. O-O Qd5 14. Qe2 Ba6 15. Bg5"
}, {
    fen: "rnbqkb1r/ppp2ppp/4pn2/3p2B1/2PP4/2N5/PP2PPPP/R2QKBNR b KQkq - 3 4",
    eco: "D50",
    openingName: "QGD: 4.Bg5",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5"
}, {
    fen: "rnbqkb1r/pp3ppp/4pn2/2pp2B1/2PP4/2N5/PP2PPPP/R2QKBNR w KQkq c6 0 5",
    eco: "D50",
    openingName: "QGD: Been-Koomen variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 c5"
}, {
    fen: "rnbqkb1r/1p3ppp/p4n2/1N1pp1B1/Q1P5/2N5/PP2PPPP/R3KB1R b KQkq - 1 8",
    eco: "D50",
    openingName: "QGD: Semi-Tarrasch, Krause variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 c5 5. Nf3 cxd4 6. Nxd4 e5 7. Ndb5 a6 8. Qa4"
}, {
    fen: "rnbqkb1r/pp3ppp/4pn2/3p2B1/2PQ4/2N2N2/PP2PPPP/R3KB1R b KQkq - 0 6",
    eco: "D50",
    openingName: "QGD: Semi-Tarrasch, Primitive Pillsbury variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 c5 5. Nf3 cxd4 6. Qxd4"
}, {
    fen: "rnbqkb1r/pp3ppp/4pn2/2pP2B1/3P4/2N5/PP2PPPP/R2QKBNR b KQkq - 0 5",
    eco: "D50",
    openingName: "QGD: Semi-Tarrasch",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 c5 5. cxd5"
}, {
    fen: "rnb1kb1r/pp3ppp/1q2pn2/2pP2B1/3P4/2N5/PP2PPPP/R2QKBNR w KQkq - 1 6",
    eco: "D50",
    openingName: "QGD: Canal (Venice) variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 c5 5. cxd5 Qb6"
}, {
    fen: "r1bqkb1r/pppn1ppp/4pn2/3p2B1/2PP4/2N5/PP2PPPP/R2QKBNR w KQkq - 4 5",
    eco: "D51",
    openingName: "QGD: 4.Bg5 Nbd7",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Nbd7"
}, {
    fen: "r1b1kb1r/pp1n1ppp/2p1pn2/q2p4/2PP4/2N2N2/PP1BPPPP/2RQKB1R b Kkq - 3 7",
    eco: "D51",
    openingName: "QGD: Rochlin variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Nbd7 5. Nf3 c6 6. Rc1 Qa5 7. Bd2"
}, {
    fen: "r1bqkb1r/pp1n1ppp/2p1pn2/3p2B1/2PPP3/2N2N2/PP3PPP/R2QKB1R b KQkq e3 0 6",
    eco: "D51",
    openingName: "QGD: Alekhine variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Nbd7 5. Nf3 c6 6. e4"
}, {
    fen: "r1bqkb1r/pppn1ppp/4pn2/3p2B1/2PP4/2N1P3/PP3PPP/R2QKBNR b KQkq - 0 5",
    eco: "D51",
    openingName: "QGD",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Nbd7 5. e3"
}, {
    fen: "r1bqk2r/pppn1ppp/4pn2/3p2B1/1bPP4/2N1P3/PP3PPP/R2QKBNR w KQkq - 1 6",
    eco: "D51",
    openingName: "QGD: Manhattan variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Nbd7 5. e3 Bb4"
}, {
    fen: "r1bqkb1r/pp1n1ppp/2p1pn2/3p2B1/2PP4/2N1P3/PP3PPP/R2QKBNR w KQkq - 0 6",
    eco: "D51",
    openingName: "QGD: 5...c6",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Nbd7 5. e3 c6"
}, {
    fen: "r1bqkb1r/pp1n1ppp/2p1pn2/3p2B1/2PP4/P1N1P3/1P3PPP/R2QKBNR b KQkq - 0 6",
    eco: "D51",
    openingName: "QGD: Capablanca anti-Cambridge Springs variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Nbd7 5. e3 c6 6. a3"
}, {
    fen: "r1bqkb1r/pp1n1ppp/2p1pn2/3p2B1/2PP4/2N1PN2/PP3PPP/R2QKB1R b KQkq - 1 6",
    eco: "D52",
    openingName: "QGD",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Nbd7 5. e3 c6 6. Nf3"
}, {
    fen: "r1b1kb1r/pp1n1ppp/2p1pn2/q2p2B1/2PP4/2N1PN2/PP3PPP/R2QKB1R w KQkq - 2 7",
    eco: "D52",
    openingName: "QGD: Cambridge Springs defence",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Nbd7 5. e3 c6 6. Nf3 Qa5"
}, {
    fen: "r1b1k2r/pp1n1ppp/2p1pn2/q2p2B1/1bPP4/2N1P3/PPQN1PPP/R3KB1R b KQkq - 5 8",
    eco: "D52",
    openingName: "QGD: Cambridge Springs defence, Bogoljubow variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Nbd7 5. e3 c6 6. Nf3 Qa5 7. Nd2 Bb4 8. Qc2"
}, {
    fen: "r1b2rk1/pp1n1ppp/2p1pn2/q2p4/1bPP3B/2N1P3/PPQN1PPP/R3KB1R b KQ - 7 9",
    eco: "D52",
    openingName: "QGD: Cambridge Springs defence, Argentine variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Nbd7 5. e3 c6 6. Nf3 Qa5 7. Nd2 Bb4 8. Qc2 O-O 9. Bh4"
}, {
    fen: "r1b1kb1r/pp1n1ppp/2p1pn2/q5B1/2pP4/2N1P3/PP1N1PPP/R2QKB1R w KQkq - 0 8",
    eco: "D52",
    openingName: "QGD: Cambridge Springs defence, Rubinstein variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Nbd7 5. e3 c6 6. Nf3 Qa5 7. Nd2 dxc4"
}, {
    fen: "r1b1kb1r/pp1n1ppp/2p1pB2/q2p4/2PP4/2N1PN2/PP3PPP/R2QKB1R b KQkq - 0 7",
    eco: "D52",
    openingName: "QGD: Cambridge Springs defence, Capablanca variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Nbd7 5. e3 c6 6. Nf3 Qa5 7. Bxf6"
}, {
    fen: "r1b1kb1r/pp1n1ppp/2p1pn2/q2P2B1/3P4/2N1PN2/PP3PPP/R2QKB1R b KQkq - 0 7",
    eco: "D52",
    openingName: "QGD: Cambridge Springs defence, 7.cd",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Nbd7 5. e3 c6 6. Nf3 Qa5 7. cxd5"
}, {
    fen: "r1b1kb1r/pp1n1ppp/2p1p3/q2n2B1/3P4/2N1PN2/PP3PPP/R2QKB1R w KQkq - 0 8",
    eco: "D52",
    openingName: "QGD: Cambridge Springs defence, Yugoslav variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Nbd7 5. e3 c6 6. Nf3 Qa5 7. cxd5 Nxd5"
}, {
    fen: "rnbqk2r/ppp1bppp/4pn2/3p2B1/2PP4/2N5/PP2PPPP/R2QKBNR w KQkq - 4 5",
    eco: "D53",
    openingName: "QGD: 4.Bg5 Be7",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7"
}, {
    fen: "rnbqk2r/ppp1bppp/4p3/3p2B1/2PPn3/2N1P3/PP3PPP/R2QKBNR w KQkq - 1 6",
    eco: "D53",
    openingName: "QGD: Lasker variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 Ne4"
}, {
    fen: "rnbq1rk1/ppp1bppp/4pn2/3p2B1/2PP4/2N1P3/PP3PPP/R2QKBNR w KQ - 1 6",
    eco: "D53",
    openingName: "QGD: 4.Bg5 Be7, 5.e3 O-O",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O"
}, {
    fen: "rnbq1rk1/ppp1bppp/4pn2/3p2B1/2PP4/2N1P3/PP3PPP/2RQKBNR b K - 2 6",
    eco: "D54",
    openingName: "QGD: Anti-neo-orthodox variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Rc1"
}, {
    fen: "rnbq1rk1/ppp1bppp/4pn2/3p2B1/2PP4/2N1PN2/PP3PPP/R2QKB1R b KQ - 2 6",
    eco: "D55",
    openingName: "QGD: 6.Nf3",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3"
}, {
    fen: "rn1q1rk1/pbp1bppp/1p3n2/3pN1B1/3P4/2NBP3/PP3PPP/R2QK2R b KQ - 1 9",
    eco: "D55",
    openingName: "QGD: Pillsbury attack",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 b6 7. Bd3 Bb7 8. cxd5 exd5 9. Ne5"
}, {
    fen: "rnbq1rk1/ppp1bpp1/4pn1p/3p2B1/2PP4/2N1PN2/PP3PPP/R2QKB1R w KQ - 0 7",
    eco: "D55",
    openingName: "QGD: Neo-orthodox variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 h6"
}, {
    fen: "rnbq1rk1/ppp1bpp1/4pB1p/3p4/2PP4/2N1PN2/PP3PPP/R2QKB1R b KQ - 0 7",
    eco: "D55",
    openingName: "QGD: Neo-orthodox variation, 7.Bxf6",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 h6 7. Bxf6"
}, {
    fen: "r1bq1rk1/pp1n1pp1/2p1pb1p/8/2BP4/2N1PN2/PP3PPP/2RQ1RK1 b - - 0 11",
    eco: "D55",
    openingName: "QGD: Petrosian variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 h6 7. Bxf6 Bxf6 8. Rc1 c6 9. Bd3 Nd7 10. O-O dxc4 11. Bxc4"
}, {
    fen: "rnbq1rk1/ppp1bpp1/4pn1p/3p4/2PP3B/2N1PN2/PP3PPP/R2QKB1R b KQ - 1 7",
    eco: "D55",
    openingName: "QGD: Neo-orthodox variation, 7.Bh4",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 h6 7. Bh4"
}, {
    fen: "rnbq1rk1/ppp1bpp1/4p2p/3p4/2PPn2B/2N1PN2/PP3PPP/R2QKB1R w KQ - 2 8",
    eco: "D56",
    openingName: "QGD: Lasker defence",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 h6 7. Bh4 Ne4"
}, {
    fen: "rnb2rk1/ppp1qpp1/4p2p/3p4/2PPn3/2N1PN2/PPQ2PPP/R3KB1R b KQ - 1 9",
    eco: "D56",
    openingName: "QGD: Lasker defence, Teichmann variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 h6 7. Bh4 Ne4 8. Bxe7 Qxe7 9. Qc2"
}, {
    fen: "r4rk1/pp1bqpp1/2n1pn1p/2p5/2BP4/2N1PN2/PPQ2PPP/R2R2K1 w - - 4 14",
    eco: "D56",
    openingName: "QGD: Lasker defence, Russian variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 h6 7. Bh4 Ne4 8. Bxe7 Qxe7 9. Qc2 Nf6 10. Bd3 dxc4 11. Bxc4 c5 12. O-O Nc6 13. Rfd1 Bd7"
}, {
    fen: "rnb2rk1/ppp1qpp1/4p2p/3P4/3P4/2P1PN2/P4PPP/R2QKB1R b KQ - 0 10",
    eco: "D57",
    openingName: "QGD: Lasker defence, main line",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 h6 7. Bh4 Ne4 8. Bxe7 Qxe7 9. cxd5 Nxc3 10. bxc3"
}, {
    fen: "rnb2rk1/ppp2pp1/3q3p/3p4/3P4/1QP1PN2/P4PPP/R3KB1R w KQ - 2 12",
    eco: "D57",
    openingName: "QGD: Lasker defence, Bernstein variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 h6 7. Bh4 Ne4 8. Bxe7 Qxe7 9. cxd5 Nxc3 10. bxc3 exd5 11. Qb3 Qd6"
}, {
    fen: "rnbq1rk1/p1p1bpp1/1p2pn1p/3p4/2PP3B/2N1PN2/PP3PPP/R2QKB1R w KQ - 0 8",
    eco: "D58",
    openingName: "QGD: Tartakower (Makagonov-Bondarevsky) system",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 h6 7. Bh4 b6"
}, {
    fen: "rnbq1rk1/p1p1bpp1/1p2p2p/3n4/3P3B/2N1PN2/PP3PPP/R2QKB1R w KQ - 0 9",
    eco: "D59",
    openingName: "QGD: Tartakower (Makagonov-Bondarevsky) system, 8.cd Nxd5",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 h6 7. Bh4 b6 8. cxd5 Nxd5"
}, {
    fen: "rn3rk1/p1p1qpp1/1p2b2p/3p4/3P4/4PN2/PP3PPP/2RQKB1R w K - 2 12",
    eco: "D59",
    openingName: "QGD: Tartakower variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 h6 7. Bh4 b6 8. cxd5 Nxd5 9. Bxe7 Qxe7 10. Nxd5 exd5 11. Rc1 Be6"
}, {
    fen: "r1bq1rk1/pppnbppp/4pn2/3p2B1/2PP4/2N1PN2/PP3PPP/R2QKB1R w KQ - 3 7",
    eco: "D60",
    openingName: "QGD: Orthodox defence",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 Nbd7"
}, {
    fen: "r1bq1rk1/pppnbppp/4pn2/3p2B1/2PP4/2NBPN2/PP3PPP/R2QK2R b KQ - 4 7",
    eco: "D60",
    openingName: "QGD: Orthodox defence, Botvinnik variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 Nbd7 7. Bd3"
}, {
    fen: "r1bq1rk1/pppnbppp/4pn2/3p2B1/2PP4/1QN1PN2/PP3PPP/R3KB1R b KQ - 4 7",
    eco: "D60",
    openingName: "QGD: Orthodox defence, Rauzer variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 Nbd7 7. Qb3"
}, {
    fen: "r1bq1rk1/pppnbppp/4pn2/3p2B1/2PP4/2N1PN2/PPQ2PPP/R3KB1R b KQ - 4 7",
    eco: "D61",
    openingName: "QGD: Orthodox defence, Rubinstein variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 Nbd7 7. Qc2"
}, {
    fen: "r1bq1rk1/pp1nbppp/4pn2/2pP2B1/3P4/2N1PN2/PPQ2PPP/R3KB1R b KQ - 0 8",
    eco: "D62",
    openingName: "QGD: Orthodox defence, 7.Qc2 c5, 8.cd (Rubinstein)",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 Nbd7 7. Qc2 c5 8. cxd5"
}, {
    fen: "r1bq1rk1/pppnbppp/4pn2/3p2B1/2PP4/2N1PN2/PP3PPP/2RQKB1R b K - 4 7",
    eco: "D63",
    openingName: "QGD: Orthodox defence, 7.Rc1",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 Nbd7 7. Rc1"
}, {
    fen: "r1bq1rk1/p1pnbppp/1p3n2/3p2B1/3P4/2NBPN2/PP3PPP/2RQK2R b K - 1 9",
    eco: "D63",
    openingName: "QGD: Orthodox defence, Pillsbury attack",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 Nbd7 7. Rc1 b6 8. cxd5 exd5 9. Bd3"
}, {
    fen: "r1bq1rk1/p1pnbppp/1p3n2/1B1p2B1/3P4/2N1PN2/PP3PPP/2RQK2R b K - 1 9",
    eco: "D63",
    openingName: "QGD: Orthodox defence, Capablanca variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 Nbd7 7. Rc1 b6 8. cxd5 exd5 9. Bb5"
}, {
    fen: "r1bq1rk1/1ppnbppp/p3pn2/3p2B1/2PP4/2N1PN2/PP3PPP/2RQKB1R w K - 0 8",
    eco: "D63",
    openingName: "QGD: Orthodox defence, Swiss (Henneberger) variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 Nbd7 7. Rc1 a6"
}, {
    fen: "r1bq1rk1/1ppnbppp/p3pn2/3P2B1/3P4/2N1PN2/PP3PPP/2RQKB1R b K - 0 8",
    eco: "D63",
    openingName: "QGD: Orthodox defence, Swiss, Karlsbad variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 Nbd7 7. Rc1 a6 8. cxd5"
}, {
    fen: "r1bq1rk1/pp1nbppp/2p1pn2/3p2B1/2PP4/2N1PN2/PP3PPP/2RQKB1R w K - 0 8",
    eco: "D63",
    openingName: "QGD: Orthodox defence",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 Nbd7 7. Rc1 c6"
}, {
    fen: "r1bq1rk1/pp1nbppp/2p1pn2/3p2B1/2PP4/2N1PN2/PPQ2PPP/2R1KB1R b K - 1 8",
    eco: "D64",
    openingName: "QGD: Orthodox defence, Rubinstein attack (with Rc1)",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 Nbd7 7. Rc1 c6 8. Qc2"
}, {
    fen: "r1bq1rk1/pp1nbppp/2p1p3/3p2B1/2PPn3/2N1PN2/PPQ2PPP/2R1KB1R w K - 2 9",
    eco: "D64",
    openingName: "QGD: Orthodox defence, Rubinstein attack, Wolf variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 Nbd7 7. Rc1 c6 8. Qc2 Ne4"
}, {
    fen: "r1bq1rk1/1p1nbppp/p1p1pn2/3p2B1/2PP4/2N1PN2/PPQ2PPP/2R1KB1R w K - 0 9",
    eco: "D64",
    openingName: "QGD: Orthodox defence, Rubinstein attack, Karlsbad variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 Nbd7 7. Rc1 c6 8. Qc2 a6"
}, {
    fen: "r1bq1rk1/1p1nbppp/p1p1pn2/3p2B1/2PP4/P1N1PN2/1PQ2PPP/2R1KB1R b K - 0 9",
    eco: "D64",
    openingName: "QGD: Orthodox defence, Rubinstein attack, Gruenfeld variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 Nbd7 7. Rc1 c6 8. Qc2 a6 9. a3"
}, {
    fen: "r1bq1rk1/1p1nbppp/p1p1pn2/3P2B1/3P4/2N1PN2/PPQ2PPP/2R1KB1R b K - 0 9",
    eco: "D65",
    openingName: "QGD: Orthodox defence, Rubinstein attack, main line",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 Nbd7 7. Rc1 c6 8. Qc2 a6 9. cxd5"
}, {
    fen: "r1bq1rk1/pp1nbppp/2p1pn2/3p2B1/2PP4/2NBPN2/PP3PPP/2RQK2R b K - 1 8",
    eco: "D66",
    openingName: "QGD: Orthodox defence, Bd3 line",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 Nbd7 7. Rc1 c6 8. Bd3"
}, {
    fen: "r1bq1rk1/p2nbppp/2p1pn2/1p4B1/2BP4/2N1PN2/PP3PPP/2RQK2R w K b6 0 10",
    eco: "D66",
    openingName: "QGD: Orthodox defence, Bd3 line, fianchetto variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 Nbd7 7. Rc1 c6 8. Bd3 dxc4 9. Bxc4 b5"
}, {
    fen: "r1bq1rk1/pp1nbppp/2p1p3/3n2B1/2BP4/2N1PN2/PP3PPP/2RQK2R w K - 1 10",
    eco: "D67",
    openingName: "QGD: Orthodox defence, Bd3 line, Capablanca freeing manoevre",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 Nbd7 7. Rc1 c6 8. Bd3 dxc4 9. Bxc4 Nd5"
}, {
    fen: "r1bq1rk1/pp1nbppp/2p1p3/3n2B1/2BP3P/2N1PN2/PP3PP1/2RQK2R b K h3 0 10",
    eco: "D67",
    openingName: "QGD: Orthodox defence, Bd3 line, Janowski variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 Nbd7 7. Rc1 c6 8. Bd3 dxc4 9. Bxc4 Nd5 10. h4"
}, {
    fen: "r1b2rk1/pp1nqppp/2p1p3/3n4/2BP4/2N1PN2/PP3PPP/2RQK2R w K - 0 11",
    eco: "D67",
    openingName: "QGD: Orthodox defence, Bd3 line",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 Nbd7 7. Rc1 c6 8. Bd3 dxc4 9. Bxc4 Nd5 10. Bxe7 Qxe7"
}, {
    fen: "r1b2rk1/pp1nqppp/2p1p3/3n4/2BPN3/4PN2/PP3PPP/2RQK2R b K - 1 11",
    eco: "D67",
    openingName: "QGD: Orthodox defence, Bd3 line, Alekhine variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 Nbd7 7. Rc1 c6 8. Bd3 dxc4 9. Bxc4 Nd5 10. Bxe7 Qxe7 11. Ne4"
}, {
    fen: "r1b2rk1/pp1nqppp/2p1p3/3n4/2BP4/2N1PN2/PP3PPP/2RQ1RK1 b - - 1 11",
    eco: "D67",
    openingName: "QGD: Orthodox defence, Bd3 line, 11.O-O",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 Nbd7 7. Rc1 c6 8. Bd3 dxc4 9. Bxc4 Nd5 10. Bxe7 Qxe7 11. O-O"
}, {
    fen: "r1b2rk1/pp1nqppp/2p5/4p3/2BP4/2R1PN2/PP3PPP/3Q1RK1 w - - 0 13",
    eco: "D68",
    openingName: "QGD: Orthodox defence, classical variation",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 Nbd7 7. Rc1 c6 8. Bd3 dxc4 9. Bxc4 Nd5 10. Bxe7 Qxe7 11. O-O Nxc3 12. Rxc3 e5"
}, {
    fen: "r1b2rk1/pp1nqppp/2p5/4p3/2BP4/2R1PN2/PP3PPP/1Q3RK1 b - - 1 13",
    eco: "D68",
    openingName: "QGD: Orthodox defence, classical, 13.d1b1 (Maroczy)",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 Nbd7 7. Rc1 c6 8. Bd3 dxc4 9. Bxc4 Nd5 10. Bxe7 Qxe7 11. O-O Nxc3 12. Rxc3 e5 13. Qb1"
}, {
    fen: "r1b2rk1/pp1nqppp/2p5/4p3/2BP4/2R1PN2/PPQ2PPP/5RK1 b - - 1 13",
    eco: "D68",
    openingName: "QGD: Orthodox defence, classical, 13.d1c2 (Vidmar)",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 Nbd7 7. Rc1 c6 8. Bd3 dxc4 9. Bxc4 Nd5 10. Bxe7 Qxe7 11. O-O Nxc3 12. Rxc3 e5 13. Qc2"
}, {
    fen: "r1b2rk1/pp3ppp/2p5/4q3/2B5/2R1P3/PP3PPP/3Q1RK1 w - - 0 15",
    eco: "D69",
    openingName: "QGD: Orthodox defence, classical, 13.de",
    moves: "1. d4 d5 2. c4 e6 3. Nc3 Nf6 4. Bg5 Be7 5. e3 O-O 6. Nf3 Nbd7 7. Rc1 c6 8. Bd3 dxc4 9. Bxc4 Nd5 10. Bxe7 Qxe7 11. O-O Nxc3 12. Rxc3 e5 13. dxe5 Nxe5 14. Nxe5 Qxe5"
}, {
    fen: "rnbqkb1r/ppp1pp1p/5np1/3p4/2PP4/5P2/PP2P1PP/RNBQKBNR w KQkq d6 0 4",
    eco: "D70",
    openingName: "Neo-Gruenfeld defence",
    moves: "1. d4 Nf6 2. c4 g6 3. f3 d5"
}, {
    fen: "rnbqkb1r/ppp1pp1p/5np1/3p4/2PP4/6P1/PP2PP1P/RNBQKBNR w KQkq d6 0 4",
    eco: "D70",
    openingName: "Neo-Gruenfeld (Kemeri) defence",
    moves: "1. d4 Nf6 2. c4 g6 3. g3 d5"
}, {
    fen: "rnbqk2r/ppp1ppbp/6p1/3n4/3P4/6P1/PP2PPBP/RNBQK1NR w KQkq - 0 6",
    eco: "D71",
    openingName: "Neo-Gruenfeld, 5.cd",
    moves: "1. d4 Nf6 2. c4 g6 3. g3 d5 4. Bg2 Bg7 5. cxd5 Nxd5"
}, {
    fen: "rnbqk2r/ppp1ppbp/1n4p1/8/3PP3/6P1/PP2NPBP/RNBQK2R b KQkq - 2 7",
    eco: "D72",
    openingName: "Neo-Gruenfeld, 5.cd, main line",
    moves: "1. d4 Nf6 2. c4 g6 3. g3 d5 4. Bg2 Bg7 5. cxd5 Nxd5 6. e4 Nb6 7. Ne2"
}, {
    fen: "rnbqk2r/ppp1ppbp/5np1/3p4/2PP4/5NP1/PP2PPBP/RNBQK2R b KQkq - 3 5",
    eco: "D73",
    openingName: "Neo-Gruenfeld, 5.Nf3",
    moves: "1. d4 Nf6 2. c4 g6 3. g3 d5 4. Bg2 Bg7 5. Nf3"
}, {
    fen: "rnbq1rk1/ppp1ppbp/6p1/3n4/3P4/5NP1/PP2PPBP/RNBQ1RK1 b - - 1 7",
    eco: "D74",
    openingName: "Neo-Gruenfeld, 6.cd Nxd5, 7.O-O",
    moves: "1. d4 Nf6 2. c4 g6 3. g3 d5 4. Bg2 Bg7 5. Nf3 O-O 6. cxd5 Nxd5 7. O-O"
}, {
    fen: "rnbq1rk1/pp2ppbp/6p1/2pn4/3P4/2N2NP1/PP2PPBP/R1BQ1RK1 b - - 1 8",
    eco: "D75",
    openingName: "Neo-Gruenfeld, 6.cd Nxd5, 7.O-O c5, 8.Nc3",
    moves: "1. d4 Nf6 2. c4 g6 3. g3 d5 4. Bg2 Bg7 5. Nf3 O-O 6. cxd5 Nxd5 7. O-O c5 8. Nc3"
}, {
    fen: "rnbq1rk1/pp2ppbp/6p1/2Pn4/8/5NP1/PP2PPBP/RNBQ1RK1 b - - 0 8",
    eco: "D75",
    openingName: "Neo-Gruenfeld, 6.cd Nxd5, 7.O-O c5, 8.dc",
    moves: "1. d4 Nf6 2. c4 g6 3. g3 d5 4. Bg2 Bg7 5. Nf3 O-O 6. cxd5 Nxd5 7. O-O c5 8. dxc5"
}, {
    fen: "rnbq1rk1/ppp1ppbp/1n4p1/8/3P4/5NP1/PP2PPBP/RNBQ1RK1 w - - 2 8",
    eco: "D76",
    openingName: "Neo-Gruenfeld, 6.cd Nxd5, 7.O-O Nb6",
    moves: "1. d4 Nf6 2. c4 g6 3. g3 d5 4. Bg2 Bg7 5. Nf3 O-O 6. cxd5 Nxd5 7. O-O Nb6"
}, {
    fen: "rnbq1rk1/ppp1ppbp/5np1/3p4/2PP4/5NP1/PP2PPBP/RNBQ1RK1 b - - 5 6",
    eco: "D77",
    openingName: "Neo-Gruenfeld, 6.O-O",
    moves: "1. d4 Nf6 2. c4 g6 3. g3 d5 4. Bg2 Bg7 5. Nf3 O-O 6. O-O"
}, {
    fen: "rnbq1rk1/pp2ppbp/2p2np1/3p4/2PP4/5NP1/PP2PPBP/RNBQ1RK1 w - - 0 7",
    eco: "D78",
    openingName: "Neo-Gruenfeld, 6.O-O c6",
    moves: "1. d4 Nf6 2. c4 g6 3. g3 d5 4. Bg2 Bg7 5. Nf3 O-O 6. O-O c6"
}, {
    fen: "rnbq1rk1/pp2ppbp/5np1/3p4/3P4/5NP1/PP2PPBP/RNBQ1RK1 w - - 0 8",
    eco: "D79",
    openingName: "Neo-Gruenfeld, 6.O-O, main line",
    moves: "1. d4 Nf6 2. c4 g6 3. g3 d5 4. Bg2 Bg7 5. Nf3 O-O 6. O-O c6 7. cxd5 cxd5"
}, {
    fen: "rnbqkb1r/ppp1pp1p/5np1/3p4/2PP4/2N5/PP2PPPP/R1BQKBNR w KQkq d6 0 4",
    eco: "D80",
    openingName: "Gruenfeld defence",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5"
}, {
    fen: "rnbqkb1r/ppp1pp1p/5np1/3p4/2PP2P1/2N5/PP2PP1P/R1BQKBNR b KQkq g3 0 4",
    eco: "D80",
    openingName: "Gruenfeld: Spike gambit",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. g4"
}, {
    fen: "rnbqkb1r/ppp1pp1p/5np1/3p2B1/2PP4/2N5/PP2PPPP/R2QKBNR b KQkq - 1 4",
    eco: "D80",
    openingName: "Gruenfeld: Stockholm variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Bg5"
}, {
    fen: "rnbqkb1r/pp2pp1p/6p1/2p3B1/2PPp3/8/PP1QPPPP/R3KBNR w KQkq c6 0 7",
    eco: "D80",
    openingName: "Gruenfeld: Lundin variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Bg5 Ne4 5. Nxe4 dxe4 6. Qd2 c5"
}, {
    fen: "rnbqkb1r/ppp1pp1p/5np1/3p4/2PP4/1QN5/PP2PPPP/R1B1KBNR b KQkq - 1 4",
    eco: "D81",
    openingName: "Gruenfeld: Russian variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Qb3"
}, {
    fen: "rnbqkb1r/ppp1pp1p/5np1/3p4/2PP1B2/2N5/PP2PPPP/R2QKBNR b KQkq - 1 4",
    eco: "D82",
    openingName: "Gruenfeld: 4.Bf4",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Bf4"
}, {
    fen: "rnbq1rk1/ppp1ppbp/5np1/3p4/2PP1B2/2N1P3/PP3PPP/R2QKBNR w KQ - 1 6",
    eco: "D83",
    openingName: "Gruenfeld: Gruenfeld gambit",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Bf4 Bg7 5. e3 O-O"
}, {
    fen: "rnbq1rk1/ppp1ppbp/5np1/3p4/2PP1B2/2N1P3/PP3PPP/2RQKBNR b K - 2 6",
    eco: "D83",
    openingName: "Gruenfeld: Gruenfeld gambit, Capablanca variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Bf4 Bg7 5. e3 O-O 6. Rc1"
}, {
    fen: "rn1q1rk1/pp2ppbp/4bnp1/2Pp4/2P2B2/2N1P3/PP3PPP/2RQKBNR w K - 1 8",
    eco: "D83",
    openingName: "Gruenfeld: Gruenfeld gambit, Botvinnik variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Bf4 Bg7 5. e3 O-O 6. Rc1 c5 7. dxc5 Be6"
}, {
    fen: "rnb2rk1/ppB1ppbp/6p1/3q4/3P4/4P3/PP3PPP/R2QKBNR b KQ - 0 8",
    eco: "D84",
    openingName: "Gruenfeld: Gruenfeld gambit accepted",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Bf4 Bg7 5. e3 O-O 6. cxd5 Nxd5 7. Nxd5 Qxd5 8. Bxc7"
}, {
    fen: "rnbqkb1r/ppp1pp1p/6p1/3n4/3P4/2N5/PP2PPPP/R1BQKBNR w KQkq - 0 5",
    eco: "D85",
    openingName: "Gruenfeld: exchange variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. cxd5 Nxd5"
}, {
    fen: "rnbqk2r/ppp1ppbp/6p1/8/3PP3/2P2N2/P4PPP/R1BQKB1R b KQkq - 2 7",
    eco: "D85",
    openingName: "Gruenfeld: modern exchange variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. cxd5 Nxd5 5. e4 Nxc3 6. bxc3 Bg7 7. Nf3"
}, {
    fen: "rnbqk2r/ppp1ppbp/6p1/8/2BPP3/2P5/P4PPP/R1BQK1NR b KQkq - 2 7",
    eco: "D86",
    openingName: "Gruenfeld: exchange, classical variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. cxd5 Nxd5 5. e4 Nxc3 6. bxc3 Bg7 7. Bc4"
}, {
    fen: "rnb2rk1/p1pqppbp/1p4p1/8/2BPP3/2P5/P3NPPP/R1BQ1RK1 w - - 0 10",
    eco: "D86",
    openingName: "Gruenfeld: exchange, Larsen variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. cxd5 Nxd5 5. e4 Nxc3 6. bxc3 Bg7 7. Bc4 O-O 8. Ne2 Qd7 9. O-O b6"
}, {
    fen: "rnbq1rk1/p1p1ppbp/1p4p1/8/2BPP3/2P5/P3NPPP/R1BQK2R w KQ - 0 9",
    eco: "D86",
    openingName: "Gruenfeld: exchange, Simagin's lesser variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. cxd5 Nxd5 5. e4 Nxc3 6. bxc3 Bg7 7. Bc4 O-O 8. Ne2 b6"
}, {
    fen: "r1bq1rk1/ppp1ppbp/2n3p1/8/2BPP3/2P5/P3NPPP/R1BQK2R w KQ - 5 9",
    eco: "D86",
    openingName: "Gruenfeld: exchange, Simagin's improved variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. cxd5 Nxd5 5. e4 Nxc3 6. bxc3 Bg7 7. Bc4 O-O 8. Ne2 Nc6"
}, {
    fen: "rnbq1rk1/pp2ppbp/6p1/2p5/2BPP3/2P5/P3NPPP/R1BQK2R w KQ c6 0 9",
    eco: "D87",
    openingName: "Gruenfeld: exchange, Spassky variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. cxd5 Nxd5 5. e4 Nxc3 6. bxc3 Bg7 7. Bc4 O-O 8. Ne2 c5"
}, {
    fen: "r2q1rk1/pp2pBbp/6p1/n1p5/3PP1b1/2P1BP2/P3N1PP/R2Q1RK1 b - - 0 12",
    eco: "D87",
    openingName: "Gruenfeld: exchange, Seville variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. cxd5 Nxd5 5. e4 Nxc3 6. bxc3 Bg7 7. Bc4 O-O 8. Ne2 c5 9. O-O Nc6 10. Be3 Bg4 11. f3 Na5 12. Bxf7+"
}, {
    fen: "r1bq1rk1/pp2ppbp/2n3p1/8/2BPP3/4B3/P3NPPP/R2Q1RK1 b - - 0 11",
    eco: "D88",
    openingName: "Gruenfeld: Spassky variation, main line, 10...cd, 11.cd",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. cxd5 Nxd5 5. e4 Nxc3 6. bxc3 Bg7 7. Bc4 O-O 8. Ne2 c5 9. O-O Nc6 10. Be3 cxd4 11. cxd4"
}, {
    fen: "r2q1rk1/pp2ppbp/4b1p1/n7/3PP3/3BBP2/P3N1PP/R2Q1RK1 w - - 3 14",
    eco: "D89",
    openingName: "Gruenfeld: Spassky variation, main line, 13.Bd3",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. cxd5 Nxd5 5. e4 Nxc3 6. bxc3 Bg7 7. Bc4 O-O 8. Ne2 c5 9. O-O Nc6 10. Be3 cxd4 11. cxd4 Bg4 12. f3 Na5 13. Bd3 Be6"
}, {
    fen: "r2q1rk1/pp2ppbp/4b1p1/n2P4/4P3/3BBP2/P3N1PP/R2Q1RK1 b - - 0 14",
    eco: "D89",
    openingName: "Gruenfeld: exchange, Sokolsky variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. cxd5 Nxd5 5. e4 Nxc3 6. bxc3 Bg7 7. Bc4 O-O 8. Ne2 c5 9. O-O Nc6 10. Be3 cxd4 11. cxd4 Bg4 12. f3 Na5 13. Bd3 Be6 14. d5"
}, {
    fen: "rnbqkb1r/ppp1pp1p/5np1/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R b KQkq - 1 4",
    eco: "D90",
    openingName: "Gruenfeld: Three knights variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Nf3"
}, {
    fen: "rnbqk2r/ppp1ppbp/5np1/3p4/2PP4/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 2 5",
    eco: "D90",
    openingName: "Gruenfeld: Three knights variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Nf3 Bg7"
}, {
    fen: "rnbqk2r/ppp1ppbp/5np1/3p4/Q1PP4/2N2N2/PP2PPPP/R1B1KB1R b KQkq - 3 5",
    eco: "D90",
    openingName: "Gruenfeld: Flohr variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Nf3 Bg7 5. Qa4+"
}, {
    fen: "rnbqk2r/ppp1ppbp/5np1/3p2B1/2PP4/2N2N2/PP2PPPP/R2QKB1R b KQkq - 3 5",
    eco: "D91",
    openingName: "Gruenfeld: 5.Bg5",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Nf3 Bg7 5. Bg5"
}, {
    fen: "rnbqk2r/ppp1ppbp/5np1/3p4/2PP1B2/2N2N2/PP2PPPP/R2QKB1R b KQkq - 3 5",
    eco: "D92",
    openingName: "Gruenfeld: 5.Bf4",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Nf3 Bg7 5. Bf4"
}, {
    fen: "rnbq1rk1/ppp1ppbp/5np1/3p4/2PP1B2/2N1PN2/PP3PPP/R2QKB1R b KQ - 0 6",
    eco: "D93",
    openingName: "Gruenfeld with Bf4    e3",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Nf3 Bg7 5. Bf4 O-O 6. e3"
}, {
    fen: "rnbqk2r/ppp1ppbp/5np1/3p4/2PP4/2N1PN2/PP3PPP/R1BQKB1R b KQkq - 0 5",
    eco: "D94",
    openingName: "Gruenfeld: 5.e3",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Nf3 Bg7 5. e3"
}, {
    fen: "rnbq1rk1/ppp1ppbp/5np1/3p4/1PPP4/2N1PN2/P4PPP/R1BQKB1R b KQ b3 0 6",
    eco: "D94",
    openingName: "Gruenfeld: Makogonov variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Nf3 Bg7 5. e3 O-O 6. b4"
}, {
    fen: "rnbq1rk1/ppp1ppbp/5np1/3p4/2PP4/2N1PN2/PP1B1PPP/R2QKB1R b KQ - 2 6",
    eco: "D94",
    openingName: "Gruenfeld: Opovcensky variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Nf3 Bg7 5. e3 O-O 6. Bd2"
}, {
    fen: "rnbq1rk1/ppp1ppbp/5np1/3p4/2PP4/2NBPN2/PP3PPP/R1BQK2R b KQ - 2 6",
    eco: "D94",
    openingName: "Gruenfeld with e3    Bd3",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Nf3 Bg7 5. e3 O-O 6. Bd3"
}, {
    fen: "rn1q1rk1/pp2ppbp/2p2np1/3p4/2PP2b1/2NBPN2/PP3PPP/R1BQ1RK1 w - - 2 8",
    eco: "D94",
    openingName: "Gruenfeld: Smyslov defence",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Nf3 Bg7 5. e3 O-O 6. Bd3 c6 7. O-O Bg4"
}, {
    fen: "rn1q1rk1/pp2ppbp/2p2np1/3p1b2/2PP4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 2 8",
    eco: "D94",
    openingName: "Gruenfeld: Flohr defence",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Nf3 Bg7 5. e3 O-O 6. Bd3 c6 7. O-O Bf5"
}, {
    fen: "rnbq1rk1/ppp1ppbp/5np1/3p4/2PP4/1QN1PN2/PP3PPP/R1B1KB1R b KQ - 2 6",
    eco: "D95",
    openingName: "Gruenfeld with e3 & Qb3",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Nf3 Bg7 5. e3 O-O 6. Qb3"
}, {
    fen: "rnbq1rk1/ppp2pbp/4pnp1/3p4/2PP4/1QN1PN2/PP3PPP/R1B1KB1R w KQ - 0 7",
    eco: "D95",
    openingName: "Gruenfeld: Botvinnik variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Nf3 Bg7 5. e3 O-O 6. Qb3 e6"
}, {
    fen: "r1bq1rk1/pppnppbp/5np1/6N1/2BP4/1QN1P3/PP3PPP/R1B1K2R b KQ - 2 8",
    eco: "D95",
    openingName: "Gruenfeld: Pachman variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Nf3 Bg7 5. e3 O-O 6. Qb3 dxc4 7. Bxc4 Nbd7 8. Ng5"
}, {
    fen: "rnbqk2r/ppp1ppbp/5np1/3p4/2PP4/1QN2N2/PP2PPPP/R1B1KB1R b KQkq - 3 5",
    eco: "D96",
    openingName: "Gruenfeld: Russian variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Nf3 Bg7 5. Qb3"
}, {
    fen: "rnbq1rk1/ppp1ppbp/5np1/8/2QPP3/2N2N2/PP3PPP/R1B1KB1R b KQ e3 0 7",
    eco: "D97",
    openingName: "Gruenfeld: Russian variation with e4",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Nf3 Bg7 5. Qb3 dxc4 6. Qxc4 O-O 7. e4"
}, {
    fen: "rnbq1rk1/1pp1ppbp/p4np1/8/2QPP3/2N2N2/PP3PPP/R1B1KB1R w KQ - 0 8",
    eco: "D97",
    openingName: "Gruenfeld: Russian, Alekhine (Hungarian) variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Nf3 Bg7 5. Qb3 dxc4 6. Qxc4 O-O 7. e4 a6"
}, {
    fen: "rnbq1rk1/pp2ppbp/2p2np1/8/2QPP3/2N2N2/PP3PPP/R1B1KB1R w KQ - 0 8",
    eco: "D97",
    openingName: "Gruenfeld: Russian, Szabo (Boleslavsky) variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Nf3 Bg7 5. Qb3 dxc4 6. Qxc4 O-O 7. e4 c6"
}, {
    fen: "rnbq1rk1/p1p1ppbp/1p3np1/8/2QPP3/2N2N2/PP3PPP/R1B1KB1R w KQ - 0 8",
    eco: "D97",
    openingName: "Gruenfeld: Russian, Levenfish variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Nf3 Bg7 5. Qb3 dxc4 6. Qxc4 O-O 7. e4 b6"
}, {
    fen: "r1bq1rk1/ppp1ppbp/2n2np1/8/2QPP3/2N2N2/PP3PPP/R1B1KB1R w KQ - 1 8",
    eco: "D97",
    openingName: "Gruenfeld: Russian, Byrne (Simagin) variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Nf3 Bg7 5. Qb3 dxc4 6. Qxc4 O-O 7. e4 Nc6"
}, {
    fen: "r1bq1rk1/ppp1ppbp/n4np1/8/2QPP3/2N2N2/PP3PPP/R1B1KB1R w KQ - 1 8",
    eco: "D97",
    openingName: "Gruenfeld: Russian, Prins variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Nf3 Bg7 5. Qb3 dxc4 6. Qxc4 O-O 7. e4 Na6"
}, {
    fen: "rn1q1rk1/ppp1ppbp/5np1/8/2QPP1b1/2N2N2/PP3PPP/R1B1KB1R w KQ - 1 8",
    eco: "D98",
    openingName: "Gruenfeld: Russian, Smyslov variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Nf3 Bg7 5. Qb3 dxc4 6. Qxc4 O-O 7. e4 Bg4"
}, {
    fen: "r2q1rk1/ppp1ppbp/1nn3p1/8/3PP1b1/2NQBN2/PP2BPPP/2KR3R b - - 8 11",
    eco: "D98",
    openingName: "Gruenfeld: Russian, Keres variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Nf3 Bg7 5. Qb3 dxc4 6. Qxc4 O-O 7. e4 Bg4 8. Be3 Nfd7 9. Be2 Nb6 10. Qd3 Nc6 11. O-O-O"
}, {
    fen: "rn1q1rk1/pppnppbp/6p1/8/3PP1b1/1QN1BN2/PP3PPP/R3KB1R b KQ - 4 9",
    eco: "D99",
    openingName: "Gruenfeld defence: Smyslov, main line",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Nf3 Bg7 5. Qb3 dxc4 6. Qxc4 O-O 7. e4 Bg4 8. Be3 Nfd7 9. Qb3"
}, {
    fen: "rn1q1rk1/pp1nppbp/6p1/2p5/3PP1b1/1QN1BN2/PP3PPP/R3KB1R w KQ c6 0 10",
    eco: "D99",
    openingName: "Gruenfeld defence: Smyslov, Yugoslav variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 d5 4. Nf3 Bg7 5. Qb3 dxc4 6. Qxc4 O-O 7. e4 Bg4 8. Be3 Nfd7 9. Qb3 c5"
}, {
    fen: "rnbqkb1r/pppp1ppp/4pn2/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3",
    eco: "E00",
    openingName: "Queen's pawn game",
    moves: "1. d4 Nf6 2. c4 e6"
}, {
    fen: "rnbqkb1r/pppp1ppp/4pn2/6B1/2PP4/8/PP2PPPP/RN1QKBNR b KQkq - 1 3",
    eco: "E00",
    openingName: "Neo-Indian (Seirawan) attack",
    moves: "1. d4 Nf6 2. c4 e6 3. Bg5"
}, {
    fen: "rnbqkb1r/pppp1ppp/4pn2/8/2PP4/6P1/PP2PP1P/RNBQKBNR b KQkq - 0 3",
    eco: "E00",
    openingName: "Catalan opening",
    moves: "1. d4 Nf6 2. c4 e6 3. g3"
}, {
    fen: "rnbqkb1r/ppp2ppp/4pn2/3p4/2PP4/6P1/PP2PPBP/RNBQK1NR b KQkq - 1 4",
    eco: "E01",
    openingName: "Catalan: closed",
    moves: "1. d4 Nf6 2. c4 e6 3. g3 d5 4. Bg2"
}, {
    fen: "rnbqkb1r/ppp2ppp/4pn2/8/Q1pP4/6P1/PP2PPBP/RNB1K1NR b KQkq - 1 5",
    eco: "E02",
    openingName: "Catalan: open, 5.Qa4",
    moves: "1. d4 Nf6 2. c4 e6 3. g3 d5 4. Bg2 dxc4 5. Qa4+"
}, {
    fen: "r1bqkb1r/1ppn1ppp/p3pn2/8/3P4/6P1/PPQ1PPBP/RNB1K1NR b KQkq - 1 7",
    eco: "E03",
    openingName: "Catalan: open, Alekhine variation",
    moves: "1. d4 Nf6 2. c4 e6 3. g3 d5 4. Bg2 dxc4 5. Qa4+ Nbd7 6. Qxc4 a6 7. Qc2"
}, {
    fen: "r1bqkb1r/pppn1ppp/4pn2/8/2QP4/6P1/PP2PPBP/RNB1K1NR b KQkq - 0 6",
    eco: "E03",
    openingName: "Catalan: open, 5.Qa4 Nbd7, 6.Qxc4",
    moves: "1. d4 Nf6 2. c4 e6 3. g3 d5 4. Bg2 dxc4 5. Qa4+ Nbd7 6. Qxc4"
}, {
    fen: "rnbqkb1r/ppp2ppp/4pn2/8/2pP4/5NP1/PP2PPBP/RNBQK2R b KQkq - 1 5",
    eco: "E04",
    openingName: "Catalan: open, 5.Nf3",
    moves: "1. d4 Nf6 2. c4 e6 3. g3 d5 4. Bg2 dxc4 5. Nf3"
}, {
    fen: "rnbqk2r/ppp1bppp/4pn2/8/2pP4/5NP1/PP2PPBP/RNBQK2R w KQkq - 2 6",
    eco: "E05",
    openingName: "Catalan: open, classical line",
    moves: "1. d4 Nf6 2. c4 e6 3. g3 d5 4. Bg2 dxc4 5. Nf3 Be7"
}, {
    fen: "rnbqk2r/ppp1bppp/4pn2/3p4/2PP4/5NP1/PP2PPBP/RNBQK2R b KQkq - 3 5",
    eco: "E06",
    openingName: "Catalan: closed, 5.Nf3",
    moves: "1. d4 Nf6 2. c4 e6 3. g3 d5 4. Bg2 Be7 5. Nf3"
}, {
    fen: "r1bq1rk1/pppnbppp/4pn2/3p4/2PP4/5NP1/PP2PPBP/RNBQ1RK1 w - - 6 7",
    eco: "E07",
    openingName: "Catalan: closed, 6...Nbd7",
    moves: "1. d4 Nf6 2. c4 e6 3. g3 d5 4. Bg2 Be7 5. Nf3 O-O 6. O-O Nbd7"
}, {
    fen: "r1bq1rk1/pp1nbppp/2p1pn2/3p4/2PP4/2NQ1NP1/PP2PPBP/R1B2RK1 b - - 1 8",
    eco: "E07",
    openingName: "Catalan: closed, Botvinnik variation",
    moves: "1. d4 Nf6 2. c4 e6 3. g3 d5 4. Bg2 Be7 5. Nf3 O-O 6. O-O Nbd7 7. Nc3 c6 8. Qd3"
}, {
    fen: "r1bq1rk1/pppnbppp/4pn2/3p4/2PP4/5NP1/PPQ1PPBP/RNB2RK1 b - - 7 7",
    eco: "E08",
    openingName: "Catalan: closed, 7.Qc2",
    moves: "1. d4 Nf6 2. c4 e6 3. g3 d5 4. Bg2 Be7 5. Nf3 O-O 6. O-O Nbd7 7. Qc2"
}, {
    fen: "r1bq1rk1/p2nbppp/1pp1pn2/3p4/P1PP4/5NP1/1PQ1PPBP/RNBR2K1 b - a3 0 9",
    eco: "E08",
    openingName: "Catalan: closed, Zagoryansky variation",
    moves: "1. d4 Nf6 2. c4 e6 3. g3 d5 4. Bg2 Be7 5. Nf3 O-O 6. O-O Nbd7 7. Qc2 c6 8. Rd1 b6 9. a4"
}, {
    fen: "r1bq1rk1/pp1nbppp/2p1pn2/3p4/2PP4/1P3NP1/P1Q1PPBP/RNB2RK1 b - - 0 8",
    eco: "E08",
    openingName: "Catalan: closed, Qc2 & b3",
    moves: "1. d4 Nf6 2. c4 e6 3. g3 d5 4. Bg2 Be7 5. Nf3 O-O 6. O-O Nbd7 7. Qc2 c6 8. b3"
}, {
    fen: "r2q1rk1/pb1nbppp/2p1pn2/1p1p4/2PP4/1PN2NP1/P1Q1PPBP/R1BR2K1 w - - 0 11",
    eco: "E08",
    openingName: "Catalan: closed, Spassky gambit",
    moves: "1. d4 Nf6 2. c4 e6 3. g3 d5 4. Bg2 Be7 5. Nf3 O-O 6. O-O Nbd7 7. Qc2 c6 8. b3 b6 9. Rd1 Bb7 10. Nc3 b5"
}, {
    fen: "r1bq1rk1/pp1nbppp/2p1pn2/3p4/2PP4/5NP1/PPQNPPBP/R1B2RK1 b - - 1 8",
    eco: "E09",
    openingName: "Catalan: closed, main line",
    moves: "1. d4 Nf6 2. c4 e6 3. g3 d5 4. Bg2 Be7 5. Nf3 O-O 6. O-O Nbd7 7. Qc2 c6 8. Nbd2"
}, {
    fen: "r2q1rk1/3nbppp/bpp1pn2/p2p4/2PP4/1P3NP1/PBQNPPBP/R4RK1 w - - 2 11",
    eco: "E09",
    openingName: "Catalan: closed, Sokolsky variation",
    moves: "1. d4 Nf6 2. c4 e6 3. g3 d5 4. Bg2 Be7 5. Nf3 O-O 6. O-O Nbd7 7. Qc2 c6 8. Nbd2 b6 9. b3 a5 10. Bb2 Ba6"
}, {
    fen: "rnbqkb1r/pppp1ppp/4pn2/8/2PP4/5N2/PP2PPPP/RNBQKB1R b KQkq - 1 3",
    eco: "E10",
    openingName: "Queen's pawn game",
    moves: "1. d4 Nf6 2. c4 e6 3. Nf3"
}, {
    fen: "rnbqkb1r/p2p1ppp/4pn2/1ppP4/2P5/5N2/PP2PPPP/RNBQKB1R w KQkq b6 0 5",
    eco: "E10",
    openingName: "Blumenfeld counter-gambit",
    moves: "1. d4 Nf6 2. c4 e6 3. Nf3 c5 4. d5 b5"
}, {
    fen: "rnbqkb1r/p5pp/4pn2/1Ppp4/8/5N2/PP2PPPP/RNBQKB1R w KQkq d6 0 7",
    eco: "E10",
    openingName: "Blumenfeld counter-gambit accepted",
    moves: "1. d4 Nf6 2. c4 e6 3. Nf3 c5 4. d5 b5 5. dxe6 fxe6 6. cxb5 d5"
}, {
    fen: "rnbqkb1r/p2p1ppp/4pn2/1ppP2B1/2P5/5N2/PP2PPPP/RN1QKB1R b KQkq - 1 5",
    eco: "E10",
    openingName: "Blumenfeld counter-gambit, Dus-Chotimursky variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nf3 c5 4. d5 b5 5. Bg5"
}, {
    fen: "rnbqkb1r/p2p1pp1/5n1p/1ppP2B1/8/5N2/PP2PPPP/RN1QKB1R w KQkq - 0 7",
    eco: "E10",
    openingName: "Blumenfeld counter-gambit, Spielmann variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nf3 c5 4. d5 b5 5. Bg5 exd5 6. cxd5 h6"
}, {
    fen: "rnbqkb1r/1ppp1ppp/p3pn2/8/2PP4/5N2/PP2PPPP/RNBQKB1R w KQkq - 0 4",
    eco: "E10",
    openingName: "Dzindzikhashvili defence",
    moves: "1. d4 Nf6 2. c4 e6 3. Nf3 a6"
}, {
    fen: "rnbqkb1r/pppp1ppp/4p3/8/2PPn3/5N2/PP2PPPP/RNBQKB1R w KQkq - 2 4",
    eco: "E10",
    openingName: "Doery defence",
    moves: "1. d4 Nf6 2. c4 e6 3. Nf3 Ne4"
}, {
    fen: "rnbqk2r/pppp1ppp/4pn2/8/1bPP4/5N2/PP2PPPP/RNBQKB1R w KQkq - 2 4",
    eco: "E11",
    openingName: "Bogo-Indian defence",
    moves: "1. d4 Nf6 2. c4 e6 3. Nf3 Bb4+"
}, {
    fen: "rnbqk2r/pppp1ppp/4pn2/8/1bPP4/5N2/PP1NPPPP/R1BQKB1R b KQkq - 3 4",
    eco: "E11",
    openingName: "Bogo-Indian defence, Gruenfeld variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nf3 Bb4+ 4. Nbd2"
}, {
    fen: "rnb1k2r/ppppqppp/4pn2/8/1bPP4/5N2/PP1BPPPP/RN1QKB1R w KQkq - 4 5",
    eco: "E11",
    openingName: "Bogo-Indian defence, Nimzovich variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nf3 Bb4+ 4. Bd2 Qe7"
}, {
    fen: "rn1q1rk1/pbpp1ppp/1p2p3/6N1/2PP4/2n3P1/PPQ1PPBP/R3K2R b KQ - 1 10",
    eco: "E11",
    openingName: "Bogo-Indian defence, Monticelli trap",
    moves: "1. d4 Nf6 2. c4 e6 3. Nf3 Bb4+ 4. Bd2 Bxd2+ 5. Qxd2 b6 6. g3 Bb7 7. Bg2 O-O 8. Nc3 Ne4 9. Qc2 Nxc3 10. Ng5"
}, {
    fen: "rnbqkb1r/p1pp1ppp/1p2pn2/8/2PP4/5N2/PP2PPPP/RNBQKB1R w KQkq - 0 4",
    eco: "E12",
    openingName: "Queen's Indian defence",
    moves: "1. d4 Nf6 2. c4 e6 3. Nf3 b6"
}, {
    fen: "rnbqkb1r/p1pp1ppp/1p2pn2/8/2PP1B2/5N2/PP2PPPP/RN1QKB1R b KQkq - 1 4",
    eco: "E12",
    openingName: "Queen's Indian: Miles variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. Bf4"
}, {
    fen: "rnbqkb1r/p1pp1ppp/1p2pn2/8/2PP4/P4N2/1P2PPPP/RNBQKB1R b KQkq - 0 4",
    eco: "E12",
    openingName: "Queen's Indian: Petrosian system",
    moves: "1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. a3"
}, {
    fen: "rnbqkb1r/p1pp1ppp/1p2pn2/8/2PP4/2N2N2/PP2PPPP/R1BQKB1R b KQkq - 1 4",
    eco: "E12",
    openingName: "Queen's Indian: 4.Nc3",
    moves: "1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. Nc3"
}, {
    fen: "rn1qkb1r/pbpp1p2/1p2p2p/6pn/2PP4/2N2NB1/PP2PPPP/R2QKB1R w KQkq - 2 8",
    eco: "E12",
    openingName: "Queen's Indian: 4.Nc3, Botvinnik variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. Nc3 Bb7 5. Bg5 h6 6. Bh4 g5 7. Bg3 Nh5"
}, {
    fen: "rn1qk2r/pbpp1pp1/1p2pn1p/8/1bPP3B/2N2N2/PP2PPPP/R2QKB1R w KQkq - 2 7",
    eco: "E13",
    openingName: "Queen's Indian: 4.Nc3, main line",
    moves: "1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. Nc3 Bb7 5. Bg5 h6 6. Bh4 Bb4"
}, {
    fen: "rnbqkb1r/p1pp1ppp/1p2pn2/8/2PP4/4PN2/PP3PPP/RNBQKB1R b KQkq - 0 4",
    eco: "E14",
    openingName: "Queen's Indian: 4.e3",
    moves: "1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. e3"
}, {
    fen: "rn1q1rk1/pb1pbppp/1p2pn2/8/2PN4/1P1BP3/PB3PPP/RN1Q1RK1 b - - 0 9",
    eco: "E14",
    openingName: "Queen's Indian: Averbakh variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. e3 Bb7 5. Bd3 c5 6. O-O Be7 7. b3 O-O 8. Bb2 cxd4 9. Nxd4"
}, {
    fen: "rnbqkb1r/p1pp1ppp/1p2pn2/8/2PP4/5NP1/PP2PP1P/RNBQKB1R b KQkq - 0 4",
    eco: "E15",
    openingName: "Queen's Indian: 4.g3",
    moves: "1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. g3"
}, {
    fen: "rn1qkb1r/p1pp1ppp/bp2pn2/8/2PP4/5NP1/PP2PP1P/RNBQKB1R w KQkq - 1 5",
    eco: "E15",
    openingName: "Queen's Indian: Nimzovich variation (exaggerated fianchetto)",
    moves: "1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. g3 Ba6"
}, {
    fen: "rn1qkb1r/pbpp1ppp/1p2pn2/8/2PP4/5NP1/PP2PP1P/RNBQKB1R w KQkq - 1 5",
    eco: "E15",
    openingName: "Queen's Indian: 4.g3 Bb7",
    moves: "1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. g3 Bb7"
}, {
    fen: "rn1qkb1r/pb1p1ppp/1p3n2/2pp4/2P4N/6P1/PP2PPBP/RNBQK2R b KQkq - 1 7",
    eco: "E15",
    openingName: "Queen's Indian: Rubinstein variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. g3 Bb7 5. Bg2 c5 6. d5 exd5 7. Nh4"
}, {
    fen: "rn1qkb1r/pb1p1ppp/1p3n2/2pp2N1/2P5/6P1/PP2PPBP/RNBQK2R b KQkq - 1 7",
    eco: "E15",
    openingName: "Queen's Indian: Buerger variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. g3 Bb7 5. Bg2 c5 6. d5 exd5 7. Ng5"
}, {
    fen: "rn1qk2r/pbpp1ppp/1p2pn2/8/1bPP4/5NP1/PP2PPBP/RNBQK2R w KQkq - 3 6",
    eco: "E16",
    openingName: "Queen's Indian: Capablanca variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. g3 Bb7 5. Bg2 Bb4+"
}, {
    fen: "rn1qk2r/1bpp1ppp/1p2pn2/p7/1bPP4/5NP1/PP1BPPBP/RN1QK2R w KQkq a6 0 7",
    eco: "E16",
    openingName: "Queen's Indian: Yates variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. g3 Bb7 5. Bg2 Bb4+ 6. Bd2 a5"
}, {
    fen: "rn1qk2r/pbppbppp/1p2pn2/8/2PP4/5NP1/PP1BPPBP/RN1QK2R w KQkq - 5 7",
    eco: "E16",
    openingName: "Queen's Indian: Riumin variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. g3 Bb7 5. Bg2 Bb4+ 6. Bd2 Be7"
}, {
    fen: "rn1qk2r/pbppbppp/1p2pn2/8/2PP4/5NP1/PP2PPBP/RNBQK2R w KQkq - 3 6",
    eco: "E17",
    openingName: "Queen's Indian: 5.Bg2 Be7",
    moves: "1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. g3 Bb7 5. Bg2 Be7"
}, {
    fen: "rn1qk2r/pbppbppp/1p2pn2/8/2PP4/2N2NP1/PP2PPBP/R1BQK2R b KQkq - 4 6",
    eco: "E17",
    openingName: "Queen's Indian: anti-Queen's Indian system",
    moves: "1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. g3 Bb7 5. Bg2 Be7 6. Nc3"
}, {
    fen: "rn1qk2r/pbppbppp/1p2p3/8/2PPn3/2N2NP1/PP1BPPBP/R2QK2R b KQkq - 6 7",
    eco: "E17",
    openingName: "Queen's Indian: Opovcensky variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. g3 Bb7 5. Bg2 Be7 6. Nc3 Ne4 7. Bd2"
}, {
    fen: "rn1qk2r/pbppbppp/1p2pn2/8/2PP4/5NP1/PP2PPBP/RNBQ1RK1 b kq - 4 6",
    eco: "E17",
    openingName: "Queen's Indian: old main line, 6.O-O",
    moves: "1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. g3 Bb7 5. Bg2 Be7 6. O-O"
}, {
    fen: "rn1q1rk1/pbppbppp/1p2pn2/8/2PP4/1P3NP1/P3PPBP/RNBQ1RK1 b - - 0 7",
    eco: "E17",
    openingName: "Queen's Indian: Euwe variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. g3 Bb7 5. Bg2 Be7 6. O-O O-O 7. b3"
}, {
    fen: "rn1q1rk1/pbppbppp/1p2pn2/8/2PP4/2N2NP1/PP2PPBP/R1BQ1RK1 b - - 6 7",
    eco: "E18",
    openingName: "Queen's Indian: old main line, 7.Nc3",
    moves: "1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. g3 Bb7 5. Bg2 Be7 6. O-O O-O 7. Nc3"
}, {
    fen: "rn1q1rk1/pbppbppp/1p2p3/8/2PP4/2Q2NP1/PP2PPBP/R1B2RK1 b - - 0 9",
    eco: "E19",
    openingName: "Queen's Indian: old main line, 9.Qxc3",
    moves: "1. d4 Nf6 2. c4 e6 3. Nf3 b6 4. g3 Bb7 5. Bg2 Be7 6. O-O O-O 7. Nc3 Ne4 8. Qc2 Nxc3 9. Qxc3"
}, {
    fen: "rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N5/PP2PPPP/R1BQKBNR w KQkq - 2 4",
    eco: "E20",
    openingName: "Nimzo-Indian defence",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4"
}, {
    fen: "rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N2P2/PP2P1PP/R1BQKBNR b KQkq - 0 4",
    eco: "E20",
    openingName: "Nimzo-Indian: Kmoch variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. f3"
}, {
    fen: "rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2NQ4/PP2PPPP/R1B1KBNR b KQkq - 3 4",
    eco: "E20",
    openingName: "Nimzo-Indian: Mikenas attack",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Qd3"
}, {
    fen: "rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N3P1/PP2PP1P/R1BQKBNR b KQkq - 0 4",
    eco: "E20",
    openingName: "Nimzo-Indian: Romanishin-Kasparov (Steiner) system",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. g3"
}, {
    fen: "rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N2N2/PP2PPPP/R1BQKB1R b KQkq - 3 4",
    eco: "E21",
    openingName: "Nimzo-Indian: three knights variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Nf3"
}, {
    fen: "rnbqk2r/pp1p1ppp/4pn2/2pP4/1bP5/2N2N2/PP2PPPP/R1BQKB1R b KQkq - 0 5",
    eco: "E21",
    openingName: "Nimzo-Indian: three knights, Korchnoi variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Nf3 c5 5. d5"
}, {
    fen: "rnbqk2r/pp1p1ppp/4p3/2pP4/1bP1n3/2N2N2/PP2PPPP/R1BQKB1R w KQkq - 1 6",
    eco: "E21",
    openingName: "Nimzo-Indian: three knights, Euwe variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Nf3 c5 5. d5 Ne4"
}, {
    fen: "rnbqk2r/pppp1ppp/4pn2/8/1bPP4/1QN5/PP2PPPP/R1B1KBNR b KQkq - 3 4",
    eco: "E22",
    openingName: "Nimzo-Indian: Spielmann variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Qb3"
}, {
    fen: "r1bqk2r/pp1p1ppp/2n1pn2/2P5/1bP5/1QN5/PP2PPPP/R1B1KBNR w KQkq - 1 6",
    eco: "E23",
    openingName: "Nimzo-Indian: Spielmann, 4...c5, 5.dc Nc6",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Qb3 c5 5. dxc5 Nc6"
}, {
    fen: "r1bqk2r/pp1p1ppp/2n1p3/2P5/1bP5/1QN2N2/PP1nPPPP/R3KB1R w KQkq - 0 8",
    eco: "E23",
    openingName: "Nimzo-Indian: Spielmann, Karlsbad variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Qb3 c5 5. dxc5 Nc6 6. Nf3 Ne4 7. Bd2 Nxd2"
}, {
    fen: "r1bqk2r/pp1p1ppp/2n1p3/2n5/1bP5/1QN2N2/PP1BPPPP/R3KB1R w KQkq - 0 8",
    eco: "E23",
    openingName: "Nimzo-Indian: Spielmann, San Remo variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Qb3 c5 5. dxc5 Nc6 6. Nf3 Ne4 7. Bd2 Nxc5"
}, {
    fen: "r1bqk2r/pp1p2pp/2n1p3/2n2p2/1bP5/2N2NP1/PPQBPP1P/R3KB1R b KQkq - 0 9",
    eco: "E23",
    openingName: "Nimzo-Indian: Spielmann, Staahlberg variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Qb3 c5 5. dxc5 Nc6 6. Nf3 Ne4 7. Bd2 Nxc5 8. Qc2 f5 9. g3"
}, {
    fen: "rnbqk2r/pppp1ppp/4pn2/8/2PP4/P1P5/4PPPP/R1BQKBNR b KQkq - 0 5",
    eco: "E24",
    openingName: "Nimzo-Indian: Saemisch variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. a3 Bxc3+ 5. bxc3"
}, {
    fen: "rnbq1rk1/pp3ppp/4p3/2pn4/3P4/P1P1PP2/6PP/R1BQKBNR w KQ - 0 9",
    eco: "E24",
    openingName: "Nimzo-Indian: Saemisch, Botvinnik variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. a3 Bxc3+ 5. bxc3 c5 6. f3 d5 7. e3 O-O 8. cxd5 Nxd5"
}, {
    fen: "rnbqk2r/pp3ppp/4pn2/2pP4/3P4/P1P2P2/4P1PP/R1BQKBNR b KQkq - 0 7",
    eco: "E25",
    openingName: "Nimzo-Indian: Saemisch variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. a3 Bxc3+ 5. bxc3 c5 6. f3 d5 7. cxd5"
}, {
    fen: "rnbqk2r/pp3ppp/4p3/2Pn4/8/P1P2P2/4P1PP/R1BQKBNR b KQkq - 0 8",
    eco: "E25",
    openingName: "Nimzo-Indian: Saemisch, Keres variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. a3 Bxc3+ 5. bxc3 c5 6. f3 d5 7. cxd5 Nxd5 8. dxc5"
}, {
    fen: "rnbqk2r/pp4pp/4p3/2Pn1p2/8/P1P2P2/4P1PP/R1BQKBNR w KQkq f6 0 9",
    eco: "E25",
    openingName: "Nimzo-Indian: Saemisch, Romanovsky variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. a3 Bxc3+ 5. bxc3 c5 6. f3 d5 7. cxd5 Nxd5 8. dxc5 f5"
}, {
    fen: "rnbqk2r/pp1p1ppp/4pn2/2p5/2PP4/P1P1P3/5PPP/R1BQKBNR b KQkq - 0 6",
    eco: "E26",
    openingName: "Nimzo-Indian: Saemisch variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. a3 Bxc3+ 5. bxc3 c5 6. e3"
}, {
    fen: "rnbqk2r/p2p1ppp/1p2pn2/2p5/2PP4/P1P1P3/5PPP/R1BQKBNR w KQkq - 0 7",
    eco: "E26",
    openingName: "Nimzo-Indian: Saemisch, O'Kelly variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. a3 Bxc3+ 5. bxc3 c5 6. e3 b6"
}, {
    fen: "rnbq1rk1/pppp1ppp/4pn2/8/2PP4/P1P5/4PPPP/R1BQKBNR w KQ - 1 6",
    eco: "E27",
    openingName: "Nimzo-Indian: Saemisch variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. a3 Bxc3+ 5. bxc3 O-O"
}, {
    fen: "rnbq1rk1/pppp1ppp/4pn2/8/2PP4/P1P1P3/5PPP/R1BQKBNR b KQ - 0 6",
    eco: "E28",
    openingName: "Nimzo-Indian: Saemisch variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. a3 Bxc3+ 5. bxc3 O-O 6. e3"
}, {
    fen: "r1bq1rk1/pp1p1ppp/2n1pn2/2p5/2PP4/P1PBP3/5PPP/R1BQK1NR w KQ - 2 8",
    eco: "E29",
    openingName: "Nimzo-Indian: Saemisch, main line",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. a3 Bxc3+ 5. bxc3 O-O 6. e3 c5 7. Bd3 Nc6"
}, {
    fen: "r1bqnrk1/p2p1ppp/1pn1p3/2p5/2PPP3/P1PB4/4NPPP/R1BQK2R w KQ - 1 10",
    eco: "E29",
    openingName: "Nimzo-Indian: Saemisch, Capablanca variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. a3 Bxc3+ 5. bxc3 O-O 6. e3 c5 7. Bd3 Nc6 8. Ne2 b6 9. e4 Ne8"
}, {
    fen: "rnbqk2r/pppp1ppp/4pn2/6B1/1bPP4/2N5/PP2PPPP/R2QKBNR b KQkq - 3 4",
    eco: "E30",
    openingName: "Nimzo-Indian: Leningrad variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Bg5"
}, {
    fen: "rnbqk2r/p2p1pp1/4pn1p/1ppP4/1bP4B/2N5/PP2PPPP/R2QKBNR w KQkq b6 0 7",
    eco: "E30",
    openingName: "Nimzo-Indian: Leningrad, ...b5 gambit",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Bg5 h6 5. Bh4 c5 6. d5 b5"
}, {
    fen: "rnbqk2r/pp3pp1/3ppn1p/2pP4/1bP4B/2N5/PP2PPPP/R2QKBNR w KQkq - 0 7",
    eco: "E31",
    openingName: "Nimzo-Indian: Leningrad, main line",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Bg5 h6 5. Bh4 c5 6. d5 d6"
}, {
    fen: "rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N5/PPQ1PPPP/R1B1KBNR b KQkq - 3 4",
    eco: "E32",
    openingName: "Nimzo-Indian: classical variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Qc2"
}, {
    fen: "rnbq1rk1/p1pp1ppp/4pn2/1p6/2PP4/P1Q5/1P2PPPP/R1B1KBNR w KQ b6 0 7",
    eco: "E32",
    openingName: "Nimzo-Indian: classical, Adorjan gambit",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Qc2 O-O 5. a3 Bxc3+ 6. Qxc3 b5"
}, {
    fen: "r1bqk2r/pppp1ppp/2n1pn2/8/1bPP4/2N5/PPQ1PPPP/R1B1KBNR w KQkq - 4 5",
    eco: "E33",
    openingName: "Nimzo-Indian: classical, 4...Nc6",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Qc2 Nc6"
}, {
    fen: "r1bqk2r/ppp2ppp/2nppn2/8/1bPP4/2N2N2/PPQ1PPPP/R1B1KB1R w KQkq - 0 6",
    eco: "E33",
    openingName: "Nimzo-Indian: classical, Milner-Barry (Zurich) variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Qc2 Nc6 5. Nf3 d6"
}, {
    fen: "rnbqk2r/ppp2ppp/4pn2/3p4/1bPP4/2N5/PPQ1PPPP/R1B1KBNR w KQkq d6 0 5",
    eco: "E34",
    openingName: "Nimzo-Indian: classical, Noa variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Qc2 d5"
}, {
    fen: "rnbqk2r/ppp2ppp/5n2/3p4/1b1P4/2N5/PPQ1PPPP/R1B1KBNR w KQkq - 0 6",
    eco: "E35",
    openingName: "Nimzo-Indian: classical, Noa variation, 5.cd ed",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Qc2 d5 5. cxd5 exd5"
}, {
    fen: "rnbqk2r/ppp2ppp/4pn2/3p4/1bPP4/P1N5/1PQ1PPPP/R1B1KBNR b KQkq - 0 5",
    eco: "E36",
    openingName: "Nimzo-Indian: classical, Noa variation, 5.a3",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Qc2 d5 5. a3"
}, {
    fen: "r1bqk2r/ppp2ppp/2n1pn2/3p4/2PP4/P1Q5/1P2PPPP/R1B1KBNR w KQkq - 1 7",
    eco: "E36",
    openingName: "Nimzo-Indian: classical, Botvinnik variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Qc2 d5 5. a3 Bxc3+ 6. Qxc3 Nc6"
}, {
    fen: "rnbqk2r/ppp2ppp/4p3/3p4/2PPn3/P1Q5/1P2PPPP/R1B1KBNR w KQkq - 1 7",
    eco: "E36",
    openingName: "Nimzo-Indian: classical, Noa variation, main line",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Qc2 d5 5. a3 Bxc3+ 6. Qxc3 Ne4"
}, {
    fen: "rnbqk2r/ppp2ppp/4p3/3p4/2PPn3/P7/1PQ1PPPP/R1B1KBNR b KQkq - 2 7",
    eco: "E37",
    openingName: "Nimzo-Indian: classical, Noa variation, main line, 7.Qc2",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Qc2 d5 5. a3 Bxc3+ 6. Qxc3 Ne4 7. Qc2"
}, {
    fen: "r1bqk2r/ppp2ppp/2n5/3pp3/2PPn3/P3P3/1PQ2PPP/R1B1KBNR w KQkq - 0 9",
    eco: "E37",
    openingName: "Nimzo-Indian: classical, San Remo variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Qc2 d5 5. a3 Bxc3+ 6. Qxc3 Ne4 7. Qc2 Nc6 8. e3 e5"
}, {
    fen: "rnbqk2r/pp1p1ppp/4pn2/2p5/1bPP4/2N5/PPQ1PPPP/R1B1KBNR w KQkq c6 0 5",
    eco: "E38",
    openingName: "Nimzo-Indian: classical, 4...c5",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Qc2 c5"
}, {
    fen: "rnbq1rk1/pp1p1ppp/4pn2/2P5/1bP5/2N5/PPQ1PPPP/R1B1KBNR w KQ - 1 6",
    eco: "E39",
    openingName: "Nimzo-Indian: classical, Pirc variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. Qc2 c5 5. dxc5 O-O"
}, {
    fen: "rnbqk2r/pppp1ppp/4pn2/8/1bPP4/2N1P3/PP3PPP/R1BQKBNR b KQkq - 0 4",
    eco: "E40",
    openingName: "Nimzo-Indian: 4.e3",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3"
}, {
    fen: "r1bqk2r/pppp1ppp/2n1pn2/8/1bPP4/2N1P3/PP3PPP/R1BQKBNR w KQkq - 1 5",
    eco: "E40",
    openingName: "Nimzo-Indian: 4.e3, Taimanov variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 Nc6"
}, {
    fen: "rnbqk2r/pp1p1ppp/4pn2/2p5/1bPP4/2N1P3/PP3PPP/R1BQKBNR w KQkq c6 0 5",
    eco: "E41",
    openingName: "Nimzo-Indian: 4.e3 c5",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 c5"
}, {
    fen: "r1bqk2r/pp3ppp/2nppn2/2p5/2PP4/2PBPN2/P4PPP/R1BQK2R w KQkq - 0 8",
    eco: "E41",
    openingName: "Nimzo-Indian: e3, Huebner variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 c5 5. Bd3 Nc6 6. Nf3 Bxc3+ 7. bxc3 d6"
}, {
    fen: "rnbqk2r/pp1p1ppp/4pn2/2p5/1bPP4/2N1P3/PP2NPPP/R1BQKB1R b KQkq - 1 5",
    eco: "E42",
    openingName: "Nimzo-Indian: 4.e3 c5, 5.Ne2 (Rubinstein)",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 c5 5. Ne2"
}, {
    fen: "rnbqk2r/p1pp1ppp/1p2pn2/8/1bPP4/2N1P3/PP3PPP/R1BQKBNR w KQkq - 0 5",
    eco: "E43",
    openingName: "Nimzo-Indian: Fischer variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 b6"
}, {
    fen: "rnbqk2r/p1pp1ppp/1p2pn2/8/1bPP4/2N1P3/PP2NPPP/R1BQKB1R b KQkq - 1 5",
    eco: "E44",
    openingName: "Nimzo-Indian: Fischer variation, 5.Ne2",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 b6 5. Ne2"
}, {
    fen: "rn1qk2r/p1pp1ppp/bp2pn2/8/1bPP4/2N1P3/PP2NPPP/R1BQKB1R w KQkq - 2 6",
    eco: "E45",
    openingName: "Nimzo-Indian: 4.e3, Bronstein (Byrne) variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 b6 5. Ne2 Ba6"
}, {
    fen: "rnbq1rk1/pppp1ppp/4pn2/8/1bPP4/2N1P3/PP3PPP/R1BQKBNR w KQ - 1 5",
    eco: "E46",
    openingName: "Nimzo-Indian: 4.e3 O-O",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 O-O"
}, {
    fen: "rnbq1rk1/pppp1ppp/4pn2/8/1bPP4/2N1P3/PP2NPPP/R1BQKB1R b KQ - 2 5",
    eco: "E46",
    openingName: "Nimzo-Indian: Reshevsky variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 O-O 5. Ne2"
}, {
    fen: "rnbq1rk1/ppp2ppp/3bpn2/3p4/2PP4/P1N1P3/1P2NPPP/R1BQKB1R w KQ - 1 7",
    eco: "E46",
    openingName: "Nimzo-Indian: Simagin variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 O-O 5. Ne2 d5 6. a3 Bd6"
}, {
    fen: "rnbq1rk1/pppp1ppp/4pn2/8/1bPP4/2NBP3/PP3PPP/R1BQK1NR b KQ - 2 5",
    eco: "E47",
    openingName: "Nimzo-Indian: 4.e3 O-O, 5.Bd3",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 O-O 5. Bd3"
}, {
    fen: "rnbq1rk1/ppp2ppp/4pn2/3p4/1bPP4/2NBP3/PP3PPP/R1BQK1NR w KQ d6 0 6",
    eco: "E48",
    openingName: "Nimzo-Indian: 4.e3 O-O, 5.Bd3 d5",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 O-O 5. Bd3 d5"
}, {
    fen: "rnbq1rk1/ppp2ppp/4pn2/3p4/2PP4/P1PBP3/5PPP/R1BQK1NR b KQ - 0 7",
    eco: "E49",
    openingName: "Nimzo-Indian: 4.e3, Botvinnik system",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 O-O 5. Bd3 d5 6. a3 Bxc3+ 7. bxc3"
}, {
    fen: "rnbq1rk1/pppp1ppp/4pn2/8/1bPP4/2N1PN2/PP3PPP/R1BQKB1R b KQ - 2 5",
    eco: "E50",
    openingName: "Nimzo-Indian: 4.e3 e8g8, 5.Nf3, without ...d5",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 O-O 5. Nf3"
}, {
    fen: "rnbq1rk1/ppp2ppp/4pn2/3p4/1bPP4/2N1PN2/PP3PPP/R1BQKB1R w KQ d6 0 6",
    eco: "E51",
    openingName: "Nimzo-Indian: 4.e3 e8g8, 5.Nf3 d7d5",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 O-O 5. Nf3 d5"
}, {
    fen: "r1bq1rk1/ppp2ppp/2n1pn2/8/1bpP4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 0 8",
    eco: "E51",
    openingName: "Nimzo-Indian: 4.e3, Ragozin variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 O-O 5. Nf3 d5 6. Bd3 Nc6 7. O-O dxc4"
}, {
    fen: "rnbq1rk1/p1p2ppp/1p2pn2/3p4/1bPP4/2NBPN2/PP3PPP/R1BQK2R w KQ - 0 7",
    eco: "E52",
    openingName: "Nimzo-Indian: 4.e3, main line with ...b6",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 O-O 5. Nf3 d5 6. Bd3 b6"
}, {
    fen: "rnbq1rk1/pp3ppp/4pn2/2pp4/1bPP4/2NBPN2/PP3PPP/R1BQK2R w KQ c6 0 7",
    eco: "E53",
    openingName: "Nimzo-Indian: 4.e3, main line with ...c5",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 O-O 5. Nf3 d5 6. Bd3 c5"
}, {
    fen: "rnbq1rk1/p4ppp/1p2pn2/2pp4/1bPP4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 0 8",
    eco: "E53",
    openingName: "Nimzo-Indian: 4.e3, Keres variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 O-O 5. Nf3 d5 6. Bd3 c5 7. O-O b6"
}, {
    fen: "r1bq1rk1/pp1n1ppp/4pn2/2pp4/1bPP4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 2 8",
    eco: "E53",
    openingName: "Nimzo-Indian: 4.e3, Gligoric system with 7...Nbd7",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 O-O 5. Nf3 d5 6. Bd3 c5 7. O-O Nbd7"
}, {
    fen: "rnbq1rk1/pp3ppp/4pn2/2p5/1bBP4/2N1PN2/PP3PPP/R1BQ1RK1 b - - 0 8",
    eco: "E54",
    openingName: "Nimzo-Indian: 4.e3, Gligoric system with 7...dc",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 O-O 5. Nf3 d5 6. Bd3 c5 7. O-O dxc4 8. Bxc4"
}, {
    fen: "rnb2rk1/pp2qppp/4pn2/2p5/1bBP4/2N1PN2/PP3PPP/R1BQ1RK1 w - - 1 9",
    eco: "E54",
    openingName: "Nimzo-Indian: 4.e3, Gligoric system, Smyslov variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 O-O 5. Nf3 d5 6. Bd3 c5 7. O-O dxc4 8. Bxc4 Qe7"
}, {
    fen: "r1bq1rk1/pp1n1ppp/4pn2/2p5/1bBP4/2N1PN2/PP3PPP/R1BQ1RK1 w - - 1 9",
    eco: "E55",
    openingName: "Nimzo-Indian: 4.e3, Gligoric system, Bronstein variation",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 O-O 5. Nf3 d5 6. Bd3 c5 7. O-O dxc4 8. Bxc4 Nbd7"
}, {
    fen: "r1bq1rk1/pp3ppp/2n1pn2/2pp4/1bPP4/2NBPN2/PP3PPP/R1BQ1RK1 w - - 2 8",
    eco: "E56",
    openingName: "Nimzo-Indian: 4.e3, main line with 7...Nc6",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 O-O 5. Nf3 d5 6. Bd3 c5 7. O-O Nc6"
}, {
    fen: "r1bq1rk1/pp3ppp/2n1pn2/8/1bBp4/P1N1PN2/1P3PPP/R1BQ1RK1 w - - 0 10",
    eco: "E57",
    openingName: "Nimzo-Indian: 4.e3, main line with 8...dc and 9...cd",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 O-O 5. Nf3 d5 6. Bd3 c5 7. O-O Nc6 8. a3 dxc4 9. Bxc4 cxd4"
}, {
    fen: "r1bq1rk1/pp3ppp/2n1pn2/2pp4/2PP4/P1PBPN2/5PPP/R1BQ1RK1 b - - 0 9",
    eco: "E58",
    openingName: "Nimzo-Indian: 4.e3, main line with 8...Bxc3",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 O-O 5. Nf3 d5 6. Bd3 c5 7. O-O Nc6 8. a3 Bxc3 9. bxc3"
}, {
    fen: "r1bq1rk1/pp3ppp/2n1pn2/2p5/2BP4/P1P1PN2/5PPP/R1BQ1RK1 b - - 0 10",
    eco: "E59",
    openingName: "Nimzo-Indian: 4.e3, main line",
    moves: "1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. e3 O-O 5. Nf3 d5 6. Bd3 c5 7. O-O Nc6 8. a3 Bxc3 9. bxc3 dxc4 10. Bxc4"
}, {
    fen: "rnbqkb1r/pppppp1p/5np1/8/2PP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3",
    eco: "E60",
    openingName: "King's Indian defence",
    moves: "1. d4 Nf6 2. c4 g6"
}, {
    fen: "rnbqkb1r/pppppp1p/5np1/8/2PP4/5N2/PP2PPPP/RNBQKB1R b KQkq - 1 3",
    eco: "E60",
    openingName: "King's Indian, 3.Nf3",
    moves: "1. d4 Nf6 2. c4 g6 3. Nf3"
}, {
    fen: "rnbqkb1r/pppppp1p/5np1/8/2PP4/8/PPQ1PPPP/RNB1KBNR b KQkq - 1 3",
    eco: "E60",
    openingName: "Queen's pawn: Mengarini attack",
    moves: "1. d4 Nf6 2. c4 g6 3. Qc2"
}, {
    fen: "rnbqkb1r/pppppp1p/5np1/3P4/2P5/8/PP2PPPP/RNBQKBNR b KQkq - 0 3",
    eco: "E60",
    openingName: "King's Indian: Anti-Gruenfeld",
    moves: "1. d4 Nf6 2. c4 g6 3. d5"
}, {
    fen: "rnbqkb1r/p1pppp1p/5np1/1p1P4/2P5/8/PP2PPPP/RNBQKBNR w KQkq b6 0 4",
    eco: "E60",
    openingName: "King's Indian: Danube gambit",
    moves: "1. d4 Nf6 2. c4 g6 3. d5 b5"
}, {
    fen: "rnbqkb1r/pppppp1p/5np1/8/2PP4/6P1/PP2PP1P/RNBQKBNR b KQkq - 0 3",
    eco: "E60",
    openingName: "King's Indian: 3.g3",
    moves: "1. d4 Nf6 2. c4 g6 3. g3"
}, {
    fen: "rnbqk2r/ppp1ppbp/5np1/3p4/2PP4/6P1/PP2PPBP/RNBQK1NR w KQkq d6 0 5",
    eco: "E60",
    openingName: "King's Indian: 3.g3, counterthrust variation",
    moves: "1. d4 Nf6 2. c4 g6 3. g3 Bg7 4. Bg2 d5"
}, {
    fen: "rnbqkb1r/pppppp1p/5np1/8/2PP4/2N5/PP2PPPP/R1BQKBNR b KQkq - 1 3",
    eco: "E61",
    openingName: "King's Indian defence, 3.Nc3",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3"
}, {
    fen: "rnbqk2r/ppp1ppbp/3p1np1/6B1/2PP4/2N2N2/PP2PPPP/R2QKB1R b KQkq - 1 5",
    eco: "E61",
    openingName: "King's Indian: Smyslov system",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. Nf3 d6 5. Bg5"
}, {
    fen: "rnbqk2r/ppp1ppbp/3p1np1/8/2PP4/2N2NP1/PP2PP1P/R1BQKB1R b KQkq - 0 5",
    eco: "E62",
    openingName: "King's Indian: fianchetto variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. Nf3 d6 5. g3"
}, {
    fen: "rn1q1rk1/pp2ppbp/2pp1np1/5b2/2PP4/2N2NP1/PP2PPBP/R1BQ1RK1 w - - 2 8",
    eco: "E62",
    openingName: "King's Indian: fianchetto, Larsen system",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. Nf3 d6 5. g3 O-O 6. Bg2 c6 7. O-O Bf5"
}, {
    fen: "rnb2rk1/pp2ppbp/2pp1np1/q7/2PP4/2N2NP1/PP2PPBP/R1BQ1RK1 w - - 2 8",
    eco: "E62",
    openingName: "King's Indian: fianchetto, Kavalek (Bronstein) variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. Nf3 d6 5. g3 O-O 6. Bg2 c6 7. O-O Qa5"
}, {
    fen: "r1bq1rk1/ppp1ppbp/2np1np1/8/2PP4/2N2NP1/PP2PPBP/R1BQK2R w KQ - 3 7",
    eco: "E62",
    openingName: "King's Indian: fianchetto with ...Nc6",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. Nf3 d6 5. g3 O-O 6. Bg2 Nc6"
}, {
    fen: "r1bq1rk1/ppp2pbp/2np1np1/4p3/2PP4/2N2NP1/PP2PPBP/R1BQ1RK1 w - e6 0 8",
    eco: "E62",
    openingName: "King's Indian: fianchetto, Uhlmann (Szabo) variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. Nf3 d6 5. g3 O-O 6. Bg2 Nc6 7. O-O e5"
}, {
    fen: "r2q1rk1/ppp1ppbp/2np1np1/5b2/2PP4/2N2NP1/PP2PPBP/R1BQ1RK1 w - - 5 8",
    eco: "E62",
    openingName: "King's Indian: fianchetto, lesser Simagin (Spassky) variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. Nf3 d6 5. g3 O-O 6. Bg2 Nc6 7. O-O Bf5"
}, {
    fen: "r2q1rk1/ppp1ppbp/2np1np1/8/2PP2b1/2N2NP1/PP2PPBP/R1BQ1RK1 w - - 5 8",
    eco: "E62",
    openingName: "King's Indian: fianchetto, Simagin variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. Nf3 d6 5. g3 O-O 6. Bg2 Nc6 7. O-O Bg4"
}, {
    fen: "r1bq1rk1/1pp1ppbp/p1np1np1/8/2PP4/2N2NP1/PP2PPBP/R1BQ1RK1 w - - 0 8",
    eco: "E63",
    openingName: "King's Indian: fianchetto, Panno variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. Nf3 d6 5. g3 O-O 6. Bg2 Nc6 7. O-O a6"
}, {
    fen: "rnbq1rk1/pp2ppbp/3p1np1/2p5/2PP4/2N2NP1/PP2PPBP/R1BQK2R w KQ c6 0 7",
    eco: "E64",
    openingName: "King's Indian: fianchetto, Yugoslav system",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. Nf3 d6 5. g3 O-O 6. Bg2 c5"
}, {
    fen: "rnbq1rk1/pp2ppbp/3p1np1/2p5/2PP4/2N2NP1/PP2PPBP/R1BQ1RK1 b - - 1 7",
    eco: "E65",
    openingName: "King's Indian: fianchetto, Yugoslav, 7.O-O",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. Nf3 d6 5. g3 O-O 6. Bg2 c5 7. O-O"
}, {
    fen: "r1bq1rk1/pp2ppbp/2np1np1/2pP4/2P5/2N2NP1/PP2PPBP/R1BQ1RK1 b - - 0 8",
    eco: "E66",
    openingName: "King's Indian: fianchetto, Yugoslav Panno",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. Nf3 d6 5. g3 O-O 6. Bg2 c5 7. O-O Nc6 8. d5"
}, {
    fen: "r1bq1rk1/pppnppbp/3p1np1/8/2PP4/2N2NP1/PP2PPBP/R1BQK2R w KQ - 3 7",
    eco: "E67",
    openingName: "King's Indian: fianchetto with ...Nd7",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. Nf3 d6 5. g3 O-O 6. Bg2 Nbd7"
}, {
    fen: "r1bq1rk1/pppn1pbp/3p1np1/4p3/2PP4/2N2NP1/PP2PPBP/R1BQ1RK1 w - e6 0 8",
    eco: "E67",
    openingName: "King's Indian: fianchetto, classical variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. Nf3 d6 5. g3 O-O 6. Bg2 Nbd7 7. O-O e5"
}, {
    fen: "r1bq1rk1/pppn1pbp/3p1np1/4p3/2PPP3/2N2NP1/PP3PBP/R1BQ1RK1 b - e3 0 8",
    eco: "E68",
    openingName: "King's Indian: fianchetto, classical variation, 8.e4",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. Nf3 d6 5. g3 O-O 6. Bg2 Nbd7 7. O-O e5 8. e4"
}, {
    fen: "r1bq1rk1/pp1n1pbp/2pp1np1/4p3/2PPP3/2N2NPP/PP3PB1/R1BQ1RK1 b - - 0 9",
    eco: "E69",
    openingName: "King's Indian: fianchetto, classical main line",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. Nf3 d6 5. g3 O-O 6. Bg2 Nbd7 7. O-O e5 8. e4 c6 9. h3"
}, {
    fen: "rnbqk2r/ppppppbp/5np1/8/2PPP3/2N5/PP3PPP/R1BQKBNR b KQkq e3 0 4",
    eco: "E70",
    openingName: "King's Indian: 4.e4",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4"
}, {
    fen: "rnbqk2r/ppp1ppbp/3p1np1/8/2PPP3/2N5/PP2NPPP/R1BQKB1R b KQkq - 1 5",
    eco: "E70",
    openingName: "King's Indian: Kramer system",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nge2"
}, {
    fen: "rnbqk2r/ppp1ppbp/3p1np1/6B1/2PPP3/2N5/PP3PPP/R2QKBNR b KQkq - 1 5",
    eco: "E70",
    openingName: "King's Indian: accelerated Averbakh system",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Bg5"
}, {
    fen: "rnbqk2r/ppp1ppbp/3p1np1/8/2PPP3/2N4P/PP3PP1/R1BQKBNR b KQkq - 0 5",
    eco: "E71",
    openingName: "King's Indian: Makagonov system (5.h3)",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. h3"
}, {
    fen: "rnbqk2r/ppp1ppbp/3p1np1/8/2PPP3/2N3P1/PP3P1P/R1BQKBNR b KQkq - 0 5",
    eco: "E72",
    openingName: "King's Indian with e4 & g3",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. g3"
}, {
    fen: "rnbq1rk1/ppp2pbp/3p1np1/4p3/2PPP3/2N3P1/PP2NPBP/R1BQK2R b KQ - 1 7",
    eco: "E72",
    openingName: "King's Indian: Pomar system",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. g3 O-O 6. Bg2 e5 7. Nge2"
}, {
    fen: "rnbqk2r/ppp1ppbp/3p1np1/8/2PPP3/2N5/PP2BPPP/R1BQK1NR b KQkq - 1 5",
    eco: "E73",
    openingName: "King's Indian: 5.Be2",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Be2"
}, {
    fen: "rnbq1rk1/ppp1ppbp/3p1np1/8/2PPP3/2N1B3/PP2BPPP/R2QK1NR b KQ - 3 6",
    eco: "E73",
    openingName: "King's Indian: Semi-Averbakh system",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Be2 O-O 6. Be3"
}, {
    fen: "rnbq1rk1/ppp1ppbp/3p1np1/6B1/2PPP3/2N5/PP2BPPP/R2QK1NR b KQ - 3 6",
    eco: "E73",
    openingName: "King's Indian: Averbakh system",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Be2 O-O 6. Bg5"
}, {
    fen: "rnbq1rk1/pp2ppbp/3p1np1/2p3B1/2PPP3/2N5/PP2BPPP/R2QK1NR w KQ c6 0 7",
    eco: "E74",
    openingName: "King's Indian: Averbakh, 6...c5",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Be2 O-O 6. Bg5 c5"
}, {
    fen: "rnbq1rk1/pp3pbp/3ppnp1/2pP2B1/2P1P3/2N5/PP2BPPP/R2QK1NR w KQ - 0 8",
    eco: "E75",
    openingName: "King's Indian: Averbakh, main line",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Be2 O-O 6. Bg5 c5 7. d5 e6"
}, {
    fen: "rnbqk2r/ppp1ppbp/3p1np1/8/2PPPP2/2N5/PP4PP/R1BQKBNR b KQkq f3 0 5",
    eco: "E76",
    openingName: "King's Indian: Four pawns attack",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. f4"
}, {
    fen: "rnbq1rk1/pp2ppbp/3p1np1/2pP4/2P1PP2/2N2N2/PP4PP/R1BQKB1R b KQ - 0 7",
    eco: "E76",
    openingName: "King's Indian: Four pawns attack, dynamic line",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. f4 O-O 6. Nf3 c5 7. d5"
}, {
    fen: "rnbq1rk1/ppp1ppbp/3p1np1/8/2PPPP2/2N5/PP2B1PP/R1BQK1NR b KQ - 2 6",
    eco: "E77",
    openingName: "King's Indian: Four pawns attack, 6.Be2",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. f4 O-O 6. Be2"
}, {
    fen: "r1bq1rk1/pp4bp/2nppnp1/2p5/2P1PPPP/2N5/PP2B3/R1BQK1NR b KQ h3 0 10",
    eco: "E77",
    openingName: "King's Indian: Six pawns attack",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. f4 O-O 6. Be2 c5 7. d5 e6 8. dxe6 fxe6 9. g4 Nc6 10. h4"
}, {
    fen: "rnbq1rk1/pp3pbp/3ppnp1/2pP4/2P1PP2/2N2N2/PP2B1PP/R1BQK2R b KQ - 1 8",
    eco: "E77",
    openingName: "King's Indian: Four pawns attack",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. f4 O-O 6. Be2 c5 7. d5 e6 8. Nf3"
}, {
    fen: "rnbq1rk1/pp3pbp/3p1np1/2ppP3/2P2P2/2N2N2/PP2B1PP/R1BQK2R b KQ - 0 9",
    eco: "E77",
    openingName: "King's Indian: Four pawns attack, Florentine gambit",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. f4 O-O 6. Be2 c5 7. d5 e6 8. Nf3 exd5 9. e5"
}, {
    fen: "rnbq1rk1/pp2ppbp/3p1np1/2p5/2PPPP2/2N2N2/PP2B1PP/R1BQK2R b KQ - 1 7",
    eco: "E78",
    openingName: "King's Indian: Four pawns attack, with Be2 and Nf3",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. f4 O-O 6. Be2 c5 7. Nf3"
}, {
    fen: "r1bq1rk1/pp2ppbp/2np1np1/8/2PNPP2/2N1B3/PP2B1PP/R2QK2R b KQ - 2 9",
    eco: "E79",
    openingName: "King's Indian: Four pawns attack, main line",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. f4 O-O 6. Be2 c5 7. Nf3 cxd4 8. Nxd4 Nc6 9. Be3"
}, {
    fen: "rnbqk2r/ppp1ppbp/3p1np1/8/2PPP3/2N2P2/PP4PP/R1BQKBNR b KQkq - 0 5",
    eco: "E80",
    openingName: "King's Indian: Saemisch variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. f3"
}, {
    fen: "rnbq1rk1/ppp1ppbp/3p1np1/8/2PPP3/2N2P2/PP4PP/R1BQKBNR w KQ - 1 6",
    eco: "E81",
    openingName: "King's Indian: Saemisch, 5...O-O",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. f3 O-O"
}, {
    fen: "rnbq1rk1/1p2ppbp/p1pp1np1/8/2PPP3/2NBBP2/PP4PP/R2QK1NR w KQ - 0 8",
    eco: "E81",
    openingName: "King's Indian: Saemisch, Byrne variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. f3 O-O 6. Be3 c6 7. Bd3 a6"
}, {
    fen: "rnbq1rk1/p1p1ppbp/1p1p1np1/8/2PPP3/2N1BP2/PP4PP/R2QKBNR w KQ - 0 7",
    eco: "E82",
    openingName: "King's Indian: Saemisch, double fianchetto variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. f3 O-O 6. Be3 b6"
}, {
    fen: "r1bq1rk1/ppp1ppbp/2np1np1/8/2PPP3/2N1BP2/PP4PP/R2QKBNR w KQ - 3 7",
    eco: "E83",
    openingName: "King's Indian: Saemisch, 6...Nc6",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. f3 O-O 6. Be3 Nc6"
}, {
    fen: "1rbq1rk1/ppp1ppbp/2np1np1/8/2PPP3/2N1BP2/PP2N1PP/R2QKB1R w KQ - 5 8",
    eco: "E83",
    openingName: "King's Indian: Saemisch, Ruban variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. f3 O-O 6. Be3 Nc6 7. Nge2 Rb8"
}, {
    fen: "r1bq1rk1/1pp1ppbp/p1np1np1/8/2PPP3/2N1BP2/PP2N1PP/R2QKB1R w KQ - 0 8",
    eco: "E83",
    openingName: "King's Indian: Saemisch, Panno formation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. f3 O-O 6. Be3 Nc6 7. Nge2 a6"
}, {
    fen: "1rbq1rk1/1pp1ppbp/p1np1np1/8/2PPP3/2N1BP2/PP1QN1PP/R3KB1R w KQ - 2 9",
    eco: "E84",
    openingName: "King's Indian: Saemisch, Panno main line",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. f3 O-O 6. Be3 Nc6 7. Nge2 a6 8. Qd2 Rb8"
}, {
    fen: "rnbq1rk1/ppp2pbp/3p1np1/4p3/2PPP3/2N1BP2/PP4PP/R2QKBNR w KQ e6 0 7",
    eco: "E85",
    openingName: "King's Indian: Saemisch, orthodox variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. f3 O-O 6. Be3 e5"
}, {
    fen: "rnbq1rk1/pp3pbp/2pp1np1/4p3/2PPP3/2N1BP2/PP2N1PP/R2QKB1R w KQ - 0 8",
    eco: "E86",
    openingName: "King's Indian: Saemisch, orthodox, 7.Nge2 c6",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. f3 O-O 6. Be3 e5 7. Nge2 c6"
}, {
    fen: "rnbq1rk1/ppp2pbp/3p1np1/3Pp3/2P1P3/2N1BP2/PP4PP/R2QKBNR b KQ - 0 7",
    eco: "E87",
    openingName: "King's Indian: Saemisch, orthodox, 7.d5",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. f3 O-O 6. Be3 e5 7. d5"
}, {
    fen: "rnb2rk1/ppp2pbp/3p2p1/3Pp3/2n1P2Q/2N2P2/PP2K2P/R5NR w - - 0 13",
    eco: "E87",
    openingName: "King's Indian: Saemisch, orthodox, Bronstein variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. f3 O-O 6. Be3 e5 7. d5 Nh5 8. Qd2 Qh4+ 9. g3 Nxg3 10. Qf2 Nxf1 11. Qxh4 Nxe3 12. Ke2 Nxc4"
}, {
    fen: "rnbq1rk1/pp3pbp/2pp1np1/3Pp3/2P1P3/2N1BP2/PP4PP/R2QKBNR w KQ - 0 8",
    eco: "E88",
    openingName: "King's Indian: Saemisch, orthodox, 7.d5 c6",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. f3 O-O 6. Be3 e5 7. d5 c6"
}, {
    fen: "rnbq1rk1/pp3pbp/3p1np1/3pp3/2P1P3/2N1BP2/PP2N1PP/R2QKB1R w KQ - 0 9",
    eco: "E89",
    openingName: "King's Indian: Saemisch, orthodox main line",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. f3 O-O 6. Be3 e5 7. d5 c6 8. Nge2 cxd5"
}, {
    fen: "rnbqk2r/ppp1ppbp/3p1np1/8/2PPP3/2N2N2/PP3PPP/R1BQKB1R b KQkq - 1 5",
    eco: "E90",
    openingName: "King's Indian: 5.Nf3",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3"
}, {
    fen: "rnbq1rk1/ppp1ppbp/3p1np1/8/2PPP3/2N1BN2/PP3PPP/R2QKB1R b KQ - 3 6",
    eco: "E90",
    openingName: "King's Indian: Larsen variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be3"
}, {
    fen: "rnbq1rk1/ppp1ppbp/3p1np1/6B1/2PPP3/2N2N2/PP3PPP/R2QKB1R b KQ - 3 6",
    eco: "E90",
    openingName: "King's Indian: Zinnowitz variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Bg5"
}, {
    fen: "rnbq1rk1/ppp1ppbp/3p1np1/8/2PPP3/2N2N2/PP2BPPP/R1BQK2R b KQ - 3 6",
    eco: "E91",
    openingName: "King's Indian: 6.Be2",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2"
}, {
    fen: "r1bq1rk1/ppp1ppbp/n2p1np1/8/2PPP3/2N2N2/PP2BPPP/R1BQK2R w KQ - 4 7",
    eco: "E91",
    openingName: "King's Indian: Kazakh variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 Na6"
}, {
    fen: "rnbq1rk1/ppp2pbp/3p1np1/4p3/2PPP3/2N2N2/PP2BPPP/R1BQK2R w KQ e6 0 7",
    eco: "E92",
    openingName: "King's Indian: classical variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5"
}, {
    fen: "rnbq1rk1/ppp2pbp/3p1np1/4P3/2P1P3/2N2N2/PP2BPPP/R1BQK2R b KQ - 0 7",
    eco: "E92",
    openingName: "King's Indian: Andersson variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. dxe5"
}, {
    fen: "rnbq1rk1/ppp2pbp/3p1np1/4p3/2PPP3/2N1BN2/PP2BPPP/R2QK2R b KQ - 1 7",
    eco: "E92",
    openingName: "King's Indian: Gligoric-Taimanov system",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. Be3"
}, {
    fen: "rnbq1rk1/ppp2pbp/3p1np1/3Pp3/2P1P3/2N2N2/PP2BPPP/R1BQK2R b KQ - 0 7",
    eco: "E92",
    openingName: "King's Indian: Petrosian system",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. d5"
}, {
    fen: "rnbq1rk1/1pp2pbp/3p1np1/p2Pp3/2P1P3/2N2N2/PP2BPPP/R1BQK2R w KQ a6 0 8",
    eco: "E92",
    openingName: "King's Indian: Petrosian system, Stein variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. d5 a5"
}, {
    fen: "r1bq1rk1/pppn1pbp/3p1np1/3Pp3/2P1P3/2N2N2/PP2BPPP/R1BQK2R w KQ - 1 8",
    eco: "E93",
    openingName: "King's Indian: Petrosian system, main line",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. d5 Nbd7"
}, {
    fen: "r1bq1rk1/pppn1pb1/3p3p/3Pp1pn/2P1P2P/2N2NB1/PP2BPP1/R2QK2R b KQ h3 0 11",
    eco: "E93",
    openingName: "King's Indian: Petrosian system, Keres variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. d5 Nbd7 8. Bg5 h6 9. Bh4 g5 10. Bg3 Nh5 11. h4"
}, {
    fen: "rnbq1rk1/ppp2pbp/3p1np1/4p3/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 b - - 1 7",
    eco: "E94",
    openingName: "King's Indian: orthodox variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. O-O"
}, {
    fen: "rnbq1rk1/pp3pbp/2pp1np1/4p3/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 0 8",
    eco: "E94",
    openingName: "King's Indian: orthodox, Donner variation",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. O-O c6"
}, {
    fen: "r1bq1rk1/pppn1pbp/3p1np1/4p3/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 2 8",
    eco: "E94",
    openingName: "King's Indian: orthodox, 7...Nbd7",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. O-O Nbd7"
}, {
    fen: "r1bq1rk1/pppn1pbp/3p1np1/4p3/2PPP3/2N2N2/PP2BPPP/R1BQR1K1 b - - 3 8",
    eco: "E95",
    openingName: "King's Indian: orthodox, 7...Nbd7, 8.Re1",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. O-O Nbd7 8. Re1"
}, {
    fen: "r1bq1rk1/1p1n1pbp/2pp1np1/p3p3/2PPP3/2N2N2/PP3PPP/R1BQRBK1 w - a6 0 10",
    eco: "E96",
    openingName: "King's Indian: orthodox, 7...Nbd7, main line",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. O-O Nbd7 8. Re1 c6 9. Bf1 a5"
}, {
    fen: "r1bq1rk1/ppp2pbp/2np1np1/4p3/2PPP3/2N2N2/PP2BPPP/R1BQ1RK1 w - - 2 8",
    eco: "E97",
    openingName: "King's Indian: orthodox, Aronin-Taimanov variation (Yugoslav attack / Mar del Plata variation)",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. O-O Nc6"
}, {
    fen: "r1bq1rk1/ppp1npbp/3p1np1/3Pp3/1PP1P3/2N2N2/P3BPPP/R1BQ1RK1 b - b3 0 9",
    eco: "E97",
    openingName: "King's Indian: orthodox, Aronin-Taimanov, bayonet attack",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. O-O Nc6 8. d5 Ne7 9. b4"
}, {
    fen: "r1bq1rk1/ppp1npbp/3p1np1/3Pp3/2P1P3/2N5/PP2BPPP/R1BQNRK1 b - - 2 9",
    eco: "E98",
    openingName: "King's Indian: orthodox, Aronin-Taimanov, 9.Ne1",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. O-O Nc6 8. d5 Ne7 9. Ne1"
}, {
    fen: "r1bq1rk1/pppnn1bp/3p2p1/3Ppp2/2P1P3/2N2P2/PP2B1PP/R1BQNRK1 w - f6 0 11",
    eco: "E99",
    openingName: "King's Indian: orthodox, Aronin-Taimanov, main line",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. O-O Nc6 8. d5 Ne7 9. Ne1 Nd7 10. f3 f5"
}, {
    fen: "r1bq1rk1/pppnn1bp/3p2p1/3Ppp2/2P1P1P1/2N2P2/PP2B2P/R1BQNRK1 b - g3 0 11",
    eco: "E99",
    openingName: "King's Indian: orthodox, Aronin-Taimanov, Benko attack",
    moves: "1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. Be2 e5 7. O-O Nc6 8. d5 Ne7 9. Ne1 Nd7 10. f3 f5 11. g4"
}];