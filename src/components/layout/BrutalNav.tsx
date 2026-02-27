import React from 'react';

export default function BrutalNav() {
    return (
        <nav className="brutal-nav">
            <a href="https://www.alerak.studio" className="nav-logo magnetic" style={{ textDecoration: 'none' }}>
                ALERAK
            </a>
            <ul className="nav-menu">
                <li><a href="#" className="nav-link magnetic" data-text="WORK">WORK</a></li>
                <li><a href="#" className="nav-link magnetic" data-text="ABOUT">ABOUT</a></li>
                <li><a href="#" className="nav-link magnetic" data-text="LABS">LABS</a></li>
            </ul>
            <button className="cta-btn magnetic"><span>LET'S TALK</span></button>
        </nav>
    );
}
