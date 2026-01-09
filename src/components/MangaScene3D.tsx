import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

// Liquid Glass Sphere with refraction
function GlassOrb({ position, scale }: { position: [number, number, number]; scale: number }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
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

// Frosted glass panel
function FrostedPanel({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
    return (
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
            <mesh position={position} rotation={rotation}>
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
            <lineSegments position={position} rotation={rotation}>
                <edgesGeometry args={[new THREE.BoxGeometry(1.5, 2, 0.1)]} />
                <lineBasicMaterial color="#fbbf24" linewidth={2} transparent opacity={0.4} />
            </lineSegments>
        </Float>
    );
}

// Halftone dots particles
function HalftoneDots() {
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < 100; i++) {
            const x = (Math.random() - 0.5) * 50;
            const y = (Math.random() - 0.5) * 50;
            const z = (Math.random() - 0.5) * 30;
            temp.push(x, y, z);
        }
        return new Float32Array(temp);
    }, []);

    return (
        <points>
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

// Speed lines
function SpeedLines() {
    const lines = useMemo(() => {
        const temp = [];
        for (let i = 0; i < 30; i++) {
            const angle = (i / 30) * Math.PI * 2;
            const radius = 20;
            const x1 = Math.cos(angle) * radius;
            const y1 = Math.sin(angle) * radius;
            const x2 = Math.cos(angle) * (radius + 5);
            const y2 = Math.sin(angle) * (radius + 5);
            temp.push(x1, y1, -10, x2, y2, -10);
        }
        return new Float32Array(temp);
    }, []);

    return (
        <lineSegments>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={lines.length / 3}
                    array={lines}
                    itemSize={3}
                />
            </bufferGeometry>
            <lineBasicMaterial color="#fbbf24" transparent opacity={0.15} />
        </lineSegments>
    );
}

export default function MangaScene3D() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ alpha: true }}>
                <ambientLight intensity={0.8} />
                <pointLight position={[10, 10, 10]} intensity={0.5} color="#fbbf24" />
                <pointLight position={[-10, -10, 5]} intensity={0.3} color="#ffffff" />

                {/* Large liquid glass orbs */}
                <GlassOrb position={[-6, 4, -12]} scale={1.5} />
                <GlassOrb position={[7, -3, -15]} scale={1.8} />
                <GlassOrb position={[0, 0, -20]} scale={2.2} />
                <GlassOrb position={[-4, -5, -10]} scale={1.2} />
                <GlassOrb position={[5, 2, -8]} scale={1.0} />

                {/* Frosted glass manga panels */}
                <FrostedPanel position={[-5, 3, -8]} rotation={[0.2, 0.3, -0.1]} />
                <FrostedPanel position={[6, -2, -10]} rotation={[-0.1, -0.3, 0.2]} />
                <FrostedPanel position={[-3, -4, -6]} rotation={[0.3, 0.1, -0.2]} />
                <FrostedPanel position={[4, 4, -7]} rotation={[-0.2, -0.1, 0.1]} />

                {/* Halftone dots */}
                <HalftoneDots />

                {/* Speed lines in background */}
                <SpeedLines />
            </Canvas>
        </div>
    );
}
