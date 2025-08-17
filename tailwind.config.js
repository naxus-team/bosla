const { s } = require('framer-motion/client');

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            boxShadow: {
                'shadow-top-xl': '0 -16px 40px rgba(0,0,0,0.15)', // ظل للأعلى قوي
                'shadow-top-lg': '0 -10px 24px rgba(0,0,0,0.16)', // أقل شوية
                'shadow-gray_inset': '0 0 0 2px inset rgba(77,77,77,1)', // ظل رمادي داخلي
                'shadow-gray_dark_inset': '0 0 0 2px rgba(77,77,77,1)', // ظل رمادي داكن داخلي
                'shadow-secondary_inset': '0 0 0 2px rgba(255,94,58,1)', // ظل ثانوي داخلي
                'shadow-secondary_soft': '0 0 0 2px rgba(255,94,58,0.1)', // ظل ثانوي ناعم
                'shadow-secondary_soft_dark': '0 0 0 2px rgba(255,94,58,0.2)', // ظل ثانوي ناعم داكن
                'shadow-primary_inset': '0 0 0 2px rgba(10,104,255,1)', // ظل أساسي داخلي
                'shadow-primary_soft': '0 0 0 2px rgba(10,104,255,0.1)', // ظل أساسي ناعم
                'shadow-primary_soft_dark': '0 0 0 2px rgba(10,104,255,0.2)', // ظل أساسي ناعم داكن
                'shadow-white_inset': '0 0 0 2px rgba(255,255,255,1)', // ظل أبيض داخلي
                'shadow-white_soft': '0 0 0 2px rgba(255,255,255,0.1)', // ظل أبيض ناعم
                'shadow-white_soft_dark': '0 0 0 2px rgba(255,255,255,0.2)', // ظل أبيض ناعم داكن
                'shadow-black_inset': '0 0 0 2px rgba(0,0,0,1)', // ظل أسود داخلي
                'shadow-black_soft': '0 0 0 2px rgba(0,0,0,0.1)', // ظل أسود ناعم
                'shadow-black_soft_dark': '0 0 0 2px rgba(0,0,0,0.2)', // ظل أسود ناعم داكن


            },
            colors: {
                primary: "#0A68FF",       // اللون الأساسي
                primary_light: "#4D8CFF", // درجة أفتح
                primary_dark: "#084FCC",  // درجة أغمق
                primary_soft: "#E6F4FF",  // لون خلفية أو لون ثانوي فاتح للأزرق
                gray: "#E0E0E0",          // رمادي فاتح نظيف
                gray_dark: "#4D4D4D",     // رمادي للنصوص
                secondary: "#FF5E3A",     // اللون الثانوي زي ما هو
                secondary_light: "#FF9A4D", // درجة أفتح للثانوي
                secondary_dark: "#CC5A08",  // درجة أغمق للثانوي
                secondary_soft: "#FFF5F0",  // خلفية أو لون ثانوي فاتح
                background: "#F7F9FC",     // خلفية رايقة ونظيفة
                background_dark: "#1A1A1A", // خلفية داكنة للـ Dark Mode
                text_primary: "#222222",   // لون النص الأساسي، ناعم على الخلفية الفاتحة
                text_secondary: "#666666", // نص ثانوي للـ labels أو وصف صغير
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
