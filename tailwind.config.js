const { s } = require('framer-motion/client');

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#0A68FF", // اللون الأساسي
                primary_light: "#4D8CFF",   // درجة أفتح
                primary_dark: "#084FCC",    // درجة أغمق
                primary_soft: "#E6F0FF",     // خلفية أو لون ثانوي فاتح
                secondary: "#FF6B0A", // اللون الثانوي
                secondary_light: "#FF9A4D", // درجة أفتح    
                secondary_dark: "#CC5A08",  // درجة أغمق
                secondary_soft: "#FFF0E6",  // خلفية أو لون ثانوي
                background: "#F7F2DD", // لون الخلفية
                background_dark: "#1A1A1A", // لون الخلفية الداكن
                text_primary: "#333333", // لون النص الأساسي
                
            },
            fontFamily: {
                noto: ['"Noto Sans"', 'sans-serif'],
                'noto-arabic': ['"Noto Sans Arabic"', 'sans-serif'],
                cairo: ['Cairo', 'sans-serif'],
            },
            textShadow: {
                sm: "1px 1px 2px rgba(0,0,0,0.25)",
                DEFAULT: "2px 2px 4px rgba(0,0,0,0.3)",
                lg: "3px 3px 6px rgba(0,0,0,0.35)",
                xl: "4px 4px 8px rgba(0,0,0,0.4)"
            }
        },
    },
    plugins: [
        function ({ addUtilities, theme }) {
            const shadows = theme("textShadow");
            const utilities = Object.entries(shadows).map(([key, value]) => {
                const className = key === "DEFAULT" ? ".text-shadow" : `.text-shadow-${key}`;
                return { [className]: { textShadow: value } };
            });
            addUtilities(utilities, ["responsive", "hover"]);
        }
    ],
};
