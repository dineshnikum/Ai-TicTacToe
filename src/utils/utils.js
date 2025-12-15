/* ---------- utility: find winning move ---------- */
export const findBlockingMove = (board) => {
    for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
            board[i] = "X";
            const res = checkWinner(board);
            board[i] = "";
            if (res && res.winner === "X") return i;
        }
    }
    return -1;
};

/* ---------- utility: find fork move ---------- */
export const findForkMove = (board, player) => {
    const possibleMoves = [];

    for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
            board[i] = player;

            let winningPaths = 0;
            for (let j = 0; j < 9; j++) {
                if (board[j] === "") {
                    board[j] = player;
                    if (checkWinner(board)?.winner === player) winningPaths++;
                    board[j] = "";
                }
            }

            board[i] = "";
            if (winningPaths >= 2) possibleMoves.push(i);
        }
    }

    return possibleMoves.length
        ? possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
        : -1;
};

/* ---------- utility: check for winner or draw ---------- */
export const checkWinner = (b) => {
    for (const p of WIN_PATTERNS) {
        const [a, c, d] = p;
        if (b[a] && b[a] === b[c] && b[a] === b[d]) {
            return { winner: b[a], cells: p };
        }
    }
    if (!b.includes("")) return { winner: "draw", cells: [] };
    return null;
};

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
