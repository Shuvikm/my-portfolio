export const CONFIG = {
    particleCount: 1000, // Further reduced for optimal performance
    shapeSize: 8,
    swarmDistanceFactor: 1.0,
    swirlFactor: 2.0,
    noiseFrequency: 0.05,
    noiseTimeScale: 0.015,
    noiseMaxStrength: 1.2,
    colorScheme: 'solar',
    morphDuration: 2200, // Slightly increased for smoother transitions
    particleSizeRange: [0.04, 0.12] as [number, number],
    starCount: 1500, // Further reduced for better performance
    bloomStrength: 0.4, // Further reduced to lower GPU load
    bloomRadius: 0.25,
    bloomThreshold: 0.12,
    idleFlowStrength: 0.12,
    idleFlowSpeed: 0.04,
    idleRotationSpeed: 0.008,
    morphSizeFactor: 0.25,
    morphBrightnessFactor: 0.3,
    shineInterval: 2.0,
    shineDuration: 0.4,
    shineSizeFactor: 1.5,
    shineBrightFactor: 1.0
};


export const COLOR_SCHEMES = {
    inferno: { startHue: 10, endHue: 55, saturation: 0.95, lightness: 0.55, gradient: ['#000000', '#43000a', '#9a061f', '#ff8c42'] },
    abyssal: { startHue: 200, endHue: 260, saturation: 0.9, lightness: 0.55, gradient: ['#02040a', '#001233', '#004b6b', '#00f0ff'] },
    aurora: { startHue: 150, endHue: 300, saturation: 0.9, lightness: 0.6, gradient: ['#071b3a', '#004d40', '#00ffcc', '#a0ffea'] },
    solar: { startHue: 30, endHue: 70, saturation: 0.95, lightness: 0.6, gradient: ['#1a0500', '#6b2b00', '#ffb85c', '#fff0b2'] },
    spectral: { startHue: 260, endHue: 340, saturation: 0.88, lightness: 0.62, gradient: ['#0b071a', '#3b0f6b', '#b14dff', '#ff86ff'] }
};
