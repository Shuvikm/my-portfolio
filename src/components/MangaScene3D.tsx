import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial } from '@react-three/drei';
import { useMemo, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

// Hook to get scroll progress
function useScrollProgress() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? scrollTop / docHeight : 0;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return scrollProgress;
}

// Scroll-reactive camera
function ScrollCamera({ scrollProgress }: { scrollProgress: number }) {
    const { camera } = useThree();

    useFrame(() => {
        // Subtle camera movement based on scroll
        camera.position.x = Math.sin(scrollProgress * Math.PI * 2) * 2;
        camera.position.y = Math.cos(scrollProgress * Math.PI) * 1.5;
        camera.lookAt(0, 0, -10);
    });

    return null;
}

// Liquid Glass Sphere with refraction - scroll reactive
function GlassOrb({
    position,
    scale,
    scrollProgress
}: {
    position: [number, number, number];
    scale: number;
    scrollProgress: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const initialY = position[1];

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
            // Parallax effect based on scroll
            meshRef.current.position.y = initialY + scrollProgress * 5;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
            <mesh ref={meshRef} position={position} scale={scale}>
                <sphereGeometry args={[1, 32, 32]} />
                <MeshTransmissionMaterial
                    backside
                    samples={16}
                    resolution={512}
                    transmission={0.95}
                    roughness={0.1}
                    thickness={1}
                    ior={1.5}
                    chromaticAberration={0.06}
                    anisotropy={0.3}
                    distortion={0.2}
                    distortionScale={0.5}
                    temporalDistortion={0.1}
                    color="#ffffff"
                    opacity={0.8}
                />
            </mesh>
        </Float>
    );
}

// Frosted glass panel - scroll reactive
function FrostedPanel({
    position,
    rotation,
    scrollProgress,
    speed = 1
}: {
    position: [number, number, number];
    rotation: [number, number, number];
    scrollProgress: number;
    speed?: number;
}) {
    const groupRef = useRef<THREE.Group>(null);
    const initialPos = position;

    useFrame(() => {
        if (groupRef.current) {
            // Move panels at different speeds for depth
            groupRef.current.position.y = initialPos[1] - scrollProgress * 10 * speed;
            groupRef.current.rotation.z = scrollProgress * 0.5 * speed;
        }
    });

    return (
        <group ref={groupRef}>
            <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
                <mesh position={initialPos} rotation={rotation}>
                    <boxGeometry args={[1.5, 2, 0.1]} />
                    <MeshTransmissionMaterial
                        samples={8}
                        resolution={256}
                        transmission={0.85}
                        roughness={0.3}
                        thickness={0.3}
                        ior={1.45}
                        chromaticAberration={0.03}
                        color="#fafaff"
                        opacity={0.7}
                    />
                </mesh>
                {/* Subtle border glow */}
                <lineSegments position={initialPos} rotation={rotation}>
                    <edgesGeometry args={[new THREE.BoxGeometry(1.5, 2, 0.1)]} />
                    <lineBasicMaterial color="#fbbf24" linewidth={2} transparent opacity={0.4} />
                </lineSegments>
            </Float>
        </group>
    );
}

// Halftone dots particles - scroll reactive
function HalftoneDots({ scrollProgress }: { scrollProgress: number }) {
    const pointsRef = useRef<THREE.Points>(null);

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < 150; i++) {
            const x = (Math.random() - 0.5) * 50;
            const y = (Math.random() - 0.5) * 50;
            const z = (Math.random() - 0.5) * 30;
            temp.push(x, y, z);
        }
        return new Float32Array(temp);
    }, []);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = scrollProgress * Math.PI * 0.5;
            pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particles.length / 3}
                    array={particles}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                color="#1a1a1a"
                transparent
                opacity={0.3}
                sizeAttenuation
            />
        </points>
    );
}

// Speed lines - scroll reactive
function SpeedLines({ scrollProgress }: { scrollProgress: number }) {
    const linesRef = useRef<THREE.LineSegments>(null);

    const lines = useMemo(() => {
        const temp = [];
        for (let i = 0; i < 40; i++) {
            const angle = (i / 40) * Math.PI * 2;
            const radius = 20;
            const x1 = Math.cos(angle) * radius;
            const y1 = Math.sin(angle) * radius;
            const x2 = Math.cos(angle) * (radius + 8);
            const y2 = Math.sin(angle) * (radius + 8);
            temp.push(x1, y1, -10, x2, y2, -10);
        }
        return new Float32Array(temp);
    }, []);

    useFrame(() => {
        if (linesRef.current) {
            linesRef.current.rotation.z = scrollProgress * Math.PI * 2;
            linesRef.current.scale.setScalar(1 + scrollProgress * 0.5);
        }
    });

    return (
        <lineSegments ref={linesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={lines.length / 3}
                    array={lines}
                    itemSize={3}
                />
            </bufferGeometry>
            <lineBasicMaterial color="#fbbf24" transparent opacity={0.15 + scrollProgress * 0.1} />
        </lineSegments>
    );
}

// Main 3D Scene wrapper that passes scroll to children
function Scene3DContent({ scrollProgress }: { scrollProgress: number }) {
    return (
        <>
            <ScrollCamera scrollProgress={scrollProgress} />
            <ambientLight intensity={0.8} />
            <pointLight position={[10, 10, 10]} intensity={0.5} color="#fbbf24" />
            <pointLight position={[-10, -10, 5]} intensity={0.3} color="#ffffff" />

            {/* Large liquid glass orbs - react to scroll */}
            <GlassOrb position={[-6, 4, -12]} scale={1.5} scrollProgress={scrollProgress} />
            <GlassOrb position={[7, -3, -15]} scale={1.8} scrollProgress={scrollProgress} />
            <GlassOrb position={[0, 0, -20]} scale={2.2} scrollProgress={scrollProgress} />
            <GlassOrb position={[-4, -5, -10]} scale={1.2} scrollProgress={scrollProgress} />
            <GlassOrb position={[5, 2, -8]} scale={1.0} scrollProgress={scrollProgress} />

            {/* Frosted glass manga panels - different scroll speeds */}
            <FrostedPanel position={[-5, 3, -8]} rotation={[0.2, 0.3, -0.1]} scrollProgress={scrollProgress} speed={0.8} />
            <FrostedPanel position={[6, -2, -10]} rotation={[-0.1, -0.3, 0.2]} scrollProgress={scrollProgress} speed={1.2} />
            <FrostedPanel position={[-3, -4, -6]} rotation={[0.3, 0.1, -0.2]} scrollProgress={scrollProgress} speed={0.6} />
            <FrostedPanel position={[4, 4, -7]} rotation={[-0.2, -0.1, 0.1]} scrollProgress={scrollProgress} speed={1.0} />

            {/* Halftone dots - rotate on scroll */}
            <HalftoneDots scrollProgress={scrollProgress} />

            {/* Speed lines - spin and grow on scroll */}
            <SpeedLines scrollProgress={scrollProgress} />
        </>
    );
}

export default function MangaScene3D() {
    const scrollProgress = useScrollProgress();

    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ alpha: true }}>
                <Scene3DContent scrollProgress={scrollProgress} />
            </Canvas>
        </div>
    );
}

