export const CONFIG = {
    particleCount: 5000,
    shapeSize: 10,
    swarmDistanceFactor: 1.2,
    swirlFactor: 2.5,
    noiseFrequency: 0.06,
    noiseTimeScale: 0.02,
    noiseMaxStrength: 1.5,
    colorScheme: 'solar',
    morphDuration: 2500,
    particleSizeRange: [0.05, 0.15] as [number, number],
    starCount: 8000,
    bloomStrength: 1.0,
    bloomRadius: 0.3,
    bloomThreshold: 0.1,
    idleFlowStrength: 0.15,
    idleFlowSpeed: 0.05,
    idleRotationSpeed: 0.01,
    morphSizeFactor: 0.3,
    morphBrightnessFactor: 0.4,
    shineInterval: 1.5,
    shineDuration: 0.5,
    shineSizeFactor: 1.8,
    shineBrightFactor: 1.2
};

export const COLOR_SCHEMES = {
    inferno: { startHue: 10, endHue: 55, saturation: 0.95, lightness: 0.55, gradient: ['#000000', '#43000a', '#9a061f', '#ff8c42'] },
    abyssal: { startHue: 200, endHue: 260, saturation: 0.9, lightness: 0.55, gradient: ['#02040a', '#001233', '#004b6b', '#00f0ff'] },
    aurora: { startHue: 150, endHue: 300, saturation: 0.9, lightness: 0.6, gradient: ['#071b3a', '#004d40', '#00ffcc', '#a0ffea'] },
    solar: { startHue: 30, endHue: 70, saturation: 0.95, lightness: 0.6, gradient: ['#1a0500', '#6b2b00', '#ffb85c', '#fff0b2'] },
    spectral: { startHue: 260, endHue: 340, saturation: 0.88, lightness: 0.62, gradient: ['#0b071a', '#3b0f6b', '#b14dff', '#ff86ff'] }
};
