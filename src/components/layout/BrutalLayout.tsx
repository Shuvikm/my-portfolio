import { ReactNode } from 'react';
import { useBrutalEffects } from '../../hooks/useBrutalEffects';
import BrutalNav from './BrutalNav';

interface BrutalLayoutProps {
    children: ReactNode;
    overlay?: ReactNode;
}

export default function BrutalLayout({ children, overlay }: BrutalLayoutProps) {
    useBrutalEffects();

    return (
        <>
            <div className="noise"></div>
            <div id="cursor"></div>
            <BrutalNav />
            {overlay}
            <div id="scroll-content">
                {children}
            </div>
        </>
    );
}
