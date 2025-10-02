function rgbaToHexWithBackground(rgba: string, bg = [255, 255, 255]) {
    const m = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),\s*([0-9.]+)\)/);
    if (!m) return rgba;
    const r = Math.round(parseInt(m[1]) * parseFloat(m[4]) + bg[0] * (1 - parseFloat(m[4])));
    const g = Math.round(parseInt(m[2]) * parseFloat(m[4]) + bg[1] * (1 - parseFloat(m[4])));
    const b = Math.round(parseInt(m[3]) * parseFloat(m[4]) + bg[2] * (1 - parseFloat(m[4])));
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}


function makeHexShadesNoAlpha(color: { [key: number]: string }) {
    const hex: { [key: number]: string } = {};
    for (let i = 1; i <= 10; i++) {
        hex[i] = rgbaToHexWithBackground(color[i]);
    }
    return hex;
}

export const colors = {
    transparent: "rgba(0,0,0,0.0)",

    black: {
        0: "rgba(0,0,0,0)",
        1: "rgba(0,0,0,0.1)",
        2: "rgba(0,0,0,0.2)",
        3: "rgba(0,0,0,0.3)",
        4: "rgba(0,0,0,0.4)",
        5: "rgba(0,0,0,0.5)",
        6: "rgba(0,0,0,0.6)",
        7: "rgba(0,0,0,0.7)",
        8: "rgba(0,0,0,0.8)",
        9: "rgba(0,0,0,0.9)",
        10: "rgba(0,0,0,1)",
        hex: {} as { [key: number]: string },
    },

    white: {
        0: "rgba(255,255,255,0.0)",
        1: "rgba(255,255,255,0.1)",
        2: "rgba(255,255,255,0.2)",
        3: "rgba(255,255,255,0.3)",
        4: "rgba(255,255,255,0.4)",
        5: "rgba(255,255,255,0.5)",
        6: "rgba(255,255,255,0.6)",
        7: "rgba(255,255,255,0.7)",
        8: "rgba(255,255,255,0.8)",
        9: "rgba(255,255,255,0.9)",
        10: "rgba(255,255,255,1)",
        hex: {} as { [key: number]: string },
    },

    blue: {
        1: "rgba(0,31,63,0.1)",
        2: "rgba(0,31,63,0.2)",
        3: "rgba(0,31,63,0.3)",
        4: "rgba(0,31,63,0.4)",
        5: "rgba(0,31,63,0.5)",
        6: "rgba(0,31,63,0.6)",
        7: "rgba(0,31,63,0.7)",
        8: "rgba(0,31,63,0.8)",
        9: "rgba(0,31,63,0.9)",
        10: "rgba(0,31,63,1)",
        hex: {} as { [key: number]: string },
    },

    red: {
        1: "rgba(220,53,69,0.1)",
        2: "rgba(220,53,69,0.2)",
        3: "rgba(220,53,69,0.3)",
        4: "rgba(220,53,69,0.4)",
        5: "rgba(220,53,69,0.5)",
        6: "rgba(220,53,69,0.6)",
        7: "rgba(220,53,69,0.7)",
        8: "rgba(220,53,69,0.8)",
        9: "rgba(220,53,69,0.9)",
        10: "rgba(220,53,69,1)",
        hex: {} as { [key: number]: string },
    },

    green: {
        1: "rgba(40,167,69,0.1)",
        2: "rgba(40,167,69,0.2)",
        3: "rgba(40,167,69,0.3)",
        4: "rgba(40,167,69,0.4)",
        5: "rgba(40,167,69,0.5)",
        6: "rgba(40,167,69,0.6)",
        7: "rgba(40,167,69,0.7)",
        8: "rgba(40,167,69,0.8)",
        9: "rgba(40,167,69,0.9)",
        10: "rgba(40,167,69,1)",
        hex: {} as { [key: number]: string },
    },

    yellow: {
        1: "rgba(255,193,7,0.1)",
        2: "rgba(255,193,7,0.2)",
        3: "rgba(255,193,7,0.3)",
        4: "rgba(255,193,7,0.4)",
        5: "rgba(255,193,7,0.5)",
        6: "rgba(255,193,7,0.6)",
        7: "rgba(255,193,7,0.7)",
        8: "rgba(255,193,7,0.8)",
        9: "rgba(255,193,7,0.9)",
        10: "rgba(255,193,7,1)",
        hex: {} as { [key: number]: string },
    },

    primary: {
        1: "rgba(238,15,56,0.1)",
        2: "rgba(238,15,56,0.2)",
        3: "rgba(238,15,56,0.3)",
        4: "rgba(238,15,56,0.4)",
        5: "rgba(238,15,56,0.5)",
        6: "rgba(238,15,56,0.6)",
        7: "rgba(238,15,56,0.7)",
        8: "rgba(238,15,56,0.8)",
        9: "rgba(238,15,56,0.9)",
        10: "rgba(238,15,56,1)",
        hex: {} as { [key: number]: string },
    },
    secondary: "rgba(245,166,35,1)",
    background: "rgba(255,255,255,1)",
    text: "rgba(51,51,51,1)",
    forceground: "#f6f6f6",
};

colors.black.hex = makeHexShadesNoAlpha(colors.black);
colors.primary.hex = makeHexShadesNoAlpha(colors.primary);
colors.white.hex = makeHexShadesNoAlpha(colors.white);
colors.blue.hex = makeHexShadesNoAlpha(colors.blue);
colors.red.hex = makeHexShadesNoAlpha(colors.red);
colors.green.hex = makeHexShadesNoAlpha(colors.green);
colors.yellow.hex = makeHexShadesNoAlpha(colors.yellow);

console.log(rgbaToHexWithBackground("rgba(0,0,0,0.1)"));