import React from "react";
import { languages } from "./languageData";

export default function Languages(props) {
    return (
        <div className="languages">
            {languages.map((lang, index) => {
                const isLangLost = index < props.wrongGuessCount
                return (
                    <span className={`chip ${isLangLost ? "lost" : ""}`} style={{backgroundColor: lang.backgroundColor, color: lang.color}} key={lang.name}>{lang.name}</span>
                )
                }
            )}
        </div>
    );
}