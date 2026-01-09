import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// Font URL for Bangers (Google Fonts)
const FONT_URL = 'https://fonts.gstatic.com/s/bangers/v20/FeVQS062MbNM2W353t8.woff';

// Particle System
function Particles() {
    const count = 200;
    const particlesRef = useRef<THREE.Points>(null);

    const [positions, colors] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 40;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

            // Golden/yellow color palette
            colors[i * 3] = Math.random() * 0.5 + 0.5; // R
            colors[i * 3 + 1] = Math.random() * 0.5 + 0.5; // G
            colors[i * 3 + 2] = Math.random() * 0.3; // B
        }

        return [positions, colors];
    }, []);

    useFrame((state) => {
        if (!particlesRef.current) return;
        particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
        particlesRef.current.rotation.x = state.clock.elapsedTime * 0.03;
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                vertexColors
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
}

// Dynamic Speed Lines with more intensity
function SpeedLines() {
    const lines = useMemo(() => {
        return new Array(60).fill(0).map(() => ({
            position: [
                (Math.random() - 0.5) * 40,
                (Math.random() - 0.5) * 40,
                Math.random() * -60
            ] as [number, number, number],
            speed: Math.random() * 0.8 + 0.3,
            length: Math.random() * 15 + 5,
            thickness: Math.random() * 0.03 + 0.02
        }));
    }, []);

    const group = useRef<THREE.Group>(null);

    useFrame((_, delta) => {
        if (!group.current) return;
        group.current.children.forEach((child, i) => {
            const line = lines[i];
            child.position.z += line.speed * 250 * delta;
            if (child.position.z > 10) {
                child.position.z = -60;
                child.position.x = (Math.random() - 0.5) * 40;
                child.position.y = (Math.random() - 0.5) * 40;
            }
        });
    });

    return (
        <group ref={group}>
            {lines.map((item, i) => (
                <mesh key={i} position={item.position} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[item.thickness, item.thickness, item.length, 4]} />
                    <meshBasicMaterial
                        color="#000000"
                        opacity={0.25}
                        transparent
                    />
                </mesh>
            ))}
        </group>
    );
}

// Floating 3D geometric shapes
function FloatingShapes() {
    const shapes = useMemo(() => [
        { pos: [-8, 3, -15], type: 'box' },
        { pos: [8, -3, -12], type: 'sphere' },
        { pos: [-6, -4, -18], type: 'torus' },
        { pos: [7, 4, -20], type: 'cone' },
    ], []);

    return (
        <>
            {shapes.map((shape, i) => (
                <Float key={i} speed={2 + i} rotationIntensity={1.5} floatIntensity={2}>
                    <mesh position={shape.pos as [number, number, number]}>
                        {shape.type === 'box' && <boxGeometry args={[1.5, 1.5, 1.5]} />}
                        {shape.type === 'sphere' && <sphereGeometry args={[0.8, 16, 16]} />}
                        {shape.type === 'torus' && <torusGeometry args={[0.7, 0.3, 16, 32]} />}
                        {shape.type === 'cone' && <coneGeometry args={[0.7, 1.5, 8]} />}
                        <meshStandardMaterial
                            color="#fbbf24"
                            wireframe
                            opacity={0.3}
                            transparent
                        />
                    </mesh>
                </Float>
            ))}
        </>
    );
}

// Pulsating energy sphere
function EnergySphere() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    });

    return (
        <mesh ref={meshRef} position={[0, 0, -25]}>
            <Sphere args={[2, 64, 64]}>
                <MeshDistortMaterial
                    color="#fbbf24"
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    opacity={0.15}
                    transparent
                />
            </Sphere>
        </mesh>
    );
}

// Enhanced Floating Words with more variety
function FloatingWord({ text, position, rotation, size = 1, color = "black", intensity = 1 }: any) {
    const textRef = useRef<any>(null);

    useFrame((state) => {
        if (textRef.current) {
            textRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <Float speed={3 * intensity} rotationIntensity={0.8} floatIntensity={1.5}>
            <Text
                ref={textRef}
                font={FONT_URL}
                fontSize={size}
                position={position}
                rotation={rotation}
                color={color}
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.05}
                outlineColor="white"
            >
                {text}
                <meshStandardMaterial
                    toneMapped={false}
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.3}
                />
            </Text>
        </Float>
    );
}

// Rotating ring of small elements
function RotatingRing() {
    const count = 12;
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!groupRef.current) return;
        groupRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    });

    const items = useMemo(() => {
        const arr = [];
        const radius = 3;
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            arr.push({
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius,
            });
        }
        return arr;
    }, []);

    return (
        <group ref={groupRef} position={[0, 0, -8]}>
            {items.map((item, i) => (
                <mesh key={i} position={[item.x, item.y, 0]}>
                    <dodecahedronGeometry args={[0.15]} />
                    <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.5} />
                </mesh>
            ))}
        </group>
    );
}

export default function Scene3D() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5], fov: 70 }} gl={{ alpha: true, antialias: true }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#fbbf24" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />

                {/* Background stars */}
                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

                {/* All 3D elements */}
                <SpeedLines />
                <Particles />
                <FloatingShapes />
                <EnergySphere />
                <RotatingRing />

                {/* Enhanced floating texts */}
                <FloatingWord text="CODE" position={[-5, 2.5, -8]} rotation={[0, 0.3, -0.15]} size={2.5} color="#1a1a1a" intensity={1.2} />
                <FloatingWord text="CREATE" position={[5, -2.5, -9]} rotation={[0, -0.3, 0.15]} size={2.5} color="#1a1a1a" intensity={1.3} />
                <FloatingWord text="MANGA" position={[0, 0, -15]} rotation={[0, 0, 0]} size={4} color="#1a1a1a" intensity={0.8} />
                <FloatingWord text="DESIGN" position={[-6, -1, -12]} rotation={[0, 0.2, 0]} size={1.8} color="#fbbf24" intensity={1.5} />
                <FloatingWord text="BUILD" position={[6, 1, -11]} rotation={[0, -0.2, 0]} size={1.8} color="#fbbf24" intensity={1.4} />

                {/* Japanese SFX - more spread out */}
                <FloatingWord text="ドーン" position={[7, 4, -6]} rotation={[0, -0.4, 0.3]} size={2} color="#dc2626" intensity={1.6} />
                <FloatingWord text="ゴゴゴ" position={[-7, -4, -10]} rotation={[0, 0.4, -0.3]} size={2} color="#dc2626" intensity={1.5} />
                <FloatingWord text="バーン" position={[4, 5, -14]} rotation={[0, 0, 0.2]} size={1.6} color="#ef4444" intensity={1.7} />
                <FloatingWord text="キラーン" position={[-5, 5, -16]} rotation={[0, 0, -0.2]} size={1.6} color="#fbbf24" intensity={1.8} />
            </Canvas>
        </div>
    );
}
