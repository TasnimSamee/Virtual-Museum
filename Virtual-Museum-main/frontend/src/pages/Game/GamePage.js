import React from "react";
import HistoryGame from "../../components/HistoryGame"; // Import your existing game
import "./GamePage.css"; // We will make this next

const GamePage = () => {
  return (
    <div className="game-page-container">
      <div className="game-header">
        <h1>Time Traveler's Challenge ⏳</h1>
        <p>Test your knowledge of ancient artifacts. Can you match them all?</p>
      </div>
      
      {/* The Game Component */}
      <HistoryGame />
    </div>
  );
};

export default GamePage;