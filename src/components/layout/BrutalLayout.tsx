import { ReactNode, Suspense, lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import { useBrutalEffects } from '../../hooks/useBrutalEffects';
import BrutalNav from './BrutalNav';

const Ribbons = lazy(() => import('../ui/Ribbons'));

interface BrutalLayoutProps {
    children: ReactNode;
}

export default function BrutalLayout({ children }: BrutalLayoutProps) {
    useBrutalEffects();

    return (
        <>
            <div className="noise"></div>
            <div id="cursor"></div>
            <BrutalNav />

            {/* Fixed ribbon overlay — GPU-accelerated canvas */}
            <Suspense fallback={null}>
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 5, pointerEvents: 'none' }}>
                    <Ribbons
                        baseThickness={20}
                        colors={['#fbbf24', '#ffffff', '#dc2626']}
                        speedMultiplier={0.7}
                        maxAge={200}
                        enableFade={true}
                        enableShaderEffect={false}
                        pointCount={18}
                    />
                </div>
            </Suspense>

            {/* Global toast notifications */}
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#1a1a1a',
                        color: '#fafaff',
                        border: '2px solid #fbbf24',
                        fontWeight: 'bold',
                    },
                }}
            />

            <div id="scroll-content">
                {children}
            </div>
        </>
    );
}
