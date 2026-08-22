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

import { DrawableGraphics } from './drawable-graphics';
import { GraphicsHandler } from './graphics-handler';
import { P5ContextHandler } from './p5-context-handler';
import { Sketch } from './sketch';

export class SketchGraphics implements DrawableGraphics {
    readonly #sketch: Sketch;
    #activeHandler: GraphicsHandler;

    constructor(sketch: Sketch, handler: GraphicsHandler) {
        this.#sketch = sketch;
        this.#activeHandler = handler;
    }

    public get activeHandler(): GraphicsHandler {
        return this.#activeHandler;
    }

    protected set activeHandler(handler: GraphicsHandler) {
        this.#activeHandler = handler;
    }

    public get sketch(): Sketch {
        return this.#sketch;
    }

    public draw(target: P5ContextHandler | p5 | p5.Graphics, x: number, y: number, width: number, height: number): void {
        this.render();
        let boundsResolution: number;
        const targetAspectRatio: AspectRatio = this.activeHandler.aspectRatio;
        const targetRatio: number = targetAspectRatio.widthRatio / targetAspectRatio.heightRatio;
        const actualRatio: number = width / height;

        if (targetRatio === actualRatio) {
            boundsResolution = Math.max(width, height);
        } else if (targetRatio > actualRatio) {
            boundsResolution = width;
        } else {
            boundsResolution = height;
        }

        const w: number = this.activeHandler.aspectRatio.getWidth(boundsResolution);
        const h: number = this.activeHandler.aspectRatio.getHeight(boundsResolution);

        P5ContextHandler.getCtx(target).image(this.activeHandler.graphics, x, y, w, h);
    }

    public render(): void {
        this.#sketch.renderTo(this.activeHandler);
    }
}
