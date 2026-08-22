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

import { Sketch } from './p5-utils/sketch';
import { P5ContextHandler } from './p5-utils/p5-context-handler';

export class GradientGraphs extends Sketch {
    readonly #r: number;
    readonly #g: number;
    readonly #b: number;

    constructor() {
        super();
        this.#r = Math.floor(Math.random() * 255);
        this.#g = Math.floor(Math.random() * 255);
        this.#b = Math.floor(Math.random() * 255);
    }

    public override renderTo(target: P5ContextHandler | p5.Graphics | p5): void {
        const ctx: p5.Graphics | p5 = P5ContextHandler.getCtx(target);
        const baseStroke: number = P5ContextHandler.getStrokeMultiplier(target);

        ctx.background(this.#r, this.#g, this.#b);

        ctx.fill(255);
        ctx.strokeWeight(baseStroke * 5);

        ctx.ellipse(0, 0, 100, 100);
        ctx.ellipse(ctx.width / 2, 0, 100, 100);
        ctx.ellipse(ctx.width, 0, 100, 100);

        ctx.ellipse(0, ctx.height / 2, 100, 100);
        ctx.ellipse(ctx.width / 2, ctx.height / 2, 100, 100);
        ctx.ellipse(ctx.width, ctx.height / 2, 100, 100);

        ctx.ellipse(0, ctx.height, 100, 100);
        ctx.ellipse(ctx.width / 2, ctx.height, 100, 100);
        ctx.ellipse(ctx.width, ctx.height, 100, 100);
    }
}
