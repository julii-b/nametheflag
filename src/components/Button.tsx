import type React from 'react';
import styles from './Button.module.css';
import type { JSX } from 'react';

/**
 * Custom button component.
 * 
 * Props:
 * @param {React.ButtonHTMLAttributes} props - Props of the custom button component
 * @param {React.ReactNode} props.children - Children of the custom button component
 * @returns {JSX.Element}
 * 
 * @example
 * <Button onClick={() => alert('Clicked!')}>Click me</Button>
 */
function Button({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element {
    return <button {...props} className={`${styles.button} ${className ?? ''}`.trim()}>{children}</button>;
}

export default Button;