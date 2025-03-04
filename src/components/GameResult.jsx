import React from "react";
import clsx from "clsx";
import { getFarewellText } from "./utils";
import { languages } from "./languageData";

export default function Result({ isGameOver, isGameWon, isGameLost, isLastGuessIncorrect, wrongGuessCount, currentWord }) {
    const gameStatusClass = clsx("game-result", {
        won: isGameWon,
        lost: isGameLost,
        farewell: !isGameOver && isLastGuessIncorrect
    })
    function renderGameStatus() {


        if (!isGameOver && isLastGuessIncorrect) {
            return (
                <p>
                    {getFarewellText(languages[wrongGuessCount - 1].name)}
                </p>
            )
        }

        if (isGameWon) {
            return (
                <>
                    <h1>Congratulations You Won!</h1>
                    <p>You've successfully guessed the right word</p>
                </>
            )
        }
        if(isGameLost) {
            return (
                <>
                    <h1>Game Over!</h1>
                    <h3>Correct Answer is {currentWord}</h3>
                    <p>You lose! Better start learning assembly</p>
                </>
            )
        } else {
            return null
        }
    }
    return (
        <section className={gameStatusClass}>
            {renderGameStatus()}
        </section>
    );
}