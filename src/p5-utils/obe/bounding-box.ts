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

import { Coordinate } from './coordinate';

export class BoundingBox {
    #topLeft: Coordinate;
    #bottomRight: Coordinate;

    public constructor(topLeft: Coordinate, bottomRight: Coordinate) {
        // TODO - shallow copy
        this.#topLeft = topLeft;
        this.#bottomRight = bottomRight;
    }

    public getX(ctx: p5.Renderer | p5): number {
        return this.#topLeft.getX(ctx);
    }

    public getY(ctx: p5.Renderer | p5): number {
        return this.#topLeft.getY(ctx);
    }

    public getWidth(ctx: p5.Renderer | p5): number {
        return this.#bottomRight.getX(ctx) - this.#topLeft.getX(ctx);
    }

    public getHeight(ctx: p5.Renderer | p5): number {
        return this.#bottomRight.getY(ctx) - this.#topLeft.getY(ctx);
    }

    public getBox(ctx: p5.Renderer | p5) {
        return {
            x: this.getX(ctx),
            y: this.getY(ctx),
            width: this.getWidth(ctx),
            height: this.getHeight(ctx)
        }
    }
}
