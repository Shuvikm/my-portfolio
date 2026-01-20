export function generateSphere(count: number, size: number) {
    const points = new Float32Array(count * 3);
    const phi = Math.PI * (Math.sqrt(5) - 1);
    for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const radius = Math.sqrt(1 - y * y);
        const theta = phi * i;
        points[i * 3] = Math.cos(theta) * radius * size;
        points[i * 3 + 1] = y * size;
        points[i * 3 + 2] = Math.sin(theta) * radius * size;
    }
    return points;
}

export function generateCube(count: number, size: number) {
    const points = new Float32Array(count * 3);
    const halfSize = size / 2;
    for (let i = 0; i < count; i++) {
        const face = Math.floor(Math.random() * 6);
        const u = Math.random() * size - halfSize;
        const v = Math.random() * size - halfSize;
        const i3 = i * 3;
        switch (face) {
            case 0: points[i3] = halfSize; points[i3 + 1] = u; points[i3 + 2] = v; break;
            case 1: points[i3] = -halfSize; points[i3 + 1] = u; points[i3 + 2] = v; break;
            case 2: points[i3] = u; points[i3 + 1] = halfSize; points[i3 + 2] = v; break;
            case 3: points[i3] = u; points[i3 + 1] = -halfSize; points[i3 + 2] = v; break;
            case 4: points[i3] = u; points[i3 + 1] = v; points[i3 + 2] = halfSize; break;
            case 5: points[i3] = u; points[i3 + 1] = v; points[i3 + 2] = -halfSize; break;
        }
    }
    return points;
}

export function generateTorus(count: number, size: number) {
    const points = new Float32Array(count * 3);
    const R = size * 0.7; const r = size * 0.28;
    for (let i = 0; i < count; i++) {
        const u = Math.random() * Math.PI * 2;
        const v = Math.random() * Math.PI * 2;
        points[i * 3] = (R + r * Math.cos(v)) * Math.cos(u);
        points[i * 3 + 1] = r * Math.sin(v);
        points[i * 3 + 2] = (R + r * Math.cos(v)) * Math.sin(u);
    }
    return points;
}

export function generateGalaxy(count: number, size: number) {
    const points = new Float32Array(count * 3);
    const arms = 4; const armWidth = 0.6;
    for (let i = 0; i < count; i++) {
        const t = Math.pow(Math.random(), 1.5); const radius = t * size;
        const armIndex = Math.floor(Math.random() * arms);
        const armOffset = (armIndex / arms) * Math.PI * 2;
        const rotationAmount = radius / size * 6; const angle = armOffset + rotationAmount;
        const spread = (Math.random() - 0.5) * armWidth * (1 - radius / size);
        const theta = angle + spread;
        points[i * 3] = radius * Math.cos(theta);
        points[i * 3 + 1] = (Math.random() - 0.5) * size * 0.1 * (1 - radius / size * 0.3);
        points[i * 3 + 2] = radius * Math.sin(theta);
    }
    return points;
}

export function generateDoubleHelix(count: number, size: number) {
    const points = new Float32Array(count * 3);
    const turns = 6;
    const height = size * 1.6;
    const radius = size * 0.6;
    for (let i = 0; i < count; i++) {
        const t = i / count;
        const angle = t * Math.PI * 2 * turns;
        const y = (t - 0.5) * height;
        const strand = i % 2 === 0 ? 1 : -1;
        const phase = strand === 1 ? 0 : Math.PI * 0.4;
        points[i * 3] = Math.cos(angle + phase) * radius * 0.9;
        points[i * 3 + 1] = y;
        points[i * 3 + 2] = Math.sin(angle + phase) * radius * 0.9 + strand * 0.3;
    }
    return points;
}

export function generateFlower(count: number, size: number) {
    const points = new Float32Array(count * 3);
    const a = size * 0.9;
    const k = 6;
    for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const r = Math.abs(a * Math.sin(k * theta)) * (0.5 + Math.random() * 0.5);
        points[i * 3] = r * Math.cos(theta);
        points[i * 3 + 1] = (Math.random() - 0.5) * size * 0.15;
        points[i * 3 + 2] = r * Math.sin(theta);
    }
    return points;
}

export function generateVortex(count: number, size: number) {
    const points = new Float32Array(count * 3);
    const turns = 8;
    const height = size * 1.2;
    for (let i = 0; i < count; i++) {
        const t = i / count;
        const angle = t * Math.PI * 2 * turns;
        const radius = (1 - Math.pow(t, 1.2)) * size * 0.9 * (0.6 + Math.random() * 0.4);
        points[i * 3] = Math.cos(angle) * radius;
        points[i * 3 + 1] = (t - 0.5) * height * (0.2 + Math.random() * 0.6);
        points[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return points;
}

export function generateLotusOrb(count: number, size: number) {
    const points = new Float32Array(count * 3);
    const phi = Math.PI * (Math.sqrt(5) - 1);
    const radialDisplace = size * 0.18;
    for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const radius = Math.sqrt(1 - y * y);
        const theta = phi * i;
        const x0 = Math.cos(theta) * radius;
        const z0 = Math.sin(theta) * radius;
        const lon = Math.atan2(z0, x0);
        const lat = Math.asin(y);
        const displacement = Math.sin(6 * lon + Math.cos(4 * lat) * 2.0) * radialDisplace * (0.6 + Math.random() * 0.8);
        const horizFactor = Math.sqrt(Math.max(0, 1 - y * y));
        const r = size + displacement * horizFactor;
        points[i * 3] = x0 * r;
        points[i * 3 + 1] = y * size * (0.95 + (Math.random() - 0.5) * 0.1);
        points[i * 3 + 2] = z0 * r;
    }
    return points;
}

export const SHAPES = [
    { name: 'Sphere', generator: generateSphere },
    { name: 'Cube', generator: generateCube },
    { name: 'Torus', generator: generateTorus },
    { name: 'Galaxy', generator: generateGalaxy },
    { name: 'Double Helix', generator: generateDoubleHelix },
    { name: 'Flower', generator: generateFlower },
    { name: 'Vortex', generator: generateVortex },
    { name: 'Lotus Orb', generator: generateLotusOrb }
];
