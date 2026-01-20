import { useEffect, useRef, useState } from 'react';
import GlitchText from '../ui/GlitchText';
import { Sprite } from '../game/Sprite';
import { Player, Obstacle, Bull, checkCollision } from '../game/entities';
import * as SPRITES from '../game/sprites';
import {
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    GROUND_Y,
    GAME_SPEED_START,
    MAX_SPEED,
    KONAMI_CODE
} from '../game/constants';
import './DesertHorse.css';

export default function DesertHorse() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState(0);
    const [displayScore, setDisplayScore] = useState('00000');
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [showInstructions, setShowInstructions] = useState(false);
    const [cheatActive, setCheatActive] = useState(false);

    const gameStateRef = useRef({
        gameSpeed: GAME_SPEED_START,
        frameCount: 0,
        keys: {} as Record<string, boolean>,
        konamiIndex: 0,
        bullTimer: 0,
    });

    useEffect(() => {
        if (!canvasRef.current || !gameStarted) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;

        // Initialize sprites
        const horseSprite = new Sprite([SPRITES.SPRITE_HORSE_RUN_1, SPRITES.SPRITE_HORSE_RUN_2], 3);
        const bullSprite = new Sprite([SPRITES.SPRITE_BULL_RUN_1, SPRITES.SPRITE_BULL_RUN_2], 3);
        const cactusSmallSprite = new Sprite(SPRITES.CACTUS_SMALL, 4);
        const cactusLargeSprite = new Sprite(SPRITES.CACTUS_LARGE, 4);
        const vultureSprite = new Sprite(SPRITES.VULTURE, 4);

        // Game entities
        let player = new Player(horseSprite);
        let bull = new Bull(bullSprite);
        let obstacles: Obstacle[] = [];
        let currentScore = 0;
        let isGameOver = false;
        let bullActive = false;
        const state = gameStateRef.current;

        // Spawn obstacle
        const spawnObstacle = () => {
            if (obstacles.length > 0) {
                const lastObs = obstacles[obstacles.length - 1];
                if (CANVAS_WIDTH - lastObs.x < 350 + Math.random() * 250) {
                    return;
                }
            }

            const r = Math.random();
            let obstacle: Obstacle;

            if (currentScore > 500 && r > 0.7) {
                const heights = [GROUND_Y - 60, GROUND_Y - 100, GROUND_Y - 30];
                obstacle = new Obstacle(
                    'vulture',
                    vultureSprite,
                    heights[Math.floor(Math.random() * heights.length)]
                );
            } else if (r > 0.45) {
                obstacle = new Obstacle('cactus_large', cactusLargeSprite);
            } else {
                obstacle = new Obstacle('cactus_small', cactusSmallSprite);
            }

            obstacles.push(obstacle);
        };

        // Update game
        const update = () => {
            if (isGameOver) return;

            if (state.frameCount % 1000 === 0 && state.gameSpeed < MAX_SPEED) {
                state.gameSpeed += 0.5;
            }

            player.update(state.keys);

            if (bullActive) {
                state.bullTimer--;
                bull.update(obstacles);
                if (state.bullTimer <= 0) {
                    bullActive = false;
                    bull.active = false;
                    setCheatActive(false);
                }
            }

            spawnObstacle();
            obstacles.forEach(obs => obs.update(state.gameSpeed));
            obstacles = obstacles.filter(obs => !obs.markedForDeletion);

            for (const obs of obstacles) {
                if (checkCollision(player, obs)) {
                    if (!bullActive) {
                        isGameOver = true;
                        setGameOver(true);
                        return;
                    }
                }
            }

            currentScore++;
            setScore(currentScore);
            setDisplayScore(Math.floor(currentScore / 10).toString().padStart(5, '0'));
            state.frameCount++;
        };

        // Draw game
        const draw = () => {
            ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

            // Background
            ctx.fillStyle = '#F5E6D3';
            ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

            // Ground line
            ctx.beginPath();
            ctx.moveTo(0, GROUND_Y);
            ctx.lineTo(CANVAS_WIDTH, GROUND_Y);
            ctx.strokeStyle = '#535353';
            ctx.lineWidth = 2;
            ctx.stroke();

            player.draw(ctx);
            obstacles.forEach(obs => obs.draw(ctx));
            if (bullActive) bull.draw(ctx);
        };

        // Animation loop
        let animationId: number;
        const animate = () => {
            if (isGameOver) return;
            update();
            draw();
            animationId = requestAnimationFrame(animate);
        };

        // Keyboard handlers
        const handleKeyDown = (e: KeyboardEvent) => {
            if (['ArrowUp', 'ArrowDown', 'Space'].includes(e.code)) {
                e.preventDefault();
            }

            state.keys[e.code] = true;

            // Restart on game over
            if (e.code === 'Space' && isGameOver) {
                isGameOver = false;
                setGameOver(false);
                obstacles = [];
                currentScore = 0;
                setScore(0);
                setDisplayScore('00000');
                state.gameSpeed = GAME_SPEED_START;
                state.frameCount = 0;
                player = new Player(horseSprite);

                if (state.bullTimer > 0) {
                    bullActive = true;
                    bull.activate();
                    setCheatActive(true);
                } else {
                    bullActive = false;
                    bull.active = false;
                    state.bullTimer = 0;
                    setCheatActive(false);
                }

                // Restart animation loop
                animate();
                return;
            }

            // Jump
            if ((e.code === 'Space' || e.code === 'ArrowUp') && !isGameOver) {
                player.jump();
            }

            // Konami code
            if (e.code === KONAMI_CODE[state.konamiIndex]) {
                state.konamiIndex++;
                if (state.konamiIndex === KONAMI_CODE.length) {
                    activateCheat();
                    state.konamiIndex = 0;
                }
            } else {
                state.konamiIndex = 0;
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            state.keys[e.code] = false;
        };

        const activateCheat = () => {
            bullActive = true;
            state.bullTimer = 1000;
            bull.activate();
            setCheatActive(true);
            setDisplayScore('CHEAT ON');
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // Initial draw
        draw();
        animate();

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            cancelAnimationFrame(animationId);
        };
    }, [gameStarted]);

    const handleStartGame = () => {
        setGameStarted(true);
        setShowInstructions(true);
        setGameOver(false);
        setScore(0);
        setDisplayScore('00000');
        gameStateRef.current = {
            gameSpeed: GAME_SPEED_START,
            frameCount: 0,
            keys: {},
            konamiIndex: 0,
            bullTimer: 0,
        };
    };

    return (
        <section id="game" className="manga-section desert-horse-game">
            {/* Section Header */}
            <div className="manga-panel p-6 mb-4">
                <div className="flex items-center gap-8">
                    <div className="exclaim-box">05</div>
                    <h2 className="manga-title text-3xl sm:text-4xl tracking-widest">
                        <GlitchText speed={0.8} enableOnHover={false}>GAME</GlitchText>
                    </h2>
                </div>
            </div>

            {/* Game Container */}
            <div className="manga-panel p-0 overflow-hidden">
                <div className="game-container">
                    {/* Start Menu */}
                    {!gameStarted && (
                        <div className="start-menu">
                            <h1 className="game-title">DESERT<br />HORSE</h1>
                            <p className="game-subtitle">A PIXELATED ADVENTURE</p>
                            <button onClick={handleStartGame} className="start-button">
                                ▶ START
                            </button>
                        </div>
                    )}

                    {/* Instructions */}
                    {showInstructions && (
                        <div className="game-instructions">
                            SPACE / ↑ to Jump<br />
                            ↓ to Duck<br />
                            Dodge the cactus and vultures!
                        </div>
                    )}

                    {/* Score */}
                    {gameStarted && (
                        <div className="game-score" style={{ color: cheatActive ? '#fbbf24' : '#535353' }}>
                            {displayScore}
                        </div>
                    )}

                    {/* Game Over */}
                    {gameOver && (
                        <div className="game-over-modal">
                            <p className="game-over-title">GAME OVER</p>
                            <p className="game-over-score">
                                Score: <span className="score-value">{Math.floor(score / 10)}</span>
                            </p>
                            <p className="game-over-hint">Press SPACE to restart</p>
                        </div>
                    )}

                    {/* Canvas */}
                    <canvas ref={canvasRef} className="game-canvas"></canvas>

                    {/* Cheat Code Hint */}
                    <p className="cheat-code">Cheat Code: ↑ ↑ ↓ ↓ ← → ← → B A</p>
                </div>
            </div>
        </section>
    );
}
