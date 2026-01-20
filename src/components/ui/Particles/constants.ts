export const CONFIG = {
    particleCount: 8000,
    shapeSize: 12,
    swarmDistanceFactor: 1.3,
    swirlFactor: 3.0,
    noiseFrequency: 0.08,
    noiseTimeScale: 0.03,
    noiseMaxStrength: 2.0,
    colorScheme: 'solar',
    morphDuration: 3000,
    particleSizeRange: [0.06, 0.2] as [number, number],
    starCount: 12000,
    bloomStrength: 1.1,
    bloomRadius: 0.4,
    bloomThreshold: 0.08,
    idleFlowStrength: 0.2,
    idleFlowSpeed: 0.06,
    idleRotationSpeed: 0.015,
    morphSizeFactor: 0.4,
    morphBrightnessFactor: 0.5,
    shineInterval: 1.2,
    shineDuration: 0.6,
    shineSizeFactor: 2.0,
    shineBrightFactor: 1.4
};

export const COLOR_SCHEMES = {
    inferno: { startHue: 10, endHue: 55, saturation: 0.95, lightness: 0.55, gradient: ['#000000', '#43000a', '#9a061f', '#ff8c42'] },
    abyssal: { startHue: 200, endHue: 260, saturation: 0.9, lightness: 0.55, gradient: ['#02040a', '#001233', '#004b6b', '#00f0ff'] },
    aurora: { startHue: 150, endHue: 300, saturation: 0.9, lightness: 0.6, gradient: ['#071b3a', '#004d40', '#00ffcc', '#a0ffea'] },
    solar: { startHue: 30, endHue: 70, saturation: 0.95, lightness: 0.6, gradient: ['#1a0500', '#6b2b00', '#ffb85c', '#fff0b2'] },
    spectral: { startHue: 260, endHue: 340, saturation: 0.88, lightness: 0.62, gradient: ['#0b071a', '#3b0f6b', '#b14dff', '#ff86ff'] }
};
