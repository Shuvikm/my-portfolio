// Desert Horse Game - Game Entities

import { Sprite } from './Sprite';
import { GROUND_Y, GRAVITY, JUMP_FORCE, CANVAS_WIDTH, COLLISION_PADDING } from './constants';

export class Player {
    x: number;
    y: number;
    vy: number;
    grounded: boolean;
    width: number;
    normalHeight: number;
    duckHeight: number;
    height: number;
    ducking: boolean;
    animTimer: number;
    sprite: Sprite;

    constructor(sprite: Sprite) {
        this.sprite = sprite;
        this.x = 50;
        this.width = sprite.width;
        this.normalHeight = sprite.height;
        this.duckHeight = Math.floor(this.normalHeight * 0.6);
        this.height = this.normalHeight;
        this.y = GROUND_Y - this.normalHeight;
        this.vy = 0;
        this.grounded = true;
        this.ducking = false;
        this.animTimer = 0;
    }

    update(keys: Record<string, boolean>) {
        if (!this.grounded) {
            this.vy += GRAVITY;
        }

        this.y += this.vy;

        if (this.y >= GROUND_Y - this.normalHeight) {
            this.y = GROUND_Y - this.normalHeight;
            this.vy = 0;
            this.grounded = true;
        } else {
            this.grounded = false;
        }

        const isDown = keys['ArrowDown'];
        this.ducking = isDown && this.grounded;

        if (this.grounded) {
            if (this.ducking) {
                this.height = this.duckHeight;
                this.y = GROUND_Y - this.duckHeight;
            } else {
                this.height = this.normalHeight;
                this.y = GROUND_Y - this.normalHeight;
            }
        } else {
            this.height = this.normalHeight;
        }

        this.animTimer++;
    }

    jump() {
        if (this.grounded && !this.ducking) {
            this.vy = JUMP_FORCE;
            this.grounded = false;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        let fIndex = 0;
        if (this.ducking) {
            fIndex = 1;
        } else if (this.grounded) {
            fIndex = Math.floor(this.animTimer / 8) % 2;
        } else {
            fIndex = 0;
        }
        this.sprite.draw(ctx, this.x, this.y, fIndex);
    }
}

export class Obstacle {
    type: string;
    sprite: Sprite;
    x: number;
    y: number;
    width: number;
    height: number;
    markedForDeletion: boolean;
    animTimer: number;

    constructor(type: string, sprite: Sprite, y?: number) {
        this.type = type;
        this.sprite = sprite;
        this.x = CANVAS_WIDTH + Math.random() * 200;
        this.width = sprite.width;
        this.height = sprite.height;
        this.markedForDeletion = false;
        this.animTimer = 0;

        if (y !== undefined) {
            this.y = y;
        } else {
            this.y = GROUND_Y - this.height;
        }
    }

    update(gameSpeed: number) {
        this.x -= gameSpeed;
        if (this.x + this.width < 0) {
            this.markedForDeletion = true;
        }
        this.animTimer++;
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.sprite.draw(ctx, this.x, this.y, 0);
    }
}

export class Bull {
    x: number;
    y: number;
    active: boolean;
    width: number;
    height: number;
    animTimer: number;
    sprite: Sprite;

    constructor(sprite: Sprite) {
        this.sprite = sprite;
        this.x = -150;
        this.y = GROUND_Y - sprite.height;
        this.active = false;
        this.width = sprite.width;
        this.height = sprite.height;
        this.animTimer = 0;
    }

    activate() {
        this.active = true;
        this.x = -150;
    }

    update(obstacles: Obstacle[]) {
        if (!this.active) return;
        this.x += 4;

        if (this.x > 250) {
            this.x = 250;
        }

        this.animTimer++;

        obstacles.forEach(obs => {
            if (checkCollision(this, obs)) {
                obs.markedForDeletion = true;
            }
        });
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (!this.active) return;
        const fIndex = Math.floor(this.animTimer / 5) % 2;
        this.sprite.draw(ctx, this.x, this.y, fIndex);
    }
}

export function checkCollision(
    rect1: { x: number; y: number; width: number; height: number },
    rect2: { x: number; y: number; width: number; height: number }
): boolean {
    return (
        rect1.x < rect2.x + rect2.width - COLLISION_PADDING &&
        rect1.x + rect1.width - COLLISION_PADDING > rect2.x &&
        rect1.y < rect2.y + rect2.height - COLLISION_PADDING &&
        rect1.y + rect1.height - COLLISION_PADDING > rect2.y
    );
}
