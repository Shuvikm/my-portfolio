// Desert Horse Game - Sprite Renderer Class

export class Sprite {
    frames: string[][];
    scale: number;
    height: number;
    width: number;

    constructor(bitmaps: string[] | string[][], scale: number = 3) {
        // Standardize to array of arrays for animation frames
        if (!Array.isArray(bitmaps[0])) {
            this.frames = [bitmaps as string[]];
        } else {
            this.frames = bitmaps as string[][];
        }

        this.scale = scale;
        this.height = this.frames[0].length * scale;
        this.width = this.frames[0][0].length * scale;
    }

    draw(ctx: CanvasRenderingContext2D, x: number, y: number, frameIndex: number = 0) {
        const frame = this.frames[frameIndex % this.frames.length];

        ctx.fillStyle = '#535353';
        for (let r = 0; r < frame.length; r++) {
            for (let c = 0; c < frame[r].length; c++) {
                if (frame[r][c] === '1') {
                    ctx.fillRect(
                        x + c * this.scale,
                        y + r * this.scale,
                        this.scale,
                        this.scale
                    );
                }
            }
        }
    }
}
