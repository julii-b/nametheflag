import { useEffect, type JSX } from "react";

import styles from './FlagGuessing.module.css';

/**
 * Renders the current flag, the flag's name and the result of the previous guess.
 * 
 * @param {string} props.flagName - Name to be displayed for the current flag.
 * @param {string} props.flagUrl - The URL of the current flag's immage.
 * @param {boolean} props.success - Indicates, if the flag guess, for which the result is shown, was a success or not.
 * @param {()=>void} props.onNext - Function to inform the parent component, that the result has been shown and the parent component should proceed to the next step.
 * @returns {JSX.Element} - A rendered element, that shows the result of a previous guess.
 */
function FlagGuessingResult({flagName, flagUrl, success, onNext}:
    {flagName: string, flagUrl: string, success: boolean, onNext: ()=>void}
): JSX.Element {
    
    // Timout function to call the onNext() function after 800ms:
    useEffect(()=>{
        const timeoutId = setTimeout(() => {
            onNext();
        }, 800);
        return () => clearTimeout(timeoutId);
    }, []);

    if (success) {
        return (
            <>
                <div className={styles.posScoreChange}><div>+100 :)</div></div>
                <img
                    className={styles.flag}
                    src={flagUrl}
                    alt={"Flag of " + flagName + "."}
                />
                <h1 className={styles.flagNameCorrect} >{flagName}</h1>
            </>
        );
    } else {
        return (
            <>
                <div className={styles.overlayWrong}></div>
                <div className={styles.noScoreChange}><div>+0 :(</div></div>
                <img
                    className={styles.flag}
                    src={flagUrl}
                    alt={"Flag of " + flagName + "."}
                />
                <h1 className={styles.flagNameWrong} >{flagName}</h1>
                
            </>
        );
    }
};

export default FlagGuessingResult;