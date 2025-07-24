import Button from "./ui/Button";
import styles from './FinalScoreScreen.module.css'
import useEnterKey from "../hooks/useEnterKey";

import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import type { JSX } from "react";

/**
 * Shows the result of a game, after the game is over.
 * 
 * Props:
 * @param {number} props.finalScore - Final score from the previous game.
 * @param {number} props.highScore - Overall high score from all games.
 * @param {()=>void} props.onStart - Function to inform the parent component, that a new game should be started.
 * @returns {JSX.Element}
 */
function FinalScoreScreen({finalScore, highScore, onStart}: {
    finalScore: number, highScore: number|undefined, onStart: () => void 
}): JSX.Element {

    useEnterKey(onStart);

    // Possible titles of the screen, ordered from negative to positive:
    const titles = [
        "Better luck next time!",
        "Meh :/",
        "Okay",
        "It's okay",
        "Good!",
        "Yaaay!",
        "Awesome!", 
        "Congratu"+"\u00AD"+"alations!",
        "Impressive!",
        "Absolutely amazing!",
        "You're crazy good!",
        "You're the master of flags!"
    ];
    // Select title According to the score (lower score -> lower index):
    const maxScoreRange = 950;
    const scoreSteps = (maxScoreRange / (titles.length-1));
    const titleIndex = Math.min(Math.floor(finalScore / scoreSteps), titles.length-1);
    const title = titles[titleIndex];

    const {width, height} = useWindowSize()

    return (
        <>
            {finalScore >= 300 &&
                <Confetti
                    width={width-1}
                    height={height-1}
                    recycle={false}
                />
            }

            <div className={styles.finalScoreWrapper}>
                <h1 className={styles.title}>{title}</h1>
                <span className={styles.finalScoreLabel}>final score: </span>
                <span className={styles.finalScoreValue}>{finalScore}</span>
                <br/>
                <span className={styles.highScoreLabel}>local high score: </span>
                <span className={styles.highScoreValue}>{highScore}</span>
                <br/>
            </div>
            <Button onClick={onStart} aria-label="Start new game.">Here we go again...</Button>
        </>
    );
}

export default FinalScoreScreen;