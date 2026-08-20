/*
 * Copyright (c) 2022-2026 Brittni Watkins.
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

import '../assets/css/sketch.css';

class AspectRatio {
    // TODO - widthRatio and heightRatio must both be larger than 1
    // TODO - widthRatio and heightRatio must both be integers
    #widthRatio: number;
    #heightRatio: number;

    constructor(widthRatio: number, heightRatio: number) {
        this.#widthRatio = widthRatio;
        this.#heightRatio = heightRatio;
    }

    public get widthRatio(): number {
        return this.#widthRatio;
    }

    public get heightRatio(): number {
        return this.#heightRatio;
    }

    public getWidth(resolution: number): number {
        const unit = this.#getUnit(resolution);
        return Math.floor(unit * this.#widthRatio);
    }

    public getHeight(resolution: number): number {
        const unit: number = this.#getUnit(resolution);
        return Math.floor(unit * this.#heightRatio);
    }

    #getUnit(resolution: number): number {
        return (resolution / Math.max(this.#widthRatio, this.#heightRatio));
    }
}



function sketch(ctx: p5): void {
    const canvasId = 'mainCanvas';
    const aspectRatio: AspectRatio = new AspectRatio(1, 1);

    ctx.setup = (): void => {
        const resolution: number = 1920;
        const renderer: p5.Renderer = ctx.createCanvas(aspectRatio.getWidth(resolution), aspectRatio.getHeight(resolution));
        ctx.pixelDensity(1);
        renderer.elt.id = canvasId;
        decorateCanvas();
    };

    ctx.draw = (): void => {
        ctx.background(100);
        ctx.fill(255);
        ctx.ellipse(ctx.mouseX, ctx.mouseY, 100, 100);
    };

    ctx.windowResized = (): void => {
        decorateCanvas();
    }

    function decorateCanvas(): void {
        const canvas = document.getElementById(canvasId);
        const parent = canvas?.parentElement;

        if (canvas && parent) {
            canvas.style.width = '';
            canvas.style.height = '';
            canvas.style.maxWidth = parent.offsetWidth.toString(10) + 'px';
            canvas.style.maxHeight = parent.offsetHeight.toString(10) + 'px';
            canvas.style.aspectRatio = `auto ${aspectRatio.widthRatio} / ${aspectRatio.heightRatio}`;
        }
    }
}

new p5(sketch);
