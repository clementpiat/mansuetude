export function interpolateColor(scrollY, startColor, endColor) {
    // Assurez-vous que scrollY est compris entre 0 et 100
    const normalizedScroll = Math.min(100, Math.max(0, (scrollY / window.innerHeight) * 100));

    // Convertissez les couleurs hexadécimales en valeurs RGB
    const startRGB = hexToRgb(startColor);
    const endRGB = hexToRgb(endColor);

    // Interpolation linéaire des composantes RGB
    const interpolatedColor = {
        r: Math.round(startRGB.r + (endRGB.r - startRGB.r) * (normalizedScroll / 100)),
        g: Math.round(startRGB.g + (endRGB.g - startRGB.g) * (normalizedScroll / 100)),
        b: Math.round(startRGB.b + (endRGB.b - startRGB.b) * (normalizedScroll / 100))
    };

    // Convertissez la couleur interpolée en format hexadécimal
    const finalColor = rgbToHex(interpolatedColor.r, interpolatedColor.g, interpolatedColor.b);

    return finalColor;
}

function hexToRgb(hex) {
    // Convertissez la couleur hexadécimale en valeurs RGB
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return { r, g, b };
}

function rgbToHex(r, g, b) {
    // Convertissez les valeurs RGB en couleur hexadécimale
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
