import { useState, type JSX} from "react";

import styles from './FlagGuessing.module.css';
import Button from "../ui/Button";

/**
 * Renders the current flag, an input field and a button to submit the guess.
 * 
 * Props:
 * @param {string} props.flagUrl - URL of the curent flag's image.
 * @param {(string)=>void} props.onGuess - Function to inform the parent component of the user's guess.
 * @returns {JSX.Element} A rendered element that allows the user to guess a displayed flag's name.
 */
function FlagGuessingForm({flagUrl="https://flagcdn.com/w320/be.png", onGuess}: {
    flagUrl: string, onGuess: (guess:string)=>void
}): JSX.Element {

    const [nameInput, setNameInput] = useState("");
    
    return (
        <>
            <form
            onSubmit={(e) => {
                e.preventDefault();
                onGuess(nameInput);
            }}>
                <img
                    className={styles.flag}
                    src={flagUrl}
                    alt="Flag to guess"
                />

                <label htmlFor="flagNameInput" className="sr-only">Country name</label>
                <div className={styles.inputWrapper}>
                    <input
                        type="text"
                        id="flagNameInput"
                        className={styles.flagNameInput}
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        autoFocus
                    />
                    <Button
                        type="submit"
                    >Guess</Button>
                </div>
            </form>
        </>
    );
}

export default FlagGuessingForm;