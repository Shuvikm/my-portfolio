import { Github, Linkedin, Mail, Code2, ExternalLink, Trophy, Medal, ZoomIn, GraduationCap, School, Target, Code, Database, Wrench, Palette, Phone, MessageSquare } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import CertificateModal from './CertificateModal';
import MangaScene3D from './MangaScene3D';

// Data from existing components
const skills = {
    languages: ['Java', 'C', 'Python'],
    frontend: ['HTML', 'CSS', 'React', 'JavaScript'],
    databases: ['MongoDB'],
    tools: ['Git', 'GitHub', 'VS Code'],
};

const projects = [
    {
        title: 'AI-Powered Mentoring Platform',
        role: 'Web Development',
        desc: 'AI-based mentoring platform with personalized learning paths and real-time dashboard.',
        tags: ['AI', 'React', 'Node.js'],
    },
    {
        title: 'Lost & Found Web Application',
        role: 'MERN Stack',
        desc: 'Platform for reporting, searching, and claiming lost items with secure auth.',
        tags: ['MERN', 'Auth', 'Geo'],
    },
    {
        title: 'Flight Delay & Prediction',
        role: 'Predictive Analytics',
        desc: 'ML model using XGBoost to predict flight delays with high accuracy.',
        tags: ['Python', 'ML', 'XGBoost'],
    },
    {
        title: 'Rescue Connect',
        role: 'Agile Project',
        desc: 'Platform for efficient coordination during emergency situations.',
        tags: ['Agile', 'GitHub', 'Team'],
    },
];

const achievements = [
    {
        year: '2024 - 2025',
        title: 'Smart India Hackathon',
        desc: 'Participated in SIH 2024 and 2025 as Team Lead',
        icon: Trophy,
        image: null,
        teamImage: null,
    },
    {
        year: '2025',
        title: 'Interzone Handball',
        desc: '4th place in Interzone Handball competition',
        icon: Medal,
        image: null,
        teamImage: null,
    },
    {
        year: '2025',
        title: 'Handball Centies',
        desc: '2nd place - Runner Up!',
        icon: Medal,
        image: '/images/achievements/handball-trophy.jpg',
        teamImage: '/images/achievements/handball-team.jpg',
    },
];

const certifications = [
    {
        name: 'MongoDB Associate Certified',
        issuer: 'MongoDB, Inc.',
        date: '2025',
        image: '/images/certifications/mongodb-cert.png',
    },
    {
        name: 'Oracle APEX Cloud Developer',
        issuer: 'Oracle Corporation',
        date: '2025',
        image: '/images/certifications/oracle-cert.png',
    },
];

const contactLinks = [
    { icon: Mail, label: 'Email', value: 'mshuvik@gmail.com', href: 'mailto:mshuvik@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91 9345802029', href: 'tel:+919345802029' },
    { icon: Linkedin, label: 'LinkedIn', value: 'Shuvik M', href: 'https://www.linkedin.com/in/shuvikm/' },
    { icon: Github, label: 'GitHub', value: '@Shuvikm', href: 'https://github.com/Shuvikm' },
    { icon: Code2, label: 'LeetCode', value: '@Shuvik_M', href: 'https://leetcode.com/u/Shuvik_M/' },
];

export default function MangaPanelPortfolio() {
    const [showCertModal, setShowCertModal] = useState(false);
    const [selectedCert, setSelectedCert] = useState({ image: '', title: '' });
    const [activePanel, setActivePanel] = useState<number | null>(null);
    const [isReading, setIsReading] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Panel IDs for the reading effect
    const panelIds = ['home', 'about', 'skills', 'projects', 'journey', 'contact'];

    // Anime.js entrance animation on mount
    useEffect(() => {
        // Staggered entrance animation for all panels
        animate('.manga-panel-frame', {
            opacity: [0, 1],
            translateY: [50, 0],
            scale: [0.95, 1],
            duration: 800,
            delay: stagger(150),
            easing: 'easeOutElastic(1, .8)'
        });

        // Animate content bubbles
        animate('.content-bubble', {
            opacity: [0, 1],
            translateX: [-30, 0],
            duration: 600,
            delay: stagger(100, { start: 400 }),
            easing: 'easeOutCubic'
        });

        // Animate skill tags
        animate('.skill-tag, .project-tag', {
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 400,
            delay: stagger(50, { start: 800 }),
            easing: 'easeOutBack'
        });
    }, []);

    // Start the manga reading effect
    const startReadingEffect = () => {
        setIsReading(true);
        setActivePanel(0);
    };

    // Sequential popup effect - each panel for 5 seconds
    useEffect(() => {
        if (!isReading || activePanel === null) return;

        const timer = setTimeout(() => {
            if (activePanel < panelIds.length - 1) {
                setActivePanel(activePanel + 1);
            } else {
                // Reading complete, reset
                setActivePanel(null);
                setIsReading(false);
            }
        }, 5000); // 5 seconds per panel

        // Scroll to active panel smoothly
        const element = document.getElementById(panelIds[activePanel]);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return () => clearTimeout(timer);
    }, [activePanel, isReading, panelIds]);

    // Get panel class based on active state
    const getPanelClass = (panelId: string) => {
        const panelIndex = panelIds.indexOf(panelId);
        if (activePanel === panelIndex) {
            return 'panel-popup-active';
        }
        if (isReading && activePanel !== panelIndex) {
            return 'panel-popup-inactive';
        }
        return '';
    };

    return (
        <div className="manga-page-layout" ref={containerRef}>
            {/* Three.js 3D Background Scene */}
            <MangaScene3D />

            {/* Reading Mode Button */}
            <button
                className="manga-reading-btn"
                onClick={startReadingEffect}
                disabled={isReading}
                style={{
                    position: 'fixed',
                    top: '5rem',
                    right: '2rem',
                    zIndex: 100,
                    padding: '0.75rem 1.5rem',
                    background: isReading ? '#4a4a4a' : '#fbbf24',
                    color: '#1a1a1a',
                    border: '3px solid #1a1a1a',
                    boxShadow: '4px 4px 0 #1a1a1a',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    fontSize: '0.75rem',
                    cursor: isReading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease'
                }}
            >
                📖 {isReading ? 'Reading...' : 'Start Reading'}
            </button>

            {/* HERO PANEL */}
            <div id="home" className={`manga-panel-frame panel-hero ${getPanelClass('home')}`}>
                <div className="hero-content">
                    {/* Profile Image */}
                    <div className="profile-frame">
                        <img src="/images/profile.jpg" alt="Shuvik M" />
                    </div>

                    {/* Hero Info */}
                    <div className="hero-info">
                        <div className="hero-subtitle">Software Developer</div>
                        <h1 className="hero-title">
                            <span style={{ color: '#fbbf24' }}>SHUVIK</span> M
                        </h1>
                        <div className="content-bubble" style={{ maxWidth: '500px' }}>
                            <p>
                                Crafting digital experiences through code, inspired by the creativity of anime and
                                manga. Building meaningful web applications.
                            </p>
                        </div>

                        {/* Resume Buttons */}
                        <div className="resume-section">
                            <a
                                href="/resume.png"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="resume-btn resume-btn-primary"
                            >
                                📄 View Resume
                            </a>
                            <a
                                href="/resume.pdf"
                                download="Shuvik_M_Resume.pdf"
                                className="resume-btn resume-btn-secondary"
                            >
                                ⬇️ Download PDF
                            </a>
                        </div>

                        {/* Social Links */}
                        <div className="social-links">
                            {[
                                { icon: Github, href: 'https://github.com/Shuvikm' },
                                { icon: Linkedin, href: 'https://www.linkedin.com/in/shuvikm/' },
                                { icon: Code2, href: 'https://leetcode.com/u/Shuvik_M/' },
                                { icon: Mail, href: 'mailto:mshuvik@gmail.com' },
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target={social.href.startsWith('http') ? '_blank' : undefined}
                                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className="social-link"
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Manga Divider */}
            <div className="manga-divider" />

            {/* Decorative Manga Panels Row */}
            <div className="panel-row-triple" style={{ marginBottom: '1.5rem' }}>
                <div className="manga-panel-decorative" />
                <div className="manga-panel-decorative" style={{ minHeight: '80px' }} />
                <div className="manga-panel-decorative" />
            </div>

            {/* ROW 1: WHOAMI + STACK (Angular) */}
            <div className="panel-row-angled">
                {/* WHOAMI Panel */}
                <div id="about" className={`manga-panel-frame section-panel panel-angled-left ${getPanelClass('about')}`}>
                    <div className="section-header">
                        <div className="section-number">01</div>
                        <h2 className="section-title">WHOAMI</h2>
                    </div>

                    {/* Mission */}
                    <div className="content-bubble" style={{ marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                            <Target className="w-5 h-5" style={{ color: '#fbbf24' }} />
                            <strong>Mission</strong>
                        </div>
                        <p style={{ fontSize: '0.875rem' }}>
                            Seeking an entry-level position where I can apply my skills, enhance my knowledge, and contribute to the company's success.
                        </p>
                    </div>

                    {/* Education */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                        <div className="content-bubble">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <GraduationCap className="w-4 h-4" />
                                <strong style={{ fontSize: '0.8rem' }}>B.TECH CSE</strong>
                            </div>
                            <p style={{ fontSize: '0.75rem', color: '#4a4a4a' }}>Kongu Engineering College</p>
                            <p style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: 'bold' }}>CGPA: 7.77*</p>
                        </div>
                        <div className="content-bubble">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <School className="w-4 h-4" />
                                <strong style={{ fontSize: '0.8rem' }}>GRADE 12</strong>
                            </div>
                            <p style={{ fontSize: '0.75rem', color: '#4a4a4a' }}>Bharathi Vidya Bhavan</p>
                            <p style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: 'bold' }}>82%</p>
                        </div>
                    </div>

                    {/* Soft Skills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {['Leadership', 'Teamwork', 'Adaptability', 'Communication'].map((skill) => (
                            <span key={skill} className="skill-tag">{skill}</span>
                        ))}
                    </div>
                </div>

                {/* STACK Panel */}
                <div id="skills" className={`manga-panel-frame section-panel panel-angled-right panel-dark ${getPanelClass('skills')}`}>
                    <div className="section-header">
                        <div className="section-number">02</div>
                        <h2 className="section-title">STACK</h2>
                    </div>

                    <div className="skills-grid">
                        <div className="skill-category">
                            <div className="skill-category-title">
                                <span className="skill-category-icon"><Code className="w-3 h-3" /></span>
                                Languages
                            </div>
                            <div className="skill-tags">
                                {skills.languages.map((s) => <span key={s} className="skill-tag">{s}</span>)}
                            </div>
                        </div>
                        <div className="skill-category">
                            <div className="skill-category-title" style={{ color: '#fbbf24' }}>
                                <span className="skill-category-icon" style={{ background: '#fbbf24', color: '#1a1a1a' }}><Palette className="w-3 h-3" /></span>
                                Frontend
                            </div>
                            <div className="skill-tags">
                                {skills.frontend.map((s) => <span key={s} className="skill-tag">{s}</span>)}
                            </div>
                        </div>
                        <div className="skill-category">
                            <div className="skill-category-title">
                                <span className="skill-category-icon" style={{ background: '#22c55e' }}><Database className="w-3 h-3" /></span>
                                Databases
                            </div>
                            <div className="skill-tags">
                                {skills.databases.map((s) => <span key={s} className="skill-tag">{s}</span>)}
                            </div>
                        </div>
                        <div className="skill-category">
                            <div className="skill-category-title">
                                <span className="skill-category-icon" style={{ background: '#22d3ee', color: '#1a1a1a' }}><Wrench className="w-3 h-3" /></span>
                                Tools
                            </div>
                            <div className="skill-tags">
                                {skills.tools.map((s) => <span key={s} className="skill-tag">{s}</span>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ROW 2: WORKS (Full Width) */}
            <div id="projects" className={`manga-panel-frame section-panel panel-full ${getPanelClass('projects')}`}>
                <div className="section-header">
                    <div className="section-number">03</div>
                    <h2 className="section-title">WORKS</h2>
                </div>

                <div className="projects-grid">
                    {projects.map((proj, i) => (
                        <div key={i} className="project-card">
                            <div className="project-header">{proj.role}</div>
                            <div className="project-content">
                                <h3 className="project-title">{proj.title}</h3>
                                <p className="project-desc">{proj.desc}</p>
                                <div className="project-tags">
                                    {proj.tags.map((t) => <span key={t} className="project-tag">{t}</span>)}
                                </div>
                                <button className="project-btn">
                                    <ExternalLink className="w-4 h-4" />
                                    View Quest
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Second Decorative Manga Panels Row */}
            <div className="panel-row-angled" style={{ marginBottom: '1.5rem' }}>
                <div className="manga-panel-decorative" style={{ minHeight: '100px' }} />
                <div className="manga-panel-decorative" style={{ minHeight: '100px' }} />
            </div>

            {/* ROW 3: ACHIEVEMENTS (Full Width) */}
            <div id="journey" className={`manga-panel-frame section-panel panel-full ${getPanelClass('journey')}`}>
                <div className="section-header">
                    <div className="section-number">04</div>
                    <h2 className="section-title">ACHIEVEMENTS</h2>
                </div>

                <div className="achievements-list">
                    {achievements.map((ach, i) => (
                        <div
                            key={i}
                            className="achievement-item"
                            onClick={() => {
                                if (ach.image) {
                                    setSelectedCert({ image: ach.image, title: ach.title });
                                    setShowCertModal(true);
                                }
                            }}
                            style={{
                                cursor: ach.image ? 'pointer' : 'default',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <div className="achievement-icon">
                                <ach.icon className="w-5 h-5" />
                            </div>
                            <div className="achievement-info" style={{ flex: 1 }}>
                                <h4>
                                    {ach.title}
                                    <span className="achievement-year">{ach.year}</span>
                                </h4>
                                <p style={{ fontSize: '0.875rem', color: '#4a4a4a' }}>{ach.desc}</p>
                                {ach.image && (
                                    <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                        <span
                                            style={{
                                                fontSize: '0.75rem',
                                                color: '#fbbf24',
                                                fontWeight: 'bold',
                                                background: '#1a1a1a',
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '4px'
                                            }}
                                        >
                                            📷 Click to view Trophy
                                        </span>
                                        {ach.teamImage && (
                                            <span
                                                style={{
                                                    fontSize: '0.75rem',
                                                    color: '#fbbf24',
                                                    fontWeight: 'bold',
                                                    background: '#1a1a1a',
                                                    padding: '0.25rem 0.5rem',
                                                    borderRadius: '4px',
                                                    cursor: 'pointer'
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedCert({ image: ach.teamImage!, title: `${ach.title} - Team` });
                                                    setShowCertModal(true);
                                                }}
                                            >
                                                👥 View Team Photo
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Certifications */}
                <h3 style={{ fontWeight: 900, textTransform: 'uppercase', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#1a1a1a' }}>
                    Certifications
                </h3>
                <div className="certs-grid">
                    {certifications.map((cert, i) => (
                        <div
                            key={i}
                            className="cert-card"
                            onClick={() => {
                                setSelectedCert({ image: cert.image, title: cert.name });
                                setShowCertModal(true);
                            }}
                        >
                            <span className="cert-badge">CERTIFIED</span>
                            <div className="cert-name">{cert.name}</div>
                            <div className="cert-issuer">{cert.issuer}</div>
                            <button style={{
                                marginTop: '0.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                color: '#fbbf24',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer'
                            }}>
                                <ZoomIn className="w-3 h-3" /> View
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* ROW 4: CONTACT */}
            <div id="contact" className={`manga-panel-frame section-panel panel-full panel-dark ${getPanelClass('contact')}`}>
                <div className="section-header">
                    <div className="section-number">05</div>
                    <h2 className="section-title">CONTACT</h2>
                </div>

                <div className="content-bubble" style={{
                    textAlign: 'center',
                    marginBottom: '1.5rem',
                    background: '#2a2a2a',
                    color: '#fff',
                    borderColor: '#3a3a3a'
                }}>
                    <MessageSquare className="w-5 h-5 inline mr-2" style={{ color: '#fbbf24' }} />
                    Have a project in mind? Let's collaborate!
                </div>

                <div className="contact-grid">
                    {contactLinks.map((link, i) => (
                        <a
                            key={i}
                            href={link.href}
                            target={link.href.startsWith('http') ? '_blank' : undefined}
                            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="contact-item"
                        >
                            <div className="contact-icon">
                                <link.icon className="w-4 h-4" />
                            </div>
                            <div>
                                <div className="contact-label">{link.label}</div>
                                <div className="contact-value">{link.value}</div>
                            </div>
                        </a>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <div className="content-bubble" style={{
                        display: 'inline-block',
                        background: '#2a2a2a',
                        color: '#fff',
                        borderColor: '#3a3a3a'
                    }}>
                        "Let's turn ideas into reality, one line of code at a time."
                    </div>
                    <div style={{ marginTop: '0.5rem', color: '#fbbf24', fontWeight: 'bold' }}>
                        — Shuvik M
                    </div>
                </div>
            </div>

            {/* Certificate Modal */}
            <CertificateModal
                isOpen={showCertModal}
                onClose={() => setShowCertModal(false)}
                imageSrc={selectedCert.image}
                title={selectedCert.title}
            />
        </div>
    );
}
