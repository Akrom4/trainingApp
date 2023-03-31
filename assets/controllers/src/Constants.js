import { Board, Pawn, King, Piece, Position, Rook } from "./models";


export const row = ['1', '2', '3', '4', '5', '6', '7', '8'];
export const column = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
export const PieceType = {
    PAWN: 'p',
    BISHOP: 'b',
    KNIGHT: 'n',
    ROOK: 'r',
    QUEEN: 'q',
    KING: 'k'
};

export const TeamType = { W: 'w', B: 'b' };

export const testBoard = new Board([new Pawn(new Position(0, 6), TeamType.W), new Piece(new Position(5, 6), PieceType.KNIGHT, TeamType.W)],TeamType.W);

export const initialBoardState = [];

for (let i = 0; i < 8; i++) {
    initialBoardState.push(new Pawn(new Position(i, 6), TeamType.B));
}
for (let i = 0; i < 8; i++) {
    initialBoardState.push(new Pawn(new Position(i, 1), TeamType.W));
}
for (let i = 0; i < 2; i++) {
    const rowT = i === 0 ? 0 : 7;
    const team = i === 0 ? TeamType.W : TeamType.B;

    initialBoardState.push(new Rook(new Position(0, rowT), team));
    initialBoardState.push(new Rook(new Position(7, rowT), team));
    initialBoardState.push(new Piece(new Position(1, rowT), PieceType.KNIGHT, team));
    initialBoardState.push(new Piece(new Position(6, rowT), PieceType.KNIGHT, team));
    initialBoardState.push(new Piece(new Position(2, rowT), PieceType.BISHOP, team));
    initialBoardState.push(new Piece(new Position(5, rowT), PieceType.BISHOP, team));
    initialBoardState.push(new Piece(new Position(3, rowT), PieceType.QUEEN, team));
    initialBoardState.push(new King(new Position(4, rowT), team));
}

export const initialBoard = new Board(initialBoardState,TeamType.W);

export const fen = "rnbqkbnr/ppp1pppp/8/8/3pP3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1";

export const pgnTest3 = `[Event "?"]
[Site "?"]
[Date "????.??.??"]
[Round "?"]
[White "?"]
[Black "?"]
[Result "*"]

1. e4 e5 2. Nf3 (2. d4 d5 3. Nc3) 2... Nc6 (2... Nf6) 3. Nc3 Nf6 4. d4 *`;

export const pgnTest2 = `[Event "?"]
[Site "?"]
[Date "????.??.??"]
[Round "?"]
[White "?"]
[Black "?"]
[Result "*"]

1. e4 e5 2. Nf3 (2. d4 Nf6 (2... d6) 3. Nc3) 2... Nc6 3. Nc3 Nf6 4. d4 *


[CourseTitle "Course Title Test!"]
[Event "(draft) Win with the Jobava London System: ⚔️ The Bf5 line ⚔️"]
[TFEN "rnbqkbnr/ppp1pppp/8/8/3pP3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"]
[Site "https://lichess.org/study/kv0ztA91/3NpbNVId"]
[Result "*"]
[Annotator "https://lichess.org/@/Alihene2"]
[UTCDate "2023.03.11"]
[UTCTime "14:48:24"]
[Variant "Standard"]
[ECO "D01"]
[Opening "Rapport-Jobava System"]

{ What's the first move again? }
1. d4 { That's right! } 1... d5 { And the second move? } 2. Nc3 Nf6 { And the third move? } 3. Bf4 { Good job remembering! } 3... Bf5 { The Rapport-Jobava system is where natural moves lead to traps and surprises. } { [%cal Gf2f3] } 4. f3!? { An interesting move that black may not be prepared for. } 4... e6 { [%cal Gg2g4] } 5. g4 { We have a pawn storm! } 5... Bg6 { [%cal Gh2h4] } 6. h4 h5 { [%cal Gg4g5] } 7. g5 Nfd7 { [%cal Ge2e4] } 8. e4 dxe4 { [%cal Gf3e4] } 9. fxe4 { The center is ours! } 9... Bb4 { [%cal Gd1f3] } 10. Qf3 { And white is good. To learn deeper theory, go to the "Theory" chapter. } *
`;

export const pgnTest1 = `[Event "Korkoma's Study: Chapter 1"]
[Site "https://lichess.org/study/7VOXyNBM/Ot8jErgi"]
[Result "*"]
[UTCDate "2023.03.26"]
[UTCTime "15:26:49"]
[Variant "Standard"]
[ECO "C44"]
[Opening "King's Knight Opening: Normal Variation"]
[Annotator "https://lichess.org/@/Korkoma"]

1. e4 { [%csl Ge4][%cal Gg8f6] } 1... e5 2. Nf3 Nc6 *`;

export const pgnTest = `[CourseTitle "Course Title Test!"]
[Event "(draft) Win with the Jobava London System: ⚔️ The Bf5 line ⚔️"]
[TFEN "rnbqkbnr/ppp1pppp/8/8/3pP3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1"]
[Site "https://lichess.org/study/kv0ztA91/3NpbNVId"]
[Result "*"]
[Annotator "https://lichess.org/@/Alihene2"]
[UTCDate "2023.03.11"]
[UTCTime "14:48:24"]
[Variant "Standard"]
[ECO "D01"]
[Opening "Rapport-Jobava System"]

{ What's the first move again? }
1. d4 { That's right! } 1... d5 { And the second move? } 2. Nc3 Nf6 { And the third move? } 3. Bf4 { Good job remembering! } 3... Bf5 { The Rapport-Jobava system is where natural moves lead to traps and surprises. } { [%cal Gf2f3] } 4. f3!? { An interesting move that black may not be prepared for. } 4... e6 { [%cal Gg2g4] } 5. g4 { We have a pawn storm! } 5... Bg6 { [%cal Gh2h4] } 6. h4 h5 { [%cal Gg4g5] } 7. g5 Nfd7 { [%cal Ge2e4] } 8. e4 dxe4 { [%cal Gf3e4] } 9. fxe4 { The center is ours! } 9... Bb4 { [%cal Gd1f3] } 10. Qf3 { And white is good. To learn deeper theory, go to the "Theory" chapter. } *


[Event "(draft) Win with the Jobava London System: ⚔️ Nc6: a common mistake ⚔️"]
[Site "https://lichess.org/study/kv0ztA91/wMJ0Cdws"]
[Result "*"]
[Annotator "https://lichess.org/@/Alihene2"]
[UTCDate "2023.03.11"]
[UTCTime "14:49:04"]
[Variant "Standard"]
[ECO "D01"]
[Opening "Rapport-Jobava System"]

{ The first move? }
1. d4 d5 { The second move? } 2. Nc3 Nf6 { The third move? } 3. Bf4 Nc6? { A natural move. But in the Rapport-Jobava System, natural moves are mistakes. This is a perfect example of that. } { [%cal Gc3b5] } 4. Nb5! { Threatening to capture on c7 with the knight and fork the king and rook. } 4... e5 { The only defending move. Black loses a pawn. } { [%cal Gf4e5] } 5. Bxe5 Nxe5 { [%cal Gd4e5] } 6. dxe5 Nh5 { Drum roll please... } { [%cal Gd1d5] } 7. Qxd5!! { QUEEN SAC! } 7... Qxd5 { [%cal Gb5c7] } 8. Nxc7+! { Fork! } 8... Kd7 { [%cal Gc7d5] } 9. Nxd5 { White wins three pawns, black's king safety is ruined. To learn deeper theory, go to the "Theory" chapter. } *


[Event "5th Norway Blitz 2017"]
[Site "Stavanger NOR"]
[Date "2017.06.05"]
[Round "8.1"]
[White "Carlsen, M."]
[Black "Caruana, F."]
[Result "1-0"]
[WhiteElo "2832"]
[BlackElo "2808"]
[TimeControl "-"]
[Termination "Normal"]
[Annotator "lichess.org"]
[UTCDate "2023.03.11"]
[UTCTime "14:52:39"]
[Variant "Standard"]
[ECO "D01"]
[Opening "Rapport-Jobava System"]

1. d4 { [%eval 0.0] [%eval 0.0] } 1... Nf6 { [%eval 0.28] [%eval 0.28] } 2. Bf4 { [%eval 0.0] [%eval 0.0] } 2... d5 { [%eval 0.06] [%eval 0.06] } 3. Nc3 { [%eval 0.0] } { D01 Rapport-Jobava System } { [%eval 0.0] } 3... a6 { [%eval 0.0] [%eval 0.0] } 4. e3 { [%eval -0.25] [%eval -0.25] } 4... e6 { [%eval -0.24] [%eval -0.24] } 5. g4 { [%eval 0.0] [%eval 0.0] } 5... c5 { [%eval 0.37] [%eval 0.37] } 6. g5 { [%eval 0.0] [%eval 0.0] } 6... Nfd7 { [%eval 0.3] [%eval 0.3] } 7. Nf3 { [%eval 0.27] [%eval 0.27] } 7... Nc6 { [%eval 0.33] [%eval 0.33] } 8. a3 { [%eval 0.44] [%eval 0.44] } 8... b5 { [%eval 0.55] [%eval 0.55] } 9. h4 { [%eval 0.49] [%eval 0.49] } 9... Bb7 { [%eval 0.52] [%eval 0.52] } 10. h5 { [%eval 0.73] [%eval 0.73] } 10... Nb6 { [%eval 0.72] [%eval 0.72] } 11. Ne5? { [%eval -0.57] } { Mistake. Ne2 was best. } { [%eval -0.57] } 11... Nxe5 { [%eval -0.66] [%eval -0.66] } 12. Bxe5 { [%eval -0.03] [%eval -0.03] } 12... Nc4 { [%eval 0.3] [%eval 0.3] } 13. Bxc4 { [%eval 0.62] [%eval 0.62] } 13... dxc4 { [%eval 0.45] [%eval 0.45] } 14. Rg1 { [%eval 0.72] [%eval 0.72] } 14... f6 { [%eval 0.9] [%eval 0.9] } 15. Bf4 { [%eval 1.0] [%eval 1.0] } 15... Qd7 { [%eval 1.13] [%eval 1.13] } 16. h6 { [%eval 0.59] [%eval 0.59] } 16... O-O-O { [%eval 0.26] [%eval 0.26] } 17. Qe2 { [%eval 0.0] [%eval 0.0] } 17... cxd4 { [%eval 0.0] [%eval 0.0] } 18. exd4 { [%eval 0.0] [%eval 0.0] } 18... Qxd4 { [%eval 0.0] [%eval 0.0] } 19. Rd1 { [%eval -0.21] [%eval -0.21] } 19... Qxf4 { [%eval -0.08] [%eval -0.08] } 20. Qxe6+ { [%eval -0.37] [%eval -0.37] } 20... Kc7 { [%eval -0.35] [%eval -0.35] } 21. Qf7+ { [%eval -0.21] [%eval -0.21] } 21... Be7?? { [%eval 9.23] } { Blunder. Kb6 was best. } { [%eval 9.23] } 22. Qxe7+ { [%eval 9.33] [%eval 9.33] } 22... Kc8 { [%eval 9.3] [%eval 9.3] } 23. hxg7 { [%eval 9.32] [%eval 9.32] } 23... Rxd1+ { [%eval 11.4] [%eval 11.4] } 24. Nxd1 { [%eval 11.63] [%eval 11.63] } 24... Rg8 { [%eval 13.8] [%eval 13.8] } 25. Qf8+ { [%eval 12.96] [%eval 12.96] } 25... Kc7 { [%eval 14.23] [%eval 14.23] } 26. Qxg8 { [%eval 14.65] } { Black resigns. } { [%eval 14.65] }`;









