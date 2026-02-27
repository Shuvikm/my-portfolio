import React from 'react';

export default function BrutalHero() {
    const renderWord = (word: string) => (
        <div className="word" style={{ display: 'inline-block' }}>
            {word.split('').map((char, i) => (
                <span key={i} className="char">{char}</span>
            ))}
        </div>
    );

    return (
        <section className="hero">
            <div className="hero-title-container">
                <h1>
                    {renderWord('BRUTAL')}<br />
                    {renderWord('MAGIC')}
                </h1>
            </div>

            <div className="tape-wrapper">
                <div className="tape-text">
                    ALERAK DIGITAL ✦ SCROLL VELOCITY ✦ INTERACTIVE SYSTEMS ✦ ALERAK DIGITAL ✦ SCROLL VELOCITY ✦
                    INTERACTIVE SYSTEMS ✦
                </div>
            </div>
        </section>
    );
}
