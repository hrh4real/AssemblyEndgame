import React from "react";
import { useState, useRef, useEffect } from "react";
import ReactConfetti from "react-confetti";
import Heading from "./src/components/Heading";
import Keyboard from "./src/components/Keyboard";
import NewGame from "./src/components/NewGame";
import Languages from "./src/components/Languages";
import Result from "./src/components/GameResult";
import { languages } from "./src/components/languageData";
import { getRandomWord } from "./src/components/utils";

export default function App() {
    const [currentWord, setCurrentWord] = useState(() => getRandomWord());
    const [guessedLetter, setGuessedLetter] = useState([]);
    const [gameOver, setGameOver] = useState(false);

    const wrongGuessCount = guessedLetter.filter(letter => !currentWord.includes(letter)).length;
    const isLastGuessIncorrect = guessedLetter[guessedLetter.length - 1] && !currentWord.includes(guessedLetter[guessedLetter.length - 1]);
    const isGameWon = [...currentWord].every(letter => guessedLetter.includes(letter)) && wrongGuessCount < 8
    const isGameLost = wrongGuessCount >= languages.length - 1
    const isGameOver = isGameLost || isGameWon;
    const wordDisplay = [...currentWord].map((letter, index) => (
        <span key={index}>
            {guessedLetter.includes(letter) ? letter.toUpperCase() : "_"}
        </span>
    ))

    function addGuessedLetter(letter) {
        setGuessedLetter(prevLetters => 
            prevLetters.includes(letter) ?
                prevLetters :
                [...prevLetters, letter]
        )
    }

    function startNewGame() {
        setCurrentWord(getRandomWord())
        setGuessedLetter([])
    }

    useEffect(() => {
            const handleKeyDown = (event) => {
                if (event.key === 'Enter' && isGameOver) {
                    const newGameButton = document.querySelector('.new-game');
                    if (newGameButton) {
                        newGameButton.click();
                    }
                }
            };
            window.addEventListener('keydown', handleKeyDown);
            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            }
        }, [isGameOver]);
    
    return (
        <main>
            {
                isGameWon &&
                <ReactConfetti
                    recycle={false}
                    numberOfPieces={1000}
                />
            }
            <Heading />
            <Result
                isGameLost={isGameLost}
                isGameWon={isGameWon}
                isGameOver={isGameOver}
                isLastGuessIncorrect={isLastGuessIncorrect}
                wrongGuessCount={wrongGuessCount}
                currentWord={currentWord}
            />
            <Languages
                wrongGuessCount={wrongGuessCount}
            />
            <div className="word-display-container">
                {wordDisplay}
            </div>
            <Keyboard
                onClick={addGuessedLetter}
                guessedLetter={guessedLetter}
                currentWord={currentWord}
                isGameOver={isGameOver}
            />
            {isGameOver && <NewGame onClick={startNewGame} />}
        </main>
    )
}