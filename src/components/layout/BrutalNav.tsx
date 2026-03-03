

export default function BrutalNav() {
    return (
        <nav className="brutal-nav">
            <a href="#home" className="nav-logo magnetic" style={{ textDecoration: 'none' }}>
                SHUVIK M
            </a>
            <ul className="nav-menu">
                <li><a href="#projects" className="nav-link magnetic" data-text="WORK">WORK</a></li>
                <li><a href="#about" className="nav-link magnetic" data-text="ABOUT">ABOUT</a></li>
                <li><a href="#game" className="nav-link magnetic" data-text="LABS">LABS</a></li>
            </ul>
            <a href="#contact" className="cta-btn magnetic" style={{ textDecoration: 'none', display: 'inline-block' }}><span>LET'S TALK</span></a>
        </nav>
    );
}
