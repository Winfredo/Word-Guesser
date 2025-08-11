import React from "react";
import "./App.css";
import Data from "./data";

const App = () => {
  const [currentWord, setCurrentWord] = React.useState("react");
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const [guessLetters, setGuessLetters] = React.useState([]);
  console.log(guessLetters);
  function handleLetterClick(letter) {
    setGuessLetters((prevLetters) =>
      prevLetters.includes(letter) ? prevLetters : [...prevLetters, letter]
    );
  }
  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word within 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section className="game-status">
        <h2>You win!</h2>
        <p>Well done! 🎉</p>
      </section>
      <section className="language-chips">
        {Data.map((lang) => (
          <span
            className="chip"
            key={lang.name}
            style={{ backgroundColor: lang.backgroundColor, color: lang.color }}
          >
            {lang.name}
          </span>
        ))}
      </section>
      <section className="guess-el">
        {currentWord.split("").map((letter, index) => (
          <span key={index} className="word-guess">
            {letter.toUpperCase()}
          </span>
        ))}
      </section>
      <section onClick={handleLetterClick} className="alphabet-buttons">
        {alphabet.split("").map((char) => {
          const isGuessed = guessLetters.includes(char);
          const isCorrect = isGuessed && currentWord.includes(char);
          const isWrong = isGuessed && !currentWord.includes(char);

          
          return (
            <button
              onClick={() => handleLetterClick(char.toUpperCase())}
              key={char}
              className="char-btn"
            >
              {char.toUpperCase()}
            </button>
          );
        })}
      </section>
      <button className="new-game-btn">New Game</button>
    </main>
  );
};

export default App;
