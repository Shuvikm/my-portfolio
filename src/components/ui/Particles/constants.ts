export const CONFIG = {
    particleCount: 15000,
    shapeSize: 14,
    swarmDistanceFactor: 1.5,
    swirlFactor: 4.0,
    noiseFrequency: 0.1,
    noiseTimeScale: 0.04,
    noiseMaxStrength: 2.8,
    colorScheme: 'solar',
    morphDuration: 4000,
    particleSizeRange: [0.08, 0.25] as [number, number],
    starCount: 18000,
    bloomStrength: 1.3,
    bloomRadius: 0.5,
    bloomThreshold: 0.05,
    idleFlowStrength: 0.25,
    idleFlowSpeed: 0.08,
    idleRotationSpeed: 0.02,
    morphSizeFactor: 0.5,
    morphBrightnessFactor: 0.6,
    shineInterval: 1.0,
    shineDuration: 0.7,
    shineSizeFactor: 2.4,
    shineBrightFactor: 1.6
};

export const COLOR_SCHEMES = {
    inferno: { startHue: 10, endHue: 55, saturation: 0.95, lightness: 0.55, gradient: ['#000000', '#43000a', '#9a061f', '#ff8c42'] },
    abyssal: { startHue: 200, endHue: 260, saturation: 0.9, lightness: 0.55, gradient: ['#02040a', '#001233', '#004b6b', '#00f0ff'] },
    aurora: { startHue: 150, endHue: 300, saturation: 0.9, lightness: 0.6, gradient: ['#071b3a', '#004d40', '#00ffcc', '#a0ffea'] },
    solar: { startHue: 30, endHue: 70, saturation: 0.95, lightness: 0.6, gradient: ['#1a0500', '#6b2b00', '#ffb85c', '#fff0b2'] },
    spectral: { startHue: 260, endHue: 340, saturation: 0.88, lightness: 0.62, gradient: ['#0b071a', '#3b0f6b', '#b14dff', '#ff86ff'] }
};
