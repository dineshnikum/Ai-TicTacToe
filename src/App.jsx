import { useEffect, useRef, useState } from "react";
import SettingsModal from "./SettingsModal";
import "./App.css";

/* ---------- Win patterns ---------- */
const WIN_PATTERNS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

/* minimax scoring */
const SCORE_MAP = { O: 1, X: -1, draw: 0 };

/* localStorage keys */
const LS_SCORES = "ttt_scores_v2";
const LS_SETTINGS = "ttt_settings_v2";

export default function App() {
    /* ---------- restore settings & scores from localStorage ---------- */
    const savedSettings = (() => {
        try {
            const raw = localStorage.getItem(LS_SETTINGS);
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    })();

    const savedScores = (() => {
        try {
            const raw = localStorage.getItem(LS_SCORES);
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    })();

    /* ---------- app state ---------- */
    const [board, setBoard] = useState(Array(9).fill(""));
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null);
    const [winningCells, setWinningCells] = useState([]);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [aiThinking, setAiThinking] = useState(false);

    /* settings */
    const [difficulty, setDifficulty] = useState(
        savedSettings?.difficulty || "hard"
    );
    const [starter, setStarter] = useState(savedSettings?.starter || "player");
    const [theme, setTheme] = useState(savedSettings?.theme || "dark");

    /* scoreboard */
    const [scores, setScores] = useState(
        savedScores || { player: 0, bot: 0, draws: 0 }
    );

    /* ref to prevent user click while AI thinking */
    const aiThinkingRef = useRef(false);

    /* persist settings & scores whenever they change */
    useEffect(() => {
        if (difficulty || starter || theme) {
            localStorage.setItem(
                LS_SETTINGS,
                JSON.stringify({ difficulty, starter, theme })
            );
        }
    }, [difficulty, starter, theme]);

    useEffect(() => {
        if (scores) {
            localStorage.setItem(LS_SCORES, JSON.stringify(scores));
        }
    }, [scores]);

    /* ---------- utility: check for winner or draw ---------- */
    const checkWinner = (b) => {
        for (const p of WIN_PATTERNS) {
            const [a, c, d] = p;
            if (b[a] && b[a] === b[c] && b[a] === b[d]) {
                return { winner: b[a], cells: p };
            }
        }
        if (!b.includes("")) return { winner: "draw", cells: [] };
        return null;
    };

    /* ---------- minimax implementation ---------- */
    const minimax = (boardState, isMaximizing) => {
        const r = checkWinner(boardState);
        if (r) return SCORE_MAP[r.winner];

        if (isMaximizing) {
            let best = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (boardState[i] === "") {
                    boardState[i] = "O";
                    const score = minimax(boardState, false);
                    boardState[i] = "";
                    best = Math.max(best, score);
                }
            }
            return best;
        } else {
            let best = Infinity;
            for (let i = 0; i < 9; i++) {
                if (boardState[i] === "") {
                    boardState[i] = "X";
                    const score = minimax(boardState, true);
                    boardState[i] = "";
                    best = Math.min(best, score);
                }
            }
            return best;
        }
    };

    /* ---------- find best move using minimax ---------- */
    const findBestMove = (boardState) => {
        // if board empty and center available, pick center for nicer games
        const empties = boardState.filter((c) => c === "").length;
        if (empties === 9) return 4;

        let bestScore = -Infinity;
        let bestMove = -1;
        for (let i = 0; i < 9; i++) {
            if (boardState[i] === "") {
                boardState[i] = "O";
                const score = minimax(boardState, false);
                boardState[i] = "";
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }
        return bestMove;
    };

    /* ---------- pick random move ---------- */
    const pickRandom = (boardState) => {
        const empties = boardState
            .map((v, idx) => (v === "" ? idx : null))
            .filter((x) => x !== null);
        if (empties.length === 0) return -1;
        return empties[Math.floor(Math.random() * empties.length)];
    };

    /* ---------- AI move selection based on difficulty ---------- */
    const chooseAiMoveIndex = (boardState) => {
        if (difficulty === "hard") {
            return findBestMove(boardState);
        }
        // medium: mostly smart, sometimes random; we set 80% minimax, 20% random
        const r = Math.random();
        if (r < 0.8) return findBestMove(boardState);
        return pickRandom(boardState);
    };

    /* ---------- handle AI move (places 'O') ---------- */
    const aiMove = (currentBoard) => {
        if (gameOver) return;

        const idx = chooseAiMoveIndex([...currentBoard]);
        if (idx === -1) return;

        const newBoard = [...currentBoard];
        newBoard[idx] = "O";
        setBoard(newBoard);

        const res = checkWinner(newBoard);
        if (res) finishGame(res);
    };

    /* ---------- handle player click ---------- */
    const handleClick = (index) => {
        if (gameOver || board[index] !== "" || aiThinkingRef.current) return;

        const newBoard = [...board];
        newBoard[index] = "X";
        setBoard(newBoard);

        const res = checkWinner(newBoard);
        if (res) {
            finishGame(res);
            return;
        }

        // AI thinks and moves
        aiThinkingRef.current = true;
        setAiThinking(true);

        setTimeout(() => {
            aiMove(newBoard);
            aiThinkingRef.current = false;
            setAiThinking(false);
        }, 450 + Math.floor(Math.random() * 350)); // slightly variable thinking time
    };

    /* ---------- finish game: set flags and update scores ---------- */
    const finishGame = (res) => {
        setGameOver(true);
        setWinner(res.winner);
        setWinningCells(res.cells);

        if (res.winner === "X")
            setScores((s) => ({ ...s, player: s.player + 1 }));
        else if (res.winner === "O")
            setScores((s) => ({ ...s, bot: s.bot + 1 }));
        else setScores((s) => ({ ...s, draws: s.draws + 1 }));
    };

    /* ---------- restart / new game logic (respects starter setting) ---------- */
    const restart = (opts = {}) => {
        const board0 = Array(9).fill("");
        setBoard(board0);
        setGameOver(false);
        setWinner(null);
        setWinningCells([]);
        aiThinkingRef.current = false;
        setAiThinking(false);

        // determine who starts this round
        let starterThisRound = starter; // 'player' | 'bot' | 'random'
        if (opts.overrideStarter) starterThisRound = opts.overrideStarter;
        if (starterThisRound === "random") {
            starterThisRound = Math.random() < 0.5 ? "player" : "bot";
        }

        // If bot starts, let it make the first move after tiny delay
        if (starterThisRound === "bot") {
            aiThinkingRef.current = true;
            setAiThinking(true);
            setTimeout(() => {
                aiMove(board0);
                aiThinkingRef.current = false;
                setAiThinking(false);
            }, 500);
        }
    };

    /* ---------- Reset scoreboard ---------- */
    const resetScores = () => {
        setScores({ player: 0, bot: 0, draws: 0 });
    };

    /* ---------- on mount: initialize a fresh game ---------- */
    useEffect(() => {
        restart();
    }, []);

    /* ---------- small helpers for classes ---------- */
    const cellClass = (i) => {
        let cls = "cell";
        if (winningCells.includes(i)) cls += " highlight";
        if (board[i] === "X") cls += " x-mark";
        if (board[i] === "O") cls += " o-mark";
        return cls;
    };

    /* ---------- keyboard shortcuts: R = restart, S = settings ---------- */
    useEffect(() => {
        const onKey = (e) => {
            if (e.key.toLowerCase() === "r") restart();
            if (e.key.toLowerCase() === "s") setSettingsOpen(true);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    });

    return (
        <div className={`app-root professional ${theme}`}>
            <div className="container">
                <header className="header">
                    <div className="left">
                        <div className="logo">T</div>
                        <div className="title">TicTacToe</div>
                    </div>

                    <div className="middle">
                        <div className="score-item">
                            YOU <span>{scores.player}</span>
                        </div>
                        <div className="score-item">
                            DRAW <span>{scores.draws}</span>
                        </div>
                        <div className="score-item">
                            BOT <span>{scores.bot}</span>
                        </div>
                    </div>

                    <div className="right">
                        <button className="btn small" onClick={() => restart()}>
                            Restart
                        </button>
                        <button
                            className="btn small ghost"
                            onClick={() => setSettingsOpen(true)}
                        >
                            Settings
                        </button>
                    </div>
                </header>

                <main className="main">
                    <div className="status-row">
                        {gameOver ? (
                            <div className="status result">
                                {winner === "draw" ? "Draw" : `${winner} Wins`}
                            </div>
                        ) : aiThinking ? (
                            <div className="status thinking">
                                AI is thinking <span className="dots">•••</span>
                            </div>
                        ) : (
                            <div className="status hint">Your move (X)</div>
                        )}
                    </div>

                    <div className="board-area">
                        <div
                            className="board"
                            role="grid"
                            aria-label="tic tac toe board"
                        >
                            {board.map((v, i) => (
                                <button
                                    key={i}
                                    className={cellClass(i)}
                                    onClick={() => handleClick(i)}
                                    disabled={
                                        gameOver ||
                                        aiThinking ||
                                        board[i] !== ""
                                    }
                                >
                                    <span className="mark">{board[i]}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </main>

                <footer className="footer">
                    <div className="hint-small">
                        Tip: R = restart • S = settings
                    </div>
                    <div className="who-start">
                        Starter:{" "}
                        <strong>
                            {starter === "random" ? "Random" : starter}
                        </strong>
                    </div>
                </footer>
            </div>

            <SettingsModal
                open={settingsOpen}
                onClose={() => setSettingsOpen(false)}
                difficulty={difficulty}
                setDifficulty={setDifficulty}
                theme={theme}
                setTheme={setTheme}
                starter={starter}
                setStarter={setStarter}
                resetScores={resetScores}
            />
        </div>
    );
}
