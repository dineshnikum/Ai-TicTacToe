# 🎮 Tic-Tac-Toe AI Bot

An intelligent and beautifully designed Tic-Tac-Toe game built with React and powered by the Minimax algorithm. Challenge yourself against an unbeatable AI opponent with customizable difficulty levels!

## ✨ Features

### 🤖 Smart AI Opponent

-   **Hard Mode**: Unbeatable AI using the Minimax algorithm - try to get a draw!
-   **Medium Mode**: 80% optimal play with 20% randomness for a balanced challenge
-   Intelligent move selection with strategic decision-making

### 🎨 Modern UI/UX

-   Clean, professional design with smooth animations
-   Dark and light theme support
-   Responsive layout that works on all devices
-   Visual highlighting of winning combinations
-   Real-time game status indicators

### ⚙️ Customizable Settings

-   **Difficulty Levels**: Choose between Hard and Medium
-   **Starter Options**: Player first, Bot first, or Random
-   **Theme Selection**: Toggle between dark and light themes
-   All settings persist using localStorage

### 📊 Score Tracking

-   Persistent scoreboard tracking:
    -   Player wins
    -   Bot wins
    -   Draws
-   Scores saved automatically to localStorage
-   Easy reset option

### ⌨️ Keyboard Shortcuts

-   `R` - Restart game
-   `S` - Open settings

### 🎯 Additional Features

-   AI "thinking" animation for realistic gameplay
-   Smooth transitions and hover effects
-   Accessible game board with ARIA labels
-   Automatic game state management

## 🚀 Getting Started

### Prerequisites

-   Node.js (v14 or higher)
-   npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd tic-tac-aibot
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Available Scripts

-   `npm run dev` - Start development server with hot reload
-   `npm run build` - Build for production
-   `npm run preview` - Preview production build locally
-   `npm run lint` - Run ESLint to check code quality

## 🎮 How to Play

1. **Start the Game**: The game begins automatically when you load the page
2. **Make Your Move**: Click on any empty cell to place your "X"
3. **AI Response**: The AI will respond with its move ("O") after thinking
4. **Win Condition**: Get three in a row (horizontally, vertically, or diagonally)
5. **Restart**: Click the "Restart" button or press `R` to start a new game

## 🧠 Algorithm Explanation

### Minimax Algorithm

The AI uses the Minimax algorithm, a decision-making algorithm that:

-   Explores all possible game states
-   Evaluates outcomes (win: +1, loss: -1, draw: 0)
-   Chooses the move that maximizes AI's chances while minimizing player's chances
-   In Hard mode, it never makes a mistake - the best you can do is tie!

### Difficulty Levels

-   **Hard**: Pure Minimax - optimal play every time
-   **Medium**: 80% Minimax + 20% random moves for a more casual experience

## 🛠️ Tech Stack

-   **React 19** - Modern UI library with hooks
-   **Vite 7** - Lightning-fast build tool and dev server
-   **JavaScript (ES6+)** - Modern JavaScript features
-   **CSS3** - Custom styling with animations and transitions
-   **LocalStorage API** - Persistent data storage

## 📁 Project Structure

```
tic-tac-aibot/
├── src/
│   ├── App.jsx           # Main game component with logic
│   ├── App.css           # Styling for the game
│   ├── SettingsModal.jsx # Settings configuration component
│   └── main.jsx          # Application entry point
├── public/               # Static assets
├── package.json          # Project dependencies and scripts
└── README.md            # Project documentation
```

## 🎯 Game Logic Highlights

### Win Detection

-   8 possible winning patterns (3 rows, 3 columns, 2 diagonals)
-   Real-time winner checking after each move
-   Visual highlighting of winning cells

### State Management

-   React hooks (useState, useEffect, useRef)
-   Immutable state updates
-   Persistent settings and scores via localStorage

### AI Strategy

-   Prefers center position on empty board for optimal gameplay
-   Dynamic move evaluation based on game state
-   Variable "thinking" time (450-800ms) for realistic feel

## 🎨 Customization

### Themes

Toggle between dark and light themes in the settings menu. The theme preference is saved automatically.

### Starter Configuration

Choose who makes the first move:

-   **Player**: You always start
-   **Bot**: AI always starts
-   **Random**: Randomized each game

## 🤝 Contributing

Contributions are welcome! Feel free to:

-   Report bugs
-   Suggest new features
-   Submit pull requests
-   Improve documentation

## 📝 License

This project is open source and available under the MIT License.

## 🎓 Learning Resources

This project demonstrates:

-   React hooks and component lifecycle
-   Game state management
-   Minimax algorithm implementation
-   LocalStorage persistence
-   Responsive CSS design
-   Keyboard event handling

Perfect for learning advanced React patterns and game AI algorithms!

## 🐛 Known Issues

None at the moment! If you find any bugs, please report them.

## 📧 Contact

For questions or feedback, feel free to reach out or open an issue on GitHub.

---

**Enjoy the game and good luck beating the AI! 🎯**
