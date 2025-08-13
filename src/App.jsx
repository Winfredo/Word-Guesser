import React from "react";
import "./App.css";
import Data from "./data";
import { words } from "./words";
import Confetti from "react-confetti";

const randomIndex = Math.floor(Math.random() * words.length);
const currentGuessedWord = words[randomIndex];

const App = () => {
  const [currentWord, setCurrentWord] = React.useState(currentGuessedWord);
  console.log(currentWord);
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const [guessLetters, setGuessLetters] = React.useState([]);

  const wrongGuessCount = guessLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;
  const isGameLost = wrongGuessCount >= Data.length - 1;
  const isGameWon = currentWord
    .split("")
    .every((letter) => guessLetters.includes(letter));
  const isGameOver = isGameWon || isGameLost;

  console.log(wrongGuessCount);

  function resetGame() {
    setCurrentWord(words[Math.floor(Math.random() * words.length)]);
    setGuessLetters([]);
  }

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

      {/* Game status section */}
      <div className="game-status">
        <section className={isGameWon ? "win-status" : "lose-status"}>
          {isGameOver ? (
            <>
              <h2>{isGameWon ? "You win!" : "Game Over!"}</h2>
              <p>
                {isGameWon
                  ? "Well done! 🎉"
                  : `You lose! Better start learning Assembly 😭 `}
              </p>
              {isGameWon && <p>Congratulations! You guessed the word!</p>}
              {isGameLost && (
                <p>{`The word was: ${currentWord.toUpperCase()}`}</p>
              )}
            </>
          ) : null}
        </section>
      </div>

      {/* Language chips section */}
      <section className="language-chips">
        {Data.map((lang, index) => {
          const guessChecker = index < wrongGuessCount;
          console.log(guessChecker);
          return (
            <span
              className={`chip ${guessChecker ? "lost" : ""}`}
              key={lang.name}
              style={{
                backgroundColor: lang.backgroundColor,
                color: lang.color,
              }}
            >
              {lang.name}
            </span>
          );
        })}
      </section>

      {/* Guess word section */}
      <section className="guess-el">
        {currentWord.split("").map((letter, index) => (
          <span key={index} className="word-guess">
            {guessLetters.includes(letter) ? letter.toUpperCase() : ""}
          </span>
        ))}
      </section>

      {/* Alphabet Buttons */}
      <section className="alphabet-buttons">
        {alphabet.split("").map((letter) => {
          const isGuessed = guessLetters.includes(letter);
          const isCorrect = isGuessed && currentWord.includes(letter);
          const isWrong = isGuessed && !currentWord.includes(letter);

          return (
            <button
              className={`char-btn ${
                isCorrect ? "correct" : isWrong ? "wrong" : "char-btn"
              }`}
              key={letter}
              onClick={() => handleLetterClick(letter)}
              disabled={isGameOver}
            >
              {letter.toUpperCase()}
            </button>
          );
        })}
      </section>
      {isGameOver ? (
        <button onClick={resetGame} className="new-game-btn">
          New Game
        </button>
      ) : null}
      {isGameWon && <Confetti />}
    </main>
  );
};

export default App;
