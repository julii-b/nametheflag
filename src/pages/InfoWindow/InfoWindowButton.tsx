import type { JSX } from "react";
import styles from "./InfoWindow.module.css";

/**
 * Button that opens the info-window.
 * 
 * Props:
 * @param {()=>void} props.onOpen - Function to inform the parent component, that the window should be opened.
 * @returns {JSX.Element}
 */
function InfoWindowButton({onOpen}: {onOpen: ()=>void}): JSX.Element {
    return (
        <button
            className={styles.iButton}
            onClick={onOpen}
            aria-label="Show information about this project."
        >i</button>
    );
}

export default InfoWindowButton;