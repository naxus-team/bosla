/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                noto: ['"Noto Sans"', 'sans-serif'],
                'noto-arabic': ['"Noto Sans Arabic"', 'sans-serif'],

            },
        },
    },
    plugins: [],
};
