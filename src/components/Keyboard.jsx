import React from "react";
import { useEffect } from "react";
import clsx from "clsx";

export default function Keyboard(props) {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    return (
        <section className="keyboard-container">
            {letters.map(letter => {
                const isGuessed = props.guessedLetter.includes(letter)
                const isCorrect = isGuessed && props.currentWord.includes(letter)
                const isWrong = isGuessed && !props.currentWord.includes(letter)
                const className = clsx({
                    correct: isCorrect,
                    wrong: isWrong
                })
                return (
                    <button
                        className={className}
                        key={letter}
                        onClick={() => props.onClick(letter)}
                        disabled={props.isGameOver}
                        aria-disabled={props.guessedLetter.includes(letter)}
                    >
                        {letter}
                    </button>
                );
            })}
        </section>
    );
}