

export default function BrutalNav() {
    return (
        <nav className="brutal-nav">
            <a href="#home" className="nav-logo magnetic" style={{ textDecoration: 'none' }}>
                SHUVIK M
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
