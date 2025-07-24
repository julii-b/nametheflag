import type { JSX } from "react";
import styles from "./InfoWindow.module.css";

/**
 * Info-window that shows information about the project.
 * 
 * Props:
 * @param {()=>void} props.onClose - Function to inform the parent element, that the window should be closed.
 * @returns {JSX.Element}
 */
function InfoWindowInfo({onClose}: {onClose: ()=>void}): JSX.Element {
    return (
        <div className={styles.infoWindow}>
            <button
                className={styles.xButton} 
                onClick={onClose}
                aria-label="Close information window."
            >⨉</button>
            <p>
                This is a fun little project by Julius Busch.<br/>
                The project uses the <a href="https://flagcdn.com/">Flags API & CDN</a> by <a href="https://flagpedia.net/">Flagpedia.net</a> to get all current country flags of the world.<br/>
                To ensure accurate name matching, it also uses the <a href="https://restcountries.com/">REST Countries API</a> to get the official and short country names in up to 27 languages.
                
            </p>
        </div>
    );
}

export default InfoWindowInfo;