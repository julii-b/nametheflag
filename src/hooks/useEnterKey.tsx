import { useEffect } from 'react';

/**
 * Executes a calback function when the enter key is pressed.
 * 
 * @param callback Function that is executed when the enter key is pressed.
 */
function useEnterKey(callback: ()=>void) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                callback();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [callback]);
}

export default useEnterKey;