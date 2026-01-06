import React, { useState, useEffect } from "react";
import "./HistoryGame.css";

// The artifacts to match (using Emojis for simplicity & speed!)
const cardImages = [
  { src: "🏺", matched: false },
  { src: "👑", matched: false },
  { src: "📜", matched: false },
  { src: "🗿", matched: false },
  { src: "⚔️", matched: false },
  { src: "💎", matched: false },
];

const HistoryGame = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // Shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // Handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Start game automatically on load
  useEffect(() => {
    shuffleCards();
  }, []);

  // Reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  return (
    <div className="game-container">
      <h3>🏛️ Artifact Memory Challenge</h3>
      <p>Find the matching pairs to preserve history!</p>
      <button onClick={shuffleCards} className="new-game-btn">New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <div className="card" key={card.id}>
            <div className={card === choiceOne || card === choiceTwo || card.matched ? "flipped" : ""}>
              <div className="front">{card.src}</div>
              <div 
                className="back" 
                onClick={() => !disabled && handleChoice(card)}
              >
                ❓
              </div>
            </div>
          </div>
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
};

export default HistoryGame;