import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            colors: {
                primary: {
                    600: '#2b6cb0',
                    700: '#2c5282',
                },
                warning: {
                    50: '#fff8f1',
                    100: '#feecdc',
                    200: '#fcd9bd',
                    300: '#fdba8c',
                    400: '#ff8a4c',
                    500: '#ff5a1f',
                    600: '#d03801',
                    700: '#b43403',
                    800: '#8a2c0d',
                    900: '#73230d',
                },
                danger: {
                    100: '#fff5f5',
                    200: '#fed7d7',
                    300: '#feb2b2',
                    400: '#fc8181',
                    500: '#f56565',
                    600: '#e53e3e',
                    700: '#c53030',
                    800: '#9b2c2c',
                    900: '#742a2a',
                },
                neutral: {
                    50: '#f9fafb',
                    100: '#f4f5f7',
                    200: '#e5e7eb',
                    300: '#d2d6dc',
                    400: '#9fa6b2',
                    500: '#6b7280',
                    600: '#4b5563',
                    700: '#374151',
                    800: '#252f3f',
                    900: '#161e2e',
                },
            },
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [require('daisyui'), forms],

    daisyui: {
        themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
        darkTheme: "light", // name of one of the included themes for dark mode
        base: true, // applies background color and foreground color for root element by default
        styled: true, // include daisyUI colors and design decisions for all components
        utils: true, // adds responsive and modifier utility classes
        prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
        logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
        themeRoot: ":root", // The element that receives theme color CSS variables
    },
};
