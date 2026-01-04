import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// Font URL for Bangers (Google Fonts)
const FONT_URL = 'https://fonts.gstatic.com/s/bangers/v20/FeVQS062MbNM2W353t8.woff';

function SpeedLines() {
    const lines = useMemo(() => {
        return new Array(40).fill(0).map(() => ({
            position: [
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 30,
                Math.random() * -50
            ] as [number, number, number],
            speed: Math.random() * 0.5 + 0.2,
            length: Math.random() * 10 + 5
        }));
    }, []);

    const group = useRef<THREE.Group>(null);

    useFrame((_, delta) => {
        if (!group.current) return;
        group.current.children.forEach((child, i) => {
            const line = lines[i];
            child.position.z += line.speed * 200 * delta; // Very fast
            if (child.position.z > 5) {
                child.position.z = -50;
                child.position.x = (Math.random() - 0.5) * 30;
                child.position.y = (Math.random() - 0.5) * 30;
            }
        });
    });

    return (
        <group ref={group}>
            {lines.map((item, i) => (
                <mesh key={i} position={item.position} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.02, 0.02, item.length, 3]} />
                    <meshBasicMaterial color="#000000" opacity={0.3} transparent />
                </mesh>
            ))}
        </group>
    );
}

function FloatingWord({ text, position, rotation, size = 1, color = "black" }: any) {
    return (
        <Float speed={4} rotationIntensity={0.5} floatIntensity={1}>
            <Text
                font={FONT_URL}
                fontSize={size}
                position={position}
                rotation={rotation}
                color={color}
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.04}
                outlineColor="white"
            >
                {text}
                <meshBasicMaterial toneMapped={false} color={color} />
            </Text>
        </Float>
    );
}

export default function Scene3D() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ alpha: true }}>
                <ambientLight intensity={1} />
                <SpeedLines />

                {/* Main large floating texts */}
                <FloatingWord text="CODE" position={[-4, 2, -5]} rotation={[0, 0.2, -0.1]} size={2} />
                <FloatingWord text="CREATE" position={[4, -2, -6]} rotation={[0, -0.2, 0.1]} size={2} />
                <FloatingWord text="MANGA" position={[0, 0, -10]} rotation={[0, 0, 0]} size={3} color="black" />

                {/* Japanese SFX */}
                <FloatingWord text="ドーン" position={[5, 3, -4]} rotation={[0, -0.3, 0.2]} size={1.5} />
                <FloatingWord text="ゴゴゴ" position={[-5, -3, -8]} rotation={[0, 0.3, -0.2]} size={1.5} />
            </Canvas>
        </div>
    );
}
