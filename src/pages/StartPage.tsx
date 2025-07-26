import type { JSX } from 'react';
import styles from './StartPage.module.css';
import Button from "../components/Button";
import useEnterKey from '../hooks/useEnterKey';

/**
 * Renders the logo of the game and has a button to start a game. Is used when initially loading the page.
 * 
 * Props:
 * @param {()=>void} props.onStart - Function to inform the parent component, that the game should be started.
 * @returns {JSX.Element}
 */
function StartScreen({onStart}: {onStart: () => void }): JSX.Element {

    useEnterKey(onStart);

    return (
        <div className={styles.startScreenWrapper}>
            <picture>
                <source srcSet="logo.webp" type="image/webp" />
                <img className={styles.logo}  src="logo.png" alt="name the flag logo" />
            </picture>
            <h1 className={styles.gameName}>nametheflag</h1>
            <Button onClick={onStart} aria-label="Start game.">Okaaay let's go!</Button>
        </div>
    );
}

export default StartScreen;