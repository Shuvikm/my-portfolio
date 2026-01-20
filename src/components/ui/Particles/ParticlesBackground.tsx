import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import anime from 'animejs';
import { createNoise3D, createNoise4D } from 'simplex-noise';
import { CONFIG, COLOR_SCHEMES } from './constants';
import { SHAPES } from './generators';

const ParticlesBackground: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        let scene: THREE.Scene,
            camera: THREE.PerspectiveCamera,
            renderer: THREE.WebGLRenderer,
            controls: OrbitControls,
            clock: THREE.Clock;
        let composer: EffectComposer,
            bloomPass: UnrealBloomPass;

        let particlesGeometry: THREE.BufferGeometry,
            particlesMaterial: THREE.ShaderMaterial,
            particleSystem: THREE.Points;
        let currentPositions: Float32Array,
            sourcePositions: Float32Array,
            targetPositions: Float32Array[],
            swarmPositions: Float32Array;
        let particleSizes: Float32Array,
            particleOpacities: Float32Array,
            particleEffectStrengths: Float32Array;
        let noise3D = createNoise3D(),
            noise4D = createNoise4D();

        let morphTimeline: any = null;
        let isMorphing = false;
        let currentShapeIndex = 7; // Lotus Orb (last index in SHAPES)
        const morphState = { progress: 0.0 };

        const tempVec = new THREE.Vector3();
        const sourceVec = new THREE.Vector3();
        const targetVec = new THREE.Vector3();
        const swarmVec = new THREE.Vector3();
        const noiseOffset = new THREE.Vector3();
        const flowVec = new THREE.Vector3();
        const bezPos = new THREE.Vector3();
        const swirlAxis = new THREE.Vector3();
        const currentVec = new THREE.Vector3();

        let shineState = { index: -1, start: 0, duration: 0, active: false };
        let aShineArray: Float32Array;
        let rafId: number;

        const updateColorArray = (colors: Float32Array, posArray: ArrayLike<number>) => {
            const scheme = COLOR_SCHEMES[CONFIG.colorScheme as keyof typeof COLOR_SCHEMES];
            const maxRadius = CONFIG.shapeSize * 1.1;
            for (let i = 0; i < CONFIG.particleCount; i++) {
                const i3 = i * 3;
                tempVec.set(posArray[i3], posArray[i3 + 1], posArray[i3 + 2]);
                const dist = tempVec.length();
                const noiseVal = (noise3D(tempVec.x * 0.18, tempVec.y * 0.18, tempVec.z * 0.18) + 1) * 0.5;

                let color: THREE.Color;
                const t = THREE.MathUtils.clamp(dist / maxRadius + (noiseVal - 0.5) * 0.08, 0, 1);
                const g = scheme.gradient;
                const seg = Math.min(g.length - 2, Math.floor(t * (g.length - 1)));
                const localT = (t * (g.length - 1)) - seg;
                const c1 = new THREE.Color(g[seg]);
                const c2 = new THREE.Color(g[seg + 1]);
                color = c1.lerp(c2, localT * (0.85 + noiseVal * 0.3));
                color.toArray(colors, i3);
            }
        };

        const createStarTexture = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 64; canvas.height = 64;
            const context = canvas.getContext('2d')!;
            const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
            gradient.addColorStop(0, 'rgba(255,255,255,1)');
            gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)');
            gradient.addColorStop(0.5, 'rgba(255,255,255,0.3)');
            gradient.addColorStop(1, 'rgba(255,255,255,0)');
            context.fillStyle = gradient;
            context.fillRect(0, 0, 64, 64);
            return new THREE.CanvasTexture(canvas);
        };

        const setupPostProcessing = () => {
            composer = new EffectComposer(renderer);
            composer.addPass(new RenderPass(scene, camera));
            bloomPass = new UnrealBloomPass(
                new THREE.Vector2(window.innerWidth, window.innerHeight),
                CONFIG.bloomStrength,
                CONFIG.bloomRadius,
                CONFIG.bloomThreshold
            );
            composer.addPass(bloomPass);
        };

        const createStarfield = () => {
            const starVertices = [];
            const starSizes = [];
            const starColors = [];
            const starGeometry = new THREE.BufferGeometry();

            for (let i = 0; i < CONFIG.starCount; i++) {
                tempVec.set(
                    THREE.MathUtils.randFloatSpread(400),
                    THREE.MathUtils.randFloatSpread(400),
                    THREE.MathUtils.randFloatSpread(400)
                );
                if (tempVec.length() < 100) tempVec.setLength(100 + Math.random() * 300);
                starVertices.push(tempVec.x, tempVec.y, tempVec.z);
                starSizes.push(Math.random() * 0.15 + 0.05);
                const color = new THREE.Color();
                if (Math.random() < 0.1) {
                    color.setHSL(Math.random(), 0.7, 0.65);
                } else {
                    color.setHSL(0.6, Math.random() * 0.1, 0.8 + Math.random() * 0.2);
                }
                starColors.push(color.r, color.g, color.b);
            }

            starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
            starGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3));
            starGeometry.setAttribute('size', new THREE.Float32BufferAttribute(starSizes, 1));

            const starMaterial = new THREE.ShaderMaterial({
                uniforms: { pointTexture: { value: createStarTexture() } },
                vertexShader: `
                    attribute float size; varying vec3 vColor;
                    void main() {
                        vColor = color;
                        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                        gl_PointSize = size * (400.0 / -mvPosition.z);
                        gl_Position = projectionMatrix * mvPosition;
                    }`,
                fragmentShader: `
                    uniform sampler2D pointTexture; varying vec3 vColor;
                    void main() {
                        float alpha = texture2D(pointTexture, gl_PointCoord).a;
                        if (alpha < 0.1) discard;
                        gl_FragColor = vec4(vColor, alpha * 0.9);
                    }`,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                transparent: true,
                vertexColors: true
            });
            scene.add(new THREE.Points(starGeometry, starMaterial));
        };

        const setupParticleSystem = () => {
            targetPositions = SHAPES.map(shape => shape.generator(CONFIG.particleCount, CONFIG.shapeSize));
            particlesGeometry = new THREE.BufferGeometry();

            const safeIdx = currentShapeIndex % SHAPES.length;
            currentPositions = new Float32Array(targetPositions[safeIdx]);
            sourcePositions = new Float32Array(targetPositions[safeIdx]);
            swarmPositions = new Float32Array(CONFIG.particleCount * 3);

            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));

            particleSizes = new Float32Array(CONFIG.particleCount);
            particleOpacities = new Float32Array(CONFIG.particleCount);
            particleEffectStrengths = new Float32Array(CONFIG.particleCount);
            aShineArray = new Float32Array(CONFIG.particleCount);

            for (let i = 0; i < CONFIG.particleCount; i++) {
                particleSizes[i] = THREE.MathUtils.randFloat(CONFIG.particleSizeRange[0], CONFIG.particleSizeRange[1]);
                particleOpacities[i] = 1.0;
                particleEffectStrengths[i] = 0.0;
                aShineArray[i] = 0.0;
            }

            particlesGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));
            particlesGeometry.setAttribute('opacity', new THREE.BufferAttribute(particleOpacities, 1));
            particlesGeometry.setAttribute('aEffectStrength', new THREE.BufferAttribute(particleEffectStrengths, 1));
            particlesGeometry.setAttribute('aShine', new THREE.BufferAttribute(aShineArray, 1));

            const colors = new Float32Array(CONFIG.particleCount * 3);
            updateColorArray(colors, currentPositions);
            particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            particlesMaterial = new THREE.ShaderMaterial({
                uniforms: { pointTexture: { value: createStarTexture() } },
                vertexShader: `
                    attribute float size;
                    attribute float opacity;
                    attribute float aEffectStrength;
                    attribute float aShine;
                    varying vec3 vColor;
                    varying float vOpacity;
                    varying float vEffectStrength;
                    varying float vShine;
                    void main() {
                        vColor = color;
                        vOpacity = opacity;
                        vEffectStrength = aEffectStrength;
                        vShine = aShine;
                        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                        float sizeScale = (1.0 - vEffectStrength * 0.5) + vShine * 2.4;
                        gl_PointSize = size * sizeScale * (400.0 / -mvPosition.z);
                        gl_Position = projectionMatrix * mvPosition;
                    }`,
                fragmentShader: `
                    uniform sampler2D pointTexture;
                    varying vec3 vColor;
                    varying float vOpacity;
                    varying float vEffectStrength;
                    varying float vShine;
                    void main() {
                        float alpha = texture2D(pointTexture, gl_PointCoord).a;
                        if (alpha < 0.05) discard;
                        vec3 bright = vColor * (1.0 + vEffectStrength * 0.6);
                        vec3 shineBoost = vColor * (vShine * 1.6);
                        vec3 finalColor = bright + shineBoost;
                        gl_FragColor = vec4(finalColor, alpha * vOpacity * (0.85 + vShine * 0.25));
                    }`,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
                transparent: true,
                vertexColors: true
            });

            particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
            scene.add(particleSystem);
        };

        const morphToShape = (nextIdx: number) => {
            if (isMorphing) return;
            isMorphing = true;
            const safeNextIdx = nextIdx % SHAPES.length;

            sourcePositions.set(currentPositions);
            const nextTargets = targetPositions[safeNextIdx];
            const centerOffset = CONFIG.shapeSize * CONFIG.swarmDistanceFactor;

            for (let i = 0; i < CONFIG.particleCount; i++) {
                const i3 = i * 3;
                sourceVec.fromArray(sourcePositions, i3);
                targetVec.fromArray(nextTargets, i3);
                swarmVec.lerpVectors(sourceVec, targetVec, 0.5);
                const offsetDir = tempVec.set(
                    noise3D(i * 0.05, 10, 10),
                    noise3D(20, i * 0.05, 20),
                    noise3D(30, 30, i * 0.05)
                ).normalize();
                swarmVec.addScaledVector(offsetDir, (sourceVec.distanceTo(targetVec) * 0.1 + centerOffset) * (0.5 + Math.random() * 0.8));
                swarmPositions[i3] = swarmVec.x; swarmPositions[i3 + 1] = swarmVec.y; swarmPositions[i3 + 2] = swarmVec.z;
            }

            currentShapeIndex = safeNextIdx;
            morphState.progress = 0;
            if (morphTimeline) morphTimeline.pause();

            morphTimeline = anime({
                targets: morphState,
                progress: 1,
                duration: CONFIG.morphDuration,
                easing: 'cubicBezier(0.4, 0.0, 0.2, 1.0)',
                complete: () => {
                    currentPositions.set(targetPositions[currentShapeIndex]);
                    particlesGeometry.attributes.position.needsUpdate = true;
                    particleEffectStrengths.fill(0.0);
                    particlesGeometry.attributes.aEffectStrength.needsUpdate = true;
                    sourcePositions.set(currentPositions);
                    isMorphing = false;
                    // Update colors for new shape
                    const colors = particlesGeometry.attributes.color.array as Float32Array;
                    updateColorArray(colors, currentPositions);
                    particlesGeometry.attributes.color.needsUpdate = true;
                }
            });
        };

        const triggerSingleShine = () => {
            const idx = Math.floor(Math.random() * CONFIG.particleCount);
            shineState = { index: idx, start: clock.getElapsedTime(), duration: CONFIG.shineDuration, active: true };
        };

        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            composer.setSize(window.innerWidth, window.innerHeight);
        };

        const animate = () => {
            rafId = requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();
            const deltaTime = clock.getDelta();

            controls.update();

            const positions = particlesGeometry.attributes.position.array as Float32Array;
            const effectStrengths = particlesGeometry.attributes.aEffectStrength.array as Float32Array;

            if (isMorphing) {
                const t = morphState.progress;
                const nextTargets = targetPositions[currentShapeIndex];
                const effectStrength = Math.sin(t * Math.PI);
                const swirl = effectStrength * CONFIG.swirlFactor * deltaTime * 50;

                for (let i = 0; i < CONFIG.particleCount; i++) {
                    const i3 = i * 3;
                    sourceVec.fromArray(sourcePositions, i3);
                    swarmVec.fromArray(swarmPositions, i3);
                    targetVec.fromArray(nextTargets, i3);

                    const t_inv = 1.0 - t;
                    bezPos.copy(sourceVec).multiplyScalar(t_inv * t_inv);
                    bezPos.addScaledVector(swarmVec, 2.0 * t_inv * t);
                    bezPos.addScaledVector(targetVec, t * t);

                    if (swirl > 0.01) {
                        tempVec.subVectors(bezPos, sourceVec);
                        swirlAxis.set(noise3D(i * 0.02, elapsedTime * 0.1, 0), noise3D(0, i * 0.02, elapsedTime * 0.1 + 5), noise3D(elapsedTime * 0.1 + 10, 0, i * 0.02)).normalize();
                        tempVec.applyAxisAngle(swirlAxis, swirl * (0.5 + Math.random() * 0.5));
                        bezPos.copy(sourceVec).add(tempVec);
                    }

                    const noise = effectStrength * CONFIG.noiseMaxStrength;
                    if (noise > 0.01) {
                        const nt = elapsedTime * CONFIG.noiseTimeScale;
                        const nf = CONFIG.noiseFrequency;
                        noiseOffset.set(
                            noise4D(bezPos.x * nf, bezPos.y * nf, bezPos.z * nf, nt),
                            noise4D(bezPos.x * nf + 100, bezPos.y * nf + 100, bezPos.z * nf + 100, nt),
                            noise4D(bezPos.x * nf + 200, bezPos.y * nf + 200, bezPos.z * nf + 200, nt)
                        );
                        bezPos.addScaledVector(noiseOffset, noise);
                    }

                    positions[i3] = bezPos.x; positions[i3 + 1] = bezPos.y; positions[i3 + 2] = bezPos.z;
                    effectStrengths[i] = effectStrength;
                }
            } else {
                // Idle animation
                const breathScale = 1.0 + Math.sin(elapsedTime * 0.5) * 0.015;
                const flowTime = elapsedTime * CONFIG.idleFlowSpeed;

                for (let i = 0; i < CONFIG.particleCount; i++) {
                    const i3 = i * 3;
                    sourceVec.fromArray(sourcePositions, i3);
                    tempVec.copy(sourceVec).multiplyScalar(breathScale);
                    flowVec.set(
                        noise4D(tempVec.x * 0.1, tempVec.y * 0.1, tempVec.z * 0.1, flowTime),
                        noise4D(tempVec.x * 0.1 + 10, tempVec.y * 0.1 + 10, tempVec.z * 0.1 + 10, flowTime),
                        noise4D(tempVec.x * 0.1 + 20, tempVec.y * 0.1 + 20, tempVec.z * 0.1 + 20, flowTime)
                    );
                    tempVec.addScaledVector(flowVec, CONFIG.idleFlowStrength);
                    currentVec.fromArray(positions, i3).lerp(tempVec, 0.05);
                    positions[i3] = currentVec.x; positions[i3 + 1] = currentVec.y; positions[i3 + 2] = currentVec.z;
                    effectStrengths[i] = 0;
                }
            }

            // Update shine
            if (shineState.active) {
                const t = (elapsedTime - shineState.start) / shineState.duration;
                if (t >= 1.0) {
                    aShineArray[shineState.index] = 0;
                    shineState.active = false;
                } else {
                    aShineArray[shineState.index] = Math.pow(1.0 - Math.abs(2.0 * t - 1.0), 0.9);
                }
                particlesGeometry.attributes.aShine.needsUpdate = true;
            }

            particlesGeometry.attributes.position.needsUpdate = true;
            particlesGeometry.attributes.aEffectStrength.needsUpdate = true;
            composer.render();
        };

        const init = () => {
            clock = new THREE.Clock();
            scene = new THREE.Scene();
            scene.fog = new THREE.FogExp2(0x000308, 0.03);

            camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(0, 15, 30);

            renderer = new THREE.WebGLRenderer({
                canvas: canvasRef.current!,
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance'
            });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Reduced from 2 for better performance
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1.1;

            controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.autoRotate = true;
            controls.autoRotateSpeed = 0.3;
            controls.enableZoom = false;

            setupPostProcessing();
            createStarfield();
            setupParticleSystem();

            window.addEventListener('resize', onWindowResize);

            const morphInterval = setInterval(() => {
                const nextIdx = (currentShapeIndex + 1) % SHAPES.length;
                if (Math.random() > 0.7) {
                    const schemes = Object.keys(COLOR_SCHEMES);
                    CONFIG.colorScheme = schemes[Math.floor(Math.random() * schemes.length)];
                }
                morphToShape(nextIdx);
            }, 10000); // Increased from 8000ms to reduce frequency of expensive morphing

            const shineInterval = setInterval(() => {
                if (!isMorphing) triggerSingleShine();
            }, CONFIG.shineInterval * 1000);

            rafId = requestAnimationFrame(animate);

            return () => {
                clearInterval(morphInterval);
                clearInterval(shineInterval);
                cancelAnimationFrame(rafId);
                window.removeEventListener('resize', onWindowResize);
                renderer.dispose();
            };
        };

        const cleanup = init();
        return () => cleanup();
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 w-full h-full pointer-events-none"
            style={{
                zIndex: -1,
                background: '#001026',
            }}
        >
            <canvas
                ref={canvasRef}
                className="block w-full h-full"
            />
        </div>
    );
};

export default ParticlesBackground;
