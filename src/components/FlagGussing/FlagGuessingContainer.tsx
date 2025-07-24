import React, {useEffect, useState, useRef, type JSX} from 'react';
import {distance} from 'fastest-levenshtein';

import styles from './FlagGuessing.module.css';
import type {Flag} from './../../types';
import preloadImages from '../../utility/preloadImages';
import FlagGuessingForm from './FlagGuessingForm';
import FlagGuessingResult from './FlagGuessingResult';

/**
 * Main component for the flag guessing game itself.
 *
 * Handles the game loop, score logic, and guess evaluation.
 * Uses Levenshtein distance to compare user input with valid country names.
 * Displays either the guessing form or the result screen depending on the game state.
 *
 * Props:
 * @param {Flags[]|null} props.flags - Array of Flag objects, which include the flag's URL and names.
 * @param {[number, React.Dispatch<React.SetStateAction<number>>]} props.scoreState - Tuple from useState() for the score, created by the parent component.
 * @param {()=>void} props.onEndGuessing - Function to call, to inform the parent component, that the game ended.
 * 
 * @returns {JSX.Element} A rendered flag guessing game.
 */
function FlagGuessingContainer({flags, scoreState, onEndGuessing}: {
    flags: Flag[]|null, scoreState: [number, React.Dispatch<React.SetStateAction<number>>], onEndGuessing: ()=>void}
): JSX.Element {
    
    // Variables to tweak the game:
    const flagsPerRound = 10;
    const initialScore = 99;
    const scoreReductionRate = 250;
    const pointsForCorrectFlag = 100;
    
    // States:
    const [step, setStep] = useState<"guessFlag"|"showResult">("guessFlag");
    const [score, setScore] = scoreState;
    const [flagIteration, setFlagIteration] = useState<number>(0);
    const [wasSuccess, setWasSuccess] = useState(true);
    
    // Score-timer functions to decrease score while time passes, is automatically startet at the beginning:
    const scoreIntervalId = useRef<number|null>(null);
    const startScoreTimer = () => { // function to start the timer, which decreases the score over time untill it reachs 0
        if (scoreIntervalId.current == null) {
            scoreIntervalId.current = setInterval( () => {
                setScore((score) => {
                    if (score > 0) return score-1;
                    else return 0;
                })
            }, scoreReductionRate);
        }
    };
    const stopScoreTimer = () => { // function to stop the timer
        if (scoreIntervalId.current != null) clearInterval(scoreIntervalId.current);
        scoreIntervalId.current = null;
    };
    useEffect(() => { // starts the timer on the first render
        setScore(initialScore);
        startScoreTimer();
        return stopScoreTimer;
    }, []);

    
    if (flags != null && flags.length >= flagsPerRound) { // Check if enough flags are available for the game to prevent errors

        // After guess was submitted: Check for success with Levenshtein algorithm:
        const handleGuess = (guess: string): void =>  {
            stopScoreTimer();
            for (let flagName of flags[flagIteration]['names']) { // iterate through all flag names
                const minDistance = Math.max(0, Math.min(3, flagName.length - 2)); // required distance is 3, but max flagName.length-2 (to handle country codes)
                if(distance(flagName.toLowerCase(), guess.toLowerCase()) <= minDistance) {
                    setWasSuccess(true);
                    setScore(score => score+pointsForCorrectFlag);
                    setStep("showResult");
                    return;
                }
            }
            setWasSuccess(false);
            setStep("showResult");
        };

        // Show next flag after result screen is finished:
        const handleNext = (): void => {
            const nextIteration = flagIteration+1;
            if (nextIteration < flagsPerRound){
                setFlagIteration(nextIteration);
                startScoreTimer();
                setStep("guessFlag");
            } else {
                // Go back to main screen:
                onEndGuessing();
            }
        };

        // Preload the needed flag images, to prevent delays during the game:
        preloadImages(flags.slice(0, flagsPerRound).map(flag => flag.url));

        // Render flag count and score, render appropriate child component for the current state:
        return (
            <>
                <div className={styles.flagCounter}>{flagIteration+1}/{flagsPerRound}</div>
                <div className={styles.score} > {score} </div>
                
                {step == "guessFlag" && (
                <FlagGuessingForm
                    flagUrl={flags[flagIteration].url}
                    onGuess={handleGuess}
                />
                )}
                {step == "showResult" && (
                <FlagGuessingResult
                    flagName={flags[flagIteration].commonName}
                    flagUrl={flags[flagIteration].url}
                    success={wasSuccess}
                    onNext={handleNext}
                />
                )}
            </>
        );

    }

    // If the flag data is not sufficient:
    return <div>An error occured while rendering the FlagGuessingComponent.</div>
}

export default FlagGuessingContainer;