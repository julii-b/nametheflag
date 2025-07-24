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


            <div className={styles.scrollableArea}>
                <p>
                    This is a fun little project built with React.<br />
                    I love learning about flags and wanted to build something fun that combines my interest in flags with my interest in frontend development.
                </p>

                <p>
                    GitHub Repository: <a href="https://github.com/julii-b/nametheflag" target="_blank" rel="noopener noreferrer"> github.com/julii-b/nametheflag </a>
                </p>

                <h3>🎯 About the Game</h3>
                <p>
                    nametheflag tests your knowledge of the flags of the world. You are shown a random flag and you have to guess the country name as quickly as possible. It has the following features:
                </p>
                <ul>
                    <li>⛳ Fast rounds and immediate feedback.</li>
                    <li>🌍 Checks the country names in 26 languages.</li>
                    <li>🎉 Local high score based on the number of correct guesses and needed time.</li>
                    <li>📱 Responsive design.</li>
                </ul>

                <h3>🛠️ Tech Stack</h3>
                <ul>
                    <li><strong>Framework:</strong> React</li>
                    <li><strong>Language:</strong> TypeScript</li>
                    <li><strong>Build Tool:</strong> Vite</li>
                    <li><strong>Styling:</strong> CSS Modules</li>
                    <li><strong>3rd party APIs:</strong>
                        <ul>
                            <li><a href="https://flagcdn.com/" target="_blank" rel="noopener noreferrer">Flags API & CDN</a> by <a href="https://flagpedia.net/" target="_blank" rel="noopener noreferrer">Flagpedia.net</a></li>
                            <li><a href="https://restcountries.com/" target="_blank" rel="noopener noreferrer">REST Countries API</a> for country names in 26 languages</li>
                        </ul>
                    </li>
                </ul>
            </div>


        </div>
    );
}

export default InfoWindowInfo;