const { s } = require('framer-motion/client');

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            boxShadow: {
                'top-xl': '0 -4px 8px rgba(26, 26, 26, 0.04), 0 -2px 4px rgba(0, 0, 0, 0.025)',
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
                primary: "rgba(238, 15, 56)",     // اللون الأساسي (أحمر مشبع)
                primary_5: "rgba(238, 15, 56, .5)",     // اللون الأساسي (أحمر مشبع)

                primary_light: "#FF4D6D",         // أفتح بلمسة وردية
                primary_dark: "#B20028",          // أغمق (أحمر نبيتي غامق)
                primary_soft: "#FFE6EB",          // خلفية فاتحة ناعمة بدرجة وردية

                gray: "#EEEEEE",                  // رمادي فاتح نظيف
                gray_dark: "#4D4D4D",             // رمادي للنصوص

                secondary: "#FF9A76",             // برتقالي دافئ (مكمل للأحمر)
                secondary_light: "#F75557",       // أفتح للثانوي
                secondary_dark: "#CC5E00",        // أغمق للثانوي
                secondary_soft: "#FFF4E6",        // خلفية فاتحة دافئة

                background: "rgba(255, 255, 255, 1)",            // أبيض شبه صافي للخلفيات
                background_dark: "#1A1A1A",       // خلفية داكنة للـ Dark Mode

                text_primary: "#222222",          // أساسي للنص
                text_secondary: "#666666",        // ثانوي
            },

            fontFamily: {
                noto: ['"Noto Sans"', 'sans-serif'],
                'noto-arabic': ['"Noto Sans Arabic"', 'Noto Sans'],
                cairo: ['Cairo', 'sans-serif'],
                changa: ['Changa', 'sans-serif'],
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
