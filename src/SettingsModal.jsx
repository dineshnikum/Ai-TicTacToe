import "./SettingsModal.css";

export default function SettingsModal({
  open,
  onClose,
  difficulty,
  setDifficulty,
  theme,
  setTheme,
  starter,
  setStarter,
  resetScores,
}) {
  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h2>Settings</h2>

        <div className="section">
          <label className="label">Difficulty</label>
          <div className="row">
            <button
              className={difficulty === "medium" ? "opt active" : "opt"}
              onClick={() => setDifficulty("medium")}
            >
              Medium
            </button>
            <button
              className={difficulty === "hard" ? "opt active" : "opt"}
              onClick={() => setDifficulty("hard")}
            >
              Hard
            </button>
          </div>
          <p className="help">
            Medium: smart but can lose occasionally. Hard: perfect AI.
          </p>
        </div>

        <div className="section">
          <label className="label">Who starts</label>
          <div className="row">
            <button
              className={starter === "player" ? "opt active" : "opt"}
              onClick={() => setStarter("player")}
            >
              You
            </button>
            <button
              className={starter === "bot" ? "opt active" : "opt"}
              onClick={() => setStarter("bot")}
            >
              Bot
            </button>
            <button
              className={starter === "random" ? "opt active" : "opt"}
              onClick={() => setStarter("random")}
            >
              Random
            </button>
          </div>
          <p className="help">Choose who plays first each round.</p>
        </div>

        <div className="section">
          <label className="label">Theme</label>
          <div className="row">
            <button
              className={theme === "dark" ? "opt active" : "opt"}
              onClick={() => setTheme("dark")}
            >
              Dark
            </button>
            <button
              className={theme === "light" ? "opt active" : "opt"}
              onClick={() => setTheme("light")}
            >
              Light
            </button>
          </div>
        </div>

        <div className="section">
          <button className="danger" onClick={resetScores}>
            Reset Scores
          </button>
        </div>

        <div className="row actions">
          <button className="close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
