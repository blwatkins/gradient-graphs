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

import { MathUtility } from '@blwatkins/utils';

import { DrawableGraphics } from './drawable-graphics';
import { P5ContextHandler } from './p5-context-handler';
import { SketchCell } from './sketch-cell';

export class SketchGrid implements DrawableGraphics {
    #columns: number;
    #rows: number;
    #sketchCells: SketchCell[];

    // TODO - How do I want to add sketch cells? All at once? Or one at a time?
    constructor(columns: number, rows: number, sketchCells: SketchCell[]) {
        this.#columns = columns;
        this.#rows = rows;
        this.#sketchCells = sketchCells;
    }

    /**
     * @param target
     * @param {number} x - X-axis coordinate for the top-left corner of the grid.
     * @param y - Y-axis coordinate for the top-left corner of the grid.
     * @param width
     * @param height
     * @param xGutter
     * @param yGutter
     * @param {'center'|'corner'} algin - Alignment of graphics within the grid. Graphics can be aligned to the top-left corner of each cell (`corner`), or the center of each cell (`center`).
     * @param scale
     */
    draw(target: P5ContextHandler | p5 | p5.Graphics, x: number, y: number, width: number, height: number, scale: number = 1, algin: 'center' | 'corner' = 'corner'): void {
        const cellWidth: number = width / this.#columns;
        const cellHeight: number = height / this.#rows;
        let xOffset = 0;
        let yOffset = 0;

        if (algin === 'center') {
            xOffset = cellWidth / 2.0;
            yOffset = cellHeight / 2.0;
        }

        const ctx = P5ContextHandler.getCtx(target);
        ctx.push();
        ctx.imageMode(algin);

        for (let row: number = 0; row < this.#rows; row++) {
            for (let col: number = 0; col < this.#columns; col++) {
                const index: number = MathUtility.toFlatIndex(col, row, this.#columns, this.#rows);

                if (this.#sketchCells[index]) {
                    this.#sketchCells[index].draw(target, (col * cellWidth) + (xOffset + x), (row * cellHeight) + (yOffset + y), cellWidth * scale, cellHeight * scale);
                }
            }
        }

        ctx.pop();
    }
}
