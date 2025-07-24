import React, { useEffect } from 'react';

/**
 * Component that adds the following behaviour: Automatically centers an element, when a child input or textarea element is focused.
 * 
 * Props:
 * @param {React.RefObject} props.targetRef - Ref to the element on which this behaviour should apply.
 * @returns {null}
 */
function ScrollIntoViewOnKeyboard({targetRef}: {targetRef: React.RefObject<HTMLDivElement|null>}): undefined {

    // Repeat this on every re-render of the tagetRef:
    useEffect(() => {
        // Event hanlder for focus:
        const handleFocusIn = (event: FocusEvent) => {
            const activeElement = event.target as HTMLElement;

            // Don't proceed if the focused element is an input or textarea element:
            if (!activeElement || !['INPUT', 'TEXTAREA'].includes(activeElement.tagName)) return;

            // Scroll after a delay to wait for the keyboard animation:
            setTimeout(() => {
                targetRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });
            }, 300);
        };

        // Add event listener to targetRef:
        targetRef.current?.addEventListener('focusin', handleFocusIn);
        return () => targetRef.current?.removeEventListener('focusin', handleFocusIn);
    }, [targetRef]);

    return;
}

export default ScrollIntoViewOnKeyboard;