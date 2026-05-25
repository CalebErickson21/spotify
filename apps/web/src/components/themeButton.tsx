// Import dependencies

// Import svgs
import Sun from '../assets/images/sun.svg?react';
import Moon from '../assets/images/moon.svg?react';
import { useEffect } from 'react';

// Theme button component
const ThemeButton = () => {

    // Get theme from system settings on mount
    useEffect(() => {
        const root = document.documentElement;
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (systemTheme) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, []);

    // Toggle theme class on root element
    function toggleTheme() {
        const root = document.documentElement;
        const isDark = root.classList.contains('dark');

        if (isDark) {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    }

    return (
        <button
            className="
            px-2 py-1 rounded-lg cursor-pointer
            bg-dark-background dark:bg-light-background
            transition duration-300 ease-in-out
            "
            onClick={toggleTheme}
        >
            {/* Light theme icon */}
            <Sun 
                className="w-4 h-4 m-0 p-0 hidden dark:block" 
                style={{ 
                    fill: '#212529',
                    stroke: '#212529',
                    strokeWidth: '0.75',
                    filter: 'drop-shadow(0 0 0.5px currentColor)'
                }} 
            />

            {/* Dark theme icon */}
            <Moon 
                className="w-4 h-4 m-0 p-0 dark:hidden" 
                style={{ 
                    fill: '#F8F9FA',
                    filter: 'drop-shadow(0 0 0.5px currentColor)'
                }} 
            />
        </button>
    )
}

// Export component
export default ThemeButton;