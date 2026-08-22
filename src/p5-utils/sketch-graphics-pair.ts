/*
 * Copyright (c) 2026 Brittni Watkins.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import p5 from 'p5';

import { AspectRatio } from '../genart-utils/aspect-ratio';

import { Sketch } from './sketch';
import { GraphicsHandler } from './graphics-handler';

export class SketchGraphicsPair {
    readonly #sketch: Sketch;
    readonly #graphicsHandler: GraphicsHandler;

    public constructor(sketch: Sketch, handler: GraphicsHandler) {
        this.#sketch = sketch;
        this.#graphicsHandler = handler;
    }

    public draw(ctx: p5.Graphics | p5, x: number, y: number, width: number, height: number): void {
        this.render();
        let boundsResolution: number;
        const targetAspectRatio: AspectRatio = this.#graphicsHandler.aspectRatio;
        const targetRatio: number = targetAspectRatio.widthRatio / targetAspectRatio.heightRatio;
        const actualRatio: number = width / height;

        if (targetRatio === actualRatio) {
            boundsResolution = Math.max(width, height);
        } else if (targetRatio > actualRatio) {
            boundsResolution = width;
        } else {
            boundsResolution = height;
        }

        const w: number = this.#graphicsHandler.aspectRatio.getWidth(boundsResolution);
        const h: number = this.#graphicsHandler.aspectRatio.getHeight(boundsResolution);
        ctx.image(this.#graphicsHandler.graphics, x, y, w, h);
    }

    public render(): void {
        this.#sketch.renderTo(this.#graphicsHandler.graphics);
    }
}
