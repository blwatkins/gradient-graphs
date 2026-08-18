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

function sketch(ctx: p5): void {
    ctx.setup = (): void => {
        ctx.createCanvas(720, 720);
    };

    ctx.draw = (): void => {
        ctx.background(0);
        ctx.fill(255);
        ctx.ellipse(ctx.mouseX, ctx.mouseY, 100, 100);
    };
}

new p5(sketch);
