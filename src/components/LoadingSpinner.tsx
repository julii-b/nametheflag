import type { JSX } from 'react';
import styles from './LoadingSpinner.module.css';

/**
 * Reusable loading spinner
 * @returns {JSX.Element}
 */
function LoadingSpinner(): JSX.Element{
    return (
        <picture>
            <source srcSet="./loadingSpinner.webp" type="image/webp" />
            <img className={styles.spinner}  src="./loadingSpinner.png" alt="loading" />
        </picture>
    );
}

export default LoadingSpinner;